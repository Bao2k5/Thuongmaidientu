// src/controllers/wishlist.controller.js
const User = require('../models/user.model');

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    res.json(user.wishlist || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { productId } = req.params;
    if (!user) return res.status(404).json({ msg: 'User not found' });
    if (!user.wishlist) user.wishlist = [];
    if (user.wishlist.find(id => id.toString() === productId)) return res.status(400).json({ msg: 'Already in wishlist' });
    user.wishlist.push(productId);
    await user.save();
    res.status(201).json(user.wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { productId } = req.params;
    if (!user) return res.status(404).json({ msg: 'User not found' });
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
