import Product from '../models/ProductsModel.js';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { Formidable } from 'formidable';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
// Implement CRUD operations for the Product model

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createProduct = async (req, res) => {
  const formidable = new Formidable();

  formidable.parse(req, async (err, fields, files) => {
    if (err) {
      console.log('Error parsing form data: ', err);
      return res.status(400).json({ message: 'Error parsing form data' });
    }

    try {
      // Extract field values
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
      const destinations = JSON.parse(destination);
      const includes = JSON.parse(whatsIncluded);
      const created_at = new Date();

      // Handle file upload
      let imagePath = '';
      let newFilename = '';

      console.log("🚀 ~ file: ProductController.js:117 ~ formidable.parse ~ files image", files);

      if (files.image && files.image.length > 0) {
        console.log("JALAN DISINI")
        const imageFile = files.image[0];

        // Check file type (you may want to enhance this check based on your requirements)
        if (!imageFile.mimetype.startsWith('image')) {
          console.log('file mimetype: ', imageFile.mimetype);
          return res.status(400).json({ message: 'Only image files are allowed' });
        }

        const oldPath = imageFile.filepath;
        console.log("🚀 ~ file: ProductController.js:117 ~ formidable.parse ~ oldPath", oldPath)

        const originalFilename = imageFile.originalFilename;
        console.log("🚀 ~ file: ProductController.js:102 ~ formidable.parse ~ originalFilename:", originalFilename)

        // Generate new filename
        newFilename = `${title.replace(/\s+/g, '_')}_${originalFilename}`;
        const newPath = path.join(__dirname, '../uploads/images', newFilename);

        // Move the file
        fs.renameSync(oldPath, newPath);
        // Generate a relative URL for the image
        imagePath = `/uploads/images/${newFilename}`;
        console.log("🚀 ~ file: ProductController.js:117 ~ formidable.parse ~ imagePath", imagePath)
      }

      // Assume the merchant ID is provided in the request or adjust accordingly
      const merchant = '657b2ed6f0013990de3bca53';

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
        tripDays: tripDuration, // Using tripDuration for tripDays
        destinations,
        includes,
        merchant,
        created_at,
      });

      console.log('Product: ', product);

      // Save the product in the database
      const newProduct = await product.save();
      console.log("🚀 ~ file: ProductController.js:117 ~ formidable.parse ~ newProduct:", newProduct)

      res.status(201).json({ message: 'Product created successfully', product: newProduct });

    } catch (error) {
      console.log('Error creating product on productController: ', error);
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

// const updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       { $set: req.body },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const updateProduct = async (req, res) => {
  const form = new Formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log('Error parsing form data: ', err);
      return res.status(400).json({ message: 'Error parsing form data' });
    }

    try {
      const productId = req.params.id;

      console.log('ID WOY', productId);
      // Fetch the existing product
      const existingProduct = await Product.findById(productId);
      console.log('EXISTING PRODUCT before', existingProduct);


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
      // existingProduct.destination = fields.destination ? JSON.parse(fields.destination) : existingProduct.destination;
      // existingProduct.whatsIncluded = fields.whatsIncluded ? JSON.parse(fields.whatsIncluded) : existingProduct.whatsIncluded;


      existingProduct.destinations = Array.isArray(fields.destination) ? fields.destination : JSON.parse(fields.destination || '[]');

      existingProduct.includes = Array.isArray(fields.whatsIncluded) ? fields.whatsIncluded : JSON.parse(fields.whatsIncluded || '[]');

      existingProduct.image = Array.isArray(fields.image) ? fields.image[0] : fields.image || existingProduct.image;

      console.log('IMAGE WOY', existingProduct.image);

      let imagePath = '';
      let newFilename = '';

      if (files.image && files.image.length > 0) {
        console.log("JALAN DISINI")
        const imageFile = files.image[0];

        // Check file type (you may want to enhance this check based on your requirements)
        if (!imageFile.mimetype.startsWith('image')) {
          console.log('file mimetype: ', imageFile.mimetype);
          return res.status(400).json({ message: 'Only image files are allowed' });
        }

        const oldPath = imageFile.filepath;
        console.log("🚀 ~ file: ProductController.js:117 ~ formidable.parse ~ oldPath", oldPath)

        const originalFilename = imageFile.originalFilename;
        console.log("🚀 ~ file: ProductController.js:102 ~ formidable.parse ~ originalFilename:", originalFilename)

        // Generate new filename
        newFilename = `${existingProduct.title.replace(/\s+/g, '_')}_${originalFilename}`;
        const newPath = path.join(__dirname, '../uploads/images', newFilename);

        // Move the file
        fs.renameSync(oldPath, newPath);
        // Generate a relative URL for the image
        imagePath = `/uploads/images/${newFilename}`;
        console.log("🚀 ~ file: ProductController.js:117 ~ formidable.parse ~ imagePath", imagePath)
        existingProduct.image = imagePath;
      }


      // Save the updated product in the database
      console.log('EXISTING PRODUCT NOW', existingProduct);
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

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByMerchant,
};
