// Utility to clear any existing dummy data and ensure clean dynamic system

import { clearAllRatings } from "./ratingStorage";

/**
 * Clear all dummy data and reset to dynamic-only system
 * This ensures no pre-existing dummy ratings interfere with real user data
 */
export const clearAllDummyData = () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Clear all ratings
    clearAllRatings();
    
    // Disable demo data flag
    localStorage.setItem('ENABLE_DEMO_DATA', 'false');
    
    // Remove any other dummy data flags
    localStorage.removeItem('dummy_data_seeded');
    localStorage.removeItem('sample_ratings_added');
    
    console.log('✅ All dummy data cleared. System is now fully dynamic.');
  } catch (error) {
    console.error('Error clearing dummy data:', error);
  }
};

/**
 * Initialize clean dynamic system
 * Call this once to ensure no dummy data exists
 */
export const initializeCleanDynamicSystem = () => {
  if (typeof window === 'undefined') return;
  
  // Only clear if not already clean
  const isClean = localStorage.getItem('dynamic_system_initialized') === 'true';
  if (!isClean) {
    clearAllDummyData();
    localStorage.setItem('dynamic_system_initialized', 'true');
  }
};
