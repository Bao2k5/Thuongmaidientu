// src/controllers/vnpay.controller.js
const crypto = require('crypto');
const querystring = require('querystring');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const { sortObject, buildVnpaySecureHash, verifyVnpaySecureHash } = require('../utils/vnpay');

// VNPay configuration (replace with your credentials)
const VNPAY_CONFIG = {
  tmnCode: process.env.VNPAY_TMN_CODE || 'DEMOSHOP',
  hashSecret: process.env.VNPAY_HASH_SECRET || 'TESTDEMOSHOPSECRET',
  url: process.env.VNPAY_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  // SANDBOX: Redirect to simulator page instead of direct callback
  returnUrl: process.env.VNPAY_RETURN_URL || 'http://localhost:5173/payment/vnpay/simulator',
  ipnUrl: process.env.VNPAY_IPN_URL || 'http://localhost:5000/api/payment/vnpay/ipn',
};

// Create VNPay payment
exports.createPayment = async (req, res) => {
  try {
    const { orderId, bankCode } = req.body;
    
    // Get order from DB
    const order = await Order.findById(orderId).populate('items.product');
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    if (order.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Forbidden' });

    const createDate = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const orderId_vnp = `${orderId}_${Date.now()}`;
    const amount = order.total * 100; // VNPay requires amount in VND * 100
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '127.0.0.1';

    let vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: VNPAY_CONFIG.tmnCode,
      vnp_Amount: amount.toString(),
      vnp_CreateDate: createDate,
      vnp_CurrCode: 'VND',
      vnp_IpAddr: ipAddr,
      vnp_Locale: 'vn',
      vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
      vnp_OrderType: 'other',
      vnp_ReturnUrl: VNPAY_CONFIG.returnUrl,
      vnp_TxnRef: orderId_vnp,
    };

    if (bankCode) {
      vnp_Params.vnp_BankCode = bankCode;
    }

    // Sort params
    vnp_Params = sortObject(vnp_Params);

    // Create signature using utility function
    const secureHash = buildVnpaySecureHash(vnp_Params, VNPAY_CONFIG.hashSecret);
    vnp_Params.vnp_SecureHash = secureHash;

    // Build payment URL
    const paymentUrl = VNPAY_CONFIG.url + '?' + querystring.stringify(vnp_Params, { encode: false });

    // Update order with VNPay info
    order.payment = {
      method: 'vnpay',
      status: 'pending',
      requestId: orderId_vnp,
    };
    await order.save();

    res.json({
      success: true,
      payUrl: paymentUrl,
      requestId: orderId_vnp,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Query payment status from VNPay (active verification)
exports.queryPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.body;
    
    // Get order from DB
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    if (order.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Forbidden' });

    const requestId = order.payment.requestId;
    if (!requestId) return res.status(400).json({ msg: 'No payment request found' });

    const createDate = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '127.0.0.1';

    let vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'querydr',
      vnp_TmnCode: VNPAY_CONFIG.tmnCode,
      vnp_TxnRef: requestId,
      vnp_OrderInfo: `Query for order ${orderId}`,
      vnp_TransactionDate: createDate,
      vnp_CreateDate: createDate,
      vnp_IpAddr: ipAddr,
    };

    // Sort params
    vnp_Params = sortObject(vnp_Params);

    // Create signature
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', VNPAY_CONFIG.hashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params.vnp_SecureHash = signed;

    // Query URL
    const queryUrl = (process.env.VNPAY_QUERY_URL || 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction') + '?' + querystring.stringify(vnp_Params, { encode: false });

    // Make query request
    const https = require('https');
    https.get(queryUrl, (vnpRes) => {
      let data = '';
      vnpRes.on('data', (chunk) => {
        data += chunk;
      });
      vnpRes.on('end', async () => {
        try {
          const response = JSON.parse(data);
          
          // Update order based on query result
          if (response.vnp_ResponseCode === '00') {
            // Payment successful
            order.payment.status = 'paid';
            order.payment.transactionId = response.vnp_TransactionNo;
            order.status = 'paid';
            
            // Decrement stock if not already done
            if (!order.stockAdjusted) {
              for (const item of order.items) {
                await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty } });
              }
              order.stockAdjusted = true;
            }
            
            await order.save();
            res.json({ success: true, status: 'paid', order });
          } else if (response.vnp_ResponseCode === '01') {
            // Transaction not found or pending
            res.json({ success: true, status: 'pending', message: response.vnp_Message });
          } else {
            // Payment failed
            order.payment.status = 'failed';
            order.status = 'cancelled';
            await order.save();
            res.json({ success: true, status: 'failed', message: response.vnp_Message });
          }
        } catch (err) {
          res.status(500).json({ error: 'Failed to parse VNPay query response' });
        }
      });
    }).on('error', (err) => {
      res.status(500).json({ error: err.message });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// VNPay return callback
exports.returnCallback = async (req, res) => {
  try {
    const vnp_Params = req.query;

    // 1. Verify signature using utility function
    const isValidSignature = verifyVnpaySecureHash(vnp_Params, VNPAY_CONFIG.hashSecret);
    if (!isValidSignature) {
      console.error('[VNPay Return] Invalid signature');
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/error?msg=Invalid signature`);
    }

    const orderId = vnp_Params.vnp_TxnRef.split('_')[0];
    const responseCode = vnp_Params.vnp_ResponseCode;

    // Just redirect to frontend, let frontend query status actively
    if (responseCode === '00') {
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/success?orderId=${orderId}`);
    } else {
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/cancel?orderId=${orderId}`);
    }
  } catch (err) {
    console.error('[VNPay Return] Error:', err);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/error?msg=${encodeURIComponent(err.message)}`);
  }
};

// VNPay IPN callback
exports.ipnCallback = async (req, res) => {
  try {
    const vnp_Params = req.query;

    // 1. Verify signature using utility function
    const isValidSignature = verifyVnpaySecureHash(vnp_Params, VNPAY_CONFIG.hashSecret);
    if (!isValidSignature) {
      console.error('[VNPay IPN] Invalid signature');
      return res.status(200).json({ RspCode: '97', Message: 'Invalid signature' });
    }

    const orderId = vnp_Params.vnp_TxnRef.split('_')[0];
    const responseCode = vnp_Params.vnp_ResponseCode;
    const transactionNo = vnp_Params.vnp_TransactionNo;
    const amount = vnp_Params.vnp_Amount; // Already in VND * 100

    // 2. Find order
    const order = await Order.findById(orderId);
    if (!order) {
      console.error('[VNPay IPN] Order not found:', orderId);
      return res.status(200).json({ RspCode: '01', Message: 'Order not found' });
    }

    // 3. Idempotency check - prevent double processing
    const existingEvent = order.paymentEvents?.find(
      e => e.provider === 'vnpay' && e.transactionId === transactionNo
    );
    if (existingEvent) {
      console.log('[VNPay IPN] Duplicate event ignored:', transactionNo);
      return res.status(200).json({ RspCode: '02', Message: 'Order already confirmed' });
    }

    // 4. Amount validation - CRITICAL security check
    const expectedAmount = Math.round(order.total * 100); // VNPay uses VND * 100
    const receivedAmount = parseInt(amount);
    if (receivedAmount !== expectedAmount) {
      console.error('[VNPay IPN] Amount mismatch:', {
        expected: expectedAmount,
        received: receivedAmount,
        orderId
      });
      return res.status(200).json({ RspCode: '04', Message: 'Invalid Amount' });
    }

    // 5. Log payment event for idempotency
    order.paymentEvents = order.paymentEvents || [];
    order.paymentEvents.push({
      eventType: 'ipn',
      provider: 'vnpay',
      transactionId: transactionNo,
      resultCode: responseCode,
      receivedAt: new Date(),
      rawData: vnp_Params
    });

    // 6. Update order status based on result
    if (responseCode === '00') {
      order.payment.status = 'paid';
      order.payment.transactionId = transactionNo;
      order.payment.gatewayTransactionId = transactionNo;
      order.payment.paidAt = new Date();
      order.status = 'paid';
      
      if (!order.stockAdjusted) {
        for (const item of order.items) {
          await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty } });
        }
        order.stockAdjusted = true;
        console.log('[VNPay IPN] Stock adjusted for order:', orderId);
      }
      
      await order.save();
      console.log('[VNPay IPN] Payment successful:', orderId);
      res.status(200).json({ RspCode: '00', Message: 'Success' });
    } else {
      order.payment.status = 'failed';
      order.status = 'cancelled';
      await order.save();
      console.log('[VNPay IPN] Payment failed:', { orderId, responseCode });
      res.status(200).json({ RspCode: '00', Message: 'Success' });
    }
  } catch (err) {
    console.error('[VNPay IPN] Error:', err);
    res.status(200).json({ RspCode: '99', Message: 'Unknown error' });
  }
};

// SANDBOX ONLY: Simulate VNPay callback from frontend
exports.simulateCallback = async (req, res) => {
  try {
    const { orderId, txnRef, amount, responseCode, transactionStatus } = req.body;
    
    console.log('[VNPay Simulator] Simulating callback for order:', orderId);
    
    // Find order
    const order = await Order.findById(orderId).populate('items.product');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Build fake IPN data that matches real VNPay format
    const fakeTransactionNo = `VNPAY_SIMULATE_${Date.now()}`;
    const vnpAmount = amount || (Math.round(order.total * 100)).toString();
    
    const ipnData = {
      vnp_TmnCode: VNPAY_CONFIG.tmnCode,
      vnp_TxnRef: txnRef || orderId.toString(),
      vnp_Amount: vnpAmount,
      vnp_OrderInfo: `Payment for order ${orderId}`,
      vnp_ResponseCode: responseCode || '00',
      vnp_TransactionNo: fakeTransactionNo,
      vnp_BankCode: 'VNBANK',
      vnp_PayDate: new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14),
      vnp_TransactionStatus: transactionStatus || '00',
      // Note: Signature validation skipped in simulator
    };

    // Process the simulated callback
    if (ipnData.vnp_ResponseCode === '00' && ipnData.vnp_TransactionStatus === '00') {
      // Check idempotency
      if (order.paymentEvents?.some(e => e.provider === 'vnpay' && e.transactionId === fakeTransactionNo)) {
        console.log('[VNPay Simulator] Duplicate transaction - idempotency caught');
        return res.status(200).json({ 
          success: true, 
          message: 'Duplicate transaction (idempotency)', 
          order 
        });
      }

      // Validate amount
      const expectedAmount = Math.round(order.total * 100);
      const receivedAmount = parseInt(vnpAmount);
      if (expectedAmount !== receivedAmount) {
        console.log('[VNPay Simulator] Amount mismatch:', { expectedAmount, receivedAmount });
        return res.status(400).json({ 
          success: false, 
          message: 'Amount mismatch' 
        });
      }

      // Log event
      if (!order.paymentEvents) order.paymentEvents = [];
      order.paymentEvents.push({
        eventType: 'ipn',
        provider: 'vnpay',
        transactionId: fakeTransactionNo,
        resultCode: ipnData.vnp_ResponseCode,
        rawData: ipnData
      });

      // Update order status
      order.payment.status = 'paid';
      order.payment.transactionId = fakeTransactionNo;
      order.payment.paidAt = new Date();
      order.status = 'processing';

      // Decrement stock if not already done
      if (!order.stockAdjusted) {
        for (const item of order.items) {
          const product = await Product.findById(item.product);
          if (product) {
            product.stock -= item.quantity;
            if (product.stock < 0) product.stock = 0;
            await product.save();
          }
        }
        order.stockAdjusted = true;
      }

      await order.save();
      
      console.log('[VNPay Simulator] Payment successful, order updated');
      return res.json({ 
        success: true, 
        message: 'Payment simulated successfully', 
        order 
      });
    } else {
      // Failed payment
      order.payment.status = 'failed';
      order.status = 'cancelled';
      await order.save();
      
      console.log('[VNPay Simulator] Payment failed simulation');
      return res.json({ 
        success: true, 
        message: 'Payment failure simulated', 
        order 
      });
    }
  } catch (err) {
    console.error('[VNPay Simulator] Error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};
