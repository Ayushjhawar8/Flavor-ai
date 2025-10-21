"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import BackButton from "@/components/BackButton";
import { PlusIcon } from "@/components/Icons";
import { Clock, Users } from "lucide-react";
import PreparationChecklist from "@/components/PreparationChecklist";
import RecipeNotes from "@/components/RecipeNotes";
import { getCommunityRecipes } from "@/lib/communityStorage";
import { getSimilarRecipes } from "@/lib/similarity";
import SimilarRecipes from "@/components/SimilarRecipes";
import { seedSampleRecipes } from "@/lib/seedCommunityData";

export default function ViewRecipePage() {
  const [showResults, setShowResults] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Call this once to reseed with IDs
    seedSampleRecipes(true);
    
    try {
      const storedRecipe = localStorage.getItem("current_recipe");

      if (!storedRecipe) {
        setError("No recipe found");
        setLoading(false);
        return;
      }

      const parsedRecipe = JSON.parse(storedRecipe);
      setRecipe(parsedRecipe);

      const allRecipes = getCommunityRecipes();
      console.log("All recipes:", allRecipes);
      console.log("Current recipe:", parsedRecipe);
      
      const similar = getSimilarRecipes(parsedRecipe, allRecipes);
      console.log("Similar recipes found:", similar);
      
      setSimilarRecipes(similar);

      setTimeout(() => {
        localStorage.removeItem("current_recipe");
      }, 5 * 60 * 1000);
    } catch (err) {
      console.error("Error parsing stored recipe:", err);
      setError("Invalid recipe data");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Recipe Found</h1>
          <p className="text-base-content/60 mb-4">
            The recipe data could not be loaded.
          </p>
          <BackButton />
        </div>
      </div>
    );
  }

  return renderRecipe(recipe);

  function renderRecipe(recipeData) {
    return (
      <>
        <Navbar
          showResults={showResults}
          setShowResults={setShowResults}
          handleSearchFocus={() => setShowResults(true)}
          handleBlur={() => setTimeout(() => setShowResults(false), 200)}
        />

        <div
          className={`min-h-screen py-10 px-4 mt-20 bg-base-100 flex gap-2 justify-center items-start transition-all duration-300 ${
            showResults ? "opacity-80 blur-sm" : "opacity-100"
          }`}
        >
          <BackButton />

          <div className="relative mt-14 md:mt-0 max-w-4xl w-full bg-base-200 shadow-xl rounded-xl">
            <div className="p-6 md:p-12">
              <header className="relative text-center mb-12">
                <div className="inline-block">
                  <h1 className="text-4xl md:text-6xl font-extrabold text-base-content">
                    {recipeData.title}
                  </h1>
                  <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full mt-2"></div>
                </div>
                {recipeData.description && (
                  <p className="text-lg text-base-content/90 mt-6 max-w-2xl mx-auto leading-relaxed">
                    {recipeData.description}
                  </p>
                )}

                <div className="flex items-center justify-center gap-8 mt-8 flex-wrap">
                  {recipeData.cookTime && (
                    <div className="flex items-center gap-2 bg-base-100 px-4 py-3 rounded-full shadow-md hover:shadow-lg transition-all">
                      <Clock size={20} className="text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold">{recipeData.cookTime}</span>
                    </div>
                  )}
                  {recipeData.servings && (
                    <div className="flex items-center gap-2 bg-base-100 px-4 py-3 rounded-full shadow-md hover:shadow-lg transition-all">
                      <Users size={20} className="text-purple-600 dark:text-purple-400" />
                      <span className="font-semibold">{recipeData.servings} servings</span>
                    </div>
                  )}
                  {recipeData.difficulty && (
                    <div className="badge badge-primary badge-lg px-6 py-4 text-base font-bold shadow-md">
                      {recipeData.difficulty}
                    </div>
                  )}
                </div>
              </header>

              <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-16">
                <div className="md:w-1/2 group">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6 transform transition-transform hover:scale-[1.02]">
                    <img
                      src={recipeData.image}
                      alt={recipeData.title}
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="badge badge-lg badge-accent font-bold px-5 py-4 shadow-lg">
                      {recipeData.type || "Community"}
                    </span>
                    {recipeData.author && (
                      <div className="flex items-center gap-3 bg-base-100 px-4 py-2 rounded-full shadow-md">
                        <img
                          src={recipeData.author.avatar}
                          alt={recipeData.author.name}
                          className="w-10 h-10 rounded-full ring-2 ring-purple-500"
                        />
                        <span className="text-sm font-bold">
                          {recipeData.author.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-6 flex items-center text-base-content">
                    <PlusIcon />
                    <span className="ml-2">Ingredients</span>
                  </h2>
                  <div className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-300">
                    <ul className="space-y-3">
                      {recipeData.ingredients?.map((ingredient, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">•</span>
                          <span className="text-base-content leading-relaxed">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <section id="instructions-section" className="mt-12">
                <h2 className="text-2xl font-bold text-base-content mb-6">
                  Preparation Steps
                </h2>
                <div className="bg-base-100 rounded-lg p-6 shadow-sm border border-base-300">
                  {recipeData.instructions?.length ? (
                    <PreparationChecklist
                      steps={recipeData.instructions}
                      checklistKey={`community-recipe-steps-${recipeData.title}`}
                    />
                  ) : (
                    <div className="text-base-content/60">
                      No instructions available.
                    </div>
                  )}
                </div>
              </section>

              <section className="mt-8">
                <RecipeNotes recipeId={recipeData.id} />
              </section>

              <section className="mt-12">
                <SimilarRecipes recipes={similarRecipes} />
              </section>
            </div>
          </div>
        </div>

        <div className="bg-base-100">
          <Footer />
        </div>
      </>
    );
  }
}