"use client";

import BackButton from "@/components/BackButton";
import { PlusIcon } from "@/components/Icons";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Page({ params })
{
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>
  {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`
    )
      .then((res) => res.json())
      .then((data) =>
      {
        setMeals(data.meals);
      })
      .catch((error) =>
      {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Simple Navbar */}
      <div className="navbar bg-base-100 border-b border-base-300 px-4">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl font-bold text-base-content">
            Flavor AI
          </Link>
        </div>
        <div className="flex-none">
          <ThemeToggle />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-5 md:p-10 relative">
        <BackButton />
        <h1 className="text-4xl md:text-6xl text-secondary mb-10">
          {params.category} 🍽️
        </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading ?
          Array.from({ length: 6 }).map((_, i) => (
            <Loading key={i} />
          ))
          :
          meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="card card-compact w-72 lg:w-96 bg-white shadow-xl"
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
                                      <h2 className="card-title text-lg md:text-xl text-base-content flex items-center">
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
    </div>
  );
}
export default Page;

function Loading()
{
  return (
    <div className="skeleton w-72 lg:w-96 h-[408px] lg:h-[504px]" />
  )
}