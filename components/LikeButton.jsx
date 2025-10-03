"use client";

import { useState, useEffect, useCallback } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export default function LikeButton({ recipeId, className = "" }) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Generate or retrieve user ID (could be based on IP, session, or localStorage)
  useEffect(() => {
    let id = localStorage.getItem('userId');
    if (!id) {
      id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('userId', id);
    }
    setUserId(id);
  }, []);

  // Fetch initial like count and status
  useEffect(() => {
    if (!userId) return;

    const fetchLikes = async () => {
      try {
        const response = await fetch(`/api/recipes/${recipeId}/like?userId=${userId}`);
        const data = await response.json();
        setLikes(data.likes);
        setHasLiked(data.hasLiked);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchLikes();
  }, [recipeId, userId]);

  const handleLike = useCallback(async () => {
    if (isLoading || !userId) return;

    setIsLoading(true);

    // Optimistic update
    const prevLikes = likes;
    const prevHasLiked = hasLiked;
    setHasLiked(!hasLiked);
    setLikes(hasLiked ? likes - 1 : likes + 1);

    try {
      const response = await fetch(`/api/recipes/${recipeId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error('Failed to toggle like');

      const data = await response.json();
      setLikes(data.likes);
      setHasLiked(data.hasLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert optimistic update on error
      setLikes(prevLikes);
      setHasLiked(prevHasLiked);
    } finally {
      setIsLoading(false);
    }
  }, [recipeId, userId, likes, hasLiked, isLoading]);

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`btn btn-ghost btn-circle relative group ${className}`}
      aria-label={hasLiked ? 'Unlike recipe' : 'Like recipe'}
    >
      <div className="relative">
        {hasLiked ? (
          <HeartIconSolid className="h-6 w-6 text-red-500 transition-transform group-hover:scale-110" />
        ) : (
          <HeartIcon className="h-6 w-6 text-base-content transition-transform group-hover:scale-110" />
        )}
        
        {/* Like count badge */}
        {likes > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-content text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
            {likes > 999 ? '999+' : likes}
          </span>
        )}
      </div>
    </button>
  );
}
