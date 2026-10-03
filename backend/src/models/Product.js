const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Product name is required'], trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: [true, 'Category is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price must be positive'] },
    oldPrice: { type: Number, default: 0, min: 0 },
    image: { type: String, default: '/uploads/products/placeholder-medicine.svg' },
    brand: { type: String, default: '' },
    dosage: { type: String, default: '' },
    packSize: { type: String, default: '' },
    stock: { type: Number, required: true, min: [0, 'Stock cannot be negative'], default: 0 },
    requiresPrescription: { type: Boolean, default: false },
    expiryDate: { type: Date },
    batchNumber: { type: String, default: '' },
    manufacturer: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', brand: 'text', manufacturer: 'text' });

productSchema.pre('validate', function (next) {
  if (this.name && (!this.slug || this.isModified('name'))) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
