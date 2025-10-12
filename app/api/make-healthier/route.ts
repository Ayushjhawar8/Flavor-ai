import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { recipe } = await request.json();

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not provided.' }, { status: 400 });
    }

    const ingredientsList = Object.keys(recipe)
      .filter((key) => key.startsWith('strIngredient') && recipe[key])
      .map((key) => {
        const num = key.slice(13);
        const measure = recipe[`strMeasure${num}`];
        return `${measure} ${recipe[key]}`;
      })
      .join(', ');

    const prompt = `
      Analyze the following recipe and provide 3-5 specific suggestions to make it healthier.
      Focus on ingredient substitutions, cooking methods, and portion adjustments.
      Keep the suggestions practical and easy to implement.

      Recipe Name: ${recipe.strMeal}
      Ingredients: ${ingredientsList}
      Instructions: ${recipe.strInstructions}

      Please provide clear, actionable suggestions in a conversational format.
    `;
    
 
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    
    const result = await model.generateContent(prompt);
    const aiResponse = await result.response;
    const aiResponseText = aiResponse.text();

    return NextResponse.json({ suggestions: aiResponseText });

  } catch (error: any) {
    console.error('Error in /api/make-healthier:', error);
    
    // Provide more detailed error information
    const errorMessage = error?.message || 'An internal server error occurred.';
    const errorStatus = error?.status || 500;
    
    return NextResponse.json(
      { 
        error: 'Failed to generate suggestions', 
        details: errorMessage 
      },
      { status: errorStatus }
    );
  }
}