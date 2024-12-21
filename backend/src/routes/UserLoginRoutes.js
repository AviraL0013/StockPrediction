import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Route for user login
router.post(
  '/login',
  // Input validation
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    // Check if validation failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body; // Extract username and password from the request body

    try {
      // Find the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Create a JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET, // Secret key for JWT
        { expiresIn: '1m' } // Token expiration time
      );

      // Login successful, return the token
      res.status(200).json({ message: 'Login successful', token,username: user.username });
    } catch (err) {
      // Handle server errors
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;