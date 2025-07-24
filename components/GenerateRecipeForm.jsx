"use client";

import { useForm } from "react-hook-form";
import {
  CheckboxField,
  InputField,
  SelectField,
} from "@/components/FormComponents";

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
function GenerateRecipeForm({ setRecipe, setShowRecipe, setRecipeImageUrl }) {
  const { register, handleSubmit } = useForm({
    // Default form values
    defaultValues: {
      dishType: "Snack",
      cuisine: "Indian",
      dietaryRestrictions: [],
      spiceLevel: "Spicy",
    },
  });

  /**
   * Form submission handler
   * Generates recipe and corresponding image using API
   */
  const onSubmit = async (data) => {
    // Generate recipe
    const res = await fetch("/api/generate-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const recipeRes = await res.json();
    if (!recipeRes.recipe || recipeRes.error) {
      alert(recipeRes.error || "Failed to generate recipe.");
      return;
    }
    setRecipe(recipeRes.recipe);

    // Generate recipe image
    const imagePrompt = `${data.userPrompt}, ${recipeRes.recipe.name}`;
    const resImage = await fetch("/api/generate-recipe-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: imagePrompt }),
    });
    setRecipeImageUrl((await resImage.json()).url);

    setShowRecipe(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl p-6 bg-white rounded-lg shadow-xl"
    >
      <InputField
        label="Describe about dish:"
        name="userPrompt"
        register={register}
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
