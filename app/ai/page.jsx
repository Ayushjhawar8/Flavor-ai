"use client";

import AiRecipe from "@/components/AiRecipe";
import BackButton from "@/components/BackButton";
import GenerateRecipeForm from "@/components/GenerateRecipeForm";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import { useRef, useState } from "react";

function Page()
{
  const [recipe, setRecipe] = useState(null);
  const [recipeImageUrl, setRecipeImageUrl] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false);

  const formResetRef = useRef();

  const handleReset = () =>
  {
    setRecipe(null);
    setShowRecipe(false);
    setRecipeImageUrl(null);


    if (formResetRef.current)
    {
      formResetRef.current();
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col relative">
      {/* Simple Navbar */}
      <div className="navbar bg-base-100 border-b border-base-300 px-4">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl font-bold text-base-content">
            Flavor AI
          </Link>
        </div>
        <div className="flex-none">
          <ThemeToggle />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center py-10">
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
    </div>
  );
}

export default Page;
