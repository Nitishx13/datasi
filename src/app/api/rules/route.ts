import { NextResponse } from "next/server";

import { getSql } from "@/lib/db";

export async function GET() {
  const sql = getSql();
  const rows = await sql<{ config: unknown }[]>`select config from rules_config where id = 1`;
  return NextResponse.json({ config: rows[0]?.config ?? null });
}

export async function PUT(req: Request) {
  const sql = getSql();
  const body = (await req.json().catch(() => null)) as null | { config?: unknown };

  if (!body?.config) {
    return NextResponse.json({ error: "config is required" }, { status: 400 });
  }

  await sql`
    insert into rules_config (id, config, updated_at)
    values (1, ${body.config}::jsonb, now())
    on conflict (id)
    do update set config = excluded.config, updated_at = now()
  `;

  return NextResponse.json({ ok: true });
}
