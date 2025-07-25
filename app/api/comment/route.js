import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const recipeId = parseInt(searchParams.get("recipeId"));
  if (!recipeId) return NextResponse.json([]);
  const comments = await prisma.comment.findMany({ where: { recipeId }, include: { user: true } });
  return NextResponse.json(comments);
}

export async function POST(req) {
  try {
    let { recipeId, content, recipeData } = await req.json();
    recipeId = parseInt(recipeId);
    if (!recipeId) return NextResponse.json({ error: "Missing recipeId" }, { status: 400 });
    // Ensure the recipe exists in the DB
    let recipe = await prisma.recipe.findUnique({ where: { id: recipeId } });
    if (!recipe) {
      if (!recipeData) {
        return NextResponse.json({ error: "Recipe data required for new recipe." }, { status: 400 });
      }
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
    const comment = await prisma.comment.create({ data: { recipeId, content, userId: 1 } });
    return NextResponse.json(comment);
  } catch (error) {
    console.error("/api/comment error:", error);
    return NextResponse.json({ error: "Failed to add comment." }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json();
  await prisma.comment.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 