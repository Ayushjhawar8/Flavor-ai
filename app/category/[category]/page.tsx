  "use client";

  import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
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

  interface PageProps {
    params: {
      category: string;
    };
  }

  export default function Page({ params }: PageProps) {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState<Meal[]>([]);

    useEffect(() => {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`)
        .then((res) => res.json())
        .then((data) => setMeals(data.meals || []))
        .catch((error) => console.error("Error fetching meals:", error))
        .finally(() => setLoading(false));
    }, [params.category]);

    useEffect(() => {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
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

    return (
      <>
      <div className="flex flex-col items-center justify-center p-5 md:p-10 w-full min-h-screen bg-base-100">
        <BackButton />
        <h1 className="text-4xl md:text-6xl text-secondary mb-10 capitalize">
          {params.category} 🍽
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <Loading key={i} />)
          ) : (
            meals.map((meal) => (
              <div
                key={meal.idMeal}
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
                  <h2 className="card-title text-lg md:text-xl text-gray-800 flex items-center gap-2">
                    <PlusIcon />
                    {meal.strMeal}
                  </h2>
                  <div className="card-actions justify-end">
                    <Link href={`/meal/${meal.idMeal}`}>
                      <button className="btn btn-primary text-sm md:text-base">
                        Try 🍴
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
      </>
    );
  }

  function Loading() {
    return <div className="skeleton w-72 lg:w-96 h-[408px] lg:h-[504px]" />;
  }
