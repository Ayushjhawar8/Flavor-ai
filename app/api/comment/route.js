import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

function getUserId(req) {
  const auth = req.headers.get("authorization");
  if (!auth) return null;
  try {
    const token = auth.replace("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET);
    return payload.userId;
  } catch {
    return null;
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const recipeId = parseInt(searchParams.get("recipeId"));
  if (!recipeId) return NextResponse.json([]);
  const comments = await prisma.comment.findMany({ where: { recipeId }, include: { user: true } });
  return NextResponse.json(comments);
}

export async function POST(req) {
  try {
    const userId = getUserId(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
          userId: userId,
        }
      });
    }
    const comment = await prisma.comment.create({ data: { recipeId, content, userId } });
    return NextResponse.json(comment);
  } catch (error) {
    console.error("/api/comment error:", error);
    return NextResponse.json({ error: "Failed to add comment." }, { status: 500 });
  }
}

export async function DELETE(req) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  await prisma.comment.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 