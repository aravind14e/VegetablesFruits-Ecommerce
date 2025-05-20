const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Order = require('../models/Order');

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    // Find orders for the user specified by the protect middleware (req.user.id)
    // Populate the orderItems with product details if needed, or just return stored item details
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }); // Sort by newest first

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router; 