// src/models/order.model.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      qty: { type: Number, default: 1 },
      price: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "shipped", "completed", "cancelled"], default: "pending" },
  address: { type: String },
  shipping: {
    carrier: { type: String },
    trackingNumber: { type: String },
    cost: { type: Number, default: 0 }
  },
  payment: {
    method: { type: String },
    status: { type: String, enum: ['pending','paid','failed'], default: 'pending' },
    transactionId: { type: String }
  },
  stockAdjusted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
