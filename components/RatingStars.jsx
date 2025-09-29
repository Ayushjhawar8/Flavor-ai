"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

/**
 * Interactive star rating component
 * Supports both display-only and interactive modes
 * 
 * Props:
 * @param {number} rating - Current rating (0-5)
 * @param {function} onRatingChange - Callback when rating changes (for interactive mode)
 * @param {boolean} interactive - Whether the component is interactive
 * @param {string} size - Size of stars: 'sm', 'md', 'lg'
 * @param {string} color - Color theme: 'primary', 'secondary', 'accent', 'warning'
 * @param {boolean} showLabel - Whether to show rating number
 * @param {string} className - Additional CSS classes
 */
export default function RatingStars({
  rating = 0,
  onRatingChange = null,
  interactive = false,
  size = 'md',
  color = 'warning',
  showLabel = false,
  className = ''
}) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  // Update internal state when prop changes
  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    warning: 'text-warning'
  };

  const handleMouseEnter = (starRating) => {
    if (interactive) {
      setHoveredRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoveredRating(0);
    }
  };

  const handleClick = (starRating) => {
    if (interactive && onRatingChange) {
      setCurrentRating(starRating);
      // Immediate visual feedback
      onRatingChange(starRating);
    }
  };

  const handleKeyDown = (event, starRating) => {
    if (interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      handleClick(starRating);
    }
  };

  const displayRating = interactive ? (hoveredRating || currentRating) : currentRating;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div 
        className="flex items-center gap-1"
        role={interactive ? "radiogroup" : "img"}
        aria-label={interactive ? "Rate this recipe" : `Rating: ${currentRating} out of 5 stars`}
        aria-valuenow={currentRating}
        aria-valuemin="0"
        aria-valuemax="5"
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= displayRating;
          const isInteractive = interactive;
          
          return (
            <button
              key={star}
              type={isInteractive ? "button" : undefined}
              className={`${sizes[size]} transition-all duration-200 ${
                isInteractive 
                  ? 'cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm active:scale-95' 
                  : 'cursor-default'
              }`}
              onClick={() => handleClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              onKeyDown={(e) => handleKeyDown(e, star)}
              tabIndex={isInteractive ? 0 : -1}
              aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
              aria-pressed={isInteractive ? star === currentRating : undefined}
              disabled={!isInteractive}
            >
              <Star
                className={`${sizes[size]} transition-all duration-200 ${
                  isFilled ? colors[color] : 'text-base-300'
                } ${isFilled ? 'fill-current' : 'fill-none'} ${
                  isInteractive && isFilled ? 'animate-pulse' : ''
                }`}
              />
            </button>
          );
        })}
      </div>
      
      {showLabel && (
        <span className="text-sm text-base-content/80 ml-1">
          {currentRating > 0 ? currentRating.toFixed(1) : 'No rating'}
        </span>
      )}
    </div>
  );
}
