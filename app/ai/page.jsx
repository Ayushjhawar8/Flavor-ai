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
      <div className={`min-h-screen py-10 bg-base-100 flex flex-col mt-20 justify-center items-center relative transition-all duration-300 ${
        showResults ? "opacity-80 blur-sm" : "opacity-100"
      }`}>
        <BackButton />
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
          <div className="flex space-x-4 mt-5">
            {/* Only show Clear button when not showing recipe */}
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleReset}
            >
              Clear
            </button>

            {/* Only show View Recipe button when recipe exists */}
            {recipe && (
              <button
                className="btn btn-accent btn-sm"
                onClick={() => setShowRecipe(true)}
              >
                View Recipe
              </button>
            )}
          </div>
        )}

        {/* --- Nutrition AI Section --- */}
{/* --- Nutrition AI Section --- */}
<div className="w-full max-w-2xl mt-10 p-6 rounded-xl shadow-lg bg-base-200 border border-base-300">
  <h2 className="text-2xl font-bold mb-4 text-brown-700">🍎 Nutrition AI</h2>

  {!showNutrition ? (
    // ✅ Open Nutrition AI Button
    <button
      className="btn btn-primary hover:bg-brown-700 text-white"
      onClick={() => setShowNutrition(true)}
    >
      Open Nutrition AI
    </button>
  ) : (
    <>
      <textarea
        className="w-full p-3 border border-base-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-brown-400"
        placeholder="Paste your recipe ingredients here..."
        value={nutritionInput}
        onChange={(e) => setNutritionInput(e.target.value)}
        rows={4}
      />

      <div className="flex space-x-3">
        {/* ✅ Get Nutrition Info Button */}
        <button
          onClick={fetchNutrition}
          disabled={loadingNutrition}
          className="btn btn-primary hover:bg-brown-700 text-white disabled:opacity-50"
        >
          {loadingNutrition ? "Analyzing..." : "Get Nutrition Info"}
        </button>

        {/* ✅ Close Button */}
        <button
          className="btn btn-primary hover:bg-brown-700 text-white"
          onClick={() => {
            setShowNutrition(false);
            setNutrition(null);
            setNutritionInput("");
          }}
        >
          Close
        </button>
      </div>

      {nutrition && !nutrition.error && (
        <div className="mt-6 p-4 rounded-lg bg-base-100 border border-base-300 shadow">
          <h3 className="text-lg font-bold mb-2 text-brown-700">
            Nutrition Facts (per serving)
          </h3>
          <table className="w-full border border-base-300 rounded-lg">
            <tbody>
              {Object.entries(nutrition).map(([key, value]) => (
                <tr key={key} className="border-t border-base-300">
                  <td className="p-2 font-semibold capitalize">{key}</td>
                  <td className="p-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {nutrition?.error && (
        <p className="text-red-500 mt-4">{nutrition.error}</p>
      )}
    </>
  )}
</div>

</div>
      <Footer />

      
    </>
  );
}

export default Page;
