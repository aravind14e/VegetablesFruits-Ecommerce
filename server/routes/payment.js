const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { protect } = require('../middleware/authMiddleware');
const Order = require('../models/Order');

// Create a payment intent
router.post('/create-payment-intent', protect, async (req, res) => {
  try {
    const { amount, currency = 'usd', paymentMethodType = 'card' } = req.body;

    // Determine payment_method_types based on the requested type
    let paymentMethodTypes;
    if (paymentMethodType === 'upi') {
      paymentMethodTypes = ['upi'];
    } else {
      // Default to card if not specified or unknown
      paymentMethodTypes = ['card'];
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: currency,
      payment_method_types: paymentMethodTypes,
      // Note: automatic_payment_methods is not needed if specifying types manually
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Error creating payment intent' });
  }
});

// Handle successful payment (This endpoint can be used for all payment methods)
router.post('/payment-success', protect, async (req, res) => {
  try {
    const { paymentIntentId, orderId, shippingInfo } = req.body;
    
    // In a real application, you would fetch the order items from the user's cart or session
    // For this example, let's assume the order items are also sent in the request body
    const { orderItems, totalPrice, paymentMethod } = req.body; // Assuming these are sent from frontend

    const order = new Order({
      user: req.user._id, // User ID from the protect middleware
      orderItems, // Array of items
      shippingAddress: shippingInfo, // Shipping details
      paymentMethod: paymentMethod, // e.g., 'Stripe'
      paymentResult: { // Details from Stripe
        id: paymentIntentId,
        status: 'succeeded', // Assuming paymentIntent.status was 'succeeded' on frontend
        update_time: new Date().toISOString(), // Use current time or Stripe's time
        email_address: req.user.email, // User email
      },
      totalPrice: totalPrice, // Total amount
      orderStatus: 'Paid', // Set status to Paid after successful payment
      paidAt: new Date(), // Set paid date
    });

    const createdOrder = await order.save();

    console.log(`PaymentIntent ${paymentIntentId} succeeded. Order created: ${createdOrder._id}`);

    res.status(201).json({ success: true, message: 'Payment processed successfully', orderId: createdOrder._id });
  } catch (error) {
    console.error('Error processing payment success:', error);
    res.status(500).json({ error: 'Error processing payment success' });
  }
});

module.exports = router; 