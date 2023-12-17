import Product from '../models/ProductsModel.js';
// Implement CRUD operations for the Product model

const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      rating,
      ratingQty,
      tripDays,
      location,
      destinations,
      includes,
      image,
      merchant,
    } = req.body;

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      rating,
      ratingQty,
      tripDays,
      location,
      destinations,
      includes,
      image,
      merchant,
      created_at: new Date(),
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    // const products = await Product.find().populate('merchant', 'fullname');
    const products = await Product.find();
    // const products = await Product.find().populate('merchant').exec();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
