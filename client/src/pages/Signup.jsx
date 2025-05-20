import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Get backend URL from environment variable, default to relative path if not set
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Customer'); // Add role state, default to Customer
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: fullName, email, password, role }), // Include role in the request body
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup successful:', data);
        alert('Signup Successful! Please log in.'); // Replace with a more user-friendly notification
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        setError(data.error || 'Signup failed');
        console.error('Signup error:', data.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Fetch error:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
            <div className="mt-2">
              <label className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  className="form-radio text-green-600"
                  name="role"
                  value="Staff"
                  checked={role === 'Staff'}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="ml-2 text-gray-700">Staff</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-green-600"
                  name="role"
                  value="Customer"
                  checked={role === 'Customer'}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="ml-2 text-gray-700">Customer</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
            {/* Link to Login Page */}
            <a className="inline-block align-baseline font-bold text-sm text-green-600 hover:text-green-800" href="/login">
              Already have an account? Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
} 