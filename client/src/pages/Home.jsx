import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// Sample data for products
const sampleProducts = [
  // Fruits
  {
    _id: '1',
    name: 'Fresh Apples',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGVzfGVufDB8fDB8fHww',
    category: 'fruits',
    isOrganic: false,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: true
  },
  {
    _id: '2',
    name: 'Bananas',
    price: 1.49,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'fruits',
    isOrganic: true,
    isSeasonal: false,
    freshness: 'fresh',
    isNewArrival: false
  },
  {
    _id: '3',
    name: 'Fresh Strawberries',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'fruits',
    isOrganic: false,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: true
  },
  {
    _id: '4',
    name: 'Oranges',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'fruits',
    isOrganic: true,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: false
  },
  {
    _id: '5',
    name: 'Fresh Mangoes',
    price: 2.99,
    image: 'https://media.istockphoto.com/id/177352149/photo/close-up-of-mangoes-arranged-inorder-to-sell.webp?a=1&b=1&s=612x612&w=0&k=20&c=zc6uo-ijbwU-nMgCFFJnS3O7OEllWSj2Uxqd__SGrzQ=',
    category: 'fruits',
    isOrganic: false,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: true
  },
  {
    _id: '6',
    name: 'Grapes',
    price: 4.99,
    image: 'https://media.istockphoto.com/id/1200996361/photo/bunch-of-organic-grapes.webp?a=1&b=1&s=612x612&w=0&k=20&c=50PVoDEK4ZMPmtbT-BJzLF4xsANmyzfW9WEd1e_lw1U=',
    category: 'fruits',
    isOrganic: true,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: false
  },
  {
    _id: '7',
    name: 'Fresh Pineapple',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'fruits',
    isOrganic: false,
    isSeasonal: false,
    freshness: 'fresh',
    isNewArrival: true
  },
  {
    _id: '8',
    name: 'Pears',
    price: 2.79,
    image: 'https://media.istockphoto.com/id/172318236/photo/pears.webp?a=1&b=1&s=612x612&w=0&k=20&c=Q2c_Ach50KekiKYAuivYHnPApRqRpBnpMiJS2n9PqMA=',
    category: 'fruits',
    isOrganic: true,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: false
  },

  // Vegetables
  {
    _id: '9',
    name: 'Fresh Spinach',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'vegetables',
    isOrganic: false,
    isSeasonal: false,
    freshness: 'fresh',
    isNewArrival: true
  },
  {
    _id: '10',
    name: 'Organic Carrots',
    price: 1.79,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'vegetables',
    isOrganic: true,
    isSeasonal: false,
    freshness: 'fresh',
    isNewArrival: false
  },
  {
    _id: '11',
    name: 'Fresh Tomatoes',
    price: 2.29,
    image: 'https://media.istockphoto.com/id/171589415/photo/tomatoes.webp?a=1&b=1&s=612x612&w=0&k=20&c=FE_rhhiVvcyZkHGu9MkGi01NtB3gWk3iK5zOEdyFRkg=',
    category: 'vegetables',
    isOrganic: false,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: true
  },
  {
    _id: '12',
    name: 'Organic Broccoli',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'vegetables',
    isOrganic: true,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: false
  },
  {
    _id: '13',
    name: 'Fresh Bell Peppers',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'vegetables',
    isOrganic: false,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: true
  },
  {
    _id: '14',
    name: 'Organic Cucumber',
    price: 1.49,
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'vegetables',
    isOrganic: true,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: false
  },
  {
    _id: '15',
    name: 'Fresh Potatoes',
    price: 1.29,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'vegetables',
    isOrganic: false,
    isSeasonal: false,
    freshness: 'fresh',
    isNewArrival: true
  },
  {
    _id: '16',
    name: 'Organic Sweet Corn',
    price: 2.49,
    image: 'https://plus.unsplash.com/premium_photo-1667047165840-803e47970128?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3dlZXQlMjBjb3JufGVufDB8fDB8fHww',
    category: 'vegetables',
    isOrganic: true,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: false
  },
  {
    _id: '17',
    name: 'Cauliflower',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1692956706779-576c151ec712?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F1bGlmbG93ZXJ8ZW58MHx8MHx8fDA%3D',
    category: 'vegetables',
    isOrganic: false,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: true
  },
  {
    _id: '18',
    name: 'Onions',
    price: 1.49,
    image: 'https://plus.unsplash.com/premium_photo-1668076517573-fa01307d87ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b25pb25zfGVufDB8fDB8fHww',
    category: 'vegetables',
    isOrganic: true,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: false
  },
  {
    _id: '19',
    name: 'Green Chilli',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1524593410820-38510f580a77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JlZW4lMjBjaGlsbGl8ZW58MHx8MHx8fDA%3D',
    category: 'vegetables',
    isOrganic: false,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: true
  },
  {
    _id: '20',
    name: 'Blueberries',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1469547371150-47620ed0c5ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ymx1ZWJlcnJpZXN8ZW58MHx8MHx8fDA%3D',
    category: 'fruits',
    isOrganic: true,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: true
  },
  {
    _id: '21',
    name: 'Cherries',
    price: 5.49,
    image: 'https://media.istockphoto.com/id/1979493600/photo/pile-of-cherry-fruits-in-market.webp?a=1&b=1&s=612x612&w=0&k=20&c=yKwYxFIfIKo7sbbFCc8GzcRD5ZDbEyqsddkGLbns_fY=',
    category: 'fruits',
    isOrganic: false,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: true
  },
  {
    _id: '22',
    name: 'Kiwi',
    price: 3.29,
    image: 'https://media.istockphoto.com/id/1335933002/photo/fresh-kiwi.webp?a=1&b=1&s=612x612&w=0&k=20&c=fBaOmmGNWDuSYg-2ZJgPSJUxLWBR4m_f0S8P4-0unHg=',
    category: 'fruits',
    isOrganic: true,
    isSeasonal: false,
    freshness: 'fresh',
    isNewArrival: false
  },
  {
    _id: '23',
    name: 'Eggplant',
    price: 2.19,
    image: 'https://images.unsplash.com/photo-1683543122945-513029986574?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWdncGxhbnR8ZW58MHx8MHx8fDA%3D',
    category: 'vegetables',
    isOrganic: true,
    isSeasonal: true,
    freshness: 'fresh',
    isNewArrival: true
  }
];

// Sample data for testimonials
const sampleTestimonials = [
  {
    name: 'Emily Johnson',
    title: 'Yoga Instructor',
    quote: 'I love the variety of fresh produce available! It makes healthy eating so much easier and enjoyable.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW58ZW58MHx8MHx8fDA%3D',
    rating: 5
  },
  {
    name: 'Sophia Davis',
    title: 'Food Blogger',
    quote: 'VeggieFresh has the freshest produce I\'ve found online. The convenience is unbeatable, and the quality is consistently high. Highly recommend!',
    image: 'https://plus.unsplash.com/premium_photo-1661501118939-5527207b3f32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMGJsb2dnZXIlMjB3b21lbnxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4
  },
  {
    name: 'Robert Williams',
    title: 'Chef',
    quote: 'The produce from VeggieFresh is always incredibly fresh and high quality. It makes a huge difference in my cooking!',
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D',
    rating: 5
  }
];

export default function Home() {
  const addToCart = useStore((state) => state.addToCart);
  const [filters, setFilters] = useState({
    category: 'all', // 'all', 'fruits', 'vegetables'
    organic: false,
    seasonal: false,
    newArrival: false,
    // priceRange: 'all', // Removed priceRange filter state
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const filteredProducts = sampleProducts.filter((product) => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.organic && !product.isOrganic) return false;
    if (filters.seasonal && !product.isSeasonal) return false;
    if (filters.newArrival && !product.isNewArrival) return false;
    // if (filters.priceRange !== 'all') {
    //   const price = product.price;
    //   if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;
    // }
    return true;
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % sampleTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + sampleTestimonials.length) % sampleTestimonials.length);
  };

  const displayedTestimonial = sampleTestimonials[currentTestimonial];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gray-100 dark:bg-gray-800 flex items-center">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          {/* Left: Text Content */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-green-200 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-green-700 dark:text-green-200 mb-4">
              Fresh & Organic
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              Eat Healthy,
              <br />
              Live <span className="text-green-600">Fresh</span>
              <br />
              <span className="text-yellow-500">Fruits & Veggies</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-md">
              Discover the best selection of farm-fresh fruits and vegetables delivered
              straight to your door. Shop now and taste the difference!
            </p>
            <Link to="/shop" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full transition">
              Shop Now
            </Link>
          </div>
          {/* Right: Image */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://media.istockphoto.com/id/139496979/photo/assortment-of-fruits-and-vegetables-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=11gy8NdvIgwHzvMzymBdc2X2jHOq9e0lrFjfo9KKydY="
              alt="Assortment of fresh fruits and vegetables"
              className="rounded-lg shadow-lg max-w-full h-auto md:max-w-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Shop Section - Combined */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Shop Fresh Produce</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                filters.category === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleFilterChange('category', 'all')}
            >
              All Products
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                filters.category === 'fruits'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleFilterChange('category', 'fruits')}
            >
              Fruits
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                filters.category === 'vegetables'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleFilterChange('category', 'vegetables')}
            >
              Vegetables
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                filters.newArrival
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleFilterChange('newArrival', !filters.newArrival)}
            >
              New Arrival
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                filters.organic
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleFilterChange('organic', !filters.organic)}
            >
              Organic
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                filters.seasonal
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleFilterChange('seasonal', !filters.seasonal)}
            >
              Seasonal
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                  <p className="text-green-600 dark:text-green-400 font-bold mb-2">${product.price.toFixed(2)}</p>
                   <div className="flex flex-wrap gap-2 mb-4">
                    {product.isOrganic && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                        Organic
                      </span>
                    )}
                    {product.isSeasonal && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                        Seasonal
                      </span>
                    )}
                    {product.isNewArrival && (
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                        New Arrival
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Combined */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Our Story Section */}
        <section className="flex flex-col md:flex-row items-center justify-center gap-12">
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
      </div>
      </section>

      {/* Contact Section - Combined */}
      <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-400">Have questions or feedback? We'd love to hear from you!</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Left: Send a Message Form */}
          <div className="md:w-1/2 flex-1">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Send a Message</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-1">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" id="fullName" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-green-500 focus:ring-green-500" placeholder="John Doe" />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-green-500 focus:ring-green-500" placeholder="john@example.com" />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <input type="tel" id="phone" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-green-500 focus:ring-green-500" placeholder="(123) 456-7890" />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                <select id="subject" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-green-500 focus:ring-green-500">
                  <option>Select a subject</option>
                  <option>Order Inquiry</option>
                  <option>Product Question</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea id="message" rows="4" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-green-500 focus:ring-green-500" placeholder="How can we help you?"></textarea>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Right: Contact Information */}
          <div className="md:w-1/2 flex-1 text-gray-700 dark:text-gray-300">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <div className="ml-3">
                  <p className="font-semibold">Address</p>
                  <p>123 Fresh Lane, Produce City</p>
                  <p>Farmville, FL 32801</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a2 2 0 01-2 2H9m11-4v7a2 2 0 01-2 2H10a2 2 0 01-2-2V9a2 2 0 012-2h4l2 2z"></path></svg>
                <div className="ml-3">
                  <p className="font-semibold">Phone</p>
                  <p>(407) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                <div className="ml-3">
                  <p className="font-semibold">Email</p>
                  <p>info@veggiefresh.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="flex-shrink-0 h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <div className="ml-3">
                  <p className="font-semibold">Hours</p>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Testimonials Section - Combined */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">What Our Customers Say</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <img 
                  src={displayedTestimonial.image} 
                  alt={displayedTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{displayedTestimonial.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{displayedTestimonial.title}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">{displayedTestimonial.quote}</p>
              <div className="flex text-yellow-400">
                {[...Array(displayedTestimonial.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white dark:bg-gray-900 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <FaChevronLeft className="text-gray-600 dark:text-gray-400" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white dark:bg-gray-900 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <FaChevronRight className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {sampleTestimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === currentTestimonial ? 'bg-green-600' : 'bg-gray-300'}`}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
        </div>
      </section>
      {/* Add the Footer component here */}
      <Footer />
    </div>
  );
}