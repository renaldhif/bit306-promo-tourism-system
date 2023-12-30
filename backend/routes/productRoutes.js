import express from 'express';
import productsController from '../controllers/ProductController.js';

const router = express.Router();

// Define routes for product-related operations
router.post('/', productsController.createProduct);
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.patch('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);
router.get('/merchant/:merchantId', productsController.getProductsByMerchant);
router.post('/:productId/reviews', productsController.addReview);
router.put('/:productId/rating', productsController.updateRating);
router.put('/:productId/soldQty', productsController.updateSoldQty);
router.get("/top-5-sold", productsController.getTop5Products);
router.get("/by-categories/:category", productsController.getProductsByCategories);

export default router;