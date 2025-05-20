import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { cart, clearCart } = useStore();

  useEffect(() => {
    // Clear cart after successful payment
    if (cart.length > 0) {
      clearCart();
    }
  }, [cart, clearCart]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/shop')}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
} 