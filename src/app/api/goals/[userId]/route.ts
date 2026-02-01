import { NextRequest, NextResponse } from "next/server";

import { deleteGoal, getGoal, setGoal } from "@/lib/store";

type GoalRow = {
  user_id: string;
  inputs: unknown;
  targets: unknown;
  current: unknown;
  saved_at: string;
};

export async function GET(_req: NextRequest, ctx: { params: Promise<{ userId: string }> }) {
  const { userId } = await ctx.params;

  const goal = await getGoal(userId);
  return NextResponse.json({ goal: goal ?? null });
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ userId: string }> }) {
  const { userId } = await ctx.params;

  const body = (await req.json().catch(() => null)) as null | {
    inputs?: unknown;
    targets?: unknown;
    current?: unknown;
  };

  if (!body?.inputs || !body?.targets || !body?.current) {
    return NextResponse.json({ error: "inputs, targets, current are required" }, { status: 400 });
  }

  const goal: GoalRow = {
    user_id: userId,
    inputs: body.inputs,
    targets: body.targets,
    current: body.current,
    saved_at: new Date().toISOString(),
  };

  await setGoal(userId, goal);
  return NextResponse.json({ goal });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ userId: string }> }) {
  const { userId } = await ctx.params;

  await deleteGoal(userId);
  return NextResponse.json({ ok: true });
}
