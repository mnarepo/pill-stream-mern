const express = require('express');
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const { validateRequest, validateObjectId } = require('../middleware/validateMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', cartController.getCart);
router.post('/add', cartController.addCartValidation, validateRequest, cartController.addToCart);
router.put('/update/:productId', validateObjectId('productId'), cartController.updateCartValidation, validateRequest, cartController.updateCartItem);
router.delete('/remove/:productId', validateObjectId('productId'), cartController.removeCartItem);
router.delete('/clear', cartController.clearCart);

module.exports = router;
