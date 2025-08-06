"use client";

import BackButton from "@/components/BackButton";
import { PlusIcon } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CATEGORIES_URL } from "@/lib/urls";
import Footer from "@/components/Footer";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

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

  return (
    <>
      <div className="p-6 min-h-screen bg-base-100">
        <BackButton />
        <h1 className="text-3xl md:text-5xl font-bold text-center text-secondary mb-10">
          Your Favorite Meals 💖
        </h1>

        {favorites.length === 0 ? (
          <>
            <p className="text-center text-lg mb-6">No favorites yet!</p>
            <section className="categories-section flex flex-col items-center justify-center p-5 md:p-10 w-full bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-lg">
              <h2 className="text-xl md:text-3xl text-base-content mb-10 font-semibold text-center">
                A Taste for Every Mood and Moment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                {categories.map((category) => (
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
                      <h3 className="card-title text-lg md:text-xl text-gray-800 flex items-center">
                        <PlusIcon />
                        {category.strCategory}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">
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
          </>
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
      <Footer />
    </>
  );
}