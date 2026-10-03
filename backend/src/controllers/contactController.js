const { body } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');
const { successResponse, createError } = require('../utils/apiResponse');

exports.contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
];

exports.submitContact = async (req, res, next) => {
  try {
    const contact = await ContactMessage.create(req.body);
    return successResponse(res, 'Message submitted successfully', { contact }, 201);
  } catch (error) {
    next(error);
  }
};

exports.getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    return successResponse(res, 'Contact messages fetched', { messages });
  } catch (error) {
    next(error);
  }
};

exports.updateContactStatus = async (req, res, next) => {
  try {
    const allowed = ['New', 'Read', 'Replied'];
    const { status } = req.body;
    if (!allowed.includes(status)) return next(createError('Invalid message status', 400));

    const message = await ContactMessage.findById(req.params.id);
    if (!message) return next(createError('Contact message not found', 404));
    message.status = status;
    await message.save();
    return successResponse(res, 'Message status updated', { message });
  } catch (error) {
    next(error);
  }
};

exports.deleteContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) return next(createError('Contact message not found', 404));
    await message.deleteOne();
    return successResponse(res, 'Message deleted');
  } catch (error) {
    next(error);
  }
};
