// Frontend-only storage for community features
// This will be replaced with real database later

// Community recipes storage
export const getCommunityRecipes = () => {
  const stored = localStorage.getItem("community_recipes");
  return stored ? JSON.parse(stored) : [];
};

export const getRecipeById = (id) => {
  const recipes = getCommunityRecipes();
  return recipes.find(recipe => recipe.id === id);
};

export const saveCommunityRecipe = (recipe) => {
  const recipes = getCommunityRecipes();
  const newRecipe = {
    ...recipe,
    id: `recipe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString()
  };
  recipes.unshift(newRecipe);
  localStorage.setItem("community_recipes", JSON.stringify(recipes));
  return newRecipe;
};

export const setCurrentRecipe = (recipe) => {
  localStorage.setItem('current_recipe', JSON.stringify(recipe));
};


// Collections storage
export const getUserCollections = (userId) => {
  const stored = localStorage.getItem("user_collections");
  const allCollections = stored ? JSON.parse(stored) : {};
  return allCollections[userId] || [];
};

export const createCollection = (userId, name, description = "") => {
  const stored = localStorage.getItem("user_collections");
  const allCollections = stored ? JSON.parse(stored) : {};
  
  if (!allCollections[userId]) {
    allCollections[userId] = [];
  }
  
  const newCollection = {
    id: `collection_${Date.now()}`,
    name,
    description,
    recipes: [],
    createdAt: new Date().toISOString()
  };
  
  allCollections[userId].push(newCollection);
  localStorage.setItem("user_collections", JSON.stringify(allCollections));
  return newCollection;
};

export const addToCollection = (userId, collectionId, recipeId, recipeType = "community") => {
  const stored = localStorage.getItem("user_collections");
  const allCollections = stored ? JSON.parse(stored) : {};
  
  if (allCollections[userId]) {
    const collection = allCollections[userId].find(c => c.id === collectionId);
    if (collection) {
      const recipeExists = collection.recipes.find(r => r.id === recipeId);
      if (!recipeExists) {
        collection.recipes.push({ id: recipeId, type: recipeType, addedAt: new Date().toISOString() });
        localStorage.setItem("user_collections", JSON.stringify(allCollections));
      }
    }
  }
};