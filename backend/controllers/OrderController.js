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

const getOrdersByMerchantId = async (req, res) => {
  try {
    const merchantId = req.params.id;

    const orders = await Order.aggregate([
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productData"
        }
      },
      { $unwind: "$productData" },
      {
        $match: {
          "productData.merchant": new ObjectId(merchantId)
        }
      },
      {
        $project: {
          _id: 0,
        }
      }
    ]);

    orders.forEach(order => {
      console.log('Order product:', order.productData.title);
    }
    );

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders by merchant ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getMerchantRevenue = async (req, res) => {
    try {
      const { merchantId } = req.params;
      console.log('merchantId', merchantId);
  
      const orders = await Order.aggregate([
        { $unwind: "$products" },
        {
          $lookup: {
            from: "products",
            localField: "products.productId",
            foreignField: "_id",
            as: "productData"
          }
        },
        { $unwind: "$productData" },
        {
          $match: {
            "productData.merchant": new ObjectId(merchantId),
            status: "Paid"
          }
        },
        {
          $project: {
            _id: 0,
            totalAmount: 1
          }
        }
      ]);
  
      let totalRevenue = 0;
      orders.forEach(order => {
        console.log('Order total amount:', order.totalAmount);
        totalRevenue += order.totalAmount;
      });
  
      res.json({ totalRevenue });
    } catch (error) {
      console.error('Error fetching merchant revenue:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const getProductAnalytics = async (req, res) => {
  try {
    const { merchantId } = req.params;

    const productAnalytics = await Order.aggregate([
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productData"
        }
      },
      { $unwind: "$productData" },
      {
        $match: {
          "productData.merchant": new ObjectId(merchantId),

        }
      },
      {
        $group: {
          _id: "$productData._id",
          title: { $first: "$productData.title" },
          soldQty: { $first: "$productData.soldQty" }
        }
      }
    ]);

    console.log('productAnalytics', productAnalytics.length);
    productAnalytics.forEach(product => {
      console.log('Product sold qty:', product.soldQty);
    });

    res.json(productAnalytics);
  } catch (error) {
    console.error('Error fetching product analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCustomerPurchasingPower = async (req, res) => {
  try {
    const { merchantId } = req.params;

    const customerPurchasingPower = await Order.aggregate([
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productData"
        }
      },
      { $unwind: "$productData" },
      {
        $match: {
          "productData.merchant": new ObjectId(merchantId),
          status: "Paid"
        }
      },
      {
        $group: {
          _id: "$user",
          totalAmount: { $sum: "$totalAmount" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userData"
        }
      },
      { $unwind: "$userData" },
      {
        $group: {
          _id: null,
          customers: {
            $push: {
              name: "$userData.fullname",
              totalAmount: "$totalAmount"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          customers: {
            $map: {
              input: "$customers",
              as: "customer",
              in: {
                name: { $concat: ["Customer ", { $toString: { $add: [{ $indexOfArray: ["$customers", "$$customer"] }, 1] } }] },
                totalAmount: "$$customer.totalAmount"
              }
            }
          }
        }
      },
      { $unwind: "$customers" },
      { $replaceRoot: { newRoot: "$customers" } },
      { $limit: 5 } 
    ]);

    console.log('customerPurchasingPower', customerPurchasingPower.length);
    customerPurchasingPower.forEach(customer => {
      console.log('Customer name:', customer.name);
      console.log('Customer total amount:', customer.totalAmount);
    });

    res.json(customerPurchasingPower);
  }
  catch (error) {
    console.error('Error fetching customer purchasing power:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

  const getMerchantRevenueThisMonth = async (req, res) => {
    try {
      const { merchantId } = req.params;
      console.log('merchantId', merchantId);
  
      // Get the first and last day of the current month
      const date = new Date();
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
      const orders = await Order.aggregate([
        { $unwind: "$products" },
        {
          $lookup: {
            from: "products", 
            localField: "products.productId",
            foreignField: "_id",
            as: "productData"
          }
        },
        { $unwind: "$productData" },
        {
          $match: {
            "productData.merchant": new ObjectId(merchantId),
            status: "Paid",
            createdAt: { $gte: firstDay, $lte: lastDay } // Filter orders created this month
          }
        },
        {
          $project: {
            _id: 0,
            totalAmount: 1
          }
        }
      ]);
  
      let totalRevenue = 0;
      orders.forEach(order => {
        totalRevenue += order.totalAmount;
      });
  
      res.json({ totalRevenue });
    } catch (error) {
      console.error('Error fetching merchant revenue:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


export default {
    createOrder,
    updateOrder,
    getAllOrders,
    getOrderById,
    getOrderByUserId,
    updateOrderIsReviewed,
    getMerchantRevenue,
    getProductAnalytics,
    getCustomerPurchasingPower,
    getOrdersByMerchantId,
    getMerchantRevenueThisMonth
};
