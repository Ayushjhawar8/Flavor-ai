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

    /*
      IMPROVEMENT: The previous prompt was too generic and did not enforce structure or clarity, which could lead to inconsistent or incomplete AI responses. By making the prompt more explicit, instructive, and format-driven, we:
      - Ensure the AI returns recipes in a consistent, structured format (matching the schema)
      - Encourage the use of common ingredients and clear, step-by-step instructions
      - Make dietary restrictions and user preferences more prominent
      - Add a short description for context
      This change will result in more reliable, user-friendly, and context-aware recipe outputs, improving both developer and end-user experience.
    */
    const prompt = `You are a professional chef and recipe creator.

Generate a ${body.cuisine ?? cuisine} recipe for ${body.dishType ?? dishType} (with ${body.spiceLevel ?? spiceLevel} spice level if applicable).
${body.dietaryRestrictions ? `Strictly avoid these ingredients: ${body.dietaryRestrictions.join(", ")}.` : ""}
User preferences: ${body.userPrompt}

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

Use simple, clear instructions and common ingredients. Make the recipe unique and easy to follow.`;

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
