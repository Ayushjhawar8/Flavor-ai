import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai"; // ⬅️ USE 'generateObject'
import { google } from "@ai-sdk/google";
// ⬇️ IMPORT ZOD FOR SCHEMA DEFINITION
import { z } from "zod";

// 1. Define the Response Schema using Zod
// This speeds up the response and guarantees a valid JSON structure.
const DietPlanSchema = z.object({
  totalDailyCalories: z.number().describe("Estimated total daily calorie needs."),
  macros: z.object({
    proteinPercent: z.number().describe("Target protein percentage (e.g., 30)."),
    carbsPercent: z.number().describe("Target carbohydrate percentage (e.g., 45)."),
    fatPercent: z.number().describe("Target fat percentage (e.g., 25)."),
  }).describe("Recommended macronutrient breakdown."),
  weeklyPlan: z.array(
    z.object({
      day: z.string().describe("e.g., 'Day 1'"),
      meals: z.array(
        z.object({
          meal: z.string().describe("e.g., 'Breakfast'"),
          items: z.array(z.string()).describe("List of food items, e.g., ['2 Scrambled Eggs', 'Whole-wheat toast', 'Small Orange']"),
          calories: z.string().describe("Estimated calories for this meal, e.g., '350 kcal'"),
        })
      ).describe("All meals for the day."),
      totalCalories: z.string().describe("Total estimated calories for this day, e.g., '2000 kcal'"),
    })
  ).describe("The complete diet plan for the duration."),
  nutritionTips: z.array(z.string()).describe("3-5 concise, practical nutrition tips."),
});

export async function POST(req) {
  // Use `await req.json()` only once to reduce I/O overhead
  let formData;
  try {
    formData = await req.json();
    console.log(formData)
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // console.log(formData); // Keep for debugging if needed

  if (!formData) {
    return NextResponse.json({ error: "Missing form data" }, { status: 400 });
  }

  // Default to 7 days if duration is missing or invalid
  const duration = Number(formData.duration) || 7;

  // 2. Refine the Prompt (Keep it concise and clear)
  const prompt = `You are an expert AI nutritionist. Generate a personalized, structured diet plan for ${duration} day(s).

--- DYNAMISM AND VARIETY INSTRUCTION ---
Ensure the meals are **highly varied** across all ${duration} days, providing different healthy options for the same meal type (Breakfast, Lunch, etc.) each day. Do not repeat the exact same meal items or structure for consecutive days.

--- USER INPUT ---
Age: ${formData.age}
Gender: ${formData.gender}
Height: ${formData.height} cm
Weight: ${formData.weight} kg
Activity Level: ${formData.activityLevel}
Fitness Goal: ${formData.fitnessGoal}
Diet Preference: ${formData.dietPreference}
Dietary Restrictions: ${formData.dietaryRestriction || "None"}
Allergies: ${formData.allergies || "None"}
Blood Sugar: ${formData.bloodSugar}
Blood Pressure: ${formData.bloodPressure}
Meals per Day: ${formData.mealsPerDay}
Duration: ${duration} day(s)

--- INSTRUCTIONS ---
- Calories per meal must add up close to totalDailyCalories.
- All meals must respect diet preferences & restrictions.
- **STRICTLY ADHERE** to the provided JSON Schema for the output.`;

  try {
    // 3. Use 'generateObject' with the defined schema
    const { object: structuredResponse } = await generateObject({
      model: google("gemini-2.5-flash"), // Best for speed and structured output
      prompt,
      schema: DietPlanSchema, // ⬅️ Passing the Zod schema
      mode: "json", // ⬅️ Enforces JSON output
      temperature: 0.8,
    });

    // 4. Return the response immediately
    // No need for manual JSON.parse or regex extraction!
    return NextResponse.json({ response: structuredResponse });

  } catch (error) {
    console.error("❌ Error generating diet plan:", error);
    // Be explicit about the error type for better debugging
    return NextResponse.json(
      { error: "Failed to generate diet plan", details: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}