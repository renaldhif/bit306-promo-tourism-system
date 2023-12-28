import express from 'express';
import orderController from '../controllers/OrderController.js';

const router = express.Router();

router.post('/', orderController.createOrder);
router.patch('/:id', orderController.updateOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.get('/user/:id', orderController.getOrderByUserId);

export default router;