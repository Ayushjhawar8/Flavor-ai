"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import BackButton from "@/components/BackButton";
import { PlusIcon } from "@/components/Icons";
import { Clock, Users } from "lucide-react"; 
export default function ViewRecipePage() {
  const [showResults, setShowResults] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  useEffect(() => {
    // Get recipe from localStorage on client side
    try {
      const storedRecipe = localStorage.getItem('current_recipe');
      
      if (!storedRecipe) {
        setError('No recipe found');
        setLoading(false);
        return;
      }

      const parsedRecipe = JSON.parse(storedRecipe);
      setRecipe(parsedRecipe);
      
      // Don't clear immediately - keep for page refreshes
      // Clear after 5 minutes to prevent stale data
      setTimeout(() => {
        localStorage.removeItem('current_recipe');
      }, 5 * 60 * 1000);
    } catch (err) {
      console.error('Error parsing stored recipe:', err);
      setError('Invalid recipe data');
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
          <p className="text-base-content/60 mb-4">The recipe data could not be loaded.</p>
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
          handleSearchFocus={handleSearchFocus}
          handleBlur={handleBlur}
        />
        <div
          className={`min-h-screen py-10 px-4 mt-20 bg-base-100 flex justify-center items-start transition-all duration-300 ${
            showResults ? "opacity-80 blur-sm" : "opacity-100"
          }`}
        >
          <BackButton />
          <div className="relative max-w-4xl w-full bg-base-200 shadow-xl rounded-xl">
            <div className="p-6 md:p-12">
              <header className="relative text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-base-content">
                  {recipeData.title}
                </h1>
                {recipeData.description && (
                  <p className="text-lg text-base-content/80 mt-2">
                    {recipeData.description}
                  </p>
                )}
                
                <div className="flex items-center justify-center gap-6 mt-4 text-sm text-base-content/60">
                  {recipeData.cookTime && (
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{recipeData.cookTime}</span>
                    </div>
                  )}
                  {recipeData.servings && (
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{recipeData.servings} servings</span>
                    </div>
                  )}
                  {recipeData.difficulty && (
                    <div className="badge badge-primary">{recipeData.difficulty}</div>
                  )}
                </div>
              </header>
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
                <div className="md:w-1/2">
                  <img
                    src={recipeData.image}
                    alt={recipeData.title}
                    className="w-full h-auto rounded-lg shadow-md mb-4"
                  />
                  <div className="flex items-center gap-4">
                    <span className="badge badge-lg badge-accent">
                      {recipeData.type || 'Community'}
                    </span>
                    {recipeData.author && (
                      <div className="flex items-center gap-2">
                        <img 
                          src={recipeData.author.avatar} 
                          alt={recipeData.author.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm font-medium">{recipeData.author.name}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-4 flex items-center text-base-content">
                    <PlusIcon />
                    <span className="ml-2">Ingredients</span>
                  </h2>
                  
                  <div className="bg-base-100 rounded-lg p-4">
                    <ul className="space-y-2">
                      {recipeData.ingredients && recipeData.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary font-medium">•</span>
                          <span className="text-base-content">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <section id="instructions-section">
                <h2 className="text-2xl font-bold text-base-content mb-4">
                  Preparation Steps
                </h2>

                <div className="bg-base-100 rounded-lg p-4">
                  <ol className="list-decimal list-inside space-y-4 text-base-content leading-relaxed">
                    {recipeData.instructions && recipeData.instructions.map((instruction, index) => (
                      <li key={index} className="pl-2">
                        <span className="ml-2">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
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
