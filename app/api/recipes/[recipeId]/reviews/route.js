import { NextResponse } from "next/server";

// Mock data storage (in production, this would be a database)
let reviews = [];
let recipeRatings = {};

/**
 * GET /api/recipes/[recipeId]/reviews
 * Get all reviews for a specific recipe
 */
export async function GET(request, { params }) {
  try {
    const { recipeId } = params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const sortBy = searchParams.get('sortBy') || 'newest';
    const filterBy = searchParams.get('filterBy') || 'all';

    // Get reviews for this recipe
    let recipeReviews = reviews.filter(review => review.recipeId === recipeId);

    // Filter by rating
    if (filterBy !== 'all') {
      const ratingFilter = parseInt(filterBy);
      recipeReviews = recipeReviews.filter(review => review.rating === ratingFilter);
    }

    // Sort reviews
    recipeReviews.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'most_helpful':
          const aHelpful = (a.helpfulVotes || 0) - (a.notHelpfulVotes || 0);
          const bHelpful = (b.helpfulVotes || 0) - (b.notHelpfulVotes || 0);
          return bHelpful - aHelpful;
        default:
          return 0;
      }
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedReviews = recipeReviews.slice(startIndex, endIndex);

    // Calculate average rating
    const totalRating = recipeReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = recipeReviews.length > 0 ? totalRating / recipeReviews.length : 0;

    // Get rating distribution
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    recipeReviews.forEach(review => {
      ratingDistribution[review.rating]++;
    });

    return NextResponse.json({
      reviews: paginatedReviews,
      pagination: {
        page,
        limit,
        total: recipeReviews.length,
        totalPages: Math.ceil(recipeReviews.length / limit)
      },
      statistics: {
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: recipeReviews.length,
        ratingDistribution
      }
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/recipes/[recipeId]/reviews
 * Create a new review for a recipe
 */
export async function POST(request, { params }) {
  try {
    const { recipeId } = params;
    const body = await request.json();
    const { rating, comment, userId, userName, userAvatar } = body;

    // Validate required fields
    if (!rating || !comment || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: rating, comment, userId' },
        { status: 400 }
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json(
        { error: 'Rating must be an integer between 1 and 5' },
        { status: 400 }
      );
    }

    // Check if user already reviewed this recipe
    const existingReview = reviews.find(
      review => review.recipeId === recipeId && review.userId === userId
    );

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this recipe' },
        { status: 409 }
      );
    }

    // Create new review
    const newReview = {
      id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      recipeId,
      userId,
      userName: userName || 'Anonymous',
      userAvatar: userAvatar || '/default-avatar.png',
      rating,
      comment: comment.trim(),
      helpfulVotes: 0,
      notHelpfulVotes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    reviews.push(newReview);

    // Update recipe rating statistics
    updateRecipeRatingStats(recipeId);

    return NextResponse.json(newReview, { status: 201 });

  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to update recipe rating statistics
 */
function updateRecipeRatingStats(recipeId) {
  const recipeReviews = reviews.filter(review => review.recipeId === recipeId);
  
  if (recipeReviews.length === 0) {
    delete recipeRatings[recipeId];
    return;
  }

  const totalRating = recipeReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / recipeReviews.length;

  recipeRatings[recipeId] = {
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews: recipeReviews.length,
    lastUpdated: new Date().toISOString()
  };
}
