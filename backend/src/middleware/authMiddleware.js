const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');
const { createError } = require('../utils/apiResponse');

const readToken = (req) => {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) return authHeader.split(' ')[1];
  return null;
};

const protect = async (req, res, next) => {
  try {
    const token = readToken(req);
    if (!token) return next(createError('Not authorized, token missing', 401));

    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return next(createError('Not authorized, user not found', 401));

    req.user = user;
    next();
  } catch (error) {
    next(createError('Not authorized, token invalid or expired', 401));
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const token = readToken(req);
    if (token) {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    }
    next();
  } catch (error) {
    next();
  }
};

module.exports = { protect, optionalAuth };
