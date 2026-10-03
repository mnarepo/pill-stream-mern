const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    image: { type: String, default: '' },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, default: '' }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    orderItems: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: { type: String, enum: ['Cash on Delivery', 'Card', 'Bank Transfer'], default: 'Cash on Delivery' },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed', 'Refunded'], default: 'Pending' },
    orderStatus: { type: String, enum: ['Pending', 'Approved', 'Packed', 'Dispatched', 'Delivered', 'Cancelled'], default: 'Pending' },
    prescriptionImage: { type: String, default: '' },
    itemsPrice: { type: Number, required: true, min: 0 },
    deliveryFee: { type: Number, default: 150, min: 0 },
    totalPrice: { type: Number, required: true, min: 0 },
    notes: { type: String, default: '' },
    deliveredAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
