// src/routes/upload.routes.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

router.post('/image', verifyToken, isAdmin, uploadController.upload, uploadController.uploadImage);
router.delete('/image', verifyToken, isAdmin, uploadController.deleteImage);

module.exports = router;