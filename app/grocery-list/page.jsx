'use client';
import { useState, useEffect } from 'react';
import BackButton from '@/components/BackButton';

export default function GroceryList() {
  const [groceryItems, setGroceryItems] = useState([]);

  useEffect(() => {
    // Load grocery items from localStorage
    const savedItems = localStorage.getItem('groceryList');
    if (savedItems) {
      setGroceryItems(JSON.parse(savedItems));
    }
  }, []);

  const removeItem = (index) => {
    const newItems = groceryItems.filter((_, i) => i !== index);
    setGroceryItems(newItems);
    localStorage.setItem('groceryList', JSON.stringify(newItems));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-amber-800 dark:text-amber-400 text-center">
            My Grocery List
            <span className="ml-2 text-3xl">🛒</span>
          </h1>
          
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
