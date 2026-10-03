const { body } = require('express-validator');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { successResponse, createError } = require('../utils/apiResponse');

exports.categoryValidation = [
  body('name').trim().notEmpty().withMessage('Category name is required'),
  body('description').optional({ checkFalsy: true }).trim(),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean')
];

exports.getCategories = async (req, res, next) => {
  try {
    const includeInactive = req.query.includeInactive === 'true';
    const filter = includeInactive ? {} : { isActive: true };
    const categories = await Category.find(filter).sort({ name: 1 });
    return successResponse(res, 'Categories fetched', { categories });
  } catch (error) {
    next(error);
  }
};

exports.getAdminCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return successResponse(res, 'Admin categories fetched', { categories });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug, isActive: true });
    if (!category) return next(createError('Category not found', 404));
    return successResponse(res, 'Category fetched', { category });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    return successResponse(res, 'Category created', { category }, 201);
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return next(createError('Category not found', 404));
    ['name', 'description', 'image', 'isActive'].forEach((field) => {
      if (req.body[field] !== undefined) category[field] = req.body[field];
    });
    await category.save();
    return successResponse(res, 'Category updated', { category });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return next(createError('Category not found', 404));

    const productCount = await Product.countDocuments({ category: category._id });
    if (productCount > 0) {
      category.isActive = false;
      await category.save();
      return successResponse(res, 'Category is used by products, so it was deactivated instead of permanently deleted', { category });
    }

    await category.deleteOne();
    return successResponse(res, 'Category deleted');
  } catch (error) {
    next(error);
  }
};
