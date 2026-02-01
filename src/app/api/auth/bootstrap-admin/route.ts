import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { getSql } from "@/lib/db";

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

  const sql = getSql();

  const passwordHash = await bcrypt.hash(password, 10);

  // If user exists, promote to admin.
  const existing = (await sql`
    select id
    from users
    where lower(email) = ${email}
    limit 1
  `) as Array<{ id: string }>;

  if (existing[0]?.id) {
    await sql`
      update users
      set role = 'admin', password_hash = ${passwordHash}, updated_at = now()
      where id = ${existing[0].id}
    `;

    return NextResponse.json({ ok: true, userId: existing[0].id, promoted: true });
  }

  const userId = crypto.randomUUID();
  await sql`
    insert into users (id, email, password_hash, role, created_at, updated_at)
    values (${userId}, ${email}, ${passwordHash}, 'admin', now(), now())
  `;

  return NextResponse.json({ ok: true, userId, promoted: false });
}
