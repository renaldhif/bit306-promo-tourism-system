import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/UsersModel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

//* REGISTER
router.post('/register', async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const user = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      userRole: req.body.userRole,
      phoneNum: req.body.phoneNum,
      status: req.body.status || null,
      address: req.body.address || null,
      merchantDescription: req.body.merchantDescription || null,
      document: req.body.document || null,
      filename: req.body.filename || null,
      description: req.body.description || null,
      isMerchantChangedPassword: req.body.isMerchantChangedPassword || false,
      resetPasswordToken: req.body.resetPasswordToken || null,
      createdAt: req.body.createdAt || new Date(),
    });

    // Save the user in the database
    const newUser = await user.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log('\n===Error in authRoutes.js -> /register===');
    console.log('user: ', req.body);
    console.log('\nerror: ', err);


  }
});

//* LOGIN
router.post('/login', async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Create and assign a token
    const token = jwt.sign(
      { _id: user._id, role: user.userRole },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.header('auth-token', token).json({ message: 'Logged in successfully', token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
