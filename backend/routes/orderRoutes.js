import express from 'express';
import orderController from '../controllers/OrderController.js';

const router = express.Router();

// Define routes for product-related operations
// router.post('/', productsController.createProduct);
// router.get('/', productsController.getProducts);
// router.get('/:id', productsController.getProductById);
// router.patch('/:id', productsController.updateProduct);
// router.delete('/:id', productsController.deleteProduct);
// router.get('/merchant/:merchantId', productsController.getProductsByMerchant);
// router.post('/:productId/reviews', productsController.addReview);

router.post('/', orderController.createOrder);
router.patch('/:id', orderController.updateOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);

export default router;