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
    <div className="flex flex-col items-center justify-center p-5 md:p-10 w-full min-h-screen bg-base-100 relative">
      <BackButton />
      <h1 className="text-4xl md:text-6xl text-secondary mb-10">
        {params.category} 🍽️
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading ? 
          Array.from({ length: 6 }).map((_,i) => (
            <Loading key={i} /> 
          ))
        : 
        meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="card card-compact w-72 lg:w-96 bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <figure>
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={288}
                height={288}
                className="w-72 lg:w-96 h-auto"
                loading="lazy"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg md:text-xl text-gray-800 flex items-center">
                <PlusIcon />
                {meal.strMeal}
              </h2>
              <Link
                className="card-actions justify-end"
                href={`/meal/${meal.idMeal}`}
              >
                <button className="btn btn-primary text-sm md:text-base">
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

function Loading() {
  return (
    <div className="skeleton w-72 lg:w-96 h-[408px] lg:h-[504px]" />
  )
}