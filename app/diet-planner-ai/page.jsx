"use client";
import React, { useState } from "react";
import Link from "next/link";
import BackButton from "../../components/BackButton";
import Footer from "../../components/Footer";
import Navbar from "@/components/Navbar"; 

/**
 * AI Diet Planner Component
 * Aesthetic: Background color changed to beige and all text/accent colors changed to brown/amber tones.
 */
export default function DietPlannerAI() {
  // State for all form inputs
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "", // cm
    weight: "", // kg
    activityLevel: "moderate",
    fitnessGoal: "maintain",
    dietPreference: "vegetarian",
    bloodSugar: "normal",
    bloodPressure: "normal",
    dietaryRestriction: "",
    allergies: "",
    mealsPerDay: "3",
    duration: "7",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlans, setGeneratedPlans] = useState([]);
  const [error, setError] = useState("");

  // Handler for all input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Helper function to calculate BMI
  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      // Height in meters for BMI calculation
      const heightInM = formData.height / 100;
      return (formData.weight / (heightInM * heightInM)).toFixed(1);
    }
    return null;
  };

  // Helper function to determine BMI category
  const getBMICategory = (bmi) => {
    // Keep standard indicator colors for health status (Blue, Green, Yellow, Red)
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { category: "Normal", color: "text-green-600" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obese", color: "text-red-600" };
  };

  // Mock function to generate a weekly meal plan structure
  const generateWeeklyPlan = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let mealTypes = ["Breakfast", "Lunch", "Dinner"];

    // Adjust meal types based on user input
    if (formData.mealsPerDay === "4") mealTypes.push("Snack");
    if (formData.mealsPerDay === "5") mealTypes.push("Snack", "Evening Snack");

    // Sample meals for variety
    const sampleMeals = {
      Breakfast: ["Oatmeal with berries", "Greek yogurt with granola", "Avocado toast", "Smoothie bowl", "Cereal with milk", "Scrambled eggs", "Pancakes"],
      Lunch: ["Grilled chicken salad", "Quinoa bowl", "Turkey sandwich", "Lentil soup", "Fish with veggies", "Veg stir-fry with rice", "Pasta with sauce"],
      Dinner: ["Salmon with sweet potato", "Chicken curry with rice", "Veg pasta", "Beef stir-fry", "Grilled fish with quinoa", "Tofu with veggies", "Lean meat with salad"],
      Snack: ["Mixed nuts", "Greek yogurt", "Veg sticks with hummus", "Apple with peanut butter", "Protein smoothie"],
      "Evening Snack": ["Herbal tea with crackers", "Small fruit bowl", "Low-fat cheese with crackers"],
    };

    // Use formData.duration to slice the plan length
    const planLength = parseInt(formData.duration) || 7;

    return days.slice(0, planLength).map((day, i) => ({
      day,
      meals: mealTypes.map((mealType) => ({
        type: mealType,
        // Use modulo to cycle through sample meals for variety
        meal: sampleMeals[mealType][i % sampleMeals[mealType].length],
        calories:
          mealType === "Breakfast" ? 400 : mealType === "Lunch" ? 500 : mealType === "Dinner" ? 600 : 200,
      })),
    }));
  };

  // Handles the form submission and generates mock plans
  const handleGeneratePlan = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError("");

    // Input validation: Check if required fields are filled
    if (!formData.age || !formData.gender || !formData.height || !formData.weight) {
        setError("Please fill in all required fields (Age, Gender, Height, Weight).");
        setIsGenerating(false);
        return;
    }

    try {
      // Simulate API call delay (2 seconds)
      await new Promise((resolve) => setTimeout(resolve, 2000)); 

      const goal = formData.fitnessGoal;
      const diet = formData.dietPreference;

      const mockPlan = {
        // Mocked Calorie calculation based on goal 
        dailyCalories:
          goal === "cut" ? 1800 : goal === "bulk" ? 2500 : 2200,
        macros: {
          protein: goal === "bulk" ? "25%" : "20%",
          // Mocked Macro adjustment based on diet preference
          carbs: diet === "keto" ? "10%" : "50%",
          fats: diet === "keto" ? "70%" : "30%",
        },
        weeklyPlan: generateWeeklyPlan(),
        tips: [
          "Drink at least 8 glasses of water daily",
          "Include a variety of colorful fruits and vegetables",
          "Focus on lean protein sources like fish and beans",
          "Plan your meals in advance to avoid impulse eating",
          "Listen to your body's hunger cues and stop when 80% full",
        ],
      };

      // Generate three mock plans for demonstration
      setGeneratedPlans([
        { ...mockPlan, title: "Plan 1 (Balanced)", weeklyPlan: generateWeeklyPlan() },
        { ...mockPlan, title: "Plan 2 (High Protein)", weeklyPlan: generateWeeklyPlan() },
        { ...mockPlan, title: "Plan 3 (Low Carb)", weeklyPlan: generateWeeklyPlan() },
      ]);
    } catch (err) {
      console.error("Generation error:", err);
      setError("Failed to generate diet plan. Please check your inputs and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const bmi = calculateBMI();
  const bmiInfo = bmi ? getBMICategory(bmi) : null;

  return (
     
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8">  
          <header className="bg-base-300 z-50">       
            <Navbar />
          </header>
           <div className="max-w-4xl mx-auto px-4">
             <div className="mb-8 mt-20">
            <div className="relative mt-10">
              <BackButton />
            </div>
          <div className="text-center mt-6">
            <h1 className="text-4xl font-bold text-amber-800 mb-4">
             📋 AI Diet Planner
            </h1>
           
            <p className="text-md text-stone-700 max-w-3xl mx-auto">
              Get a personalized diet plan based on your goals, preferences, and lifestyle!
            </p>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
          {/* ===== Form Section (Column 1 & 2) ===== */}
          <div className="xl:col-span-2">
            {/* Section Title - Stone text */}
            <h2 className="text-xl font-bold text-stone-800 mb-4 px-2">Your Health Profile</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 border border-stone-200">
              <form onSubmit={handleGeneratePlan} className="space-y-6">

                {/* Age & Gender */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    {/* Labels - Stone text */}
                    <label htmlFor="age" className="block text-sm font-semibold text-stone-800 mb-2">Age *</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} placeholder="25" min="16" max="100" 
                      // Input focus ring/border uses Amber accent color
                      className="w-full p-3 border-2 border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-shadow" required/>
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-semibold text-stone-800 mb-2">Gender *</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} 
                      className="w-full p-3 border-2 border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none bg-white transition-shadow" required>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Height & Weight */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="height" className="block text-sm font-semibold text-stone-800 mb-2">Height (cm) *</label>
                    <input type="number" id="height" name="height" value={formData.height} onChange={handleInputChange} placeholder="170" min="140" max="220" 
                      className="w-full p-3 border-2 border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-shadow" required/>
                  </div>
                  <div>
                    <label htmlFor="weight" className="block text-sm font-semibold text-stone-800 mb-2">Weight (kg) *</label>
                    <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="70" min="30" max="200" 
                      className="w-full p-3 border-2 border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-shadow" required/>
                  </div>
                </div>

                {/* BMI Display - Amber accent box */}
                {bmi && (
                  <div className="bg-amber-50 p-4 rounded-lg text-center border border-amber-200">
                    <span className="text-sm font-semibold text-amber-700">Your BMI: </span>
                    <span className="text-xl font-bold text-stone-900">{bmi}</span>
                    <span className={`ml-3 font-bold ${bmiInfo.color}`}>({bmiInfo.category})</span>
                  </div>
                )}

                {/* Activity Level & Fitness Goal */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="activityLevel" className="block text-sm font-semibold text-stone-800 mb-2">Activity Level *</label>
                        <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleInputChange} 
                          className="w-full p-3 border-2 border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none bg-white transition-shadow">
                            <option value="sedentary">Sedentary (little/no exercise)</option>
                            <option value="light">Lightly active (1–3 days/week)</option>
                            <option value="moderate">Moderately active (3–5 days/week)</option>
                            <option value="very-active">Very active (6–7 days/week)</option>
                            <option value="extreme">Extremely active (physical job)</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fitnessGoal" className="block text-sm font-semibold text-stone-800 mb-2">Fitness Goal *</label>
                        <select id="fitnessGoal" name="fitnessGoal" value={formData.fitnessGoal} onChange={handleInputChange} 
                          className="w-full p-3 border-2 border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none bg-white transition-shadow">
                            <option value="cut">Fat Loss (Cut)</option>
                            <option value="bulk">Muscle Gain (Bulk)</option>
                            <option value="maintain">Maintain Current Weight</option>
                            <option value="general">General Health</option>
                        </select>
                    </div>
                </div>

                {/* Diet Preference & Meals per Day */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="dietPreference" className="block text-sm font-semibold text-stone-800 mb-2">Diet Preference *</label>
                        <select id="dietPreference" name="dietPreference" value={formData.dietPreference} onChange={handleInputChange} 
                          className="w-full p-3 border-2 border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none bg-white transition-shadow">
                            <option value="non-vegetarian">Non-Vegetarian</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="eggetarian">Eggetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="keto">Keto</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="mealsPerDay" className="block text-sm font-semibold text-stone-800 mb-2">Meals per Day</label>
                        <select id="mealsPerDay" name="mealsPerDay" value={formData.mealsPerDay} onChange={handleInputChange} 
                          className="w-full p-3 border-2 border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none bg-white transition-shadow">
                            <option value="3">3 (Breakfast, Lunch, Dinner)</option>
                            <option value="4">4 (+ Snack)</option>
                            <option value="5">5 (+ Snack, Evening Snack)</option>
                        </select>
                    </div>
                </div>

                {/* Health Conditions (Blood Sugar/Pressure) */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="bloodSugar" className="block text-sm font-semibold text-stone-800 mb-2">Blood Sugar Level</label>
                        <select id="bloodSugar" name="bloodSugar" value={formData.bloodSugar} onChange={handleInputChange} 
                          className="w-full p-3 border-2 border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none bg-white transition-shadow">
                            <option value="normal">Normal</option>
                            <option value="prediabetic">Prediabetic</option>
                            <option value="diabetic">Diabetic</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="bloodPressure" className="block text-sm font-semibold text-stone-800 mb-2">Blood Pressure</label>
                        <select id="bloodPressure" name="bloodPressure" value={formData.bloodPressure} onChange={handleInputChange} 
                          className="w-full p-3 border-2 border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none bg-white transition-shadow">
                            <option value="normal">Normal</option>
                            <option value="elevated">Elevated</option>
                            <option value="high-stage1">High Stage 1</option>
                            <option value="high-stage2">High Stage 2</option>
                        </select>
                    </div>
                </div>

                {/* Dietary Restrictions & Allergies */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="dietaryRestriction" className="block text-sm font-semibold text-stone-800 mb-2">Dietary Restrictions (comma-separated)</label>
                        <input type="text" id="dietaryRestriction" name="dietaryRestriction" value={formData.dietaryRestriction} onChange={handleInputChange} placeholder="e.g., lactose intolerant, low sodium" 
                          className="w-full p-3 border-2 border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-shadow"/>
                    </div>
                    <div>
                        <label htmlFor="allergies" className="block text-sm font-semibold text-stone-800 mb-2">Allergies (comma-separated)</label>
                        <input type="text" id="allergies" name="allergies" value={formData.allergies} onChange={handleInputChange} placeholder="e.g., peanuts, shellfish" 
                          className="w-full p-3 border-2 border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-shadow"/>
                    </div>
                </div>

                {/* Plan Duration */}
                <div>
                    <label htmlFor="duration" className="block text-sm font-semibold text-stone-800 mb-2">Plan Duration (days)</label>
                    <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} min="1" max="30" placeholder="7" 
                      className="w-full p-3 border-2 border-stone-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-shadow"/>
                </div>

                {/* Generate Button - Brown/Amber Gradient CTA */}
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-amber-700 to-orange-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:from-amber-800 hover:to-orange-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.005]"
                >
                  {isGenerating ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating Your Personalized Plan...
                    </span>
                  ) : (
                    "🎯 Generate My Diet Plan"
                  )}
                </button>
                <div className="text-center mt-4">
                  {/* Mock buttons for demoing the look of the toggles/switches in the image */}
                  <div className="flex justify-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <label htmlFor="test-api-switch" className="text-stone-700">Use Test API (for demo)</label>
                        <input type="checkbox" id="test-api-switch" 
                          // Toggle switch uses Amber accent
                          className="form-switch h-5 w-10 appearance-none bg-stone-300 rounded-full transition-colors duration-200 ease-in-out cursor-pointer checked:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label htmlFor="veg-mode-switch" className="text-stone-700">Vegetarian Mode</label>
                        <input type="checkbox" id="veg-mode-switch" 
                          // Toggle switch uses Amber accent
                          className="form-switch h-5 w-10 appearance-none bg-stone-300 rounded-full transition-colors duration-200 ease-in-out cursor-pointer checked:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                      </div>
                  </div>
                </div>
                {error && <p className="text-red-500 text-center font-medium mt-4">{error}</p>}
              </form>
            </div>
          </div>

          {/* ===== Display Generated Plans (Column 3) ===== */}
          <div className="xl:col-span-1">
            {/* Section Title - Stone text */}
            <h2 className="text-xl font-bold text-stone-800 mb-4 px-2">Your Personalized Diet Plan</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8 border border-stone-200">
              {generatedPlans.length === 0 ? (
                <div className="text-center p-10 bg-amber-50 rounded-lg border border-amber-200">
                    {/* Placeholder content and icon using Amber/Stone theme */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-500 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm0-4H9V7h2v6zm5-1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S13.67 11 14.5 11s1.5.67 1.5 1.5z"/></svg>
                    <p className="text-amber-700 font-medium">✨ Fill out your health profile to get your personalized diet plan!</p>
                </div>
              ) : (
                generatedPlans.map((plan, idx) => (
                  <div key={idx} className="mb-6 border-b pb-4 last:border-b-0">
                    {/* Plan titles - Amber accent color */}
                    <h3 className="text-lg font-bold text-amber-800 mb-2">{plan.title}</h3>
                    {/* Macro box - Amber accent theme */}
                    <div className="space-y-1 text-sm text-stone-700 mb-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <p><span className="font-semibold">Daily Calories:</span> {plan.dailyCalories} kcal</p>
                        <p><span className="font-semibold">Macros:</span> Protein: {plan.macros.protein}, Carbs: {plan.macros.carbs}, Fats: {plan.macros.fats}</p>
                    </div>

                    <div className="mt-4">
                      {/* H4 titles - Amber accent color */}
                      <h4 className="font-bold text-amber-800 mb-2">📅 Weekly Plan Overview:</h4>
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {plan.weeklyPlan.map((day) => (
                          <div key={day.day} className="border border-stone-200 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                            <strong className="block text-stone-800 mb-1">{day.day}</strong>
                            {day.meals.map((meal, i) => (
                              <div key={i} className="text-xs text-stone-700">
                                {/* Meal type accent color - Amber */}
                                <span className="font-medium text-amber-700">{meal.type}:</span> {meal.meal} ({meal.calories} kcal)
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                        {/* H4 titles - Amber accent color */}
                        <h4 className="font-bold text-amber-800 mb-2">💡 Nutrition Tips:</h4>
                        <ul className="list-disc list-inside text-sm text-stone-700 space-y-1 ml-4">
                            {plan.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                        </ul>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}



// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import BackButton from "../../components/BackButton";

// export default function DietPlannerAI() {
//   const [formData, setFormData] = useState({
//     age: "",
//     gender: "",
//     height: "",
//     weight: "",
//     activityLevel: "moderate",
//     goal: "maintain",
//     dietType: "balanced",
//     allergies: "",
//     mealsPerDay: "3",
//     duration: "7"
//   });
  
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generatedPlan, setGeneratedPlan] = useState(null);
//   const [error, setError] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const calculateBMI = () => {
//     if (formData.height && formData.weight) {
//       const heightInM = formData.height / 100;
//       const bmi = (formData.weight / (heightInM * heightInM)).toFixed(1);
//       return bmi;
//     }
//     return null;
//   };

//   const getBMICategory = (bmi) => {
//     if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
//     if (bmi < 25) return { category: "Normal", color: "text-green-600" };
//     if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" };
//     return { category: "Obese", color: "text-red-600" };
//   };

//   const handleGeneratePlan = async (e) => {
//     e.preventDefault();
//     setIsGenerating(true);
//     setError("");
    
//     try {
//       // Simulated API call
//       await new Promise(resolve => setTimeout(resolve, 3000));
      
//       // Mock diet plan generation
//       const mockPlan = {
//         dailyCalories: formData.goal === "lose" ? 1800 : formData.goal === "gain" ? 2500 : 2200,
//         macros: {
//           protein: formData.goal === "gain" ? "25%" : "20%",
//           carbs: formData.dietType === "keto" ? "10%" : "50%",
//           fats: formData.dietType === "keto" ? "70%" : "30%"
//         },
//         weeklyPlan: generateWeeklyPlan(),
//         tips: [
//           "Drink at least 8 glasses of water daily",
//           "Include a variety of colorful fruits and vegetables",
//           "Eat slowly and mindfully",
//           "Plan your meals in advance",
//           "Listen to your body's hunger cues"
//         ]
//       };
      
//       setGeneratedPlan(mockPlan);
//     } catch (err) {
//       setError("Failed to generate diet plan. Please try again.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const generateWeeklyPlan = () => {
//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
//     const mealTypes = ["Breakfast", "Lunch", "Dinner"];
//     if (formData.mealsPerDay === "4") mealTypes.push("Snack");
//     if (formData.mealsPerDay === "5") mealTypes.push("Snack", "Evening Snack");

//     const sampleMeals = {
//       Breakfast: [
//         "Oatmeal with berries and nuts",
//         "Greek yogurt with honey and granola",
//         "Avocado toast with eggs",
//         "Smoothie bowl with fruits",
//         "Whole grain cereal with milk",
//         "Scrambled eggs with vegetables",
//         "Pancakes with fruit topping"
//       ],
//       Lunch: [
//         "Grilled chicken salad",
//         "Quinoa bowl with vegetables",
//         "Turkey sandwich with veggies",
//         "Lentil soup with bread",
//         "Fish with roasted vegetables",
//         "Vegetable stir-fry with rice",
//         "Pasta with tomato sauce"
//       ],
//       Dinner: [
//         "Salmon with sweet potato",
//         "Chicken curry with rice",
//         "Vegetable pasta",
//         "Beef stir-fry with noodles",
//         "Grilled fish with quinoa",
//         "Tofu with vegetables",
//         "Lean meat with salad"
//       ],
//       Snack: [
//         "Mixed nuts and fruits",
//         "Greek yogurt",
//         "Vegetable sticks with hummus",
//         "Apple with peanut butter",
//         "Protein smoothie"
//       ],
//       "Evening Snack": [
//         "Herbal tea with crackers",
//         "Small fruit bowl",
//         "Low-fat cheese with crackers"
//       ]
//     };

//     return days.map((day, dayIndex) => ({
//       day,
//       meals: mealTypes.map(mealType => ({
//         type: mealType,
//         meal: sampleMeals[mealType][dayIndex % sampleMeals[mealType].length],
//         calories: mealType === "Breakfast" ? 400 : 
//                  mealType === "Lunch" ? 500 : 
//                  mealType === "Dinner" ? 600 : 200
//       }))
//     }));
//   };

//   const bmi = calculateBMI();
//   const bmiInfo = bmi ? getBMICategory(bmi) : null;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Header */}
//         <div className="mb-8">
//           <BackButton />
//           <div className="text-center mt-6">
//             <h1 className="text-4xl font-bold text-green-800 mb-4">
//               📋 AI Diet Planner
//             </h1>
//             <p className="text-lg text-green-700 max-w-3xl mx-auto">
//               Get a personalized diet plan based on your goals, preferences, and lifestyle!
//             </p>
//           </div>
//         </div>

//         <div className="grid xl:grid-cols-3 gap-8">
//           {/* Diet Planner Form */}
//           <div className="xl:col-span-2">
//             <div className="bg-white rounded-2xl shadow-xl p-8">
//               <h2 className="text-2xl font-bold text-green-800 mb-6">Personal Information</h2>
              
//               <form onSubmit={handleGeneratePlan} className="space-y-6">
//                 {/* Basic Info */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="age" className="block text-sm font-semibold text-green-700 mb-2">
//                       Age *
//                     </label>
//                     <input
//                       type="number"
//                       id="age"
//                       name="age"
//                       value={formData.age}
//                       onChange={handleInputChange}
//                       placeholder="25"
//                       min="16"
//                       max="100"
//                       className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="gender" className="block text-sm font-semibold text-green-700 mb-2">
//                       Gender *
//                     </label>
//                     <select
//                       id="gender"
//                       name="gender"
//                       value={formData.gender}
//                       onChange={handleInputChange}
//                       className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
//                       required
//                     >
//                       <option value="">Select Gender</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Height and Weight */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="height" className="block text-sm font-semibold text-green-700 mb-2">
//                       Height (cm) *
//                     </label>
//                     <input
//                       type="number"
//                       id="height"
//                       name="height"
//                       value={formData.height}
//                       onChange={handleInputChange}
//                       placeholder="170"
//                       min="140"
//                       max="220"
//                       className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="weight" className="block text-sm font-semibold text-green-700 mb-2">
//                       Weight (kg) *
//                     </label>
//                     <input
//                       type="number"
//                       id="weight"
//                       name="weight"
//                       value={formData.weight}
//                       onChange={handleInputChange}
//                       placeholder="70"
//                       min="30"
//                       max="200"
//                       className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* BMI Display */}
//                 {bmi && (
//                   <div className="bg-green-50 p-4 rounded-lg">
//                     <div className="text-center">
//                       <span className="text-sm font-semibold text-green-700">Your BMI: </span>
//                       <span className="text-lg font-bold text-green-800">{bmi}</span>
//                       <span className={`ml-2 font-semibold ${bmiInfo.color}`}>
//                         ({bmiInfo.category})
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 {/* Activity Level */}
//                 <div>
//                   <label htmlFor="activityLevel" className="block text-sm font-semibold text-green-700 mb-2">
//                     Activity Level *
//                   </label>
//                   <select
//                     id="activityLevel"
//                     name="activityLevel"
//                     value={formData.activityLevel}
//                     onChange={handleInputChange}
//                     className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
//                   >
//                     <option value="sedentary">Sedentary (little/no exercise)</option>
//                     <option value="light">Light (1-3 days/week)</option>
//                     <option value="moderate">Moderate (3-5 days/week)</option>
//                     <option value="active">Active (6-7 days/week)</option>
//                     <option value="very-active">Very Active (2x/day or intense)</option>
//                   </select>
//                 </div>

//                 {/* Goal */}
//                 <div>
//                   <label className="block text-sm font-semibold text-green-700 mb-3">
//                     Primary Goal *
//                   </label>
//                   <div className="grid grid-cols-3 gap-4">
//                     {[
//                       { value: "lose", label: "Lose Weight", icon: "📉" },
//                       { value: "maintain", label: "Maintain", icon: "⚖️" },
//                       { value: "gain", label: "Gain Weight", icon: "📈" }
//                     ].map((goal) => (
//                       <label key={goal.value} className={`cursor-pointer p-4 border-2 rounded-lg text-center transition-all ${
//                         formData.goal === goal.value 
//                           ? 'border-green-500 bg-green-50' 
//                           : 'border-green-200 hover:border-green-300'
//                       }`}>
//                         <input
//                           type="radio"
//                           name="goal"
//                           value={goal.value}
//                           checked={formData.goal === goal.value}
//                           onChange={handleInputChange}
//                           className="sr-only"
//                         />
//                         <div className="text-2xl mb-2">{goal.icon}</div>
//                         <div className="font-semibold text-green-700">{goal.label}</div>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Diet Type */}
//                 <div>
//                   <label htmlFor="dietType" className="block text-sm font-semibold text-green-700 mb-2">
//                     Diet Type *
//                   </label>
//                   <select
//                     id="dietType"
//                     name="dietType"
//                     value={formData.dietType}
//                     onChange={handleInputChange}
//                     className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
//                   >
//                     <option value="balanced">Balanced Diet</option>
//                     <option value="vegetarian">Vegetarian</option>
//                     <option value="vegan">Vegan</option>
//                     <option value="keto">Ketogenic</option>
//                     <option value="paleo">Paleo</option>
//                     <option value="mediterranean">Mediterranean</option>
//                     <option value="low-carb">Low Carb</option>
//                     <option value="high-protein">High Protein</option>
//                   </select>
//                 </div>

//                 {/* Allergies */}
//                 <div>
//                   <label htmlFor="allergies" className="block text-sm font-semibold text-green-700 mb-2">
//                     Food Allergies / Restrictions
//                   </label>
//                   <textarea
//                     id="allergies"
//                     name="allergies"
//                     value={formData.allergies}
//                     onChange={handleInputChange}
//                     placeholder="e.g., nuts, dairy, gluten, shellfish..."
//                     className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none resize-none"
//                     rows="3"
//                   />
//                 </div>

//                 {/* Meals and Duration */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="mealsPerDay" className="block text-sm font-semibold text-green-700 mb-2">
//                       Meals per Day
//                     </label>
//                     <select
//                       id="mealsPerDay"
//                       name="mealsPerDay"
//                       value={formData.mealsPerDay}
//                       onChange={handleInputChange}
//                       className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
//                     >
//                       <option value="3">3 Meals</option>
//                       <option value="4">4 Meals (+ 1 Snack)</option>
//                       <option value="5">5 Meals (+ 2 Snacks)</option>
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label htmlFor="duration" className="block text-sm font-semibold text-green-700 mb-2">
//                       Plan Duration
//                     </label>
//                     <select
//                       id="duration"
//                       name="duration"
//                       value={formData.duration}
//                       onChange={handleInputChange}
//                       className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
//                     >
//                       <option value="3">3 Days</option>
//                       <option value="7">1 Week</option>
//                       <option value="14">2 Weeks</option>
//                       <option value="30">1 Month</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Error Message */}
//                 {error && (
//                   <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
//                     {error}
//                   </div>
//                 )}

//                 {/* Generate Button */}
//                 <button
//                   type="submit"
//                   disabled={isGenerating || !formData.age || !formData.gender || !formData.height || !formData.weight}
//                   className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-4 px-6 rounded-lg hover:from-green-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
//                 >
//                   {isGenerating ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       Generating Your Diet Plan...
//                     </>
//                   ) : (
//                     <>
//                       🎯 Generate My Diet Plan
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Generated Diet Plan Display */}
//           <div className="xl:col-span-1">
//             <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
//               <h2 className="text-2xl font-bold text-green-800 mb-6">Your Diet Plan</h2>
              
//               {!generatedPlan ? (
//                 <div className="text-center py-8">
//                   <div className="text-6xl mb-4">🥗</div>
//                   <p className="text-green-600 text-lg">
//                     Fill in your information to generate a personalized diet plan!
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   {/* Daily Calories */}
//                   <div className="bg-green-50 p-4 rounded-lg text-center">
//                     <h3 className="font-bold text-green-800 text-lg">Daily Target</h3>
//                     <p className="text-2xl font-bold text-green-600">{generatedPlan.dailyCalories} kcal</p>
//                   </div>

//                   {/* Macros */}
//                   <div className="space-y-3">
//                     <h4 className="font-bold text-green-800">Macro Distribution:</h4>
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span className="text-green-700">🥩 Protein:</span>
//                         <span className="font-semibold">{generatedPlan.macros.protein}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-green-700">🍞 Carbs:</span>
//                         <span className="font-semibold">{generatedPlan.macros.carbs}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-green-700">🥑 Fats:</span>
//                         <span className="font-semibold">{generatedPlan.macros.fats}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Tips */}
//                   <div className="space-y-3">
//                     <h4 className="font-bold text-green-800">💡 Quick Tips:</h4>
//                     <ul className="space-y-2 text-sm">
//                       {generatedPlan.tips.slice(0, 3).map((tip, index) => (
//                         <li key={index} className="flex items-start gap-2 text-green-700">
//                           <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
//                           {tip}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="space-y-3">
//                     <button className="w-full bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors">
//                       📱 Download Plan
//                     </button>
//                     <button className="w-full bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors">
//                       📧 Email Plan
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Weekly Plan Display */}
//         {generatedPlan && (
//           <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
//             <h3 className="text-2xl font-bold text-green-800 mb-8 text-center">📅 Your Weekly Meal Plan</h3>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-6">
//               {generatedPlan.weeklyPlan.map((day) => (
//                 <div key={day.day} className="border border-green-200 rounded-lg p-4">
//                   <h4 className="font-bold text-green-800 text-center mb-4">{day.day}</h4>
//                   <div className="space-y-3">
//                     {day.meals.map((meal, index) => (
//                       <div key={index} className="text-center">
//                         <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">
//                           {meal.type}
//                         </div>
//                         <div className="text-sm text-green-700 mt-1">
//                           {meal.meal}
//                         </div>
//                         <div className="text-xs text-green-500">
//                           {meal.calories} kcal
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
