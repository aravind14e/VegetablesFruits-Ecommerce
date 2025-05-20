import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Dummy login logic - replace with actual token handling
        console.log('Login successful:', data);
        // Assuming your backend returns a token and user info like: { token: '...', user: { ... } }
        localStorage.setItem('token', data.token); // Store token
        localStorage.setItem('user', JSON.stringify(data.user)); // Store user info
        alert('Login Successful!'); // Replace with a more user-friendly notification
        navigate('/'); // Redirect to home or dashboard
      } else {
        setError(data.error || 'Login failed');
        console.error('Login error:', data.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Fetch error:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password Link Container */}
          <div className="text-right text-sm mb-4">
            <a className="inline-block align-baseline font-bold text-green-600 hover:text-green-800" href="/forgot-password">
              Forgot Password?
            </a>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            {/* Link to Signup Page */}
            <a className="inline-block align-baseline font-bold text-sm text-green-600 hover:text-green-800" href="/signup">
              Don't have an account? Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
} 