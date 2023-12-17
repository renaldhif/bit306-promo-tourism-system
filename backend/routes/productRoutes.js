import express from 'express';
import productsController from '../controllers/ProductController.js';

const router = express.Router();

// Define routes for product-related operations
router.post('/products', productsController.createProduct);
router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProductById);
router.put('/products/:id', productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);

export default router;