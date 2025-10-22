"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FestivalDishCard from "@/components/festivals/FestivalDishCard";
import { festivalDishes, festivalInfo, festivals } from "@/lib/festivalData";
import BackButton from "@/components/BackButton";

const difficulties = ["All", "Easy", "Medium", "Hard"];

export default function FestivePage() {
  const [showResults, setShowResults] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  // dynamic tab title

  useEffect(() => {
    document.title = "Flavor AI-Festive Dishes";
  }, []);

  // Updated filter for filtering based on festivals + difficulty
  const filteredDishes = festivalDishes.filter((dish) => {
    const matchesFestival =
      selectedFestival === "All" || dish.festival === selectedFestival;
    const matchesDifficulty =
      selectedDifficulty === "All" || dish.difficulty === selectedDifficulty;
    return matchesFestival && matchesDifficulty;
  });

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />
      <div
        style={{
          position: "absolute",
          top: "85px",
          left: "3px",
        }}
        className="absolute"
      >
        <BackButton />
      </div>

      <div
        className={`min-h-screen bg-base-100 transition-all duration-300 ${
          showResults ? "opacity-80 blur-sm" : "opacity-100"
        }`}
      >
        <div className="container mx-auto px-4 py-8 mt-36">
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
          <div className="flex flex-col md:flex-col justify-center gap-4 mb-8">
            {/* Festival Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
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

            {/* Difficulty Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
              {difficulties.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`btn btn-sm whitespace-nowrap ${
                    selectedDifficulty === level
                      ? "btn-secondary"
                      : "btn-outline"
                  }`}
                >
                  {level}
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
                Try selecting different set of options.
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
    </div>
  );
}
