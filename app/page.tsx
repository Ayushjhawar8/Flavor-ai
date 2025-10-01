// app/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";
import Navbar from "@/components/Navbar"; // Reusable Navbar
import { CATEGORIES_URL } from "@/lib/urls";
import { PlusIcon } from "@/components/Icons";
import HeroSection from "@/components/HeroSection"; // <-- Import the new Hero component

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

  // No longer need margin-top adjustment if the hero is full-screen
  // useEffect(() => {
  //   const navbar = document.querySelector(".navbar");
  //   const content = document.querySelector(".content") as HTMLElement | null;
  //   if (navbar && content) {
  //     content.style.marginTop = `${(navbar as HTMLElement).offsetHeight}px`;
  //   }
  // }, []);

  const handleShowCategories = () => {
    setShowCategories((prev) => !prev);
    if (!showCategories) {
      setTimeout(() => {
        document
          .querySelector(".categories-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />

      {/* Main content area */}
      <main className={`${!showResults ? "opacity-100" : "opacity-80 blur-sm"} transition-all duration-300`}>
        <HeroSection onShowCategories={handleShowCategories} showCategories={showCategories} />

        {/* Recently Viewed */}
        {recentMeals.length > 0 && (
          <section className="w-full max-w-7xl mx-auto my-10 px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
                Recently Viewed
              </h2>
              <button
                onClick={clearRecentMeals}
                className="text-sm text-red-500 underline"
              >
                Clear
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {recentMeals.map((meal) => (
                <Link
                  key={meal.idMeal}
                  href={`/meal/${meal.idMeal}`}
                  className="min-w-[160px] bg-base-200 dark:bg-gray-800 rounded-lg shadow-md hover:-translate-y-1 transition-transform"
                >
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={160}
                    height={120}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-2 text-sm font-medium text-center text-text-light dark:text-text-dark">
                    {meal.strMeal}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="divider mt-10"></div>

        {/* Categories */}
        {showCategories && (
          <section className="categories-section flex flex-col items-center justify-center p-5 md:p-10 w-full">
            <h1
              className={`text-xl md:text-3xl mb-10 font-semibold text-center text-dark-charcoal dark:text-white`}
            >
              A Taste for Every Mood and Moment
            </h1>

            {/* Filter buttons can be styled with new colors if desired */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {["All", "Vegetarian", "Non-Vegetarian"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`btn btn-sm md:btn-md ${
                    filter === type ? "btn-primary bg-primary text-white" : "btn-outline"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            
            {/* ... rest of your category and filter logic remains the same ... */}
            
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
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
                .map((category) => (
                  <div
                    key={category.idCategory}
                    className="card card-compact w-72 lg:w-96 bg-base-200 dark:bg-gray-800 shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <figure>
                      <Image
                        src={category.strCategoryThumb}
                        alt={category.strCategory}
                        width={384}
                        height={216}
                        className="w-full h-48 object-cover"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title text-lg md:text-xl flex items-center gap-2">
                        <PlusIcon />
                        {category.strCategory}
                      </h2>
                      <p className="text-sm">
                        {category.strCategoryDescription.slice(0, 80)}...
                      </p>
                      <div className="card-actions justify-end">
                        <Link href={`/category/${category.strCategory}`}>
                          <button className="btn btn-primary bg-primary text-white border-primary text-sm md:text-base">
                            Show Recipes 🍽️
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}