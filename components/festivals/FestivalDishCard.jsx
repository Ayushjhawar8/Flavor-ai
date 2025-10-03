"use client";

import { useState } from 'react'; 
import { useRouter } from 'next/navigation';
import { Clock, Users, Heart } from "lucide-react"; 

export default function FestivalDishCard({ dish }) {
  const router = useRouter();

  // STATE MANAGEMENT FOR LIKES
  const [currentLikes, setCurrentLikes] = useState(dish.likes || 0);
  const [isLiked, setIsLiked] = useState(false); 

  const handleViewRecipe = () => {
    // Store recipe in localStorage for the recipe page to access
    localStorage.setItem('current_recipe', JSON.stringify(dish));
    router.push('/recipe');
  };

  // LIKE BUTTON HANDLER (Frontend + API Call)
  const handleLike = async (e) => {
    e.stopPropagation(); // Prevents a full card click handler from firing

    if (isLiked) return; // Stop if already liked

    // OPTIMISTIC UI: Update the count immediately
    setCurrentLikes(prev => prev + 1);
    setIsLiked(true);

    try {
      // API CALL: This hits the Next.js API route you are about to create
      const response = await fetch(`/api/dishes/${dish._id}/like`, { 
        method: 'POST',
      });

      if (!response.ok) {
        // ROLLBACK: If the server fails, revert the UI state
        setCurrentLikes(prev => prev - 1);
        setIsLiked(false);
        throw new Error('Failed to record like on the server.');
      }
      
      // 👈 NEW CODE STARTS HERE: Update localStorage
      const data = await response.json(); 
      
      // Update the dish object with the new like count
      const updatedDishData = { ...dish, likes: data.newLikesCount };
      
      // Overwrite the old dish data in localStorage with the fresh data
      // This ensures the /recipe page gets the correct like count if opened immediately
      localStorage.setItem('current_recipe', JSON.stringify(updatedDishData));
      // 👈 NEW CODE ENDS HERE
      
    } catch (error) {
      console.error("Liking Error:", error);
    }
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

        {/* LIKES COUNT DISPLAY (Added to Metadata) */}
        <div className="flex items-center gap-4 text-sm text-base-content/60 mt-2">
          {/* Existing Cook Time */}
          {dish.cookTime && (
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{dish.cookTime}</span>
            </div>
          )}
          {/* Existing Servings */}
          {dish.servings && (
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{dish.servings} servings</span>
            </div>
          )}
          
          {/* NEW: Display the number of likes */}
          <div className="flex items-center gap-1 text-red-500">
            <Heart size={16} fill="currentColor" />
            <span className="font-semibold">{currentLikes}</span>
          </div>

          {/* Existing Difficulty */}
          {dish.difficulty && (
            <div className="badge badge-outline badge-sm">{dish.difficulty}</div>
          )}
        </div>

        {/* LIKE BUTTON AND VIEW RECIPE BUTTONS */}
        <div className="card-actions justify-between mt-4">
           {/* New Like Button */}
           <button 
             className={`btn btn-sm ${isLiked ? 'btn-secondary' : 'btn-ghost'}`} 
             onClick={handleLike}
             disabled={isLiked}
           >
             <Heart size={16} />
             {isLiked ? 'Liked!' : 'Like'}
           </button>

           {/* Original View Recipe Button */}
           <button className="btn btn-primary btn-sm" onClick={handleViewRecipe}>
             View Recipe
           </button>
        </div>
      </div>
    </div>
  );
}