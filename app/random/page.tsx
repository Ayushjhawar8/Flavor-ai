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
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "hard":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
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
    setFavorites(prev => {
      const next = prev.includes(idMeal)
        ? prev.filter(x => x !== idMeal)
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
          difficulty: meal.strTags && meal.strTags.toLowerCase().includes("easy")
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <BackButton />
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-4 flex items-center justify-center gap-3">
            🎲 Random Recipe Generator
          </h1>
          <p className="text-lg text-amber-600 max-w-2xl mx-auto mb-6">
            Feeling adventurous? Discover new flavors with our random recipe generator! 
            Perfect for when you can't decide what to cook.
          </p>
          <button
            onClick={getRandomRecipe}
            disabled={loading}
            className="px-8 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto font-semibold"
          >
            <ArrowPathIcon className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Finding Recipe..." : "Get Random Recipe"}
          </button>
        </div>
        {error && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {recipe && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleFavorite(recipe.idMeal)}
                    className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
                    aria-label={`Toggle favorite for ${recipe.strMeal}`}
                  >
                    {favorites.includes(recipe.idMeal) ? (
                      <HeartIconSolid className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{recipe.strMeal}</h2>
                  <p className="text-amber-100">{recipe.strCategory} | {recipe.strArea}</p>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  <div className="flex items-center gap-2 p-4 bg-amber-50 rounded-lg">
                    <ClockIcon className="w-5 h-5 text-amber-600" />
                    <div>
                      <div className="text-sm text-amber-600">Prep Time</div>
                      <div className="font-semibold text-amber-800">{recipe.prepTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-orange-50 rounded-lg">
                    <ClockIcon className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="text-sm text-orange-600">Cook Time</div>
                      <div className="font-semibold text-orange-800">{recipe.cookTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
                    <UsersIcon className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-sm text-green-600">Servings</div>
                      <div className="font-semibold text-green-800">{recipe.servings}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                    <div className="w-5 h-5 text-blue-600 flex items-center justify-center text-sm">👨‍🍳</div>
                    <div>
                      <div className="text-sm text-blue-600">Difficulty</div>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
                        {recipe.difficulty}
                      </div>
                    </div>
                  </div>
                </div>
                {recipe.strTags && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-amber-800 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {recipe.strTags
                        .split(",")
                        .map((tag: string) => (
                          <span key={tag} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                            #{tag.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2">
                      🛒 Ingredients
                    </h3>
                    <div className="bg-amber-50 rounded-lg p-4">
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-amber-600 mt-1">•</span>
                            <span className="text-gray-700">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2">
                      👨‍🍳 Instructions
                    </h3>
                    <div className="space-y-4">
                      {recipe.strInstructions
                        .split(/\r?\n/)
                        .filter((s: string) => s.trim())
                        .map((step: string, idx: number) => (
                          <div key={idx} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {idx + 1}
                            </div>
                            <p className="text-gray-700 leading-relaxed pt-1">{step.trim()}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center mt-8 pt-8 border-t border-amber-200">
                  <button
                    onClick={getRandomRecipe}
                    className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 font-semibold"
                  >
                    <ArrowPathIcon className="w-5 h-5" />
                    Try Another Recipe
                  </button>
                  <button className="px-6 py-3 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-semibold">
                    Share Recipe
                  </button>
                  <button className="px-6 py-3 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-semibold">
                    Add to Shopping List
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Always visible tips section */}
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
            <span className="text-amber-600">💡</span> Random Recipe Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
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
