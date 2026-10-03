const express = require('express');
const productController = require('../controllers/productController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { uploadProduct } = require('../middleware/uploadMiddleware');
const { validateRequest, validateObjectId } = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/admin/all', protect, admin, productController.getAdminProducts);
router.get('/admin/:id', protect, admin, validateObjectId('id'), productController.getProductById);
router.get('/:slug', optionalAuth, productController.getProductBySlug);
router.post('/', protect, admin, uploadProduct, productController.productValidation, validateRequest, productController.createProduct);
router.put('/:id', protect, admin, validateObjectId('id'), uploadProduct, productController.productValidation, validateRequest, productController.updateProduct);
router.delete('/:id', protect, admin, validateObjectId('id'), productController.deleteProduct);

module.exports = router;
