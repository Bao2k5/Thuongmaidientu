// src/controllers/product.controller.js
const Product = require("../models/product.model");

// list products with simple pagination
exports.listProducts = async (req, res) => {
  try {
    let { page = 1, limit = 12, q } = req.query;
    page = parseInt(page); limit = parseInt(limit);
    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };

    const products = await Product.find(filter).skip((page - 1) * limit).limit(limit);
    const total = await Product.countDocuments(filter);
    res.json({ products, total, page, pages: Math.ceil(total/limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ msg: "Not found" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const body = req.body;
    const newP = await Product.create(body);
    res.status(201).json(newP);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
