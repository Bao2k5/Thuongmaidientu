// src/routes/product.routes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

// public
router.get("/", productController.listProducts);
router.get("/:id", productController.getProductById);

// admin protected
router.post("/", verifyToken, isAdmin, productController.createProduct);
router.put("/:id", verifyToken, isAdmin, productController.updateProduct);
router.delete("/:id", verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
