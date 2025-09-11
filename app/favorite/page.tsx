"use client";

import BackButton from "@/components/BackButton";
import { PlusIcon } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CATEGORIES_URL } from "@/lib/urls";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
}

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

// ✅ Function to detect meal type
const getMealType = (mealName: string) => {
  const nonVegKeywords = [
    "chicken",
    "beef",
    "mutton",
    "fish",
    "prawn",
    "egg",
    "meat",
    "pork",
    "lamb",
  ];
  return nonVegKeywords.some((word) =>
    mealName.toLowerCase().includes(word)
  )
    ? "Non-Veg"
    : "Vegetarian";
};

// ✅ Function to filter categories
const getCategoryType = (categoryName: string) => {
  const vegCategories = ["Vegetarian", "Vegan", "Starter"];
  return vegCategories.includes(categoryName) ? "Vegetarian" : "Non-Veg";
};

export default function FavoritesPage() {
  const [showResults, setShowResults] = useState(false);
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState("All");

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    fetch(CATEGORIES_URL)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const removeFavorite = (idMeal: string) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // ✅ Filter meals (Favorites)
  const filteredFavorites = favorites.filter((meal) => {
    const type = getMealType(meal.strMeal);
    return filter === "All" || type === filter;
  });

  // ✅ Filter categories (for "A Taste for Every Mood and Moment")
  const filteredCategories = categories.filter((category) => {
    const type = getCategoryType(category.strCategory);
    return filter === "All" || type === filter;
  });

  return (
    <>
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />
      <div
        className={`p-6 min-h-screen mt-20 bg-base-100 transition-all duration-300 ${
          showResults ? "opacity-80 blur-sm" : "opacity-100"
        }`}
      >
        <BackButton />
        <h1 className="text-3xl md:text-5xl font-bold text-center text-secondary mb-10">
          Your Favorite Meals 💖
        </h1>

        {/* ✅ Filter Bar */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter("All")}
            className={`btn ${filter === "All" ? "btn-primary" : "btn-outline"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Vegetarian")}
            className={`btn ${
              filter === "Vegetarian" ? "btn-primary" : "btn-outline"
            }`}
          >
            Vegetarian
          </button>
          <button
            onClick={() => setFilter("Non-Veg")}
            className={`btn ${
              filter === "Non-Veg" ? "btn-primary" : "btn-outline"
            }`}
          >
            Non-Veg
          </button>
        </div>

        {/* ✅ Favorites Section */}
        {favorites.length === 0 ? (
          <p className="text-center text-lg mb-6">No favorites yet!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center mb-16">
            {filteredFavorites.map((meal) => (
              <div
                key={meal.idMeal}
                className="relative card w-80 lg:w-96 bg-base-200 shadow-xl rounded-2xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Image */}
                <figure className="relative h-56 w-full">
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={384}
                    height={224}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent"></div>
                  <h2 className="absolute bottom-3 left-4 text-lg md:text-xl font-bold text-white drop-shadow-lg">
                    {meal.strMeal}
                  </h2>
                </figure>

                {/* Card Body */}
                <div className="card-body px-5 py-4">
                  <div className="flex justify-between items-center gap-4">
                    <Link
                      href={`/meal/${meal.idMeal}`}
                      className="btn btn-sm md:btn-md btn-primary text-white shadow-md"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => removeFavorite(meal.idMeal)}
                      className="btn btn-sm md:btn-md btn-error shadow-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Categories Always Visible */}
        <section className="categories-section flex flex-col items-center justify-center p-5 md:p-10 w-full bg-base-200 rounded-lg shadow-lg">
          <h2 className="text-xl md:text-3xl text-base-content mb-10 font-semibold text-center">
            A Taste for Every Mood and Moment
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            {filteredCategories.map((category) => (
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
                  <h3 className="card-title text-lg md:text-xl text-base-content flex items-center">
                    <PlusIcon />
                    {category.strCategory}
                  </h3>
                  <p className="text-sm md:text-base text-base-content">
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
      </div>
      <div className="bg-base-100">
        <Footer />
      </div>
    </>
  );
}
