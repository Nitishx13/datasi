import { NextResponse } from "next/server";

import { getSql } from "@/lib/db";

const SCHEMA_SQL = `
create table if not exists users (
  id text primary key,
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists goals (
  user_id text primary key references users(id) on delete cascade,
  inputs jsonb not null,
  targets jsonb not null,
  current jsonb not null,
  saved_at timestamptz not null default now()
);

create table if not exists rules_config (
  id int primary key default 1,
  config jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists recommendation_templates (
  id text primary key,
  title text not null,
  bullets jsonb not null,
  enabled boolean not null default true,
  impact_multiplier double precision not null default 1,
  updated_at timestamptz not null default now()
);

insert into rules_config (id, config)
values (
  1,
  '{"healthWeights":{"ctr":25,"cvr":30,"cpa":30,"roas":15},"severityThresholds":{"critical":0.35,"medium":0.15}}'::jsonb
)
on conflict (id) do nothing;
`;

function isAuthorized(req: Request) {
  const expected = process.env.INIT_DB_SECRET;
  if (!expected) return false;

  const provided = req.headers.get("x-init-secret") ?? "";
  return provided === expected;
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getSql();

  try {
    // Execute statements sequentially
    const statements = SCHEMA_SQL.split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const stmt of statements) {
      await sql(stmt);
    }

    return NextResponse.json({ ok: true, statements: statements.length });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}
