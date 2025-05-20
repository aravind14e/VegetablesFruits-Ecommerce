import React from 'react';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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
      <Footer />
    </div>
  );
} 