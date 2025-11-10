// src/routes/payment.routes.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
const { paymentLimiter } = require('../middleware/security.middleware');
const momoController = require('../controllers/momo.controller');
const vnpayController = require('../controllers/vnpay.controller');

// MoMo routes
router.post('/momo/create', paymentLimiter, verifyToken, momoController.createPayment);
router.post('/momo/query', verifyToken, momoController.queryPaymentStatus); // Active query
router.post('/momo/ipn', momoController.ipnCallback);
router.get('/momo/callback', momoController.handleCallback);

// VNPay routes
router.post('/vnpay/create', paymentLimiter, verifyToken, vnpayController.createPayment);
router.post('/vnpay/query', verifyToken, vnpayController.queryPaymentStatus); // Active query
router.get('/vnpay/return', vnpayController.returnCallback);
router.get('/vnpay/ipn', vnpayController.ipnCallback);

module.exports = router;
