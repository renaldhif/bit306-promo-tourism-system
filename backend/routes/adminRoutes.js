import express from 'express';
import User from '../models/UsersModel.js';
import bcrypt from 'bcrypt';
import fs from 'fs';
import transporter from '../utils/mailer.js';
import randomstring from 'randomstring';
import path from 'path';
import { fileURLToPath } from 'url';
import { Formidable } from 'formidable';


const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    // Generate random password and hash it
    const generatedPassword = randomstring.generate({ length: 12, charset: 'alphabetic' });
    const newHashedPassword = await bcrypt.hash(generatedPassword, 10);

    const merchant = await User.findByIdAndUpdate(req.params.id, { status: 'verified', password: newHashedPassword }, { new: true });

    // Send the password to the merchant's email
    const emailTemplatePath = path.join(__dirname, '../templates/merchantPasswordEmailTemplate.html');
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');
    const customizedTemplate = emailTemplate
      .replace('{{fullname}}', merchant.fullname)
      .replace('{{password}}', generatedPassword);

    const mailOptions = {
      from: process.env.MAILTRAP_SENDER,
      to: merchant.email,
      subject: 'Your Merchant Account Password',
      html: customizedTemplate
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(200).json(merchant);
  } catch (error) {
    res.status(500).json({ message: 'Error verifying merchant', error: error.message });
  }
});

// Reject Merchant status from 'pending' to 'rejected'
router.put('/merchant/reject/:id', async (req, res) => {
  try {
    const merchant = await User.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    // Send the password to the merchant's email
    const rejectTemplatePath = path.join(__dirname, '../templates/merchantRejectedEmailtemplate.html');
    const emailTemplate = fs.readFileSync(rejectTemplatePath, 'utf8');
    const customizedTemplate = emailTemplate.replace('{{fullname}}', merchant.fullname)

    const mailOptions = {
      from: process.env.MAILTRAP_SENDER,
      to: merchant.email,
      subject: 'Account Rejection Notification',
      html: customizedTemplate
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
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

export default router;
