// src/controllers/auth.controller.js
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const { sendMail } = require('../utils/mailer');

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) return res.status(400).json({ msg: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await User.create({ name, email, password: hashed });
    const token = signToken(newUser);

    res.status(201).json({ message: "Registered", user: { id: newUser._id, name: newUser.name, email: newUser.email }, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log('[auth.login] body:', req.body);
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Missing fields" });

    const user = await User.findOne({ email });
    console.log('[auth.login] user from DB:', user ? { email: user.email, id: user._id, role: user.role } : null);
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('[auth.login] bcrypt compare result:', isMatch);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    let token;
    try {
      token = signToken(user);
    } catch (jwtErr) {
      console.error('[auth.login] jwt.sign error:', jwtErr && jwtErr.stack ? jwtErr.stack : jwtErr);
      return res.status(500).json({ error: 'JWT error' });
    }
    res.json({ message: "Login success", user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error('[auth.login] error:', err && err.stack ? err.stack : err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Email not found" });
    // generate secure token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 30; // 30 minutes
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL || ''}/reset-password?email=${encodeURIComponent(email)}&token=${resetToken}`;
    const html = `<p>Xin chào ${user.name},</p><p>Click link để đặt lại mật khẩu: <a href="${resetUrl}">${resetUrl}</a></p><p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>`;
    const mailResult = await sendMail({ to: email, subject: 'Đặt lại mật khẩu', html, text: `Reset link: ${resetUrl}` }).catch(()=>null);

    if (!mailResult) return res.json({ message: 'Password reset token generated', resetToken });
    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    if (!email || !token || !newPassword) return res.status(400).json({ msg: 'Missing fields' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid request' });
    if (user.resetPasswordToken !== token || Date.now() > user.resetPasswordExpires) return res.status(400).json({ msg: 'Token invalid or expired' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.sendVerifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Email not found' });
    const token = crypto.randomBytes(16).toString('hex');
    user.verifyEmailToken = token;
    await user.save();
    const verifyUrl = `${process.env.FRONTEND_URL || ''}/verify-email?email=${encodeURIComponent(email)}&token=${token}`;
    const html = `<p>Xin chào ${user.name},</p><p>Click link để xác thực email: <a href="${verifyUrl}">${verifyUrl}</a></p>`;
    const mailResult = await sendMail({ to: email, subject: 'Xác thực email', html, text: `Verify link: ${verifyUrl}` }).catch(()=>null);
    if (!mailResult) return res.json({ message: 'Verify token generated', token });
    res.json({ message: 'Verify email sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, token } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid request' });
    if (user.verifyEmailToken !== token) return res.status(400).json({ msg: 'Invalid token' });
    user.emailVerified = true;
    user.verifyEmailToken = undefined;
    await user.save();
    res.json({ message: 'Email verified' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
