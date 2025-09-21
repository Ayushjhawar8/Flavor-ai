"use client";

import { useState, useEffect, useCallback } from "react";
import { getCurrentUser } from "@/lib/mockAuth";

/**
 * Custom hook for managing recipe reviews
 * Provides functions for CRUD operations on reviews and voting
 */
export function useReviews(recipeId) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  });

  const currentUser = getCurrentUser();

  // Fetch reviews for a recipe
  const fetchReviews = useCallback(async (page = 1, limit = 10, sortBy = 'newest', filterBy = 'all') => {
    if (!recipeId) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        filterBy
      });

      const response = await fetch(`/api/recipes/${recipeId}/reviews?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      setReviews(data.reviews);
      setStatistics(data.statistics);
      
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  }, [recipeId]);

  // Submit a new review
  const submitReview = useCallback(async (reviewData) => {
    if (!recipeId || !currentUser) {
      throw new Error('Recipe ID and user authentication required');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/recipes/${recipeId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...reviewData,
          userId: currentUser.id,
          userName: currentUser.name,
          userAvatar: currentUser.avatar
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit review');
      }

      const newReview = await response.json();
      
      // Refresh reviews to include the new one
      await fetchReviews();
      
      return newReview;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [recipeId, currentUser, fetchReviews]);

  // Update an existing review
  const updateReview = useCallback(async (reviewId, reviewData) => {
    if (!recipeId || !currentUser) {
      throw new Error('Recipe ID and user authentication required');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/recipes/${recipeId}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...reviewData,
          userId: currentUser.id
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update review');
      }

      const updatedReview = await response.json();
      
      // Update the review in the local state
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review.id === reviewId ? updatedReview : review
        )
      );
      
      return updatedReview;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [recipeId, currentUser]);

  // Delete a review
  const deleteReview = useCallback(async (reviewId) => {
    if (!recipeId || !currentUser) {
      throw new Error('Recipe ID and user authentication required');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/recipes/${recipeId}/reviews/${reviewId}?userId=${currentUser.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete review');
      }

      // Remove the review from local state
      setReviews(prevReviews => 
        prevReviews.filter(review => review.id !== reviewId)
      );
      
      // Refresh statistics
      await fetchReviews();
      
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [recipeId, currentUser, fetchReviews]);

  // Vote on a review
  const voteOnReview = useCallback(async (reviewId, voteType) => {
    if (!recipeId || !currentUser) {
      throw new Error('Recipe ID and user authentication required');
    }

    try {
      const response = await fetch(`/api/recipes/${recipeId}/reviews/${reviewId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser.id,
          voteType
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to vote on review');
      }

      const result = await response.json();
      
      // Update the review in local state
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review.id === reviewId 
            ? { 
                ...review, 
                helpfulVotes: result.review.helpfulVotes,
                notHelpfulVotes: result.review.notHelpfulVotes,
                userVote: result.review.userVote
              }
            : review
        )
      );
      
      return result;
    } catch (err) {
      console.error('Error voting on review:', err);
      throw err;
    }
  }, [recipeId, currentUser]);

  // Report a review
  const reportReview = useCallback(async (reviewId, reason = 'inappropriate') => {
    if (!currentUser) {
      throw new Error('User authentication required');
    }

    try {
      // In a real app, this would call a reporting API
      console.log(`Reporting review ${reviewId} for reason: ${reason}`);
      
      // For now, just show a success message
      alert('Review reported successfully. Thank you for helping keep our community safe!');
      
    } catch (err) {
      console.error('Error reporting review:', err);
      throw err;
    }
  }, [currentUser]);

  // Load reviews on mount
  useEffect(() => {
    if (recipeId) {
      fetchReviews();
    }
  }, [recipeId, fetchReviews]);

  return {
    reviews,
    statistics,
    loading,
    error,
    fetchReviews,
    submitReview,
    updateReview,
    deleteReview,
    voteOnReview,
    reportReview
  };
}
