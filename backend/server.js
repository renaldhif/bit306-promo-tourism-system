import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// TEST ENDPOINTS ONLY!
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'This is a test GET endpoint', success: true });
});

app.post('/api/test', (req, res) => {
  console.log(req.body); // Log the request body to the console
  res.json({ message: 'POST request received', data: req.body });
});

// Below is the real endpoint for the routes

// Auth
import authRoutes from "./routes/authRoutes.js";
app.use('/api/auth', authRoutes);

import userRoutes from "./routes/userRoutes.js";
app.use('/api/user', userRoutes);

import productRoutes from "./routes/productRoutes.js";
app.use('/api/products', productRoutes);

import reviewRoutes from "./routes/reviewRoutes.js";
app.use('/api/reviews', reviewRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
