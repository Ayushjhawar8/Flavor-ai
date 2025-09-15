"use client";

import { useState } from "react";
import { getCurrentUser } from "@/lib/mockAuth";
import { saveCommunityRecipe } from "@/lib/communityStorage";

export default function RecipeUploadForm({ onRecipeUploaded }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    cookTime: "",
    servings: "",
    difficulty: "Easy"
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const currentUser = getCurrentUser();
      
      const ingredientsList = formData.ingredients
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.trim());
      
      const instructionsList = formData.instructions
        .split('\n')
        .filter(line => line.trim())
        .map(line => line.trim());

      const recipe = {
        title: formData.title,
        description: formData.description,
        ingredients: ingredientsList,
        instructions: instructionsList,
        cookTime: formData.cookTime,
        servings: parseInt(formData.servings),
        difficulty: formData.difficulty,
        image: imagePreview || "https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&h=300&fit=crop",
        author: {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar
        },
        type: "community"
      };

      const savedRecipe = saveCommunityRecipe(recipe);
      
      setFormData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        cookTime: "",
        servings: "",
        difficulty: "Easy"
      });
      setImagePreview(null);
      
      if (onRecipeUploaded) onRecipeUploaded(savedRecipe);
      
    } catch (error) {
      console.error("Error uploading recipe:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Share Your Recipe</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Recipe Title</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="input input-bordered"
            placeholder="My Amazing Recipe"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Description</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="textarea textarea-bordered h-20"
            placeholder="Tell us about your recipe..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Cook Time</span>
            </label>
            <input
              type="text"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleInputChange}
              className="input input-bordered"
              placeholder="30 mins"
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Servings</span>
            </label>
            <input
              type="number"
              name="servings"
              value={formData.servings}
              onChange={handleInputChange}
              className="input input-bordered"
              placeholder="4"
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Difficulty</span>
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="select select-bordered"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Ingredients (one per line)</span>
          </label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            className="textarea textarea-bordered h-32"
            placeholder="2 cups flour&#10;1 tsp salt&#10;3 eggs"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Instructions (one step per line)</span>
          </label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            className="textarea textarea-bordered h-40"
            placeholder="Preheat oven to 350°F&#10;Mix dry ingredients&#10;Add wet ingredients"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Recipe Image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered"
          />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
        >
          {isSubmitting ? 'Uploading...' : 'Share Recipe'}
        </button>
      </form>
    </div>
  );
}