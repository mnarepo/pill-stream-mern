const { createError } = require('../utils/apiResponse');

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  return next(createError('Admin access required', 403));
};

module.exports = admin;
