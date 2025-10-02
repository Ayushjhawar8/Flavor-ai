"use client";
import React, { useState } from "react";
import Link from "next/link";
import BackButton from "../../components/BackButton";

export default function AIRecipeGenerator() {
  const [formData, setFormData] = useState({
    ingredients: "",
    cuisineType: "",
    dietaryRestrictions: "",
    cookingTime: "",
    servings: "4",
    difficulty: "medium"
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateRecipe = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError("");
    
    try {
      // Simulated API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 2000)); // Mock delay
      
      // Mock generated recipe
      const mockRecipe = {
        name: `Delicious ${formData.cuisineType || 'Mixed'} Recipe`,
        ingredients: formData.ingredients.split(',').map(ing => ing.trim()),
        instructions: [
          "Prepare all ingredients by washing and chopping as needed.",
          "Heat oil in a large pan over medium heat.",
          "Add ingredients according to cooking time requirements.",
          "Season with salt, pepper, and preferred spices.",
          "Cook until ingredients are tender and flavors are well combined.",
          "Serve hot and enjoy your AI-generated recipe!"
        ],
        cookingTime: formData.cookingTime || "30 minutes",
        servings: formData.servings,
        difficulty: formData.difficulty
      };
      
      setGeneratedRecipe(mockRecipe);
    } catch (err) {
      setError("Failed to generate recipe. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <BackButton />
          <div className="text-center mt-6">
            <h1 className="text-4xl font-bold text-amber-800 mb-4">
              🤖 AI Recipe Generator
            </h1>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Tell me what ingredients you have, and I'll create a delicious recipe just for you!
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recipe Generator Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-amber-800 mb-6">Create Your Recipe</h2>
            
            <form onSubmit={handleGenerateRecipe} className="space-y-6">
              {/* Ingredients Input */}
              <div>
                <label htmlFor="ingredients" className="block text-sm font-semibold text-amber-700 mb-2">
                  Available Ingredients *
                </label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleInputChange}
                  placeholder="e.g., chicken breast, onions, tomatoes, garlic, rice..."
                  className="w-full p-4 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none resize-none"
                  rows="4"
                  required
                />
              </div>

              {/* Cuisine Type */}
              <div>
                <label htmlFor="cuisineType" className="block text-sm font-semibold text-amber-700 mb-2">
                  Preferred Cuisine
                </label>
                <select
                  id="cuisineType"
                  name="cuisineType"
                  value={formData.cuisineType}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                >
                  <option value="">Any Cuisine</option>
                  <option value="Italian">Italian</option>
                  <option value="Indian">Indian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="American">American</option>
                  <option value="Thai">Thai</option>
                  <option value="Japanese">Japanese</option>
                </select>
              </div>

              {/* Dietary Restrictions */}
              <div>
                <label htmlFor="dietaryRestrictions" className="block text-sm font-semibold text-amber-700 mb-2">
                  Dietary Restrictions
                </label>
                <select
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                >
                  <option value="">No Restrictions</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten Free</option>
                  <option value="dairy-free">Dairy Free</option>
                  <option value="keto">Keto</option>
                  <option value="low-carb">Low Carb</option>
                </select>
              </div>

              {/* Cooking Time and Servings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cookingTime" className="block text-sm font-semibold text-amber-700 mb-2">
                    Cooking Time
                  </label>
                  <select
                    id="cookingTime"
                    name="cookingTime"
                    value={formData.cookingTime}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  >
                    <option value="">Any Time</option>
                    <option value="15 minutes">15 minutes</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="45 minutes">45 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="2+ hours">2+ hours</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="servings" className="block text-sm font-semibold text-amber-700 mb-2">
                    Servings
                  </label>
                  <select
                    id="servings"
                    name="servings"
                    value={formData.servings}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="4">4 People</option>
                    <option value="6">6 People</option>
                    <option value="8">8+ People</option>
                  </select>
                </div>
              </div>

              {/* Difficulty Level */}
              <div>
                <label htmlFor="difficulty" className="block text-sm font-semibold text-amber-700 mb-2">
                  Difficulty Level
                </label>
                <div className="flex gap-4">
                  {["easy", "medium", "hard"].map((level) => (
                    <label key={level} className="flex items-center">
                      <input
                        type="radio"
                        name="difficulty"
                        value={level}
                        checked={formData.difficulty === level}
                        onChange={handleInputChange}
                        className="mr-2 text-amber-600"
                      />
                      <span className="capitalize text-amber-700">{level}</span>
                    </label>
                  ))}
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
                disabled={isGenerating || !formData.ingredients.trim()}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-4 px-6 rounded-lg hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating Recipe...
                  </>
                ) : (
                  <>
                    🎯 Generate My Recipe
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Generated Recipe Display */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-amber-800 mb-6">Your Generated Recipe</h2>
            
            {!generatedRecipe ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍳</div>
                <p className="text-amber-600 text-lg">
                  Fill in the form and click "Generate My Recipe" to create your personalized recipe!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Recipe Header */}
                <div className="border-b border-amber-200 pb-4">
                  <h3 className="text-2xl font-bold text-amber-800">{generatedRecipe.name}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-amber-600">
                    <span>⏱️ {generatedRecipe.cookingTime}</span>
                    <span>👥 {generatedRecipe.servings} servings</span>
                    <span className="capitalize">📊 {generatedRecipe.difficulty}</span>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h4 className="text-lg font-bold text-amber-800 mb-3">🥄 Ingredients:</h4>
                  <ul className="space-y-2">
                    {generatedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 text-amber-700">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="text-lg font-bold text-amber-800 mb-3">👨‍🍳 Instructions:</h4>
                  <ol className="space-y-3">
                    {generatedRecipe.instructions.map((step, index) => (
                      <li key={index} className="flex gap-3 text-amber-700">
                        <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-amber-200">
                  <button className="flex-1 bg-amber-100 text-amber-700 py-2 px-4 rounded-lg hover:bg-amber-200 transition-colors">
                    📋 Save Recipe
                  </button>
                  <button className="flex-1 bg-amber-100 text-amber-700 py-2 px-4 rounded-lg hover:bg-amber-200 transition-colors">
                    📤 Share Recipe
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-amber-800 mb-6 text-center">💡 Pro Tips for Better Recipes</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🥕</div>
              <h4 className="font-bold text-amber-700 mb-2">Be Specific</h4>
              <p className="text-amber-600 text-sm">List exact ingredients you have for more accurate recipes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌶️</div>
              <h4 className="font-bold text-amber-700 mb-2">Mention Preferences</h4>
              <p className="text-amber-600 text-sm">Include spice level and flavor preferences</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-bold text-amber-700 mb-2">Try Different Combinations</h4>
              <p className="text-amber-600 text-sm">Experiment with various cuisine types and restrictions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}