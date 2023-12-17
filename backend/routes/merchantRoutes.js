import express from 'express';
import User from '../models/UsersModel.js';
import bcrypt from 'bcrypt';
import fs from 'fs';
import transporter from '../utils/mailer.js';
import randomstring from 'randomstring';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//* MERCHANT REGISTRATION

// POST register a new merchant
router.post('/register', async (req, res) => {
  try {
    // Check if merchant with the same email already exists
    const status = 'pending';

    const doesMerchantExist = await User.findOne({ email: req.body.email });
    if (doesMerchantExist) {
      return res.status(400).json({ message: 'Merchant with the same email already exists' });
    }

    // generate random password and hash it
    const generatedPassword = randomstring.generate({ length: 12, charset: 'alphabetic' });
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Create a new user (merchant)
    const user = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      userRole: req.body.userRole,
      phoneNum: req.body.phoneNum,
      status: status,
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
    const newMerchant = await user.save();

    //! DEBUG FULL NAME
    console.log('full name: ', req.body.fullname);
    // Send email with the generated password
    const emailTemplatePath = path.join(__dirname, '../templates/merchantPasswordEmailTemplate.html');
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');
    const customizedTemplate = emailTemplate
      .replace('{{fullname}}', req.body.fullname)
      .replace('{{password}}', generatedPassword);

    const mailOptions = {
      from: process.env.MAILTRAP_SENDER,
      to: user.email,
      subject: 'Your Merchant Account Password',
      html: customizedTemplate
    };

    //  Send mail
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent to: ', user.email);
    } catch (error) {
      console.error('Error sending email:', error);
    }

    res.status(201).json({ message: 'User created successfully', user: newMerchant });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
    return; // Make sure to exit the function here
  }

});

export default router;
