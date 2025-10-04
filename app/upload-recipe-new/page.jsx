"use client";
import React, { useState } from "react";
import Link from "next/link";
import BackButton from "../../components/BackButton";

export default function UploadRecipeNew() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "medium",
    servings: "4",
    prepTime: "",
    cookTime: "",
    totalTime: "",
    ingredients: [""],
    instructions: [""],
    tags: "",
    dietType: "",
    calories: "",
    cuisine: "",
    recipeImage: null,
    tips: "",
    nutritionInfo: {
      protein: "",
      carbs: "",
      fat: "",
      fiber: ""
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (index, value, arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], ""]
    }));
  };

  const removeArrayItem = (index, arrayName) => {
    if (formData[arrayName].length > 1) {
      setFormData(prev => ({
        ...prev,
        [arrayName]: prev[arrayName].filter((_, i) => i !== index)
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, recipeImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.title) newErrors.title = "Recipe title is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.prepTime) newErrors.prepTime = "Prep time is required";
        if (!formData.cookTime) newErrors.cookTime = "Cook time is required";
        break;
      case 2:
        if (formData.ingredients.some(ing => !ing.trim())) newErrors.ingredients = "All ingredients must be filled";
        break;
      case 3:
        if (formData.instructions.some(inst => !inst.trim())) newErrors.instructions = "All instructions must be filled";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        alert("Recipe uploaded successfully! 🎉");
        setIsSubmitting(false);
        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "",
          difficulty: "medium",
          servings: "4",
          prepTime: "",
          cookTime: "",
          totalTime: "",
          ingredients: [""],
          instructions: [""],
          tags: "",
          dietType: "",
          calories: "",
          cuisine: "",
          recipeImage: null,
          tips: "",
          nutritionInfo: {
            protein: "",
            carbs: "",
            fat: "",
            fiber: ""
          }
        });
        setCurrentStep(1);
      }, 2000);
    }
  };

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Ingredients" },
    { number: 3, title: "Instructions" },
    { number: 4, title: "Final Details" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">
            Share Your Recipe ✨
          </h1>
          <p className="text-lg text-amber-600 max-w-2xl mx-auto">
            Join our community of food lovers! Share your favorite recipes and inspire others to create delicious meals.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                  currentStep >= step.number 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-amber-200 text-amber-600'
                }`}>
                  {step.number}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-amber-800' : 'text-amber-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 ml-4 ${
                    currentStep > step.number ? 'bg-amber-600' : 'bg-amber-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Basic Recipe Information</h2>
              
              {/* Recipe Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-amber-700 mb-2">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full p-4 border-2 rounded-lg focus:outline-none ${
                    errors.title ? 'border-red-400 focus:border-red-500' : 'border-amber-200 focus:border-amber-500'
                  }`}
                  placeholder="Enter your recipe title..."
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Recipe Image */}
              <div>
                <label htmlFor="recipeImage" className="block text-sm font-semibold text-amber-700 mb-2">
                  Recipe Image
                </label>
                <div className="border-2 border-dashed border-amber-300 rounded-lg p-8 text-center">
                  {formData.recipeImage ? (
                    <div className="space-y-4">
                      <img src={formData.recipeImage} alt="Recipe preview" className="mx-auto max-h-48 rounded-lg" />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, recipeImage: null }))}
                        className="text-amber-600 hover:text-amber-800"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl text-amber-300">📸</div>
                      <div>
                        <input
                          type="file"
                          id="recipeImage"
                          name="recipeImage"
                          onChange={handleImageChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <label
                          htmlFor="recipeImage"
                          className="cursor-pointer bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                        >
                          Upload Image
                        </label>
                        <p className="text-sm text-amber-600 mt-2">JPG, PNG, or GIF (max 5MB)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-amber-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full p-4 border-2 rounded-lg focus:outline-none resize-none ${
                    errors.description ? 'border-red-400 focus:border-red-500' : 'border-amber-200 focus:border-amber-500'
                  }`}
                  placeholder="Describe your recipe, what makes it special..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Category and Cuisine */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-amber-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full p-4 border-2 rounded-lg focus:outline-none ${
                      errors.category ? 'border-red-400 focus:border-red-500' : 'border-amber-200 focus:border-amber-500'
                    }`}
                  >
                    <option value="">Select Category</option>
                    <option value="appetizer">Appetizer</option>
                    <option value="main-course">Main Course</option>
                    <option value="dessert">Dessert</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                    <option value="beverage">Beverage</option>
                    <option value="salad">Salad</option>
                    <option value="soup">Soup</option>
                  </select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div>
                  <label htmlFor="cuisine" className="block text-sm font-semibold text-amber-700 mb-2">
                    Cuisine
                  </label>
                  <select
                    id="cuisine"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  >
                    <option value="">Select Cuisine</option>
                    <option value="american">American</option>
                    <option value="italian">Italian</option>
                    <option value="chinese">Chinese</option>
                    <option value="indian">Indian</option>
                    <option value="mexican">Mexican</option>
                    <option value="french">French</option>
                    <option value="japanese">Japanese</option>
                    <option value="thai">Thai</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Timing */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="prepTime" className="block text-sm font-semibold text-amber-700 mb-2">
                    Prep Time (minutes) *
                  </label>
                  <input
                    type="number"
                    id="prepTime"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleInputChange}
                    className={`w-full p-4 border-2 rounded-lg focus:outline-none ${
                      errors.prepTime ? 'border-red-400 focus:border-red-500' : 'border-amber-200 focus:border-amber-500'
                    }`}
                    placeholder="15"
                    min="0"
                  />
                  {errors.prepTime && <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>}
                </div>

                <div>
                  <label htmlFor="cookTime" className="block text-sm font-semibold text-amber-700 mb-2">
                    Cook Time (minutes) *
                  </label>
                  <input
                    type="number"
                    id="cookTime"
                    name="cookTime"
                    value={formData.cookTime}
                    onChange={handleInputChange}
                    className={`w-full p-4 border-2 rounded-lg focus:outline-none ${
                      errors.cookTime ? 'border-red-400 focus:border-red-500' : 'border-amber-200 focus:border-amber-500'
                    }`}
                    placeholder="30"
                    min="0"
                  />
                  {errors.cookTime && <p className="text-red-500 text-sm mt-1">{errors.cookTime}</p>}
                </div>

                <div>
                  <label htmlFor="servings" className="block text-sm font-semibold text-amber-700 mb-2">
                    Servings
                  </label>
                  <input
                    type="number"
                    id="servings"
                    name="servings"
                    value={formData.servings}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    placeholder="4"
                    min="1"
                  />
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label htmlFor="difficulty" className="block text-sm font-semibold text-amber-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Ingredients */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Ingredients</h2>
              
              <div>
                <label className="block text-sm font-semibold text-amber-700 mb-4">
                  Recipe Ingredients * (Include quantities and measurements)
                </label>
                <div className="space-y-3">
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
                        className="flex-1 p-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                        placeholder={`Ingredient ${index + 1} (e.g., 2 cups flour, 1 tsp salt)`}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'ingredients')}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        disabled={formData.ingredients.length === 1}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('ingredients')}
                    className="w-full p-3 border-2 border-dashed border-amber-300 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    + Add Ingredient
                  </button>
                  {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Instructions */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Cooking Instructions</h2>
              
              <div>
                <label className="block text-sm font-semibold text-amber-700 mb-4">
                  Step-by-Step Instructions *
                </label>
                <div className="space-y-4">
                  {formData.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-2">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={instruction}
                          onChange={(e) => handleArrayChange(index, e.target.value, 'instructions')}
                          className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none resize-none"
                          rows={3}
                          placeholder={`Step ${index + 1}: Describe what to do...`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'instructions')}
                        className="flex-shrink-0 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2"
                        disabled={formData.instructions.length === 1}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('instructions')}
                    className="w-full p-3 border-2 border-dashed border-amber-300 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    + Add Step
                  </button>
                  {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Final Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Final Details</h2>
              
              {/* Tags and Diet Type */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="tags" className="block text-sm font-semibold text-amber-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    placeholder="e.g., quick, healthy, family-friendly"
                  />
                </div>

                <div>
                  <label htmlFor="dietType" className="block text-sm font-semibold text-amber-700 mb-2">
                    Diet Type
                  </label>
                  <select
                    id="dietType"
                    name="dietType"
                    value={formData.dietType}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  >
                    <option value="">Select Diet Type</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten Free</option>
                    <option value="keto">Keto</option>
                    <option value="paleo">Paleo</option>
                    <option value="dairy-free">Dairy Free</option>
                    <option value="low-carb">Low Carb</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>

              {/* Nutrition Information */}
              <div>
                <h3 className="text-lg font-semibold text-amber-800 mb-4">Nutrition Information (Optional)</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="calories" className="block text-sm font-semibold text-amber-700 mb-2">
                      Calories per serving
                    </label>
                    <input
                      type="number"
                      id="calories"
                      name="calories"
                      value={formData.calories}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                      placeholder="250"
                      min="0"
                    />
                  </div>

                  <div>
                    <label htmlFor="nutritionInfo.protein" className="block text-sm font-semibold text-amber-700 mb-2">
                      Protein (g)
                    </label>
                    <input
                      type="number"
                      id="nutritionInfo.protein"
                      name="nutritionInfo.protein"
                      value={formData.nutritionInfo.protein}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                      placeholder="15"
                      min="0"
                    />
                  </div>

                  <div>
                    <label htmlFor="nutritionInfo.carbs" className="block text-sm font-semibold text-amber-700 mb-2">
                      Carbs (g)
                    </label>
                    <input
                      type="number"
                      id="nutritionInfo.carbs"
                      name="nutritionInfo.carbs"
                      value={formData.nutritionInfo.carbs}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                      placeholder="30"
                      min="0"
                    />
                  </div>

                  <div>
                    <label htmlFor="nutritionInfo.fat" className="block text-sm font-semibold text-amber-700 mb-2">
                      Fat (g)
                    </label>
                    <input
                      type="number"
                      id="nutritionInfo.fat"
                      name="nutritionInfo.fat"
                      value={formData.nutritionInfo.fat}
                      onChange={handleInputChange}
                      className="w-full p-3 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none"
                      placeholder="10"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Cooking Tips */}
              <div>
                <label htmlFor="tips" className="block text-sm font-semibold text-amber-700 mb-2">
                  Cooking Tips & Notes (Optional)
                </label>
                <textarea
                  id="tips"
                  name="tips"
                  value={formData.tips}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-4 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:outline-none resize-none"
                  placeholder="Share any helpful tips, substitutions, or variations..."
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-amber-200">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border-2 border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  ← Previous Step
                </button>
              )}
            </div>

            <div>
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <span>🚀 Publish Recipe</span>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-4">💡 Recipe Upload Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
            <div className="space-y-2">
              <p>• Use clear, step-by-step instructions</p>
              <p>• Include exact measurements and temperatures</p>
              <p>• Add helpful cooking tips and alternatives</p>
            </div>
            <div className="space-y-2">
              <p>• Upload high-quality photos</p>
              <p>• Tag your recipes for easy discovery</p>
              <p>• Share what makes your recipe special</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}