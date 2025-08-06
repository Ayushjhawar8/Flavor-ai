/**
 * Test file for the AI Diet Planner API
 * This file contains tests to verify the diet planner functionality
 */

// Mock test data for diet planner
const mockUserProfile = {
  height: 175,
  weight: 70,
  age: 25,
  gender: "male",
  activityLevel: "moderately_active",
  goal: "maintain",
  bloodSugar: "normal",
  bloodPressure: "normal",
  dietaryRestrictions: ["vegetarian"],
  allergies: ["nuts"],
  targetDate: "2025-01-15"
};

/**
 * Test function to validate diet planner API response structure
 * @param {Object} response - API response object
 * @returns {boolean} - True if response structure is valid
 */
function validateDietPlanResponse(response) {
  // Check if response has required top-level properties
  if (!response.success || !response.userProfile || !response.dietPlan) {
    console.error("Missing required top-level properties");
    return false;
  }

  // Validate user profile
  const profile = response.userProfile;
  const requiredProfileFields = ['height', 'weight', 'age', 'gender', 'bmi', 'bmr', 'tdee', 'targetCalories'];
  for (const field of requiredProfileFields) {
    if (profile[field] === undefined || profile[field] === null) {
      console.error(`Missing required profile field: ${field}`);
      return false;
    }
  }

  // Validate diet plan
  const dietPlan = response.dietPlan;
  const requiredDietFields = ['date', 'totalCalories', 'totalProtein', 'totalCarbs', 'totalFat', 'meals'];
  for (const field of requiredDietFields) {
    if (dietPlan[field] === undefined || dietPlan[field] === null) {
      console.error(`Missing required diet plan field: ${field}`);
      return false;
    }
  }

  // Validate meals array
  if (!Array.isArray(dietPlan.meals) || dietPlan.meals.length === 0) {
    console.error("Meals should be a non-empty array");
    return false;
  }

  // Validate each meal
  for (const meal of dietPlan.meals) {
    const requiredMealFields = ['name', 'type', 'calories', 'protein', 'carbs', 'fat', 'ingredients', 'instructions'];
    for (const field of requiredMealFields) {
      if (meal[field] === undefined || meal[field] === null) {
        console.error(`Missing required meal field: ${field}`);
        return false;
      }
    }

    // Validate meal type
    const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    if (!validMealTypes.includes(meal.type)) {
      console.error(`Invalid meal type: ${meal.type}`);
      return false;
    }

    // Validate ingredients array
    if (!Array.isArray(meal.ingredients) || meal.ingredients.length === 0) {
      console.error("Meal ingredients should be a non-empty array");
      return false;
    }

    // Validate instructions array
    if (!Array.isArray(meal.instructions) || meal.instructions.length === 0) {
      console.error("Meal instructions should be a non-empty array");
      return false;
    }
  }

  return true;
}

/**
 * Test function to calculate BMR using Mifflin-St Jeor Equation
 * @param {Object} profile - User profile object
 * @returns {number} - Calculated BMR
 */
function calculateBMR(profile) {
  const { height, weight, age, gender } = profile;
  
  if (gender.toLowerCase() === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

/**
 * Test function to calculate TDEE
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - Activity level
 * @returns {number} - Calculated TDEE
 */
function calculateTDEE(bmr, activityLevel) {
  const activityMultipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extremely_active: 1.9
  };

  return bmr * (activityMultipliers[activityLevel] || 1.2);
}

/**
 * Test function to validate BMR and TDEE calculations
 */
function testMetabolicCalculations() {
  console.log("Testing metabolic calculations...");
  
  const bmr = calculateBMR(mockUserProfile);
  const expectedBMR = 10 * 70 + 6.25 * 175 - 5 * 25 + 5; // Male formula
  
  if (Math.abs(bmr - expectedBMR) < 0.01) {
    console.log("✅ BMR calculation test passed");
  } else {
    console.error("❌ BMR calculation test failed");
    console.error(`Expected: ${expectedBMR}, Got: ${bmr}`);
  }

  const tdee = calculateTDEE(bmr, mockUserProfile.activityLevel);
  const expectedTDEE = bmr * 1.55; // moderately_active multiplier
  
  if (Math.abs(tdee - expectedTDEE) < 0.01) {
    console.log("✅ TDEE calculation test passed");
  } else {
    console.error("❌ TDEE calculation test failed");
    console.error(`Expected: ${expectedTDEE}, Got: ${tdee}`);
  }
}

/**
 * Test function to validate input parameters
 * @param {Object} params - Input parameters
 * @returns {Array} - Array of validation errors
 */
function validateInputParameters(params) {
  const errors = [];
  
  // Required numeric fields
  const numericFields = ['height', 'weight', 'age'];
  for (const field of numericFields) {
    if (!params[field] || isNaN(params[field]) || params[field] <= 0) {
      errors.push(`${field} must be a positive number`);
    }
  }

  // Required string fields
  const stringFields = ['gender', 'activityLevel', 'goal', 'bloodSugar', 'bloodPressure'];
  for (const field of stringFields) {
    if (!params[field] || typeof params[field] !== 'string') {
      errors.push(`${field} must be a non-empty string`);
    }
  }

  // Validate gender
  if (params.gender && !['male', 'female'].includes(params.gender.toLowerCase())) {
    errors.push('gender must be either "male" or "female"');
  }

  // Validate activity level
  const validActivityLevels = ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'];
  if (params.activityLevel && !validActivityLevels.includes(params.activityLevel)) {
    errors.push('activityLevel must be one of: ' + validActivityLevels.join(', '));
  }

  // Validate goal
  const validGoals = ['bulk', 'cut', 'maintain', 'general_health'];
  if (params.goal && !validGoals.includes(params.goal)) {
    errors.push('goal must be one of: ' + validGoals.join(', '));
  }

  // Validate blood sugar
  const validBloodSugar = ['normal', 'prediabetic', 'diabetic'];
  if (params.bloodSugar && !validBloodSugar.includes(params.bloodSugar)) {
    errors.push('bloodSugar must be one of: ' + validBloodSugar.join(', '));
  }

  // Validate blood pressure
  const validBloodPressure = ['normal', 'elevated', 'high_stage1', 'high_stage2'];
  if (params.bloodPressure && !validBloodPressure.includes(params.bloodPressure)) {
    errors.push('bloodPressure must be one of: ' + validBloodPressure.join(', '));
  }

  return errors;
}

/**
 * Test input validation
 */
function testInputValidation() {
  console.log("Testing input validation...");
  
  // Test valid input
  const validErrors = validateInputParameters(mockUserProfile);
  if (validErrors.length === 0) {
    console.log("✅ Valid input test passed");
  } else {
    console.error("❌ Valid input test failed:", validErrors);
  }

  // Test invalid input
  const invalidProfile = {
    height: -175,
    weight: "invalid",
    age: 0,
    gender: "other",
    activityLevel: "invalid",
    goal: "invalid",
    bloodSugar: "invalid",
    bloodPressure: "invalid"
  };
  
  const invalidErrors = validateInputParameters(invalidProfile);
  if (invalidErrors.length > 0) {
    console.log("✅ Invalid input test passed - errors detected as expected");
  } else {
    console.error("❌ Invalid input test failed - should have detected errors");
  }
}

/**
 * Run all tests
 */
function runTests() {
  console.log("🧪 Running Diet Planner Tests...\n");
  
  testMetabolicCalculations();
  console.log("");
  
  testInputValidation();
  console.log("");
  
  console.log("📊 Test Summary:");
  console.log("- BMR/TDEE calculation tests");
  console.log("- Input validation tests");
  console.log("- Response structure validation function available");
  console.log("\n✨ All tests completed!");
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateDietPlanResponse,
    calculateBMR,
    calculateTDEE,
    validateInputParameters,
    runTests,
    mockUserProfile
  };
}

// Run tests if this file is executed directly
if (typeof window === 'undefined' && require.main === module) {
  runTests();
}
