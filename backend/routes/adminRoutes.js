import express from 'express';
import User from '../models/UsersModel.js';


const router = express.Router();

// GET all merchants
router.get('/merchant-list', async (req, res) => {
  try {
    const merchants = await User.find({ userRole: 'merchant' });

    // Exclude the "password" field from each user
    const merchantsWithoutPassword = merchants.map(merchant => {
      const { password, ...merchantWithoutPassword } = merchant.toObject();
      return merchantWithoutPassword;
    });

    res.status(200).json(merchantsWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Error getting merchants' });
  }
});

// Get merchant detail by ID
router.get('/merchant/:id', async (req, res) => {
  try {
    const merchant = await User.findById(req.params.id);

    // exclude password merchant
    const { password, ...merchantWithoutPassword } = merchant.toObject();
    res.status(200).json(merchantWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Error getting merchant detail' });
  }
});

// Verify Merchant status from 'pending' to 'verified'
router.put('/merchant/verify/:id', async (req, res) => {
  try {
    const merchant = await User.findByIdAndUpdate(req.params.id, { status: 'verified' }, { new: true });
    res.status(200).json(merchant);
  } catch (error) {
    res.status(500).json({ message: 'Error verifying merchant' });
  }
});

// Reject Merchant status from 'pending' to 'rejected'
router.put('/merchant/reject/:id', async (req, res) => {
  try {
    const merchant = await User.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    res.status(200).json(merchant);
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting merchant' });
  }
});

//* DASHBOARD

// Get All merchant counts
router.get('/merchant/count/all', async (req, res) => {
  try {
    const merchants = await User.find({ userRole: 'merchant' });
    const pendingMerchants = await User.find({ userRole: 'merchant', status: 'pending' });
    const verifiedMerchants = await User.find({ userRole: 'merchant', status: 'verified' });
    const rejectedMerchants = await User.find({ userRole: 'merchant', status: 'rejected' });
    res.status(200).json({
      merchants: merchants.length,
      pendingMerchants: pendingMerchants.length,
      verifiedMerchants: verifiedMerchants.length,
      rejectedMerchants: rejectedMerchants.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting merchant counts' });
  }
});

// // GET all verified merchant counts
// router.get('/merchant/count/verified', async (req, res) => {
//   try {
//     const merchants = await User.find({ userRole: 'merchant', status: 'verified' });
//     res.status(200).json(merchants);
//   } catch (error) {
//     res.status(500).json({ message: 'Error getting verified merchants' });
//   }
// });

// // Get all pending merchant counts
// router.get('/merchant/count/pending', async (req, res) => {
//   try {
//     const merchants = await User.find({ userRole: 'merchant', status: 'pending' });
//     res.status(200).json(merchants);
//   } catch (error) {
//     res.status(500).json({ message: 'Error getting pending merchants' });
//   }
// });

// // Get Rejected merchants count
// router.get('/merchant/count/rejected', async (req, res) => {
//   try {
//     const merchants = await User.find({ userRole: 'merchant', status: 'rejected' });
//     res.status(200).json(merchants);
//   } catch (error) {
//     res.status(500).json({ message: 'Error getting rejected merchants' });
//   }
// });

export default router;
