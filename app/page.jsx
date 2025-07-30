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

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  useEffect(() => {
    fetch(CATEGORIES_URL)
      .then(res => res.json()) 
      .then(data => {
        const categoryOrder = ["Dessert", "Vegetarian", "Pasta"];
        const sorted = data.categories.sort((a, b) => {
          const aIndex = categoryOrder.findIndex(cat => a.strCategory.toLowerCase().includes(cat.toLowerCase()));
          const bIndex = categoryOrder.findIndex(cat => b.strCategory.toLowerCase().includes(cat.toLowerCase()));
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return 0;
        });
        setCategories(sorted);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      <div
        className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-md bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 shadow-2xl"
            : "bg-gradient-to-r from-amber-400 to-orange-500 shadow-md"
        }`}
      >
        <div className="flex-1">
          <Link
            href="#"
            className="btn btn-ghost text-2xl font-bold text-white hover:scale-105 transition-all"
          >
            Flavor AI
          </Link>
        </div>
        <RecipeSearchBar
          handleBlur={handleBlur}
          handleSearchFocus={handleSearchFocus}
          showResults={showResults}
          setShowResults={setShowResults}
          className="bg-white/20 placeholder-orange-100 text-white border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 backdrop-blur-sm hover:bg-white/30"
        />
      </div>

      <div className={`content flex flex-col items-center justify-center w-full transition-all duration-500 ${!showResults ? "opacity-100" : "opacity-80 blur-sm"}`}>
       <section className="relative w-full min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex items-center justify-center overflow-hidden">
  <div className="max-w-6xl px-6 mx-auto text-center space-y-10">
    <div className="inline-block bg-orange-100 text-orange-700 font-medium px-4 py-1 rounded-full text-sm shadow-sm tracking-wide">
      Intelligent Cooking Starts Here
    </div>

    <h1 className="text-6xl md:text-7xl font-extrabold text-gray-800 leading-tight">
      Cook Smarter, Live Better
    </h1>

    <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
      Welcome to the future of cooking. Flavor AI brings global inspiration and smart personalization right to your kitchen. <br />Fast, creative, and tailored just for you.
    </p>

    <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
      <Link href="/ai">
        <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md transition-all">
          Get Started with AI Recipes
        </button>
      </Link>
      <Link href="/random">
        <button className="bg-white text-orange-600 border-2 border-orange-400 px-8 py-4 rounded-full text-lg font-medium hover:bg-orange-50 transition-all">
          Try a Handpicked Recipe
        </button>
      </Link>
    </div>

    <div className="mt-8 text-gray-500 text-sm tracking-wider">
      Curated by technology. Inspired by chefs. Designed for you.
    </div>
  </div>
</section>
<div className="w-full overflow-hidden leading-none -mb-1 rotate-180">
  <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-20">
    <path d="M0.00,49.98 C150.00,150.00 349.18,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-white"></path>
  </svg>
</div>
       <section className="w-full bg-white py-24">
  <div className="max-w-6xl mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="text-5xl font-bold text-orange-700 mb-4">Why Choose Flavor AI?</h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Flavor AI is your intelligent cooking companion. Whether you're planning meals, trying something new, or improvising with what’s in your fridge, we help you make smarter food decisions.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
      <div className="p-6 bg-orange-50 rounded-xl shadow-md text-center hover:shadow-lg transition">
        <h4 className="text-xl font-semibold text-orange-600 mb-2">Quick & Intelligent</h4>
        <p className="text-gray-600">Instant suggestions tailored to your time and preferences.</p>
      </div>
      <div className="p-6 bg-orange-50 rounded-xl shadow-md text-center hover:shadow-lg transition">
        <h4 className="text-xl font-semibold text-orange-600 mb-2">Truly Personalized</h4>
        <p className="text-gray-600">Recommendations based on your taste, mood, or dietary needs.</p>
      </div>
      <div className="p-6 bg-orange-50 rounded-xl shadow-md text-center hover:shadow-lg transition">
        <h4 className="text-xl font-semibold text-orange-600 mb-2">Explore Without Limits</h4>
        <p className="text-gray-600">Cuisines and dishes from every corner of the globe.</p>
      </div>
    </div>
  </div>
</section>
<div className="w-full overflow-hidden leading-none -mb-1">
  <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-20">
    <path d="M0.00,49.98 C150.00,150.00 349.18,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-white"></path>
  </svg>
</div>
        <section className="text-center py-24 bg-orange-50">
  <div className="w-full px-4 sm:px-12 md:px-20 lg:px-32 xl:px-48 2xl:px-80">
    <h2 className="text-5xl font-bold text-gray-800 mb-6">
      What Are You Craving Today?
    </h2>
    <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto">
      Vegetarian or Non-Vegetarian? Spicy or Mild? Exotic or Simple? Whatever your flavor, explore handpicked categories tailored to every palate.
    </p>
    <button
      onClick={() => {
        setShowCategories(prev => !prev);
        if (!showCategories) {
          setTimeout(() => {
            document.querySelector(".categories-section")?.scrollIntoView({
              behavior: "smooth"
            });
          }, 100);
        }
      }}
      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-md transition-all"
    >
      {showCategories ? "Hide Categories" : "Browse Recipe Categories"}
    </button>
  </div>
</section>


        {showCategories && (
          <section className="categories-section w-full bg-gradient-to-br from-amber-50 to-orange-100 py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-6">
                  Culinary Adventures
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Discover your next favorite dish from our carefully curated collection of global cuisines
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                  <div
                    key={category.idCategory}
                    className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={category.strCategoryThumb}
                        alt={category.strCategory}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2 group-hover:text-orange-600 transition-colors duration-300">
                        <PlusIcon /> {category.strCategory}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {category.strCategoryDescription.slice(0, 120) + "..."}
                      </p>
                      <Link href={`/category/${category.strCategory}`}>
                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-bold transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                          Explore Recipes
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

       <footer className="w-full bg-gradient-to-r from-gray-900 to-red-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold mb-4"> Flavor AI</h3>
                <p className="text-gray-300 text-lg mb-2">Your AI-powered culinary companion</p>
                <p className="text-gray-400">Transforming kitchens worldwide with intelligent recipe recommendations</p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2">
                  <Link href="/ai" className="block text-gray-300 hover:text-orange-400">AI Recipes</Link>
                  <Link href="/random" className="block text-gray-300 hover:text-orange-400">Random Recipe</Link>
                  <a href="#" className="block text-gray-300 hover:text-orange-400">About Us</a>
                </div>
              </div>
              <div className="text-center md:text-right">
                <h4 className="text-xl font-semibold mb-4">Connect</h4>
                <div className="space-y-2">
                  <a
                    href="https://x.com/JhawarAj123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-gray-300 hover:text-blue-400"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Ayush Jhawar
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <a 
                href="https://www.codebuff.com/docs/help#getting-started-with-codebuff"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-pink-400"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Built with <span className="font-semibold text-pink-300">CodeBuff</span>
              </a>
              <p className="text-gray-500 mt-4">&copy; {new Date().getFullYear()} Flavor AI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}