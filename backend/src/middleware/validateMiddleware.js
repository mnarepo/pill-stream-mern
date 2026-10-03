const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { createError } = require('../utils/apiResponse');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map((error) => error.msg).join(', ');
    return next(createError(message, 400));
  }
  next();
};

const validateObjectId = (paramName = 'id') => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
    return next(createError(`Invalid ${paramName}`, 400));
  }
  next();
};

module.exports = { validateRequest, validateObjectId };
