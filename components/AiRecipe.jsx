"use client";

import { useState, useEffect } from "react";
import { PlusIcon2, PlusIcon } from "@/components/Icons";
import TextToSpeech from "./TextToSpeech";
import PreparationChecklist from "./PreparationChecklist";

export default function AiRecipe({ recipe, setShowRecipe, recipeImageUrl }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    // We can remove the error check for ingredients here, as the new rendering logic is more flexible.
    if (!recipe || !recipe.name || !recipe.steps) {
      setError(
        "Recipe data is incomplete. Please try generating the recipe again.",
      );
    } else {
      setError(null); // Clear previous errors if new valid recipe is passed
    }
  }, [recipe]);

  if (error) {
    return (
      <div className="max-w-96 md:max-w-7xl w-full bg-base-100 text-base-content shadow-md rounded-lg overflow-hidden p-10">
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
    <div className="max-w-96 md:max-w-7xl w-full bg-base-100 text-base-content shadow-md rounded-lg overflow-hidden">
      <button
        className="absolute top-10 right-10 btn btn-sm btn-secondary no-print"
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
              <div className="text-base-content/60 mb-4">
                No image available for this recipe.
              </div>
            )}
            <div className="flex items-center space-x-4 mb-4">
              {recipe.area && (
                <span className="badge badge-primary">{recipe.area}</span>
              )}
              {recipe.category && (
                <span className="badge badge-success">{recipe.category}</span>
              )}
              <button
                onClick={() => window.print()}
                className="btn btn-sm btn-outline ml-auto"
                title="Print or save as PDF"
              >
                🖨️ Print Recipe
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-xl text-base-content font-semibold mb-2 flex items-center">
              <PlusIcon />
              <span className="ml-2">Ingredients</span>
            </h2>
            {/* ✨ START: UPDATED INGREDIENT RENDERING LOGIC ✨ */}
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              <table className="w-full mb-4">
                <tbody>
                  {recipe.ingredients.map((ingredient, index) => {
                    // Handle if ingredient is a simple string
                    if (typeof ingredient === "string") {
                      return (
                        <tr key={index}>
                          <td className="py-1" colSpan="2">
                            {ingredient}
                          </td>
                        </tr>
                      );
                    }

                    // Handle if ingredient is an object (flexible keys)
                    if (typeof ingredient === "object" && ingredient !== null) {
                      const values = Object.values(ingredient);
                      return (
                        <tr key={index}>
                          <td className="py-1 pr-4">{values[0]}</td>
                          <td className="py-1">{values[1]}</td>
                        </tr>
                      );
                    }

                    return null; // Don't render if format is unknown
                  })}
                </tbody>
              </table>
            ) : (
              <div className="text-base-content/60">
                No ingredients available.
              </div>
            )}
            {/* ✨ END: UPDATED LOGIC ✨ */}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl text-base-content font-semibold mb-2 flex items-center">
            <PlusIcon2 />
            Instructions
          </h2>
          {recipe.steps && recipe.steps.length > 0 ? (
            (() => {
              const cleanedSteps = recipe.steps
                .map((step) =>
                  String(step)
                    .replace(/^\s*\d+([.)]?)/, "")
                    .trim(),
                )
                .filter(Boolean);
              return (
                <>
                  <PreparationChecklist
                    steps={cleanedSteps}
                    checklistKey={`ai-recipe-steps-${recipe.name}`}
                  />
                  <TextToSpeech
                    sentences={cleanedSteps}
                    onHighlightChange={() => {}}
                  />
                </>
              );
            })()
          ) : (
            <div className="text-base-content/60">
              No instructions available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
