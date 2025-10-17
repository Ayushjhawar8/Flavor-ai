"use client";

import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import {
  ArrowPathIcon,
  ClockIcon,
  UsersIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import RecipeNotes from "@/components/RecipeNotes";

function extractIngredients(meal: any): string[] {
  const result: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      result.push(`${meas ? meas.trim() : ""} ${ing.trim()}`.replace(/\s+/g, " "));
    }
  }
  return result;
}

function getRandomPrepCookTimes() {
  const prep = Math.floor(Math.random() * 41) + 10;
  const cook = Math.floor(Math.random() * 51) + 10;
  const serv = Math.floor(Math.random() * 6) + 1;
  return {
    prepTime: `${prep} mins`,
    cookTime: `${cook} mins`,
    servings: serv,
  };
}

function getDifficultyColor(diff: string) {
  switch (diff.toLowerCase()) {
    case "easy":
      return "badge badge-success";
    case "medium":
      return "badge badge-warning";
    case "hard":
      return "badge badge-error";
    default:
      return "badge badge-outline";
  }
}

export default function RandomRecipePage() {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    if (favs) setFavorites(JSON.parse(favs));
  }, []);

  useEffect(() => {
    getRandomRecipe();
  }, []);

  const toggleFavorite = (idMeal: string) => {
    setFavorites((prev) => {
      const next = prev.includes(idMeal)
        ? prev.filter((x) => x !== idMeal)
        : [...prev, idMeal];
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };

  const getRandomRecipe = async () => {
    setLoading(true);
    setError("");
    setRecipe(null);
    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await res.json();
      if (data.meals && data.meals.length) {
        const meal = data.meals[0];
        const { prepTime, cookTime, servings } = getRandomPrepCookTimes();
        setRecipe({
          ...meal,
          ingredients: extractIngredients(meal),
          prepTime,
          cookTime,
          servings,
          difficulty:
            meal.strTags && meal.strTags.toLowerCase().includes("easy")
              ? "Easy"
              : meal.strTags && meal.strTags.toLowerCase().includes("hard")
              ? "Hard"
              : "Medium",
        });
      } else {
        setError("No recipe data received. Try again!");
      }
    } catch {
      setError("Error fetching recipe. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-100">
      <BackButton />
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3 text-base-content">
            🎲 Random Recipe Generator
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6 text-base-content/70">
            Feeling adventurous? Discover new flavors with our random recipe
            generator! Perfect for when you can't decide what to cook.
          </p>
          <button
            onClick={getRandomRecipe}
            disabled={loading}
            className="px-8 py-4 bg-primary text-primary-content rounded-lg hover:bg-primary-focus transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto font-semibold"
          >
            <ArrowPathIcon className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Finding Recipe..." : "Get Random Recipe"}
          </button>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-error/20 text-error border border-error rounded-lg">
            {error}
          </div>
        )}

        {recipe && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-base-200 rounded-2xl shadow-xl overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleFavorite(recipe.idMeal)}
                    className="p-3 bg-base-100/90 rounded-full hover:bg-base-100 transition-colors"
                    aria-label={`Toggle favorite for ${recipe.strMeal}`}
                  >
                    {favorites.includes(recipe.idMeal) ? (
                      <HeartIconSolid className="w-6 h-6 text-error" />
                    ) : (
                      <HeartIcon className="w-6 h-6 text-base-content/70" />
                    )}
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-base-content/60 to-transparent p-6">
                  <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                    {recipe.strMeal}
                  </h2>
                  <p className="text-gray-200/90 drop-shadow">
                    {recipe.strCategory} | {recipe.strArea}
                  </p>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Prep Time", value: recipe.prepTime, icon: <ClockIcon className="w-5 h-5 text-primary" /> },
                    { label: "Cook Time", value: recipe.cookTime, icon: <ClockIcon className="w-5 h-5 text-primary" /> },
                    { label: "Servings", value: recipe.servings, icon: <UsersIcon className="w-5 h-5 text-primary" /> },
                    { label: "Difficulty", value: recipe.difficulty, icon: <div className="w-5 h-5 text-primary flex items-center justify-center text-sm">👨‍🍳</div>, isBadge: true },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-4 bg-base-100 rounded-lg">
                      {item.icon}
                      <div>
                        <div className="text-sm text-base-content/70">{item.label}</div>
                        {item.isBadge ? (
                          <div className={getDifficultyColor(item.value)}>{item.value}</div>
                        ) : (
                          <div className="font-semibold text-base-content/90">{item.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {recipe.strTags && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-base-content/90">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {recipe.strTags.split(",").map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-base-300 text-base-content/80 rounded-full text-sm font-medium"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-base-content/90 flex items-center gap-2">
                      🛒 Ingredients
                    </h3>
                    <div className="bg-base-100 rounded-lg p-4">
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="text-base-content/80">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-base-content/90 flex items-center gap-2">
                      👨‍🍳 Instructions
                    </h3>
                    <div className="space-y-4">
                      {recipe.strInstructions
                        .split(/\r?\n/)
                        .filter((s: string) => s.trim())
                        .map((step: string, idx: number) => (
                          <div key={idx} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-bold">
                              {idx + 1}
                            </div>
                            <p className="text-base-content/80 leading-relaxed pt-1">
                              {step.trim()}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center mt-8 pt-8 border-t border-base-300">
                  <button
                    onClick={getRandomRecipe}
                    className="px-6 py-3 bg-primary text-primary-content rounded-lg hover:bg-primary-focus transition-colors flex items-center gap-2 font-semibold"
                  >
                    <ArrowPathIcon className="w-5 h-5" />
                    Try Another Recipe
                  </button>
                  <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-base-200 transition-colors font-semibold">
                    Share Recipe
                  </button>
                  <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-base-200 transition-colors font-semibold">
                    Add to Shopping List
                  </button>
                </div>
              </div>
            </div>

            {/* Recipe Notes Section */}
            <section className="mt-8">
              <RecipeNotes recipeId={recipe.idMeal} />
            </section>
          </div>
        )}

        {/* Tips section */}
        <div className="max-w-4xl mx-auto mt-8 bg-base-200 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-base-content/90">
            <span className="text-primary">💡</span> Random Recipe Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-base-content/80">
            <div className="space-y-2">
              <p>• Keep clicking for different cuisines and difficulty levels</p>
              <p>• Check your pantry before starting to cook</p>
              <p>• Don't be afraid to substitute ingredients you don't have</p>
            </div>
            <div className="space-y-2">
              <p>• Save your favorites by clicking the heart icon</p>
              <p>• Perfect for meal planning and discovering new dishes</p>
              <p>• Great way to break out of cooking routines!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}