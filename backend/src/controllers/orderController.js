const { body } = require('express-validator');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Prescription = require('../models/Prescription');
const { successResponse, createError } = require('../utils/apiResponse');

exports.orderValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('paymentMethod').optional().isIn(['Cash on Delivery', 'Card', 'Bank Transfer']).withMessage('Invalid payment method')
];

const assertOrderAccess = (req, order) => {
  if (req.user.role === 'admin') return true;
  return String(order.user._id || order.user) === String(req.user._id);
};

exports.createOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) return next(createError('Cart is empty', 400));

    for (const item of cart.items) {
      if (!item.product || !item.product.isActive) return next(createError('A product in your cart is no longer available', 400));
      if (item.quantity > item.product.stock) return next(createError(`${item.product.name} has only ${item.product.stock} units available`, 400));
    }

    const requiresPrescription = cart.items.some((item) => item.product.requiresPrescription);
    if (requiresPrescription && !req.file) {
      return next(createError('This order contains prescription medicines. Please upload a valid prescription image.', 400));
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      quantity: item.quantity,
      price: item.product.price
    }));

    const itemsPrice = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const deliveryFee = itemsPrice >= 3000 ? 0 : 150;
    const prescriptionImage = req.file ? `/uploads/prescriptions/${req.file.filename}` : '';

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress: {
        fullName: req.body.fullName,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalCode || ''
      },
      paymentMethod: req.body.paymentMethod || 'Cash on Delivery',
      prescriptionImage,
      itemsPrice,
      deliveryFee,
      totalPrice: itemsPrice + deliveryFee,
      notes: req.body.notes || ''
    });

    if (prescriptionImage) {
      await Prescription.create({ user: req.user._id, image: prescriptionImage, status: 'Pending' });
    }

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } });
    }

    cart.items = [];
    cart.recalculate();
    await cart.save();
    await order.populate('user', 'name email phone');

    return successResponse(res, 'Order placed successfully', { order }, 201);
  } catch (error) {
    next(error);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return successResponse(res, 'My orders fetched', { orders });
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email phone');
    if (!order) return next(createError('Order not found', 404));
    if (!assertOrderAccess(req, order)) return next(createError('You cannot view this order', 403));
    return successResponse(res, 'Order fetched', { order });
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const { status, startDate, endDate, search } = req.query;
    const filter = {};
    if (status) filter.orderStatus = status;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    let orders = await Order.find(filter).populate('user', 'name email phone').sort({ createdAt: -1 });
    if (search) {
      const pattern = search.toLowerCase();
      orders = orders.filter((order) =>
        String(order._id).includes(pattern) ||
        order.shippingAddress.fullName.toLowerCase().includes(pattern) ||
        order.user?.email?.toLowerCase().includes(pattern)
      );
    }
    return successResponse(res, 'Orders fetched', { orders });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const allowed = ['Pending', 'Approved', 'Packed', 'Dispatched', 'Delivered', 'Cancelled'];
    if (!allowed.includes(orderStatus)) return next(createError('Invalid order status', 400));

    const order = await Order.findById(req.params.id).populate('user', 'name email phone');
    if (!order) return next(createError('Order not found', 404));

    order.orderStatus = orderStatus;
    if (orderStatus === 'Delivered') order.deliveredAt = new Date();
    await order.save();
    return successResponse(res, 'Order status updated', { order });
  } catch (error) {
    next(error);
  }
};

exports.updatePaymentStatus = async (req, res, next) => {
  try {
    const { paymentStatus } = req.body;
    const allowed = ['Pending', 'Paid', 'Failed', 'Refunded'];
    if (!allowed.includes(paymentStatus)) return next(createError('Invalid payment status', 400));

    const order = await Order.findById(req.params.id).populate('user', 'name email phone');
    if (!order) return next(createError('Order not found', 404));

    order.paymentStatus = paymentStatus;
    await order.save();
    return successResponse(res, 'Payment status updated', { order });
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return next(createError('Order not found', 404));

    if (order.orderStatus !== 'Cancelled' && order.orderStatus !== 'Delivered') {
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
      }
    }

    order.orderStatus = 'Cancelled';
    await order.save();
    return successResponse(res, 'Order cancelled', { order });
  } catch (error) {
    next(error);
  }
};
