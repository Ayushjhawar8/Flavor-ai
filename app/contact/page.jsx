// app/contact/page.jsx
'use client';
import { useState } from 'react';
import React from 'react';
import Footer from '../../components/Footer';
import { toast } from 'sonner';

const ContactPage = () => {

  const [form,setForm]=useState({
    name:'',
    email:'',
    message:''
  });
  const [errors,setErrors]=useState({
    name:'',
    email:'',
    message:''
  })

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        break;

      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;

      case "message":
        if (!value.trim()) error = "Message is required";
        else if (value.length < 10)
          error = "Message must be at least 10 characters long";
        break;

      default:
        break;
    }

    return error;
  };

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // validate instantly
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // Validate all fields before submission
  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      return; // Stop if validation failed
    }

    toast.message("  Message has been  sent successfully!");
    //  Send the form data to backend or email API
    setForm({ name: "", email: "", message: "" });
    setErrors({ name: "", email: "", message: "" });
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4 text-center max-w-xl">
        Have a question or feedback? Reach out to us via email at{" "}
        <a
          href="mailto:support@flavourai.com"
          className="text-purple-600 hover:underline"
        >
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

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-4"
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className={`p-3 border rounded-md w-full focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-purple-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className={`p-3 border rounded-md w-full focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-purple-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            className={`p-3 border rounded-md w-full focus:outline-none focus:ring-2 ${
              errors.message
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-purple-500"
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
        >
          Send Message
        </button>
      </form>

      <div className='mt-8'><Footer /></div>
    </div>
    
  );
};

export default ContactPage;