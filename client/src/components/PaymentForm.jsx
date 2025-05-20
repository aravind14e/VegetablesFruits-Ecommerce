import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Get backend URL from environment variable
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

export default function PaymentForm({ amount, onSuccess, shippingInfo, total, selectedPaymentMethod, cart, user }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${BACKEND_URL}/api/payment/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        console.error('Error creating payment intent:', err);
        setError('Failed to initialize payment. Please try again.');
      });
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      console.log('Stripe or Elements not loaded:', { stripe, elements });
      return;
    }

    console.log('Confirming payment with:', { clientSecret, CardElement: elements.getElement(CardElement) });

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.name,
          email: user?.email,
        },
      },
    });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      // Payment succeeded
      try {
        const response = await fetch(`${BACKEND_URL}/api/payment/payment-success`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            orderItems: cart.map(item => ({
                product: item._id,
                name: item.name,
                quantity: item.quantity,
                image: item.image,
                price: item.price,
            })),
            totalPrice: total,
            shippingInfo: shippingInfo,
            paymentMethod: selectedPaymentMethod,
          }),
        });

        console.log('Sending order data to backend:', { 
            paymentIntentId: paymentIntent.id,
            orderItems: cart.map(item => ({
                product: item._id,
                name: item.name,
                quantity: item.quantity,
                image: item.image,
                price: item.price,
            })),
            totalPrice: total,
            shippingInfo: shippingInfo,
            paymentMethod: selectedPaymentMethod,
        });

        console.log('Cart structure:', cart);
        console.log('Shipping Info sent:', shippingInfo);
        console.log('Selected Payment Method sent:', selectedPaymentMethod);

        if (response.ok) {
          onSuccess(paymentIntent);
        } else {
          setError('Payment succeeded but failed to update order status.');
        }
      } catch (err) {
        console.error('Error updating order status:', err);
        setError('Payment succeeded but failed to update order status.');
      }
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
          Card Details
        </label>
        <div className="p-3 border rounded-md bg-white dark:bg-gray-700">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>
      {error && (
        <div className="mb-4 text-red-500 text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
          (!stripe || processing) && 'opacity-50 cursor-not-allowed'
        }`}
      >
        {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
} 