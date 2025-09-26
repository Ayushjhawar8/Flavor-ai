"use client";

import AiRecipe from "@/components/AiRecipe";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import GenerateRecipeForm from "@/components/GenerateRecipeForm";
import Navbar from "@/components/Navbar";
import { useRef, useState } from "react";

function Page() {
  const [recipe, setRecipe] = useState(null);
  const [recipeImageUrl, setRecipeImageUrl] = useState(null);
  const [showRecipe, setShowRecipe] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [nutrition, setNutrition] = useState(null);
const [nutritionInput, setNutritionInput] = useState("");
const [loadingNutrition, setLoadingNutrition] = useState(false);
const [showNutrition, setShowNutrition] = useState(false);


  const formResetRef = useRef();

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  const handleReset = () => {
    setRecipe(null);
    setShowRecipe(false);
    setRecipeImageUrl(null);

    if (formResetRef.current) {
      formResetRef.current();
    }
  };
  
  const fetchNutrition = async () => {
  if (!nutritionInput.trim()) return;
  setLoadingNutrition(true);
  setNutrition(null);

  try {
    const res = await fetch("/api/analyze-nutrients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipe: nutritionInput }),
    });

    const data = await res.json();
    setNutrition(data.nutrition);
  } catch (err) {
    console.error("Nutrition API error:", err);
    setNutrition({ error: "⚠️ Failed to fetch nutrition info." });
  } finally {
    setLoadingNutrition(false);
  }
};

  return (
    <>
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />
      
      {/* AI Kitchen Background */}
      <div className={`min-h-screen py-10 flex flex-col mt-20 justify-center items-center relative overflow-hidden transition-all duration-300 ${
        showResults ? "opacity-80 blur-sm" : "opacity-100"
      }`}>
        
        {/* Floating Kitchen Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 text-7xl floating-food">🍳</div>
          <div className="absolute top-40 right-20 text-6xl animate-pulse">🥄</div>
          <div className="absolute top-60 left-1/4 text-5xl floating-food delay-1000">🔪</div>
          <div className="absolute bottom-40 right-10 text-7xl animate-bounce">🍽️</div>
          <div className="absolute bottom-60 left-20 text-6xl floating-food delay-500">🧄</div>
          <div className="absolute top-80 right-1/3 text-5xl animate-pulse delay-700">🌿</div>
          <div className="absolute bottom-80 left-1/3 text-6xl floating-food">⚡</div>
        </div>

        {/* AI Kitchen Header */}
        {!showRecipe && (
          <div className="glass-card p-8 mb-8 max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 flex items-center justify-center space-x-4">
              <span className="text-5xl animate-pulse">🤖</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Kitchen</span>
              <span className="text-5xl animate-pulse">👨‍🍳</span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Welcome to the future of cooking! Our AI chef is ready to create magical recipes just for you.
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <span className="text-2xl animate-bounce">✨</span>
              <span className="text-2xl animate-pulse">🔮</span>
              <span className="text-2xl animate-bounce delay-200">⚡</span>
              <span className="text-2xl animate-pulse delay-300">🎯</span>
              <span className="text-2xl animate-bounce delay-500">🚀</span>
            </div>
          </div>
        )}

        <div className="no-print">
          <BackButton />
        </div>

        {showRecipe && recipe ? (
          <AiRecipe
            recipe={recipe}
            recipeImageUrl={recipeImageUrl}
            setShowRecipe={setShowRecipe}
          />
        ) : (
          <GenerateRecipeForm
            setRecipe={setRecipe}
            setShowRecipe={setShowRecipe}
            setRecipeImageUrl={setRecipeImageUrl}
            onResetRef={formResetRef}
          />
        )}

        {!showRecipe && (
          <div className="flex space-x-4 mt-8 relative z-10">
            {/* Enhanced Action Buttons */}
            <button
              className="glass-card px-6 py-3 text-white font-semibold rounded-full hover:bg-red-500/30 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              onClick={handleReset}
            >
              <span className="text-xl">🗑️</span>
              <span>Clear Kitchen</span>
            </button>

            {/* Show Recipe Button */}
            {recipe && (
              <button
                className="glass-card px-6 py-3 text-white font-semibold rounded-full hover:bg-green-500/30 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                onClick={() => setShowRecipe(true)}
              >
                <span className="text-xl">👀</span>
                <span>View Masterpiece</span>
                <span className="text-xl">🍽️</span>
              </button>
            )}
          </div>
        )}

        {/* Nutrition AI Lab Section */}
        <div className="w-full max-w-2xl mt-12 relative z-10">
          <div className="glass-card p-8">
            <h2 className="text-3xl font-bold mb-6 text-white text-center flex items-center justify-center space-x-3">
              <span className="text-4xl animate-pulse">🍎</span>
              <span>Nutrition AI Lab</span>
              <span className="text-4xl animate-pulse">⚗️</span>
            </h2>

            {!showNutrition ? (
              <button
                className="food-button w-full text-lg flex items-center justify-center space-x-3"
                onClick={() => setShowNutrition(true)}
              >
                <span className="text-2xl">🧪</span>
                <span>Open Nutrition Lab</span>
                <span className="text-2xl">📊</span>
              </button>
            ) : (
              <>
                <textarea
                  className="w-full p-4 glass-card text-white placeholder-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                  placeholder="Paste your recipe ingredients here... 🥗"
                  value={nutritionInput}
                  onChange={(e) => setNutritionInput(e.target.value)}
                  rows={4}
                />

                <div className="flex space-x-4">
                  <button
                    onClick={fetchNutrition}
                    disabled={loadingNutrition}
                    className="food-button flex-1 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <span className="text-xl">⚗️</span>
                    <span>{loadingNutrition ? "Analyzing..." : "Analyze Nutrition"}</span>
                    {loadingNutrition && <span className="text-xl animate-spin">🔬</span>}
                  </button>

                  <button
                    className="glass-card px-4 py-2 text-white hover:bg-red-500/30 transition-all duration-300 rounded-full flex items-center space-x-2"
                    onClick={() => {
                      setShowNutrition(false);
                      setNutrition(null);
                      setNutritionInput("");
                    }}
                  >
                    <span className="text-xl">❌</span>
                    <span>Close Lab</span>
                  </button>
                </div>

                {nutrition && !nutrition.error && (
                  <div className="mt-6 glass-card p-6">
                    <h3 className="text-xl font-bold mb-4 text-white flex items-center justify-center space-x-2">
                      <span className="text-2xl">📊</span>
                      <span>Nutrition Analysis</span>
                      <span className="text-2xl">🏆</span>
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(nutrition).map(([key, value]) => (
                        <div key={key} className="ingredient-tag text-center">
                          <div className="font-semibold capitalize text-sm">{key}</div>
                          <div className="text-lg font-bold text-orange-400">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {nutrition?.error && (
                  <div className="mt-4 glass-card p-4 border-2 border-red-400">
                    <p className="text-red-300 text-center flex items-center justify-center space-x-2">
                      <span className="text-2xl">⚠️</span>
                      <span>{nutrition.error}</span>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />

      
    </>
  );
}

export default Page;
