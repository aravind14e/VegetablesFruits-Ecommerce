import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
import { useStore } from '../store/useStore';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const cartCount = useStore((state) => state.cart.length);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  console.log('Navbar user state:', user);

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="flex items-center justify-between px-10 py-4 shadow bg-white dark:bg-gray-800 rounded-b-2xl sticky top-0 z-50 transition-colors">
      {/* Logo and Brand */}
      <Link to="/" className="flex items-center gap-2 font-extrabold text-2xl text-green-600 dark:text-green-400" onClick={handleHomeClick}>
        <span role="img" aria-label="apple">🍏</span> VeggieFresh
      </Link>
      {/* Navigation Links */}
      <div className="flex gap-10 text-lg font-medium">
        <Link to="/" className="hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 transition" onClick={handleHomeClick}>Home</Link>
        <Link to="/shop" className="hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 transition">Shop</Link>
        <Link to="/about" className="hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 transition">About</Link>
        <Link to="/contact" className="hover:text-green-600 dark:text-gray-200 dark:hover:text-green-400 transition">Contact</Link>
      </div>
      {/* Cart, Login/Profile Dropdown */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <FaMoon className="text-gray-700 dark:text-gray-200 text-xl" />
          ) : (
            <FaSun className="text-yellow-500 text-xl" />
          )}
        </button>
        <Link to="/checkout" className="relative">
          <FaShoppingCart className="text-2xl text-green-600 dark:text-green-400" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1 animate-bounce">{cartCount}</span>
          )}
        </Link>
        {user ? (
          <div className="relative">
            <button onClick={toggleDropdown} className="px-6 py-2 border-2 border-green-600 dark:border-green-400 rounded-full text-green-600 dark:text-green-400 font-semibold hover:bg-green-50 dark:hover:bg-gray-700 active:bg-green-100 dark:active:bg-gray-600 transition">
              Profile
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-bold">{user.name}</p>
                </div>
                {user?.role === 'Staff' && (
                  <Link to="/admin" className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsDropdownOpen(false)}>Admin</Link>
                )}
                <Link to="/orders" className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsDropdownOpen(false)}>My Orders</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth" className="px-6 py-2 border-2 border-green-600 dark:border-green-400 rounded-full text-green-600 dark:text-green-400 font-semibold hover:bg-green-50 dark:hover:bg-gray-700 active:bg-green-100 dark:active:bg-gray-600 transition">Login</Link>
        )}
      </div>
    </nav>
  );
} 