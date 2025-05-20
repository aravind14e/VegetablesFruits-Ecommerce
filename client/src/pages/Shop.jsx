import React, { useState } from 'react';
// import { useDispatch } from 'react-redux'; // Remove unused import
import { useStore } from '../store/useStore';

// Sample data for testing
const sampleProducts = [
  // Fruits
  {
    _id: '60d0fe4f5e5a0e0015a4c2b1',
    name: 'Fresh Apples',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGVzfGVufDB8fDB8fHww',
    category: 'fruits',
    isOrganic: false,
    isSeasonal: true,
    isNewArrival: true
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2b2',
    name: 'Bananas',
    price: 1.49,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'fruits',
    isOrganic: true,
    isSeasonal: false,
    isNewArrival: false
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2b3',
    name: 'Fresh Strawberries',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'fruits',
    isOrganic: false,
    isSeasonal: true,
    isNewArrival: true
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2b4',
    name: 'Oranges',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'fruits',
    isOrganic: true,
    isSeasonal: true,
    isNewArrival: false
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2b5',
    name: 'Fresh Mangoes',
    price: 2.99,
    image: 'https://media.istockphoto.com/id/177352149/photo/close-up-of-mangoes-arranged-inorder-to-sell.webp?a=1&b=1&s=612x612&w=0&k=20&c=zc6uo-ijbwU-nMgCFFJnS3O7OEllWSj2Uxqd__SGrzQ=',
    category: 'fruits',
    isOrganic: false,
    isSeasonal: true,
    isNewArrival: true
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2b6',
    name: 'Grapes',
    price: 4.99,
    image: 'https://media.istockphoto.com/id/1200996361/photo/bunch-of-organic-grapes.webp?a=1&b=1&s=612x612&w=0&k=20&c=50PVoDEK4ZMPmtbT-BJzLF4xsANmyzfW9WEd1e_lw1U=',
    category: 'fruits',
    isOrganic: true,
    isSeasonal: true,
    isNewArrival: false
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2b7',
    name: 'Fresh Pineapple',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'fruits',
    isOrganic: false,
    isSeasonal: false,
    isNewArrival: true
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2b8',
    name: 'Pears',
    price: 2.79,
    image: 'https://media.istockphoto.com/id/172318236/photo/pears.webp?a=1&b=1&s=612x612&w=0&k=20&c=Q2c_Ach50KekiKYAuivYHnPApRqRpBnpMiJS2n9PqMA=',
    category: 'fruits',
    isOrganic: true,
    isSeasonal: true,
    isNewArrival: false
  },

  // Vegetables
  {
    _id: '60d0fe4f5e5a0e0015a4c2b9',
    name: 'Fresh Spinach',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'vegetables',
    isOrganic: false,
    isSeasonal: false,
    isNewArrival: true
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2c0',
    name: 'Organic Carrots',
    price: 1.79,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'vegetables',
    isOrganic: true,
    isSeasonal: false,
    isNewArrival: false
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2c1',
    name: 'Fresh Tomatoes',
    price: 2.29,
    image: 'https://media.istockphoto.com/id/171589415/photo/tomatoes.webp?a=1&b=1&s=612x612&w=0&k=20&c=FE_rhhiVvcyZkHGu9MkGi01NtB3gWk3iK5zOEdyFRkg=',
    category: 'vegetables',
    isOrganic: false,
    isSeasonal: true,
    isNewArrival: true
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2c2',
    name: 'Organic Broccoli',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'vegetables',
    isOrganic: true,
    isSeasonal: true,
    isNewArrival: false
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2c3',
    name: 'Fresh Bell Peppers',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'vegetables',
    isOrganic: false,
    isSeasonal: true,
    isNewArrival: true
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2c4',
    name: 'Organic Cucumber',
    price: 1.49,
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'vegetables',
    isOrganic: true,
    isSeasonal: true,
    isNewArrival: false
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2c5',
    name: 'Fresh Potatoes',
    price: 1.29,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'vegetables',
    isOrganic: false,
    isSeasonal: false,
    isNewArrival: true
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2c6',
    name: 'Organic Sweet Corn',
    price: 2.49,
    image: 'https://plus.unsplash.com/premium_photo-1667047165840-803e47970128?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3dlZXQlMjBjb3JufGVufDB8fDB8fHww',
    category: 'vegetables',
    isOrganic: true,
    isSeasonal: true,
    isNewArrival: false
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2c7',
    name: 'Blueberries',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1469547371150-47620ed0c5ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ymx1ZWJlcnJpZXN8ZW58MHx8MHx8fDA%3D',
    category: 'fruits',
    isOrganic: true,
    isSeasonal: true,
    isNewArrival: true
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2c8',
    name: 'Cherries',
    price: 5.49,
    image: 'https://media.istockphoto.com/id/1979493600/photo/pile-of-cherry-fruits-in-market.webp?a=1&b=1&s=612x612&w=0&k=20&c=yKwYxFIfIKo7sbbFCc8GzcRD5ZDbEyqsddkGLbns_fY=',
    category: 'fruits',
    isOrganic: false,
    isSeasonal: true,
    isNewArrival: true
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2c9',
    name: 'Kiwi',
    price: 3.29,
    image: 'https://media.istockphoto.com/id/1335933002/photo/fresh-kiwi.webp?a=1&b=1&s=612x612&w=0&k=20&c=fBaOmmGNWDuSYg-2ZJgPSJUxLWBR4m_f0S8P4-0unHg=',
    category: 'fruits',
    isOrganic: true,
    isSeasonal: false,
    isNewArrival: false
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2d1',
    name: 'Eggplant',
    price: 2.19,
    image: 'https://images.unsplash.com/photo-1683543122945-513029986574?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWdncGxhbnR8ZW58MHx8MHx8fDA%3D',
    category: 'vegetables',
    isOrganic: true,
    isSeasonal: true,
    isNewArrival: true
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2d2',
    name: 'Cauliflower',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1692956706779-576c151ec712?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F1bGlmbG93ZXJ8ZW58MHx8MHx8fDA%3D',
    category: 'vegetables',
    isOrganic: false,
    isSeasonal: true,
    isNewArrival: true
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2d3',
    name: 'Onions',
    price: 1.49,
    image: 'https://plus.unsplash.com/premium_photo-1668076517573-fa01307d87ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b25pb25zfGVufDB8fDB8fHww',
    category: 'vegetables',
    isOrganic: true,
    isSeasonal: true,
    isNewArrival: false
  },
  {
    _id: '60d0fe4f5e5a0e0015a4c2d4',
    name: 'Green Chilli',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1524593410820-38510f580a77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JlZW4lMjBjaGlsbGl8ZW58MHx8MHx8fDA%3D',
    category: 'vegetables',
    isOrganic: false,
    isSeasonal: true,
    isNewArrival: true
  }
];

export default function Shop() {
  // Get addToCart action from the store
  const addToCart = useStore((state) => state.addToCart);

  // Filter states
  const [filters, setFilters] = useState({
    category: 'all', // 'all', 'fruits', 'vegetables'
    organic: false,
    seasonal: false,
    newArrival: false,
    // priceRange: 'all', // Removed priceRange filter state
  });

  // Testimonial carousel state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Filter products based on selected filters
  const filteredProducts = sampleProducts.filter((product) => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.organic && !product.isOrganic) return false;
    if (filters.seasonal && !product.isSeasonal) return false;
    if (filters.newArrival && !product.isNewArrival) return false;
    // Removed price range filtering logic
    // if (filters.priceRange !== 'all') {
    //   const price = product.price;
    //   if (filters.priceRange === 'low' && price > 2) return false;
    //   if (filters.priceRange === 'medium' && (price <= 2 || price > 4)) return false;
    //   if (filters.priceRange === 'high' && price <= 4) return false;
    // }
    return true;
  });

  // Carousel navigation functions
  const goToPreviousTestimonial = () => {
    setActiveTestimonial((prevIndex) =>
      prevIndex === 0 ? sampleTestimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNextTestimonial = () => {
    setActiveTestimonial((prevIndex) =>
      prevIndex === sampleTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">Shop Fresh Produce</h1>
        
        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleFilterChange('category', 'all')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                filters.category === 'all' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => handleFilterChange('category', 'fruits')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                filters.category === 'fruits' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Fruits
            </button>
            <button
              onClick={() => handleFilterChange('category', 'vegetables')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                filters.category === 'vegetables' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Vegetables
            </button>
            <button
              onClick={() => handleFilterChange('newArrival', !filters.newArrival)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                filters.newArrival 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              New Arrival
            </button>
            <button
              onClick={() => handleFilterChange('organic', !filters.organic)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                filters.organic 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Organic
            </button>
            <button
              onClick={() => handleFilterChange('seasonal', !filters.seasonal)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                filters.seasonal 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Seasonal
            </button>
          </div>
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

        {/* Testimonials Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 relative">
            <h2 className="text-3xl font-bold mb-4 text-center text-green-700 dark:text-green-300">What Our Customers Say</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">Don't just take our word for it - hear from satisfied customers</p>

            {/* Testimonial Carousel */}
            <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {sampleTestimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md flex flex-col items-center"
                  >
                    <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto" />
                    <div className="flex flex-col items-center mt-4">
                      <p className="text-gray-700 dark:text-gray-300 italic mb-4 text-center">"{testimonial.quote}"</p>
                      <p className="text-gray-900 dark:text-white font-semibold text-center">{testimonial.name}</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm text-center">{testimonial.title}</p>
                    </div>
                     <div className="flex justify-center mt-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.691h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.785.565-1.83-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.691l1.07-3.292z" />
                        </svg>
                      ))}
                     </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md focus:outline-none z-10"
                onClick={goToPreviousTestimonial}
                aria-label="Previous Testimonial"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md focus:outline-none z-10"
                onClick={goToNextTestimonial}
                aria-label="Next Testimonial"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {sampleTestimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === activeTestimonial ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}

// Add sample testimonial data (replace with real data later)
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