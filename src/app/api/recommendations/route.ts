import { NextResponse } from "next/server";

import { getSql } from "@/lib/db";

type TemplateRow = {
  id: string;
  title: string;
  bullets: unknown;
  enabled: boolean;
  impact_multiplier: number;
  updated_at: string;
};

export async function GET() {
  const sql = getSql();
  const rows = await sql<TemplateRow[]>`
    select id, title, bullets, enabled, impact_multiplier, updated_at
    from recommendation_templates
    order by updated_at desc
  `;

  const templates = rows.map((r) => ({
    id: r.id,
    title: r.title,
    bullets: Array.isArray(r.bullets) ? r.bullets : [],
    enabled: !!r.enabled,
    impactMultiplier: Number(r.impact_multiplier),
  }));

  return NextResponse.json({ templates });
}

export async function PUT(req: Request) {
  const sql = getSql();
  const body = (await req.json().catch(() => null)) as null | {
    templates?: Array<{
      id: string;
      title: string;
      bullets: string[];
      enabled: boolean;
      impactMultiplier: number;
    }>;
  };

  const templates = body?.templates;
  if (!Array.isArray(templates)) {
    return NextResponse.json({ error: "templates array is required" }, { status: 400 });
  }

  await sql`delete from recommendation_templates`;

  for (const t of templates) {
    if (!t?.id || !t?.title) continue;
    await sql`
      insert into recommendation_templates (id, title, bullets, enabled, impact_multiplier, updated_at)
      values (
        ${t.id},
        ${t.title},
        ${JSON.stringify(t.bullets ?? [])}::jsonb,
        ${t.enabled !== false},
        ${Number.isFinite(Number(t.impactMultiplier)) ? Number(t.impactMultiplier) : 1},
        now()
      )
    `;
  }

  return NextResponse.json({ ok: true });
}
