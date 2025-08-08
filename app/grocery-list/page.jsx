'use client';
import { useState, useEffect } from 'react';
import BackButton from '@/components/BackButton';

export default function GroceryList() {
  const [groceryItems, setGroceryItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      // Check if localStorage is available
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedItems = localStorage.getItem('groceryList');
        if (savedItems) {
          const parsedItems = JSON.parse(savedItems);
          // Validate data structure
          if (Array.isArray(parsedItems) && parsedItems.every(item => 
            item && typeof item === 'object' && 
            'ingredient' in item && 'amount' in item
          )) {
            setGroceryItems(parsedItems);
          } else {
            console.warn('Invalid data structure in localStorage');
            localStorage.removeItem('groceryList'); // Clear invalid data
            setGroceryItems([]);
          }
        }
      } else {
        setError('Local storage is not available');
      }
    } catch (err) {
      console.error('Error loading grocery list:', err);
      setError('Failed to load grocery list');
      setGroceryItems([]);
    }
  }, []);

  const removeItem = (index) => {
    try {
      const newItems = groceryItems.filter((_, i) => i !== index);
      setGroceryItems(newItems);
      localStorage.setItem('groceryList', JSON.stringify(newItems));
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item');
    }
  };

  const clearList = () => {
    try {
      setGroceryItems([]);
      localStorage.removeItem('groceryList');
    } catch (err) {
      console.error('Error clearing list:', err);
      setError('Failed to clear list');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-4xl font-bold text-amber-800 dark:text-amber-400 text-center">
              My Grocery List
              <span className="ml-2 text-3xl">🛒</span>
            </h1>
            {error && (
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-center">
                {error}
              </div>
            )}
          </div>
          
          {groceryItems.length === 0 ? (
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Your grocery list is empty
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Add ingredients from recipes to start your list!
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 dark:text-gray-300">
                  {groceryItems.length} {groceryItems.length === 1 ? 'item' : 'items'}
                </span>
                <button
                  onClick={clearList}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
              <ul className="divide-y divide-amber-200 dark:divide-gray-700">
                {groceryItems.map((item, index) => (
                  <li key={index} className="py-4 flex items-center justify-between group hover:bg-amber-50 dark:hover:bg-gray-700 rounded-lg px-4 transition-all duration-200">
                    <span className="flex-1 flex items-center">
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {item.ingredient}
                      </span>
                      <span className="ml-2 px-2 py-1 text-sm bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full">
                        {item.amount}
                      </span>
                    </span>
                    <button
                      onClick={() => removeItem(index)}
                      className="ml-4 px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
