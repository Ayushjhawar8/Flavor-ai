"use client";

import BackButton from "@/components/BackButton";
import { PlusIcon } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (idMeal: string) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="p-6 min-h-screen bg-base-100">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-secondary mb-10">
        Your Favorite Meals 💖
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-lg">No favorites yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
          {favorites.map((meal) => (
            <div
              key={meal.idMeal}
              className="card card-compact w-72 lg:w-96 bg-base-200 shadow-xl"
            >
              <figure>
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  width={384}
                  height={216}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{meal.strMeal}</h2>
                <div className="flex justify-between mt-4">
                  <Link href={`/meal/${meal.idMeal}`} className="btn btn-primary">
                    View
                  </Link>
                  <button
                    onClick={() => removeFavorite(meal.idMeal)}
                    className="btn btn-error"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
