const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Uncomment when real JWT is used
const bcrypt = require('bcryptjs'); // Uncomment when real bcrypt is used
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const crypto = require('crypto');

// Remove in-memory user storage as we will use MongoDB
// let users = [];

// Remove in-memory users middleware
// router.use((req, res, next) => { ... });

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};

// @route   POST /api/auth/signup
// @desc    Register user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists in the database
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create a new user instance. The password will be hashed by the pre-save hook in the User model.
    user = new User({
      name,
      email,
      password,
      role,
    });

    // Save the user to the database
    await user.save();

    // Generate JWT
    const token = generateToken(user._id);

    // Return user data and token
    res.status(201).json({ 
      token,
      user: { 
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Signup Error:', err);
    // Log specific Mongoose validation errors if any
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ error: messages.join(', ') });
    }
    // Send back a more detailed error in development mode
    const errorResponse = process.env.NODE_ENV === 'development' ? err.message : 'Server Error during signup';
    res.status(500).send({ error: errorResponse });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email in the database and explicitly select the password
    const user = await User.findOne({ email }).select('+password');

    console.log(`Attempting login for email: ${email}`);
    console.log(`User found: ${!!user}`);
    if (user) {
      console.log(`User has password field: ${!!user.password}`);
    }

    // Check if user exists and compare password using the method in the User model
    if (!user || !user.password || !(await user.matchPassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Return user data and token
    res.json({ 
      token,
      user: { 
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        // Omit password for security
      }
    });

  } catch (err) {
    console.error('Login Error:', err);
    const errorResponse = process.env.NODE_ENV === 'development' ? err.message : 'Server Error during login';
    res.status(500).send({ error: errorResponse });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user by token
// @access  Private
router.get('/me', protect, async (req, res) => {
  // The protect middleware will put the user on req.user
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
});

// @route   POST /api/auth/forgot-password
// @desc    Request password reset
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No user found with that email address' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // In a real application, you would send an email here with the reset link
    // For development, we'll just return the token
    res.json({
      message: 'Password reset instructions sent to your email',
      resetToken // Remove this in production
    });

  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password
// @access  Public
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });

  } catch (err) {
    console.error('Reset Password Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;