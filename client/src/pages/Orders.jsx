import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useStore(); // Assuming user state contains token or you can get it from localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setError('Please log in to view your orders.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await fetch(`${BACKEND_URL}/api/orders/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Failed to fetch orders.');
        } else {
          setOrders(data);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('An error occurred while fetching orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]); // Refetch orders if user changes

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">My Orders</h2>
        <p className="text-gray-600 dark:text-gray-300">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Error Loading Orders</h2>
        <p className="text-red-500 dark:text-red-300">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">My Orders</h2>
        <p className="text-gray-600 dark:text-gray-300">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">My Orders</h2>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Order ID: {order._id}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">Total: ₹{order.totalPrice.toFixed(2)}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Status: <span className={`font-bold ${order.orderStatus === 'Paid' ? 'text-green-600' : order.orderStatus === 'Cancelled' ? 'text-red-600' : 'text-yellow-600'}`}>{order.orderStatus}</span></p>
            
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Items:</h4>
            <ul className="space-y-3">
              {order.orderItems.map(item => (
                <li key={item._id} className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{item.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.quantity} x ₹{item.price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>

            {order.shippingAddress && (
              <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Shipping Address:</h4>
                <p className="text-gray-600 dark:text-gray-300">{order.shippingAddress.address}</p>
                <p className="text-gray-600 dark:text-gray-300">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              </div>
            )}

            {/* You can add more details here, e.g., payment details */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders; 