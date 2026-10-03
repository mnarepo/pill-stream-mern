const { body } = require('express-validator');
const User = require('../models/User');
const { successResponse, createError } = require('../utils/apiResponse');

exports.updateProfileValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').optional({ checkFalsy: true }).trim(),
  body('address').optional({ checkFalsy: true }).trim(),
  body('city').optional({ checkFalsy: true }).trim()
];

exports.adminUpdateUserValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('role').optional().isIn(['customer', 'admin']).withMessage('Role must be customer or admin'),
  body('isVerified').optional().isBoolean().withMessage('isVerified must be boolean')
];

exports.getProfile = async (req, res, next) => {
  try {
    return successResponse(res, 'Profile fetched', { user: req.user });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const allowed = ['name', 'email', 'phone', 'address', 'city', 'avatar'];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) req.user[field] = req.body[field];
    });
    await req.user.save();
    return successResponse(res, 'Profile updated', { user: req.user });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const filter = search
      ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }, { phone: new RegExp(search, 'i') }] }
      : {};
    const users = await User.find(filter).sort({ createdAt: -1 });
    return successResponse(res, 'Users fetched', { users });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError('User not found', 404));
    return successResponse(res, 'User fetched', { user });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError('User not found', 404));

    ['name', 'email', 'phone', 'address', 'city', 'role', 'isVerified', 'avatar'].forEach((field) => {
      if (req.body[field] !== undefined) user[field] = req.body[field];
    });
    await user.save();
    return successResponse(res, 'User updated', { user });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    if (String(req.user._id) === String(req.params.id)) {
      return next(createError('Admin cannot delete own account while logged in', 400));
    }
    const user = await User.findById(req.params.id);
    if (!user) return next(createError('User not found', 404));
    await user.deleteOne();
    return successResponse(res, 'User deleted');
  } catch (error) {
    next(error);
  }
};
