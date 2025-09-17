"use client";
import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check if we're in the browser
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }
  }, []);

  const handleBackToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Debug: Always show button for testing */}
      <div
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
        onClick={handleBackToTop}
      >
        <div className="btn btn-primary btn-circle shadow-lg hover:scale-110 transition-transform duration-300">
          <svg 
            className="w-5 h-5 text-primary-content" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </div>
      </div>
      
      {/* Original conditional rendering */}
      {isVisible && (
        <div
          className="fixed bottom-6 right-6 z-50 cursor-pointer"
          onClick={handleBackToTop}
        >
          <div className="btn btn-primary btn-circle shadow-lg hover:scale-110 transition-transform duration-300">
            <svg 
              className="w-5 h-5 text-primary-content" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
