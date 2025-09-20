"use client";

import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useState } from "react";

interface Idea {
  id: string;
  title: string;
  description: string;
  contributor: string;
  githubIssue: string;
  category: string;
}

const sampleIdeas: Idea[] = [
  {
    id: "1",
    title: "Budget Bowl",
    description: "Quick, affordable healthy meals for students with smart ingredient substitutions and budget tracking.",
    contributor: "@kritigupta",
    githubIssue: "https://github.com/Gupta-02/Flavor-ai/issues/1",
    category: "Student Tools"
  },
  {
    id: "2",
    title: "Recipe Remix",
    description: "AI-powered recipe variations based on dietary restrictions and available ingredients in your pantry.",
    contributor: "@johndoe",
    githubIssue: "https://github.com/Gupta-02/Flavor-ai/issues/2",
    category: "AI Features"
  },
  {
    id: "3",
    title: "Cultural Fusion",
    description: "Blend recipes from different cuisines to create unique fusion dishes with cultural storytelling.",
    contributor: "@chefanna",
    githubIssue: "https://github.com/Gupta-02/Flavor-ai/issues/3",
    category: "Cultural"
  },
  {
    id: "4",
    title: "Waste Not Kitchen",
    description: "Smart suggestions for using leftover ingredients before they expire, reducing food waste.",
    contributor: "@ecocook",
    githubIssue: "https://github.com/Gupta-02/Flavor-ai/issues/4",
    category: "Sustainability"
  },
  {
    id: "5",
    title: "Meal Prep Planner",
    description: "Weekly meal planning with automatic grocery list generation and nutritional balance tracking.",
    contributor: "@mealplanner",
    githubIssue: "https://github.com/Gupta-02/Flavor-ai/issues/5",
    category: "Planning"
  },
  {
    id: "6",
    title: "Allergy Alert System",
    description: "Real-time allergy detection and substitution suggestions while browsing or creating recipes.",
    contributor: "@healthfirst",
    githubIssue: "https://github.com/Gupta-02/Flavor-ai/issues/6",
    category: "Health & Safety"
  }
];

export default function IdeaHubPage() {
  const [filter, setFilter] = useState("All");
  const [showResults, setShowResults] = useState(false);

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  const categories = ["All", ...Array.from(new Set(sampleIdeas.map(idea => idea.category)))];

  const filteredIdeas = filter === "All"
    ? sampleIdeas
    : sampleIdeas.filter(idea => idea.category === filter);

  return (
    <>
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />
      <div className={`flex flex-col items-center mt-20 justify-center p-5 md:p-10 w-full min-h-screen bg-base-100 transition-all duration-300 ${
        showResults ? "opacity-80 blur-sm" : "opacity-100"
      }`}>
        <BackButton />

        <h1 className="text-4xl md:text-6xl text-secondary mb-5">
          Idea Hub 💡
        </h1>
        <p className="text-lg text-base-content mb-8 text-center max-w-2xl">
          Explore innovative ideas and feature suggestions from our community contributors.
          Each idea represents a potential enhancement to make Flavor AI even better!
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-10 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`btn ${filter === category ? "btn-primary" : "btn-outline"}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl">
          {filteredIdeas.map((idea) => (
            <div
              key={idea.id}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="card-body">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="card-title text-lg md:text-xl text-base-content">
                    {idea.title}
                  </h2>
                  <span className="badge badge-primary badge-sm">{idea.category}</span>
                </div>

                <p className="text-base-content mb-4 leading-relaxed">
                  {idea.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-base-content opacity-75">
                    by {idea.contributor}
                  </span>
                  <Link href={idea.githubIssue} target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-primary btn-sm">
                      View Issue 🔗
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredIdeas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-base-content opacity-75">
              No ideas found for the selected category.
            </p>
          </div>
        )}
      </div>

      <div className="bg-base-100">
        <Footer />
      </div>
    </>
  );
}