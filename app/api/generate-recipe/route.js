import { model } from "@/lib/groq";
import { recipeSchema } from "@/lib/schemas";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import ingredientGraph from "@/lib/ingredientGraph";

/**
 * API Route: POST /api/generate-recipe
 * Generates a recipe based on user preferences using Groq AI
 * 
 * Request body should include:
 * - cuisine (optional): Preferred cuisine type
 * - dishType (optional): Type of dish
 * - spiceLevel (optional): Desired spice level
 * - dietaryRestrictions (optional): Array of dietary restrictions
 * - userPrompt: User's specific requirements/preferences
 * - availableIngredients (optional): Array of ingredients identified from uploaded image
 * 
 * Returns a structured recipe object following the recipeSchema
 */
export async function POST(req) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "Missing GROQ API key. Please set GROQ_API_KEY in your .env.local file." },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    // Default values if not provided in request
    const cuisine = body.cuisine || "Indian";
    const dishType = body.dishType || "Curry";
    const spiceLevel = body.spiceLevel || "Mild";

    // Build ingredients section if available
    const ingredientsSection = body.availableIngredients && body.availableIngredients.length > 0
      ? `Available ingredients: ${body.availableIngredients.map(ing => `${ing.name}${ing.quantity ? ` (${ing.quantity})` : ''}`).join(', ')}.`
      : '';

    // Get graph-based ingredient suggestions if available ingredients are provided
    let ingredientSuggestions = '';
    if (body.availableIngredients && body.availableIngredients.length > 0) {
      const ingredientNames = body.availableIngredients.map(ing => ing.name.toLowerCase());
      const pairingSuggestions = ingredientGraph.generatePairingSuggestions(ingredientNames, 3);
      
      if (pairingSuggestions.complementary.length > 0) {
        const complementaryNames = pairingSuggestions.complementary.map(c => c.ingredient).join(', ');
        ingredientSuggestions += `\nSuggested complementary ingredients: ${complementaryNames}.`;
      }
      
      if (pairingSuggestions.substitutes.length > 0) {
        const substituteNames = pairingSuggestions.substitutes.map(s => s.ingredient).join(', ');
        ingredientSuggestions += `\nSuggested substitutes if needed: ${substituteNames}.`;
      }
    }

    /*
      COMBINED: This prompt combines structure enforcement from `main` with ingredient awareness from `feat/24-add-ingredients-detection`.

      Benefits:
      - AI gets clear formatting requirements for JSON schema
      - User dietary restrictions and preferences are honored
      - Ingredients user has are included contextually (optional, not limiting)
      - Graph-based ingredient pairing suggestions for enhanced flavor profiles
    */
    const prompt = `You are a professional chef and recipe creator with expertise in ingredient pairing and flavor combinations.

    Generate a ${cuisine} recipe for ${dishType}${spiceLevel !== "Mild" ? ` with ${spiceLevel.toLowerCase()} spicing` : ""}.
    ${body.dietaryRestrictions && body.dietaryRestrictions.length > 0 ? `Strictly avoid these ingredients: ${body.dietaryRestrictions.join(", ")}.` : ""}
    ${ingredientsSection}${ingredientSuggestions}
    User preferences: ${body.userPrompt}

    Create an amazing recipe that would be perfect for this request. Consider the ingredient pairing suggestions provided - they are based on flavor compatibility and culinary traditions. Use whatever ingredients work best - if I mentioned having certain ingredients available, feel free to incorporate them if they fit well, but don't limit yourself to only those ingredients. Focus on making the best possible dish with innovative yet accessible ingredient combinations.

    Use simple, clear instructions and common ingredients. Make the recipe unique, appetizing, and easy to follow.`;

    // Generate recipe using AI model
    const result = await generateObject({
      model,
      schema: recipeSchema,
      prompt,
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json({ error: "Failed to generate recipe." }, { status: 500 });
  }
}
