// app/contact/page.jsx
import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4 text-center max-w-xl">
        Have a question or feedback? Reach out to us via email at{' '}
        <a href="mailto:support@flavourai.com" className="text-purple-600 hover:underline">
          support@flavourai.com
        </a>
        , or follow us on our social media channels:
      </p>

      <div className="flex justify-center gap-6 mb-6">
        <a
          href="https://twitter.com/itsAyushJ"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 font-semibold"
        >
          Twitter
        </a>
        <a
          href="https://instagram.com/circuitbreakerss"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-600 font-semibold"
        >
          Instagram
        </a>
      </div>

      <form className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        ></textarea>
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;