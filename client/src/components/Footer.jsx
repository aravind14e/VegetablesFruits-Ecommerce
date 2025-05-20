import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand/About */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">VeggieFresh</h3>
            <p className="text-sm mb-4">
              Freshness delivered to your door.
              Discover a wide selection of organic
              fruits and vegetables for a healthy lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/yourpage" className="hover:text-gray-900 dark:hover:text-gray-100"><FaFacebookF size={20} /></a>
              <a href="https://www.instagram.com/yourpage" className="hover:text-gray-900 dark:hover:text-gray-100"><FaInstagram size={20} /></a>
              <a href="https://www.twitter.com/yourpage" className="hover:text-gray-900 dark:hover:text-gray-100"><FaTwitter size={20} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              {/* Assuming you have a Menu page */}
              <li><Link to="/shop" className="hover:underline">Shop</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <FaMapMarkerAlt className="flex-shrink-0 h-6 w-6 text-green-600 mr-2" />
                <div className="ml-3">
                  <p className="font-semibold">Address</p>
                  <p>123 Fresh Lane, Produce City</p>
                  <p>Farmville, FL 32801</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaPhone className="flex-shrink-0 h-6 w-6 text-green-600 mr-2" />
                <div className="ml-3">
                  <p className="font-semibold">Phone</p>
                  <p>(407) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="flex-shrink-0 h-6 w-6 text-green-600 mr-2" />
                <div className="ml-3">
                  <p className="font-semibold">Email</p>
                  <p>info@veggiefresh.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Opening Hours */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Opening Hours</h3>
            <div className="space-y-2 text-sm">
              <p>Monday - Friday: 7:00 AM - 9:00 PM</p>
              <p>Saturday: 8:00 AM - 10:00 PM</p>
              <p>Sunday: 8:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
          <div className="flex space-x-4 mt-4 md:mt-0">
          </div>
        </div>
      </div>
    </footer>
  );
} 