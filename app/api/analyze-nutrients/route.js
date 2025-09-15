import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { recipe } = await req.json();

    if (!recipe) {
      return NextResponse.json({ error: "No recipe provided" }, { status: 400 });
    }

    // Call API Ninjas Nutrition API
    const response = await fetch(
      `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(recipe)}`,
      {
        headers: {
          "X-Api-Key": process.env.API_NINJAS_KEY, // key in .env.local
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API Ninjas request failed: ${response.statusText}`);
    }

    const data = await response.json();

    // 🚀 Debug raw response
    console.log("🍽️ Raw Nutrition API Response:", JSON.stringify(data, null, 2));

    // ✅ Aggregate nutrition info
    let nutrition = {
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
      cholesterol: 0,
    };

    data.forEach((item) => {
      nutrition.carbs += item.carbohydrates_total_g || 0;
      nutrition.fat += item.fat_total_g || 0;
      nutrition.fiber += item.fiber_g || 0;
      nutrition.sugar += item.sugar_g || 0;
      nutrition.sodium += item.sodium_mg || 0;
      nutrition.cholesterol += item.cholesterol_mg || 0;
    });

    // Round values
    for (let key in nutrition) {
      nutrition[key] = Math.round(nutrition[key] * 10) / 10;
    }

    return NextResponse.json({ nutrition });
  } catch (error) {
    console.error("🔥 Nutrition API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch nutrition" },
      { status: 500 }
    );
  }
}
