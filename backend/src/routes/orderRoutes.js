const express = require('express');
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { uploadPrescription } = require('../middleware/uploadMiddleware');
const { validateRequest, validateObjectId } = require('../middleware/validateMiddleware');

const router = express.Router();

router.post('/', protect, uploadPrescription, orderController.orderValidation, validateRequest, orderController.createOrder);
router.get('/my-orders', protect, orderController.getMyOrders);
router.get('/', protect, admin, orderController.getOrders);
router.get('/:id', protect, validateObjectId('id'), orderController.getOrderById);
router.put('/:id/status', protect, admin, validateObjectId('id'), orderController.updateOrderStatus);
router.put('/:id/payment-status', protect, admin, validateObjectId('id'), orderController.updatePaymentStatus);
router.delete('/:id', protect, admin, validateObjectId('id'), orderController.deleteOrder);

module.exports = router;
