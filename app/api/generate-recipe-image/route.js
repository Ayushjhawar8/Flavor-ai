import { NextResponse } from "next/server";

/**
 * Generates a random number between 1 and 100
 * Used as a seed for image generation to ensure unique results
 */
function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

/**
 * API Route: POST /api/generate-recipe-image
 * Generates an image for a recipe using Pollinations.ai
 * 
 * Request body:
 * - prompt: Text description of the recipe/dish
 * 
 * Returns:
 * - url: Generated image URL
 */
export async function POST(req) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return NextResponse.json(
      { error: "Missing Gemini API key. Please set GOOGLE_GENERATIVE_AI_API_KEY in your .env.local file." },
      { status: 400 }
    );
  }

  const { prompt } = await req.json();

  // Generate unique seed for image variation
  const randomSeed = generateRandomNumber();
  
  // Construct URL for Pollinations.ai image generation
  const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}?seed=${randomSeed}&width=512&height=512&nologo=True`;

  // Ensure image is generated before returning
  await fetch(imageURL);

  return NextResponse.json({ url: imageURL });
}