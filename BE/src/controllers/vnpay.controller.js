// src/controllers/vnpay.controller.js
const crypto = require('crypto');
const querystring = require('querystring');
const Order = require('../models/order.model');
const Product = require('../models/product.model');

// VNPay configuration (replace with your credentials)
const VNPAY_CONFIG = {
  tmnCode: process.env.VNPAY_TMN_CODE || 'DEMOSHOP',
  hashSecret: process.env.VNPAY_HASH_SECRET || 'TESTDEMOSHOPSECRET',
  url: process.env.VNPAY_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  returnUrl: process.env.VNPAY_RETURN_URL || 'http://localhost:5000/api/payment/vnpay/return',
  ipnUrl: process.env.VNPAY_IPN_URL || 'http://localhost:5000/api/payment/vnpay/ipn',
};

// Sort object keys for signature
function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, '+');
  });
  return sorted;
}

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

    // Create signature
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', VNPAY_CONFIG.hashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params.vnp_SecureHash = signed;

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
    let vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    // Sort params
    vnp_Params = sortObject(vnp_Params);

    // Verify signature
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', VNPAY_CONFIG.hashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash !== signed) {
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
    console.error('VNPay return error:', err);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/error?msg=${encodeURIComponent(err.message)}`);
  }
};

// VNPay IPN callback
exports.ipnCallback = async (req, res) => {
  try {
    let vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac('sha512', VNPAY_CONFIG.hashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash !== signed) {
      return res.status(200).json({ RspCode: '97', Message: 'Invalid signature' });
    }

    const orderId = vnp_Params.vnp_TxnRef.split('_')[0];
    const responseCode = vnp_Params.vnp_ResponseCode;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(200).json({ RspCode: '01', Message: 'Order not found' });
    }

    if (order.payment.status === 'paid') {
      return res.status(200).json({ RspCode: '02', Message: 'Order already confirmed' });
    }

    if (responseCode === '00') {
      order.payment.status = 'paid';
      order.payment.transactionId = vnp_Params.vnp_TransactionNo;
      order.status = 'paid';
      
      if (!order.stockAdjusted) {
        for (const item of order.items) {
          await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty } });
        }
        order.stockAdjusted = true;
      }
      
      await order.save();
      res.status(200).json({ RspCode: '00', Message: 'Success' });
    } else {
      order.payment.status = 'failed';
      order.status = 'cancelled';
      await order.save();
      res.status(200).json({ RspCode: '00', Message: 'Success' });
    }
  } catch (err) {
    console.error('VNPay IPN error:', err);
    res.status(200).json({ RspCode: '99', Message: 'Unknown error' });
  }
};
