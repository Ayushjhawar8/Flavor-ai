"use client";

import BackButton from "@/components/BackButton";
import { PlusIcon } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Page({ params }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-5 md:p-10 w-full bg-gradient-to-br from-indigo-50 to-blue-100 relative">
      <BackButton />
      <h1 className="text-4xl md:text-6xl text-secondary mb-10 capitalize">
        {params.category} 🍽️
      </h1>

      {/* Styled Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {loading ? ( // <--- IMPORTANT: Re-added the conditional rendering for loading
          Array.from({ length: 6 }).map((_, i) => <Loading key={i} />)
        ) : (
          meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="card card-compact w-full bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 cursor-pointer"
            >
              <figure>
                <Image
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  // Choose one className. This one is better for card images.
                  className="w-full h-48 object-cover"
                  // Keep width and height for Next.js Image optimization
                  // You can adjust these values, but they are required.
                  width={500} // Example width
                  height={300} // Example height
                  loading="lazy" // Keep this for performance
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg md:text-xl text-gray-800 flex items-center gap-2">
                  <PlusIcon />
                  {meal.strMeal}
                </h2>
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
          ))
        )}
      </div>
    </div>
  );
}

export default Page;

function Loading() {
  // Adjusted skeleton size to better match the cards' potential rendered size
  return (
    <div className="skeleton w-full h-48 rounded-lg" />
  );
}