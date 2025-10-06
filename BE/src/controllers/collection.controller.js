// src/controllers/collection.controller.js
const Collection = require('../models/collection.model');
const Product = require('../models/product.model');

exports.listCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCollectionBySlug = async (req, res) => {
  try {
    const col = await Collection.findOne({ slug: req.params.slug });
    if (!col) return res.status(404).json({ msg: 'Not found' });
    // return products in collection with pagination
    let { page = 1, limit = 12 } = req.query; page = parseInt(page); limit = parseInt(limit);
    const filter = { collection: col._id };
    const products = await Product.find(filter).skip((page-1)*limit).limit(limit);
    const total = await Product.countDocuments(filter);
    res.json({ collection: col, products, total, page, pages: Math.ceil(total/limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
