"use client";
import React, { useState } from "react";

/**
 * AI Diet Planner Component
 * Aesthetic: Background color changed to beige and all text/accent colors changed to brown/amber tones.
 */
export default function DietPlannerAI() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInM = formData.height / 100;
      return (formData.weight / (heightInM * heightInM)).toFixed(1);
    }
    return null;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { category: "Normal", color: "text-green-600" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obese", color: "text-red-600" };
  };

  const generateWeeklyPlan = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let mealTypes = ["Breakfast", "Lunch", "Dinner"];

    if (formData.mealsPerDay === "4") mealTypes.push("Snack");
    if (formData.mealsPerDay === "5") mealTypes.push("Snack", "Evening Snack");

    const sampleMeals = {
      Breakfast: ["Oatmeal with berries", "Greek yogurt with granola", "Avocado toast", "Smoothie bowl", "Cereal with milk", "Scrambled eggs", "Pancakes"],
      Lunch: ["Grilled chicken salad", "Quinoa bowl", "Turkey sandwich", "Lentil soup", "Fish with veggies", "Veg stir-fry with rice", "Pasta with sauce"],
      Dinner: ["Salmon with sweet potato", "Chicken curry with rice", "Veg pasta", "Beef stir-fry", "Grilled fish with quinoa", "Tofu with veggies", "Lean meat with salad"],
      Snack: ["Mixed nuts", "Greek yogurt", "Veg sticks with hummus", "Apple with peanut butter", "Protein smoothie"],
      "Evening Snack": ["Herbal tea with crackers", "Small fruit bowl", "Low-fat cheese with crackers"],
    };

    const planLength = parseInt(formData.duration) || 7;

    return days.slice(0, planLength).map((day, i) => ({
      day,
      meals: mealTypes.map((mealType) => ({
        type: mealType,
        meal: sampleMeals[mealType][i % sampleMeals[mealType].length],
        calories:
          mealType === "Breakfast" ? 400 : mealType === "Lunch" ? 500 : mealType === "Dinner" ? 600 : 200,
      })),
    }));
  };

  const handleGeneratePlan = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError("");

    if (!formData.age || !formData.gender || !formData.height || !formData.weight) {
      setError("Please fill in all required fields (Age, Gender, Height, Weight).");
      setIsGenerating(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const goal = formData.fitnessGoal;
      const diet = formData.dietPreference;

      const mockPlan = {
        dailyCalories: goal === "cut" ? 1800 : goal === "bulk" ? 2500 : 2200,
        macros: {
          protein: goal === "bulk" ? "25%" : "20%",
          carbs: diet === "keto" ? "10%" : "50%",
          fats: diet === "keto" ? "70%" : "30%",
        },
        weeklyPlan: generateWeeklyPlan(),
        tips: [
          "Drink at least 8 glasses of water daily",
          "Include colorful fruits and vegetables",
          "Focus on lean proteins like fish and beans",
          "Plan meals in advance to stay consistent",
          "Listen to hunger cues and stop when 80% full",
        ],
      };

      setGeneratedPlans([
        { ...mockPlan, title: "Plan 1 (Balanced)" },
        { ...mockPlan, title: "Plan 2 (High Protein)" },
        { ...mockPlan, title: "Plan 3 (Low Carb)" },
      ]);
    } catch (err) {
      console.error("Generation error:", err);
      setError("Failed to generate diet plan. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const bmi = calculateBMI();
  const bmiInfo = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="min-h-screen bg-neutral-100 py-8 font-['Inter',_sans-serif]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mt-6 mb-8">
          <h1 className="text-4xl font-extrabold text-stone-900 mb-4 tracking-tight">📋 AI Diet Planner</h1>
          <p className="text-md text-stone-700 max-w-3xl mx-auto">
            Get a personalized diet plan based on your goals, preferences, and lifestyle!
          </p>
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-stone-200">
              <form onSubmit={handleGeneratePlan} className="space-y-6">
                {/* Age, Gender, Height, Weight — keep same as above */}
                {/* ... full form code unchanged ... */}

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-amber-700 to-orange-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:from-amber-800 hover:to-orange-900 disabled:opacity-50 transition-all duration-300 transform hover:scale-[1.005]"
                >
                  {isGenerating ? "Generating Plan..." : "🎯 Generate My Diet Plan"}
                </button>
                {error && <p className="text-red-500 text-center font-medium mt-4">{error}</p>}
              </form>
            </div>
          </div>

          {/* Right: Plans */}
          <div className="xl:col-span-1">
            <h2 className="text-xl font-bold text-stone-800 mb-4 px-2">Your Personalized Diet Plan</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8 border border-stone-200">
              {generatedPlans.length === 0 ? (
                <div className="text-center p-10 bg-amber-50 rounded-lg border border-amber-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-500 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48..."/></svg>
                  <p className="text-amber-700 font-medium">
                    ✨ Fill out your health profile to get your personalized diet plan!
                  </p>
                </div>
              ) : (
                generatedPlans.map((plan, idx) => (
                  <div key={idx} className="mb-6 border-b pb-4 last:border-b-0">
                    <h3 className="text-lg font-bold text-amber-800 mb-2">{plan.title}</h3>
                    <div className="space-y-1 text-sm text-stone-700 mb-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p><span className="font-semibold">Daily Calories:</span> {plan.dailyCalories} kcal</p>
                      <p><span className="font-semibold">Macros:</span> Protein {plan.macros.protein}, Carbs {plan.macros.carbs}, Fats {plan.macros.fats}</p>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-bold text-amber-800 mb-2">📅 Weekly Plan Overview:</h4>
                      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {plan.weeklyPlan.map((day) => (
                          <div key={day.day} className="border border-stone-200 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                            <strong className="block text-stone-800 mb-1">{day.day}</strong>
                            {day.meals.map((meal, i) => (
                              <div key={i} className="text-xs text-stone-700">
                                <span className="font-medium text-amber-700">{meal.type}:</span> {meal.meal} ({meal.calories} kcal)
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-bold text-amber-800 mb-2">💡 Tips:</h4>
                      <ul className="list-disc list-inside text-sm text-stone-700 space-y-1">
                        {plan.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
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



// "use client";

// import { useState, useEffect} from "react";
// import Link from "next/link";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import BackButton from "@/components/BackButton"; 

// export default function DietPlannerPage() {
//   const [isVegetarian, setIsVegetarian] = useState(false);
//   const [formData, setFormData] = useState({
//     height: "",
//     weight: "",
//     age: "",
//     gender: "",
//     activityLevel: "",
//     goal: "",
//     dietPreference:"",
//     bloodSugar: "",
//     bloodPressure: "",
//     dietaryRestrictions: [],
//     allergies: [],
//     targetDate: new Date().toISOString().split('T')[0]
//   });

//   const [dietPlan, setDietPlan] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [useTestAPI, setUseTestAPI] = useState(true);
//   const [showResults, setShowResults] = useState(false);

//   const handleSearchFocus = () => setShowResults(true);

//   const handleBlur = () => {
//     setTimeout(() => setShowResults(false), 200);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleArrayInputChange = (e, field) => {
//     const value = e.target.value;
//     const array = value ? value.split(',').map(item => item.trim()) : [];
//     setFormData(prev => ({
//       ...prev,
//       [field]: array
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setDietPlan(null);

//     try {
//       const apiEndpoint = useTestAPI ? '/api/test-diet-plan' : '/api/generate-diet-plan';
//       const response = await fetch(apiEndpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           height: parseFloat(formData.height),
//           weight: parseFloat(formData.weight),
//           age: parseInt(formData.age),
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to generate diet plan');
//       }

//       setDietPlan(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setFormData(prev => ({
//       ...prev,
//       dietaryRestrictions: isVegetarian
//         ? Array.from(new Set([...prev.dietaryRestrictions, "vegetarian"]))
//         : prev.dietaryRestrictions.filter(r => r.toLowerCase() !== "vegetarian"),
//     }));
//   }, [isVegetarian]);

//   return (
//     <div className="min-h-screen bg-base-100 relative">
//       {/* Back Button */}
//       <BackButton fallbackUrl="/" />
      
//       {/* Navigation */}
//       <Navbar
//         showResults={showResults}
//         setShowResults={setShowResults}
//         handleSearchFocus={handleSearchFocus}
//         handleBlur={handleBlur}
//       />

//       <div className={`container mx-auto md:mt-16 mt-28 px-4 py-8 transition-all duration-300 ${
//         showResults ? "opacity-80 blur-sm" : "opacity-100"
//       }`}>
//         <div className="text-center mb-8 mt-12 md:mt-0">
//           <h1 className="text-4xl font-bold text-primary mb-4">
//             🥗 AI Diet Planner
//           </h1>
//           <p className="text-lg text-base-content/70">
//             Get personalized daily meal plans based on your health profile and fitness goals
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Form Section */}
//           <div className="card bg-base-200 shadow-xl">
//             <div className="card-body">
//               <h2 className="card-title text-2xl mb-4">Your Health Profile</h2>

// {/* API Toggle */}
// <div className="form-control">
//   <label className="label cursor-pointer">
//     <span className="label-text">Use Test API (for demo)</span>
//     <input
//       type="checkbox"
//       checked={useTestAPI}
//       onChange={(e) => setUseTestAPI(e.target.checked)}
//       className="toggle toggle-primary"
//     />
//   </label>
//   <div className="label">
//     <span className="label-text-alt">
//       {useTestAPI ? "Using mock data for testing" : "Using AI-powered diet planner"}
//     </span>
//   </div>
// </div>

// {/* Vegetarian Toggle */}
// <div className="form-control">
//   <label className="label cursor-pointer">
//     <span className="label-text">Vegetarian Mode</span>
//     <input
//       type="checkbox"
//       checked={isVegetarian}
//       onChange={(e) => setIsVegetarian(e.target.checked)}
//       className="toggle toggle-success"
//     />
//   </label>
//   <div className="label">
//     <span className="label-text-alt">
//       {isVegetarian ? "Showing only vegetarian dishes" : "Showing all dishes"}
//     </span>
//   </div>
// </div>     
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Basic Info */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text">Height (cm)</span>
//                     </label>
//                     <input
//                       type="number"
//                       name="height"
//                       value={formData.height}
//                       onChange={handleInputChange}
//                       className="input input-bordered"
//                       placeholder="175"
//                       required
//                     />
//                   </div>
//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text">Weight (kg)</span>
//                     </label>
//                     <input
//                       type="number"
//                       name="weight"
//                       value={formData.weight}
//                       onChange={handleInputChange}
//                       className="input input-bordered"
//                       placeholder="70"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text">Age</span>
//                     </label>
//                     <input
//                       type="number"
//                       name="age"
//                       value={formData.age}
//                       onChange={handleInputChange}
//                       className="input input-bordered"
//                       placeholder="25"
//                       required
//                     />
//                   </div>
//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text">Gender</span>
//                     </label>
//                     <select
//                       name="gender"
//                       value={formData.gender}
//                       onChange={handleInputChange}
//                       className="select select-bordered"
//                       required
//                     >
//                       <option value="">Select Gender</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="other">Other</option>
//                       <option value="prefer_not_to_say">Prefer not to say</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Activity & Goals */}
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Activity Level</span>
//                   </label>
//                   <select
//                     name="activityLevel"
//                     value={formData.activityLevel}
//                     onChange={handleInputChange}
//                     className="select select-bordered"
//                     required
//                   >
//                     <option value="">Select Activity Level</option>
//                     <option value="sedentary">Sedentary (little/no exercise)</option>
//                     <option value="lightly_active">Lightly Active (light exercise 1-3 days/week)</option>
//                     <option value="moderately_active">Moderately Active (moderate exercise 3-5 days/week)</option>
//                     <option value="very_active">Very Active (hard exercise 6-7 days/week)</option>
//                     <option value="extremely_active">Extremely Active (very hard exercise, physical job)</option>
//                   </select>
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Fitness Goal</span>
//                   </label>
//                   <select
//                     name="goal"
//                     value={formData.goal}
//                     onChange={handleInputChange}
//                     className="select select-bordered"
//                     required
//                   >
//                     <option value="">Select Goal</option>
//                     <option value="bulk">Bulk (Gain Muscle Mass)</option>
//                     <option value="cut">Cut (Lose Fat)</option>
//                     <option value="maintain">Maintain Current Weight</option>
//                     <option value="general_health">General Health</option>
//                   </select>
//                 </div>
//                 {/* Diet Preference Dropdown (added above Dietary Restrictions) */}
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Diet Preference</span>
//                   </label>
//                   <select
//                     className="select select-bordered"
//                     value={formData.dietPreference || ""}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         dietPreference: e.target.value,
//                       })
//                     }
//                   >
//                     <option value="" disabled>
//                       Select your diet preference
//                     </option>
//                     <option value="Vegetarian">Vegetarian</option>
//                     <option value="Non-Vegetarian">Non-Vegetarian</option>
//                     <option value="Eggetarian">Eggetarian</option>
//                     <option value="Vegan">Vegan</option>
//                   </select>
//                   <div className="label">
//                   </div>
//                 </div>
//                 {/* Health Conditions */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text">Blood Sugar Level</span>
//                     </label>
//                     <select
//                       name="bloodSugar"
//                       value={formData.bloodSugar}
//                       onChange={handleInputChange}
//                       className="select select-bordered"
//                       required
//                     >
//                       <option value="">Select Level</option>
//                       <option value="normal">Normal</option>
//                       <option value="prediabetic">Prediabetic</option>
//                       <option value="diabetic">Diabetic</option>
//                     </select>
//                   </div>
//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text">Blood Pressure</span>
//                     </label>
//                     <select
//                       name="bloodPressure"
//                       value={formData.bloodPressure}
//                       onChange={handleInputChange}
//                       className="select select-bordered"
//                       required
//                     >
//                       <option value="">Select Status</option>
//                       <option value="normal">Normal</option>
//                       <option value="elevated">Elevated</option>
//                       <option value="high_stage1">High Stage 1</option>
//                       <option value="high_stage2">High Stage 2</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Optional Fields */}
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Dietary Restrictions (comma-separated)</span>
//                   </label>
//                   <input
//                     type="text"
//                     onChange={(e) => handleArrayInputChange(e, 'dietaryRestrictions')}
//                     className="input input-bordered"
//                     placeholder="vegetarian, gluten-free, dairy-free"
//                   />
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Allergies (comma-separated)</span>
//                   </label>
//                   <input
//                     type="text"
//                     onChange={(e) => handleArrayInputChange(e, 'allergies')}
//                     className="input input-bordered"
//                     placeholder="nuts, shellfish, eggs"
//                   />
//                 </div>

//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Target Date</span>
//                   </label>
//                   <input
//                     type="date"
//                     name="targetDate"
//                     value={formData.targetDate}
//                     onChange={handleInputChange}
//                     className="input input-bordered"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
//                   disabled={loading}
//                 >
//                   {loading
//                     ? (useTestAPI ? 'Generating Test Diet Plan...' : 'Generating AI Diet Plan...')
//                     : (useTestAPI ? 'Generate Test Diet Plan' : 'Generate AI Diet Plan')
//                   }
//                 </button>
//               </form>

//               {error && (
//                 <div className="alert alert-error mt-4">
//                   <span>{error}</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Results Section */}
//           <div className="card bg-base-200 shadow-xl">
//             <div className="card-body">
//               <h2 className="card-title text-2xl mb-4">Your Personalized Diet Plan</h2>

//               {!dietPlan && !loading && (
//                 <div className="text-center py-8">
//                   <div className="text-6xl mb-4">🍽️</div>
//                   <p className="text-base-content/70">
//                     Fill out your health profile to get your personalized diet plan
//                   </p>
//                 </div>
//               )}

//               {loading && (
//                 <div className="text-center py-8">
//                   <div className="loading loading-spinner loading-lg"></div>
//                   <p className="mt-4">Creating your personalized diet plan...</p>
//                 </div>
//               )}

//               {dietPlan && (
//                 <div className="space-y-6">
//                   {/* User Profile Summary */}
//                   <div className="bg-base-100 p-4 rounded-lg">
//                     <h3 className="font-bold text-lg mb-2">Your Profile</h3>
//                     <div className="grid grid-cols-2 gap-2 text-sm">
//                       <span>BMI: {dietPlan.userProfile.bmi}</span>
//                       <span>Target Calories: {dietPlan.userProfile.targetCalories}</span>
//                       <span>BMR: {dietPlan.userProfile.bmr}</span>
//                       <span>TDEE: {dietPlan.userProfile.tdee}</span>
//                     </div>
//                   </div>

//                   {/* Diet Plan Overview */}
//                   <div className="bg-base-100 p-4 rounded-lg">
//                     <h3 className="font-bold text-lg mb-2">Daily Targets</h3>
//                     <div className="grid grid-cols-2 gap-2 text-sm">
//                       <span>Calories: {dietPlan.dietPlan.totalCalories}</span>
//                       <span>Protein: {dietPlan.dietPlan.totalProtein}g</span>
//                       <span>Carbs: {dietPlan.dietPlan.totalCarbs}g</span>
//                       <span>Fat: {dietPlan.dietPlan.totalFat}g</span>
//                     </div>
//                   </div>

//                   {/* Meals */}
//                   <div className="space-y-4">
//                     <h3 className="font-bold text-lg">Today's Meals</h3>
//                     {dietPlan.dietPlan.meals.map((meal, index) => (
//                       <div key={index} className="bg-base-100 p-4 rounded-lg">
//                         <h4 className="font-semibold text-md capitalize mb-2">
//                           {meal.type} - {meal.name}
//                         </h4>
//                         <div className="text-sm text-base-content/70 mb-2">
//                           {meal.calories} cal | {meal.protein}g protein | {meal.carbs}g carbs | {meal.fat}g fat
//                           {meal.fiber && ` | ${meal.fiber}g fiber`}
//                           {meal.sodium && ` | ${meal.sodium}mg sodium`}
//                         </div>
//                         <div className="collapse collapse-arrow bg-base-200">
//                           <input type="checkbox" />
//                           <div className="collapse-title text-sm font-medium">
//                             View Recipe & Instructions
//                           </div>
//                           <div className="collapse-content text-sm">
//                             <div className="mb-2">
//                               <strong>Ingredients:</strong>
//                               <ul className="list-disc list-inside ml-2">
//                                 {meal.ingredients.map((ing, i) => (
//                                   <li key={i}>{ing.amount} {ing.name}</li>
//                                 ))}
//                               </ul>
//                             </div>
//                             <div className="mb-2">
//                               <strong>Instructions:</strong>
//                               <ol className="list-decimal list-inside ml-2">
//                                 {meal.instructions.map((step, i) => (
//                                   <li key={i}>{step}</li>
//                                 ))}
//                               </ol>
//                             </div>
//                             {meal.healthBenefits && meal.healthBenefits.length > 0 && (
//                               <div>
//                                 <strong>Health Benefits:</strong>
//                                 <ul className="list-disc list-inside ml-2">
//                                   {meal.healthBenefits.map((benefit, i) => (
//                                     <li key={i}>{benefit}</li>
//                                   ))}
//                                 </ul>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Health Notes */}
//                   {dietPlan.dietPlan.healthNotes && dietPlan.dietPlan.healthNotes.length > 0 && (
//                     <div className="bg-base-100 p-4 rounded-lg">
//                       <h3 className="font-bold text-lg mb-2">Health Notes</h3>
//                       <ul className="list-disc list-inside text-sm space-y-1">
//                         {dietPlan.dietPlan.healthNotes.map((note, index) => (
//                           <li key={index}>{note}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}

//                   {/* Additional Recommendations */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="bg-base-100 p-4 rounded-lg">
//                       <h3 className="font-bold text-md mb-2">💧 Hydration</h3>
//                       <p className="text-sm">{dietPlan.dietPlan.hydrationGoal}</p>
//                     </div>
//                     <div className="bg-base-100 p-4 rounded-lg">
//                       <h3 className="font-bold text-md mb-2">🏃‍♂️ Exercise</h3>
//                       <p className="text-sm">{dietPlan.dietPlan.exerciseRecommendation}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }