"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";
import Navbar from "@/components/Navbar"; // Reusable Navbar
import { CATEGORIES_URL } from "@/lib/urls";
import { PlusIcon } from "@/components/Icons";
import {
  GiDiceSixFacesFour,
  GiMushroom,
  GiNotebook,
  GiPartyPopper,
} from "react-icons/gi";
import { FaFolder, FaFolderOpen, FaHeart, FaRobot } from "react-icons/fa";

export default function Page() {
  const [categories, setCategories] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [filter, setFilter] = useState("All");
  const [showDiets, setShowDiets] = useState(false);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [recentMeals, setRecentMeals] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load recent meals
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
      setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const content = document.querySelector(".content") as HTMLElement | null;
    if (navbar && content) content.style.marginTop = `${(navbar as HTMLElement).offsetHeight}px`;
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />

      {/* Main container for all page content */}
      <main className={`flex-grow flex flex-col items-center justify-center w-full bg-base-100 transition-all duration-300 relative z-10 ${
          !showResults ? "opacity-100" : "opacity-80 blur-sm"
        }`}
      >

     
      <section className="w-full min-h-screen bg-base-100 flex items-center justify-center relative z-10">{/* Floating background shapes */}
 
        <div className={`absolute top-0 left-0 w-72 h-72 rounded-full filter blur-3xl animate-blob1 mix-blend-multiply ${
          currentTheme === "dark" ? "bg-purple-700/30" : "bg-purple-400/30"
        }`}></div>

        <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full filter blur-3xl animate-blob2 mix-blend-multiply ${
          currentTheme === "dark" ? "bg-pink-700/30" : "bg-pink-400/30"
        }`}></div>

        <div className={`absolute top-1/2 left-1/3 w-60 h-60 rounded-full filter blur-2xl animate-blob3 mix-blend-multiply ${
          currentTheme === "dark" ? "bg-yellow-600/20" : "bg-yellow-300/20"
        }`}></div>

      <div
        data-aos="fade-up"
        className="relative max-w-5xl mx-auto px-6 py-16 flex flex-col items-center text-center space-y-10"
      >
    {/* Heading */}
      <h1
        className={`text-5xl md:text-7xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent ${
          currentTheme === "dark"
            ? "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            : "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600"
        }`}
      >
        Start Your Flavor Journey
      </h1>

      {/* Subheading */}
      <p
        className={`text-lg md:text-2xl max-w-3xl leading-relaxed text-center ${
          currentTheme === "dark" ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Unlock a world of flavors with AI-curated recipes, personalized suggestions, and exciting surprises.
      </p>

    {/* Buttons */}
    <div className="flex flex-wrap items-center justify-center gap-5">
      {[
        {
          href: "/ai",
          icon: <FaRobot className="text-2xl" color="#9B5DE5" />,
          label: "Get AI-Generated Recipes",
        },
        {
          href: "/random",
          icon: <GiDiceSixFacesFour className="text-2xl" color="#FF6347" />,
          label: "Discover a Random Recipe",
        },
        {
          href: "/diet-planner-ai",
          icon: <GiNotebook className="text-2xl" color="#00C9A7" />,
          label: "AI Diet Planner",
        },
        {
          href: "/festive",
          icon: <GiPartyPopper className="text-2xl" color="#F39C12" />,
          label: "Festive Dishes",
        },
        {
          href: "/ingredient-explorer",
          icon: <GiMushroom className="text-2xl" color="#E67E22" />,
          label: "AI Ingredient Explorer",
        },
        {
          href: "/favorite",
          icon: <FaHeart className="text-2xl" color="#E74C3C" />,
          label: "Favorites",
        },
      ].map((btn) => (
        <Link key={btn.href} href={btn.href}>
          <button
          className="flex items-center gap-2 px-6 py-4 text-lg rounded-full 
             bg-white/20 dark:bg-black/20 
             border border-gray-800/50 dark:border-purple-400/50 
             backdrop-blur-md shadow-lg 
             hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
          {btn.icon} {btn.label}
          </button>

        </Link>
      ))}

      {/* Toggle Categories - FIXED: Consistent border in light/dark */}
      <button
        className="flex items-center gap-2 px-6 py-4 text-lg rounded-full 
           bg-white/20 dark:bg-black/20 
           border border-gray-800/50 dark:border-purple-400/50 
           backdrop-blur-md shadow-lg 
           hover:scale-105 hover:shadow-xl transition-all duration-300"
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
        {showCategories ? (
          <>
            <FaFolderOpen className="text-2xl" color="#F39C12" /> Hide Categories
          </>
        ) : (
          <>
            <FaFolder className="text-2xl" color="#F39C12" /> Show Categories
          </>
        )}
      </button>
    </div>
  </div>

  
</section>


        {recentMeals.length > 0 && (
          <section data-aos="fade-up" className="w-full max-w-7xl mx-auto my-10 px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-base-content">Recently Viewed</h2>
              <button onClick={clearRecentMeals} className="text-sm text-red-500 underline">Clear</button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {recentMeals.map((meal) => (
                <Link key={meal.idMeal} href={`/meal/${meal.idMeal}`} className="min-w-[160px] bg-base-200 rounded-lg shadow-md hover:-translate-y-1 transition-transform">
                  <Image src={meal.strMealThumb} alt={meal.strMeal} width={160} height={120} className="w-full h-32 object-cover rounded-t-lg" />
                  <div className="p-2 text-sm font-medium text-center text-base-content">{meal.strMeal}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="divider mt-10"></div>

        {showCategories && (
          <section className="categories-section flex flex-col items-center justify-center p-5 md:p-10 w-full relative z-10">
            <h1 data-aos="fade-up" className={`text-xl md:text-3xl mb-10 font-semibold text-center ${currentTheme === "dark" ? "text-white" : "text-amber-800"}`}>
              A Taste for Every Mood and Moment
            </h1>

            <div data-aos="fade-up" data-aos-delay="100" className="flex flex-wrap gap-4 justify-center mb-8">
              {["All", "Vegetarian", "Non-Vegetarian"].map((type) => (
                <button key={type} onClick={() => setFilter(type)} className={`btn btn-sm md:btn-md ${filter === type ? "btn-primary" : "btn-outline"}`}>{type}</button>
              ))}
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-wrap gap-4 justify-center mb-8">
              <button onClick={() => setShowDiets(!showDiets)} className={`btn btn-sm md:btn-md ${showDiets ? "btn-primary" : "btn-outline"}`}>Diet Based</button>
            </div>

            {showDiets && (
              <div data-aos="fade-up" className="flex flex-wrap gap-4 justify-center mb-8">
                {["Vegan","Keto","100 Calories","Low Carbs","High Protein","Gluten Free"].map((diet) => (
                  <button key={diet} onClick={() => setSelectedDiets(prev => prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev,diet])} className={`btn btn-sm md:btn-md ${selectedDiets.includes(diet) ? "btn-primary" : "btn-outline"}`}>{diet}</button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
              {categories
                .filter(category => {
                  const lowerName = category.strCategory.toLowerCase();
                  const vegetarianKeywords = ["vegetarian","vegan","dessert","pasta","starter"];

                  if(filter === "Vegetarian") return vegetarianKeywords.some(keyword => lowerName.includes(keyword));
                  if(filter === "Non-Vegetarian") return !vegetarianKeywords.some(keyword => lowerName.includes(keyword));
                  if(selectedDiets.length > 0) return selectedDiets.some(diet => categoryDietMap[category.strCategory]?.includes(diet));
                  return true;
                })
                .map(category => (
                  <div key={category.idCategory} data-aos="fade-up" className="card card-compact w-72 lg:w-96 bg-base-200 shadow-xl hover:-translate-y-1 transition-all relative z-10">
                    <figure>
                      <Image src={category.strCategoryThumb} alt={category.strCategory} width={384} height={216} className="w-full h-48 object-cover" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title text-lg md:text-xl flex items-center gap-2">
                        <PlusIcon />
                        {category.strCategory}
                      </h2>
                      <p className="text-sm">{category.strCategoryDescription.slice(0,80)}...</p>
                      <div className="card-actions justify-end">
                        <Link href={`/category/${category.strCategory}`}>
                          <button className="btn btn-primary text-sm md:text-base">Show Recipes</button>
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