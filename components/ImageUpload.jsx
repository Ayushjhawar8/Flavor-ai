"use client";

import { useState } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";

/**
 * ImageUpload Component
 * 
 * Handles image upload and ingredient analysis functionality
 * Allows users to upload images of their available ingredients
 * 
 * Props:
 * @param {Function} onIngredientsAnalyzed - Callback with analyzed ingredients
 * @param {Array} analyzedIngredients - Currently analyzed ingredients
 */
function ImageUpload({ onIngredientsAnalyzed, analyzedIngredients = [] }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState("");

  /**
   * Handles file selection and converts to base64
   */
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setError("");
    
    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  /**
   * Analyzes the uploaded image for ingredients
   */
  const analyzeIngredients = async () => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);
    setError("");

    try {
      const response = await fetch("/api/analyze-ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: uploadedImage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error?.includes("quota")) {
          throw new Error("OpenAI quota exceeded. Please add credits to your OpenAI account or try again later.");
        }
        throw new Error("Failed to analyze ingredients");
      }

      const result = await response.json();
      onIngredientsAnalyzed(result.ingredients);
    } catch (err) {
      setError(err.message || "Failed to analyze ingredients. Please try again.");
      console.error("Error analyzing ingredients:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Removes uploaded image and clears analysis
   */
  const clearImage = () => {
    setUploadedImage(null);
    setError("");
    onIngredientsAnalyzed([]);
  };

  return (
    <div className="w-full space-y-4">
      <div className="text-sm font-medium text-gray-700">
        Upload Image of Available Ingredients (Optional):
      </div>

      {/* File Upload Area */}
      {!uploadedImage ? (
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="ingredient-image"
          />
          <label
            htmlFor="ingredient-image"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <PhotoIcon className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">
              Click to upload ingredient image
            </span>
            <span className="text-xs text-gray-400">
              PNG, JPG up to 5MB
            </span>
          </label>
        </div>
      ) : (
        /* Image Preview */
        <div className="relative">
          <img
            src={uploadedImage}
            alt="Uploaded ingredients"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
          
          {/* Analyze Button */}
          {analyzedIngredients.length === 0 && (
            <button
              onClick={analyzeIngredients}
              disabled={isAnalyzing}
              className="absolute bottom-2 left-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Ingredients"}
            </button>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {/* Analyzed Ingredients Display */}
      {analyzedIngredients.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">
            Identified Ingredients:
          </h4>
          <div className="flex flex-wrap gap-2">
            {analyzedIngredients.map((ingredient, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full"
              >
                {ingredient.name}
                {ingredient.quantity && (
                  <span className="ml-1 text-green-600">
                    ({ingredient.quantity})
                  </span>
                )}
              </span>
            ))}
          </div>
          <button
            onClick={() => onIngredientsAnalyzed([])}
            className="mt-2 text-sm text-green-700 hover:text-green-900 underline"
          >
            Clear analysis
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
