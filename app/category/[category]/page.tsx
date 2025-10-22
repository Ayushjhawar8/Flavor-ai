"use client";

import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import { PlusIcon } from "@/components/Icons";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface PageProps {
  params: {
    category: string;
  };
}

const TryIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 36 36"
    fill="currentColor"
    aria-hidden="true"
    role="img"
    preserveAspectRatio="xMidYMid meet"
  >
    <path d="M19 1.5a1.5 1.5 0 1 0-3 0V11a1 1 0 0 1-2 0V1.5a1.5 1.5 0 1 0-3 0V11a1 1 0 0 1-2 0V1.5a1.5 1.5 0 1 0-3 0v9c0 .127.021.249.051.367c-.03.207-.051.417-.051.633c0 2.316 1.75 5.957 4 6.442V33.5a2.5 2.5 0 1 0 5 0V17.942c2.25-.485 4-4.126 4-6.442c0-.216-.021-.426-.051-.633c.03-.118.051-.24.051-.367v-9zM27.5 0c-.104 0-.204.019-.306.031C27.13.021 27.067 0 27 0c-2.209 0-5 5.477-5 11c0 4.658 1.275 8.56 3 9.672V33.5a2.5 2.5 0 1 0 5 0v-31A2.5 2.5 0 0 0 27.5 0z" />
  </svg>
);

export default function Page({ params }: PageProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [beverages, setBeverages] = useState<Meal[]>([]);
  const [loadingMeals, setLoadingMeals] = useState(true);
  const [loadingBeverages, setLoadingBeverages] = useState(true);
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [filter, setFilter] = useState("All");
  const [showResults, setShowResults] = useState(false);

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  // Fetch meals for the given category
  useEffect(() => {
    setLoadingMeals(true);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`,
    )
      .then((res) => res.json())
      .then((data) => setMeals(data.meals || []))
      .catch((error) => console.error("Error fetching meals:", error))
      .finally(() => setLoadingMeals(false));
  }, [params.category]);

  // Fetch beverages once
  useEffect(() => {
    setLoadingBeverages(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Beverages`)
      .then((res) => res.json())
      .then((data) => setBeverages(data.meals || []))
      .catch((error) => console.error("Error fetching beverages:", error))
      .finally(() => setLoadingBeverages(false));
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  const toggleFavorite = (meal: Meal) => {
    let updatedFavorites: Meal[] = [];
    if (favorites.some((f) => f.idMeal === meal.idMeal)) {
      updatedFavorites = favorites.filter((f) => f.idMeal !== meal.idMeal);
    } else {
      updatedFavorites = [...favorites, meal];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (idMeal: string) =>
    favorites.some((f) => f.idMeal === idMeal);

  const getMealType = (mealName: string) => {
    const lowerName = mealName.toLowerCase();
    if (
      lowerName.includes("chicken") ||
      lowerName.includes("beef") ||
      lowerName.includes("mutton") ||
      lowerName.includes("fish") ||
      lowerName.includes("prawn") ||
      lowerName.includes("egg") ||
      lowerName.includes("meat") ||
      lowerName.includes("pork")
    ) {
      return "Non-Veg";
    }
    return "Veg";
  };

  let displayMeals: Meal[] = [];
  if (filter === "Beverages") {
    displayMeals = beverages;
  } else if (filter === "All") {
    displayMeals = meals;
  } else {
    displayMeals = meals.filter((meal) => getMealType(meal.strMeal) === filter);
  }

  const loading = filter === "Beverages" ? loadingBeverages : loadingMeals;

  return (
    <>
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />
      <div
        className={`flex flex-col items-center mt-20 justify-center p-5 md:p-10 w-full min-h-screen bg-base-100 transition-all duration-300 ${
          showResults ? "opacity-80 blur-sm" : "opacity-100"
        }`}
      >
        <BackButton />

        <h1
          data-aos="fade-down"
          className="text-4xl md:text-6xl text-secondary mb-5 capitalize"
        >
          {filter === "Beverages" ? "Beverages" : params.category} 🍽
        </h1>

        <div
          data-aos="fade-down"
          data-aos-delay="100"
          className="flex gap-4 mb-10"
        >
          {["All", "Veg", "Non-Veg", "Beverages"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`btn ${filter === type ? "btn-primary" : "btn-outline"}`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <Loading key={i} />)
          ) : displayMeals.length === 0 ? (
            <div className="text-lg text-base-content col-span-full">
              No items found.
            </div>
          ) : (
            displayMeals.map((meal, index) => (
              <div
                key={meal.idMeal}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="card card-compact w-72 lg:w-96 bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <figure className="relative">
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={384}
                    height={216}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <button
                    onClick={() => toggleFavorite(meal)}
                    className="absolute top-2 right-2 bg-black text-white rounded-full p-2 text-lg hover:bg-black hover:text-black transition"
                    aria-label="Toggle favorite"
                  >
                    {isFavorite(meal.idMeal) ? "💖" : "🤍"}
                  </button>
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-lg md:text-xl text-base-content flex items-center gap-2">
                    <PlusIcon />
                    {meal.strMeal}
                  </h2>
                  <div className="card-actions justify-end">
                    <Link href={`/meal/${meal.idMeal}`}>
                      <button className="btn btn-primary text-sm md:text-base flex items-center gap-2">
                        Try <TryIcon />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-base-100">
        <Footer />
      </div>
    </>
  );
}

function Loading() {
  return <div className="skeleton w-72 lg:w-96 h-[408px] lg:h-[504px]" />;
}
