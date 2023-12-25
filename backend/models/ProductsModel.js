import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
  ratingQty: { type: Number, required: true },
  tripDays: { type: Number, required: true },
  location: { type: String, required: true },
  destinations: [String],
  includes: [String],
  image: String,
  merchant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  created_at: Date,
});

const Product = mongoose.model('Product', productSchema);

export default Product;