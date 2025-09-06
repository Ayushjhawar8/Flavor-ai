"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityRecipeCard from "@/components/community/CommunityRecipeCard";
import { getCommunityRecipes } from "@/lib/communityStorage";
import { getCurrentUser } from "@/lib/mockAuth";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function CommunityPage() {
  const [recipes, setRecipes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  useEffect(() => {
    // Seed sample data on first visit
    import("@/lib/seedCommunityData").then(({ seedSampleRecipes }) => {
      seedSampleRecipes();
      setRecipes(getCommunityRecipes());
    });
    
    setCurrentUser(getCurrentUser());
  }, []);

  return (
    <>
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />

      <div
        className={`min-h-screen mt-20 bg-base-100 transition-all duration-300 ${
          showResults ? "opacity-80 blur-sm" : "opacity-100"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">
                Community Recipes
              </h1>
              <p className="text-base-content/70">
                Discover amazing recipes shared by our community
              </p>
            </div>

            <Link href="/upload-recipe">
              <button className="btn btn-primary md:content-hello  gap-2">
                <Plus size={20} />
                <span className="hidden md:inline">Share Recipe</span>
              </button>
            </Link>
          </div>

          {recipes.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">👨🍳</div>
              <h2 className="text-2xl font-bold mb-4">No recipes yet!</h2>
              <p className="text-base-content/70 mb-6">
                Be the first to share your amazing recipe with the community.
              </p>
              <Link href="/upload-recipe">
                <button className="btn btn-primary">
                  Share Your First Recipe
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <CommunityRecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}