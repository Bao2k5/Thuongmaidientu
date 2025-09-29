// src/routes/user.routes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// GET /api/users/profile
router.get("/profile", verifyToken, userController.getProfile);

// PUT /api/users/profile
router.put("/profile", verifyToken, userController.updateProfile);

module.exports = router;
