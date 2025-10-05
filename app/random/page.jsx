"use client";
import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import { ArrowPathIcon, ClockIcon, UsersIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export default function RandomRecipePage() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Mock recipe data for demonstration
  const mockRecipes = [
    {
      id: 1,
      name: "Spaghetti Carbonara",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&h=600&fit=crop&q=80",
      prepTime: "15 mins",
      cookTime: "20 mins", 
      servings: 4,
      difficulty: "Medium",
      cuisine: "Italian",
      description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper. Simple yet incredibly delicious!",
      ingredients: [
        "400g spaghetti",
        "200g pancetta or guanciale, diced",
        "4 large eggs",
        "100g Pecorino Romano cheese, grated",
        "50g Parmesan cheese, grated",
        "Black pepper, freshly ground",
        "Salt for pasta water"
      ],
      instructions: [
        "Bring a large pot of salted water to boil and cook spaghetti according to package instructions.",
        "While pasta cooks, heat a large skillet over medium heat and cook pancetta until crispy.",
        "In a bowl, whisk together eggs, both cheeses, and plenty of black pepper.",
        "When pasta is ready, reserve 1 cup pasta water and drain the rest.",
        "Add hot pasta to the skillet with pancetta and remove from heat.",
        "Quickly mix in the egg mixture, adding pasta water gradually to create a creamy sauce.",
        "Serve immediately with extra cheese and black pepper."
      ],
      tags: ["Quick", "Italian", "Comfort Food", "Pasta"]
    },
    {
      id: 2,
      name: "Chicken Tikka Masala",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop&q=80",
      prepTime: "30 mins",
      cookTime: "40 mins",
      servings: 6,
      difficulty: "Medium",
      cuisine: "Indian",
      description: "Tender chicken in a rich, creamy tomato-based curry sauce. Perfect with basmati rice or naan bread!",
      ingredients: [
        "1 kg chicken breast, cubed",
        "200ml plain yogurt",
        "2 tbsp tikka masala spice blend",
        "400g canned tomatoes",
        "200ml heavy cream",
        "1 large onion, diced",
        "4 garlic cloves, minced",
        "2 tbsp ginger, grated",
        "2 tbsp ghee or oil",
        "Fresh cilantro for garnish"
      ],
      instructions: [
        "Marinate chicken pieces in yogurt and half the spice blend for at least 30 minutes.",
        "Heat oil in a large pan and cook marinated chicken until golden. Remove and set aside.",
        "In the same pan, cook onions until softened, then add garlic and ginger.",
        "Add remaining spices and cook for 1 minute until fragrant.",
        "Add canned tomatoes and simmer for 10 minutes until sauce thickens.",
        "Return chicken to the pan and add cream. Simmer for 15 minutes.",
        "Garnish with fresh cilantro and serve with rice or naan."
      ],
      tags: ["Spicy", "Indian", "Comfort Food", "Curry"]
    },
    {
      id: 3,
      name: "Chocolate Chip Cookies",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop&q=80",
      prepTime: "15 mins",
      cookTime: "12 mins",
      servings: 24,
      difficulty: "Easy",
      cuisine: "American",
      description: "Classic, chewy chocolate chip cookies that are crispy on the edges and soft in the center. Perfect for any occasion!",
      ingredients: [
        "225g butter, softened",
        "150g brown sugar",
        "100g granulated sugar", 
        "2 large eggs",
        "2 tsp vanilla extract",
        "280g all-purpose flour",
        "1 tsp baking soda",
        "1 tsp salt",
        "300g chocolate chips"
      ],
      instructions: [
        "Preheat oven to 375°F (190°C) and line baking sheets with parchment paper.",
        "Cream together butter and both sugars until light and fluffy.",
        "Beat in eggs one at a time, then add vanilla extract.",
        "In a separate bowl, whisk together flour, baking soda, and salt.",
        "Gradually mix dry ingredients into wet ingredients until just combined.",
        "Fold in chocolate chips until evenly distributed.",
        "Drop rounded tablespoons of dough onto prepared baking sheets.",
        "Bake for 9-11 minutes until edges are golden but centers still look soft.",
        "Cool on baking sheet for 5 minutes before transferring to wire rack."
      ],
      tags: ["Sweet", "Dessert", "Baking", "Kid-Friendly"]
    }
  ];

  const getRandomRecipe = () => {
    setLoading(true);
    setError("");
    
    // Simulate API call delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockRecipes.length);
      setRecipe(mockRecipes[randomIndex]);
      setLoading(false);
    }, 1000);
  };

  const toggleFavorite = (recipeId) => {
    setFavorites(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    getRandomRecipe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <BackButton />
      
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-4 flex items-center justify-center gap-3">
            🎲 Random Recipe Generator
          </h1>
          <p className="text-lg text-amber-600 max-w-2xl mx-auto mb-6">
            Feeling adventurous? Discover new flavors with our random recipe generator! 
            Perfect for when you can't decide what to cook.
          </p>
          
          <button
            onClick={getRandomRecipe}
            disabled={loading}
            className="px-8 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto font-semibold"
          >
            <ArrowPathIcon className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Finding Recipe...' : 'Get Random Recipe'}
          </button>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {recipe && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Recipe Header */}
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleFavorite(recipe.id)}
                    className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    {favorites.includes(recipe.id) ? (
                      <HeartIconSolid className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{recipe.name}</h2>
                  <p className="text-amber-100">{recipe.description}</p>
                </div>
              </div>

              {/* Recipe Info */}
              <div className="p-8">
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  <div className="flex items-center gap-2 p-4 bg-amber-50 rounded-lg">
                    <ClockIcon className="w-5 h-5 text-amber-600" />
                    <div>
                      <div className="text-sm text-amber-600">Prep Time</div>
                      <div className="font-semibold text-amber-800">{recipe.prepTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-orange-50 rounded-lg">
                    <ClockIcon className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="text-sm text-orange-600">Cook Time</div>
                      <div className="font-semibold text-orange-800">{recipe.cookTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
                    <UsersIcon className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-sm text-green-600">Servings</div>
                      <div className="font-semibold text-green-800">{recipe.servings}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                    <div className="w-5 h-5 text-blue-600 flex items-center justify-center text-sm">👨‍🍳</div>
                    <div>
                      <div className="text-sm text-blue-600">Difficulty</div>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(recipe.difficulty)}`}>
                        {recipe.difficulty}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-amber-800 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Ingredients */}
                  <div>
                    <h3 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2">
                      🛒 Ingredients
                    </h3>
                    <div className="bg-amber-50 rounded-lg p-4">
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-amber-600 mt-1">•</span>
                            <span className="text-gray-700">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h3 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2">
                      👨‍🍳 Instructions
                    </h3>
                    <div className="space-y-4">
                      {recipe.instructions.map((instruction, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 leading-relaxed pt-1">{instruction}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center mt-8 pt-8 border-t border-amber-200">
                  <button
                    onClick={getRandomRecipe}
                    className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 font-semibold"
                  >
                    <ArrowPathIcon className="w-5 h-5" />
                    Try Another Recipe
                  </button>
                  <button className="px-6 py-3 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-semibold">
                    Share Recipe
                  </button>
                  <button className="px-6 py-3 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-semibold">
                    Add to Shopping List
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-amber-800 mb-4">💡 Random Recipe Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
            <div className="space-y-2">
              <p>• Keep clicking for different cuisines and difficulty levels</p>
              <p>• Check your pantry before starting to cook</p>
              <p>• Don't be afraid to substitute ingredients you don't have</p>
            </div>
            <div className="space-y-2">
              <p>• Save your favorites by clicking the heart icon</p>
              <p>• Perfect for meal planning and discovering new dishes</p>
              <p>• Great way to break out of cooking routines!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
