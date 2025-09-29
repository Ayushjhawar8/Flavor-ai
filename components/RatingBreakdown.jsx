"use client";

import { useState, useEffect } from "react";
import { getRecipeRatings } from "@/lib/ratingStorage";

/**
 * Rating breakdown component showing distribution of ratings
 * 
 * Props:
 * @param {string} recipeId - Unique identifier for the recipe
 * @param {boolean} showChart - Whether to show the bar chart
 * @param {boolean} showStats - Whether to show detailed statistics
 * @param {string} className - Additional CSS classes
 */
export default function RatingBreakdown({
  recipeId,
  showChart = true,
  showStats = true,
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
      <div className={`space-y-3 ${className}`}>
        <div className="h-4 w-32 bg-base-300 rounded animate-pulse" />
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2">
              <div className="h-4 w-4 bg-base-300 rounded animate-pulse" />
              <div className="h-4 flex-1 bg-base-300 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (ratingData.count === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-base-content/60">No ratings available</p>
      </div>
    );
  }

  const maxCount = Math.max(...Object.values(ratingData.distribution));

  return (
    <div className={`space-y-4 ${className}`}>
      {showStats && (
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-base-100 rounded-lg p-3">
            <div className="text-2xl font-bold text-primary">
              {ratingData.average.toFixed(1)}
            </div>
            <div className="text-sm text-base-content/60">Average</div>
          </div>
          <div className="bg-base-100 rounded-lg p-3">
            <div className="text-2xl font-bold text-secondary">
              {ratingData.count}
            </div>
            <div className="text-sm text-base-content/60">Total Ratings</div>
          </div>
          <div className="bg-base-100 rounded-lg p-3">
            <div className="text-2xl font-bold text-accent">
              {ratingData.distribution[5]}
            </div>
            <div className="text-sm text-base-content/60">5-Star</div>
          </div>
        </div>
      )}

      {showChart && (
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-base-content">
            Rating Distribution
          </h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingData.distribution[star];
              const percentage = ratingData.count > 0 ? (count / ratingData.count) * 100 : 0;
              const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;

              return (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-medium text-base-content">
                      {star}
                    </span>
                    <span className="text-xs text-base-content/60">
                      ⭐
                    </span>
                  </div>
                  
                  <div className="flex-1 bg-base-200 rounded-full h-2 relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-warning to-primary rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  
                  <div className="text-right w-16">
                    <span className="text-sm text-base-content/80">
                      {count}
                    </span>
                    <span className="text-xs text-base-content/60 ml-1">
                      ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
