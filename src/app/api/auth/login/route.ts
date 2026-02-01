import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { getSessionCookieName } from "@/lib/auth";
import { createSession, getUserByEmail } from "@/lib/store";

function newToken() {
  return crypto.randomUUID() + crypto.randomUUID();
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as null | {
    email?: string;
    password?: string;
  };

  const email = body?.email?.trim().toLowerCase();
  const password = body?.password ?? "";

  if (!email || !password) {
    return NextResponse.json({ error: "email and password required" }, { status: 400 });
  }

  const user = await getUserByEmail(email);
  if (!user?.passwordHash) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = newToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

  await createSession(user.id, token, expiresAt);

  const res = NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } });
  res.cookies.set(getSessionCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });

  return res;
}
