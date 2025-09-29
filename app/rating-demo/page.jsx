"use client";

import { useState, useEffect } from "react";
import RatingStars from "@/components/RatingStars";
import RatingDisplay from "@/components/RatingDisplay";
import RatingBreakdown from "@/components/RatingBreakdown";
import RecipeRatingSection from "@/components/RecipeRatingSection";
import { saveRecipeRating, clearAllRatings } from "@/lib/ratingStorage";
import { getCurrentUser } from "@/lib/mockAuth";

export default function RatingDemoPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [demoRating, setDemoRating] = useState(0);
  const [isInteractive, setIsInteractive] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleRatingChange = (rating) => {
    setDemoRating(rating);
    // Save a demo rating
    saveRecipeRating('demo_recipe', rating, currentUser?.id);
  };

  const handleClearRatings = () => {
    clearAllRatings();
    setDemoRating(0);
  };

  const addSampleRatings = () => {
    // Add some sample ratings for demo purposes
    const sampleRatings = [5, 4, 3, 5, 4, 5, 3, 4, 5, 4, 3, 5, 4, 5, 3];
    sampleRatings.forEach((rating, index) => {
      setTimeout(() => {
        saveRecipeRating('demo_recipe', rating);
      }, index * 100);
    });
  };

  const enableDemoData = () => {
    localStorage.setItem('ENABLE_DEMO_DATA', 'true');
    alert('Demo data enabled! Refresh the page to see sample ratings.');
  };

  const disableDemoData = () => {
    localStorage.setItem('ENABLE_DEMO_DATA', 'false');
    clearAllRatings();
    alert('Demo data disabled! All ratings cleared.');
  };

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            🌟 Recipe Rating System Demo
          </h1>
          <p className="text-lg text-base-content/80 mb-4">
            Explore the interactive rating components and features
          </p>
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-success font-medium">
              ✅ <strong>Dynamic System Active:</strong> No dummy data loaded. 
              All ratings shown are from real user interactions!
            </p>
          </div>
        </div>

        {/* Interactive Rating Demo */}
        <div className="bg-base-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Interactive Rating Stars
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Current Rating: {demoRating}</h3>
              <RatingStars
                rating={demoRating}
                onRatingChange={handleRatingChange}
                interactive={isInteractive}
                size="lg"
                color="warning"
                showLabel={true}
              />
              {isInteractive && (
                <p className="text-sm text-base-content/60 mt-2">
                  ✨ Click any star to rate instantly! No need to click buttons.
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isInteractive}
                  onChange={(e) => setIsInteractive(e.target.checked)}
                  className="checkbox checkbox-primary"
                />
                <span>Interactive Mode</span>
              </label>
            </div>
          </div>
        </div>

        {/* Different Sizes Demo */}
        <div className="bg-base-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Different Sizes & Colors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Small Size</h3>
              <RatingStars rating={4} interactive={false} size="sm" color="primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Medium Size</h3>
              <RatingStars rating={4} interactive={false} size="md" color="secondary" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Large Size</h3>
              <RatingStars rating={4} interactive={false} size="lg" color="accent" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Warning Color</h3>
              <RatingStars rating={4} interactive={false} size="md" color="warning" showLabel={true} />
            </div>
          </div>
        </div>

        {/* Rating Display Demo */}
        <div className="bg-base-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Rating Display Components
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">With Count</h3>
              <RatingDisplay
                recipeId="demo_recipe"
                showCount={true}
                showAverage={false}
                size="md"
                color="warning"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">With Average</h3>
              <RatingDisplay
                recipeId="demo_recipe"
                showCount={true}
                showAverage={true}
                size="md"
                color="warning"
              />
            </div>
          </div>
        </div>

        {/* Rating Breakdown Demo */}
        <div className="bg-base-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Rating Breakdown Chart
          </h2>
          <RatingBreakdown
            recipeId="demo_recipe"
            showChart={true}
            showStats={true}
          />
        </div>

        {/* Complete Rating Section Demo */}
        <div className="bg-base-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Complete Rating Section
          </h2>
          <RecipeRatingSection
            recipeId="demo_recipe"
            recipeTitle="Demo Recipe"
            showBreakdown={true}
          />
        </div>

        {/* Demo Controls */}
        <div className="bg-base-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Demo Controls
          </h2>
          <div className="space-y-4">
            <div className="bg-base-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">🎯 Dynamic Rating System</h3>
              <p className="text-base-content/80 mb-3">
                The rating system is now fully dynamic! No dummy data is loaded by default. 
                Users will see "No ratings yet" until they start rating recipes.
              </p>
            </div>
            
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">⚡ Smooth Rating Experience</h3>
              <p className="text-base-content/80 mb-2">
                <strong>One-click rating:</strong> Just click any star to rate instantly!
              </p>
              <ul className="text-sm text-base-content/70 space-y-1">
                <li>• No need to click "Rate Recipe" button first</li>
                <li>• Click any star to rate or change your rating</li>
                <li>• Instant visual feedback and smooth animations</li>
                <li>• Rating saves automatically when you click</li>
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={addSampleRatings}
                className="btn btn-primary"
              >
                Add Sample Ratings (Demo Only)
              </button>
              <button
                onClick={handleClearRatings}
                className="btn btn-error"
              >
                Clear All Ratings
              </button>
            </div>
            
            <div className="divider"></div>
            
            <div className="bg-base-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">🔧 Demo Data Controls</h3>
              <p className="text-base-content/80 mb-3">
                These controls are for testing purposes only. In production, 
                ratings come from real user interactions.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={enableDemoData}
                  className="btn btn-warning btn-sm"
                >
                  Enable Demo Data
                </button>
                <button
                  onClick={disableDemoData}
                  className="btn btn-outline btn-sm"
                >
                  Disable Demo Data
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className="bg-base-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            Accessibility Features
          </h2>
          <div className="space-y-3 text-base-content/80">
            <p>✅ <strong>Keyboard Navigation:</strong> Use Tab to navigate and Enter/Space to rate</p>
            <p>✅ <strong>ARIA Labels:</strong> Proper labels for screen readers</p>
            <p>✅ <strong>Focus Management:</strong> Clear focus indicators</p>
            <p>✅ <strong>Semantic HTML:</strong> Proper roles and attributes</p>
            <p>✅ <strong>Color Contrast:</strong> Accessible color combinations</p>
            <p>✅ <strong>Screen Reader Support:</strong> Descriptive text for all interactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
