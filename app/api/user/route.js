import { PrismaClient } from '@/lib/generated/prisma';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export async function POST(req) {
  try {
    const { name, email, password, action } = await req.json();
    if (action === "register") {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) return NextResponse.json({ error: "User exists" }, { status: 400 });
      const hash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({ data: { name, email, password: hash } });
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
      return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email }, token });
    } else if (action === "login") {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
      return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email }, token });
    }
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("API /api/user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req) {
  const auth = req.headers.get("authorization");
  if (!auth) return NextResponse.json({ authenticated: false });
  try {
    const token = auth.replace("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) return NextResponse.json({ authenticated: false });
    return NextResponse.json({ authenticated: true, user: { id: user.id, name: user.name, email: user.email } });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
} 