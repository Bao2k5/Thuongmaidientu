const User = require('../models/user.model');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const AdminLog = require('../models/adminLog.model');
const { sendMail } = require('../utils/mailer');

exports.listUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
  const users = await User.find({ deleted: { $ne: true } }).select('-password').skip(skip).limit(limit).sort('-createdAt');
  const total = await User.countDocuments({ deleted: { $ne: true } });
    res.json({ users, total, page, pages: Math.ceil(total/limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'Not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = {};
    if (req.body.role) updates.role = req.body.role;
    if (typeof req.body.emailVerified !== 'undefined') updates.emailVerified = req.body.emailVerified;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
  const u = await User.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
  // log
  if (u) await AdminLog.create({ admin: req.user.id, action: 'soft_delete_user', resource: 'User', resourceId: u._id, details: { email: u.email } }).catch(err => console.error('AdminLog failed:', err.message));
  res.json({ msg: 'Soft deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const orders = await Order.find(filter).sort('-createdAt');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ msg: 'Not found' });
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

exports.updateOrderShipping = async (req, res) => {
  try {
    const { carrier, trackingNumber, cost } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Not found' });
    order.shipping = order.shipping || {};
    if (carrier) order.shipping.carrier = carrier;
    if (trackingNumber) order.shipping.trackingNumber = trackingNumber;
    if (typeof cost !== 'undefined') order.shipping.cost = cost;
    await order.save();
    // log
    await AdminLog.create({ admin: req.user.id, action: 'update_order_shipping', resource: 'Order', resourceId: order._id, details: { shipping: order.shipping } }).catch(err => console.error('AdminLog failed:', err.message));
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const revenueAgg = await Order.aggregate([
      { $match: { status: { $in: ['paid','completed','shipped'] } } },
      { $group: { _id: null, revenue: { $sum: '$total' } } }
    ]);
    const revenue = revenueAgg.length ? revenueAgg[0].revenue : 0;
    const topProducts = await Product.aggregate([
      { $unwind: '$attributes' },
      { $project: { name: 1, sold: '$attributes.sold' } },
      { $sort: { sold: -1 } },
      { $limit: 5 }
    ]).catch(() => []);
    res.json({ totalUsers, totalOrders, revenue, topProducts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const logs = await AdminLog.find().sort('-createdAt').skip(skip).limit(limit).populate('admin', 'name email');
    const total = await AdminLog.countDocuments();
    res.json({ logs, total, page, pages: Math.ceil(total/limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.sendTestEmail = async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    if (!to) return res.status(400).json({ msg: 'to is required' });
    const info = await sendMail({ to, subject: subject || 'Test email', text, html });
    if (!info) return res.status(400).json({ msg: 'SMTP not configured, email not sent' });
    await AdminLog.create({ admin: req.user.id, action: 'send_test_email', details: { to, subject } }).catch(err => console.error('AdminLog failed:', err.message));
    res.json({ msg: 'Sent', info });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// bulk update products: accepts array of { id, updates }
exports.bulkUpdateProducts = async (req, res) => {
  try {
    const list = req.body.list;
    if (!Array.isArray(list)) return res.status(400).json({ msg: 'list required' });
    const results = [];
    const allowed = ['price','priceSale','stock','isFlashSale','tags','name','sku'];
    for (const item of list) {
      // sanitize updates: only allow certain fields
      const updates = {};
      if (item.updates) {
        for (const k of Object.keys(item.updates)) {
          if (allowed.includes(k)) updates[k] = item.updates[k];
        }
      }
      const p = await Product.findByIdAndUpdate(item.id, updates, { new: true });
      if (p) {
        results.push({ id: p._id, ok: true });
        await AdminLog.create({ admin: req.user.id, action: 'update_product', resource: 'Product', resourceId: p._id, details: item.updates }).catch(err => console.error('AdminLog failed:', err.message));
      } else {
        results.push({ id: item.id, ok: false });
      }
    }
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
