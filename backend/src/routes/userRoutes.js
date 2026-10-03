const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { validateRequest, validateObjectId } = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfileValidation, validateRequest, userController.updateProfile);

router.get('/', protect, admin, userController.getUsers);
router.get('/:id', protect, admin, validateObjectId('id'), userController.getUserById);
router.put('/:id', protect, admin, validateObjectId('id'), userController.adminUpdateUserValidation, validateRequest, userController.updateUser);
router.delete('/:id', protect, admin, validateObjectId('id'), userController.deleteUser);

module.exports = router;
