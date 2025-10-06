// src/controllers/product.controller.js
const Product = require("../models/product.model");
const { uploadImage, deleteImage } = require('../utils/cloudinary');

// list products with simple pagination
exports.listProducts = async (req, res) => {
  try {
    let { page = 1, limit = 12, q, collection, tag, minPrice, maxPrice, flash } = req.query;
    page = parseInt(page); limit = parseInt(limit);
    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };
    if (collection) filter.collection = collection;
    if (tag) filter.tags = tag;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    if (flash === '1' || flash === 'true') filter.isFlashSale = true;

    let products = await Product.find(filter).populate('collection').skip((page - 1) * limit).limit(limit);
    const total = await Product.countDocuments(filter);

    // apply simple promo logic: if product.isFlashSale or an external promo applies,
    // frontend can use priceSale if present. For now, if priceSale field exists keep it.
    products = products.map(p => {
      const obj = p.toObject();
      if (obj.priceSale) obj.displayPrice = obj.priceSale; else obj.displayPrice = obj.price;
      return obj;
    });

    res.json({ products, total, page, pages: Math.ceil(total/limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).populate('collection');
    if (!p) return res.status(404).json({ msg: "Not found" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const p = await Product.findOne({ slug: req.params.slug }).populate('collection');
    if (!p) return res.status(404).json({ msg: 'Not found' });
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

// add image to product via buffer (multer single file)
exports.addProductImage = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) return res.status(400).json({ msg: 'file required' });
    const result = await uploadImage(req.file.buffer, 'products');
    const product = await Product.findById(req.params.id);
    product.images = product.images || [];
    product.images.push({ url: result.secure_url, public_id: result.public_id });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProductImage = async (req, res) => {
  try {
    const { publicId } = req.body;
    if (!publicId) return res.status(400).json({ msg: 'publicId required' });
    await deleteImage(publicId);
    const product = await Product.findById(req.params.id);
    if (product && product.images) {
      product.images = product.images.filter(i => i.public_id !== publicId);
      await product.save();
    }
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
