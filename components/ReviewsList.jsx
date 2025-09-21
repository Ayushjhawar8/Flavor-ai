"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Filter, SortAsc } from "lucide-react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

/**
 * ReviewsList Component
 * 
 * Displays and manages recipe reviews with:
 * - Sort and filter options
 * - Pagination
 * - Review submission
 * - Review management
 */
export default function ReviewsList({ 
  recipeId, 
  currentUserId, 
  onReviewSubmit, 
  onReviewVote, 
  onReviewReport, 
  onReviewEdit, 
  onReviewDelete,
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
  className = ""
}) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5);

  // Sort and filter reviews
  useEffect(() => {
    let filteredReviews = [...reviews];

    // Filter by rating
    if (filterBy !== "all") {
      const ratingFilter = parseInt(filterBy);
      filteredReviews = filteredReviews.filter(review => review.rating === ratingFilter);
    }

    // Sort reviews
    filteredReviews.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        case "most_helpful":
          const aHelpful = (a.helpfulVotes || 0) - (a.notHelpfulVotes || 0);
          const bHelpful = (b.helpfulVotes || 0) - (b.notHelpfulVotes || 0);
          return bHelpful - aHelpful;
        default:
          return 0;
      }
    });

    setDisplayedReviews(filteredReviews);
    setCurrentPage(1);
  }, [reviews, sortBy, filterBy]);

  // Pagination
  const totalPages = Math.ceil(displayedReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = displayedReviews.slice(startIndex, endIndex);

  const handleReviewSubmit = async (reviewData) => {
    try {
      await onReviewSubmit(recipeId, reviewData);
      setShowReviewForm(false);
      setEditingReview(null);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleReviewEdit = (review) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const handleReviewDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await onReviewDelete(reviewId);
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setShowReviewForm(false);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Reviews Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Reviews ({totalReviews})
          </h3>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Write a Review
          </button>
        </div>

        {/* Rating Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              Average Rating
            </div>
            <div className="flex justify-center">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className={`w-4 h-4 ${
                      star <= averageRating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating];
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm font-medium w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <ReviewForm
          onSubmit={handleReviewSubmit}
          onCancel={handleCancelEdit}
          initialRating={editingReview?.rating || 0}
          initialComment={editingReview?.comment || ""}
          isEditing={!!editingReview}
        />
      )}

      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>

          {showFilters && (
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          )}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="most_helpful">Most Helpful</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, displayedReviews.length)} of {displayedReviews.length} reviews
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {currentReviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {filterBy !== "all" ? "No reviews match your filter criteria" : "No reviews yet. Be the first to review this recipe!"}
          </div>
        ) : (
          currentReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              currentUserId={currentUserId}
              onVote={onReviewVote}
              onReport={onReviewReport}
              onEdit={handleReviewEdit}
              onDelete={handleReviewDelete}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 border rounded-md ${
                  page === currentPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
