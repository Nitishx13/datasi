import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { getSessionCookieName } from "@/lib/auth";
import { getSql } from "@/lib/db";

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

  const sql = getSql();
  const rows = (await sql`
    select id, email, role, password_hash
    from users
    where lower(email) = ${email}
    limit 1
  `) as Array<{ id: string; email: string; role: string; password_hash: string | null }>;

  const user = rows[0];
  if (!user?.password_hash) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = newToken();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

  await sql`
    insert into sessions (token, user_id, created_at, expires_at)
    values (${token}, ${user.id}, now(), ${expiresAt.toISOString()})
  `;

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
