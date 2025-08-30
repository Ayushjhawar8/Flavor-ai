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
        className={`content flex flex-col items-center justify-center p-5 md:p-1 w-full bg-base-100 ${
          !showResults ? "opacity-100" : "opacity-80 blur-sm"
        }`}
      >
        <section className="w-full h-screen bg-base-100 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center space-y-8">
            <h1
              className={`text-5xl md:text-7xl font-extrabold leading-tight ${
                currentTheme === "dark" ? "text-white" : "text-amber-800"
              }`}
            >
              Start Your Flavor Journey
            </h1>
            <p
              className={`text-xl md:text-2xl max-w-3xl leading-relaxed ${
                currentTheme === "dark" ? "text-white" : "text-amber-800"
              }`}
            >
              Unlock a world of flavors with AI-curated recipes, personalized
              suggestions, and exciting surprises.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/ai">
                <button className="btn btn-outline btn-primary text-lg">
                  Get AI-Generated Recipes
                </button>
              </Link>
              <Link href="/random">
                <button className="btn btn-outline btn-primary text-lg">
                  Discover a Random Recipe
                </button>
              </Link>
              <Link href="/diet-planner">
                <button className="btn btn-outline btn-primary text-lg">
                  AI Diet Planner
                </button>
              </Link>
              <Link href="/favorite">
                <button className="btn btn-outline btn-primary text-lg">
                  ❤️ Favorites
                </button>
              </Link>
              <button
                className="btn btn-outline btn-primary text-lg"
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
                {showCategories ? "Hide Categories" : "Show Categories"}
              </button>
            </div>
          </div>
        </section>

        <div className="divider mt-10"></div>

        {/* Categories */}
        {showCategories && (
          <section className="categories-section flex flex-col items-center justify-center p-5 md:p-10 w-full">
            <h1
              className={`text-xl md:text-3xl mb-10 font-semibold text-center ${
                currentTheme === "dark" ? "text-white" : "text-amber-800"
              }`}
            >
              A Taste for Every Mood and Moment
            </h1>

            {/* Veg/Non-Veg filter */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {["All", "Vegetarian", "Non-Vegetarian"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`btn btn-sm md:btn-md ${
                    filter === type ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Diet filter */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={() => setShowDiets(!showDiets)}
                className={`btn btn-sm md:btn-md ${
                  showDiets ? "btn-primary" : "btn-outline"
                }`}
              >
                Diet Based
              </button>
            </div>

            {showDiets && (
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                {[
                  "Vegan",
                  "Keto",
                  "100 Calories",
                  "Low Carbs",
                  "High Protein",
                  "Gluten Free",
                ].map((diet) => (
                  <button
                    key={diet}
                    onClick={() =>
                      setSelectedDiets((prev) =>
                        prev.includes(diet)
                          ? prev.filter((d) => d !== diet)
                          : [...prev, diet]
                      )
                    }
                    className={`btn btn-sm md:btn-md ${
                      selectedDiets.includes(diet)
                        ? "btn-primary"
                        : "btn-outline"
                    }`}
                  >
                    {diet}
                  </button>
                ))}
              </div>
            )}

            {/* Category Grid */}
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
                    className="card card-compact w-72 lg:w-96 bg-base-200 shadow-xl hover:-translate-y-1 transition-all"
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
                          <button className="btn btn-primary text-sm md:text-base">
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

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
