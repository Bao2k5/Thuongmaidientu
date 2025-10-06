// src/models/user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin", "seller"], default: "user" },
  address: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  emailVerified: { type: Boolean, default: false },
  verifyEmailToken: { type: String },
  deleted: { type: Boolean, default: false },
  addresses: [
    {
      label: { type: String },
      name: { type: String },
      phone: { type: String },
      line1: { type: String },
      city: { type: String },
      province: { type: String },
      postalCode: { type: String }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
