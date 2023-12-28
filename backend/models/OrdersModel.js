import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const contactInformationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // Reference to the User model
    required: true,
  },
  contactInformation: {
    type: contactInformationSchema,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model if you have one
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      // You can include additional product-related fields here
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  payment: {
    type: paymentSchema,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending',
  },
  isReviewed: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
  paypalData: {
    type: Object,
  },
  paypalDetails: {
    type: Object,
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;