import { NextResponse } from "next/server";

/**
 * Test API Route: POST /api/test-diet-plan
 * Returns a mock diet plan for testing purposes
 */
export async function POST(req) {
  try {
    const requestBody = await req.json();
    console.log("Test diet planner called with:", requestBody);

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

    // Calculate BMR and TDEE
    let bmr;
    if (gender.toLowerCase() === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extremely_active: 1.9
    };

    const tdee = bmr * (activityMultipliers[activityLevel] || 1.2);

    let targetCalories;
    switch (goal.toLowerCase()) {
      case 'bulk':
        targetCalories = Math.round(tdee + 300);
        break;
      case 'cut':
        targetCalories = Math.round(tdee - 500);
        break;
      case 'maintain':
        targetCalories = Math.round(tdee);
        break;
      default:
        targetCalories = Math.round(tdee);
    }

    const bmi = weight / ((height / 100) ** 2);

    // Vegetarian detection
    const isVegetarianUser = dietaryRestrictions.map(r => r.toLowerCase()).includes("vegetarian");

    // Vegetarian meals
    const vegetarianMeals = [
      {
        name: "Overnight Oats with Berries",
        type: "breakfast",
        calories: Math.round(targetCalories * 0.25),
        protein: Math.round(targetCalories * 0.25 * 0.20 / 4),
        carbs: Math.round(targetCalories * 0.25 * 0.60 / 4),
        fat: Math.round(targetCalories * 0.25 * 0.20 / 9),
        fiber: 8,
        sodium: 150,
        ingredients: [
          { name: "Rolled oats", amount: "1/2 cup" },
          { name: "Greek yogurt", amount: "1/4 cup" },
          { name: "Mixed berries", amount: "1/2 cup" },
          { name: "Chia seeds", amount: "1 tbsp" },
          { name: "Honey", amount: "1 tsp" }
        ],
        instructions: [
          "Mix oats, yogurt, and chia seeds in a jar",
          "Add honey and stir well",
          "Top with berries",
          "Refrigerate overnight",
          "Enjoy cold in the morning"
        ],
        healthBenefits: [
          "High in fiber for digestive health",
          "Protein supports muscle maintenance",
          "Antioxidants from berries support immune system"
        ]
      },
      {
        name: "Paneer & Veggie Salad",
        type: "lunch",
        calories: Math.round(targetCalories * 0.35),
        protein: Math.round(targetCalories * 0.35 * 0.25 / 4),
        carbs: Math.round(targetCalories * 0.35 * 0.50 / 4),
        fat: Math.round(targetCalories * 0.35 * 0.25 / 9),
        fiber: 10,
        sodium: 300,
        ingredients: [
          { name: "Paneer (cottage cheese)", amount: "100g" },
          { name: "Mixed greens", amount: "2 cups" },
          { name: "Tomato", amount: "1/2 cup" },
          { name: "Cucumber", amount: "1/2 cup" },
          { name: "Olive oil", amount: "1 tbsp" },
          { name: "Lemon juice", amount: "1 tbsp" }
        ],
        instructions: [
          "Cube paneer and toss with greens, tomato, and cucumber",
          "Drizzle with olive oil and lemon juice",
          "Mix and serve fresh"
        ],
        healthBenefits: [
          "Good protein from paneer",
          "Rich in vitamins and minerals from veggies",
          "Healthy fats from olive oil"
        ]
      },
      {
        name: "Dal, Brown Rice & Veggies",
        type: "dinner",
        calories: Math.round(targetCalories * 0.30),
        protein: Math.round(targetCalories * 0.30 * 0.20 / 4),
        carbs: Math.round(targetCalories * 0.30 * 0.65 / 4),
        fat: Math.round(targetCalories * 0.30 * 0.15 / 9),
        fiber: 8,
        sodium: 250,
        ingredients: [
          { name: "Cooked brown rice", amount: "1 cup" },
          { name: "Cooked dal (lentils)", amount: "3/4 cup" },
          { name: "Mixed vegetables", amount: "1 cup" },
          { name: "Spices", amount: "to taste" }
        ],
        instructions: [
          "Cook dal with spices and vegetables",
          "Serve hot with brown rice"
        ],
        healthBenefits: [
          "Plant-based protein from lentils",
          "Complex carbs for sustained energy",
          "Rich in fiber"
        ]
      },
      {
        name: "Fruit & Nut Yogurt",
        type: "snack",
        calories: Math.round(targetCalories * 0.10),
        protein: Math.round(targetCalories * 0.10 * 0.20 / 4),
        carbs: Math.round(targetCalories * 0.10 * 0.60 / 4),
        fat: Math.round(targetCalories * 0.10 * 0.20 / 9),
        fiber: 3,
        sodium: 50,
        ingredients: [
          { name: "Greek yogurt", amount: "1/2 cup" },
          { name: "Chopped fruits", amount: "1/2 cup" },
          { name: "Mixed nuts", amount: "1 tbsp" }
        ],
        instructions: [
          "Mix yogurt with fruits and nuts",
          "Enjoy as a healthy snack"
        ],
        healthBenefits: [
          "Probiotics for gut health",
          "Vitamins from fruits",
          "Healthy fats from nuts"
        ]
      }
    ];

    const nonVegMeals = [
          {
            name: "Overnight Oats with Berries",
            type: "breakfast",
            calories: Math.round(targetCalories * 0.25),
            protein: Math.round(targetCalories * 0.25 * 0.20 / 4),
            carbs: Math.round(targetCalories * 0.25 * 0.60 / 4),
            fat: Math.round(targetCalories * 0.25 * 0.20 / 9),
            fiber: 8,
            sodium: 150,
            ingredients: [
              { name: "Rolled oats", amount: "1/2 cup" },
              { name: "Greek yogurt", amount: "1/4 cup" },
              { name: "Mixed berries", amount: "1/2 cup" },
              { name: "Chia seeds", amount: "1 tbsp" },
              { name: "Honey", amount: "1 tsp" }
            ],
            instructions: [
              "Mix oats, yogurt, and chia seeds in a jar",
              "Add honey and stir well",
              "Top with berries",
              "Refrigerate overnight",
              "Enjoy cold in the morning"
            ],
            healthBenefits: [
              "High in fiber for digestive health",
              "Protein supports muscle maintenance",
              "Antioxidants from berries support immune system"
            ]
          },
          {
            name: "Grilled Chicken Salad",
            type: "lunch",
            calories: Math.round(targetCalories * 0.35),
            protein: Math.round(targetCalories * 0.35 * 0.35 / 4),
            carbs: Math.round(targetCalories * 0.35 * 0.30 / 4),
            fat: Math.round(targetCalories * 0.35 * 0.35 / 9),
            fiber: 12,
            sodium: 400,
            ingredients: [
              { name: "Chicken breast", amount: "150g" },
              { name: "Mixed greens", amount: "2 cups" },
              { name: "Cherry tomatoes", amount: "1/2 cup" },
              { name: "Cucumber", amount: "1/2 cup" },
              { name: "Olive oil", amount: "1 tbsp" },
              { name: "Lemon juice", amount: "1 tbsp" }
            ],
            instructions: [
              "Season and grill chicken breast until cooked through",
              "Let chicken rest, then slice",
              "Combine greens, tomatoes, and cucumber in a bowl",
              "Top with sliced chicken",
              "Drizzle with olive oil and lemon juice"
            ],
            healthBenefits: [
              "Lean protein supports muscle growth",
              "High vegetable content provides vitamins and minerals",
              "Low in saturated fat"
            ]
          },
          {
            name: "Baked Salmon with Sweet Potato",
            type: "dinner",
            calories: Math.round(targetCalories * 0.30),
            protein: Math.round(targetCalories * 0.30 * 0.40 / 4),
            carbs: Math.round(targetCalories * 0.30 * 0.35 / 4),
            fat: Math.round(targetCalories * 0.30 * 0.25 / 9),
            fiber: 6,
            sodium: 300,
            ingredients: [
              { name: "Salmon fillet", amount: "120g" },
              { name: "Sweet potato", amount: "1 medium" },
              { name: "Broccoli", amount: "1 cup" },
              { name: "Olive oil", amount: "1 tsp" },
              { name: "Herbs and spices", amount: "to taste" }
            ],
            instructions: [
              "Preheat oven to 400°F (200°C)",
              "Cut sweet potato into cubes and toss with olive oil",
              "Bake sweet potato for 20 minutes",
              "Season salmon and add to baking sheet",
              "Add broccoli and bake for 15 more minutes",
              "Serve hot"
            ],
            healthBenefits: [
              "Omega-3 fatty acids support heart health",
              "Sweet potato provides complex carbohydrates",
              "Broccoli is rich in vitamins C and K"
            ]
          },
          {
            name: "Greek Yogurt with Nuts",
            type: "snack",
            calories: Math.round(targetCalories * 0.10),
            protein: Math.round(targetCalories * 0.10 * 0.30 / 4),
            carbs: Math.round(targetCalories * 0.10 * 0.40 / 4),
            fat: Math.round(targetCalories * 0.10 * 0.30 / 9),
            fiber: 3,
            sodium: 50,
            ingredients: [
              { name: "Greek yogurt", amount: "1/2 cup" },
              { name: "Mixed nuts", amount: "1 tbsp" },
              { name: "Cinnamon", amount: "pinch" }
            ],
            instructions: [
              "Place yogurt in a bowl",
              "Top with mixed nuts",
              "Sprinkle with cinnamon",
              "Enjoy as a healthy snack"
            ],
            healthBenefits: [
              "Probiotics support digestive health",
              "Healthy fats from nuts",
              "Protein helps maintain satiety"
            ]
          }
        ];

    // Choose meals based on vegetarian preference
    const meals = isVegetarianUser ? vegetarianMeals : nonVegMeals;

    // Return mock diet plan
    const mockDietPlan = {
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
      dietPlan: {
        date: targetDate,
        totalCalories: targetCalories,
        totalProtein: Math.round(targetCalories * 0.25 / 4), // 25% of calories from protein
        totalCarbs: Math.round(targetCalories * 0.45 / 4), // 45% of calories from carbs
        totalFat: Math.round(targetCalories * 0.30 / 9), // 30% of calories from fat
        meals,
        healthNotes: [
          bloodSugar !== 'normal' ? "Monitor blood sugar levels and consider smaller, more frequent meals" : "Maintain stable blood sugar with balanced meals",
          bloodPressure !== 'normal' ? "Keep sodium intake moderate and focus on potassium-rich foods" : "Continue heart-healthy eating patterns",
          goal === 'bulk' ? "Ensure adequate protein intake for muscle growth" : goal === 'cut' ? "Maintain protein to preserve muscle during weight loss" : "Focus on nutrient-dense whole foods"
        ],
        hydrationGoal: "Aim for 8-10 glasses of water daily, more if you're active",
        exerciseRecommendation: goal === 'bulk' ? "Focus on strength training 3-4 times per week" : goal === 'cut' ? "Combine cardio and strength training for optimal fat loss" : "Aim for 150 minutes of moderate exercise per week"
      }
    };

    return NextResponse.json(mockDietPlan);

  } catch (error) {
    console.error("Test diet plan error:", error);
    return NextResponse.json(
      { error: "Failed to generate test diet plan", details: error.message },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for testing
 */
export async function GET() {
  return NextResponse.json({
    message: "Test Diet Planner API",
    description: "Returns a mock diet plan for testing purposes",
    status: "active"
  });
}
