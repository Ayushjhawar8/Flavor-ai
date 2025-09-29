"use client";

import { useState, useEffect } from "react";
import RatingStars from "./RatingStars";
import { getRecipeRatings, saveRecipeRating } from "@/lib/ratingStorage";

/**
 * Rating display component for showing average ratings and rating counts
 * 
 * Props:
 * @param {string} recipeId - Unique identifier for the recipe
 * @param {boolean} showCount - Whether to show the number of ratings
 * @param {boolean} showAverage - Whether to show the average rating number
 * @param {string} size - Size of stars: 'sm', 'md', 'lg'
 * @param {string} color - Color theme: 'primary', 'secondary', 'accent', 'warning'
 * @param {string} className - Additional CSS classes
 */
export default function RatingDisplay({
  recipeId,
  showCount = true,
  showAverage = false,
  size = 'md',
  color = 'warning',
  className = ''
}) {
  const [ratingData, setRatingData] = useState({
    average: 0,
    count: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recipeId) {
      setLoading(false);
      return;
    }

    try {
      const ratings = getRecipeRatings(recipeId);
      setRatingData(ratings);
    } catch (error) {
      console.error('Error loading ratings:', error);
    } finally {
      setLoading(false);
    }
  }, [recipeId]);

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className="w-5 h-5 bg-base-300 rounded animate-pulse"
            />
          ))}
        </div>
        <div className="h-4 w-12 bg-base-300 rounded animate-pulse" />
      </div>
    );
  }

  if (ratingData.count === 0) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <RatingStars
          rating={0}
          interactive={false}
          size={size}
          color={color}
        />
        <span className="text-sm text-base-content/60">No ratings yet</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <RatingStars
        rating={ratingData.average}
        interactive={false}
        size={size}
        color={color}
      />
      
      <div className="flex items-center gap-1 text-sm text-base-content/80">
        {showAverage && (
          <span className="font-medium">
            {ratingData.average.toFixed(1)}
          </span>
        )}
        
        {showCount && (
          <span className="text-base-content/60">
            ({ratingData.count} rating{ratingData.count !== 1 ? 's' : ''})
          </span>
        )}
      </div>
    </div>
  );
}
