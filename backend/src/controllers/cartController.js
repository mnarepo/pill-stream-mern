const { body } = require('express-validator');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { successResponse, createError } = require('../utils/apiResponse');

exports.addCartValidation = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1')
];

exports.updateCartValidation = [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
];

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) cart = await Cart.create({ user: userId, items: [], totalAmount: 0 });
  return cart.populate('items.product');
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.recalculate();
    await cart.save();
    await cart.populate('items.product');
    return successResponse(res, 'Cart fetched', { cart });
  } catch (error) {
    next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const qty = Number(quantity);
    const product = await Product.findOne({ _id: productId, isActive: true });
    if (!product) return next(createError('Product not found', 404));
    if (qty < 1) return next(createError('Quantity must be at least 1', 400));
    if (product.stock < qty) return next(createError('Requested quantity is greater than available stock', 400));

    const cart = await getOrCreateCart(req.user._id);
    const existing = cart.items.find((item) => String(item.product._id || item.product) === String(productId));

    if (existing) {
      const newQty = existing.quantity + qty;
      if (newQty > product.stock) return next(createError('Cart quantity cannot exceed available stock', 400));
      existing.quantity = newQty;
      existing.priceAtTime = product.price;
    } else {
      cart.items.push({ product: product._id, quantity: qty, priceAtTime: product.price });
    }

    cart.recalculate();
    await cart.save();
    await cart.populate('items.product');
    return successResponse(res, 'Product added to cart', { cart });
  } catch (error) {
    next(error);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const qty = Number(req.body.quantity);
    const product = await Product.findById(productId);
    if (!product) return next(createError('Product not found', 404));
    if (qty < 1) return next(createError('Quantity must be at least 1', 400));
    if (qty > product.stock) return next(createError('Quantity cannot exceed available stock', 400));

    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.find((cartItem) => String(cartItem.product._id || cartItem.product) === String(productId));
    if (!item) return next(createError('Product is not in cart', 404));

    item.quantity = qty;
    item.priceAtTime = product.price;
    cart.recalculate();
    await cart.save();
    await cart.populate('items.product');
    return successResponse(res, 'Cart item updated', { cart });
  } catch (error) {
    next(error);
  }
};

exports.removeCartItem = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = cart.items.filter((item) => String(item.product._id || item.product) !== String(req.params.productId));
    cart.recalculate();
    await cart.save();
    await cart.populate('items.product');
    return successResponse(res, 'Cart item removed', { cart });
  } catch (error) {
    next(error);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = [];
    cart.recalculate();
    await cart.save();
    return successResponse(res, 'Cart cleared', { cart });
  } catch (error) {
    next(error);
  }
};
