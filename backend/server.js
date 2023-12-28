import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';


dotenv.config();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middlewares
// const corsOptions = {
//   origin: 'http://localhost:4200/',
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));

app.use(cors());
app.use(bodyParser.json());

//* Might be useful if error blocked by cors
// app.options('*', cors()); // include before other routes
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // or the specific domain you want to allow
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

// var permitCrossDomainRequests = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   // some browsers send a pre-flight OPTIONS request to check if CORS is enabled so you have to also respond to that
//   if ('OPTIONS' === req.method) {
//     res.send(200);
//   }
//   else {
//     next();
//   }
// };

// app.use(permitCrossDomainRequests);

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

import merchantRoutes from "./routes/merchantRoutes.js";
app.use('/api/merchant', merchantRoutes);

import productRoutes from "./routes/productRoutes.js";
app.use('/api/products', productRoutes);

import reviewRoutes from "./routes/reviewRoutes.js";
app.use('/api/reviews', reviewRoutes);

import adminRoutes from "./routes/adminRoutes.js";
app.use('/api/admin', adminRoutes);

import orderRoutes from "./routes/orderRoutes.js";
app.use('/api/orders', orderRoutes);

app.use('/uploads', express.static(join(__dirname, 'uploads')));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
