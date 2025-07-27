"use client";

import { PlusIcon } from "@/components/Icons";
import RecipeSearchBar from "@/components/RecipeSearchBar";
import { CATEGORIES_URL } from "@/lib/urls";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSearchFocus = () => {
    setShowResults(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  useEffect(() => {
    fetch(CATEGORIES_URL)
      .then((res) => res.json())
      .then((data) => {
        const sortedCategories = data.categories.sort((a, b) => {
          const categoryOrder = ['Dessert', 'Vegetarian', 'Pasta'];
          const aIndex = categoryOrder.findIndex(cat => 
            a.strCategory.toLowerCase().includes(cat.toLowerCase())
          );
          const bIndex = categoryOrder.findIndex(cat => 
            b.strCategory.toLowerCase().includes(cat.toLowerCase())
          );
          
          // If both categories are in our priority list
          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
          }
          // If only a is in priority list
          if (aIndex !== -1) return -1;
          // If only b is in priority list
          if (bIndex !== -1) return 1;
          // If neither are in priority list
          return 0;
        });
        setCategories(sortedCategories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const content = document.querySelector(".content");
    if (navbar && content) {
      content.style.marginTop = `${navbar.offsetHeight}px`;
    }
  }, []);

  return (
    <>
      {/* Navbar */}
      <div
        className={`navbar fixed top-0 left-0 right-0 z-50 shadow-lg flex flex-col md:flex-row transition-all duration-300 ${
          isScrolled ? 'bg-base-200/90' : 'bg-base-100/90'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
          <Link
            href="#"
            id="main"
            className="btn btn-ghost text-2xl font-bold"
          >
            Flavor AI
          </Link>
          <a
            href="https://github.com/Ayushjhawar8/Flavor-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-base-200 hover:bg-base-300 text-base-content px-3 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-300 hover:scale-105 border border-base-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12c0 5.302 3.438 9.8 8.207 11.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416c-.546-1.387-1.333-1.756-1.333-1.756c-1.089-.745.083-.729.083-.729c1.205.084 1.839 1.237 1.839 1.237c1.07 1.834 2.807 1.304 3.492.997c.107-.775.418-1.305.762-1.604c-2.665-.305-5.467-1.334-5.467-5.931c0-1.311.469-2.381 1.236-3.221c-.124-.303-.535-1.524.117-3.176c0 0 1.008-.322 3.301 1.30c.957-.266 1.983-.399 3.003-.404c1.02.005 2.047.138 3.006.404c2.291-1.552 3.297-1.30 3.297-1.30c.653 1.653.242 2.874.118 3.176c.77.84 1.235 1.911 1.235 3.221c0 4.609-2.807 5.624-5.479 5.921c.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.199-6.086 8.199-11.386c0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="hidden sm:inline">Star</span>
            <span className="sm:hidden">Star</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-500 group-hover:text-yellow-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </a>
        </div>
        <div className="ml-auto">
          <RecipeSearchBar
            isScrolled={isScrolled}
            handleBlur={handleBlur}
            handleSearchFocus={handleSearchFocus}
            showResults={showResults}
            setShowResults={setShowResults}
            className="bg-purple-900/30 placeholder-gray-200 text-white border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Content */}
      <div
        className={`content flex flex-col items-center justify-center p-5 md:p-1 w-full bg-base-100 ${
          !showResults ? "opacity-100" : "opacity-80 blur-sm"
        }`}
      >
        <section className="w-full h-screen bg-base-100 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center space-y-6 md:space-y-8">
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-extrabold text-base-content leading-tight">
                Start Your Flavor Journey
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-base-content/80 max-w-3xl leading-relaxed">
              Unlock a world of flavors with AI-curated recipes, personalized
              suggestions, and exciting surprises. Explore new cuisines or craft
              the perfect meal with Flavor AI!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href="/ai" className="transform hover:scale-105 transition-all duration-300 animate-fadeIn">
                <button className="btn btn-primary text-white px-6 py-3 rounded-lg shadow-lg text-lg hover:bg-primary-focus">
                  Get AI-Generated Recipes
                </button>
              </Link>
              <Link href="/random" className="transform hover:scale-105 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '200ms' }}>
                <button className="btn btn-primary text-white px-6 py-3 rounded-lg shadow-lg text-lg hover:bg-primary-focus">
                  Discover a Random Recipe
                </button>
              </Link>
              <Link href="/favorite" className="transform hover:scale-105 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '200ms' }}>
                <button className="btn btn-primary text-white px-6 py-3 rounded-lg shadow-lg text-lg hover:bg-primary-focus">
                  ❤️ Favorites
                </button>
              </Link>
              
              <button
                className="btn btn-primary text-white text-lg md:text-xl shadow-md mt-6 md:mt-0 transform hover:scale-105 transition-all duration-300 animate-fadeIn flex items-center gap-2 hover:bg-primary-focus"
                onClick={() => {
                  setShowCategories((prev) => !prev);
                  if (!showCategories) {
                    setTimeout(() => {
                      document.querySelector('.categories-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                style={{ animationDelay: '400ms' }}
              >
                {showCategories ? "Hide Categories" : "Show Categories"}
                {!showCategories && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </section>

        <div className="divider my-10"></div>

        {/* Categories section */}
        {showCategories && (
          <section className="categories-section flex flex-col items-center justify-center p-5 md:p-10 w-full bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-lg shadow-lg">
            <h1 className="text-xl md:text-3xl text-base-content mb-10 font-semibold text-center">
              A Taste for Every Mood and Moment
            </h1>

            {/* Grid layout for categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
              {categories.map((category) => (
                <div
                  key={category.idCategory}
                  className="card card-compact w-full bg-base-100 shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 cursor-pointer"
                >
                  <figure>
                    <img
                      src={category.strCategoryThumb}
                      alt={category.strCategory}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg md:text-xl text-gray-800 flex items-center">
                      <PlusIcon />
                      {category.strCategory}
                    </h2>
                    <p className="text-sm md:text-base text-gray-600">
                      {category.strCategoryDescription.slice(0, 150) + " ..."}
                    </p>
                    <Link
                      className="card-actions justify-end"
                      href={`/category/${category.strCategory}`}
                    >
                      <button className="btn btn-primary text-white text-sm md:text-base shadow-md">
                        Explore
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="footer rounded-md mt-10 p-10 bg-base-200 text-base-content footer-center">
          <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mx-auto space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold">Flavor AI</h3>
              <p className="text-sm">Your AI-powered culinary companion.</p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <a
                href="https://x.com/JhawarAj123"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition"
              >
                Ayush Jhawar
              </a>
              <a
                href="https://github.com/Ayushjhawar8/Flavor-ai/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 animate-bounce shadow-purple-500/50 ring-2 ring-purple-400/75 hover:shadow-2xl hover:shadow-purple-500/50 hover:ring-4 hover:ring-purple-400/75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12c0 5.302 3.438 9.8 8.207 11.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416c-.546-1.387-1.333-1.756-1.333-1.756c-1.089-.745.083-.729.083-.729c1.205.084 1.839 1.237 1.839 1.237c1.07 1.834 2.807 1.304 3.492.997c.107-.775.418-1.305.762-1.604c-2.665-.305-5.467-1.334-5.467-5.931c0-1.311.469-2.381 1.236-3.221c-.124-.303-.535-1.524.117-3.176c0 0 1.008-.322 3.301 1.30c.957-.266 1.983-.399 3.003-.404c1.02.005 2.047.138 3.006.404c2.291-1.552 3.297-1.30 3.297-1.30c.653 1.653.242 2.874.118 3.176c.77.84 1.235 1.911 1.235 3.221c0 4.609-2.807 5.624-5.479 5.921c.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.199-6.086 8.199-11.386c0-6.627-5.373-12-12-12z"/>
                </svg>
                Ayush Jhawar
              </a>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <a
                  href="https://github.com/Ayushjhawar8/Flavor-ai/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-white px-4 py-1 rounded-full text-sm font-medium shadow-md flex items-center gap-2 hover:bg-primary-focus transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12c0 5.302 3.438 9.8 8.207 11.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416c-.546-1.387-1.333-1.756-1.333-1.756c-1.089-.745.083-.729.083-.729c1.205.084 1.839 1.237 1.839 1.237c1.07 1.834 2.807 1.304 3.492.997c.107-.775.418-1.305.762-1.604c-2.665-.305-5.467-1.334-5.467-5.931c0-1.311.469-2.381 1.236-3.221c-.124-.303-.535-1.524.117-3.176c0 0 1.008-.322 3.301 1.30c.957-.266 1.983-.399 3.003-.404c1.02.005 2.047.138 3.006.404c2.291-1.552 3.297-1.30 3.297-1.30c.653 1.653.242 2.874.118 3.176c.77.84 1.235 1.911 1.235 3.221c0 4.609-2.807 5.624-5.479 5.921c.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.199-6.086 8.199-11.386c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Contribute on GitHub
                </a>
              </div>
            </div>
            <div className="text-sm text-center md:text-right">
              <p>
                &copy; {new Date().getFullYear()} Flavor AI. All Rights
                Reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}