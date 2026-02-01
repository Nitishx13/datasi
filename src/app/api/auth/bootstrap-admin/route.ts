import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { upsertAdminByEmail } from "@/lib/store";

function isAuthorized(req: Request) {
  const expected = process.env.BOOTSTRAP_ADMIN_SECRET;
  if (!expected) return false;
  const provided = req.headers.get("x-bootstrap-secret") ?? "";
  return provided === expected;
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as null | { email?: string; password?: string };
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password ?? "";

  if (!email || password.length < 6) {
    return NextResponse.json({ error: "email and password (min 6 chars) required" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const result = await upsertAdminByEmail(email, passwordHash);
  return NextResponse.json({ ok: true, userId: result.user.id, promoted: result.promoted });
}
