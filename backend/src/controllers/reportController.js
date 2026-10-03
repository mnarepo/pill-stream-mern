const Order = require('../models/Order');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
const generateInvoice = require('../utils/generateInvoice');
const { successResponse, createError } = require('../utils/apiResponse');

const parseDateRange = (query) => {
  const filter = {};
  if (query.startDate || query.endDate) {
    filter.createdAt = {};
    if (query.startDate) filter.createdAt.$gte = new Date(query.startDate);
    if (query.endDate) filter.createdAt.$lte = new Date(query.endDate);
  }
  return filter;
};

exports.dashboard = async (req, res, next) => {
  try {
    const [totalUsers, totalProducts, totalCategories, totalOrders, pendingOrders, deliveredOrders, lowStockProducts, recentOrders, salesAgg] = await Promise.all([
      User.countDocuments({}),
      Product.countDocuments({}),
      Category.countDocuments({}),
      Order.countDocuments({}),
      Order.countDocuments({ orderStatus: 'Pending' }),
      Order.countDocuments({ orderStatus: 'Delivered' }),
      Product.find({ stock: { $lte: 10 } }).select('name stock price image').limit(10),
      Order.find({}).populate('user', 'name email').sort({ createdAt: -1 }).limit(8),
      Order.aggregate([
        { $match: { orderStatus: { $ne: 'Cancelled' } } },
        { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } }
      ])
    ]);

    return successResponse(res, 'Dashboard data fetched', {
      totalUsers,
      totalProducts,
      totalCategories,
      totalOrders,
      totalSales: salesAgg[0]?.totalSales || 0,
      pendingOrders,
      deliveredOrders,
      lowStockProducts,
      recentOrders
    });
  } catch (error) {
    next(error);
  }
};

exports.sales = async (req, res, next) => {
  try {
    const match = { ...parseDateRange(req.query), orderStatus: { $ne: 'Cancelled' } };
    const summary = await Order.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
          itemsRevenue: { $sum: '$itemsPrice' },
          deliveryRevenue: { $sum: '$deliveryFee' },
          averageOrderValue: { $avg: '$totalPrice' }
        }
      }
    ]);
    const orders = await Order.find(match).populate('user', 'name email').sort({ createdAt: -1 });
    return successResponse(res, 'Sales summary fetched', { summary: summary[0] || { totalOrders: 0, totalSales: 0, itemsRevenue: 0, deliveryRevenue: 0, averageOrderValue: 0 }, orders });
  } catch (error) {
    next(error);
  }
};

exports.topProducts = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit || 10);
    const products = await Order.aggregate([
      { $match: { orderStatus: { $ne: 'Cancelled' } } },
      { $unwind: '$orderItems' },
      {
        $group: {
          _id: '$orderItems.product',
          name: { $first: '$orderItems.name' },
          image: { $first: '$orderItems.image' },
          soldQuantity: { $sum: '$orderItems.quantity' },
          revenue: { $sum: { $multiply: ['$orderItems.quantity', '$orderItems.price'] } }
        }
      },
      { $sort: { soldQuantity: -1 } },
      { $limit: limit }
    ]);
    return successResponse(res, 'Top products fetched', { products });
  } catch (error) {
    next(error);
  }
};

exports.monthlySales = async (req, res, next) => {
  try {
    const currentYear = Number(req.query.year || new Date().getFullYear());
    const data = await Order.aggregate([
      {
        $match: {
          orderStatus: { $ne: 'Cancelled' },
          createdAt: { $gte: new Date(`${currentYear}-01-01`), $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`) }
        }
      },
      {
        $group: {
          _id: { month: { $month: '$createdAt' } },
          sales: { $sum: '$totalPrice' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.month': 1 } }
    ]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formatted = monthNames.map((name, index) => {
      const found = data.find((item) => item._id.month === index + 1);
      return { month: name, sales: found?.sales || 0, orders: found?.orders || 0 };
    });

    return successResponse(res, 'Monthly sales fetched', { monthlySales: formatted });
  } catch (error) {
    next(error);
  }
};

exports.invoice = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('user', 'name email phone');
    if (!order) return next(createError('Order not found', 404));
    if (req.user.role !== 'admin' && String(order.user._id) !== String(req.user._id)) {
      return next(createError('You cannot access this invoice', 403));
    }

    const pdf = await generateInvoice(order);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=invoice-${order._id}.pdf`);
    return res.send(pdf);
  } catch (error) {
    next(error);
  }
};
