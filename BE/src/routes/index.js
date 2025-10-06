// src/routes/index.js
const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const productRoutes = require("./product.routes");
const collectionRoutes = require("./collection.routes");
const promoRoutes = require("./promo.routes");
const cartRoutes = require("./cart.routes");
const orderRoutes = require("./order.routes");
const adminRoutes = require('./admin.routes');

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/collections", collectionRoutes);
router.use("/promos", promoRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
