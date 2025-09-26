"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";
import Navbar from "@/components/Navbar"; // Reusable Navbar
import { CATEGORIES_URL } from "@/lib/urls";
import { PlusIcon } from "@/components/Icons";

export default function Page() {
  const [categories, setCategories] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [filter, setFilter] = useState("All");
  const [showDiets, setShowDiets] = useState(false);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
    // Recently Viewed Meals
  const [recentMeals, setRecentMeals] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("recentMeals");
      const list = raw ? JSON.parse(raw) : [];
      if (Array.isArray(list)) setRecentMeals(list);
    } catch {
      setRecentMeals([]);
    }
  }, []);

  const clearRecentMeals = () => {
    localStorage.removeItem("recentMeals");
    setRecentMeals([]);
  };

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  // Category → Diet Map
  const categoryDietMap: Record<string, string[]> = {
    Dessert: ["Vegan", "100 Calories"],
    Vegetarian: ["Vegan", "Low Carbs"],
    Pasta: ["High Protein"],
    Beef: ["High Protein", "Keto"],
    Chicken: ["High Protein", "Keto"],
    Lamb: ["High Protein", "Keto"],
    Miscellaneous: [],
    Pork: ["High Protein", "Keto"],
    Seafood: ["High Protein", "Keto", "Low Carbs"],
    Side: ["Low Carbs", "Gluten Free"],
    Starter: ["Low Carbs", "Gluten Free"],
    Vegan: ["Vegan", "Low Carbs", "100 Calories"],
    Breakfast: ["High Protein", "100 Calories"],
    Goat: ["High Protein", "Keto"],
  };

  useEffect(() => {
    fetch(CATEGORIES_URL)
      .then((res) => res.json())
      .then((data) => {
        const sortedCategories = data.categories.sort((a: any, b: any) => {
          const priority = ["Dessert", "Vegetarian", "Pasta"];
          const aIndex = priority.findIndex((cat) =>
            a.strCategory.toLowerCase().includes(cat.toLowerCase())
          );
          const bIndex = priority.findIndex((cat) =>
            b.strCategory.toLowerCase().includes(cat.toLowerCase())
          );

          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return 0;
        });
        setCategories(sortedCategories);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      setCurrentTheme(newTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    setCurrentTheme(
      document.documentElement.getAttribute("data-theme") || "light"
    );
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const content = document.querySelector(".content") as HTMLElement | null;
    if (navbar && content) {
      content.style.marginTop = `${(navbar as HTMLElement).offsetHeight}px`;
    }
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />

      {/* Content */}
      <div
        className={`content flex flex-col items-center justify-center p-5 md:p-1 w-full bg-base-100 transition-all duration-300 relative z-10 ${
        !showResults ? "opacity-100" : "opacity-80 blur-sm"
      }`}
      >
        {/* Hero Section with Food Theme */}
        <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Floating Food Emojis Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 text-6xl animate-bounce delay-1000">🍕</div>
            <div className="absolute top-40 right-20 text-5xl floating-food">🍔</div>
            <div className="absolute top-60 left-1/4 text-4xl animate-pulse">🥘</div>
            <div className="absolute bottom-40 right-10 text-6xl floating-food delay-500">🍝</div>
            <div className="absolute bottom-60 left-20 text-5xl animate-bounce">🥗</div>
            <div className="absolute top-80 right-1/3 text-4xl floating-food delay-1000">🍰</div>
            <div className="absolute bottom-80 left-1/3 text-5xl animate-pulse delay-700">🍜</div>
          </div>

          <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center space-y-10 relative z-10">
            {/* Main Title with Food Emojis - Reduced Size */}
            <div className="glass-card p-6 md:p-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-4 space-x-3">
                <span className="text-3xl md:text-4xl animate-pulse">🍳</span>
                <h1 className={`text-3xl md:text-6xl font-black drop-shadow-2xl relative ${
                  currentTheme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  <span className="relative z-10">Flavor AI</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent opacity-80 blur-sm">
                    Flavor AI
                  </span>
                </h1>
                <span className="text-3xl md:text-4xl animate-pulse">🥄</span>
              </div>
              
              <p className={`text-lg md:text-2xl font-semibold leading-relaxed mb-4 drop-shadow-lg ${
                currentTheme === "dark" ? "text-white" : "text-gray-800"
              }`}>
                <span className="text-2xl mr-2">👨‍🍳</span>
                Your AI-Powered Culinary Journey Starts Here!
                <span className="text-2xl ml-2">🌟</span>
              </p>

              <p className={`text-base md:text-lg leading-relaxed max-w-2xl mx-auto drop-shadow-md ${
                currentTheme === "dark" ? "text-white/90" : "text-gray-700"
              }`}>
                Discover magical recipes, explore ingredients, and create delicious memories with our food-obsessed AI
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-12">
              
              {/* AI Recipe Generator */}
              <Link href="/ai" className="group">
                <div className="food-category-card p-6 h-full transition-all duration-300">
                  <div className="text-center space-y-4">
                    <div className="text-6xl food-emoji group-hover:scale-110 transition-transform">🤖</div>
                    <h3 className={`text-2xl font-bold ${currentTheme === "dark" ? "text-white" : "text-gray-800"}`}>AI Recipe Magic</h3>
                    <p className={`${currentTheme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Let AI create personalized recipes just for you!</p>
                    <div className="flex justify-center space-x-2 mt-4">
                      <span className="text-2xl">🍳</span>
                      <span className="text-2xl">✨</span>
                      <span className="text-2xl">🎯</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Random Recipe */}
              <Link href="/random" className="group">
                <div className="food-category-card p-6 h-full">
                  <div className="text-center space-y-4">
                    <div className="text-6xl food-emoji group-hover:scale-110 transition-transform">🎲</div>
                    <h3 className={`text-2xl font-bold ${currentTheme === "dark" ? "text-white" : "text-gray-800"}`}>Mystery Recipe</h3>
                    <p className={`${currentTheme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Feeling adventurous? Try a surprise dish!</p>
                    <div className="flex justify-center space-x-2 mt-4">
                      <span className="text-2xl">🎊</span>
                      <span className="text-2xl">🍽️</span>
                      <span className="text-2xl">🎉</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Diet Planner */}
              <Link href="/diet-planner" className="group">
                <div className="food-category-card p-6 h-full">
                  <div className="text-center space-y-4">
                    <div className="text-6xl food-emoji group-hover:scale-110 transition-transform">🥗</div>
                    <h3 className={`text-2xl font-bold ${currentTheme === "dark" ? "text-white" : "text-gray-800"}`}>Smart Diet Plan</h3>
                    <p className={`${currentTheme === "dark" ? "text-gray-300" : "text-gray-700"}`}>AI-crafted nutrition plans for your goals!</p>
                    <div className="flex justify-center space-x-2 mt-4">
                      <span className="text-2xl">💪</span>
                      <span className="text-2xl">📊</span>
                      <span className="text-2xl">🎯</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Festive Dishes */}
              <Link href="/festive" className="group">
                <div className="food-category-card p-6 h-full">
                  <div className="text-center space-y-4">
                    <div className="text-6xl food-emoji group-hover:scale-110 transition-transform">🎊</div>
                    <h3 className={`text-2xl font-bold ${currentTheme === "dark" ? "text-white" : "text-gray-800"}`}>Festival Flavors</h3>
                    <p className={`${currentTheme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Celebrate with traditional festive recipes!</p>
                    <div className="flex justify-center space-x-2 mt-4">
                      <span className="text-2xl">🏮</span>
                      <span className="text-2xl">🎭</span>
                      <span className="text-2xl">🍾</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Ingredient Explorer */}
              <Link href="/ingredient-explorer" className="group">
                <div className="food-category-card p-6 h-full">
                  <div className="text-center space-y-4">
                    <div className="text-6xl food-emoji group-hover:scale-110 transition-transform">🧪</div>
                    <h3 className={`text-2xl font-bold ${currentTheme === "dark" ? "text-white" : "text-gray-800"}`}>Ingredient Lab</h3>
                    <p className={`${currentTheme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Explore ingredients like a food scientist!</p>
                    <div className="flex justify-center space-x-2 mt-4">
                      <span className="text-2xl">🔬</span>
                      <span className="text-2xl">🌿</span>
                      <span className="text-2xl">⚗️</span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Favorites */}
              <Link href="/favorite" className="group">
                <div className="food-category-card p-6 h-full">
                  <div className="text-center space-y-4">
                    <div className="text-6xl food-emoji group-hover:scale-110 transition-transform">❤️</div>
                    <h3 className={`text-2xl font-bold ${currentTheme === "dark" ? "text-white" : "text-gray-800"}`}>My Favorites</h3>
                    <p className={`${currentTheme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Your personal collection of loved recipes!</p>
                    <div className="flex justify-center space-x-2 mt-4">
                      <span className="text-2xl">⭐</span>
                      <span className="text-2xl">💖</span>
                      <span className="text-2xl">📚</span>
                    </div>
                  </div>
                </div>
              </Link>

            </div>

            {/* Category Toggle Button */}
            <div className="mt-12">
              <button
                className="food-button text-lg px-8 py-4 flex items-center space-x-3"
                onClick={() => {
                  setShowCategories((prev) => !prev);
                  if (!showCategories) {
                    setTimeout(() => {
                      document
                        .querySelector(".categories-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }
                }}
              >
                <span className="text-2xl">{showCategories ? "🙈" : "👀"}</span>
                <span>{showCategories ? "Hide Food Categories" : "Explore Food Categories"}</span>
                <span className="text-2xl">🍴</span>
              </button>
            </div>
          </div>
        </section>
                {/* Recently Viewed - Food Themed */}
        {recentMeals.length > 0 && (
          <section className="w-full max-w-7xl mx-auto my-16 px-4">
            <div className="glass-card p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center space-x-3">
                  <span className="text-4xl">🕐</span>
                  <span>Recently Tasted</span>
                  <span className="text-4xl">👅</span>
                </h2>
                <button
                  onClick={clearRecentMeals}
                  className="food-button text-sm px-4 py-2 flex items-center space-x-2"
                >
                  <span>🗑️</span>
                  <span>Clear History</span>
                </button>
              </div>

              <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-none">
                {recentMeals.map((meal) => (
                  <Link
                    key={meal.idMeal}
                    href={`/meal/${meal.idMeal}`}
                    className="group min-w-[200px] recipe-glass-card p-4"
                  >
                    <div className="relative overflow-hidden rounded-xl">
                      <Image
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        width={200}
                        height={150}
                        className="w-full h-40 object-cover transition-transform group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 text-2xl animate-pulse">🔥</div>
                    </div>
                    <div className="mt-3 text-center">
                      <h3 className="text-gray-800 dark:text-white font-semibold text-sm leading-tight">
                        {meal.strMeal}
                      </h3>
                      <div className="flex justify-center mt-2 space-x-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-gray-400">⭐</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="divider mt-10"></div>

        {/* Categories - Food Kingdom */}
        {showCategories && (
          <section className="categories-section flex flex-col items-center justify-center p-8 md:p-16 w-full relative">
            {/* Background Food Pattern */}
            <div className="absolute inset-0 opacity-10 overflow-hidden">
              <div className="text-9xl absolute top-10 left-10">🍴</div>
              <div className="text-8xl absolute top-20 right-20">🥄</div>
              <div className="text-7xl absolute bottom-20 left-20">🔪</div>
              <div className="text-6xl absolute bottom-10 right-10">🍽️</div>
            </div>

            <div className="glass-card p-8 mb-12 relative z-10">
              <h1 className="text-3xl md:text-5xl font-black text-center text-gray-800 dark:text-white mb-6">
                <span className="text-4xl mr-3">🏰</span>
                Welcome to Food Kingdom
                <span className="text-4xl ml-3">🏰</span>
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto">
                Explore our delicious realms of flavor! Each category is a new adventure waiting to be discovered.
              </p>
            </div>

            {/* Enhanced Filter Buttons */}
            <div className="glass-card p-6 mb-8 w-full max-w-4xl">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6 flex items-center justify-center space-x-3">
                <span>🎛️</span>
                <span>Flavor Filters</span>
                <span>🎛️</span>
              </h3>
              
              {/* Veg/Non-Veg filter */}
              <div className="flex flex-wrap gap-4 justify-center mb-6">
                {[
                  { type: "All", emoji: "🌍" },
                  { type: "Vegetarian", emoji: "🥬" },
                  { type: "Non-Vegetarian", emoji: "🥩" }
                ].map(({ type, emoji }) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`${filter === type ? 'food-button' : 'ingredient-tag'} px-6 py-3 text-lg font-semibold flex items-center space-x-2`}
                  >
                    <span className="text-2xl">{emoji}</span>
                    <span>{type}</span>
                  </button>
                ))}
              </div>

              {/* Diet filter toggle */}
              <div className="text-center mb-4">
                <button
                  onClick={() => setShowDiets(!showDiets)}
                  className={`${showDiets ? 'food-button' : 'ingredient-tag'} px-8 py-4 text-lg font-bold flex items-center space-x-3 mx-auto`}
                >
                  <span className="text-2xl">🥗</span>
                  <span>Special Diet Options</span>
                  <span className="text-2xl">{showDiets ? "🔽" : "🔼"}</span>
                </button>
              </div>

              {/* Diet options */}
              {showDiets && (
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    { diet: "Vegan", emoji: "🌱" },
                    { diet: "Keto", emoji: "🥑" },
                    { diet: "100 Calories", emoji: "🔥" },
                    { diet: "Low Carbs", emoji: "📉" },
                    { diet: "High Protein", emoji: "💪" },
                    { diet: "Gluten Free", emoji: "🚫" }
                  ].map(({ diet, emoji }) => (
                    <button
                      key={diet}
                      onClick={() =>
                        setSelectedDiets((prev) =>
                          prev.includes(diet)
                            ? prev.filter((d) => d !== diet)
                            : [...prev, diet]
                        )
                      }
                      className={`${selectedDiets.includes(diet) ? 'food-button' : 'ingredient-tag'} px-4 py-2 text-sm font-semibold flex items-center space-x-2`}
                    >
                      <span className="text-xl">{emoji}</span>
                      <span>{diet}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Food Category Kingdom Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
              {categories
                .filter((category) => {
                  const lowerName = category.strCategory.toLowerCase();
                  const vegetarianKeywords = [
                    "vegetarian",
                    "vegan",
                    "dessert",
                    "pasta",
                    "starter",
                  ];

                  if (filter === "Vegetarian") {
                    return vegetarianKeywords.some((keyword) =>
                      lowerName.includes(keyword)
                    );
                  }

                  if (filter === "Non-Vegetarian") {
                    return !vegetarianKeywords.some((keyword) =>
                      lowerName.includes(keyword)
                    );
                  }

                  if (selectedDiets.length > 0) {
                    return selectedDiets.some((diet) =>
                      categoryDietMap[category.strCategory]?.includes(diet)
                    );
                  }

                  return true; // All
                })
                .map((category) => {
                  // Food emoji mapping for categories
                  const foodEmojis: Record<string, string> = {
                    'Beef': '🥩',
                    'Chicken': '🍗',
                    'Dessert': '🍰',
                    'Lamb': '🐑',
                    'Miscellaneous': '🍴',
                    'Pasta': '🍝',
                    'Pork': '🥓',
                    'Seafood': '🦐',
                    'Side': '🥗',
                    'Starter': '🥪',
                    'Vegan': '🌱',
                    'Vegetarian': '🥬',
                    'Breakfast': '🍳',
                    'Goat': '🐐'
                  };
                  
                  return (
                    <Link
                      key={category.idCategory}
                      href={`/category/${category.strCategory}`}
                      className="group"
                    >
                      <div className="food-category-card p-6 h-full relative overflow-hidden">
                        {/* Food Emoji Overlay */}
                        <div className="absolute top-4 right-4 z-10">
                          <span className="text-4xl food-emoji group-hover:scale-125 transition-transform">
                            {foodEmojis[category.strCategory] || '🍽️'}
                          </span>
                        </div>
                        
                        {/* Category Image */}
                        <div className="relative overflow-hidden rounded-xl mb-4">
                          <Image
                            src={category.strCategoryThumb}
                            alt={category.strCategory}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        
                        {/* Category Content */}
                        <div className="space-y-3">
                          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center space-x-3">
                            <span className="text-3xl">{foodEmojis[category.strCategory] || '🍽️'}</span>
                            <span className="group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors">
                              {category.strCategory}
                            </span>
                          </h2>
                          
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                            {category.strCategoryDescription.slice(0, 100)}...
                          </p>
                          
                          {/* Action Button */}
                          <div className="pt-4">
                            <div className="food-button text-sm px-4 py-2 w-full text-center group-hover:scale-105 transition-transform">
                              <span className="flex items-center justify-center space-x-2">
                                <span>Explore Recipes</span>
                                <span className="text-lg">🔍</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
            </div>
          </section>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
