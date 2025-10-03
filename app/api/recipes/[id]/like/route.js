import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Recipe from '@/models/Recipe';

export async function POST(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const { userId } = await request.json(); // Could be IP, session ID, or user ID
    
    let recipe = await Recipe.findOne({ recipeId: id });
    
    if (!recipe) {
      // Create new recipe document if it doesn't exist
      recipe = new Recipe({
        recipeId: id,
        likes: 1,
        likedBy: [userId],
      });
      await recipe.save();
      return NextResponse.json({ likes: recipe.likes, hasLiked: true });
    }
    
    const hasLiked = recipe.likedBy.includes(userId);
    
    if (hasLiked) {
      // Unlike
      recipe.likes = Math.max(0, recipe.likes - 1);
      recipe.likedBy = recipe.likedBy.filter(id => id !== userId);
    } else {
      // Like
      recipe.likes += 1;
      recipe.likedBy.push(userId);
    }
    
    await recipe.save();
    
    return NextResponse.json({ 
      likes: recipe.likes, 
      hasLiked: !hasLiked 
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const recipe = await Recipe.findOne({ recipeId: id });
    
    if (!recipe) {
      return NextResponse.json({ likes: 0, hasLiked: false });
    }
    
    const hasLiked = userId ? recipe.likedBy.includes(userId) : false;
    
    return NextResponse.json({ 
      likes: recipe.likes, 
      hasLiked 
    });
  } catch (error) {
    console.error('Error fetching likes:', error);
    return NextResponse.json({ error: 'Failed to fetch likes' }, { status: 500 });
  }
}