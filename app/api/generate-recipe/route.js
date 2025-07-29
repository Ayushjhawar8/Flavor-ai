import { model } from "@/lib/groq";
import { recipeSchema } from "@/lib/schemas";
import { generateObject } from "ai";
import { NextResponse } from "next/server";

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
  try {
    const body = await req.json();

    // Default values if not provided in request
    const cuisine = "Indian";
    const dishType = "Curry";
    const spiceLevel = "Mild";
// Build ingredients section if available
const ingredientsSection = body.availableIngredients && body.availableIngredients.length > 0
  ? `Available ingredients: ${body.availableIngredients.map(ing => `${ing.name}${ing.quantity ? ` (${ing.quantity})` : ''}`).join(', ')}.`
  : '';

/*
  COMBINED: This prompt combines structure enforcement from `main` with ingredient awareness from `feat/24-add-ingredients-detection`.

  Benefits:
  - AI gets clear formatting requirements for JSON schema
  - User dietary restrictions and preferences are honored
  - Ingredients user has are included contextually (optional, not limiting)
*/
const prompt = `You are a professional chef and recipe creator.

Generate a ${body.cuisine ?? cuisine} recipe for ${body.dishType ?? dishType}${body.spiceLevel && body.spiceLevel !== "Mild" ? ` with ${body.spiceLevel.toLowerCase()} spicing` : ""}.
${body.dietaryRestrictions && body.dietaryRestrictions.length > 0 ? `Strictly avoid these ingredients: ${body.dietaryRestrictions.join(", ")}.` : ""}
${ingredientsSection}
User preferences: ${body.userPrompt}

Create an amazing recipe that would be perfect for this request. Use whatever ingredients work best - if I mentioned having certain ingredients available, feel free to incorporate them if they fit well, but don't limit yourself to only those ingredients. Focus on making the best possible dish.

Return the recipe in this JSON format:
{
  "name": "Recipe Name (2-3 words)",
  "area": "Cuisine/Region",
  "category": "Dish Type",
  "ingredients": [
    { "name": "Ingredient 1", "amount": "Amount" },
    ...
  ],
  "steps": [
    "Step 1",
    "Step 2",
    ...
  ],
  "description": "A one-line summary of the dish."
}

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
    return NextResponse.json({ error: "Failed to generate recipe." });
  }
}
