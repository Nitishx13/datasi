import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import { getSessionCookieName } from "@/lib/auth";
import { getSql } from "@/lib/db";

export async function POST(req: Request) {
  const cookieName = getSessionCookieName();
  const token = (await cookies()).get(cookieName)?.value;

  const sql = getSql();
  if (token) {
    await sql`delete from sessions where token = ${token}`;
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });

  return res;
}
