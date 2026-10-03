const express = require('express');
const { body } = require('express-validator');
const auth = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateMiddleware');

const router = express.Router();

router.post('/register', auth.registerValidation, validateRequest, auth.register);
router.post('/login', auth.loginValidation, validateRequest, auth.login);
router.get('/me', protect, auth.me);
router.post('/logout', protect, auth.logout);
router.post('/forgot-password', [body('email').isEmail().withMessage('Valid email is required')], validateRequest, auth.forgotPassword);
router.post('/reset-password', [body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')], validateRequest, auth.resetPassword);

module.exports = router;
