import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Idea from '@/models/Idea';

// GET /api/ideas - Get all ideas
// GET /api/ideas?sort=top - Get top voted ideas
// GET /api/ideas?sort=new - Get newest ideas (default)
export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort') || 'new';
    
    let sortOption = {};
    if (sort === 'top') {
      sortOption = { votes: -1, createdAt: -1 };
    } else {
      sortOption = { createdAt: -1 };
    }
    
    const ideas = await Idea.find({}).sort(sortOption).limit(100);
    
    return NextResponse.json({ success: true, data: ideas });
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch ideas' },
      { status: 500 }
    );
  }
}

// POST /api/ideas - Create a new idea
export async function POST(request) {
  try {
    await dbConnect();
    
    const { idea, name } = await request.json();
    
    // Basic validation
    if (!idea || !idea.trim()) {
      return NextResponse.json(
        { success: false, error: 'Idea is required' },
        { status: 400 }
      );
    }
    
    // Create new idea
    const newIdea = await Idea.create({
      idea: idea.trim(),
      name: name ? name.trim() : 'Anonymous',
      votes: 0
    });
    
    return NextResponse.json(
      { success: true, data: newIdea },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating idea:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create idea' },
      { status: 500 }
    );
  }
}

// Add CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
}
