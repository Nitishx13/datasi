import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { createUser, listUsers } from "@/lib/store";

export async function GET() {
  const users = await listUsers();
  const rows = users.map((u) => ({ id: u.id, email: u.email, created_at: u.createdAt }));
  return NextResponse.json({ users: rows });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as null | { id?: string; email?: string };
  const id = body?.id?.trim();
  const email = body?.email?.trim();

  if (!id || !email) {
    return NextResponse.json({ error: "id and email are required" }, { status: 400 });
  }

  // Admin-created users get a random password hash (they can still use /auth/signup later).
  const passwordHash = await bcrypt.hash(crypto.randomUUID(), 10);
  try {
    const user = await createUser({ id, email, passwordHash, role: "user" });
    return NextResponse.json({ user: { id: user.id, email: user.email, created_at: user.createdAt } });
  } catch {
    // If already exists, return existing row.
    const users = await listUsers();
    const u = users.find((x) => x.id === id) ?? null;
    return NextResponse.json({ user: u ? { id: u.id, email: u.email, created_at: u.createdAt } : null });
  }
}
