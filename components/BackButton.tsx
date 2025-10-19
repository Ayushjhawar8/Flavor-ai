"use client";

import { useRouter } from "next/navigation";
import { BackIcon } from "@/components/Icons";
import { useState, useEffect } from "react";
import React from "react";

function BackButton({ fallbackUrl = "/" }) {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  // Handles back navigation
  const handleBack = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPressed(true);

    try {
      if (canGoBack && window.history.length > 1) {
        window.history.back();
      } else {
        await router.push(fallbackUrl);
      }
    } catch (error) {
      console.error("Back navigation failed:", error);
      window.location.href = fallbackUrl;
    }

    setTimeout(() => setIsPressed(false), 200);
  };

  // Mouse / touch press feedback
  const handleMouseDown = (e) => {
    e.stopPropagation();
    setIsPressed(true);
  };

  const handleMouseUp = (e) => {
    e.stopPropagation();
    setTimeout(() => setIsPressed(false), 100);
  };

  const handleTouchStart = (e) => {
    e.stopPropagation();
    setIsPressed(true);
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    setTimeout(() => setIsPressed(false), 100);
  };

  return (
    <button
      className={`
        btn btn-circle 
        bg-base-200 hover:bg-base-300 
        active:bg-base-300
        transition-all duration-150 ease-in-out
        select-none cursor-pointer
        ${isPressed ? "scale-90 bg-base-300 shadow-inner" : "scale-100 shadow-lg"}
        text-base-content
        mt-10 ml-3 md:ml-10
      `}
      onClick={handleBack}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        minWidth: "48px",
        minHeight: "48px",
        WebkitTapHighlightColor: "transparent",
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        touchAction: "manipulation",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
      aria-label="Go back to previous page"
      type="button"
    >
      <BackIcon />
    </button>
  );
}

export default BackButton;
