"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BackButton from "../../components/BackButton";

export default function RecipeSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    difficulty: "",
    cookingTime: "",
    dietType: "",
    sortBy: "relevance"
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Mock recipe data
  const mockRecipes = [
    {
      id: 1,
      title: "Chicken Tikka Masala",
      description: "Creamy and flavorful Indian curry with tender chicken pieces",
      image: "🍛",
      category: "Indian",
      difficulty: "medium",
      cookingTime: "45 minutes",
      servings: 4,
      rating: 4.8,
      calories: 420,
      dietType: "non-vegetarian",
      ingredients: ["chicken breast", "yogurt", "tomatoes", "cream", "spices"],
      prepTime: "20 minutes",
      tags: ["spicy", "creamy", "popular"]
    },
    {
      id: 2,
      title: "Avocado Toast Supreme",
      description: "Healthy and delicious breakfast with fresh avocado and toppings",
      image: "🥑",
      category: "Breakfast",
      difficulty: "easy",
      cookingTime: "10 minutes",
      servings: 2,
      rating: 4.5,
      calories: 320,
      dietType: "vegetarian",
      ingredients: ["avocado", "bread", "tomatoes", "lemon", "salt"],
      prepTime: "10 minutes",
      tags: ["healthy", "quick", "fresh"]
    },
    {
      id: 3,
      title: "Chocolate Lava Cake",
      description: "Decadent dessert with molten chocolate center",
      image: "🍰",
      category: "Dessert",
      difficulty: "hard",
      cookingTime: "30 minutes",
      servings: 4,
      rating: 4.9,
      calories: 480,
      dietType: "vegetarian",
      ingredients: ["chocolate", "butter", "eggs", "sugar", "flour"],
      prepTime: "15 minutes",
      tags: ["sweet", "rich", "indulgent"]
    },
    {
      id: 4,
      title: "Mediterranean Quinoa Bowl",
      description: "Nutritious bowl packed with fresh vegetables and quinoa",
      image: "🥗",
      category: "Healthy",
      difficulty: "easy",
      cookingTime: "25 minutes",
      servings: 3,
      rating: 4.6,
      calories: 350,
      dietType: "vegan",
      ingredients: ["quinoa", "cucumber", "tomatoes", "olives", "feta"],
      prepTime: "15 minutes",
      tags: ["healthy", "fresh", "colorful"]
    },
    {
      id: 5,
      title: "Beef Stir Fry",
      description: "Quick and easy Asian-style stir fry with tender beef",
      image: "🥩",
      category: "Asian",
      difficulty: "medium",
      cookingTime: "20 minutes",
      servings: 4,
      rating: 4.4,
      calories: 380,
      dietType: "non-vegetarian",
      ingredients: ["beef", "vegetables", "soy sauce", "garlic", "ginger"],
      prepTime: "10 minutes",
      tags: ["quick", "savory", "protein-rich"]
    },
    {
      id: 6,
      title: "Margherita Pizza",
      description: "Classic Italian pizza with fresh basil and mozzarella",
      image: "🍕",
      category: "Italian",
      difficulty: "medium",
      cookingTime: "35 minutes",
      servings: 4,
      rating: 4.7,
      calories: 280,
      dietType: "vegetarian",
      ingredients: ["pizza dough", "tomato sauce", "mozzarella", "basil"],
      prepTime: "20 minutes",
      tags: ["classic", "cheesy", "comfort"]
    }
  ];

  const handleSearch = async (query = searchQuery) => {
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter recipes based on search query and filters
    let results = mockRecipes.filter(recipe => {
      const matchesQuery = query === "" || 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(query.toLowerCase())
        ) ||
        recipe.tags.some(tag => 
          tag.toLowerCase().includes(query.toLowerCase())
        );

      const matchesCategory = filters.category === "" || recipe.category === filters.category;
      const matchesDifficulty = filters.difficulty === "" || recipe.difficulty === filters.difficulty;
      const matchesDietType = filters.dietType === "" || recipe.dietType === filters.dietType;
      
      let matchesTime = true;
      if (filters.cookingTime) {
        const recipeTime = parseInt(recipe.cookingTime);
        switch (filters.cookingTime) {
          case "quick":
            matchesTime = recipeTime <= 15;
            break;
          case "medium":
            matchesTime = recipeTime > 15 && recipeTime <= 45;
            break;
          case "long":
            matchesTime = recipeTime > 45;
            break;
        }
      }

      return matchesQuery && matchesCategory && matchesDifficulty && matchesDietType && matchesTime;
    });

    // Sort results
    switch (filters.sortBy) {
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "time":
        results.sort((a, b) => parseInt(a.cookingTime) - parseInt(b.cookingTime));
        break;
      case "calories":
        results.sort((a, b) => a.calories - b.calories);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setSearchResults(results);
    setIsSearching(false);
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    if (hasSearched) {
      handleSearch(searchQuery);
    }
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      difficulty: "",
      cookingTime: "",
      dietType: "",
      sortBy: "relevance"
    });
    if (hasSearched) {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <BackButton />
          <div className="text-center mt-6">
            <h1 className="text-4xl font-bold text-orange-800 mb-4">
              🔍 Recipe Search
            </h1>
            <p className="text-lg text-orange-700 max-w-3xl mx-auto">
              Discover delicious recipes from around the world. Search by ingredients, cuisine, or dietary preferences!
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for recipes, ingredients, or cuisines..."
                  className="w-full p-4 pl-12 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 text-xl">
                  🔍
                </div>
              </div>
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={isSearching}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-4 px-8 rounded-lg hover:from-orange-700 hover:to-red-700 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Searching...
                </>
              ) : (
                "Search Recipes"
              )}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h3 className="text-lg font-bold text-orange-800">Filters:</h3>
            <button
              onClick={clearFilters}
              className="text-orange-600 hover:text-orange-800 text-sm underline"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-orange-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none"
              >
                <option value="">All Categories</option>
                <option value="Indian">Indian</option>
                <option value="Italian">Italian</option>
                <option value="Asian">Asian</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Dessert">Dessert</option>
                <option value="Healthy">Healthy</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-semibold text-orange-700 mb-2">
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none"
              >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Cooking Time Filter */}
            <div>
              <label className="block text-sm font-semibold text-orange-700 mb-2">
                Cooking Time
              </label>
              <select
                value={filters.cookingTime}
                onChange={(e) => handleFilterChange('cookingTime', e.target.value)}
                className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none"
              >
                <option value="">Any Time</option>
                <option value="quick">Quick (≤15 min)</option>
                <option value="medium">Medium (15-45 min)</option>
                <option value="long">Long (45+ min)</option>
              </select>
            </div>

            {/* Diet Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-orange-700 mb-2">
                Diet Type
              </label>
              <select
                value={filters.dietType}
                onChange={(e) => handleFilterChange('dietType', e.target.value)}
                className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none"
              >
                <option value="">All Diets</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-orange-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Highest Rating</option>
                <option value="time">Cooking Time</option>
                <option value="calories">Calories</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="mb-8">
          {!hasSearched ? (
            /* Initial State */
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="text-8xl mb-6">🍳</div>
              <h3 className="text-2xl font-bold text-orange-800 mb-4">Ready to Find Your Perfect Recipe?</h3>
              <p className="text-orange-600 text-lg mb-8">
                Use the search bar above to discover amazing recipes tailored to your taste!
              </p>
              
              {/* Popular Categories */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
                {[
                  { name: "Italian", emoji: "🍝", query: "italian" },
                  { name: "Desserts", emoji: "🍰", query: "dessert" },
                  { name: "Healthy", emoji: "🥗", query: "healthy" },
                  { name: "Quick Meals", emoji: "⚡", query: "quick" },
                  { name: "Breakfast", emoji: "🍳", query: "breakfast" },
                  { name: "Asian", emoji: "🍜", query: "asian" }
                ].map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setSearchQuery(category.query);
                      handleSearch(category.query);
                    }}
                    className="bg-orange-50 hover:bg-orange-100 border-2 border-orange-200 hover:border-orange-300 rounded-lg p-4 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-3xl mb-2">{category.emoji}</div>
                    <div className="font-semibold text-orange-700">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            /* No Results */
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-orange-800 mb-4">No Recipes Found</h3>
              <p className="text-orange-600 text-lg mb-6">
                Try adjusting your search terms or filters to find more recipes.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  clearFilters();
                  setHasSearched(false);
                }}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Start New Search
              </button>
            </div>
          ) : (
            /* Results Grid */
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-orange-800">
                  Found {searchResults.length} recipe{searchResults.length !== 1 ? 's' : ''}
                  {searchQuery && ` for "${searchQuery}"`}
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-4xl">{recipe.image}</div>
                        <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full">
                          <span className="text-orange-500">⭐</span>
                          <span className="text-sm font-semibold text-orange-700">{recipe.rating}</span>
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-bold text-orange-800 mb-2">{recipe.title}</h4>
                      <p className="text-orange-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {recipe.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-semibold"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-xs text-orange-600">
                        <div className="text-center">
                          <div className="font-semibold">⏱️ {recipe.cookingTime}</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">👥 {recipe.servings} servings</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">🔥 {recipe.calories} cal</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-orange-100">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-orange-500 uppercase">
                            {recipe.category}
                          </span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            recipe.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                            recipe.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {recipe.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recipe Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-orange-800">{selectedRecipe.title}</h3>
                    <p className="text-orange-600 mt-2">{selectedRecipe.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedRecipe(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="text-6xl text-center mb-6">{selectedRecipe.image}</div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-orange-700 font-semibold">⏱️ Total Time</div>
                    <div className="text-orange-800">{selectedRecipe.cookingTime}</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-orange-700 font-semibold">👥 Servings</div>
                    <div className="text-orange-800">{selectedRecipe.servings}</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-orange-800 mb-3">🥄 Ingredients:</h4>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 text-orange-700">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 bg-orange-100 text-orange-700 py-3 px-4 rounded-lg hover:bg-orange-200 transition-colors">
                    📋 Save Recipe
                  </button>
                  <button className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                    👨‍🍳 Cook This Recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}