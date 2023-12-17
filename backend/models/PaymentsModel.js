const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentMethod: { type: String, required: true },
  status: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  date_created: Date,
  quantity: { type: Number, required: true },
  notes: String,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
