import express from 'express';
import User from '../models/UsersModel.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET user details
router.get('/:userId', authenticateToken, async (req, res) => {
  try {
      const userId = req.params.userId;
      const user = await User.findById(userId).select('-password');

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
      return; // Make sure to exit the function here
  }
});

// GET user details without authentication
router.get('/public/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).select('-password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
      return;
    }
  });


export default router;
