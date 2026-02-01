import { NextResponse } from "next/server";

import { listRecommendationTemplates, replaceRecommendationTemplates } from "@/lib/store";

type TemplateRow = {
  id: string;
  title: string;
  bullets: unknown;
  enabled: boolean;
  impact_multiplier: number;
  updated_at: string;
};

export async function GET() {
  const templates = await listRecommendationTemplates();
  return NextResponse.json({ templates });
}

export async function PUT(req: Request) {
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

  await replaceRecommendationTemplates(templates as any);

  return NextResponse.json({ ok: true });
}
