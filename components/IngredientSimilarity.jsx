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
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-amber-800 mb-4 flex items-center justify-center gap-3">
          <SparklesIcon className="h-8 w-8 text-amber-600" />
          Ingredient Similarity Explorer
        </h1>
        <p className="text-lg text-amber-600 max-w-2xl mx-auto">
          Discover ingredient pairings, substitutes, and complementary flavors using our 
          graph-based similarity model. Enter ingredients to get AI-powered suggestions! 🔗
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl p-8">

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div>
            <label htmlFor="ingredients" className="block text-sm font-semibold text-amber-700 mb-2">
              Ingredients *
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter ingredients separated by commas (e.g., tomato, onion, garlic)"
              className="w-full p-4 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 text-gray-700 resize-none"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="action" className="block text-sm font-semibold text-amber-700 mb-2">
              Analysis Type
            </label>
            <select
              id="action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full p-4 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 text-gray-700"
            >
              <option value="pairing">Complete Pairing Analysis</option>
              <option value="complementary">Complementary Ingredients</option>
              <option value="substitutes">Substitute Ingredients</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
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
              className="px-6 py-4 border-2 border-amber-300 text-amber-700 rounded-lg hover:bg-amber-50 focus:outline-none transition-colors font-semibold"
            >
              Clear
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {results && (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
                🥄 Base Ingredients
              </h3>
              <div className="flex flex-wrap gap-3">
                {results.baseIngredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold border border-amber-300"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {results.complementary && results.complementary.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  ✨ Complementary Ingredients
                </h3>
                <div className="grid gap-3">
                  {results.complementary.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-green-100 rounded-lg border border-green-200">
                      <span className="text-green-800 font-semibold">{item.ingredient}</span>
                      <span className="text-green-700 text-sm font-medium bg-green-200 px-2 py-1 rounded-full">
                        {Math.round(item.score * 100)}% match
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.substitutes && results.substitutes.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                  🔄 Substitute Ingredients
                </h3>
                <div className="grid gap-3">
                  {results.substitutes.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-blue-100 rounded-lg border border-blue-200">
                      <span className="text-blue-800 font-semibold">{item.ingredient}</span>
                      <span className="text-blue-700 text-sm font-medium bg-blue-200 px-2 py-1 rounded-full">
                        {Math.round(item.score * 100)}% match
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.reasoning && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
                  🧠 AI Reasoning
                </h3>
                <p className="text-yellow-800 leading-relaxed">{results.reasoning}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
          <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
            📊 How It Works
          </h3>
          <div className="text-sm text-amber-700 space-y-3">
            <p className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Graph Structure:</strong> Each ingredient is a node connected by edges representing flavor compatibility, culinary traditions, and substitutability.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Similarity Calculation:</strong> Uses graph traversal algorithms to find paths between ingredients and calculate similarity scores.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span><strong>Pairing Logic:</strong> Combines flavor profiles, culinary traditions, and co-occurrence patterns for innovative suggestions.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}