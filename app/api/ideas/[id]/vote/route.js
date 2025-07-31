import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Idea from '@/models/Idea';

// POST /api/ideas/[id]/vote - Vote for an idea
export async function POST(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Idea ID is required' },
        { status: 400 }
      );
    }
    
    const idea = await Idea.findById(id);
    
    if (!idea) {
      return NextResponse.json(
        { success: false, error: 'Idea not found' },
        { status: 404 }
      );
    }
    
    // In a production app, you'd want to:
    // 1. Get the user's IP or session ID
    // 2. Check if they've already voted
    // 3. Implement rate limiting
    
    idea.votes += 1;
    await idea.save();
    
    return NextResponse.json({
      success: true,
      data: {
        id: idea._id,
        votes: idea.votes
      }
    });
    
  } catch (error) {
    console.error('Error voting for idea:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to vote for idea' },
      { status: 500 }
    );
  }
}

// Add CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
}
