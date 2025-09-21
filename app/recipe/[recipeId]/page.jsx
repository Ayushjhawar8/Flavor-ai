"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Clock, Users, ChefHat, ArrowLeft, Share2, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import ReviewsList from "@/components/ReviewsList";
import { useReviews } from "@/hooks/useReviews";
import { getCurrentUser } from "@/lib/mockAuth";
import Link from "next/link";

export default function RecipeDetailPage() {
  const params = useParams();
  const recipeId = params.recipeId;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const {
    reviews,
    statistics,
    loading: reviewsLoading,
    error: reviewsError,
    submitReview,
    updateReview,
    deleteReview,
    voteOnReview,
    reportReview
  } = useReviews(recipeId);

  const handleSearchFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    loadRecipe();
  }, [recipeId]);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      
      // Try to get recipe from localStorage first (for community recipes)
      const storedRecipe = localStorage.getItem('current_recipe');
      if (storedRecipe) {
        const parsedRecipe = JSON.parse(storedRecipe);
        setRecipe(parsedRecipe);
        setLoading(false);
        return;
      }

      // If not in localStorage, try to fetch from API
      // This would be implemented based on your backend structure
      throw new Error('Recipe not found');
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleShare = () => {
    const shareText = `Check out this amazing recipe: ${recipe.title}`;
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      alert("Recipe link copied to clipboard!");
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100">
        <Navbar
          showResults={showResults}
          setShowResults={setShowResults}
          handleSearchFocus={handleSearchFocus}
          handleBlur={handleBlur}
        />
        <div className="container mx-auto px-4 py-8 mt-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-base-100">
        <Navbar
          showResults={showResults}
          setShowResults={setShowResults}
          handleSearchFocus={handleSearchFocus}
          handleBlur={handleBlur}
        />
        <div className="container mx-auto px-4 py-8 mt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe Not Found</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link href="/community" className="btn btn-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Community
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar
        showResults={showResults}
        setShowResults={setShowResults}
        handleSearchFocus={handleSearchFocus}
        handleBlur={handleBlur}
      />

      <div className={`container mx-auto px-4 py-8 mt-20 transition-all duration-300 ${
        showResults ? "opacity-80 blur-sm" : "opacity-100"
      }`}>
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/community" className="inline-flex items-center text-primary hover:text-primary-focus">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Community
          </Link>
        </div>

        {/* Recipe Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recipe Image */}
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute top-4 right-4">
              <div className="badge badge-primary text-lg px-3 py-2">
                {recipe.difficulty}
              </div>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {recipe.title}
              </h1>
              
              {/* Author Info */}
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={recipe.author?.avatar || "/default-avatar.png"}
                  alt={recipe.author?.name || "Author"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {recipe.author?.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(recipe.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Rating Display */}
              <div className="flex items-center gap-4 mb-4">
                <StarRating 
                  rating={statistics.averageRating} 
                  readOnly 
                  size="lg" 
                  showValue={true}
                />
                <span className="text-lg text-gray-600">
                  ({statistics.totalReviews} reviews)
                </span>
              </div>

              {/* Recipe Stats */}
              <div className="flex items-center gap-6 text-gray-600">
                {recipe.cookTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{recipe.cookTime}</span>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{recipe.servings} servings</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  liked 
                    ? "bg-red-100 text-red-600" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                <span>{liked ? "Liked" : "Like"}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recipe Description */}
        {recipe.description && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Recipe</h2>
            <p className="text-gray-700 leading-relaxed">{recipe.description}</p>
          </div>
        )}

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Ingredients */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ChefHat className="w-6 h-6" />
              Ingredients
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions?.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-gray-200 pt-8">
          <ReviewsList
            recipeId={recipeId}
            currentUserId={currentUser?.id}
            onReviewSubmit={submitReview}
            onReviewVote={voteOnReview}
            onReviewReport={reportReview}
            onReviewEdit={updateReview}
            onReviewDelete={deleteReview}
            reviews={reviews}
            averageRating={statistics.averageRating}
            totalReviews={statistics.totalReviews}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
