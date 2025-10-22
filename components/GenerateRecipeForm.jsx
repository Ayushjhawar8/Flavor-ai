"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CheckboxField,
  InputField,
  SelectField,
} from "@/components/FormComponents";
import ImageUpload from "@/components/ImageUpload";

function GenerateRecipeForm({
  setRecipe,
  setShowRecipe,
  setRecipeImageUrl,
  onResetRef,
}) {
  const [analyzedIngredients, setAnalyzedIngredients] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      userPrompt: "",
      dishType: "Snack",
      cuisine: "Indian",
      dietaryRestrictions: [],
      spiceLevel: "Spicy",
    },
  });

  if (onResetRef) {
    onResetRef.current = reset;
  }

  const onSubmit = async (data) => {
    setError(null);
    setIsLoading(true);
    setShowRecipe(false); // Hide previous recipe while loading

    const requestData = {
      ...data,
      availableIngredients: analyzedIngredients,
    };

    try {
      // Step 1: Generate the recipe text
      const recipeRes = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!recipeRes.ok) {
        const errorData = await recipeRes.json();
        throw new Error(errorData.error || "Recipe generation failed");
      }

      const recipeData = await recipeRes.json();
      setRecipe(recipeData);

      // Step 2: Generate the recipe image
      const imagePrompt = `${recipeData.name}, ${data.userPrompt}`;
      const imageRes = await fetch("/api/generate-recipe-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: imagePrompt }),
      });

      if (imageRes.ok) {
        const imageData = await imageRes.json();
        setRecipeImageUrl(imageData.url);
      } else {
        console.error("Image generation failed, but showing recipe anyway.");
        setRecipeImageUrl(""); // Clear or set a fallback image
      }

      setShowRecipe(true); // Show the new recipe
    } catch (err) {
      setError(err.message); // Set the specific error message
    } finally {
      setIsLoading(false);
    }
  };

  const dietaryDescriptions = {
    Vegetarian: "Suitable for those avoiding meat and fish.",
    Vegan: "Excludes all animal products, including dairy and eggs.",
    "Gluten-Free": "Avoids gluten, a protein found in wheat, barley, and rye.",
    "Dairy-Free": "Avoids milk and all dairy products.",
    "Nut-Free": "Excludes all tree nuts and peanuts.",
    Halal: "Follows Islamic dietary laws.",
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-[20px] text-brown-800">
        AI-Powered Recipe Generator
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl p-6 rounded-lg shadow-xl bg-white dark:bg-base-200 space-y-4"
      >
        <ImageUpload
          onIngredientsAnalyzed={setAnalyzedIngredients}
          analyzedIngredients={analyzedIngredients}
        />
        <InputField
          label="Describe the dish you want:"
          name="userPrompt"
          register={register}
          watch={watch}
          placeholder="e.g., a quick evening snack, low-carb"
        />
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <SelectField
            label="Type of Dish:"
            name="dishType"
            options={[
              "Snack",
              "Appetizer",
              "Main Course",
              "Dessert",
              "Beverage",
            ]}
            register={register}
          />
          <SelectField
            label="Cuisine Preference:"
            name="cuisine"
            options={[
              "Indian",
              "Italian",
              "Mexican",
              "Chinese",
              "American",
              "Mediterranean",
            ]}
            register={register}
          />
        </div>
        <CheckboxField
          label="Dietary Restrictions:"
          name="dietaryRestrictions"
          options={[
            "Vegetarian",
            "Vegan",
            "Gluten-Free",
            "Dairy-Free",
            "Nut-Free",
            "Halal",
          ]}
          register={register}
          descriptions={dietaryDescriptions}
        />
        <SelectField
          label="Spice Level:"
          name="spiceLevel"
          options={["Spicy", "Mild", "Medium", "Extra Spicy"]}
          register={register}
        />
        <button
          type="submit"
          className="btn btn-primary w-full text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner"></span>
              Generating...
            </>
          ) : (
            "Generate Recipe"
          )}
        </button>
        {error && (
          <div className="text-red-500 text-center mt-2">{`Error: ${error}`}</div>
        )}
      </form>
    </>
  );
}

export default GenerateRecipeForm;
