const express = require('express');
const categoryController = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { validateRequest, validateObjectId } = require('../middleware/validateMiddleware');

const router = express.Router();

router.get('/', categoryController.getCategories);
router.get('/admin/all', protect, admin, categoryController.getAdminCategories);
router.get('/:slug', categoryController.getCategoryBySlug);
router.post('/', protect, admin, categoryController.categoryValidation, validateRequest, categoryController.createCategory);
router.put('/:id', protect, admin, validateObjectId('id'), categoryController.categoryValidation, validateRequest, categoryController.updateCategory);
router.delete('/:id', protect, admin, validateObjectId('id'), categoryController.deleteCategory);

module.exports = router;
