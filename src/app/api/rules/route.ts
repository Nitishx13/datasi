import { NextResponse } from "next/server";

import { getRulesConfig, setRulesConfig } from "@/lib/store";

export async function GET() {
  const config = await getRulesConfig();
  return NextResponse.json({ config: config ?? null });
}

export async function PUT(req: Request) {
  const body = (await req.json().catch(() => null)) as null | { config?: unknown };

  if (!body?.config) {
    return NextResponse.json({ error: "config is required" }, { status: 400 });
  }

  await setRulesConfig(body.config);

  return NextResponse.json({ ok: true });
}
