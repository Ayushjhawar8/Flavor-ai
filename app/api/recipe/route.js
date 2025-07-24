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

export async function GET() {
  const recipes = await prisma.recipe.findMany({ include: { user: true, category: true, meal: true } });
  return NextResponse.json(recipes);
}

export async function POST(req) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const recipe = await prisma.recipe.create({ data: { ...data, userId } });
  return NextResponse.json(recipe);
}

export async function PUT(req) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...data } = await req.json();
  const recipe = await prisma.recipe.update({ where: { id }, data });
  return NextResponse.json(recipe);
}

export async function DELETE(req) {
  const userId = getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  await prisma.recipe.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 