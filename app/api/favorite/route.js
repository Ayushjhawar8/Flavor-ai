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
  const userId = getUserId(req);
  if (!userId) return NextResponse.json([]);
  const favorites = await prisma.favorite.findMany({ where: { userId }, include: { recipe: true } });
  return NextResponse.json(favorites);
}

export async function POST(req) {
  try {
    const userId = getUserId(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    let { recipeId, recipeData } = await req.json();
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
    const favorite = await prisma.favorite.create({ data: { userId, recipeId } });
    return NextResponse.json(favorite);
  } catch (error) {
    console.error("/api/favorite error:", error);
    return NextResponse.json({ error: "Failed to add favorite." }, { status: 500 });
  }
}

export async function DELETE(req) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  await prisma.favorite.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 