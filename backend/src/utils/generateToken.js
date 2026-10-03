const jwt = require('jsonwebtoken');
const env = require('../config/env');

const generateToken = (userId, extraPayload = {}) => {
  return jwt.sign({ id: userId, ...extraPayload }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
};

module.exports = generateToken;
