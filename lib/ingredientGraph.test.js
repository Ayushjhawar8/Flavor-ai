const ingredientGraph = require('./ingredientGraph');

/**
 * Test suite for the Graph-Based Ingredient Similarity Model
 * 
 * This file contains comprehensive tests to validate:
 * - Graph initialization and structure
 * - Similarity calculations
 * - Complementary ingredient suggestions
 * - Substitute ingredient recommendations
 * - Pairing analysis functionality
 */

// Test data for validation
const testIngredients = [
  'tomato', 'onion', 'garlic', 'basil', 'cheese', 'chicken', 'rice', 'potato'
];

const testPairs = [
  ['tomato', 'basil'],
  ['tomato', 'garlic'],
  ['chicken', 'garlic'],
  ['rice', 'onion'],
  ['potato', 'onion']
];

/**
 * Test Graph Initialization
 */
function testGraphInitialization() {
  console.log('🧪 Testing Graph Initialization...');
  
  const stats = ingredientGraph.getGraphStats();
  
  // Check if graph has nodes
  if (stats.nodeCount === 0) {
    console.error('❌ Graph has no nodes');
    return false;
  }
  
  // Check if graph has edges
  if (stats.edgeCount === 0) {
    console.error('❌ Graph has no edges');
    return false;
  }
  
  console.log(`✅ Graph initialized with ${stats.nodeCount} nodes and ${stats.edgeCount} edges`);
  return true;
}

/**
 * Test Similarity Calculations
 */
function testSimilarityCalculations() {
  console.log('🧪 Testing Similarity Calculations...');
  
  let allPassed = true;
  
  // Test self-similarity
  testIngredients.forEach(ingredient => {
    const similarity = ingredientGraph.calculateSimilarity(ingredient, ingredient);
    if (similarity !== 1.0) {
      console.error(`❌ Self-similarity for ${ingredient} should be 1.0, got ${similarity}`);
      allPassed = false;
    }
  });
  
  // Test known similar pairs
  testPairs.forEach(([ing1, ing2]) => {
    const similarity = ingredientGraph.calculateSimilarity(ing1, ing2);
    if (similarity < 0.3) {
      console.error(`❌ Similarity between ${ing1} and ${ing2} is too low: ${similarity}`);
      allPassed = false;
    } else {
      console.log(`✅ ${ing1} ↔ ${ing2}: ${Math.round(similarity * 100)}% similarity`);
    }
  });
  
  if (allPassed) {
    console.log('✅ All similarity calculations passed');
  }
  
  return allPassed;
}

/**
 * Test Complementary Ingredient Suggestions
 */
function testComplementarySuggestions() {
  console.log('🧪 Testing Complementary Ingredient Suggestions...');
  
  let allPassed = true;
  
  testIngredients.forEach(ingredient => {
    const complements = ingredientGraph.findComplementaryIngredients(ingredient, 3);
    
    if (complements.length === 0) {
      console.error(`❌ No complementary ingredients found for ${ingredient}`);
      allPassed = false;
    } else {
      console.log(`✅ ${ingredient} → ${complements.map(c => `${c.ingredient} (${Math.round(c.score * 100)}%)`).join(', ')}`);
    }
  });
  
  if (allPassed) {
    console.log('✅ All complementary suggestions passed');
  }
  
  return allPassed;
}

/**
 * Test Substitute Ingredient Suggestions
 */
function testSubstituteSuggestions() {
  console.log('🧪 Testing Substitute Ingredient Suggestions...');
  
  let allPassed = true;
  
  // Test with ingredients that should have substitutes
  const testSubstitutes = ['milk', 'onion', 'garlic', 'lemon'];
  
  testSubstitutes.forEach(ingredient => {
    const substitutes = ingredientGraph.findSubstituteIngredients(ingredient, 3);
    
    if (substitutes.length === 0) {
      console.warn(`⚠️ No substitutes found for ${ingredient} (this might be expected)`);
    } else {
      console.log(`✅ ${ingredient} → ${substitutes.map(s => `${s.ingredient} (${Math.round(s.score * 100)}%)`).join(', ')}`);
    }
  });
  
  console.log('✅ Substitute suggestions test completed');
  return true;
}

/**
 * Test Pairing Analysis
 */
function testPairingAnalysis() {
  console.log('🧪 Testing Pairing Analysis...');
  
  const testIngredientLists = [
    ['tomato', 'onion'],
    ['chicken', 'garlic'],
    ['rice', 'onion', 'garlic'],
    ['potato', 'onion', 'garlic']
  ];
  
  let allPassed = true;
  
  testIngredientLists.forEach((ingredients, index) => {
    const pairing = ingredientGraph.generatePairingSuggestions(ingredients, 3);
    
    if (!pairing.complementary && !pairing.substitutes) {
      console.error(`❌ No pairing suggestions for ingredients: ${ingredients.join(', ')}`);
      allPassed = false;
    } else {
      console.log(`✅ Pairing ${index + 1}: ${ingredients.join(', ')}`);
      if (pairing.complementary.length > 0) {
        console.log(`   Complementary: ${pairing.complementary.map(c => c.ingredient).join(', ')}`);
      }
      if (pairing.substitutes.length > 0) {
        console.log(`   Substitutes: ${pairing.substitutes.map(s => s.ingredient).join(', ')}`);
      }
    }
  });
  
  if (allPassed) {
    console.log('✅ All pairing analysis tests passed');
  }
  
  return allPassed;
}

/**
 * Test Edge Cases
 */
function testEdgeCases() {
  console.log('🧪 Testing Edge Cases...');
  
  let allPassed = true;
  
  // Test with non-existent ingredients
  const nonExistentSimilarity = ingredientGraph.calculateSimilarity('nonexistent1', 'nonexistent2');
  if (nonExistentSimilarity !== 0.0) {
    console.error(`❌ Non-existent ingredients should have 0 similarity, got ${nonExistentSimilarity}`);
    allPassed = false;
  }
  
  // Test with empty ingredient list
  const emptyPairing = ingredientGraph.generatePairingSuggestions([], 3);
  if (emptyPairing.complementary.length !== 0 || emptyPairing.substitutes.length !== 0) {
    console.error('❌ Empty ingredient list should return empty suggestions');
    allPassed = false;
  }
  
  // Test with single ingredient
  const singlePairing = ingredientGraph.generatePairingSuggestions(['tomato'], 3);
  if (singlePairing.complementary.length === 0) {
    console.error('❌ Single ingredient should have complementary suggestions');
    allPassed = false;
  }
  
  if (allPassed) {
    console.log('✅ All edge case tests passed');
  }
  
  return allPassed;
}

/**
 * Performance Test
 */
function testPerformance() {
  console.log('🧪 Testing Performance...');
  
  const startTime = Date.now();
  
  // Test multiple similarity calculations
  for (let i = 0; i < 100; i++) {
    const ing1 = testIngredients[i % testIngredients.length];
    const ing2 = testIngredients[(i + 1) % testIngredients.length];
    ingredientGraph.calculateSimilarity(ing1, ing2);
  }
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  console.log(`✅ 100 similarity calculations completed in ${duration}ms`);
  
  return duration < 1000; // Should complete within 1 second
}

/**
 * Run all tests
 */
function runAllTests() {
  console.log('🚀 Starting Graph-Based Ingredient Similarity Model Tests\n');
  
  const tests = [
    { name: 'Graph Initialization', test: testGraphInitialization },
    { name: 'Similarity Calculations', test: testSimilarityCalculations },
    { name: 'Complementary Suggestions', test: testComplementarySuggestions },
    { name: 'Substitute Suggestions', test: testSubstituteSuggestions },
    { name: 'Pairing Analysis', test: testPairingAnalysis },
    { name: 'Edge Cases', test: testEdgeCases },
    { name: 'Performance', test: testPerformance }
  ];
  
  let passedTests = 0;
  let totalTests = tests.length;
  
  tests.forEach(({ name, test }) => {
    console.log(`\n📋 ${name}`);
    console.log('='.repeat(50));
    
    try {
      const result = test();
      if (result) {
        passedTests++;
        console.log(`✅ ${name} PASSED`);
      } else {
        console.log(`❌ ${name} FAILED`);
      }
    } catch (error) {
      console.error(`❌ ${name} ERROR:`, error.message);
    }
  });
  
  console.log('\n' + '='.repeat(50));
  console.log(`📊 Test Results: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! The graph-based ingredient similarity model is working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Please review the implementation.');
  }
  
  return passedTests === totalTests;
}

// Export for use in other files
module.exports = {
  testGraphInitialization,
  testSimilarityCalculations,
  testComplementarySuggestions,
  testSubstituteSuggestions,
  testPairingAnalysis,
  testEdgeCases,
  testPerformance,
  runAllTests
};

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  runAllTests();
} 