"use client";

import { useState, useEffect } from "react";
import RatingStars from "./RatingStars";
import RatingDisplay from "./RatingDisplay";
import RatingBreakdown from "./RatingBreakdown";
import { getCurrentUser } from "@/lib/mockAuth";
import { getUserRating, saveRecipeRating, deleteUserRating } from "@/lib/ratingStorage";

/**
 * Complete rating section for recipe detail pages
 * Includes interactive rating, display, and breakdown
 * 
 * Props:
 * @param {string} recipeId - Unique identifier for the recipe
 * @param {string} recipeTitle - Title of the recipe (for display)
 * @param {boolean} showBreakdown - Whether to show rating breakdown
 * @param {string} className - Additional CSS classes
 */
export default function RecipeRatingSection({
  recipeId,
  recipeTitle = "this recipe",
  showBreakdown = true,
  className = ''
}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    if (user && recipeId) {
      const rating = getUserRating(recipeId, user.id);
      setUserRating(rating || 0);
    }
  }, [recipeId]);

  const handleRatingSubmit = async (rating) => {
    if (!currentUser || !recipeId) return;
    
    setIsSubmitting(true);
    try {
      await saveRecipeRating(recipeId, rating, currentUser.id);
      setUserRating(rating);
      // Don't close the form - keep it open for easy changes
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingDelete = async () => {
    if (!currentUser || !recipeId) return;
    
    setIsSubmitting(true);
    try {
      await deleteUserRating(recipeId, currentUser.id);
      setUserRating(0);
    } catch (error) {
      console.error('Error deleting rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!recipeId) {
    return null;
  }

  return (
    <div className={`bg-base-100 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-base-content">
          Rate {recipeTitle}
        </h3>
        <RatingDisplay
          recipeId={recipeId}
          showCount={true}
          showAverage={true}
          size="md"
          color="warning"
        />
      </div>

      {/* User Rating Section */}
      {currentUser ? (
        <div className="mb-6">
          {/* Always show interactive rating - much smoother UX */}
          <div className="bg-base-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-base-content/80 font-medium">
                {userRating > 0 ? `Your rating: ${userRating} star${userRating !== 1 ? 's' : ''}` : `Rate ${recipeTitle}`}
              </span>
              {userRating > 0 && (
                <button
                  onClick={handleRatingDelete}
                  className="btn btn-ghost btn-sm text-error"
                  disabled={isSubmitting}
                >
                  Remove Rating
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-4 mb-2">
              <RatingStars
                rating={userRating || 0}
                onRatingChange={handleRatingSubmit}
                interactive={true}
                size="lg"
                color="warning"
                showLabel={false}
              />
              {userRating > 0 && (
                <span className="text-lg font-medium text-primary">
                  {userRating.toFixed(1)}
                </span>
              )}
            </div>
            
            {isSubmitting && (
              <div className="text-sm text-base-content/60 mt-2">
                Saving rating...
              </div>
            )}
            
            {userRating > 0 && (
              <div className="text-sm text-base-content/60 mt-2">
                Click on any star to change your rating instantly
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-base-200 rounded-lg text-center">
          <p className="text-base-content/80 mb-2">
            Sign in to rate {recipeTitle}
          </p>
          <button className="btn btn-primary btn-sm">
            Sign In
          </button>
        </div>
      )}

      {/* Rating Breakdown */}
      {showBreakdown && (
        <div>
          <RatingBreakdown
            recipeId={recipeId}
            showChart={true}
            showStats={true}
          />
        </div>
      )}
    </div>
  );
}
