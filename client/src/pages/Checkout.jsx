import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// Get backend URL from environment variable
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

// Create a wrapper component to use useStripe and useElements hooks
function CheckoutForm({
  amount,
  onPaymentSuccess,
  shippingInfo,
  selectedPaymentMethod,
  handlePlaceOrder,
  cart,
  total,
  user
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUPIPayment = async () => {
    setLoading(true);
    setError(null);

    if (!stripe) {
      // Stripe.js has not yet loaded.
      setLoading(false);
      setError('Stripe is not loaded yet.');
      return;
    }

    try {
      // Create PaymentIntent on the backend for UPI
      const response = await fetch(`${BACKEND_URL}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ amount: amount, paymentMethodType: 'upi' }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create UPI payment intent.');
        setLoading(false);
        return;
      }

      const clientSecret = data.clientSecret;

      // Confirm the UPI payment on the frontend
      const { error: confirmError, paymentIntent } = await stripe.confirmUpiPayment(
        clientSecret,
        {
          // No payment method data needed for UPI confirmation
        }
      );

      if (confirmError) {
        setError(confirmError.message);
      } else if (paymentIntent.status === 'succeeded') {
        // UPI payment succeeded
        // Call backend to update order status
        const successResponse = await fetch(`${BACKEND_URL}/api/payment/payment-success`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              paymentIntentId: paymentIntent.id,
              orderId: 'ORDER_ID', // Replace with actual order ID
              shippingInfo: shippingInfo // Include shipping info
            }),
          });

          if (successResponse.ok) {
             onPaymentSuccess(paymentIntent);
          } else {
             setError('Payment succeeded but failed to update order status.');
          }

      } else {
           setError(`UPI payment status: ${paymentIntent.status}`);
      }

    } catch (err) {
      console.error('UPI payment error:', err);
      setError('An error occurred during UPI payment.');
    } finally {
      setLoading(false);
    }
  };

  // Render different content based on selected payment method
  if (selectedPaymentMethod === 'Credit/Debit Card') {
    return (
      <PaymentForm
        amount={amount}
        onSuccess={onPaymentSuccess}
        shippingInfo={shippingInfo}
        total={total}
        selectedPaymentMethod={selectedPaymentMethod}
        cart={cart}
        user={user}
      />
    );
  } else if (selectedPaymentMethod === 'UPI') {
    return (
       <div className="mt-6">
         {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
         <button
            onClick={handleUPIPayment}
            className={`w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={loading}
          >
            {loading ? 'Processing UPI...' : 'Pay with UPI'}
          </button>
        </div>
    );
  } else if (selectedPaymentMethod !== '') {
      // For Cash on Delivery or other methods
      return (
         <div className="mt-6">
           <button
            onClick={handlePlaceOrder} // Use the handlePlaceOrder from the parent
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Place Order
          </button>
        </div>
      );
  }

  // Default state if no payment method is selected
   return null;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, user, updateCartItemQuantity, removeCartItem } = useStore();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentSuccess(true);
    console.log('Payment successful!', paymentIntent);
    console.log('Shipping Info:', shippingInfo);
    // Clear cart and redirect to success page
    setTimeout(() => {
      navigate('/payment-success');
    }, 2000);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 1) {
      removeCartItem(itemId);
    } else {
      updateCartItemQuantity(itemId, quantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeCartItem(itemId);
  };

  const handlePlaceOrder = () => {
    // This function is now primarily for non-Stripe methods (like COD)
    console.log('Placing order with payment method:', selectedPaymentMethod);
    console.log('Shipping Info:', shippingInfo);

    if (selectedPaymentMethod === 'Cash on Delivery') {
      // Handle COD order placement (requires backend endpoint)
      console.log('Handling Cash on Delivery');
      // You would typically send cart and shippingInfo to backend here
      // navigate('/order-confirmation');
    } else if (selectedPaymentMethod === 'UPI') {
      // UPI handled by the CheckoutForm component's handleUPIPayment
      console.log('UPI handled by Stripe CheckoutForm');
    } else if (selectedPaymentMethod === 'Credit/Debit Card') {
      // Credit/Debit Card handled by the PaymentForm component
      console.log('Credit/Debit Card handled by Stripe PaymentForm');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Please log in to checkout</h2>
          <button
            onClick={() => navigate('/auth')}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/shop')}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 dark:text-gray-300">Thank you for your purchase.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">Checkout</h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Shipping Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Shipping Information</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
              <input type="text" name="address" id="address" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2" value={shippingInfo.address} onChange={handleShippingChange} required />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
              <input type="text" name="city" id="city" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2" value={shippingInfo.city} onChange={handleShippingChange} required />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
              <input type="text" name="state" id="state" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2" value={shippingInfo.state} onChange={handleShippingChange} required />
            </div>
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Zip Code</label>
              <input type="text" name="zipCode" id="zipCode" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2" value={shippingInfo.zipCode} onChange={handleShippingChange} required />
            </div>
          </div>
        </div>

        {/* Payment Details and Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Payment Method</h3>

          {/* Payment Method Selection */}
          <div className="space-y-4 mb-6 flex-grow">
            <label className="flex items-center p-4 border rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={selectedPaymentMethod === 'Cash on Delivery'}
                onChange={handlePaymentMethodChange}
                className="form-radio text-green-600 mr-3 dark:text-green-400"
              />
              <div>
                <span className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Cash on Delivery</span>
                <span className="block text-sm text-gray-600 dark:text-gray-400">Pay when you receive your order</span>
              </div>
            </label>

            <label className="flex items-center p-4 border rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="Credit/Debit Card"
                checked={selectedPaymentMethod === 'Credit/Debit Card'}
                onChange={handlePaymentMethodChange}
                className="form-radio text-green-600 mr-3 dark:text-green-400"
              />
              <div>
                <span className="block text-lg font-semibold text-gray-800 dark:text-gray-200">Credit/Debit Card</span>
                <span className="block text-sm text-gray-600 dark:text-gray-400">Pay securely with your card</span>
              </div>
            </label>

            <label className="flex items-center p-4 border rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="UPI"
                checked={selectedPaymentMethod === 'UPI'}
                onChange={handlePaymentMethodChange}
                className="form-radio text-green-600 mr-3 dark:text-green-400"
              />
              <div>
                <span className="block text-lg font-semibold text-gray-800 dark:text-gray-200">UPI</span>
                <span className="block text-sm text-gray-600 dark:text-gray-400">Pay using UPI apps</span>
              </div>
            </label>
          </div>

          {/* Conditionally render PaymentForm or a different button based on selection */}
          <Elements stripe={stripePromise}>
            <CheckoutForm
               amount={total}
               onPaymentSuccess={handlePaymentSuccess}
               shippingInfo={shippingInfo}
               selectedPaymentMethod={selectedPaymentMethod}
               handlePlaceOrder={handlePlaceOrder}
               cart={cart}
               total={total}
               user={user}
             />
           </Elements>

          {/* Order Summary - Keep this visible */}
           <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Order Summary</h3>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div>
                  <p className="text-gray-800 dark:text-gray-200">{item.name}</p>
                   <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                     <button
                       onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                       className="px-1 py-0.5 border rounded-md text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition mr-1"
                     >
                       -
                     </button>
                     <span>Quantity: {item.quantity}</span>
                     <button
                       onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                       className="px-1 py-0.5 border rounded-md text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition ml-1"
                     >
                       +
                     </button>
                     <button
                       onClick={() => handleRemoveItem(item._id)}
                       className="ml-4 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600 text-sm"
                     >
                       Remove
                     </button>
                   </div>
                </div>
                <p className="text-gray-800 dark:text-gray-200">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Total</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200"> ${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}