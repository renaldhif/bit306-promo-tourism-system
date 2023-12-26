import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/UsersModel.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

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
    // Check merchant is rejected or not
    if (user.userRole === 'merchant' && user.status === 'rejected') {
      console.log('\n===Error in authRoutes.js -> /login===');
      console.log('merchant account is rejected');
      return res.status(400).json({ message: 'Your merchant account has been rejected.' });
    }

    // Compare password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create and assign a token
    const token = jwt.sign(
      { _id: user._id, role: user.userRole },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({
      message: 'Logged in successfully',
      token: token,
      role: user.userRole,
      userId: user._id
    });

    // res.header('auth-token', token).json({ message: 'Logged in successfully', token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//* CHANGE PASSWORD

// POST request to initiate password reset
router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    if (user.userRole === 'merchant') {
      user.isMerchantChangedPassword = true;
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//* CHECK EMAIL
router.get('/check-email/:email', async (req, res) => {
  // const { email } = req.query;
  const email = req.params.email;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ isEmailTaken: true });
    } else {
      return res.json({ isEmailTaken: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
