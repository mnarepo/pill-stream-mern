const express = require('express');
const contactController = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { validateRequest, validateObjectId } = require('../middleware/validateMiddleware');

const router = express.Router();

router.post('/', contactController.contactValidation, validateRequest, contactController.submitContact);
router.get('/', protect, admin, contactController.getContactMessages);
router.put('/:id/status', protect, admin, validateObjectId('id'), contactController.updateContactStatus);
router.delete('/:id', protect, admin, validateObjectId('id'), contactController.deleteContactMessage);

module.exports = router;
