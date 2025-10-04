"use client";
import React, { useState } from "react";
import Link from "next/link";
import BackButton from "../../components/BackButton";

export default function DietPlannerAI() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "moderate",
    goal: "maintain",
    dietType: "balanced",
    allergies: "",
    mealsPerDay: "3",
    duration: "7"
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInM = formData.height / 100;
      const bmi = (formData.weight / (heightInM * heightInM)).toFixed(1);
      return bmi;
    }
    return null;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { category: "Normal", color: "text-green-600" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obese", color: "text-red-600" };
  };

  const handleGeneratePlan = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError("");
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock diet plan generation
      const mockPlan = {
        dailyCalories: formData.goal === "lose" ? 1800 : formData.goal === "gain" ? 2500 : 2200,
        macros: {
          protein: formData.goal === "gain" ? "25%" : "20%",
          carbs: formData.dietType === "keto" ? "10%" : "50%",
          fats: formData.dietType === "keto" ? "70%" : "30%"
        },
        weeklyPlan: generateWeeklyPlan(),
        tips: [
          "Drink at least 8 glasses of water daily",
          "Include a variety of colorful fruits and vegetables",
          "Eat slowly and mindfully",
          "Plan your meals in advance",
          "Listen to your body's hunger cues"
        ]
      };
      
      setGeneratedPlan(mockPlan);
    } catch (err) {
      setError("Failed to generate diet plan. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateWeeklyPlan = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mealTypes = ["Breakfast", "Lunch", "Dinner"];
    if (formData.mealsPerDay === "4") mealTypes.push("Snack");
    if (formData.mealsPerDay === "5") mealTypes.push("Snack", "Evening Snack");

    const sampleMeals = {
      Breakfast: [
        "Oatmeal with berries and nuts",
        "Greek yogurt with honey and granola",
        "Avocado toast with eggs",
        "Smoothie bowl with fruits",
        "Whole grain cereal with milk",
        "Scrambled eggs with vegetables",
        "Pancakes with fruit topping"
      ],
      Lunch: [
        "Grilled chicken salad",
        "Quinoa bowl with vegetables",
        "Turkey sandwich with veggies",
        "Lentil soup with bread",
        "Fish with roasted vegetables",
        "Vegetable stir-fry with rice",
        "Pasta with tomato sauce"
      ],
      Dinner: [
        "Salmon with sweet potato",
        "Chicken curry with rice",
        "Vegetable pasta",
        "Beef stir-fry with noodles",
        "Grilled fish with quinoa",
        "Tofu with vegetables",
        "Lean meat with salad"
      ],
      Snack: [
        "Mixed nuts and fruits",
        "Greek yogurt",
        "Vegetable sticks with hummus",
        "Apple with peanut butter",
        "Protein smoothie"
      ],
      "Evening Snack": [
        "Herbal tea with crackers",
        "Small fruit bowl",
        "Low-fat cheese with crackers"
      ]
    };

    return days.map((day, dayIndex) => ({
      day,
      meals: mealTypes.map(mealType => ({
        type: mealType,
        meal: sampleMeals[mealType][dayIndex % sampleMeals[mealType].length],
        calories: mealType === "Breakfast" ? 400 : 
                 mealType === "Lunch" ? 500 : 
                 mealType === "Dinner" ? 600 : 200
      }))
    }));
  };

  const bmi = calculateBMI();
  const bmiInfo = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <BackButton />
          <div className="text-center mt-6">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              📋 AI Diet Planner
            </h1>
            <p className="text-lg text-green-700 max-w-3xl mx-auto">
              Get a personalized diet plan based on your goals, preferences, and lifestyle!
            </p>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
          {/* Diet Planner Form */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6">Personal Information</h2>
              
              <form onSubmit={handleGeneratePlan} className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="age" className="block text-sm font-semibold text-green-700 mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="25"
                      min="16"
                      max="100"
                      className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="gender" className="block text-sm font-semibold text-green-700 mb-2">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Height and Weight */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="height" className="block text-sm font-semibold text-green-700 mb-2">
                      Height (cm) *
                    </label>
                    <input
                      type="number"
                      id="height"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="170"
                      min="140"
                      max="220"
                      className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="weight" className="block text-sm font-semibold text-green-700 mb-2">
                      Weight (kg) *
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="70"
                      min="30"
                      max="200"
                      className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* BMI Display */}
                {bmi && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-center">
                      <span className="text-sm font-semibold text-green-700">Your BMI: </span>
                      <span className="text-lg font-bold text-green-800">{bmi}</span>
                      <span className={`ml-2 font-semibold ${bmiInfo.color}`}>
                        ({bmiInfo.category})
                      </span>
                    </div>
                  </div>
                )}

                {/* Activity Level */}
                <div>
                  <label htmlFor="activityLevel" className="block text-sm font-semibold text-green-700 mb-2">
                    Activity Level *
                  </label>
                  <select
                    id="activityLevel"
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                  >
                    <option value="sedentary">Sedentary (little/no exercise)</option>
                    <option value="light">Light (1-3 days/week)</option>
                    <option value="moderate">Moderate (3-5 days/week)</option>
                    <option value="active">Active (6-7 days/week)</option>
                    <option value="very-active">Very Active (2x/day or intense)</option>
                  </select>
                </div>

                {/* Goal */}
                <div>
                  <label className="block text-sm font-semibold text-green-700 mb-3">
                    Primary Goal *
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: "lose", label: "Lose Weight", icon: "📉" },
                      { value: "maintain", label: "Maintain", icon: "⚖️" },
                      { value: "gain", label: "Gain Weight", icon: "📈" }
                    ].map((goal) => (
                      <label key={goal.value} className={`cursor-pointer p-4 border-2 rounded-lg text-center transition-all ${
                        formData.goal === goal.value 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-green-200 hover:border-green-300'
                      }`}>
                        <input
                          type="radio"
                          name="goal"
                          value={goal.value}
                          checked={formData.goal === goal.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="text-2xl mb-2">{goal.icon}</div>
                        <div className="font-semibold text-green-700">{goal.label}</div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Diet Type */}
                <div>
                  <label htmlFor="dietType" className="block text-sm font-semibold text-green-700 mb-2">
                    Diet Type *
                  </label>
                  <select
                    id="dietType"
                    name="dietType"
                    value={formData.dietType}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                  >
                    <option value="balanced">Balanced Diet</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="keto">Ketogenic</option>
                    <option value="paleo">Paleo</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="low-carb">Low Carb</option>
                    <option value="high-protein">High Protein</option>
                  </select>
                </div>

                {/* Allergies */}
                <div>
                  <label htmlFor="allergies" className="block text-sm font-semibold text-green-700 mb-2">
                    Food Allergies / Restrictions
                  </label>
                  <textarea
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    placeholder="e.g., nuts, dairy, gluten, shellfish..."
                    className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none resize-none"
                    rows="3"
                  />
                </div>

                {/* Meals and Duration */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="mealsPerDay" className="block text-sm font-semibold text-green-700 mb-2">
                      Meals per Day
                    </label>
                    <select
                      id="mealsPerDay"
                      name="mealsPerDay"
                      value={formData.mealsPerDay}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                    >
                      <option value="3">3 Meals</option>
                      <option value="4">4 Meals (+ 1 Snack)</option>
                      <option value="5">5 Meals (+ 2 Snacks)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="duration" className="block text-sm font-semibold text-green-700 mb-2">
                      Plan Duration
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                    >
                      <option value="3">3 Days</option>
                      <option value="7">1 Week</option>
                      <option value="14">2 Weeks</option>
                      <option value="30">1 Month</option>
                    </select>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Generate Button */}
                <button
                  type="submit"
                  disabled={isGenerating || !formData.age || !formData.gender || !formData.height || !formData.weight}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-4 px-6 rounded-lg hover:from-green-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating Your Diet Plan...
                    </>
                  ) : (
                    <>
                      🎯 Generate My Diet Plan
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Generated Diet Plan Display */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6">Your Diet Plan</h2>
              
              {!generatedPlan ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🥗</div>
                  <p className="text-green-600 text-lg">
                    Fill in your information to generate a personalized diet plan!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Daily Calories */}
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h3 className="font-bold text-green-800 text-lg">Daily Target</h3>
                    <p className="text-2xl font-bold text-green-600">{generatedPlan.dailyCalories} kcal</p>
                  </div>

                  {/* Macros */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-green-800">Macro Distribution:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-green-700">🥩 Protein:</span>
                        <span className="font-semibold">{generatedPlan.macros.protein}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">🍞 Carbs:</span>
                        <span className="font-semibold">{generatedPlan.macros.carbs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">🥑 Fats:</span>
                        <span className="font-semibold">{generatedPlan.macros.fats}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-green-800">💡 Quick Tips:</h4>
                    <ul className="space-y-2 text-sm">
                      {generatedPlan.tips.slice(0, 3).map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-green-700">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors">
                      📱 Download Plan
                    </button>
                    <button className="w-full bg-green-100 text-green-700 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors">
                      📧 Email Plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Weekly Plan Display */}
        {generatedPlan && (
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-green-800 mb-8 text-center">📅 Your Weekly Meal Plan</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-6">
              {generatedPlan.weeklyPlan.map((day) => (
                <div key={day.day} className="border border-green-200 rounded-lg p-4">
                  <h4 className="font-bold text-green-800 text-center mb-4">{day.day}</h4>
                  <div className="space-y-3">
                    {day.meals.map((meal, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                          {meal.type}
                        </div>
                        <div className="text-sm text-green-700 mt-1">
                          {meal.meal}
                        </div>
                        <div className="text-xs text-green-500">
                          {meal.calories} kcal
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}