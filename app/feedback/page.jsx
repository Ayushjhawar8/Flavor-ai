'use client'; // This directive is necessary for using hooks like useState

import React, { useState } from 'react';
import Navbar from '@/components/Navbar'; // Correct import based on your path
import Footer from '@/components/Footer'; // Correct import based on your path
import BackButton from '@/components/BackButton';

const FeedbackPage = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: 'General Feedback',
    message: '',
  });

  // State to manage submission status and messages
  const [status, setStatus] = useState('');

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form refresh

    // Basic client-side validation
    if (!formData.message.trim()) {
      setStatus('Error: The message field cannot be empty.');
      return;
    }

    setStatus('Submitting...');

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', { // <-- IMPORTANT: PASTE YOUR FORMSPREE URL HERE
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Thank you for your feedback! We appreciate you helping us improve.');
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          feedbackType: 'General Feedback',
          message: '',
        });
      } else {
        throw new Error('Form submission failed.');
      }
    } catch (error) {
      setStatus('Oops! There was a problem submitting your form. Please try again later.');
      console.error('Submission Error:', error);
    }
  };

  return (
    // This parent div wraps the entire page, including layout components.
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className='relative mt-10'>
        <BackButton/>
      </div>
      {/* The main content area grows to fill available space. Increased padding-top to give more space below Navbar. */}
      <main className="flex-grow bg-base-300 flex items-center justify-center p-4 sm:p-6 lg:p-8 pt-32">

        <div className="w-full max-w-2xl bg-base-100 rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300 ease-in-out">
      
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary">Share Your Thoughts</h1>
            <p className="text-base-content/70 mt-2">
              We'd love to hear from you! Your feedback helps us improve Flavor-AI.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Optional) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name (Optional)</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full focus:input-primary transition-all"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email Field (Optional) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email (Optional)</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                className="input input-bordered w-full focus:input-primary transition-all"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Feedback Type Dropdown */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Feedback Type</span>
              </label>
              <select
                name="feedbackType"
                className="select select-bordered w-full focus:select-primary transition-all"
                value={formData.feedbackType}
                onChange={handleChange}
              >
                <option>General Feedback</option>
                <option>Bug Report</option>
                <option>Feature Suggestion</option>
              </select>
            </div>

            {/* Message Textarea (Required) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Message</span>
                <span className="label-text-alt text-error font-semibold">* Required</span>
              </label>
              <textarea
                name="message"
                className="textarea textarea-bordered h-32 w-full focus:textarea-primary transition-all"
                placeholder="Tell us what's on your mind..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary w-full text-base" 
              disabled={status === 'Submitting...'}
            >
              {status === 'Submitting...' ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Sending...
                </>
              ) : (
                'Submit Feedback'
              )}
            </button>
          </form>

          {/* Status Message */}
          {status && (
            <div className="text-center pt-4">
              <p className={`font-semibold ${status.includes('Error') || status.includes('Oops') ? 'text-error' : 'text-success'}`}>
                {status}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeedbackPage;

