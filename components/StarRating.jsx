"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

/**
 * StarRating Component
 * 
 * A reusable star rating component that allows users to rate recipes
 * Features:
 * - Interactive star selection
 * - Half-star support
 * - Read-only mode
 * - Customizable size and color
 * - Accessibility support
 */
export default function StarRating({ 
  rating = 0, 
  onRatingChange, 
  maxRating = 5, 
  size = "md", 
  readOnly = false,
  showValue = false,
  className = ""
}) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };

  const handleStarClick = (starRating) => {
    if (readOnly) return;
    
    setCurrentRating(starRating);
    if (onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleStarHover = (starRating) => {
    if (readOnly) return;
    setHoveredRating(starRating);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoveredRating(0);
  };

  const getStarColor = (starIndex) => {
    const displayRating = hoveredRating || currentRating;
    const isFilled = starIndex <= displayRating;
    const isHalfFilled = starIndex === Math.ceil(displayRating) && displayRating % 1 !== 0;
    
    if (isFilled) return "text-yellow-400";
    if (isHalfFilled) return "text-yellow-200";
    return "text-gray-300";
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div 
        className="flex items-center"
        onMouseLeave={handleMouseLeave}
        role={readOnly ? "img" : "radiogroup"}
        aria-label={readOnly ? `Rating: ${currentRating} out of ${maxRating} stars` : "Rate this recipe"}
      >
        {Array.from({ length: maxRating }, (_, index) => {
          const starRating = index + 1;
          return (
            <button
              key={index}
              type="button"
              className={`${sizeClasses[size]} transition-colors duration-150 ${
                readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
              }`}
              onClick={() => handleStarClick(starRating)}
              onMouseEnter={() => handleStarHover(starRating)}
              disabled={readOnly}
              aria-label={`Rate ${starRating} out of ${maxRating} stars`}
            >
              <Star 
                className={`${getStarColor(starRating)} ${
                  readOnly ? "" : "hover:text-yellow-400"
                } transition-colors duration-150`}
                fill="currentColor"
              />
            </button>
          );
        })}
      </div>
      
      {showValue && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {currentRating.toFixed(1)}/{maxRating}
        </span>
      )}
    </div>
  );
}
