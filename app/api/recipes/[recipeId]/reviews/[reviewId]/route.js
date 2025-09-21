import { NextResponse } from "next/server";

// Mock data storage (in production, this would be a database)
let reviews = [];

/**
 * PUT /api/recipes/[recipeId]/reviews/[reviewId]
 * Update a specific review
 */
export async function PUT(request, { params }) {
  try {
    const { recipeId, reviewId } = params;
    const body = await request.json();
    const { rating, comment, userId } = body;

    // Find the review
    const reviewIndex = reviews.findIndex(
      review => review.id === reviewId && review.recipeId === recipeId
    );

    if (reviewIndex === -1) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    const review = reviews[reviewIndex];

    // Check if user owns this review
    if (review.userId !== userId) {
      return NextResponse.json(
        { error: 'You can only edit your own reviews' },
        { status: 403 }
      );
    }

    // Validate rating
    if (rating && (rating < 1 || rating > 5 || !Number.isInteger(rating))) {
      return NextResponse.json(
        { error: 'Rating must be an integer between 1 and 5' },
        { status: 400 }
      );
    }

    // Update review
    const updatedReview = {
      ...review,
      rating: rating || review.rating,
      comment: comment ? comment.trim() : review.comment,
      updatedAt: new Date().toISOString()
    };

    reviews[reviewIndex] = updatedReview;

    return NextResponse.json(updatedReview);

  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/recipes/[recipeId]/reviews/[reviewId]
 * Delete a specific review
 */
export async function DELETE(request, { params }) {
  try {
    const { recipeId, reviewId } = params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Find the review
    const reviewIndex = reviews.findIndex(
      review => review.id === reviewId && review.recipeId === recipeId
    );

    if (reviewIndex === -1) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    const review = reviews[reviewIndex];

    // Check if user owns this review
    if (review.userId !== userId) {
      return NextResponse.json(
        { error: 'You can only delete your own reviews' },
        { status: 403 }
      );
    }

    // Remove review
    reviews.splice(reviewIndex, 1);

    return NextResponse.json({ message: 'Review deleted successfully' });

  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
