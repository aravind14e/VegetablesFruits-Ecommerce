import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore'; // Import useStore

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateCartItemQuantity, removeCartItem } = useStore(); // Get cart state and actions from store
  const [promocode, setPromocode] = useState('');
  const [deliveryFee] = useState(10); // Dummy delivery fee

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return (calculateSubtotal() + deliveryFee).toFixed(2);
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

  const handleProceedToPayment = () => {
    navigate('/checkout');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Your Cart</h1>
        {/* Close button - assuming there's a modal or similar context */}
        {/* Add an onClose prop if this is a modal */}
        {/* <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">&times;</button> */}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 mb-4">Your cart is empty.</div>
          <button 
            onClick={handleContinueShopping}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-2 rounded transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4 border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
            {cart.map(item => (
              <div key={item._id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{item.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                   <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 text-center border rounded-md mr-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                  />
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Promocode Section */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">If you have promo code, enter here</p>
            <div className="flex">
              <input
                type="text"
                placeholder="Promocode"
                value={promocode}
                onChange={(e) => setPromocode(e.target.value)}
                className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              />
              <button
                type="button"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-r-md font-semibold"
              >
                Submit
              </button>
            </div>
          </div>

          {/* Cart Total */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-gray-800 dark:text-gray-200">
              <span>Subtotal</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-800 dark:text-gray-200">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2">
              <span>Total</span>
              <span>₹{calculateTotal()}</span>
            </div>
          </div>

          {/* Proceed to Payment Button */}
          <button
            onClick={handleProceedToPayment}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-3 rounded-md transition"
          >
            PROCEED TO PAYMENT
          </button>
        </>
      )}
    </div>
  );
} 