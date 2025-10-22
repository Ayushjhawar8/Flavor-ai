// lib/similarity.js
export function getSimilarRecipes(currentRecipe, allRecipes, limit = 6) {
  // Add debug logging
  console.log("Current recipe ID:", currentRecipe?.id);
  console.log("All recipes count:", allRecipes?.length);

  const { ingredients = [], title = "", id: currentId } = currentRecipe || {};

  if (!currentRecipe || !allRecipes || allRecipes.length === 0) {
    console.log("Missing data for similarity calculation");
    return [];
  }

  return allRecipes
    .filter((r) => r.id !== currentId)
    .map((r) => {
      // Handle ingredient comparison safely
      const currentIngs = (ingredients || []).map((ing) =>
        typeof ing === "string" ? ing.toLowerCase() : String(ing).toLowerCase(),
      );
      const recipeIngs = (r.ingredients || []).map((ing) =>
        typeof ing === "string" ? ing.toLowerCase() : String(ing).toLowerCase(),
      );

      const ingredientOverlap = recipeIngs.filter((ri) =>
        currentIngs.some((ci) => ri.includes(ci) || ci.includes(ri)),
      ).length;

      const titleMatch = r.title?.toLowerCase().includes(title?.toLowerCase())
        ? 1
        : 0;

      const score = ingredientOverlap + titleMatch;

      console.log(
        `Similarity between "${currentRecipe.title}" and "${r.title}":`,
        {
          ingredientOverlap,
          titleMatch,
          totalScore: score,
        },
      );

      return { ...r, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
