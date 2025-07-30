'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, SparklesIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

/**
 * IngredientSimilarity Component
 * 
 * Demonstrates the graph-based ingredient similarity model with:
 * - Ingredient input and search
 * - Complementary ingredient suggestions
 * - Substitute ingredient recommendations
 * - Pairing analysis with reasoning
 */
export default function IngredientSimilarity() {
  const [ingredients, setIngredients] = useState('');
  const [action, setAction] = useState('pairing');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!ingredients.trim()) {
      setError('Please enter at least one ingredient');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const ingredientList = ingredients
        .split(',')
        .map(ing => ing.trim())
        .filter(ing => ing.length > 0);

      const response = await fetch('/api/ingredient-similarity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: ingredientList,
          action,
          limit: 5
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get ingredient suggestions');
      }

      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setIngredients('');
    setResults(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <SparklesIcon className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Graph-Based Ingredient Similarity
          </h1>
        </div>

        <p className="text-gray-600 mb-6">
          Discover ingredient pairings, substitutes, and complementary flavors using our 
          graph-based similarity model. Enter ingredients separated by commas to get AI-powered suggestions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter ingredients separated by commas (e.g., tomato, onion, garlic)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-2">
              Analysis Type
            </label>
            <select
              id="action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="pairing">Complete Pairing Analysis</option>
              <option value="complementary">Complementary Ingredients</option>
              <option value="substitutes">Substitute Ingredients</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
              ) : (
                <MagnifyingGlassIcon className="h-5 w-5" />
              )}
              {loading ? 'Analyzing...' : 'Analyze Ingredients'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Clear
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {results && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Base Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {results.baseIngredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {results.complementary && results.complementary.length > 0 && (
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Complementary Ingredients
                </h3>
                <div className="space-y-2">
                  {results.complementary.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-green-800 font-medium">{item.ingredient}</span>
                      <span className="text-green-600 text-sm">
                        {Math.round(item.score * 100)}% similarity
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.substitutes && results.substitutes.length > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Substitute Ingredients
                </h3>
                <div className="space-y-2">
                  {results.substitutes.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-blue-800 font-medium">{item.ingredient}</span>
                      <span className="text-blue-600 text-sm">
                        {Math.round(item.score * 100)}% similarity
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.reasoning && (
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                  AI Reasoning
                </h3>
                <p className="text-yellow-800">{results.reasoning}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            How It Works
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Graph Structure:</strong> Each ingredient is a node in the graph, connected by 
              edges representing flavor compatibility, culinary traditions, and substitutability.
            </p>
            <p>
              <strong>Similarity Calculation:</strong> Uses graph traversal algorithms to find the 
              shortest path between ingredients and calculate similarity scores based on edge weights.
            </p>
            <p>
              <strong>Pairing Logic:</strong> Combines flavor profiles, culinary traditions, and 
              co-occurrence patterns to suggest innovative yet accessible ingredient combinations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 