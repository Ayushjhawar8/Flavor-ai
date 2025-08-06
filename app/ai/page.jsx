"use client";

import AiRecipe from "@/components/AiRecipe";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import GenerateRecipeForm from "@/components/GenerateRecipeForm";
import { useRef, useState } from "react";

function Page() {
  const [recipe, setRecipe] = useState(null);
  const [recipeImageUrl, setRecipeImageUrl] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false);

  const formResetRef = useRef();

  const handleReset = () => {
    setRecipe(null);
    setShowRecipe(false);
    setRecipeImageUrl(null);


    if (formResetRef.current) {
      formResetRef.current();
    }
  };

  return (
    <>
      <div className="min-h-screen py-10 bg-base-100 flex flex-col justify-center items-center relative">
        <BackButton />

        {showRecipe && recipe ? (
          <AiRecipe
            recipe={recipe}
            recipeImageUrl={recipeImageUrl}
            setShowRecipe={setShowRecipe}
          />
        ) : (
          <GenerateRecipeForm
            setRecipe={setRecipe}
            setShowRecipe={setShowRecipe}
            setRecipeImageUrl={setRecipeImageUrl}
            onResetRef={formResetRef}
          />
        )}

        {!showRecipe && (
          <div className="flex space-x-4 mt-5">
            {/* Only show Clear button when not showing recipe */}
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleReset}
            >
              Clear
            </button>

            {/* Only show View Recipe button when recipe exists */}
            {recipe && (
              <button
                className="btn btn-accent btn-sm"
                onClick={() => setShowRecipe(true)}
              >
                View Recipe
              </button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Page;
