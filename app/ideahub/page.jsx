"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IdeaCard from "@/components/IdeaCard";
import { ideas } from "@/lib/ideas";
import BackButton from "@/components/BackButton";
import { useState } from "react";

export default function IdeaHubPage() {
  const [showResults, setShowResults] = useState(false);

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  return (
    <>
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />
      <div className={`flex flex-col items-center mt-20 justify-start p-5 md:p-10 w-full min-h-screen bg-base-100 transition-all duration-300 ${
        showResults ? "opacity-80 blur-sm" : "opacity-100"
      }`}>
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-4 flex-wrap">
            <BackButton />
            <h1 className="text-4xl md:text-6xl font-extrabold text-secondary">
              Idea Hub 💡
            </h1>
          </div>
          <p className="text-base md:text-lg max-w-3xl opacity-80">
            Community-powered feature ideas and mini projects. Browse, discuss,
            and pick one to contribute. Have an idea? Open an issue on GitHub
            and add it here!
          </p>

          {ideas.length === 0 && (
            <div className="alert alert-info shadow-lg">
              <span>No ideas yet. Be the first to propose one!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-base-100">
        <Footer />
      </div>
    </>
  );
}
