import Product from '../models/ProductsModel.js';
import Review from '../models/ReviewsModel.js';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { Formidable } from 'formidable';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import User from '../models/UsersModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createProduct = async (req, res) => {
  const formidable = new Formidable();

  formidable.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: 'Error parsing form data' });
    }

    try {
      // Extract field values
      const {userId} = req.params;
      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const location = Array.isArray(fields.location) ? fields.location[0] : fields.location;
      const tripDuration = Array.isArray(fields.tripDuration) ? fields.tripDuration[0] : fields.tripDuration;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
      const destination = Array.isArray(fields.destination) ? fields.destination[0] : fields.destination;
      const whatsIncluded = Array.isArray(fields.whatsIncluded) ? fields.whatsIncluded[0] : fields.whatsIncluded;
      const price = Array.isArray(fields.price) ? fields.price[0] : fields.price;
      const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;

      // Assume these values are provided in the request or adjust accordingly
      const rating = 0;
      const ratingQty = 0;
      const soldQty = 0;
      const destinations = JSON.parse(destination);
      const includes = JSON.parse(whatsIncluded);
      const created_at = new Date();

      // Handle file upload
      let imagePath = '';
      let newFilename = '';

      if (files.image && files.image.length > 0) {
        const imageFile = files.image[0];

        // Check file type (you may want to enhance this check based on your requirements)
        if (!imageFile.mimetype.startsWith('image')) {
          return res.status(400).json({ message: 'Only image files are allowed' });
        }

        const oldPath = imageFile.filepath;
        const originalFilename = imageFile.originalFilename;

        // Generate new filename
        newFilename = `${title.replace(/\s+/g, '_')}_${originalFilename}`;
        const newPath = path.join(__dirname, '../uploads/images', newFilename);

        // Move the file
        fs.renameSync(oldPath, newPath);
        // Generate a relative URL for the image
        imagePath = `/uploads/images/${newFilename}`;
      }

      // Assume the merchant ID is provided in the request or adjust accordingly
      const merchant = new ObjectId(userId);

      // Create a new product
      const product = new Product({
        title,
        location,
        tripDuration, // Updated to use tripDuration
        description,
        destination: destinations,
        whatsIncluded: includes,
        price,
        category,  // Assuming category is provided in the request
        image: imagePath,
        rating,
        ratingQty,
        soldQty,
        tripDays: tripDuration, // Using tripDuration for tripDays
        destinations,
        includes,
        merchant,
        created_at,
      });

      // Save the product in the database
      const newProduct = await product.save();
      res.status(201).json({ message: 'Product created successfully', product: newProduct });

    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
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
  const form = new Formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: 'Error parsing form data' });
    }

    try {
      const productId = req.params.id;

      // Fetch the existing product
      const existingProduct = await Product.findById(productId);

      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Update the product fields
      existingProduct.title = Array.isArray(fields.title) ? fields.title[0] : fields.title || existingProduct.title;
      existingProduct.location = Array.isArray(fields.location) ? fields.location[0] : fields.location || existingProduct.location;
      existingProduct.tripDuration = Array.isArray(fields.tripDuration) ? fields.tripDuration[0] : fields.tripDuration || existingProduct.tripDuration;
      existingProduct.description = Array.isArray(fields.description) ? fields.description[0] : fields.description || existingProduct.description;
      existingProduct.price = Array.isArray(fields.price) ? fields.price[0] : fields.price || existingProduct.price;
      existingProduct.category = Array.isArray(fields.category) ? fields.category[0] : fields.category || existingProduct.category;

      // Update the arrays (destinations and includes)
      existingProduct.destinations = Array.isArray(fields.destination) ? fields.destination : JSON.parse(fields.destination || '[]');
      existingProduct.includes = Array.isArray(fields.whatsIncluded) ? fields.whatsIncluded : JSON.parse(fields.whatsIncluded || '[]');

      // Handle image update only if a new image is submitted
      if (files.image && files.image.length > 0) {
        const imageFile = files.image[0];

        // Check file type (you may want to enhance this check based on your requirements)
        if (!imageFile.mimetype.startsWith('image')) {
          return res.status(400).json({ message: 'Only image files are allowed' });
        }

        const oldPath = imageFile.filepath;
        const originalFilename = imageFile.originalFilename;

        // Generate new filename
        const newFilename = `${existingProduct.title.replace(/\s+/g, '_')}_${originalFilename}`;
        const newPath = path.join(__dirname, '../uploads/images', newFilename);

        // Move the file
        fs.renameSync(oldPath, newPath);
        // Generate a relative URL for the image
        existingProduct.image = `/uploads/images/${newFilename}`;
      }

      // Save the updated product in the database
      const updatedProduct = await existingProduct.save();
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: error.message });
    }
  });
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

const getProductsByMerchant = async (req, res) => {
  try {
    const merchantId = req.params.merchantId;
    const validMerchantId = new ObjectId(merchantId); // Use ObjectId without new

    const products = await Product.find({ merchant: validMerchantId });
    // Return merchant id and products
    return res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addReview = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviewId = req.body.reviewId;

    // Check if the product and review exist
    const product = await Product.findById(productId);
    const review = await Review.findById(reviewId);

    if (!product || !review) {
      return res.status(404).json({ error: 'Product or review not found' });
    }

    // Add the review to the product's reviews array
    product.reviews.push(reviewId);

    // Save the updated product
    const updatedProduct = await product.save();

    res.json({ message: 'Review added to the product successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error adding review to product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const updateRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const productId = req.params.productId;

    // Fetch the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Calculate overall rating based on updated rating
    const totalRatings = product.reviews.length + 1;
    const sumRatings = product.rating + rating;
    product.rating = parseFloat(sumRatings / totalRatings);
    product.ratingQty += 1;

    // Save the updated product
    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product rating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const updateSoldQty = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Fetch the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the soldQty
    product.soldQty += 1;

    // Save the updated product
    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product soldQty:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getTop5Products = async (req, res) => {
  try {
    const top5Products = await Product.find().sort({ soldQty: -1 }).limit(5);
    res.json(top5Products);
  } catch (error) {
    console.error('Error fetching top 5 products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductsByCategories = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: { $in: category} }).populate('merchant', 'fullname');

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByMerchant,
  getAllProducts,
  addReview,
  updateRating,
  updateSoldQty,
  getTop5Products,
  getProductsByCategories,
};
