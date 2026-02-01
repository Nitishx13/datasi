import { NextResponse } from "next/server";

import { ensureDefaults } from "@/lib/store";

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

  try {
    await ensureDefaults();
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message ?? e) }, { status: 500 });
  }
}
