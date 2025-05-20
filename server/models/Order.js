const mongoose = require('mongoose');

const OrderItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  product: { // Reference to the product, if you have a Product model
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
});

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  orderItems: [OrderItemSchema],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: { // Details from the payment gateway (e.g., Stripe Payment Intent ID)
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'Pending', // e.g., Pending, Paid, Processing, Shipped, Delivered, Cancelled
  },
  paidAt: {
    type: Date,
  },
  deliveredAt: {
    type: Date,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order; 