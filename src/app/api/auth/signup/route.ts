import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { getSql } from "@/lib/db";
import { getSessionCookieName } from "@/lib/auth";

function newId() {
  return crypto.randomUUID();
}

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

  if (!email || password.length < 6) {
    return NextResponse.json({ error: "email and password (min 6 chars) required" }, { status: 400 });
  }

  const sql = getSql();

  const userId = newId();
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await sql`
      insert into users (id, email, password_hash, role, created_at, updated_at)
      values (${userId}, ${email}, ${passwordHash}, 'user', now(), now())
    `;
  } catch (e: any) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const token = newToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

  await sql`
    insert into sessions (token, user_id, created_at, expires_at)
    values (${token}, ${userId}, now(), ${expiresAt.toISOString()})
  `;

  const res = NextResponse.json({ user: { id: userId, email, role: "user" } });
  res.cookies.set(getSessionCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });

  return res;
}
