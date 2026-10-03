const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    priceAtTime: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

cartSchema.methods.recalculate = function () {
  this.totalAmount = this.items.reduce((sum, item) => sum + item.quantity * item.priceAtTime, 0);
};

module.exports = mongoose.model('Cart', cartSchema);
