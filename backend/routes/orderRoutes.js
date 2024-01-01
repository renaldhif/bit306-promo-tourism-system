import express from 'express';
import orderController from '../controllers/OrderController.js';

const router = express.Router();

router.post('/', orderController.createOrder);
router.patch('/:id', orderController.updateOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.get('/user/:id', orderController.getOrderByUserId);
router.put('/:id/is-reviewed', orderController.updateOrderIsReviewed);
router.get('/revenue/:merchantId', orderController.getMerchantRevenue);
router.get('/product-analytics/:merchantId', orderController.getProductAnalytics);
router.get('/customer-purchasing-power/:merchantId', orderController.getCustomerPurchasingPower);

export default router;