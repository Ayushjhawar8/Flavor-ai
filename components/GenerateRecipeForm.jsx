"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CheckboxField,
  InputField,
  SelectField,
} from "@/components/FormComponents";
import ImageUpload from "@/components/ImageUpload";

/**
 * GenerateRecipeForm Component
 * 
 * A form component that collects user preferences for recipe generation
 * Uses react-hook-form for form state management
 * 
 * Props:
 * @param {Function} setRecipe - Updates parent component with generated recipe
 * @param {Function} setShowRecipe - Controls recipe display visibility
 * @param {Function} setRecipeImageUrl - Updates recipe image URL
 */
function GenerateRecipeForm({ setRecipe, setShowRecipe, setRecipeImageUrl, onResetRef }) {
  const [analyzedIngredients, setAnalyzedIngredients] = useState([]);
  
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


  /**
   * Form submission handler
   * Generates recipe and corresponding image using API
   */
  const onSubmit = async (data) => {
    // Add analyzed ingredients to the request data
    const requestData = {
      ...data,
      availableIngredients: analyzedIngredients,
    };

    // Generate recipe
    const res = await fetch("/api/generate-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const recipe = await res.json();
    setRecipe(recipe.recipe);

    // Generate recipe image
    const imagePrompt = await `${data.userPrompt}, ${recipe.recipe.name}`;
    const resImage = await fetch("/api/generate-recipe-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: imagePrompt }),
    });
    setRecipeImageUrl((await resImage.json()).url);

    // setShowRecipe(true);
  };

  const dietaryDescriptions = {
    Vegetarian: "Suitable for those avoiding meat and fish.",
    Vegan: "Excludes all animal products, including dairy and eggs.",
    "Gluten-Free": "Avoids gluten, a protein found in wheat, barley, and rye. Suitable for people with celiac disease or gluten sensitivity.",
    "Dairy-Free": "Avoids milk and all dairy products, including cheese, butter, and yogurt.",
    "Nut-Free": "Excludes all tree nuts and peanuts. Important for those with nut allergies.",
    Halal: "Follows Islamic dietary laws. Prohibits pork and alcohol; meat must be prepared in a specific way (halal-certified).",
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
className="w-full max-w-xl p-6 rounded-lg shadow-xl bg-white dark:bg-base-200 space-y-4"

    >
      <ImageUpload
        onIngredientsAnalyzed={setAnalyzedIngredients}
        analyzedIngredients={analyzedIngredients}
      />

      <InputField
        label="Describe about dish:"
        name="userPrompt"
        register={register}
        watch={watch}
      />

      <div className="flex w-full justify-between">
        <SelectField
          label="Type of Dish:"
          name="dishType"
          options={[
            "",
            "Appetizer",
            "Main Course",
            "Dessert",
            "Snack",
            "Beverage",
          ]}
          register={register}
        />

        <SelectField
          label="Cuisine Preference:"
          name="cuisine"
          options={[
            "",
            "Italian",
            "Mexican",
            "Indian",
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
        descriptions = {dietaryDescriptions} //Added this For 
      />

      <SelectField
        label="Spice Level:"
        name="spiceLevel"
        options={["", "Mild", "Medium", "Spicy", "Extra Spicy"]}
        register={register}
      />

      <button type="submit" className="btn btn-primary w-full text-white">
        Generate Recipe
      </button>
    </form>
  );
}

export default GenerateRecipeForm;
