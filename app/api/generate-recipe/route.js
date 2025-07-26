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
      ? `\n\nIngredients I have available: ${body.availableIngredients.map(ing => `${ing.name}${ing.quantity ? ` (${ing.quantity})` : ''}`).join(', ')}\n`
      : '';

    // Construct AI prompt with user preferences
    const prompt = `Create a delicious ${body.cuisine ?? cuisine} ${
      body.dishType ?? dishType
    } recipe${body.spiceLevel && body.spiceLevel !== "Mild" ? ` with ${body.spiceLevel.toLowerCase()} spicing` : ''}.
      
      ${
        body.dietaryRestrictions && body.dietaryRestrictions.length > 0
          ? `Requirements: ${body.dietaryRestrictions.join(", ")}\n`
          : ""
      }${ingredientsSection}
      Request: ${body.userPrompt}
      
      Create an amazing recipe that would be perfect for this request. Use whatever ingredients work best - if I mentioned having certain ingredients available, feel free to incorporate them if they fit well, but don't limit yourself to only those ingredients. Focus on making the best possible dish.
      
      Give the recipe a simple, appetizing name (2-3 words).`;

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
