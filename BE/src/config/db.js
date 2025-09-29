// src/config/db.js
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Đã kết nối MongoDB thành công!");
  } catch (error) {
    console.error("❌ Kết nối MongoDB thất bại:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
