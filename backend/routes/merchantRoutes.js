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

//* MERCHANT REGISTRATION

// POST register a new merchant
router.post('/register', async (req, res) => {
  const formidable = new Formidable();

  formidable.parse(req, async (err, fields, files) => {
    if (err) {
      console.log('Error parsing form data: ', err);
      return res.status(400).json({ message: 'Error parsing form data' });
    }

    try {
      const status = 'pending';

      // Extract field values; ensure they are not arrays
      const fullname = Array.isArray(fields.fullname) ? fields.fullname[0] : fields.fullname;
      const email = Array.isArray(fields.email) ? fields.email[0] : fields.email;
      const userRole = Array.isArray(fields.userRole) ? fields.userRole[0] : fields.userRole;
      const phoneNum = Array.isArray(fields.phoneNum) ? fields.phoneNum[0] : fields.phoneNum;
      const merchantDescription = Array.isArray(fields.merchantDescription) ? fields.merchantDescription[0] : fields.merchantDescription;
      const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;

      // Handle createdAt field
      let createdAt = fields.createdAt ? new Date(fields.createdAt) : new Date();
      if (isNaN(createdAt.getTime())) { // Check if the date is invalid
        createdAt = new Date();
      }

      // Check if merchant with the same email already exists
      const doesMerchantExist = await User.findOne({ email: req.body.email });
      if (doesMerchantExist) {
        return res.status(400).json({ message: 'Merchant with the same email already exists' });
      }

      // generate random password and hash it
      const generatedPassword = randomstring.generate({ length: 12, charset: 'alphabetic' });
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      // let documentData = null;
      let documentPath = '';
      let newFilename = '';

      // Handle file upload
      if (files.document && files.document.length > 0) {
        const file = files.document[0];
        console.log('file object: ', file);

        if (file.mimetype !== 'application/pdf') {
          console.log('file is not pdf from backend!');
          console.log('file mimetype: ', file.mimetype);
          return res.status(400).json({ message: 'Only PDF files are allowed' });
        }

        const oldPath = file.filepath;
        const originalFilename = file.originalFilename;

        // Generate new filename
        newFilename = `${fullname.replace(/\s+/g, '_')}_${originalFilename}`;
        const newPath = path.join(__dirname, '../uploads/documents', newFilename);

        // Move the file
        fs.renameSync(oldPath, newPath);
        // Generate a relative URL for the file
        documentPath = `/uploads/documents/${newFilename}`;

        // Optional: Log to check if documentData is not null or empty
        console.log('filename: ', newFilename);
        console.log('documentPath: ', documentPath);
        // console.log('documentData: ', documentData.length); // Check if data is read
      }

      // Create a new user (merchant)
      //! Doesnt work with formidable
      // const user = new User({
      //   fullname: req.body.fullname,
      //   email: req.body.email,
      //   password: hashedPassword,
      //   userRole: req.body.userRole,
      //   phoneNum: req.body.phoneNum,
      //   status: status,
      //   address: req.body.address || null,
      //   merchantDescription: req.body.merchantDescription || null,
      //   // document: req.body.document || null,
      //   document: documentData,
      //   // filename: req.body.filename || null,
      //   filename: filename,
      //   description: req.body.description || null,
      //   isMerchantChangedPassword: req.body.isMerchantChangedPassword || false,
      //   resetPasswordToken: req.body.resetPasswordToken || null,
      //   createdAt: req.body.createdAt || new Date(),
      // });

      // Create a new user (merchant)
      const user = new User({
        fullname,
        email,
        password: hashedPassword,
        userRole,
        phoneNum,
        status,
        address: fields.address,
        merchantDescription,
        // document: documentData,
        document: documentPath,
        // filename,
        filename: newFilename,
        description,
        isMerchantChangedPassword: false,
        resetPasswordToken: null,
        createdAt
      });

      // Save the user in the database
      const newMerchant = await user.save();

      //! DEBUG FULL NAME
      console.log('full name: ', fullname);
      // Send email with the generated password
      const emailTemplatePath = path.join(__dirname, '../templates/merchantPasswordEmailTemplate.html');
      const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');
      const customizedTemplate = emailTemplate
        .replace('{{fullname}}', fullname)
        .replace('{{password}}', generatedPassword);

      const mailOptions = {
        from: process.env.MAILTRAP_SENDER,
        to: user.email,
        subject: 'Your Merchant Account Password',
        html: customizedTemplate
      };

      //* Send mail
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
      return;
    }
  });
});

export default router;
