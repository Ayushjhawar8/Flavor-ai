import { NextResponse } from "next/server";

// Mock data storage (in production, this would be a database)
let reviews = [];
let reviewVotes = {};

/**
 * POST /api/recipes/[recipeId]/reviews/[reviewId]/vote
 * Vote on a review (helpful/not helpful)
 */
export async function POST(request, { params }) {
  try {
    const { recipeId, reviewId } = params;
    const body = await request.json();
    const { userId, voteType } = body; // voteType: 'helpful' or 'notHelpful'

    // Validate vote type
    if (!['helpful', 'notHelpful'].includes(voteType)) {
      return NextResponse.json(
        { error: 'Invalid vote type. Must be "helpful" or "notHelpful"' },
        { status: 400 }
      );
    }

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

    // Check if user is trying to vote on their own review
    if (review.userId === userId) {
      return NextResponse.json(
        { error: 'You cannot vote on your own review' },
        { status: 403 }
      );
    }

    // Get or create vote record for this review
    if (!reviewVotes[reviewId]) {
      reviewVotes[reviewId] = {};
    }

    const userVoteKey = `${userId}_${reviewId}`;
    const currentVote = reviewVotes[reviewId][userVoteKey];

    // If user is voting the same way, remove the vote
    if (currentVote === voteType) {
      delete reviewVotes[reviewId][userVoteKey];
      
      // Update review vote counts
      if (voteType === 'helpful') {
        review.helpfulVotes = Math.max(0, (review.helpfulVotes || 0) - 1);
      } else {
        review.notHelpfulVotes = Math.max(0, (review.notHelpfulVotes || 0) - 1);
      }
    } else {
      // If user had a different vote, remove the old vote first
      if (currentVote) {
        if (currentVote === 'helpful') {
          review.helpfulVotes = Math.max(0, (review.helpfulVotes || 0) - 1);
        } else {
          review.notHelpfulVotes = Math.max(0, (review.notHelpfulVotes || 0) - 1);
        }
      }

      // Add new vote
      reviewVotes[reviewId][userVoteKey] = voteType;
      
      // Update review vote counts
      if (voteType === 'helpful') {
        review.helpfulVotes = (review.helpfulVotes || 0) + 1;
      } else {
        review.notHelpfulVotes = (review.notHelpfulVotes || 0) + 1;
      }
    }

    // Update the review
    reviews[reviewIndex] = review;

    return NextResponse.json({
      message: 'Vote updated successfully',
      review: {
        id: review.id,
        helpfulVotes: review.helpfulVotes || 0,
        notHelpfulVotes: review.notHelpfulVotes || 0,
        userVote: reviewVotes[reviewId][userVoteKey] || null
      }
    });

  } catch (error) {
    console.error('Error voting on review:', error);
    return NextResponse.json(
      { error: 'Failed to vote on review' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/recipes/[recipeId]/reviews/[reviewId]/vote
 * Get user's vote status for a review
 */
export async function GET(request, { params }) {
  try {
    const { recipeId, reviewId } = params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Find the review
    const review = reviews.find(
      review => review.id === reviewId && review.recipeId === recipeId
    );

    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    // Get user's vote
    const userVoteKey = `${userId}_${reviewId}`;
    const userVote = reviewVotes[reviewId]?.[userVoteKey] || null;

    return NextResponse.json({
      userVote,
      helpfulVotes: review.helpfulVotes || 0,
      notHelpfulVotes: review.notHelpfulVotes || 0
    });

  } catch (error) {
    console.error('Error getting vote status:', error);
    return NextResponse.json(
      { error: 'Failed to get vote status' },
      { status: 500 }
    );
  }
}
