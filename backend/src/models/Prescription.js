const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    adminNote: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Prescription', prescriptionSchema);
