"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Flag, MoreVertical } from "lucide-react";
import StarRating from "./StarRating";

/**
 * ReviewCard Component
 * 
 * Displays individual recipe reviews with:
 * - User information and rating
 * - Review text and timestamp
 * - Helpful/not helpful voting
 * - Report functionality
 * - Edit/delete options for own reviews
 */
export default function ReviewCard({ 
  review, 
  currentUserId, 
  onVote, 
  onReport, 
  onEdit, 
  onDelete,
  showActions = true 
}) {
  const [isVoting, setIsVoting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userVote, setUserVote] = useState(review.userVote || null);

  const handleVote = async (voteType) => {
    if (isVoting) return;
    
    setIsVoting(true);
    try {
      const newVote = userVote === voteType ? null : voteType;
      setUserVote(newVote);
      
      if (onVote) {
        await onVote(review.id, newVote);
      }
    } catch (error) {
      console.error("Error voting on review:", error);
      // Revert vote on error
      setUserVote(review.userVote || null);
    } finally {
      setIsVoting(false);
    }
  };

  const handleReport = () => {
    if (onReport) {
      onReport(review.id);
    }
    setShowMenu(false);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(review);
    }
    setShowMenu(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(review.id);
    }
    setShowMenu(false);
  };

  const isOwnReview = currentUserId && review.userId === currentUserId;
  const helpfulCount = (review.helpfulVotes || 0) - (review.notHelpfulVotes || 0);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={review.userAvatar || "/default-avatar.png"}
            alt={review.userName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
            <div className="flex items-center space-x-2">
              <StarRating 
                rating={review.rating} 
                readOnly 
                size="sm" 
                showValue={true}
              />
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Actions Menu */}
        {showActions && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  {isOwnReview ? (
                    <>
                      <button
                        onClick={handleEdit}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit Review
                      </button>
                      <button
                        onClick={handleDelete}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Delete Review
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleReport}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Report Review
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {review.comment}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleVote("helpful")}
            disabled={isVoting}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
              userVote === "helpful"
                ? "bg-green-100 text-green-700"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{review.helpfulVotes || 0}</span>
          </button>

          <button
            onClick={() => handleVote("notHelpful")}
            disabled={isVoting}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
              userVote === "notHelpful"
                ? "bg-red-100 text-red-700"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
            <span>{review.notHelpfulVotes || 0}</span>
          </button>
        </div>

        {helpfulCount > 0 && (
          <div className="text-sm text-green-600 font-medium">
            {helpfulCount} people found this helpful
          </div>
        )}
      </div>
    </div>
  );
}
