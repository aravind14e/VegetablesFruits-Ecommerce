import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Customer');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useStore(); // Get setUser from the store

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null); // Clear errors when toggling
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin) { // If in Signup mode, perform validation
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    const url = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const body = isLogin
      ? { email, password }
      : { name: fullName, email, password, role }; // Include role in signup body

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`${isLogin ? 'Login' : 'Signup'} successful:`, data);
        if (isLogin) {
          // Store token on successful login
          localStorage.setItem('token', data.token); // Assuming backend returns token

          // Fetch user details including role after login
          try {
            const userResponse = await fetch('/api/auth/me', {
              headers: {
                'Authorization': `Bearer ${data.token}`,
              },
            });

            const userData = await userResponse.json();

            if (userResponse.ok) {
              localStorage.setItem('user', JSON.stringify(userData));
              setUser(userData); // Update user state in Zustand store
              console.log('User data fetched from /api/auth/me:', userData); // Add this log
              alert('Login Successful!'); // Replace with a better notification

              // Redirect based on role
              if (userData?.role === 'Staff') {
                navigate('/admin'); // Redirect Staff to admin panel
              } else {
                navigate('/'); // Redirect others (Customers) to home
              }
            } else {
              console.error('Failed to fetch user data after login:', userData);
              setError('Login successful, but failed to fetch user details.');
            }
          } catch (fetchErr) {
            console.error('Fetch user data error after login:', fetchErr);
            setError('Login successful, but network error fetching user details.');
          }

        } else {
          // --- Signup Success --- //
          console.log('Signup successful response:', response);
          console.log('Signup successful data:', data);
          // Store the token
          localStorage.setItem('token', data.token);
          
          // Update auth state
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user); // Update user state in Zustand store
          
          // Redirect to profile page after a short delay
          setTimeout(() => {
            navigate('/profile');
          }, 1500);
        }
      } else {
        console.error('Login/Signup failed response:', response);
        console.error('Login/Signup failed data:', data);
        setError(data.error || `An error occurred. ${isLogin ? 'Login' : 'Signup'} failed.`);
        console.error(`${isLogin ? 'Login' : 'Signup'} error:`, data.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Fetch error:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isLogin && (
              <a href="/forgot-password" className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 float-right">
                Forgot password?
              </a>
            )}
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Role:</label>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-green-600 dark:text-green-400"
                    name="role"
                    value="Staff"
                    checked={role === 'Staff'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-200">Staff</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-green-600 dark:text-green-400"
                    name="role"
                    value="Customer"
                    checked={role === 'Customer'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-200">Customer</span>
                </label>
              </div>
            </div>
          )}
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
            <button
              type="button"
              className="inline-block align-baseline font-bold text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
              onClick={toggleForm}
            >
              {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 