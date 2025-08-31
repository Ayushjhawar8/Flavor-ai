"use client";
import React, { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const filteredFavorites = favorites.filter((meal) => {
    if (filter === "veg") return meal.strCategory === "Vegetarian";
    if (filter === "nonveg") return meal.strCategory !== "Vegetarian";
    return true;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Your Favorite Meals ❤️
      </h1>

      {/* ✅ Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all" ? "bg-yellow-400 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("veg")}
          className={`px-4 py-2 rounded-lg ${
            filter === "veg" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          Vegetarian
        </button>
        <button
          onClick={() => setFilter("nonveg")}
          className={`px-4 py-2 rounded-lg ${
            filter === "nonveg" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          Non-Veg
        </button>
      </div>

      {/* ✅ Favorites List */}
      {filteredFavorites.length === 0 ? (
        <p className="text-center">No favorites yet!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredFavorites.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <div className="p-3">
                <h2 className="font-semibold">{meal.strMeal}</h2>
                <p className="text-sm text-gray-500">{meal.strCategory}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
