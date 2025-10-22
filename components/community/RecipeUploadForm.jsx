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
    cookTimeHours: "",
    cookTimeMinutes: "",
    servings: "",
    difficulty: "Easy",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Validating the number of servings and cook time
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Validates the servings
    if (name === "servings") {
      const numValue = parseInt(value);
      if (value && numValue < 1) {
        setErrors({ ...errors, servings: "Servings must be at least 1" });
        return;
      } else {
        const newErrors = { ...errors };
        delete newErrors.servings;
        setErrors(newErrors);
      }
    }

    // Validate cook time hours
    if (name === "cookTimeHours") {
      const numValue = parseInt(value);
      if (value && (numValue < 0 || numValue > 24)) {
        setErrors({ ...errors, cookTimeHours: "Hours must be 0-24" });
        return;
      } else {
        const newErrors = { ...errors };
        delete newErrors.cookTimeHours;
        setErrors(newErrors);
      }
    }

    // Validate cook time minutes
    if (name === "cookTimeMinutes") {
      const numValue = parseInt(value);
      if (value && (numValue < 0 || numValue > 59)) {
        setErrors({ ...errors, cookTimeMinutes: "Minutes must be 0-59" });
        return;
      } else {
        const newErrors = { ...errors };
        delete newErrors.cookTimeMinutes;
        setErrors(newErrors);
      }
    }

    setFormData({ ...formData, [name]: value });
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

    // To make sure the cook time is not empty
    if (!formData.cookTimeHours && !formData.cookTimeMinutes) {
      setErrors({ ...errors, cookTime: "Please enter cook time" });
      return;
    }

    setIsSubmitting(true);

    try {
      const currentUser = getCurrentUser();

      const ingredientsList = formData.ingredients
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => line.trim());

      const instructionsList = formData.instructions
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => line.trim());

      // Format cook time
      const hours = parseInt(formData.cookTimeHours) || 0;
      const minutes = parseInt(formData.cookTimeMinutes) || 0;
      let cookTimeStr = "";
      if (hours > 0) {
        cookTimeStr += `${hours} hr${hours > 1 ? "s" : ""}`;
      }
      if (minutes > 0) {
        if (cookTimeStr) cookTimeStr += " ";
        cookTimeStr += `${minutes} min${minutes > 1 ? "s" : ""}`;
      }

      const recipe = {
        title: formData.title,
        description: formData.description,
        ingredients: ingredientsList,
        instructions: instructionsList,
        cookTime: cookTimeStr,
        servings: parseInt(formData.servings),
        difficulty: formData.difficulty,
        image:
          imagePreview ||
          "https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&h=300&fit=crop",
        author: {
          id: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
        type: "community",
      };

      const savedRecipe = saveCommunityRecipe(recipe);

      setFormData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        cookTimeHours: "",
        cookTimeMinutes: "",
        servings: "",
        difficulty: "Easy",
      });
      setImagePreview(null);
      setErrors({});

      if (onRecipeUploaded) onRecipeUploaded(savedRecipe);
    } catch (error) {
      console.error("Error uploading recipe:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label mb-2">
            <span className="label-text font-semibold">Recipe Title *</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            placeholder="My Amazing Recipe"
            required
          />
        </div>

        {/* Description of the recipe*/}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="textarea textarea-bordered h-20"
            placeholder="Tell us about your recipe..."
          />
        </div>

        {/* Cook Time, Servings, and Difficulty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cook Time */}
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text font-semibold">Cook Time *</span>
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  name="cookTimeHours"
                  min="0"
                  max="24"
                  value={formData.cookTimeHours}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full ${errors.cookTimeHours ? "input-error" : ""}`}
                  placeholder="Hrs"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  name="cookTimeMinutes"
                  min="0"
                  max="59"
                  value={formData.cookTimeMinutes}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full ${errors.cookTimeMinutes ? "input-error" : ""}`}
                  placeholder="Mins"
                />
              </div>
            </div>
            {(errors.cookTime ||
              errors.cookTimeHours ||
              errors.cookTimeMinutes) && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.cookTime ||
                    errors.cookTimeHours ||
                    errors.cookTimeMinutes}
                </span>
              </label>
            )}
          </div>

          {/* Servings */}
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text font-semibold">Servings *</span>
            </label>
            <input
              type="number"
              name="servings"
              min="1"
              value={formData.servings}
              onChange={handleInputChange}
              className={`input input-bordered w-full ${errors.servings ? "input-error" : ""}`}
              placeholder="4"
              required
            />
            {errors.servings && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.servings}
                </span>
              </label>
            )}
          </div>

          {/* Difficulty of recipe*/}
          <div className="form-control">
            <label className="label mb-2">
              <span className="label-text font-semibold">Difficulty</span>
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="select select-bordered w-full"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Ingredients */}
        <div className="form-control">
          <label className="label mb-2">
            <span className="label-text font-semibold">
              Ingredients (one per line) *
            </span>
          </label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            className="textarea textarea-bordered h-36 w-full resize-none font-mono text-sm"
            placeholder="2 cups flour&#10;1 tsp salt&#10;3 eggs"
            required
          />
          <label className="label">
            <span className="label-text-alt text-base-content/60">
              Press Enter after each ingredient
            </span>
          </label>
        </div>

        {/* Instructions */}
        <div className="form-control">
          <label className="label mb-2">
            <span className="label-text font-semibold">
              Instructions (one step per line) *
            </span>
          </label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            className="textarea textarea-bordered h-40"
            placeholder="Preheat oven to 350°F&#10;Mix dry ingredients &#10;Add wet ingredients"
            required
          />
          <label className="label">
            <span className="label-text-alt text-base-content/60">
              Press Enter after each step
            </span>
          </label>
        </div>

        {/* Recipe Image section */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Recipe Image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
          {imagePreview && (
            <div className="mt-4">
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg shadow-md border-2 border-base-300"
                />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="btn btn-circle btn-xs btn-error absolute -top-2 -right-2"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className={`btn btn-primary w-full text-base h-12 ${isSubmitting ? "loading" : ""}`}
          >
            {isSubmitting ? "Uploading Recipe..." : "Share Recipe"}
          </button>
        </div>

        <p className="text-left font-semibold text-sm text-base-content/60 mt-4">
          * Required fields
        </p>
      </form>
    </div>
  );
}
