"use client";

import { PlusIcon } from "@/components/Icons";
import ThemeToggle from "@/components/ThemeToggle"    // ✅ Correct - default import
import RecipeSearchBar from "@/components/RecipeSearchBar";
import { CATEGORIES_URL } from "@/lib/urls";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  // Monitor theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
          setCurrentTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // Get initial theme
    const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setCurrentTheme(initialTheme);

    return () => observer.disconnect();
  }, []);

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
        className={`navbar fixed top-0 left-0 right-0 z-50 shadow-lg flex flex-col md:flex-row transition-all duration-300 ${isScrolled ? 'bg-base-200/90' : 'bg-base-100/90'
          }`}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
          <div className="rounded-full text-base-content bg-purple-400">
            <ThemeToggle />
          </div>
          <Link
            href="#"
            id="main"
            className={`btn rounded-full btn-ghost text-2xl font-bold ${currentTheme === 'dark' ? 'text-white' : 'bg-[linear-gradient(to_bottom_right,_#ffc1cc,_#fbc2eb,_#fff)]'
              }`}
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
              <path d="M12 0c-6.626 0-12 5.373-12 12c0 5.302 3.438 9.8 8.207 11.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416c-.546-1.387-1.333-1.756-1.333-1.756c-1.089-.745.083-.729.083-.729c1.205.084 1.839 1.237 1.839 1.237c1.07 1.834 2.807 1.304 3.492.997c.107-.775.418-1.305.762-1.604c-2.665-.305-5.467-1.334-5.467-5.931c0-1.311.469-2.381 1.236-3.221c-.124-.303-.535-1.524.117-3.176c0 0 1.008-.322 3.301 1.30c.957-.266 1.983-.399 3.003-.404c1.02.005 2.047.138 3.006.404c2.291-1.552 3.297-1.30 3.297-1.30c.653 1.653.242 2.874.118 3.176c.77.84 1.235 1.911 1.235 3.221c0 4.609-2.807 5.624-5.479 5.921c.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.199-6.086 8.199-11.386c0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">Star</span>
            <span className="sm:hidden">Star</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-500 group-hover:text-yellow-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
        className={`content flex flex-col items-center justify-center p-5 md:p-1 w-full bg-base-100 ${!showResults ? "opacity-100" : "opacity-80 blur-sm"
          }`}
      >
        <section className="w-full h-screen bg-base-100 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center space-y-8">
            <div className="relative">
              <h1 className={`text-5xl md:text-7xl font-extrabold leading-tight ${currentTheme === 'dark' ? 'text-white' : 'text-amber-800'
                }`}>
                Start Your Flavor Journey
              </h1>
            </div>
            <p className={`text-xl md:text-2xl max-w-3xl leading-relaxed ${currentTheme === 'dark' ? 'text-white' : 'text-amber-800'
              }`}>
              Unlock a world of flavors with AI-curated recipes, personalized
              suggestions, and exciting surprises. Explore new cuisines or craft
              the perfect meal with Flavor AI!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">

              {/* --- Button 1: AI Recipes --- */}
              <Link href="/ai" className="animate-fadeIn">
                <button className="btn btn-outline btn-primary text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 flex items-center gap-2">
                  {/* Magic Wand Icon 🪄 */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0" /></svg>
                  Get AI-Generated Recipes
                </button>
              </Link>

              {/* --- Button 2: Random Recipe --- */}
              <Link href="/random" className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
                <button className="btn btn-outline btn-primary text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 flex items-center gap-2">
                  {/* Shuffle Icon 🔀 */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v2a3 3 0 01-3 3z" /></svg>
                  Discover a Random Recipe
                </button>
              </Link>

              {/* --- Button 3: Favorites --- */}
              <Link href="/favorite" className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
                <button className="btn btn-outline btn-primary text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30">
                  ❤️ Favorites
                </button>
              </Link>

              {/* --- Button 4: Show/Hide Categories --- */}
              <button
                className="btn btn-outline btn-primary text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 flex items-center gap-2 animate-fadeIn"
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

            </div>
          </div>
        </section>

        <div className="divider mt-10"></div>

        {/* Categories section */}
        {showCategories && (
          <section className="categories-section flex flex-col items-center justify-center p-5 md:p-10 w-full bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-lg shadow-lg">
            <h1 className={`text-xl md:text-3xl mb-10 font-semibold text-center ${currentTheme === 'dark' ? 'text-white' : 'text-amber-800'
              }`}>
              A Taste for Every Mood and Moment
            </h1>

            {/* Grid layout for categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
              {categories.map((category) => (
                <div
                  key={category.idCategory}
                  // The shadow is now larger and tinted with the theme color on hover
                  className="card card-compact w-full bg-base-100 shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:shadow-amber-400/40 hover:scale-105 hover:-translate-y-1 cursor-pointer hover:ring-2 hover:ring-amber-400"
                >
                  <figure>
                    <img
                      src={category.strCategoryThumb}
                      alt={category.strCategory}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                  <div className="card-body p-4">
                    <h2 className={`card-title text-lg md:text-xl flex items-center ${currentTheme === 'dark' ? 'text-white' : 'text-amber-800'
                      }`}>
                      <PlusIcon />
                      {category.strCategory}
                    </h2>
                    <p className={`text-sm md:text-base ${currentTheme === 'dark' ? 'text-white' : 'text-amber-700'
                      }`}>
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

        {/* Footer added */}
        <Footer />
      </div>
    </>
  );
}
