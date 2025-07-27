"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (idMeal) => {
    const updated = favorites.filter((f) => f.idMeal !== idMeal);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="p-6 min-h-screen bg-base-100">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-secondary mb-10">
        Your Favorite Meals 💖
      </h1>
      {favorites.length === 0 ? (
        <p className="text-center text-lg">No favorites yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {favorites.map((meal) => (
            <div
              key={meal.idMeal}
              className="card card-compact w-72 lg:w-96 bg-base-200 shadow-xl"
            >
              <figure>
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  width={288}
                  height={288}
                  className="w-full h-auto"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{meal.strMeal}</h2>
                <Link href={`/meal/${meal.idMeal}`}>
                  <button className="btn btn-primary">View</button>
                </Link>
                <button
                  onClick={() => removeFavorite(meal.idMeal)}
                  className="btn btn-error"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

