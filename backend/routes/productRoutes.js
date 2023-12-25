import express from 'express';
import productsController from '../controllers/ProductController.js';

const router = express.Router();

// Define routes for product-related operations
router.post('/', productsController.createProduct);
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

export default router;