const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { body } = require('express-validator');
const { handleValidation } = require('../middleware/validate.middleware');
const { authLimiter, forgotLimiter } = require('../middleware/security.middleware');

router.post(
	"/register",
	[body('name').isLength({ min: 2 }), body('email').isEmail(), body('password').isLength({ min: 6 })],
	handleValidation,
	authController.register
);

router.post(
	"/login",
	authLimiter,
	[body('email').isEmail(), body('password').exists()],
	handleValidation,
	authController.login
);

router.post(
	"/forgot-password",
	forgotLimiter,
	[body('email').isEmail()],
	handleValidation,
	authController.forgotPassword
);

router.post(
	"/reset-password",
	[body('email').isEmail(), body('token').exists(), body('newPassword').isLength({ min: 6 })],
	handleValidation,
	authController.resetPassword
);

router.post('/send-verify', [body('email').isEmail()], handleValidation, authController.sendVerifyEmail);
router.post('/verify-email', [body('email').isEmail(), body('token').exists()], handleValidation, authController.verifyEmail);

module.exports = router;
