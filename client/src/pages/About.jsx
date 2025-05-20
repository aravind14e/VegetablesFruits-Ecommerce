import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">

        {/* Our Story Section */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
          {/* Left: Text */}
          <div className="max-w-xl md:w-1/2 flex-1">
            <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">Our Story</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Freshness Meets Simplicity.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              At VeggieFresh, we believe that healthy living starts with fresh choices. Founded in 2025, our mission is simple — to bring farm-fresh vegetables and fruits straight to your doorstep with just a few clicks. What began as a small initiative to connect local farmers with urban families has blossomed into a trusted platform for quality produce and seamless delivery.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Backed by a passionate team of food lovers and tech minds, VeggieFresh is more than just an online store. We're building a bridge between traditional farming values and modern convenience — ensuring every product on your screen is handpicked, seasonal, and sustainably sourced.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Whether you're a health enthusiast, a home cook, or just someone who loves juicy mangoes — we're here to make your fresh shopping experience simple, delightful, and dependable.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              🌱 Grown with care. Delivered with love.
              Welcome to the VeggieFresh family.
            </p>
          </div>
          {/* Right: Image */}
          <div className="md:w-1/2 flex-1 flex justify-center relative">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Farm Harvest"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </section>

        {/* Our Mission & Values Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 text-center mb-8">Our Mission & Values</h2>
          <p className="text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
            At VeggieFresh, our mission is to make healthy eating easy and enjoyable by delivering
            top-quality fruits and vegetables while supporting local farmers and sustainable practices.
          </p>

          {/* Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Card 1: Freshness Guaranteed */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="text-orange-500 mb-4">
                {/* Replace with appropriate icon if available, using a placeholder SVG for now */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Freshness
                Guaranteed</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We source our produce daily to
                ensure you receive
                the freshest items at
                their peak flavor and
                nutritional value.
              </p>
            </div>

            {/* Card 2: Sustainability */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="text-orange-500 mb-4">
                {/* Replace with appropriate icon if available, using a placeholder SVG for now */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Sustainability</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We are committed to
                environmentally
                friendly farming
                methods, reducing
                food waste, and
                supporting
                biodiversity.
              </p>
            </div>

            {/* Card 3: Community Focused */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="text-orange-500 mb-4">
                {/* Replace with appropriate icon if available, using a placeholder SVG for now */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20h10a2 2 0 002-2v-2c0-.656.126-1.283.356-1.857M9.07 9.07a4 4 0 115.858 0M12 17a9.002 9.002 0 00-5.857 2.236L7 20h10l-.143-.764A9.002 9.002 0 0012 17z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Community
                Focused</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We prioritize
                supporting local
                farmers, fostering fair
                partnerships, and
                building a strong,
                healthy community.
              </p>
            </div>
          </div>
        </section>

        {/* Our Commitment to Quality Section */}
        <section className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          {/* Left: Image Container with Animation */}
          <motion.div
            className="w-full md:w-1/2 rounded-lg shadow-md overflow-hidden flex items-center justify-center" style={{ height: '300px' }}
            initial={{ opacity: 0, x: -50 }} // Start from invisible and slightly left
            whileInView={{ opacity: 1, x: 0 }} // Animate to fully visible and original position
            viewport={{ once: true, amount: 0.5 }} // Trigger once when 50% of the element is in view
            transition={{ duration: 0.8 }}
          >
            {/* Placeholder for a real image */}
            <img
              src="https://media.istockphoto.com/id/1341375854/photo/female-owner-checking-inventory-at-store.webp?a=1&b=1&s=612x612&w=0&k=20&c=7VSWef_EFhLcjdT41bApJaSPyoDGQBCR-8nwhoO0qlE="
              alt="Commitment to Quality"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right: Text Container with Animation */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }} // Start from invisible and slightly right
            whileInView={{ opacity: 1, x: 0 }} // Animate to fully visible and original position
            viewport={{ once: true, amount: 0.5 }} // Trigger once when 50% of the element is in view
            transition={{ duration: 0.8, delay: 0.2 }} // Add a slight delay for the text animation
          >
            <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">Our Commitment to
              Quality</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              VeggieFresh is dedicated to providing the
              best. We partner with trusted local farms
              and suppliers who share our commitment
              to quality, sustainable practices, and
              ethical sourcing.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              From careful selection of seeds and soil to
              climate-controlled delivery, we ensure our
              produce reaches you in perfect condition,
              full of flavor and vital nutrients, ready to
              be enjoyed.
            </p>
          </motion.div>
        </section>

      </div>
    </div>
  );
} 