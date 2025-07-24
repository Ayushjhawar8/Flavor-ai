"use client";
import ShowMeal from "@/components/ShowMeal";
import { useEffect, useState } from "react";
import { RANDOM_MEAL_URL } from "@/lib/urls";

export default function Page() {
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(RANDOM_MEAL_URL)
      .then(res => res.json())
      .then(data => setMeal(data.meals[0]));
  }, []);

  if (!meal) return <div className="min-h-screen flex items-center justify-center">Loading random recipe...</div>;

  return <ShowMeal mealData={meal} />;
}
