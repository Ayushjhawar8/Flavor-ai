import { NextResponse } from "next/server";
const ingredientGraph = require("@/lib/ingredientGraph");

/**
 * API Route: POST /api/ingredient-similarity
 * Provides graph-based ingredient similarity and pairing suggestions
 * 
 * Request body should include:
 * - ingredients: Array of ingredient names
 * - action: 'complementary', 'substitutes', or 'pairing'
 * - limit: Maximum number of suggestions (optional, default: 5)
 * 
 * Returns ingredient suggestions with similarity scores and reasoning
 */
export async function POST(req) {
  try {
    const { ingredients, action = 'pairing', limit = 5 } = await req.json();

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json(
        { error: "Ingredients array is required and must not be empty" },
        { status: 400 }
      );
    }

    // Normalize ingredient names (lowercase, trim)
    const normalizedIngredients = ingredients.map(ing => 
      ing.toLowerCase().trim()
    );

    let result;

    switch (action) {
      case 'complementary':
        result = await getComplementaryIngredients(normalizedIngredients, limit);
        break;
      case 'substitutes':
        result = await getSubstituteIngredients(normalizedIngredients, limit);
        break;
      case 'pairing':
        result = await getPairingSuggestions(normalizedIngredients, limit);
        break;
      default:
        return NextResponse.json(
          { error: "Invalid action. Must be 'complementary', 'substitutes', or 'pairing'" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      action,
      baseIngredients: normalizedIngredients,
      ...result
    });

  } catch (error) {
    console.error("Error in ingredient similarity API:", error);
    return NextResponse.json(
      { error: "Failed to process ingredient similarity request" },
      { status: 500 }
    );
  }
}

/**
 * Get complementary ingredients for the provided ingredients
 */
async function getComplementaryIngredients(ingredients, limit) {
  const allComplements = [];

  ingredients.forEach(ingredient => {
    const complements = ingredientGraph.findComplementaryIngredients(ingredient, limit);
    allComplements.push(...complements);
  });

  // Remove duplicates and sort by score
  const uniqueComplements = removeDuplicates(allComplements);
  
  return {
    suggestions: uniqueComplements.slice(0, limit),
    reasoning: generateComplementaryReasoning(ingredients, uniqueComplements)
  };
}

/**
 * Get substitute ingredients for the provided ingredients
 */
async function getSubstituteIngredients(ingredients, limit) {
  const allSubstitutes = [];

  ingredients.forEach(ingredient => {
    const substitutes = ingredientGraph.findSubstituteIngredients(ingredient, limit);
    allSubstitutes.push(...substitutes);
  });

  // Remove duplicates and sort by score
  const uniqueSubstitutes = removeDuplicates(allSubstitutes);
  
  return {
    suggestions: uniqueSubstitutes.slice(0, limit),
    reasoning: generateSubstituteReasoning(ingredients, uniqueSubstitutes)
  };
}

/**
 * Get comprehensive pairing suggestions
 */
async function getPairingSuggestions(ingredients, limit) {
  const result = ingredientGraph.generatePairingSuggestions(ingredients, limit);
  
  return {
    complementary: result.complementary,
    substitutes: result.substitutes,
    reasoning: result.reasoning
  };
}

/**
 * Remove duplicate ingredients from suggestions
 */
function removeDuplicates(suggestions) {
  const seen = new Set();
  return suggestions.filter(suggestion => {
    if (seen.has(suggestion.ingredient)) {
      return false;
    }
    seen.add(suggestion.ingredient);
    return true;
  });
}

/**
 * Generate reasoning for complementary ingredients
 */
function generateComplementaryReasoning(baseIngredients, complementary) {
  if (complementary.length === 0) {
    return "No strong complementary ingredients found for the provided ingredients.";
  }

  const topComplements = complementary.slice(0, 3);
  const complementNames = topComplements.map(c => c.ingredient).join(', ');
  
  return `Based on flavor profile analysis, ${complementNames} would pair well with your ingredients. These suggestions are based on culinary traditions and flavor compatibility.`;
}

/**
 * Generate reasoning for substitute ingredients
 */
function generateSubstituteReasoning(baseIngredients, substitutes) {
  if (substitutes.length === 0) {
    return "No suitable substitutes found for the provided ingredients.";
  }

  const topSubstitutes = substitutes.slice(0, 3);
  const substituteNames = topSubstitutes.map(s => s.ingredient).join(', ');
  
  return `If you're missing any ingredients, ${substituteNames} can be used as alternatives. These substitutes maintain similar flavor profiles and cooking properties.`;
}

/**
 * API Route: GET /api/ingredient-similarity/stats
 * Get graph statistics and available ingredients
 */
export async function GET() {
  try {
    const stats = ingredientGraph.getGraphStats();
    
    return NextResponse.json({
      success: true,
      stats,
      message: "Graph-based ingredient similarity model is active"
    });
  } catch (error) {
    console.error("Error getting graph stats:", error);
    return NextResponse.json(
      { error: "Failed to get graph statistics" },
      { status: 500 }
    );
  }
} 