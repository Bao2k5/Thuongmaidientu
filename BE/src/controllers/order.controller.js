// src/controllers/order.controller.js
const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

exports.createOrder = async (req, res) => {
  try {
    console.log('[createOrder] Request body:', JSON.stringify(req.body, null, 2));
    console.log('[createOrder] User:', req.user);

    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    console.log('[createOrder] Cart found:', cart ? `${cart.items.length} items` : 'No cart');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ 
        success: false,
        msg: 'Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi đặt hàng.',
        error: 'CART_EMPTY' 
      });
    }

    // basic total calculation
    let total = 0;
    const items = cart.items.map(i => {
      if (!i.product) {
        console.error('[createOrder] Product not found in cart item:', i);
        throw new Error('Sản phẩm trong giỏ hàng không tồn tại');
      }
      const price = i.product.priceSale || i.product.price || 0;
      total += price * i.qty;
      return { product: i.product._id, qty: i.qty, price };
    });

    console.log('[createOrder] Order items:', items);
    console.log('[createOrder] Total:', total);

    const paymentMethod = req.body.paymentMethod || 'cod';
    
    const order = await Order.create({ 
      user: req.user.id, 
      items, 
      total, 
      address: req.body.address || req.body.shippingAddress || '',
      phone: req.body.phone || '',
      email: req.body.email || req.user.email || '',
      fullName: req.body.fullName || req.user.name || '',
      note: req.body.note || '',
      payment: {
        method: paymentMethod,
        status: 'pending',
        gateway: paymentMethod === 'cod' ? 'none' : paymentMethod,
        amount: total,
        currency: 'VND'
      }
    });

    console.log('[createOrder] Order created:', order._id);

    // decrement stock (only for non-Stripe orders; Stripe orders decrement in webhook)
    if (!req.body.useStripe) {
      for (const it of items) {
        await Product.findByIdAndUpdate(it.product, { $inc: { stock: -it.qty } });
      }
      order.stockAdjusted = true;
      await order.save();
    }

    // clear cart
    await Cart.findOneAndDelete({ user: req.user.id });
    console.log('[createOrder] Cart cleared');

    res.status(201).json({
      success: true,
      message: 'Đặt hàng thành công',
      ...order.toObject()
    });
  } catch (err) {
    console.error('[createOrder] Error:', err);
    console.error('[createOrder] Stack:', err.stack);
    res.status(500).json({ 
      success: false,
      error: err.message,
      msg: 'Đặt hàng thất bại. Vui lòng thử lại sau.' 
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const orders = await Order.find().sort('-createdAt');
      return res.json(orders);
    }
    const orders = await Order.find({ user: req.user.id }).sort('-createdAt');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Not found' });
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Not found' });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// mock payment: mark as paid
exports.mockPayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Not found' });
    order.payment = { method: 'mock', status: 'paid', transactionId: 'MOCK-' + Date.now() };
    order.status = 'paid';
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
