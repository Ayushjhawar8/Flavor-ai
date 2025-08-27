"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { CATEGORIES_URL } from "@/lib/urls";
import { PlusIcon } from "@/components/Icons";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [filter, setFilter] = useState("All");
  const [showDiets, setShowDiets] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState(null);

  const DIET_FILTERS = [
    "Vegan",
    "Keto",
    "100 Calories",
    "Low Carbs",
    "High Protein",
    "Gluten Free",
  ];

  // Diet mapping table
  const categoryDietMap = {
    Dessert: ["Vegan", "100 Calories", "Gluten Free"],
    Vegetarian: ["Vegan", "100 Calories", "Gluten Free"],
    Pasta: [],
    Beef: ["Keto", "Low Carbs", "High Protein", "Gluten Free"],
    Chicken: ["Keto", "Low Carbs", "High Protein", "Gluten Free"],
    Lamb: ["Keto", "Low Carbs", "High Protein", "Gluten Free"],
    Miscellaneous: [],
    Pork: ["Keto", "Low Carbs", "High Protein", "Gluten Free"],
    Seafood: ["Keto", "Low Carbs", "High Protein", "Gluten Free"],
    Side: ["Vegan", "100 Calories", "Gluten Free"],
    Starter: ["Vegan", "100 Calories", "Gluten Free"],
    Vegan: ["Vegan", "100 Calories", "Gluten Free"],
    Breakfast: ["Vegan", "100 Calories", "Gluten Free"],
    Goat: ["Keto", "Low Carbs", "High Protein", "Gluten Free"],
  };

  const vegetarianCategories = new Set([
    "Dessert",
    "Vegetarian",
    "Side",
    "Starter",
    "Vegan",
    "Breakfast",
  ]);

  useEffect(() => {
    fetch(CATEGORIES_URL)
      .then((res) => res.json())
      .then((data) => {
        const categoryOrder = ["Dessert", "Vegetarian", "Pasta"];
        const sortedCategories = data.categories.sort((a, b) => {
          const aIndex = categoryOrder.findIndex((cat) =>
            a.strCategory.toLowerCase().includes(cat.toLowerCase())
          );
          const bIndex = categoryOrder.findIndex((cat) =>
            b.strCategory.toLowerCase().includes(cat.toLowerCase())
          );
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return 0;
        });
        setCategories(sortedCategories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          const newTheme =
            document.documentElement.getAttribute("data-theme") || "light";
          setCurrentTheme(newTheme);
        }
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const initialTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    setCurrentTheme(initialTheme);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const content = document.querySelector(".content");
    if (navbar && content) {
      content.style.marginTop = `${navbar.offsetHeight}px`;
    }
  }, []);

  function isVegetarianCategory(category) {
    return vegetarianCategories.has(category.strCategory);
  }

  function getCategoryDiets(category) {
    return categoryDietMap[category.strCategory] || [];
  }

  // Main category filter logic (table-backed, single diet filter)
  function filterCategory(category) {
    let matchesType = true;
    if (filter === "Vegetarian") {
      matchesType = isVegetarianCategory(category);
    } else if (filter === "Non-Vegetarian") {
      matchesType = !isVegetarianCategory(category);
    }
    // Only show if selectedDiet is present in categoryDietMap
    let matchesDiet = true;
    const categoryDiets = getCategoryDiets(category);
    if (selectedDiet) {
      matchesDiet = categoryDiets.includes(selectedDiet);
    }
    return matchesType && matchesDiet;
  }

  const filteredCategories = categories.filter(filterCategory);

  return (
    <>
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        // If these handlers are required by Navbar, provide no-op functions:
        handleSearchFocus={() => {}}
        handleBlur={() => {}}
      />
      <div
        className={`content flex flex-col items-center justify-center p-5 md:p-1 w-full bg-base-100 ${
          !showResults ? "opacity-100" : "opacity-80 blur-sm"
        }`}
      >
        <section className="w-full h-screen bg-base-100 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center space-y-8">
            <div className="relative">
              <h1
                className={`text-5xl md:text-7xl font-extrabold leading-tight ${
                  currentTheme === "dark" ? "text-white" : "text-amber-800"
                }`}
              >
                Start Your Flavor Journey
              </h1>
            </div>
            <p
              className={`text-xl md:text-2xl max-w-3xl leading-relaxed ${
                currentTheme === "dark" ? "text-white" : "text-amber-800"
              }`}
            >
              Unlock a world of flavors with AI-curated recipes, personalized
              suggestions, and exciting surprises. Explore new cuisines or craft
              the perfect meal with Flavor AI!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/ai" className="animate-fadeIn">
                <button className="btn btn-outline btn-primary text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 flex items-center gap-2">
                  {/* Magic Wand Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0" /></svg>
                  Get AI-Generated Recipes
                </button>
              </Link>
              <Link href="/random" className="animate-fadeIn" style={{ animationDelay: "200ms" }}>
                <button className="btn btn-outline btn-primary text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v2a3 3 0 01-3 3z" /></svg>
                  Discover a Random Recipe
                </button>
              </Link>
              <Link href="/diet-planner" className="animate-fadeIn" style={{ animationDelay: "300ms" }}>
                <button className="btn btn-outline btn-primary text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  AI Diet Planner
                </button>
              </Link>
              <Link href="/favorite" className="animate-fadeIn" style={{ animationDelay: "400ms" }}>
                <button className="btn btn-outline btn-primary text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30">
                  ❤️ Favorites
                </button>
              </Link>
              <button
                className="btn btn-outline btn-primary text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 flex items-center gap-2 animate-fadeIn"
                onClick={() => {
                  setShowCategories((prev) => !prev);
                  if (!showCategories) {
                    setTimeout(() => {
                      document.querySelector(".categories-section")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }
                }}
                style={{ animationDelay: "500ms" }}
              >
                {showCategories ? "Hide Categories" : "Show Categories"}
                {!showCategories && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </section>
        <div className="divider mt-10"></div>
        {showCategories && (
          <section className="categories-section flex flex-col items-center justify-center p-5 md:p-10 w-full bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-lg shadow-lg">
            <h1 className={`text-xl md:text-3xl mb-10 font-semibold text-center ${currentTheme === "dark" ? "text-white" : "text-amber-800"}`}>
              A Taste for Every Mood and Moment
            </h1>
            {/* Vegetarian/Non-Vegetarian/All Filters */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {["All", "Vegetarian", "Non-Vegetarian"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`btn btn-sm md:btn-md ${filter === type ? "btn-primary" : "btn-outline"} transition-all duration-200`}
                >
                  {type}
                </button>
              ))}
            </div>
            {/* Diet Based Button */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={() => setShowDiets(!showDiets)}
                className={`btn btn-sm md:btn-md ${showDiets ? "btn-primary" : "btn-outline"} transition-all duration-200`}
              >
                Diet Based
              </button>
            </div>
            {showDiets && (
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                {DIET_FILTERS.map((diet) => (
                  <button
                    key={diet}
                    onClick={() =>
                      setSelectedDiet(selectedDiet === diet ? null : diet)
                    }
                    className={`btn btn-sm md:btn-md ${selectedDiet === diet ? "btn-primary" : "btn-outline"} transition-all duration-200`}
                  >
                    {diet}
                  </button>
                ))}
              </div>
            )}
            {/* Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
              {filteredCategories.map((category) => (
                <div key={category.idCategory} className="card card-compact w-72 lg:w-96 bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <figure className="relative">
                    <Image
                      src={category.strCategoryThumb}
                      alt={category.strCategory}
                      width={384}
                      height={216}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-lg md:text-xl dark:bg-white-600 flex items-center gap-2">
                      <PlusIcon />
                      {category.strCategory}
                    </h2>
                    <p className="text-sm dark:bg-white-900 ">
                      {category.strCategoryDescription.slice(0, 80)}...
                    </p>
                    <div className="card-actions justify-end">
                      <Link href={`/category/${category.strCategory}`}>
                        <button className="btn btn-primary text-sm md:text-base">
                          Show Recipes 🍽️
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* No Categories Message */}
            {filteredCategories.length === 0 && (
              <div className="mt-8 text-lg text-center text-error">
                No categories found for the selected filter.
              </div>
            )}
          </section>
        )}
        <Footer />
      </div>
    </>
  );
}
