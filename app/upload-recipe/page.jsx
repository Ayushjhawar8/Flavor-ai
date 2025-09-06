"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import RecipeUploadForm from "@/components/community/RecipeUploadForm";

export default function UploadRecipePage() {
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  const handleRecipeUploaded = (recipe) => {
    // Show success message and redirect
    alert(`Recipe "${recipe.title}" uploaded successfully!`);
    router.push("/community");
  };

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
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">
              Share Your Recipe
            </h1>
            <p className="text-base-content/70">
              Share your culinary creation with the Flavor AI community
            </p>
          </div>

          <RecipeUploadForm onRecipeUploaded={handleRecipeUploaded} />
        </div>
      </div>
      
      <Footer />
    </>
  );
}