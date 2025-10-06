// src/controllers/order.controller.js
const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ msg: 'Cart empty' });

    // basic total calculation
    let total = 0;
    const items = cart.items.map(i => {
      const price = i.product.priceSale || i.product.price || 0;
      total += price * i.qty;
      return { product: i.product._id, qty: i.qty, price };
    });
    const order = await Order.create({ user: req.user.id, items, total, address: req.body.address });
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
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
