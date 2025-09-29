// Rating storage system for recipes
// Stores ratings in localStorage with fallback to in-memory storage

const RATINGS_STORAGE_KEY = 'recipe_ratings';
const USER_RATINGS_STORAGE_KEY = 'user_ratings';

// In-memory fallback for server-side rendering
let inMemoryRatings = {};
let inMemoryUserRatings = {};

/**
 * Get all ratings for a specific recipe
 * @param {string} recipeId - Unique identifier for the recipe
 * @returns {Object} Rating data with average, count, and distribution
 */
export function getRecipeRatings(recipeId) {
  if (!recipeId) {
    return { average: 0, count: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
  }

  try {
    // Try localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(RATINGS_STORAGE_KEY);
      const ratings = stored ? JSON.parse(stored) : {};
      
      if (ratings[recipeId]) {
        return calculateRatingStats(ratings[recipeId]);
      }
    } else {
      // Server-side fallback
      if (inMemoryRatings[recipeId]) {
        return calculateRatingStats(inMemoryRatings[recipeId]);
      }
    }
  } catch (error) {
    console.error('Error reading ratings from storage:', error);
  }

  return { average: 0, count: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
}

/**
 * Save a rating for a recipe
 * @param {string} recipeId - Unique identifier for the recipe
 * @param {number} rating - Rating value (1-5)
 * @param {string} userId - User identifier (optional)
 * @returns {Object} Updated rating data
 */
export function saveRecipeRating(recipeId, rating, userId = null) {
  if (!recipeId || !rating || rating < 1 || rating > 5) {
    throw new Error('Invalid recipe ID or rating value');
  }

  const ratingValue = Math.round(rating);
  
  try {
    let ratings = {};
    let userRatings = {};

    // Load existing data
    if (typeof window !== 'undefined') {
      const storedRatings = localStorage.getItem(RATINGS_STORAGE_KEY);
      const storedUserRatings = localStorage.getItem(USER_RATINGS_STORAGE_KEY);
      
      ratings = storedRatings ? JSON.parse(storedRatings) : {};
      userRatings = storedUserRatings ? JSON.parse(storedUserRatings) : {};
    } else {
      // Server-side fallback
      ratings = { ...inMemoryRatings };
      userRatings = { ...inMemoryUserRatings };
    }

    // Initialize recipe ratings if needed
    if (!ratings[recipeId]) {
      ratings[recipeId] = [];
    }

    // Handle user-specific ratings
    if (userId) {
      const userKey = `${userId}_${recipeId}`;
      
      // Check if user already rated this recipe
      const existingUserRating = userRatings[userKey];
      if (existingUserRating) {
        // Update existing rating
        const oldRating = existingUserRating.rating;
        ratings[recipeId] = ratings[recipeId].map(r => 
          r.id === existingUserRating.id ? { ...r, rating: ratingValue, updatedAt: new Date().toISOString() } : r
        );
        userRatings[userKey] = { ...existingUserRating, rating: ratingValue, updatedAt: new Date().toISOString() };
      } else {
        // Add new rating
        const newRating = {
          id: `rating_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          rating: ratingValue,
          userId: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        ratings[recipeId].push(newRating);
        userRatings[userKey] = newRating;
      }
    } else {
      // Anonymous rating
      const newRating = {
        id: `rating_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        rating: ratingValue,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      ratings[recipeId].push(newRating);
    }

    // Save to storage
    if (typeof window !== 'undefined') {
      localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings));
      localStorage.setItem(USER_RATINGS_STORAGE_KEY, JSON.stringify(userRatings));
    } else {
      // Server-side fallback
      inMemoryRatings = ratings;
      inMemoryUserRatings = userRatings;
    }

    return calculateRatingStats(ratings[recipeId]);
  } catch (error) {
    console.error('Error saving rating:', error);
    throw new Error('Failed to save rating');
  }
}

/**
 * Get user's rating for a specific recipe
 * @param {string} recipeId - Unique identifier for the recipe
 * @param {string} userId - User identifier
 * @returns {number|null} User's rating or null if not rated
 */
export function getUserRating(recipeId, userId) {
  if (!recipeId || !userId) return null;

  try {
    let userRatings = {};

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(USER_RATINGS_STORAGE_KEY);
      userRatings = stored ? JSON.parse(stored) : {};
    } else {
      userRatings = inMemoryUserRatings;
    }

    const userKey = `${userId}_${recipeId}`;
    return userRatings[userKey] ? userRatings[userKey].rating : null;
  } catch (error) {
    console.error('Error getting user rating:', error);
    return null;
  }
}

/**
 * Delete a user's rating for a recipe
 * @param {string} recipeId - Unique identifier for the recipe
 * @param {string} userId - User identifier
 * @returns {boolean} Success status
 */
export function deleteUserRating(recipeId, userId) {
  if (!recipeId || !userId) return false;

  try {
    let ratings = {};
    let userRatings = {};

    if (typeof window !== 'undefined') {
      const storedRatings = localStorage.getItem(RATINGS_STORAGE_KEY);
      const storedUserRatings = localStorage.getItem(USER_RATINGS_STORAGE_KEY);
      
      ratings = storedRatings ? JSON.parse(storedRatings) : {};
      userRatings = storedUserRatings ? JSON.parse(storedUserRatings) : {};
    } else {
      ratings = { ...inMemoryRatings };
      userRatings = { ...inMemoryUserRatings };
    }

    const userKey = `${userId}_${recipeId}`;
    const userRating = userRatings[userKey];

    if (userRating && ratings[recipeId]) {
      // Remove from recipe ratings
      ratings[recipeId] = ratings[recipeId].filter(r => r.id !== userRating.id);
      
      // Remove from user ratings
      delete userRatings[userKey];

      // Save updated data
      if (typeof window !== 'undefined') {
        localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings));
        localStorage.setItem(USER_RATINGS_STORAGE_KEY, JSON.stringify(userRatings));
      } else {
        inMemoryRatings = ratings;
        inMemoryUserRatings = userRatings;
      }

      return true;
    }

    return false;
  } catch (error) {
    console.error('Error deleting rating:', error);
    return false;
  }
}

/**
 * Calculate rating statistics from an array of ratings
 * @param {Array} ratings - Array of rating objects
 * @returns {Object} Calculated stats
 */
function calculateRatingStats(ratings) {
  if (!ratings || ratings.length === 0) {
    return { average: 0, count: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
  }

  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let total = 0;

  ratings.forEach(rating => {
    const value = rating.rating;
    if (value >= 1 && value <= 5) {
      distribution[value]++;
      total += value;
    }
  });

  const count = ratings.length;
  const average = count > 0 ? total / count : 0;

  return {
    average: Math.round(average * 10) / 10, // Round to 1 decimal place
    count,
    distribution
  };
}

/**
 * Get all recipes with their rating data
 * @returns {Object} All recipes with their ratings
 */
export function getAllRecipeRatings() {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(RATINGS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } else {
      return inMemoryRatings;
    }
  } catch (error) {
    console.error('Error getting all ratings:', error);
    return {};
  }
}

/**
 * Clear all ratings (useful for testing)
 */
export function clearAllRatings() {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(RATINGS_STORAGE_KEY);
      localStorage.removeItem(USER_RATINGS_STORAGE_KEY);
    }
    inMemoryRatings = {};
    inMemoryUserRatings = {};
  } catch (error) {
    console.error('Error clearing ratings:', error);
  }
}
