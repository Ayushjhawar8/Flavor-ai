import { model } from "@/lib/groq";
import { dietPlanSchema } from "@/lib/schemas";
import { generateObject } from "ai";
import { NextResponse } from "next/server";

/**
 * API Route: POST /api/generate-diet-plan
 * Generates a personalized daily diet plan based on user health parameters and goals using Groq AI
 * 
 * Request body should include:
 * - height: User's height in cm
 * - weight: User's weight in kg
 * - age: User's age in years
 * - gender: User's gender ('male' or 'female')
 * - activityLevel: Activity level ('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active')
 * - goal: Fitness goal ('bulk', 'cut', 'maintain', 'general_health')
 * - bloodSugar: Blood sugar level ('normal', 'prediabetic', 'diabetic')
 * - bloodPressure: Blood pressure status ('normal', 'elevated', 'high_stage1', 'high_stage2')
 * - dietaryRestrictions: Array of dietary restrictions (optional)
 * - allergies: Array of food allergies (optional)
 * - targetDate: Date for the diet plan (optional, defaults to today)
 * 
 * Returns a structured diet plan object following the dietPlanSchema
 */
export async function POST(req) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "Missing GROQ API key. Please set GROQ_API_KEY in your .env.local file." },
      { status: 400 }
    );
  }

  try {
    console.log("Diet planner API called");

    const requestBody = await req.json();
    console.log("Request body:", requestBody);

    const {
      height,
      weight,
      age,
      gender,
      activityLevel,
      goal,
      bloodSugar,
      bloodPressure,
      dietaryRestrictions = [],
      allergies = [],
      targetDate = new Date().toISOString().split('T')[0]
    } = requestBody;

    // Validate required fields
    if (!height || !weight || !age || !gender || !activityLevel || !goal || !bloodSugar || !bloodPressure) {
      return NextResponse.json(
        { error: "Missing required fields: height, weight, age, gender, activityLevel, goal, bloodSugar, bloodPressure" },
        { status: 400 }
      );
    }

    // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
    let bmr;
    if (gender.toLowerCase() === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extremely_active: 1.9
    };

    const tdee = bmr * (activityMultipliers[activityLevel] || 1.2);

    // Adjust calories based on goal
    let targetCalories;
    switch (goal.toLowerCase()) {
      case 'bulk':
        targetCalories = Math.round(tdee + 300); // Surplus for muscle gain
        break;
      case 'cut':
        targetCalories = Math.round(tdee - 500); // Deficit for fat loss
        break;
      case 'maintain':
        targetCalories = Math.round(tdee);
        break;
      default:
        targetCalories = Math.round(tdee);
    }

    // Calculate BMI for additional health insights
    const bmi = weight / ((height / 100) ** 2);

    // Create detailed prompt for AI
    const prompt = `Create a personalized daily diet plan for a ${age}-year-old ${gender} with the following profile:

PHYSICAL STATS:
- Height: ${height}cm
- Weight: ${weight}kg
- BMI: ${bmi.toFixed(1)}
- Activity Level: ${activityLevel.replace('_', ' ')}

HEALTH CONDITIONS:
- Blood Sugar: ${bloodSugar}
- Blood Pressure: ${bloodPressure}
- Dietary Restrictions: ${dietaryRestrictions.length > 0 ? dietaryRestrictions.join(', ') : 'None'}
- Allergies: ${allergies.length > 0 ? allergies.join(', ') : 'None'}

FITNESS GOAL: ${goal}
TARGET CALORIES: ${targetCalories}

REQUIREMENTS:
1. Create 3 main meals (breakfast, lunch, dinner) and 1-2 healthy snacks
2. Ensure meals are appropriate for ${bloodSugar} blood sugar levels
3. Consider ${bloodPressure} blood pressure with appropriate sodium levels
4. Align with ${goal} fitness goals
5. Include specific nutritional values for each meal
6. Provide health benefits for each meal related to the user's conditions
7. Include cooking instructions for each meal
8. Suggest appropriate hydration and exercise recommendations

Focus on whole foods, balanced macronutrients, and meals that support the user's health conditions and fitness goals.`;

    console.log("Generating diet plan with prompt length:", prompt.length);

    const result = await generateObject({
      model,
      schema: dietPlanSchema,
      prompt,
    });

    console.log("Diet plan generated successfully");

    return NextResponse.json({
      success: true,
      userProfile: {
        height,
        weight,
        age,
        gender,
        bmi: parseFloat(bmi.toFixed(1)),
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        targetCalories,
        activityLevel,
        goal,
        bloodSugar,
        bloodPressure,
        dietaryRestrictions,
        allergies
      },
      ...result.object
    });

  } catch (error) {
    console.error("Diet plan generation error:", error);
    console.error("Error stack:", error.stack);

    // Return more specific error information for debugging
    return NextResponse.json(
      {
        error: "Failed to generate diet plan. Please try again.",
        details: error.message,
        type: error.constructor.name
      },
      { status: 500 }
    );
  }
}

/**
 * API Route: GET /api/generate-diet-plan
 * Returns information about the diet planner API
 */
export async function GET() {
  return NextResponse.json({
    message: "AI Diet Planner API",
    description: "Generate personalized daily diet plans based on health parameters and fitness goals",
    requiredFields: [
      "height (cm)",
      "weight (kg)", 
      "age (years)",
      "gender (male/female)",
      "activityLevel (sedentary/lightly_active/moderately_active/very_active/extremely_active)",
      "goal (bulk/cut/maintain/general_health)",
      "bloodSugar (normal/prediabetic/diabetic)",
      "bloodPressure (normal/elevated/high_stage1/high_stage2)"
    ],
    optionalFields: [
      "dietaryRestrictions (array)",
      "allergies (array)",
      "targetDate (YYYY-MM-DD)"
    ],
    example: {
      height: 175,
      weight: 70,
      age: 25,
      gender: "male",
      activityLevel: "moderately_active",
      goal: "maintain",
      bloodSugar: "normal",
      bloodPressure: "normal",
      dietaryRestrictions: ["vegetarian"],
      allergies: ["nuts"],
      targetDate: "2025-01-15"
    }
  });
}
