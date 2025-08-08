'use client';
import { useState } from 'react';

export default function AddToGroceryList({ ingredients }) {
  const [added, setAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const addToGroceryList = () => {
    try {
      if (!ingredients || !Array.isArray(ingredients)) {
        throw new Error('Invalid ingredients data');
      }

      // Get existing items
      let existingItems = [];
      try {
        const savedItems = localStorage.getItem('groceryList');
        existingItems = savedItems ? JSON.parse(savedItems) : [];
        
        // Validate existing items
        if (!Array.isArray(existingItems)) {
          console.warn('Invalid data in localStorage, resetting');
          existingItems = [];
        }
      } catch (err) {
        console.warn('Error reading from localStorage, starting fresh');
        existingItems = [];
      }
      
      // Add new ingredients
      const newItems = ingredients.map(ing => {
        if (!ing) throw new Error('Invalid ingredient data');
        return {
          ingredient: ing.name || ing.ingredient || 'Unknown Item',
          amount: ing.amount || ing.quantity || '1'
        };
      });
      
      // Combine and deduplicate
      const combinedItems = [...existingItems];
      newItems.forEach(newItem => {
        const existingIndex = combinedItems.findIndex(
          item => item.ingredient.toLowerCase() === newItem.ingredient.toLowerCase()
        );
        
        if (existingIndex === -1) {
          combinedItems.push(newItem);
        }
      });

      // Save to localStorage
      localStorage.setItem('groceryList', JSON.stringify(combinedItems));
      setAdded(true);

      // Reset button state after 2 seconds
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('Error adding to grocery list:', err);
      // Show error state briefly
      setAdded('error');
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <button
      onClick={addToGroceryList}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        px-6 py-3 rounded-full font-medium text-base
        transition-all duration-300 transform
        flex items-center gap-2
        shadow-lg
        ${added === true
          ? 'bg-gradient-to-r from-green-400 to-green-500 text-white scale-105'
          : added === 'error'
          ? 'bg-gradient-to-r from-red-400 to-red-500 text-white scale-105'
          : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white hover:scale-105'
        }
        ${isHovered && !added ? 'shadow-amber-300/50' : ''}
      `}
      disabled={added}
    >
      <span className="text-xl mr-1">{added ? '🎉' : '🛒'}</span>
      {added ? 'Added to List!' : 'Add to Grocery List'}
      {!added && isHovered && <span className="ml-1">→</span>}
    </button>
  );
}
