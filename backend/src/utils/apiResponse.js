const successResponse = (res, message = 'Operation successful', data = {}, statusCode = 200) => {
  return res.status(statusCode).json({ success: true, message, data });
};

const errorResponse = (res, message = 'Something went wrong', statusCode = 500) => {
  return res.status(statusCode).json({ success: false, message });
};

const createError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = { successResponse, errorResponse, createError };
