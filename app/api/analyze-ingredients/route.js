import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

// Google Gemini client for vision model
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// Schema for ingredient analysis result
const ingredientAnalysisSchema = z.object({
  ingredients: z.array(z.object({
    name: z.string().describe('The name of the ingredient identified in the image'),
    confidence: z.number().describe('Confidence level of identification (0-1)'),
    quantity: z.string().optional().describe('Estimated quantity if visible'),
    condition: z.string().optional().describe('Condition of the ingredient (fresh, ripe, etc.)'),
  })).describe('List of ingredients identified in the image'),
  suggestions: z.array(z.string()).describe('Cooking suggestions based on the available ingredients'),
});

/**
 * API Route: POST /api/analyze-ingredients
 * Analyzes uploaded images to identify available ingredients using Google Gemini Vision
 * 
 * Request body should include:
 * - image: Base64 encoded image data
 * 
 * Returns identified ingredients and cooking suggestions
 */
export async function POST(req) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Analyze image with Google Gemini Vision
    const result = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: ingredientAnalysisSchema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this image and identify all the food ingredients you can see. 
                     For each ingredient, provide:
                     - Name of the ingredient
                     - Your confidence level (0-1) in the identification
                     - Estimated quantity if visible
                     - Condition (fresh, ripe, etc.) if assessable
                     
                     Also provide cooking suggestions based on what ingredients are available.
                     Focus on common cooking ingredients and ignore non-food items.`,
            },
            {
              type: "image",
              image: image,
            },
          ],
        },
      ],
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error("Error analyzing ingredients:", error);
    return NextResponse.json(
      { error: "Failed to analyze ingredients from image" },
      { status: 500 }
    );
  }
}
