const { body } = require('express-validator');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const { successResponse, createError } = require('../utils/apiResponse');

const parseBoolean = (value) => value === true || value === 'true' || value === 'on' || value === '1';

exports.productValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('stock').isInt({ min: 0 }).withMessage('Stock cannot be negative')
];

const buildProductPayload = (body, file) => {
  const payload = { ...body };
  ['price', 'oldPrice', 'stock'].forEach((field) => {
    if (payload[field] !== undefined && payload[field] !== '') payload[field] = Number(payload[field]);
  });
  ['requiresPrescription', 'isActive', 'featured'].forEach((field) => {
    if (payload[field] !== undefined) payload[field] = parseBoolean(payload[field]);
  });
  if (file) payload.image = `/uploads/products/${file.filename}`;
  if (!payload.oldPrice) payload.oldPrice = 0;
  return payload;
};

exports.getProducts = async (req, res, next) => {
  try {
    const {
      search = '', category, minPrice, maxPrice, page = 1, limit = 12, sort = 'newest'
    } = req.query;

    const filter = { isActive: true };
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') },
        { manufacturer: new RegExp(search, 'i') }
      ];
    }

    if (category) {
      const categoryQuery = mongoose.Types.ObjectId.isValid(category) ? { $or: [{ slug: category }, { _id: category }] } : { slug: category };
      const cat = await Category.findOne(categoryQuery);
      if (!cat) return successResponse(res, 'Products fetched', { products: [], pagination: { page: Number(page), limit: Number(limit), total: 0, pages: 0 } });
      filter.category = cat._id;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sortMap = {
      newest: { createdAt: -1 },
      priceLow: { price: 1 },
      priceHigh: { price: -1 },
      name: { name: 1 }
    };

    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.max(Number(limit), 1);
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      Product.find(filter).populate('category').sort(sortMap[sort] || sortMap.newest).skip(skip).limit(limitNum),
      Product.countDocuments(filter)
    ]);

    return successResponse(res, 'Products fetched', {
      products,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) }
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdminProducts = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const filter = search ? { name: new RegExp(search, 'i') } : {};
    const products = await Product.find(filter).populate('category').sort({ createdAt: -1 });
    return successResponse(res, 'Admin products fetched', { products });
  } catch (error) {
    next(error);
  }
};

exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ featured: true, isActive: true }).populate('category').limit(8).sort({ createdAt: -1 });
    return successResponse(res, 'Featured products fetched', { products });
  } catch (error) {
    next(error);
  }
};

exports.getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('category');
    if (!product || (!product.isActive && req.user?.role !== 'admin')) return next(createError('Product not found', 404));
    return successResponse(res, 'Product fetched', { product });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return next(createError('Product not found', 404));
    return successResponse(res, 'Product fetched', { product });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const payload = buildProductPayload(req.body, req.file);
    const category = await Category.findById(payload.category);
    if (!category) return next(createError('Category not found', 404));
    const product = await Product.create(payload);
    await product.populate('category');
    return successResponse(res, 'Product created', { product }, 201);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(createError('Product not found', 404));

    const payload = buildProductPayload(req.body, req.file);
    Object.keys(payload).forEach((key) => {
      if (payload[key] !== undefined && payload[key] !== '') product[key] = payload[key];
    });
    await product.save();
    await product.populate('category');
    return successResponse(res, 'Product updated', { product });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(createError('Product not found', 404));
    await product.deleteOne();
    return successResponse(res, 'Product deleted');
  } catch (error) {
    next(error);
  }
};
