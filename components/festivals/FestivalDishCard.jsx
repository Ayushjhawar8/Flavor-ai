"use client";

import { useRouter } from 'next/navigation';
import { Clock, Users } from "lucide-react";

export default function FestivalDishCard({ dish }) {
  const router = useRouter();

  const handleViewRecipe = () => {
    // Store recipe in localStorage for the recipe page to access
    localStorage.setItem('current_recipe', JSON.stringify(dish));
    router.push('/recipe');
  };

  return (
      <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
      <figure className="relative">
        <img
          src={dish.image}
          alt={dish.name}
            className="w-full h-72 object-cover"
        />
        <div className="absolute top-2 right-2">
            <div className="badge badge-primary">{dish.festival}</div>
        </div>
      </figure>

      <div className="card-body p-6">
        <h2 className="card-title text-lg">{dish.name}</h2>
        
        <p className="text-sm text-base-content/80 line-clamp-2">
          {dish.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-base-content/60 mt-2">
          {dish.cookTime && (
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{dish.cookTime}</span>
            </div>
          )}
          {dish.servings && (
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{dish.servings} servings</span>
            </div>
          )}
          {dish.difficulty && (
            <div className="badge badge-outline badge-sm">{dish.difficulty}</div>
          )}
        </div>

          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary btn-sm" onClick={handleViewRecipe}>
            View Recipe
          </button>
        </div>
      </div>
      </div>
  );
}