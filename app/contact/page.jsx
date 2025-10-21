'use client';

import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import BackButton from '../../components/BackButton';
import { FiInstagram, FiMail, FiGithub } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6'; // ✅ Updated import for new "X" logo

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // dynamic tab title
        
  useEffect(()=>{
    document.title='Flavor AI-Contact Us'
  },[])
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('All fields are required!');
      return;
    }


    setStatus('Sending...');

    try {
      console.log('Form submitted:', formData);

      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-300">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="relative mt-10">
        <BackButton />
      </div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4  mt-6 sm:p-6 lg:p-8 pt-32">
        <div className="w-full max-w-3xl bg-base-100 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 transition-all duration-300 ease-in-out">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">Contact Us</h1>
            <p className="text-base-content/70 mt-2 text-sm sm:text-base">
              Have any questions or feedback? Reach out to us via email, or follow us on our social media channels.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-8 mb-8 flex-wrap">
            {/* Email */}
            <a
              href="mailto:ayushjhawar499@gmail.com"
              className="text-purple-600 hover:text-purple-700 font-semibold text-lg flex items-center gap-2"
            >
              <FiMail size={30} className="text-purple-600" />
              <span>Email Us</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Ayushjhawar8/Flavor-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 font-bold text-lg flex items-center gap-2"
            >
              <FiGithub size={30} className="text-red-600 dark:text-red-400" />
              <span>GitHub</span>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/itsAyushJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 flex items-center gap-2"
            >
              <FaXTwitter size={30} className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300" />
              <span>Twitter</span>
            </a>
          </div>

          {/* Status Message */}
          {status && (
            <div className="text-center text-sm mt-4 text-red-500">
              {status}
            </div>
          )}

          {/* Form Section */}
          <form className="w-full max-w-md mx-auto space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 transition-all duration-300"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 transition-all duration-300"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 transition-all duration-300"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors duration-300"
            >
              {status === 'Sending...' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
