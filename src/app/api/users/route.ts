import { NextResponse } from "next/server";

import { getSql } from "@/lib/db";

export async function GET() {
  const sql = getSql();
  const rows = (await sql`
    select id, email, created_at
    from users
    order by created_at desc
  `) as Array<{ id: string; email: string; created_at: string }>;

  return NextResponse.json({ users: rows });
}

export async function POST(req: Request) {
  const sql = getSql();
  const body = (await req.json().catch(() => null)) as null | { id?: string; email?: string };
  const id = body?.id?.trim();
  const email = body?.email?.trim();

  if (!id || !email) {
    return NextResponse.json({ error: "id and email are required" }, { status: 400 });
  }

  await sql`insert into users (id, email) values (${id}, ${email}) on conflict (id) do update set email = excluded.email`;

  const rows = (await sql`
    select id, email, created_at
    from users
    where id = ${id}
    limit 1
  `) as Array<{ id: string; email: string; created_at: string }>;

  return NextResponse.json({ user: rows[0] ?? null });
}
