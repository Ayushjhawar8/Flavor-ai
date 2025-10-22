"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "General Feedback",
    message: "",
  });

  const [status, setStatus] = useState("");

  // dynamic tab title

  useEffect(() => {
    document.title = "Flavor AI-Feedback";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      setStatus("Error: The message field cannot be empty.");
      return;
    }

    setStatus("Submitting...");

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus(
          "Thank you for your feedback! We appreciate you helping us improve.",
        );
        setFormData({
          name: "",
          email: "",
          feedbackType: "General Feedback",
          message: "",
        });
      } else {
        throw new Error("Form submission failed.");
      }
    } catch (error) {
      setStatus(
        "Oops! There was a problem submitting your form. Please try again later.",
      );
      console.error("Submission Error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-300 transition-colors duration-300">
      {/* Navbar */}
      <header className="bg-base-300 z-50">
        <Navbar />
      </header>

      {/* Main Content Wrapper with equal top and bottom spacing */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 mt-24 mb-24 bg-base-300 transition-colors duration-300">
        {/* Back Button */}
        <div className="self-start mb-6">
          <BackButton />
        </div>

        {/* Feedback Form Container */}
        <div className="w-full max-w-2xl bg-base-100 rounded-2xl shadow-xl p-8 space-y-6 border border-base-300 transition-all duration-300 ease-in-out">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary">
              Share Your Thoughts
            </h1>
            <p className="text-base-content/70 mt-2">
              We'd love to hear from you! Your feedback helps us improve Flavor
              AI.
            </p>
          </div>

          {/* Feedback Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Message</span>
                <span className="label-text-alt text-error font-semibold">
                  * Required
                </span>
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

            <button
              type="submit"
              className="btn btn-primary w-full text-base"
              disabled={status === "Submitting..."}
            >
              {status === "Submitting..." ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Sending...
                </>
              ) : (
                "Submit Feedback"
              )}
            </button>
          </form>

          {status && (
            <div className="text-center pt-4">
              <p
                className={`font-semibold ${
                  status.includes("Error") || status.includes("Oops")
                    ? "text-error"
                    : "text-success"
                }`}
              >
                {status}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FeedbackPage;
