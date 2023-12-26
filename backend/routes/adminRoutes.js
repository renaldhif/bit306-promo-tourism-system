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

// merchant data by month
// used for chart analytics
router.get('/analytics/merchants-by-month/:year', async (req, res) => {
  // Default to current year
  // const requestedYear = parseInt(req.query.year) || new Date().getFullYear();
  const requestedYear = parseInt(req.params.year);
  console.log('merchant adminRoutes requestedYear', requestedYear);

  try {
    const merchantData = await User.aggregate([
      {
        $match: {
          userRole: 'merchant', // Filter for userRole 'merchant'
          createdAt: {
            $gte: new Date(`${requestedYear}-01-01`),
            $lt: new Date(`${requestedYear + 1}-01-01`)
          } // Filter for the requested year
        }
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" }
        }
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    res.json(merchantData);
    console.log("🚀 ~ file: adminRoutes.js:142 ~ router.get ~ merchantData:", merchantData)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// customer data by month
router.get('/analytics/customers-by-month/:year', async (req, res) => {
  // Default to current year
  // const requestedYear = parseInt(req.query.year) || new Date().getFullYear();
  const requestedYear = parseInt(req.params.year);

  try {
    const customerData = await User.aggregate([
      {
        $match: {
          userRole: 'customer', // Filter for userRole 'merchant'
          createdAt: {
            $gte: new Date(`${requestedYear}-01-01`),
            $lt: new Date(`${requestedYear + 1}-01-01`)
          } // Filter for the requested year
        }
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" }
        }
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    res.json(customerData);
    console.log("🚀 ~ file: adminRoutes.js:181 ~ router.get ~ customerData:", customerData)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
