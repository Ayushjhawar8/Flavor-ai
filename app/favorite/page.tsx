"use client";

import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import { HeartIcon, TrashIcon, EyeIcon, ClockIcon, UsersIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface FavoriteRecipe {
  id: string;
  name: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  cuisine: string;
  description: string;
  tags: string[];
  dateAdded: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Mock sample favorites for demonstration
  const sampleFavorites: FavoriteRecipe[] = [
    {
      id: "1",
      name: "Spaghetti Carbonara",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&h=600&fit=crop&q=80",
      prepTime: "15 mins",
      cookTime: "20 mins",
      servings: 4,
      difficulty: "Medium",
      cuisine: "Italian",
      description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
      tags: ["Quick", "Italian", "Comfort Food", "Pasta"],
      dateAdded: "2024-10-01"
    },
    {
      id: "2", 
      name: "Chocolate Chip Cookies",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop&q=80",
      prepTime: "15 mins",
      cookTime: "12 mins",
      servings: 24,
      difficulty: "Easy",
      cuisine: "American",
      description: "Classic, chewy chocolate chip cookies that are crispy on the edges and soft in the center.",
      tags: ["Sweet", "Dessert", "Baking", "Kid-Friendly"],
      dateAdded: "2024-09-28"
    },
    {
      id: "3",
      name: "Chicken Tikka Masala", 
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop&q=80",
      prepTime: "30 mins",
      cookTime: "40 mins",
      servings: 6,
      difficulty: "Medium",
      cuisine: "Indian",
      description: "Tender chicken in a rich, creamy tomato-based curry sauce.",
      tags: ["Spicy", "Indian", "Comfort Food", "Curry"],
      dateAdded: "2024-09-25"
    }
  ];

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("flavorai_favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    } else {
      // Set sample favorites if none exist
      setFavorites(sampleFavorites);
      localStorage.setItem("flavorai_favorites", JSON.stringify(sampleFavorites));
    }
  }, []);

  const removeFavorite = (recipeId: string) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== recipeId);
    setFavorites(updatedFavorites);
    localStorage.setItem("flavorai_favorites", JSON.stringify(updatedFavorites));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFavorites = favorites.filter((recipe) => {
    if (filter === "All") return true;
    if (filter === "Easy") return recipe.difficulty === "Easy";
    if (filter === "Desserts") return recipe.tags.includes("Dessert");
    if (filter === "Quick") return recipe.tags.includes("Quick");
    return true;
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    if (sortBy === "oldest") return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <BackButton />
      
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-4 flex items-center justify-center gap-3">
            ❤️ My Favorite Recipes
          </h1>
          <p className="text-lg text-amber-600 max-w-2xl mx-auto">
            Your personal collection of loved recipes. Save, organize, and revisit your culinary favorites!
          </p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("All")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "All" 
                  ? "bg-amber-600 text-white" 
                  : "bg-white text-amber-600 border border-amber-300 hover:bg-amber-50"
              }`}
            >
              All ({favorites.length})
            </button>
            <button
              onClick={() => setFilter("Easy")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "Easy" 
                  ? "bg-amber-600 text-white" 
                  : "bg-white text-amber-600 border border-amber-300 hover:bg-amber-50"
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => setFilter("Quick")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "Quick" 
                  ? "bg-amber-600 text-white" 
                  : "bg-white text-amber-600 border border-amber-300 hover:bg-amber-50"
              }`}
            >
              Quick
            </button>
            <button
              onClick={() => setFilter("Desserts")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "Desserts" 
                  ? "bg-amber-600 text-white" 
                  : "bg-white text-amber-600 border border-amber-300 hover:bg-amber-50"
              }`}
            >
              Desserts
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-amber-300 rounded-lg text-amber-700 focus:outline-none focus:border-amber-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>

        {/* Favorites Grid */}
        {sortedFavorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">💔</div>
            <h3 className="text-2xl font-bold text-amber-800 mb-4">No Favorites Yet!</h3>
            <p className="text-amber-600 mb-6 max-w-md mx-auto">
              Start exploring recipes and click the heart icon to add them to your favorites collection.
            </p>
            <button className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold">
              Discover Recipes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedFavorites.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => removeFavorite(recipe.id)}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      title="Remove from favorites"
                    >
                      <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center gap-2 text-white text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
                        {recipe.difficulty}
                      </span>
                      <span className="bg-amber-500 px-2 py-1 rounded-full text-xs font-semibold">
                        {recipe.cuisine}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-amber-800 mb-2 line-clamp-2">{recipe.name}</h3>
                  <p className="text-amber-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-amber-600">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {recipe.prepTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <UsersIcon className="w-4 h-4" />
                      {recipe.servings}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {recipe.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                        #{tag}
                      </span>
                    ))}
                    {recipe.tags.length > 3 && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                        +{recipe.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold text-sm flex items-center justify-center gap-1">
                      <EyeIcon className="w-4 h-4" />
                      View Recipe
                    </button>
                    <button className="px-3 py-2 border border-amber-300 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors">
                      <HeartIconSolid className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-amber-500 mt-2">
                    Added {new Date(recipe.dateAdded).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-amber-800 mb-4">💡 Favorites Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
            <div className="space-y-2">
              <p>• Click the heart icon on any recipe to save it here</p>
              <p>• Use filters to quickly find specific types of recipes</p>
              <p>• Sort by date to see your newest discoveries first</p>
            </div>
            <div className="space-y-2">
              <p>• Export your favorites list for meal planning</p>
              <p>• Share favorite recipes with friends and family</p>
              <p>• Your favorites are saved locally in your browser</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}