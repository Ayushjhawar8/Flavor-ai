"use client";
import React, { useState } from "react";
// Removed Next.js specific import that caused the compilation error.
// import { useRouter } from 'next/navigation'; 
import axios from "axios";
import { FaReact } from "react-icons/fa";
import { useRouter } from "next/navigation";




/**
 * AI Diet Planner Component
 * Aesthetic: Background color changed to beige and all text/accent colors changed to brown/amber tones.
 */
export default function DietPlannerAI() {

  const router=useRouter();
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
  // State expects an array of plans, as per the JSX map logic below
  const [generatedPlans, setGeneratedPlans] = useState([]); 
  const [error, setError] = useState("");
   // Using the mocked router

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
      // API call to the backend
      // NOTE: In a real app, you would swap axios.post with a fetch call to the Gemini API here
      const response = await axios.post('/api/diet-ai', formData);

      console.log("Response received from the backend API.",response.data);
      
      if (response.data && response.data.response) {
        const rawPlan = response.data.response; // This is the object { totalDailyCalories, macros, ... }
        
        let normalizedPlans = [];
        
        // --- START FIX: Normalize response to match the new API structure (v2) ---
        if (typeof rawPlan === 'object' && rawPlan !== null && rawPlan.totalDailyCalories) {
            // Map the new field names/types to the structure the JSX expects:
            const normalizedPlan = {
                // The new API doesn't provide a title, so we set a default one
                title: "Personalized Diet Plan", 
                dailyCalories: `${rawPlan.totalDailyCalories} kcal`,
                macros: {
                    protein: `${rawPlan.macros?.proteinPercent}%`,
                    carbs: `${rawPlan.macros?.carbsPercent}%`,
                    fats: `${rawPlan.macros?.fatPercent}%`,
                },
                // The weeklyPlan structure is mostly compatible, but meal content is in 'items' array
                weeklyPlan: rawPlan.weeklyPlan || [],
                // The tips array is now named 'nutritionTips'
                tips: rawPlan.nutritionTips || [],
            };
            normalizedPlans.push(normalizedPlan);
        } else {
            throw new Error("Invalid plan data structure returned from the API.");
        }
        
        setGeneratedPlans(normalizedPlans);
        // --- END FIX ---
        
      } else {
        throw new Error("API call succeeded but returned invalid response (missing 'response' property).");
      }
      
    } catch (err) {
      console.error("Generation error:", err);
      const errorMessage = err.response?.data?.error || err.message || "Failed to generate diet plan. Please check your inputs and try again.";
      setError(errorMessage);
      setGeneratedPlans([]); // Clear plans on error
    } finally {
      setIsGenerating(false);
    }
  };

  const bmi = calculateBMI();
  const bmiInfo = bmi ? getBMICategory(bmi) : null;

  return (
  // Use theme-aware background and inherit global font from layout
  <div className="min-h-screen bg-base-100 dark:bg-base-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          {/* Back Button - Brown accent color */}
          <div className="text-left mb-4">
            <button type="button" onClick={() => router.push('/')} className="flex items-center text-amber-700 hover:text-amber-900 font-semibold p-2 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div> 
          
          <div className="text-center mt-6">
            {/* Title */}
            <h1 className="text-4xl font-extrabold text-base-content mb-4 tracking-tight">📋 AI Diet Planner</h1>
            {/* Subtitle */}
            <p className="text-md text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Get a personalized diet plan based on your goals, preferences, and lifestyle!
            </p>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
          {/* ===== Form Section (Column 1 & 2) ===== */}
          <div className="xl:col-span-2">
            {/* Section Title */}
            <h2 className="text-xl font-bold text-base-content mb-4 px-2">Your Health Profile</h2>
            <div className="bg-base-100 dark:bg-base-800 rounded-xl shadow-lg p-8 border border-base-300 dark:border-base-700">
              <form onSubmit={handleGeneratePlan} className="space-y-6">

                {/* Age & Gender */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    {/* Labels - Stone text */}
                    <label htmlFor="age" className="block text-sm font-semibold text-base-content mb-2">Age *</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} placeholder="25" min="16" max="100" 
                      // Input focus ring/border uses Amber accent color
                      className="w-full p-3 border-2 border-base-300 dark:border-base-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-shadow bg-white dark:bg-gray-800" required/>
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-semibold text-base-content mb-2">Gender *</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} 
                      className="w-full p-3 border-2 border-base-300 dark:border-base-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none bg-white dark:bg-gray-800 transition-shadow" required>
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
                    <label htmlFor="height" className="block text-sm font-semibold text-base-content mb-2">Height (cm) *</label>
                    <input type="number" id="height" name="height" value={formData.height} onChange={handleInputChange} placeholder="170" min="140" max="220" 
                      className="w-full p-3 border-2 border-base-300 dark:border-base-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-shadow bg-white dark:bg-gray-800" required/>
                  </div>
                  <div>
                    <label htmlFor="weight" className="block text-sm font-semibold text-base-content mb-2">Weight (kg) *</label>
                    <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="70" min="30" max="200" 
                      className="w-full p-3 border-2 border-base-300 dark:border-base-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-shadow bg-white dark:bg-gray-800" required/>
                  </div>
                </div>

                {/* BMI Display - Amber accent box */}
                {bmi && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-center border border-amber-200 dark:border-amber-800">
                    <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">Your BMI: </span>
                    <span className="text-xl font-bold text-base-content">{bmi}</span>
                    <span className={`ml-3 font-bold ${bmiInfo.color}`}>({bmiInfo.category})</span>
                  </div>
                )}

                {/* Activity Level & Fitness Goal */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="activityLevel" className="block text-sm font-semibold text-base-content mb-2">Activity Level *</label>
                        <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleInputChange} 
                          className="w-full p-3 border-2 border-base-300 dark:border-base-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none bg-white dark:bg-gray-800 transition-shadow">
                            <option value="sedentary">Sedentary (little/no exercise)</option>
                            <option value="light">Lightly active (1–3 days/week)</option>
                            <option value="moderate">Moderately active (3–5 days/week)</option>
                            <option value="very-active">Very active (6–7 days/week)</option>
                            <option value="extreme">Extremely active (physical job)</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fitnessGoal" className="block text-sm font-semibold text-base-content mb-2">Fitness Goal *</label>
                        <select id="fitnessGoal" name="fitnessGoal" value={formData.fitnessGoal} onChange={handleInputChange} 
                          className="w-full p-3 border-2 border-base-300 dark:border-base-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none bg-white dark:bg-gray-800 transition-shadow">
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
                        <label htmlFor="dietPreference" className="block text-sm font-semibold text-base-content mb-2">Diet Preference *</label>
                        <select id="dietPreference" name="dietPreference" value={formData.dietPreference} onChange={handleInputChange} 
                          className="w-full p-3 border-2 border-base-300 dark:border-base-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none bg-white dark:bg-gray-800 transition-shadow">
                            <option value="non-vegetarian">Non-Vegetarian</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="eggetarian">Eggetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="keto">Keto</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="mealsPerDay" className="block text-sm font-semibold text-base-content mb-2">Meals per Day</label>
                        <select id="mealsPerDay" name="mealsPerDay" value={formData.mealsPerDay} onChange={handleInputChange} 
                          className="w-full p-3 border-2 border-base-300 dark:border-base-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none bg-white dark:bg-gray-800 transition-shadow">
                            <option value="3">3 (Breakfast, Lunch, Dinner)</option>
                            <option value="4">4 (+ Snack)</option>
                            <option value="5">5 (+ Snack, Evening Snack)</option>
                        </select>
                    </div>
                </div>

                {/* Health Conditions (Blood Sugar/Pressure) */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="bloodSugar" className="block text-sm font-semibold text-base-content mb-2">Blood Sugar Level</label>
                        <select id="bloodSugar" name="bloodSugar" value={formData.bloodSugar} onChange={handleInputChange} 
                          className="w-full p-3 border-2 border-base-300 dark:border-base-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none bg-white dark:bg-gray-800 transition-shadow">
                            <option value="normal">Normal</option>
                            <option value="prediabetic">Prediabetic</option>
                            <option value="diabetic">Diabetic</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="bloodPressure" className="block text-sm font-semibold text-base-content mb-2">Blood Pressure</label>
                        <select id="bloodPressure" name="bloodPressure" value={formData.bloodPressure} onChange={handleInputChange} 
                          className="w-full p-3 border-2 border-base-300 dark:border-base-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none bg-white dark:bg-gray-800 transition-shadow">
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
                        <label htmlFor="dietaryRestriction" className="block text-sm font-semibold text-base-content mb-2">Dietary Restrictions (comma-separated)</label>
                        <input type="text" id="dietaryRestriction" name="dietaryRestriction" value={formData.dietaryRestriction} onChange={handleInputChange} placeholder="e.g., lactose intolerant, low sodium" 
                          className="w-full p-3 border-2 border-base-300 dark:border-base-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-shadow bg-white dark:bg-gray-800"/>
                    </div>
                    <div>
                        <label htmlFor="allergies" className="block text-sm font-semibold text-base-content mb-2">Allergies (comma-separated)</label>
                        <input type="text" id="allergies" name="allergies" value={formData.allergies} onChange={handleInputChange} placeholder="e.g., peanuts, shellfish" 
                          className="w-full p-3 border-2 border-base-300 dark:border-base-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-shadow bg-white dark:bg-gray-800"/>
                    </div>
                </div>

                {/* Plan Duration */}
                <div>
                    <label htmlFor="duration" className="block text-sm font-semibold text-base-content mb-2">Plan Duration (days)</label>
                    <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} min="1" max="30" placeholder="7" 
                      className="w-full p-3 border-2 border-base-300 dark:border-base-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-shadow bg-white dark:bg-gray-800"/>
                </div>

                {/* Generate Button - Brown/Amber Gradient CTA */}
                <button
  type="submit"
  disabled={isGenerating}
  className={`relative w-full text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-500 transform ${
    isGenerating
      ? "bg-gradient-to-r from-amber-600 to-orange-700 opacity-90 cursor-wait animate-pulse"
      : "bg-gradient-to-r from-amber-700 to-orange-800 hover:from-amber-800 hover:to-orange-900 hover:scale-[1.02]"
  }`}
>
  {isGenerating ? (
    <span className="flex flex-col items-center justify-center gap-2">
      <span className="flex items-center justify-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0
            c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Generating Your Personalized Plan...
      </span>
      <p className="text-xs text-amber-100 italic animate-pulse">
        This may take a few moments — hang tight while we create your custom diet!
      </p>
    </span>
  ) : (
    <span className="flex items-center justify-center gap-2">
      <span role="img" aria-label="target" className=" animate-[spin_3s_linear_infinite] drop-shadow-md"><FaReact className="h-6 w-6"/></span>
      Generate My Diet Plan
    </span>
  )}
</button>

                <div className="text-center mt-4">
                  {/* Mock buttons for demoing the look of the toggles/switches in the image */}
                  <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            {/* <label htmlFor="test-api-switch" className="text-base-content">Use Test API (for demo)</label>
                        <input type="checkbox" id="test-api-switch" 
                          // Toggle switch uses Amber accent
                          className="form-switch h-5 w-10 appearance-none bg-stone-300 rounded-full transition-colors duration-200 ease-in-out cursor-pointer checked:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                      </div> */}
                      {/* <div className="flex items-center space-x-2">
                        <label htmlFor="veg-mode-switch" className="text-base-content">Vegetarian Mode</label>
                        <input type="checkbox" id="veg-mode-switch" 
                          // Toggle switch uses Amber accent
                          className="form-switch h-5 w-10 appearance-none bg-stone-300 rounded-full transition-colors duration-200 ease-in-out cursor-pointer checked:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                       </div> */}

                       </div>
                  </div>
                </div>
                {error && <p className="text-red-500 text-center font-medium mt-4">{error}</p>}
              </form>
            </div>
          </div>

          {/* ===== Display Generated Plans (Column 3) ===== */}
          <div className="xl:col-span-1">
            {/* Section Title */}
            <h2 className="text-xl font-bold text-base-content mb-4 px-2">Your Personalized Diet Plan</h2>
            <div className="bg-base-100 dark:bg-base-800 rounded-xl shadow-lg p-8 sticky top-8 border border-base-300 dark:border-base-700">
                {generatedPlans.length === 0 ? (
        <div className="text-center p-10 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          {/* Placeholder content and icon using Amber/Stone theme */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-500 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm0-4H9V7h2v6zm5-1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S13.67 11 14.5 11s1.5.67 1.5 1.5z"/></svg>
          <p className="text-amber-700 dark:text-amber-300 font-medium">✨ Fill out your health profile to get your personalized diet plan!</p>
                </div>
              ) : (
                generatedPlans.map((plan, idx) => (
                  <div key={idx} className="mb-6 border-b pb-4 last:border-b-0">
                    {/* Plan titles - Amber accent color */}
                    <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-2">{plan.title}</h3>
                    {/* Macro box - Amber accent theme */}
          <div className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300 mb-3 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800">
                        {/* Daily Calories are now correctly mapped from 'totalDailyCalories' */}
                        <p><span className="font-semibold">Daily Calories:</span> {plan.dailyCalories}</p>
                        {/* Macros are now correctly mapped from 'proteinPercent', etc. */}
                        <p><span className="font-semibold">Macros:</span> Protein: {plan.macros.protein}, Carbs: {plan.macros.carbs}, Fats: {plan.macros.fats}</p>
                    </div>

                    <div className="mt-4">
                      {/* H4 titles - Amber accent color */}
                      <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">📅 Weekly Plan Overview:</h4>
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {plan.weeklyPlan.map((day) => (
                          <div key={day.day} className="border border-base-300 dark:border-base-700 p-3 rounded-lg bg-base-100 dark:bg-base-800 shadow-sm hover:shadow-md transition-shadow">
                            <strong className="block text-base-content mb-1">{day.day}</strong>
                            {day.meals.map((meal, i) => (
                              <div key={i} className="text-xs text-neutral-700 dark:text-neutral-300">
                                {/* meal.meal is the type (Breakfast, Lunch) in the new structure */}
                                <span className="font-medium text-amber-700 dark:text-amber-300">{meal.meal}:</span> 
                                {/* Display meal items by joining the 'items' array */}
                                <span className="ml-1">{meal.items.join(', ')}</span> 
                                <span className="text-neutral-500"> ({meal.calories})</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                        {/* H4 titles - Amber accent color */}
                        <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">💡 Nutrition Tips:</h4>
            {/* The tips are now correctly mapped from 'nutritionTips' */}
            <ul className="list-disc list-inside text-sm text-neutral-700 dark:text-neutral-300 space-y-1 ml-4">
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
    </div>
  );
}
