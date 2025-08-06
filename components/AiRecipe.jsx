"use client";

import { useState, useEffect } from "react";
import { PlusIcon2, PlusIcon } from "@/components/Icons";
import TextToSpeech from "./TextToSpeech";

// /**
//  * AiRecipe Component
//  * 
//  * Displays recipe details including ingredients, instructions, and image
//  * 
//  * Props:
//  * @param {Object} recipe - Recipe data including name, ingredients, steps, area, category
//  * @param {Function} setShowRecipe - Controls visibility of the recipe display
//  * @param {string} recipeImageUrl - URL of the generated recipe image
//  */

export default function AiRecipe({ recipe, setShowRecipe, recipeImageUrl }) {
  const [error, setError] = useState(null);

  // Validate recipe data on mount
  useEffect(() => {
    if (!recipe || !recipe.name || !recipe.ingredients || !recipe.steps) {
      setError("Recipe data is unavailable. Please ensure all API keys are set and try again.");
    }
  }, [recipe]);

  if (error) {
    return (
      <div className="max-w-96 md:max-w-7xl w-full bg-white text-gray-800 shadow-md rounded-lg overflow-hidden p-10">
        <button
          className="absolute top-10 right-10 btn btn-sm btn-secondary"
          onClick={() => setShowRecipe(false)}
        >
          Close
        </button>
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  if (!recipe) {
    return null; 
  }

  return (
    <div className="max-w-96 md:max-w-7xl w-full bg-white text-gray-800 shadow-md rounded-lg overflow-hidden">
      <button
        className="absolute top-10 right-10 btn btn-sm btn-secondary"
        onClick={() => setShowRecipe(false)}
      >
        Close
      </button>
      <div className="px-10 md:px-20 py-10">
        <h1 className="text-3xl md:text-4xl text-center font-bold text-primary mb-4">
          {recipe.name} 🍲
        </h1>
        <div className="flex flex-col md:flex-row gap-10">
          <div>
            {recipeImageUrl ? (
              <img
                src={recipeImageUrl}
                alt={recipe.name}
                className="max-w-72 md:max-w-xl h-auto rounded-lg mb-4"
              />
            ) : (
              <div className="text-gray-500 mb-4">No image available for this recipe.</div>
            )}
            <div className="flex items-center space-x-4 mb-4">
              {recipe.area && <span className="badge badge-primary">{recipe.area}</span>}
              {recipe.category && <span className="badge badge-success">{recipe.category}</span>}
            </div>
          </div>
          <div>
            <h2 className="text-xl text-neutral-content font-semibold mb-2 flex items-center">
              <PlusIcon />
              <span className="ml-2">Ingredients</span>
            </h2>
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              <table className="w-full mb-4">
                <tbody>
                  {recipe.ingredients.map(({ name, amount }, index) => (
                    <tr key={index}>
                      <td className="py-1 pr-4">{name}</td>
                      <td className="py-1">{amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-gray-500">No ingredients available.</div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl text-neutral-content font-semibold mb-2 flex items-center">
            <PlusIcon2 />
            Instructions
          </h2>
          {recipe.steps && recipe.steps.length > 0 ? (
            (() => {
              const cleanedSteps = recipe.steps
                .map(step => step.replace(/^\s*\d+([.)])?\s*/, "").trim())
                .filter(Boolean);
              return (
                <>
                  <p className="text-base-content">{cleanedSteps.join("\n")}</p>
                  <TextToSpeech sentences={cleanedSteps} onHighlightChange={() => {}} />
                </>
              );
            })()
          ) : (
            <div className="text-gray-500">No instructions available.</div>
          )}
        </div>
      </div>
    </div>
  );
}