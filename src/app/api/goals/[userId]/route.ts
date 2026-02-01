import { NextRequest, NextResponse } from "next/server";

import { getSql } from "@/lib/db";

type GoalRow = {
  user_id: string;
  inputs: unknown;
  targets: unknown;
  current: unknown;
  saved_at: string;
};

export async function GET(_req: NextRequest, ctx: { params: Promise<{ userId: string }> }) {
  const { userId } = await ctx.params;
  const sql = getSql();

  const rows = (await sql`
    select user_id, inputs, targets, current, saved_at
    from goals
    where user_id = ${userId}
    limit 1
  `) as GoalRow[];

  const row = rows[0] ?? null;
  return NextResponse.json({ goal: row });
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ userId: string }> }) {
  const { userId } = await ctx.params;
  const sql = getSql();

  const body = (await req.json().catch(() => null)) as null | {
    inputs?: unknown;
    targets?: unknown;
    current?: unknown;
  };

  if (!body?.inputs || !body?.targets || !body?.current) {
    return NextResponse.json({ error: "inputs, targets, current are required" }, { status: 400 });
  }

  await sql`insert into users (id, email) values (${userId}, ${userId} || '@example.com') on conflict (id) do nothing`;

  const inputsJson = JSON.stringify(body.inputs);
  const targetsJson = JSON.stringify(body.targets);
  const currentJson = JSON.stringify(body.current);

  await sql`
    insert into goals (user_id, inputs, targets, current, saved_at)
    values (${userId}, ${inputsJson}::jsonb, ${targetsJson}::jsonb, ${currentJson}::jsonb, now())
    on conflict (user_id)
    do update set inputs = excluded.inputs, targets = excluded.targets, current = excluded.current, saved_at = now()
  `;

  const rows = (await sql`
    select user_id, inputs, targets, current, saved_at
    from goals
    where user_id = ${userId}
    limit 1
  `) as GoalRow[];

  return NextResponse.json({ goal: rows[0] ?? null });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ userId: string }> }) {
  const { userId } = await ctx.params;
  const sql = getSql();

  await sql`delete from goals where user_id = ${userId}`;
  return NextResponse.json({ ok: true });
}
