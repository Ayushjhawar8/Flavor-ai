'use client'

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FestivalDishCard from "@/components/festivals/FestivalDishCard";
import { festivalDishes, festivalInfo, festivals } from "@/lib/festivalData";

export default function FestivePage() {
  const [showResults, setShowResults] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState("All");
  
  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  const filteredDishes = selectedFestival === "All" 
    ? festivalDishes 
    : festivalDishes.filter(dish => dish.festival === selectedFestival);

  return (
    <>
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />
      
      <div className={`min-h-screen mt-20 bg-base-100 transition-all duration-300 ${
        showResults ? "opacity-80 blur-sm" : "opacity-100"
      }`}>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">
              Festival Recipes
            </h1>
            <p className="text-base-content/70">
              Celebrate traditions with authentic festival dishes
            </p>
          </div>

          {/* Festival Filter Bar */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {festivals.map((festival) => (
                <button
                  key={festival}
                  onClick={() => setSelectedFestival(festival)}
                  className={`btn btn-sm whitespace-nowrap ${
                    selectedFestival === festival 
                      ? "btn-primary" 
                      : "btn-outline"
                  }`}
                >
                  {festival}
                </button>
              ))}
            </div>
          </div>

          {/* Festival Description */}
          <div className="text-center mb-8">
            <p className="text-base-content/80 max-w-2xl mx-auto">
              {festivalInfo[selectedFestival]?.description}
            </p>
          </div>

          {/* Dishes Grid */}
          {filteredDishes.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍽️</div>
              <h2 className="text-2xl font-bold mb-4">No dishes found!</h2>
              <p className="text-base-content/70">
                Try selecting a different festival.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish) => (
                <FestivalDishCard key={dish.id} dish={dish} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

