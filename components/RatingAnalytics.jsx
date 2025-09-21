"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Users, Star, ThumbsUp } from "lucide-react";

/**
 * RatingAnalytics Component
 * 
 * Displays comprehensive rating analytics and statistics
 * Features:
 * - Average rating display
 * - Rating distribution chart
 * - Review trends
 * - Helpful votes summary
 */
export default function RatingAnalytics({ 
  recipeId, 
  statistics = {}, 
  className = "" 
}) {
  const [analytics, setAnalytics] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    helpfulVotes: 0,
    notHelpfulVotes: 0,
    recentTrend: 0
  });

  useEffect(() => {
    setAnalytics(statistics);
  }, [statistics]);

  const getRatingPercentage = (rating) => {
    if (analytics.totalReviews === 0) return 0;
    return Math.round((analytics.ratingDistribution[rating] / analytics.totalReviews) * 100);
  };

  const getOverallRating = () => {
    if (analytics.averageRating === 0) return "No ratings yet";
    return `${analytics.averageRating.toFixed(1)} out of 5 stars`;
  };

  const getRatingDescription = () => {
    const rating = analytics.averageRating;
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4.0) return "Very Good";
    if (rating >= 3.5) return "Good";
    if (rating >= 3.0) return "Average";
    if (rating >= 2.0) return "Below Average";
    return "Poor";
  };

  const getHelpfulnessPercentage = () => {
    const total = analytics.helpfulVotes + analytics.notHelpfulVotes;
    if (total === 0) return 0;
    return Math.round((analytics.helpfulVotes / total) * 100);
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Rating Analytics</h3>

      {/* Overall Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Star className="w-8 h-8 text-yellow-400 mr-2" />
            <span className="text-3xl font-bold text-gray-900">
              {analytics.averageRating.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-gray-600">{getOverallRating()}</p>
          <p className="text-sm font-medium text-gray-800">{getRatingDescription()}</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-8 h-8 text-blue-500 mr-2" />
            <span className="text-3xl font-bold text-gray-900">
              {analytics.totalReviews}
            </span>
          </div>
          <p className="text-sm text-gray-600">Total Reviews</p>
          <p className="text-sm font-medium text-gray-800">
            {analytics.recentTrend > 0 ? `+${analytics.recentTrend} this week` : "No recent activity"}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <ThumbsUp className="w-8 h-8 text-green-500 mr-2" />
            <span className="text-3xl font-bold text-gray-900">
              {getHelpfulnessPercentage()}%
            </span>
          </div>
          <p className="text-sm text-gray-600">Helpful Reviews</p>
          <p className="text-sm font-medium text-gray-800">
            {analytics.helpfulVotes} of {analytics.helpfulVotes + analytics.notHelpfulVotes} votes
          </p>
        </div>
      </div>

      {/* Rating Distribution Chart */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h4>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const percentage = getRatingPercentage(rating);
            const count = analytics.ratingDistribution[rating];
            
            return (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm font-medium text-gray-700">{rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                
                <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                  <div
                    className="bg-yellow-400 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <div className="flex items-center space-x-2 w-20">
                  <span className="text-sm text-gray-600">{count}</span>
                  <span className="text-sm text-gray-500">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {analytics.ratingDistribution[5]}
          </div>
          <div className="text-sm text-gray-600">5 Star Reviews</div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {analytics.ratingDistribution[4]}
          </div>
          <div className="text-sm text-gray-600">4 Star Reviews</div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {analytics.ratingDistribution[3]}
          </div>
          <div className="text-sm text-gray-600">3 Star Reviews</div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            {analytics.ratingDistribution[2] + analytics.ratingDistribution[1]}
          </div>
          <div className="text-sm text-gray-600">Lower Ratings</div>
        </div>
      </div>

      {/* Insights */}
      {analytics.totalReviews > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h5 className="font-semibold text-blue-900 mb-2">💡 Insights</h5>
          <ul className="text-sm text-blue-800 space-y-1">
            {analytics.averageRating >= 4.5 && (
              <li>• This recipe has excellent ratings! Users love it.</li>
            )}
            {analytics.ratingDistribution[5] > analytics.totalReviews * 0.7 && (
              <li>• Over 70% of users gave this recipe 5 stars.</li>
            )}
            {getHelpfulnessPercentage() >= 80 && (
              <li>• Reviews are highly helpful to other users.</li>
            )}
            {analytics.totalReviews >= 50 && (
              <li>• This recipe has a strong community following.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
