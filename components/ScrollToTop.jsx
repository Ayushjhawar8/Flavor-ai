"use client";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <div
          className="fixed bottom-6 right-6 z-50 cursor-pointer"
          onClick={handleBackToTop}
        >
          <div className="btn btn-primary btn-circle shadow-lg hover:scale-110 transition-transform duration-300">
            <ArrowUpIcon className="w-5 h-5 text-primary-content" />
          </div>
        </div>
      )}
    </>
  );
};

export default BackToTop;
