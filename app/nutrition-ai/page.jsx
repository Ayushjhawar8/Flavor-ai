"use client";

import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

function NutritionAIPage() {
  const [nutrition, setNutrition] = useState(null);
  const [nutritionInput, setNutritionInput] = useState("");
  const [loadingNutrition, setLoadingNutrition] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);
  const [currentTheme, setCurrentTheme] = useState("light");
  
    useEffect(() => {
      const observer = new MutationObserver(() => {
        setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      setCurrentTheme(document.documentElement.getAttribute("data-theme") || "light");
      return () => observer.disconnect();
    }, []);


    // dynamic tab title
        
          useEffect(()=>{
            document.title='Flavor AI-Nutrition-AI'
          },[])
    

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

  const handleReset = () => {
    setNutrition(null);
    setNutritionInput("");
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />
      <div className={`min-h-screen py-10 bg-base-100 flex flex-col pt-44 justify-center items-center relative transition-all duration-300 ${showResults ? "opacity-80 blur-sm" : "opacity-100"
        }`}>
        <div style={{
        position: 'absolute',
        top: '85px',
        left: '3px',
      }} className="absolute"><BackButton/></div>

        {/* Main Nutrition AI Section */}

        <h1 className={`text-3xl font-bold mb-[50px] text-transparent bg-clip-text ${  currentTheme === "dark"
            ? "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            : "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600"
        }`}
        >AI-Powered Nutrition Analyzer</h1>

        <div className="w-full max-w-2xl p-6 rounded-xl shadow-lg bg-base-200 border border-base-300">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2 text-brown-700">🧬 Nutrition AI</h1>
            <p className={`text-base-content/70`}>Analyze the nutritional content of your recipes and ingredients</p>
          </div>

          <textarea
            className="w-full p-3 border border-base-300 rounded-lg mb-4 focus:outline-none bg-primary/5 focus:border-primary resize-none text-base-content "
            placeholder="Paste your recipe ingredients here..."
            value={nutritionInput}
            onChange={(e) => setNutritionInput(e.target.value)}
            rows={6}
          />

          <div className="flex space-x-3 mb-4">
            {/* Get Nutrition Info Button */}
            <button
              onClick={fetchNutrition}
             disabled={loadingNutrition || !nutritionInput.trim()}
              className={`btn btn-primary hover:bg-brown-700 text-white 
              ${currentTheme === "dark" ? "disabled:text-slate-500" : "disabled:text-black disabled:opacity-60"} flex-1`}
            >
              {loadingNutrition ? "Analyzing..." : "Get Nutrition Info"}
            </button>

            {/* Clear Button */}
            <button
              className={`btn btn-primary text-white
               ${currentTheme === "dark" ? "disabled:text-slate-500" : "disabled:text-black disabled:opacity-60"} `}
              onClick={handleReset}
              disabled={!nutritionInput && !nutrition}
            >
              Clear
            </button>
          </div>

          {nutrition && !nutrition.error && (
            <div className="mt-6 p-4 rounded-lg bg-base-100 border border-base-300 shadow">
              <h3 className="text-lg font-bold mb-4 text-brown-700">
                Nutrition Facts (per serving)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-base-300 rounded-lg">
                  <tbody>
                    {Object.entries(nutrition).map(([key, value]) => (
                      <tr key={key} className="border-t border-base-300 hover:bg-base-50">
                        <td className="p-3 font-semibold capitalize text-brown-600">{key}</td>
                        <td className="p-3">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {nutrition?.error && (
            <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-red-600">{nutrition.error}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-blue-200">
            <h4 className="font-semibold text-white mb-2">How to use:</h4>
            <ul className="text-sm text-brown-700 space-y-1">
              <li>• Paste your recipe ingredients in the text area above</li>
              <li>• Include quantities and measurements for accurate results</li>
              <li>• Click "Get Nutrition Info" to analyze the nutritional content</li>
              <li>• Results show nutrition facts per serving</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NutritionAIPage;

