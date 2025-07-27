import dbConnect from "@/lib/mongodb";
import Recipe from "@/lib/models/Recipe";
import { NextResponse } from "next/server";

// POST /api/recipes - Save a new recipe
export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    const recipe = await Recipe.create(data);
    return NextResponse.json({ success: true, recipe });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// GET /api/recipes - Get all recipes
export async function GET() {
  try {
    await dbConnect();
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, recipes });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}