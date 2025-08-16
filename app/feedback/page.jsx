"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import RecipeSearchBar from "@/components/RecipeSearchBar";

export default function FeedbackPage() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedbackType: "general",
    message: "",
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Monitor theme changes
  useEffect(() => {
    // Set hydrated to true after component mounts
    setIsHydrated(true);
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
          setCurrentTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // Get initial theme
    const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setCurrentTheme(initialTheme);

    return () => observer.disconnect();
  }, []);

  const handleSearchFocus = () => {
    setShowResults(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const content = document.querySelector(".content");
    if (navbar && content) {
      content.style.marginTop = `${navbar.offsetHeight}px`;
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
             setFormData({
         name: "",
         email: "",
         feedbackType: "general",
         message: "",
         rating: 0
       });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => handleRatingChange(index + 1)}
        className={`text-2xl transition-colors duration-200 ${
          index < rating 
            ? 'text-yellow-400 hover:text-yellow-300' 
            : 'text-gray-300 hover:text-gray-400'
        }`}
      >
        ★
      </button>
    ));
  };

  return (
    <>
      {/* Navbar */}
      <div
        className={`navbar fixed top-0 left-0 right-0 z-50 shadow-lg flex flex-col md:flex-row transition-all duration-300 ${isScrolled ? 'bg-base-200/90' : 'bg-base-100/90'
          }`}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
          <div className="rounded-full text-base-content bg-purple-400">
            <ThemeToggle />
          </div>
          <Link
            href="/"
            id="main"
            className={`btn rounded-full btn-ghost text-2xl font-bold ${isHydrated && currentTheme === 'dark' ? 'text-white' : 'bg-[linear-gradient(to_bottom_right,_#ffc1cc,_#fbc2eb,_#fff)]'
              }`}
          >
            Flavor AI
          </Link>
          <a
            href="https://github.com/Ayushjhawar8/Flavor-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-base-200 hover:bg-base-300 text-base-content px-3 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-300 hover:scale-105 border border-base-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12c0 5.302 3.438 9.8 8.207 11.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416c-.546-1.387-1.333-1.756-1.333-1.756c-1.089-.745.083-.729.083-.729c1.205.084 1.839 1.237 1.839 1.237c1.07 1.834 2.807 1.304 3.492.997c.107-.775.418-1.305.762-1.604c-2.665-.305-5.467-1.334-5.467-5.931c0-1.311.469-2.381 1.236-3.221c-.124-.303-.535-1.524.117-3.176c0 0 1.008-.322 3.301 1.30c.957-.266 1.983-.399 3.003-.404c1.02.005 2.047.138 3.006.404c2.291-1.552 3.297-1.30 3.297-1.30c.653 1.653.242 2.874.118 3.176c.77.84 1.235 1.911 1.235 3.221c0 4.609-2.807 5.624-5.479 5.921c.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.199-6.086 8.199-11.386c0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">Star</span>
            <span className="sm:hidden">Star</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-500 group-hover:text-yellow-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </a>
        </div>
        <div className="ml-auto">
          <RecipeSearchBar
            isScrolled={isScrolled}
            handleBlur={handleBlur}
            handleSearchFocus={handleSearchFocus}
            showResults={showResults}
            setShowResults={setShowResults}
            className="bg-purple-900/30 placeholder-gray-200 text-white border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Content */}
      <div
        className={`content flex flex-col items-center justify-center p-5 md:p-1 w-full bg-base-100 ${!showResults ? "opacity-100" : "opacity-80 blur-sm"
          }`}
      >
                 <div className="container mx-auto px-4 py-8">
           {/* Main Content */}
          <div className="max-w-4xl mx-auto">
                         {/* Header Section */}
             <div className="text-center mb-12">
               <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isHydrated && currentTheme === 'dark' ? 'text-white' : 'text-amber-800'}`}>
                 Share Your Feedback
               </h1>
               <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${isHydrated && currentTheme === 'dark' ? 'text-gray-300' : 'text-amber-700'}`}>
                 Help us improve Flavor AI! Your feedback is invaluable in making our culinary companion even better.
               </p>
             </div>

            {/* Feedback Form */}
            <div className="bg-base-200 rounded-2xl shadow-xl p-8 md:p-12">
              {submitStatus === 'success' ? (
                                 <div className="text-center py-12">
                   <div className="text-6xl mb-4">🎉</div>
                   <h2 className={`text-3xl font-bold mb-4 ${isHydrated && currentTheme === 'dark' ? 'text-white' : 'text-amber-800'}`}>
                     Thank You!
                   </h2>
                   <p className={`text-xl mb-8 ${isHydrated && currentTheme === 'dark' ? 'text-gray-300' : 'text-amber-700'}`}>
                     Your feedback has been submitted successfully. We appreciate your input!
                   </p>
                  <button
                    onClick={() => setSubmitStatus(null)}
                    className="btn btn-primary text-white"
                  >
                    Submit Another Feedback
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                         <div>
                       <label className={`block text-sm font-medium mb-2 ${isHydrated && currentTheme === 'dark' ? 'text-white' : 'text-amber-800'}`}>
                         Name (Optional)
                       </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input input-bordered w-full bg-base-100 border-2 focus:border-primary"
                        placeholder="Your name"
                      />
                    </div>
                                         <div>
                       <label className={`block text-sm font-medium mb-2 ${isHydrated && currentTheme === 'dark' ? 'text-white' : 'text-amber-800'}`}>
                         Email (Optional)
                       </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input input-bordered w-full bg-base-100 border-2 focus:border-primary"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Feedback Type */}
                                     <div>
                     <label className={`block text-sm font-medium mb-2 ${isHydrated && currentTheme === 'dark' ? 'text-white' : 'text-amber-800'}`}>
                       Feedback Type
                     </label>
                    <select
                      name="feedbackType"
                      value={formData.feedbackType}
                      onChange={handleInputChange}
                      className="select select-bordered w-full bg-base-100 border-2 focus:border-primary"
                    >
                      <option value="general">General Feedback</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="recipe">Recipe Related</option>
                      <option value="ui">User Interface</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Rating */}
                                     <div>
                     <label className={`block text-sm font-medium mb-2 ${isHydrated && currentTheme === 'dark' ? 'text-white' : 'text-amber-800'}`}>
                       How would you rate your experience?
                     </label>
                     <div className="flex items-center gap-2">
                       {renderStars(formData.rating)}
                       <span className={`ml-4 text-lg font-medium ${isHydrated && currentTheme === 'dark' ? 'text-white' : 'text-amber-800'}`}>
                         {formData.rating === 0 ? 'Not rated' : `${formData.rating}/5`}
                       </span>
                     </div>
                   </div>

                  {/* Message */}
                                     <div>
                     <label className={`block text-sm font-medium mb-2 ${isHydrated && currentTheme === 'dark' ? 'text-white' : 'text-amber-800'}`}>
                       Your Feedback *
                     </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      className="textarea textarea-bordered w-full bg-base-100 border-2 focus:border-primary resize-none"
                      placeholder="Tell us what you think about Flavor AI, what you'd like to see improved, or any issues you've encountered..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.message.trim()}
                      className="btn btn-primary text-white text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="loading loading-spinner loading-sm"></div>
                          Submitting...
                        </div>
                      ) : (
                        'Submit Feedback'
                      )}
                    </button>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="alert alert-error">
                      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                 <div className="card bg-base-200 p-6">
                   <div className="text-4xl mb-4">💡</div>
                   <h3 className={`text-xl font-semibold mb-2 ${isHydrated && currentTheme === 'dark' ? 'text-white' : 'text-amber-800'}`}>
                     Feature Requests
                   </h3>
                   <p className={`${isHydrated && currentTheme === 'dark' ? 'text-gray-300' : 'text-amber-700'}`}>
                     Have an idea for a new feature? We&apos;d love to hear it!
                   </p>
                 </div>
                 <div className="card bg-base-200 p-6">
                   <div className="text-4xl mb-4">🐛</div>
                   <h3 className={`text-xl font-semibold mb-2 ${isHydrated && currentTheme === 'dark' ? 'text-white' : 'text-amber-800'}`}>
                     Bug Reports
                   </h3>
                   <p className={`${isHydrated && currentTheme === 'dark' ? 'text-gray-300' : 'text-amber-700'}`}>
                     Found an issue? Help us fix it by reporting it here.
                   </p>
                 </div>
                 <div className="card bg-base-200 p-6">
                   <div className="text-4xl mb-4">🌟</div>
                   <h3 className={`text-xl font-semibold mb-2 ${isHydrated && currentTheme === 'dark' ? 'text-white' : 'text-amber-800'}`}>
                     General Feedback
                   </h3>
                   <p className={`${isHydrated && currentTheme === 'dark' ? 'text-gray-300' : 'text-amber-700'}`}>
                     Share your thoughts on how we can improve your experience.
                   </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
} 