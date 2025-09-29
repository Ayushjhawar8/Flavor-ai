// Optional sample rating data for demo purposes only
import { saveRecipeRating } from "./ratingStorage";

/**
 * Seed sample ratings ONLY for demo/testing purposes
 * This function adds minimal sample data for demonstration
 * Set ENABLE_DEMO_DATA to true in localStorage to enable
 */
export const seedSampleRatings = () => {
  // Only seed if explicitly enabled for demo purposes
  if (typeof window === 'undefined') return;
  
  const enableDemoData = localStorage.getItem('ENABLE_DEMO_DATA') === 'true';
  if (!enableDemoData) return;
  
  const existingRatings = localStorage.getItem('recipe_ratings');
  if (existingRatings && Object.keys(JSON.parse(existingRatings)).length > 0) {
    return; // Already seeded
  }

  // Minimal sample data for demonstration only
  const sampleRatings = [
    { recipeId: 'demo_recipe', ratings: [5, 4, 3] }, // Only for demo page
  ];

  // Add minimal ratings
  sampleRatings.forEach((recipeData) => {
    recipeData.ratings.forEach((rating, ratingIndex) => {
      setTimeout(() => {
        try {
          saveRecipeRating(recipeData.recipeId, rating);
        } catch (error) {
          console.error(`Error seeding rating for ${recipeData.recipeId}:`, error);
        }
      }, ratingIndex * 100);
    });
  });
};

/**
 * Initialize rating data when the app starts
 * Only initializes storage, no dummy data unless explicitly enabled
 */
export const initializeRatingData = () => {
  if (typeof window === 'undefined') return;
  
  // Only seed demo data if explicitly enabled
  seedSampleRatings();
};
