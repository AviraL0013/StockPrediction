import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Route for user registration
router.post(
  '/register',
  // Input validation
  [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    // Check if validation failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body; // Extract username and password from the request body

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with the hashed password
      const newUser = new User({ username, password: hashedPassword });

      // Save the user to the database
      await newUser.save();

      // Send a success response
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      // Handle server errors
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;



