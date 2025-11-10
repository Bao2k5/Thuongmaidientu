const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { body } = require('express-validator');
const { handleValidation } = require('../middleware/validate.middleware');
const { authLimiter, forgotLimiter } = require('../middleware/security.middleware');
const passport = require('../middleware/passport');

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

// OAuth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed` }), authController.googleCallback);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed` }), authController.facebookCallback);

module.exports = router;
