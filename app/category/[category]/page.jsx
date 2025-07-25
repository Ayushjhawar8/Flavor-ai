"use client";

import BackButton from "@/components/BackButton";
import { PlusIcon } from "@/components/Icons";
import Link from "next/link";
import { useEffect, useState } from "react";

function Page({ params }) {
  const [meals, setMeals] = useState([]);
  const [dietMap, setDietMap] = useState({});
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`
        );
        const data = await res.json();
        const basicMeals = data.meals || [];
        setMeals(basicMeals);

        // Fetch full details to classify
        const detailPromises = basicMeals.map((m) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`)
            .then((r) => r.json())
            .then((d) => ({ id: m.idMeal, detail: d.meals?.[0] }))
        );
        const details = await Promise.all(detailPromises);

        const map = {};
        details.forEach(({ id, detail }) => {
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ing = detail?.[`strIngredient${i}`]?.toLowerCase()?.trim();
            if (ing) ingredients.push(ing);
          }

          const nonVegKeywords = ["chicken", "beef", "pork", "lamb", "fish", "meat", "shrimp", "prawn"];
          const isNonVeg = ingredients.some((ing) =>
            nonVegKeywords.some((k) => ing.includes(k))
          );
          map[id] = isNonVeg ? "Non‑Veg" : "Veg";
        });

        setDietMap(map);
      } catch (err) {
        console.error("Error loading meals:", err);
      }
    }

    load();
  }, [params.category]);

  const filteredMeals = meals.filter((m) => {
    const diet = dietMap[m.idMeal] || "All";
    return filter === "All" || diet === filter;
  });

  return (
    <div className="flex flex-col items-center justify-center p-5 md:p-10 w-full bg-gradient-to-br from-indigo-50 to-blue-100 relative">
      <BackButton />
      <h1 className="text-4xl md:text-6xl text-secondary mb-10 capitalize">
        {params.category} 🍽️
      </h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-8">
        {["All", "Veg", "Non‑Veg"].map((val) => (
          <button
            key={val}
            className={`px-4 py-2 rounded ${
              filter === val ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter(val)}
          >
            {val}
          </button>
        ))}
      </div>

      {/* Grid of Filtered Meals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {filteredMeals.map((meal) => (
          <div
            key={meal.idMeal}
            className="card card-compact w-full bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 cursor-pointer"
          >
            <figure>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg md:text-xl text-gray-800 flex items-center gap-2">
                <PlusIcon />
                {meal.strMeal}
              </h2>
              <div className="text-sm text-gray-500">
                {dietMap[meal.idMeal] || "Loading..."}
              </div>
              <Link
                className="card-actions justify-end mt-4"
                href={`/meal/${meal.idMeal}`}
              >
                <button className="btn bg-blue-500 hover:bg-blue-700 text-white text-sm md:text-base shadow-md">
                  Try 🍴
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
