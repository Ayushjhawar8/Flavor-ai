import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const recipeId = parseInt(searchParams.get("recipeId"));
  if (!recipeId) return NextResponse.json([]);
  const ratings = await prisma.rating.findMany({ where: { recipeId } });
  return NextResponse.json(ratings);
}

export async function POST(req) {
  try {
    let { recipeId, value, recipeData } = await req.json();
    recipeId = parseInt(recipeId);
    if (!recipeId) return NextResponse.json({ error: "Missing or invalid recipeId" }, { status: 400 });

    // Ensure the recipe exists in the DB
    let recipe = await prisma.recipe.findUnique({ where: { id: recipeId } });
    if (!recipe) {
      if (!recipeData) {
        return NextResponse.json({ error: "Recipe data required for new recipe." }, { status: 400 });
      }
      // Create the recipe in the DB (minimal fields, expand as needed)
      recipe = await prisma.recipe.create({
        data: {
          id: recipeId,
          title: recipeData.strMeal,
          description: recipeData.strInstructions || "",
          ingredients: JSON.stringify([]),
          steps: JSON.stringify([]),
          userId: 1, // default userId
        }
      });
    }

    // Upsert: one rating per user per recipe
    const rating = await prisma.rating.upsert({
      where: { userId_recipeId: { userId: 1, recipeId } },
      update: { value },
      create: { userId: 1, recipeId, value },
    });
    return NextResponse.json(rating);
  } catch (error) {
    console.error("/api/rating error:", error);
    return NextResponse.json({ error: "Failed to submit rating." }, { status: 500 });
  }
} 