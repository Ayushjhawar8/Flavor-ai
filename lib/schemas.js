import { z } from "zod";

/**
 * Schema for recipe ingredients
 * Each ingredient has a name and amount
 * Example: { name: "Sugar", amount: "2 tablespoons" }
 */
const ingredientSchema = z.object({
    name: z.string().describe('The name of the ingredient.'),
    amount: z.string().describe('The quantity of the ingredient.'),
}).describe('An object representing an ingredient.');

/**
 * Main recipe schema that defines the structure of recipe data
 * Used for type validation and API response formatting
 * Contains:
 * - name: Recipe title
 * - area: Cuisine region/style
 * - category: Type of dish
 * - ingredients: List of required ingredients
 * - steps: Ordered preparation instructions
 */
export const recipeSchema = z.object({
    recipe: z.object({
        name: z.string().describe('The name of the recipe.'),
        area: z.string().describe('The geographical region or style of cuisine associated with the recipe.'),
        category: z.string().describe('The category of the recipe, such as appetizer, main course, or dessert.'),
        ingredients: z.array(ingredientSchema).describe('A list of ingredients required for the recipe.'),
        steps: z.array(z.string()).describe('A list of steps to prepare the recipe.'),
        description: z.string().describe('A one-line summary of the dish.'),
    }).describe('The main recipe object.'),
});