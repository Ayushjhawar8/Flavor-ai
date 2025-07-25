"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export default function RecipeSearchBar() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      if (query.trim().length === 0) {
        setMeals([]);
        return;
      }

      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      setMeals(data.meals || []);
    };

    const timeout = setTimeout(fetchMeals, 400); // debounce
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative max-w-2xl mx-auto p-4">
      <div className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg px-4 py-2">
        <Search className="text-white w-5 h-5 mr-3" />
        <input
          type="text"
          placeholder="Search meals..."
          className="w-full bg-transparent placeholder-white text-white focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {meals.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg">
          {meals.map((meal) => (
            <Link
              key={meal.idMeal}
              href={`/meal/${meal.idMeal}`}
              className="flex items-center p-2 hover:bg-gray-100 transition rounded"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-12 h-12 rounded object-cover mr-3"
              />
              <span className="text-gray-800 font-medium">{meal.strMeal}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
