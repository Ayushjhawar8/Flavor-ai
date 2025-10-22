import { NextResponse } from "next/server";

export async function POST(req) {
  const groqApiKey = process.env.GROQ_API_KEY;

  if (!groqApiKey) {
    return NextResponse.json(
      {
        error:
          "Missing GROQ API key. Please set GROQ_API_KEY in your .env.local file.",
      },
      { status: 500 },
    );
  }

  try {
    const body = await req.json();

    const prompt = `Generate a JSON object for a simple ${body.cuisine || "Indian"} ${body.dishType || "Snack"} recipe. Respond with ONLY the JSON object and nothing else. The keys should be "name", "ingredients", and "steps".`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          model: "llama-3.1-8b-instant",
          response_format: { type: "json_object" },
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Failed to fetch from Groq API",
      );
    }

    const responseData = await response.json();
    const recipeJsonString = responseData.choices[0]?.message?.content;

    if (!recipeJsonString) {
      throw new Error("AI response did not contain recipe content.");
    }

    let recipeObject = JSON.parse(recipeJsonString);

    // Handles cases where the AI wraps the recipe data in a parent key
    const keys = Object.keys(recipeObject);
    if (
      keys.length === 1 &&
      typeof recipeObject[keys[0]] === "object" &&
      recipeObject[keys[0]] !== null
    ) {
      recipeObject = recipeObject[keys[0]];
    }

    // ✨ **START: NEW LOGIC TO NORMALIZE KEYS** ✨
    // If the AI returns "instructions", rename it to "steps" for the frontend.
    if (recipeObject.instructions && !recipeObject.steps) {
      recipeObject.steps = recipeObject.instructions;
      delete recipeObject.instructions;
    }
    // ✨ **END: NEW LOGIC** ✨

    return NextResponse.json(recipeObject);
  } catch (error) {
    console.error("Critical Error in generate-recipe:", error);
    return NextResponse.json(
      { error: `Failed to generate recipe: ${error.message}` },
      { status: 500 },
    );
  }
}
