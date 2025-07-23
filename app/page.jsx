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
        className={`navbar fixed top-0 left-0 right-0 z-50 text-white shadow-lg flex flex-col md:flex-row transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-lg backdrop-saturate-150"
          : "bg-gradient-to-r from-white/20 via-white/30 to-white/20 backdrop-blur-md"
        }`}
        style={{ margin: 0, border: "none" }}
      >
        <div className="flex-1">
          <Link
            href="#"
            id="main"
            className="btn btn-ghost text-2xl font-bold text-white"
          >
            Flavor AI
          </Link>
        </div>
        <RecipeSearchBar
          handleBlur={handleBlur}
          handleSearchFocus={handleSearchFocus}
          showResults={showResults}
          setShowResults={setShowResults}
          className="bg-purple-900/30 placeholder-gray-200 text-white border border-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 backdrop-blur-sm"
        />
      </div>

      {/* Content */}
      <div
        className={`content flex flex-col items-center justify-center p-5 md:p-1 w-full bg-gradient-to-br from-indigo-50 to-blue-100 ${
          !showResults ? "opacity-100" : "opacity-80 blur-sm"
        }`}
      >
        <section className="w-full h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center space-y-6 md:space-y-8">
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-extrabold text-indigo-900 leading-tight">
                Start Your Flavor Journey
              </h1>
              <div className="absolute -top-2 -right-2 transform rotate-12">
                <a 
                  href="https://www.codebuff.com/docs/help#getting-started-with-codebuff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-bounce hover:bg-purple-700 transition-colors"
                >
                  Built with CodeBuff ✨
                </a>
              </div>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed">
              Unlock a world of flavors with AI-curated recipes, personalized
              suggestions, and exciting surprises. Explore new cuisines or craft
              the perfect meal with Flavor AI!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href="/ai" className="transform hover:scale-105 transition-all duration-300 animate-fadeIn">
                <button className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg">
                  Get AI-Generated Recipes
                </button>
              </Link>
              <Link href="/random" className="transform hover:scale-105 transition-all duration-300 animate-fadeIn" style={{ animationDelay: '200ms' }}>
                <button className="btn bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg text-lg">
                  Discover a Random Recipe
                </button>
              </Link>
              <button
                className="btn bg-green-500 hover:bg-green-700 text-white text-lg md:text-xl shadow-md mt-6 md:mt-0 transform hover:scale-105 transition-all duration-300 animate-fadeIn flex items-center gap-2"
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
          <section className="categories-section flex flex-col items-center justify-center p-5 md:p-10 w-full bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg shadow-lg">
            <h1 className="text-xl md:text-3xl text-gray-700 mb-10 font-semibold text-center">
              A Taste for Every Mood and Moment
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
              {categories.map((category) => (
                <div
                  key={category.idCategory}
                  className="card card-compact w-full bg-white shadow-lg rounded-lg overflow-hidden"
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
                      <button className="btn bg-blue-500 hover:bg-blue-700 text-white text-sm md:text-base shadow-md">
                        Explore
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="footer rounded-md mt-10 p-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white footer-center">
          <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mx-auto space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold">Flavor AI</h3>
              <p className="text-sm">Your AI-powered culinary companion.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex flex-col items-center gap-2">
                <a
                  href="https://x.com/JhawarAj123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200 transition"
                >
                  Ayush Jhawar
                </a>
                <a 
                  href="https://www.codebuff.com/docs/help#getting-started-with-codebuff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animate-bounce bg-purple-700 rounded-full px-4 py-1 text-sm font-semibold shadow-lg hover:bg-purple-800 transition-colors"
                >
                  Built with CodeBuff 🚀
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
