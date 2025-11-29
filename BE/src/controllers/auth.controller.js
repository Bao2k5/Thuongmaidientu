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
    const { name, email, password, phone } = req.body;
    if (!email || !password || !name) return res.status(400).json({ msg: "Missing fields" });

    const existing = await User.findOne({ email });

    // Nếu email đã tồn tại VÀ đã verified → Không cho đăng ký lại
    if (existing && existing.verified) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // Nếu email tồn tại NHƯNG chưa verified → Xóa user cũ, cho đăng ký lại
    if (existing && !existing.verified) {
      await User.findByIdAndDelete(existing._id);
      console.log(`[register] Deleted unverified user: ${email}`);
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      phone: phone || '',
      otp,
      otpExpire,
      verified: false
    });

    // Send OTP email
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #0b5c5f; text-align: center;">🎉 Chào mừng đến HM Jewelry!</h2>
        <p>Xin chào <strong>${name}</strong>,</p>
        <p>Cảm ơn bạn đã đăng ký tài khoản tại <strong>HM Jewelry</strong>.</p>
        <p>Mã xác thực OTP của bạn là:</p>
        <div style="background-color: #f0f9f9; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <h1 style="color: #0b5c5f; font-size: 36px; margin: 0; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p style="color: #d32f2f; font-weight: bold;"> Mã này có hiệu lực trong 10 phút.</p>
        <p>Nếu bạn không thực hiện đăng ký, vui lòng bỏ qua email này.</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="color: #888; font-size: 12px; text-align: center;">Trân trọng,<br><strong>Đội ngũ HM Jewelry</strong></p>
      </div>
    `;

    const mailResult = await sendMail({
      to: email,
      subject: ' Mã xác thực đăng ký - HM Jewelry',
      html,
      text: `Mã OTP của bạn là: ${otp}. Có hiệu lực trong 10 phút.`
    }).catch(err => {
      console.error('[register] Error sending OTP email:');
      console.error('  Error name:', err.name);
      console.error('  Error message:', err.message);
      console.error('  Full error:', err);
      return null;
    });

    if (!mailResult) {
      // If email fails, still return success but include OTP for testing
      return res.status(201).json({
        message: "Đăng ký thành công nhưng không thể gửi email. Vui lòng liên hệ support.",
        needsVerification: true,
        email,
        otp // Only for development/testing
      });
    }

    res.status(201).json({
      message: "Đăng ký thành công! Vui lòng kiểm tra email để nhập mã OTP.",
      needsVerification: true,
      email
    });
  } catch (err) {
    console.error('Register error:', err);
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
    res.json({
      message: "Login success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        createdAt: user.createdAt
      },
      token
    });
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
    const mailResult = await sendMail({ to: email, subject: 'Đặt lại mật khẩu', html, text: `Reset link: ${resetUrl}` }).catch(() => null);

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
    const mailResult = await sendMail({ to: email, subject: 'Xác thực email', html, text: `Verify link: ${verifyUrl}` }).catch(() => null);
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

// OAuth callbacks
exports.googleCallback = async (req, res) => {
  try {
    const token = signToken(req.user);
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (err) {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
  }
};

exports.facebookCallback = async (req, res) => {
  try {
    const token = signToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (err) {
    res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
  }
};

// Change password (authenticated user)
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ msg: 'New password must be at least 6 characters' });
    }

    // Get user from database
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send OTP to email for password reset
exports.sendResetCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Email không tồn tại trong hệ thống" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = otp;
    user.resetCodeExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send email with OTP
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #0b5c5f; text-align: center;">🔐 Đặt lại mật khẩu</h2>
        <p>Xin chào <strong>${user.name || "bạn"}</strong>!</p>
        <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản <strong>${email}</strong>.</p>
        <p>Mã xác thực OTP của bạn là:</p>
        <div style="background-color: #f0f9f9; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <h1 style="color: #0b5c5f; font-size: 36px; margin: 0; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p style="color: #d32f2f; font-weight: bold;">⚠️ Mã này có hiệu lực trong 10 phút.</p>
        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="color: #888; font-size: 12px; text-align: center;">Trân trọng,<br><strong>Đội ngũ HM Jewelry</strong></p>
      </div>
    `;

    const mailResult = await sendMail({
      to: email,
      subject: '🔐 Mã OTP đặt lại mật khẩu - HM Jewelry',
      html,
      text: `Mã OTP của bạn là: ${otp}. Có hiệu lực trong 10 phút.`
    }).catch(err => {
      console.error('Error sending OTP email:', err);
      return null;
    });

    if (!mailResult) {
      // If email fails, still return success but include OTP in response for testing
      return res.json({
        message: "Không thể gửi email. Vui lòng kiểm tra cấu hình SMTP.",
        otp // Only for development/testing
      });
    }

    res.json({ message: "Mã xác thực đã được gửi qua email của bạn" });
  } catch (err) {
    console.error('sendResetCode error:', err);
    res.status(500).json({ msg: "Lỗi khi gửi mã xác thực", error: err.message });
  }
};

// Verify OTP and reset password
exports.verifyResetCode = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ msg: "Thiếu thông tin bắt buộc" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ msg: "Mật khẩu mới phải có ít nhất 6 ký tự" });
    }

    const user = await User.findOne({ email, resetCode: code });

    if (!user) {
      return res.status(400).json({ msg: "Mã OTP không hợp lệ" });
    }

    if (!user.resetCodeExpire || user.resetCodeExpire < Date.now()) {
      return res.status(400).json({ msg: "Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới." });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP fields
    user.resetCode = undefined;
    user.resetCodeExpire = undefined;
    await user.save();

    res.json({ message: "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay." });
  } catch (err) {
    console.error('verifyResetCode error:', err);
    res.status(500).json({ msg: "Lỗi khi xác thực mã OTP", error: err.message });
  }
};

// Verify OTP for registration
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ msg: "Thiếu thông tin bắt buộc" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Không tìm thấy tài khoản" });
    }

    if (user.verified) {
      return res.json({ message: "Tài khoản đã được xác thực trước đó", alreadyVerified: true });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Mã OTP không chính xác" });
    }

    if (!user.otpExpire || user.otpExpire < Date.now()) {
      return res.status(400).json({ msg: "Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới." });
    }

    // Mark as verified
    user.verified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    // Generate token for auto-login
    const token = signToken(user);

    res.json({
      message: "Xác thực thành công! Chào mừng bạn đến với HM Jewelry 🎉",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        createdAt: user.createdAt
      },
      token
    });
  } catch (err) {
    console.error('verifyOtp error:', err);
    res.status(500).json({ msg: "Lỗi xác thực OTP", error: err.message });
  }
};

// Resend OTP for registration
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email là bắt buộc" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "Không tìm thấy tài khoản" });
    }

    if (user.verified) {
      return res.json({ message: "Tài khoản đã được xác thực", alreadyVerified: true });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send email
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #0b5c5f; text-align: center;">🔄 Mã xác thực mới</h2>
        <p>Xin chào <strong>${user.name}</strong>,</p>
        <p>Bạn đã yêu cầu gửi lại mã xác thực.</p>
        <p>Mã OTP mới của bạn là:</p>
        <div style="background-color: #f0f9f9; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <h1 style="color: #0b5c5f; font-size: 36px; margin: 0; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p style="color: #d32f2f; font-weight: bold;">⚠️ Mã này có hiệu lực trong 10 phút.</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="color: #888; font-size: 12px; text-align: center;">Trân trọng,<br><strong>Đội ngũ HM Jewelry</strong></p>
      </div>
    `;

    const mailResult = await sendMail({
      to: email,
      subject: '🔄 Mã OTP mới - HM Jewelry',
      html,
      text: `Mã OTP mới của bạn là: ${otp}. Có hiệu lực trong 10 phút.`
    }).catch(err => {
      console.error('Error sending resend OTP email:', err);
      return null;
    });

    if (!mailResult) {
      return res.json({
        message: "Không thể gửi email. Vui lòng thử lại sau.",
        otp // Only for development/testing
      });
    }

    res.json({ message: "Đã gửi lại mã OTP mới! Vui lòng kiểm tra email của bạn." });
  } catch (err) {
    console.error('resendOtp error:', err);
    res.status(500).json({ msg: "Lỗi gửi lại OTP", error: err.message });
  }
};

