import Graph from 'graph-data-structure';
import { Matrix } from 'ml-matrix';

/**
 * Graph-Based Ingredient Similarity Model
 * 
 * This module implements a graph-based approach to ingredient similarity and pairing.
 * It uses a graph structure where:
 * - Nodes represent ingredients
 * - Edges represent similarity relationships with weights
 * - Graph traversal helps find complementary and substitute ingredients
 */

class IngredientGraph {
  constructor() {
    this.graph = Graph();
    this.ingredientEmbeddings = new Map();
    this.flavorProfiles = new Map();
    this.initializeGraph();
  }

  /**
   * Initialize the graph with common ingredients and their relationships
   */
  initializeGraph() {
    // Add common ingredients as nodes
    const commonIngredients = [
      'tomato', 'onion', 'garlic', 'ginger', 'potato', 'rice', 'chicken', 'beef',
      'fish', 'shrimp', 'carrot', 'bell pepper', 'spinach', 'mushroom', 'eggplant',
      'cauliflower', 'broccoli', 'cabbage', 'lettuce', 'cucumber', 'lemon', 'lime',
      'orange', 'apple', 'banana', 'mango', 'strawberry', 'blueberry', 'cheese',
      'milk', 'yogurt', 'butter', 'oil', 'salt', 'pepper', 'cumin', 'turmeric',
      'coriander', 'cardamom', 'cinnamon', 'nutmeg', 'basil', 'oregano', 'thyme',
      'rosemary', 'parsley', 'cilantro', 'mint', 'chili', 'paprika', 'curry powder',
      'soy sauce', 'vinegar', 'honey', 'sugar', 'flour', 'bread', 'pasta', 'noodles'
    ];

    commonIngredients.forEach(ingredient => {
      this.graph.addNode(ingredient);
    });

    // Add similarity edges based on flavor profiles and culinary relationships
    this.addFlavorBasedEdges();
    this.addCulinaryPairingEdges();
    this.addSubstituteEdges();
  }

  /**
   * Add edges based on flavor profile similarities
   */
  addFlavorBasedEdges() {
    const flavorGroups = {
      'sweet': ['honey', 'sugar', 'apple', 'banana', 'mango', 'strawberry', 'blueberry'],
      'savory': ['tomato', 'onion', 'garlic', 'mushroom', 'cheese', 'soy sauce'],
      'spicy': ['chili', 'pepper', 'paprika', 'curry powder'],
      'herbal': ['basil', 'oregano', 'thyme', 'rosemary', 'parsley', 'cilantro', 'mint'],
      'earthy': ['potato', 'carrot', 'mushroom', 'cauliflower', 'broccoli'],
      'citrus': ['lemon', 'lime', 'orange'],
      'creamy': ['milk', 'yogurt', 'butter', 'cheese'],
      'aromatic': ['garlic', 'ginger', 'onion', 'cumin', 'turmeric', 'coriander', 'cardamom']
    };

    // Add edges within flavor groups
    Object.entries(flavorGroups).forEach(([group, ingredients]) => {
      for (let i = 0; i < ingredients.length; i++) {
        for (let j = i + 1; j < ingredients.length; j++) {
          const weight = 0.8; // High similarity within groups
          this.graph.addEdge(ingredients[i], ingredients[j], weight);
          this.graph.addEdge(ingredients[j], ingredients[i], weight);
        }
      }
    });

    // Add cross-group complementary relationships
    const complementaryPairs = [
      ['tomato', 'basil'], ['tomato', 'garlic'], ['tomato', 'onion'],
      ['chicken', 'garlic'], ['chicken', 'ginger'], ['chicken', 'lemon'],
      ['fish', 'lemon'], ['fish', 'garlic'], ['fish', 'herbs'],
      ['potato', 'onion'], ['potato', 'garlic'], ['potato', 'butter'],
      ['rice', 'onion'], ['rice', 'garlic'], ['rice', 'soy sauce'],
      ['beef', 'garlic'], ['beef', 'onion'], ['beef', 'pepper'],
      ['mushroom', 'garlic'], ['mushroom', 'onion'], ['mushroom', 'butter'],
      ['carrot', 'onion'], ['carrot', 'garlic'], ['carrot', 'ginger'],
      ['bell pepper', 'onion'], ['bell pepper', 'garlic'], ['bell pepper', 'basil']
    ];

    complementaryPairs.forEach(([ing1, ing2]) => {
      const weight = 0.7; // Good complementary relationship
      this.graph.addEdge(ing1, ing2, weight);
      this.graph.addEdge(ing2, ing1, weight);
    });
  }

  /**
   * Add edges based on culinary pairing traditions
   */
  addCulinaryPairingEdges() {
    const culinaryPairs = [
      // Italian pairings
      ['tomato', 'basil'], ['tomato', 'oregano'], ['tomato', 'garlic'],
      ['pasta', 'garlic'], ['pasta', 'basil'], ['pasta', 'parmesan'],
      
      // Indian pairings
      ['rice', 'cumin'], ['rice', 'turmeric'], ['rice', 'cardamom'],
      ['chicken', 'turmeric'], ['chicken', 'cumin'], ['chicken', 'coriander'],
      ['potato', 'cumin'], ['potato', 'turmeric'], ['potato', 'coriander'],
      
      // Asian pairings
      ['fish', 'ginger'], ['fish', 'soy sauce'], ['fish', 'garlic'],
      ['beef', 'ginger'], ['beef', 'soy sauce'], ['beef', 'garlic'],
      ['shrimp', 'ginger'], ['shrimp', 'garlic'], ['shrimp', 'soy sauce'],
      
      // Mediterranean pairings
      ['olive oil', 'garlic'], ['olive oil', 'basil'], ['olive oil', 'oregano'],
      ['feta', 'olive'], ['feta', 'basil'], ['feta', 'oregano']
    ];

    culinaryPairs.forEach(([ing1, ing2]) => {
      const weight = 0.6; // Traditional culinary pairing
      this.graph.addEdge(ing1, ing2, weight);
      this.graph.addEdge(ing2, ing1, weight);
    });
  }

  /**
   * Add edges for ingredient substitutes
   */
  addSubstituteEdges() {
    const substitutes = [
      ['milk', 'yogurt'], ['milk', 'butter'],
      ['onion', 'shallot'], ['onion', 'leek'],
      ['garlic', 'garlic powder'], ['ginger', 'ginger powder'],
      ['lemon', 'lime'], ['lemon', 'vinegar'],
      ['basil', 'oregano'], ['basil', 'thyme'],
      ['tomato', 'tomato paste'], ['tomato', 'tomato sauce'],
      ['chicken', 'turkey'], ['beef', 'lamb'],
      ['rice', 'quinoa'], ['rice', 'couscous'],
      ['potato', 'sweet potato'], ['potato', 'cauliflower']
    ];

    substitutes.forEach(([ing1, ing2]) => {
      const weight = 0.9; // High substitutability
      this.graph.addEdge(ing1, ing2, weight);
      this.graph.addEdge(ing2, ing1, weight);
    });
  }

  /**
   * Calculate similarity between two ingredients using graph structure
   * @param {string} ingredient1 - First ingredient
   * @param {string} ingredient2 - Second ingredient
   * @returns {number} Similarity score (0-1)
   */
  calculateSimilarity(ingredient1, ingredient2) {
    if (ingredient1 === ingredient2) return 1.0;

    const path = this.graph.shortestPath(ingredient1, ingredient2);
    if (!path || path.length === 0) return 0.0;

    // Calculate similarity based on path length and edge weights
    let totalWeight = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const edge = this.graph.getEdgeWeight(path[i], path[i + 1]);
      totalWeight += edge || 0;
    }

    const avgWeight = totalWeight / (path.length - 1);
    const pathPenalty = 1 / (path.length - 1); // Shorter paths are better

    return Math.min(1.0, avgWeight * pathPenalty);
  }

  /**
   * Find complementary ingredients for a given ingredient
   * @param {string} ingredient - The base ingredient
   * @param {number} limit - Maximum number of suggestions
   * @returns {Array} Array of complementary ingredients with scores
   */
  findComplementaryIngredients(ingredient, limit = 5) {
    const nodes = this.graph.nodes();
    const complements = [];

    nodes.forEach(node => {
      if (node !== ingredient) {
        const similarity = this.calculateSimilarity(ingredient, node);
        if (similarity > 0.3) { // Threshold for meaningful complementarity
          complements.push({ ingredient: node, score: similarity });
        }
      }
    });

    return complements
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  /**
   * Find substitute ingredients for a given ingredient
   * @param {string} ingredient - The ingredient to find substitutes for
   * @param {number} limit - Maximum number of suggestions
   * @returns {Array} Array of substitute ingredients with scores
   */
  findSubstituteIngredients(ingredient, limit = 3) {
    const nodes = this.graph.nodes();
    const substitutes = [];

    nodes.forEach(node => {
      if (node !== ingredient) {
        const similarity = this.calculateSimilarity(ingredient, node);
        if (similarity > 0.7) { // High threshold for substitutability
          substitutes.push({ ingredient: node, score: similarity });
        }
      }
    });

    return substitutes
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  /**
   * Generate ingredient pairing suggestions for a list of ingredients
   * @param {Array} ingredients - List of available ingredients
   * @param {number} limit - Maximum number of suggestions
   * @returns {Object} Object containing complementary and substitute suggestions
   */
  generatePairingSuggestions(ingredients, limit = 5) {
    const complementary = [];
    const substitutes = [];

    ingredients.forEach(ingredient => {
      // Find complementary ingredients
      const complements = this.findComplementaryIngredients(ingredient, limit);
      complementary.push(...complements);

      // Find substitutes
      const subs = this.findSubstituteIngredients(ingredient, limit);
      substitutes.push(...subs);
    });

    // Remove duplicates and sort by score
    const uniqueComplementary = this.removeDuplicates(complementary);
    const uniqueSubstitutes = this.removeDuplicates(substitutes);

    return {
      complementary: uniqueComplementary.slice(0, limit),
      substitutes: uniqueSubstitutes.slice(0, limit),
      reasoning: this.generateReasoning(ingredients, uniqueComplementary, uniqueSubstitutes)
    };
  }

  /**
   * Remove duplicate ingredients from suggestions
   * @param {Array} suggestions - Array of ingredient suggestions
   * @returns {Array} Deduplicated suggestions
   */
  removeDuplicates(suggestions) {
    const seen = new Set();
    return suggestions.filter(suggestion => {
      if (seen.has(suggestion.ingredient)) {
        return false;
      }
      seen.add(suggestion.ingredient);
      return true;
    });
  }

  /**
   * Generate reasoning for ingredient suggestions
   * @param {Array} baseIngredients - Original ingredients
   * @param {Array} complementary - Complementary suggestions
   * @param {Array} substitutes - Substitute suggestions
   * @returns {string} Reasoning explanation
   */
  generateReasoning(baseIngredients, complementary, substitutes) {
    const reasons = [];

    if (complementary.length > 0) {
      const topComplement = complementary[0];
      reasons.push(`${topComplement.ingredient} pairs well with your ingredients due to complementary flavor profiles.`);
    }

    if (substitutes.length > 0) {
      const topSubstitute = substitutes[0];
      reasons.push(`${topSubstitute.ingredient} can be used as a substitute if you're missing any ingredients.`);
    }

    return reasons.join(' ');
  }

  /**
   * Add a new ingredient to the graph
   * @param {string} ingredient - New ingredient name
   * @param {Array} similarIngredients - Array of similar ingredients with weights
   */
  addIngredient(ingredient, similarIngredients = []) {
    this.graph.addNode(ingredient);
    
    similarIngredients.forEach(({ ingredient: similar, weight }) => {
      this.graph.addEdge(ingredient, similar, weight);
      this.graph.addEdge(similar, ingredient, weight);
    });
  }

  /**
   * Get all nodes in the graph
   * @returns {Array} Array of all ingredient nodes
   */
  getAllIngredients() {
    return this.graph.nodes();
  }

  /**
   * Get graph statistics
   * @returns {Object} Graph statistics
   */
  getGraphStats() {
    const nodes = this.graph.nodes();
    const edges = this.graph.edges();
    
    return {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      averageDegree: edges.length / nodes.length,
      ingredients: nodes
    };
  }
}

// Create and export a singleton instance
const ingredientGraph = new IngredientGraph();

module.exports = { default: ingredientGraph }; 