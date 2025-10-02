const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  image:       { type: String }, 
  stock:       { type: Number, default: 0 },
  brand:       { type: String }, 
  category:    { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
