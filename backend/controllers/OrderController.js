import Order from "../models/OrdersModel.js";
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const createOrder = async (req, res) => {
    try {
      let orderData = req.body;
  
      // Convert userId to a valid ObjectId
      orderData.user = new ObjectId(orderData.user);
  
      // Convert date_created to a Date object
      orderData.date_created = new Date(orderData.date_created);
  
      // Generate order ID with the format PT-mmddyy-counter
      const counter = await Order.countDocuments({ date_created: { $gte: new Date().setHours(0, 0, 0, 0) } }) + 1;
      const formattedCounter = counter.toString().padStart(3, '0');
      const formattedDate = new Date().toLocaleDateString('en-US', { timeZone: 'UTC', month: '2-digit', day: '2-digit', year: '2-digit' }).replace(/\//g, '');
      const orderID = `PT-${formattedDate}-${formattedCounter}`;
      
      // Add the generated orderID to orderData
      orderData = { ...orderData, orderID };
      
      console.log(orderID);
  
      // Create the order, including nested documents
      const newOrder = await Order.create(orderData);
  
      res.json(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrderData = req.body;

        // Find the order by ID and update it
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateOrderIsReviewed = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { isReviewed } = req.body;

        // Find the order by ID and update only the isReviewed field
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { $set: { isReviewed } },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getOrderByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const orders = await Order.find({ user: userId });
        res.json(orders);
    }
    catch (error) {
        console.error('Error fetching order by user ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default {
    createOrder,
    updateOrder,
    getAllOrders,
    getOrderById,
    getOrderByUserId,
    updateOrderIsReviewed,
};
