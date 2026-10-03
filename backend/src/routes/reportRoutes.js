const express = require('express');
const reportController = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { validateObjectId } = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/dashboard', protect, admin, reportController.dashboard);
router.get('/sales', protect, admin, reportController.sales);
router.get('/top-products', protect, admin, reportController.topProducts);
router.get('/monthly-sales', protect, admin, reportController.monthlySales);
router.get('/invoice/:orderId', protect, validateObjectId('orderId'), reportController.invoice);

module.exports = router;
