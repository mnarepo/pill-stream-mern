const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const env = require('../config/env');
const { successResponse, createError } = require('../utils/apiResponse');

const userPayload = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  address: user.address,
  city: user.city,
  role: user.role,
  isVerified: user.isVerified,
  avatar: user.avatar,
  createdAt: user.createdAt
});

exports.registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional({ checkFalsy: true }).trim()
];

exports.loginValidation = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone, address, city } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return next(createError('Email is already registered', 409));

    const user = await User.create({ name, email, password, phone, address, city, role: 'customer' });
    const token = generateToken(user._id);

    return successResponse(res, 'Registration successful', { user: userPayload(user), token }, 201);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return next(createError('Invalid email or password', 401));
    }

    const token = generateToken(user._id);
    return successResponse(res, 'Login successful', { user: userPayload(user), token });
  } catch (error) {
    next(error);
  }
};

exports.me = async (req, res, next) => {
  try {
    return successResponse(res, 'Logged in user fetched', { user: req.user });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    return successResponse(res, 'Logout successful. Please remove token from client storage.', {});
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return next(createError('Email is required', 400));

    const user = await User.findOne({ email });
    if (!user) return next(createError('No account found with this email', 404));

    const resetToken = generateToken(user._id, { purpose: 'password_reset' });
    const resetUrl = `${env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: 'Pill Stream Password Reset',
      html: `<p>Hello ${user.name},</p><p>Use this link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
      text: `Use this link to reset your password: ${resetUrl}`
    });

    const payload = env.NODE_ENV === 'production' ? {} : { resetToken, resetUrl };
    return successResponse(res, 'Password reset instructions sent if email is configured', payload);
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return next(createError('Token and password are required', 400));
    if (password.length < 6) return next(createError('Password must be at least 6 characters', 400));

    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (decoded.purpose !== 'password_reset') return next(createError('Invalid reset token', 400));

    const user = await User.findById(decoded.id).select('+password');
    if (!user) return next(createError('User not found', 404));

    user.password = password;
    await user.save();

    return successResponse(res, 'Password reset successful');
  } catch (error) {
    next(createError('Invalid or expired reset token', 400));
  }
};
