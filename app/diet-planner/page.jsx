"use client";

import { useState } from "react";
import Link from "next/link";

export default function DietPlannerPage() {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
    activityLevel: "",
    goal: "",
    bloodSugar: "",
    bloodPressure: "",
    dietaryRestrictions: [],
    allergies: [],
    targetDate: new Date().toISOString().split('T')[0]
  });

  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [useTestAPI, setUseTestAPI] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (e, field) => {
    const value = e.target.value;
    const array = value ? value.split(',').map(item => item.trim()) : [];
    setFormData(prev => ({
      ...prev,
      [field]: array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDietPlan(null);

    try {
      const apiEndpoint = useTestAPI ? '/api/test-diet-plan' : '/api/generate-diet-plan';
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
          age: parseInt(formData.age)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate diet plan');
      }

      setDietPlan(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Navigation */}
      <div className="navbar bg-base-200 shadow-lg">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            🍱 Flavor AI
          </Link>
        </div>
        <div className="flex-none">
          <Link href="/" className="btn btn-ghost">
            Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            🥗 AI Diet Planner
          </h1>
          <p className="text-lg text-base-content/70">
            Get personalized daily meal plans based on your health profile and fitness goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Your Health Profile</h2>

              {/* API Toggle */}
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Use Test API (for demo)</span>
                  <input
                    type="checkbox"
                    checked={useTestAPI}
                    onChange={(e) => setUseTestAPI(e.target.checked)}
                    className="toggle toggle-primary"
                  />
                </label>
                <div className="label">
                  <span className="label-text-alt">
                    {useTestAPI ? "Using mock data for testing" : "Using AI-powered diet planner"}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Height (cm)</span>
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      placeholder="175"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Weight (kg)</span>
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      placeholder="70"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Age</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="input input-bordered"
                      placeholder="25"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Gender</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Activity & Goals */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Activity Level</span>
                  </label>
                  <select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleInputChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="">Select Activity Level</option>
                    <option value="sedentary">Sedentary (little/no exercise)</option>
                    <option value="lightly_active">Lightly Active (light exercise 1-3 days/week)</option>
                    <option value="moderately_active">Moderately Active (moderate exercise 3-5 days/week)</option>
                    <option value="very_active">Very Active (hard exercise 6-7 days/week)</option>
                    <option value="extremely_active">Extremely Active (very hard exercise, physical job)</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Fitness Goal</span>
                  </label>
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="">Select Goal</option>
                    <option value="bulk">Bulk (Gain Muscle Mass)</option>
                    <option value="cut">Cut (Lose Fat)</option>
                    <option value="maintain">Maintain Current Weight</option>
                    <option value="general_health">General Health</option>
                  </select>
                </div>

                {/* Health Conditions */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Blood Sugar Level</span>
                    </label>
                    <select
                      name="bloodSugar"
                      value={formData.bloodSugar}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="normal">Normal</option>
                      <option value="prediabetic">Prediabetic</option>
                      <option value="diabetic">Diabetic</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Blood Pressure</span>
                    </label>
                    <select
                      name="bloodPressure"
                      value={formData.bloodPressure}
                      onChange={handleInputChange}
                      className="select select-bordered"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="normal">Normal</option>
                      <option value="elevated">Elevated</option>
                      <option value="high_stage1">High Stage 1</option>
                      <option value="high_stage2">High Stage 2</option>
                    </select>
                  </div>
                </div>

                {/* Optional Fields */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Dietary Restrictions (comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleArrayInputChange(e, 'dietaryRestrictions')}
                    className="input input-bordered"
                    placeholder="vegetarian, gluten-free, dairy-free"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Allergies (comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => handleArrayInputChange(e, 'allergies')}
                    className="input input-bordered"
                    placeholder="nuts, shellfish, eggs"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Target Date</span>
                  </label>
                  <input
                    type="date"
                    name="targetDate"
                    value={formData.targetDate}
                    onChange={handleInputChange}
                    className="input input-bordered"
                  />
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading
                    ? (useTestAPI ? 'Generating Test Diet Plan...' : 'Generating AI Diet Plan...')
                    : (useTestAPI ? 'Generate Test Diet Plan' : 'Generate AI Diet Plan')
                  }
                </button>
              </form>

              {error && (
                <div className="alert alert-error mt-4">
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Your Personalized Diet Plan</h2>
              
              {!dietPlan && !loading && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🍽️</div>
                  <p className="text-base-content/70">
                    Fill out your health profile to get your personalized diet plan
                  </p>
                </div>
              )}

              {loading && (
                <div className="text-center py-8">
                  <div className="loading loading-spinner loading-lg"></div>
                  <p className="mt-4">Creating your personalized diet plan...</p>
                </div>
              )}

              {dietPlan && (
                <div className="space-y-6">
                  {/* User Profile Summary */}
                  <div className="bg-base-100 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Your Profile</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span>BMI: {dietPlan.userProfile.bmi}</span>
                      <span>Target Calories: {dietPlan.userProfile.targetCalories}</span>
                      <span>BMR: {dietPlan.userProfile.bmr}</span>
                      <span>TDEE: {dietPlan.userProfile.tdee}</span>
                    </div>
                  </div>

                  {/* Diet Plan Overview */}
                  <div className="bg-base-100 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Daily Targets</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span>Calories: {dietPlan.dietPlan.totalCalories}</span>
                      <span>Protein: {dietPlan.dietPlan.totalProtein}g</span>
                      <span>Carbs: {dietPlan.dietPlan.totalCarbs}g</span>
                      <span>Fat: {dietPlan.dietPlan.totalFat}g</span>
                    </div>
                  </div>

                  {/* Meals */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg">Today's Meals</h3>
                    {dietPlan.dietPlan.meals.map((meal, index) => (
                      <div key={index} className="bg-base-100 p-4 rounded-lg">
                        <h4 className="font-semibold text-md capitalize mb-2">
                          {meal.type} - {meal.name}
                        </h4>
                        <div className="text-sm text-base-content/70 mb-2">
                          {meal.calories} cal | {meal.protein}g protein | {meal.carbs}g carbs | {meal.fat}g fat
                          {meal.fiber && ` | ${meal.fiber}g fiber`}
                          {meal.sodium && ` | ${meal.sodium}mg sodium`}
                        </div>
                        <div className="collapse collapse-arrow bg-base-200">
                          <input type="checkbox" />
                          <div className="collapse-title text-sm font-medium">
                            View Recipe & Instructions
                          </div>
                          <div className="collapse-content text-sm">
                            <div className="mb-2">
                              <strong>Ingredients:</strong>
                              <ul className="list-disc list-inside ml-2">
                                {meal.ingredients.map((ing, i) => (
                                  <li key={i}>{ing.amount} {ing.name}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="mb-2">
                              <strong>Instructions:</strong>
                              <ol className="list-decimal list-inside ml-2">
                                {meal.instructions.map((step, i) => (
                                  <li key={i}>{step}</li>
                                ))}
                              </ol>
                            </div>
                            {meal.healthBenefits && meal.healthBenefits.length > 0 && (
                              <div>
                                <strong>Health Benefits:</strong>
                                <ul className="list-disc list-inside ml-2">
                                  {meal.healthBenefits.map((benefit, i) => (
                                    <li key={i}>{benefit}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Health Notes */}
                  {dietPlan.dietPlan.healthNotes && dietPlan.dietPlan.healthNotes.length > 0 && (
                    <div className="bg-base-100 p-4 rounded-lg">
                      <h3 className="font-bold text-lg mb-2">Health Notes</h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {dietPlan.dietPlan.healthNotes.map((note, index) => (
                          <li key={index}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Additional Recommendations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-base-100 p-4 rounded-lg">
                      <h3 className="font-bold text-md mb-2">💧 Hydration</h3>
                      <p className="text-sm">{dietPlan.dietPlan.hydrationGoal}</p>
                    </div>
                    <div className="bg-base-100 p-4 rounded-lg">
                      <h3 className="font-bold text-md mb-2">🏃‍♂️ Exercise</h3>
                      <p className="text-sm">{dietPlan.dietPlan.exerciseRecommendation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
