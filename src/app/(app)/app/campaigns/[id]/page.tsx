import Link from "next/link";

import {
  formatINR,
  formatPct,
  getCampaignById,
  getProblemsByCampaignId,
} from "@/lib/mockData";

const severityStyles: Record<string, string> = {
  Low: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Medium: "bg-amber-50 text-amber-800 border-amber-200",
  High: "bg-rose-50 text-rose-800 border-rose-200",
};

export default async function AppCampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const campaign = getCampaignById(id);

  if (!campaign) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <div className="text-lg font-semibold">Campaign not found</div>
        <div className="mt-1 text-sm text-zinc-600">
          This is mock mode. Try: <code className="rounded bg-zinc-100 px-1">cmp_101</code>,{" "}
          <code className="rounded bg-zinc-100 px-1">cmp_202</code>, or{" "}
          <code className="rounded bg-zinc-100 px-1">cmp_303</code>.
        </div>
        <div className="mt-4">
          <Link className="underline" href="/app">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const problems = getProblemsByCampaignId(campaign.id);

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-1">
        <div className="text-xs text-zinc-500">{campaign.platform} campaign</div>
        <h1 className="text-2xl font-semibold tracking-tight">{campaign.name}</h1>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <div className="rounded-full border border-zinc-200 bg-white px-3 py-1">
            Spend: <span className="font-medium">{formatINR(campaign.spend)}</span>
          </div>
          <div className="rounded-full border border-zinc-200 bg-white px-3 py-1">
            CTR: <span className="font-medium">{formatPct(campaign.ctr)}</span>
          </div>
          <div className="rounded-full border border-zinc-200 bg-white px-3 py-1">
            CPC: <span className="font-medium">{formatINR(campaign.cpc)}</span>
          </div>
          <div className="rounded-full border border-zinc-200 bg-white px-3 py-1">
            Conversions: <span className="font-medium">{campaign.conversions}</span>
          </div>
          <div className="rounded-full border border-zinc-200 bg-white px-3 py-1">
            Health score: <span className="font-medium">{campaign.healthScore}/100</span>
          </div>
        </div>
        <p className="mt-3 text-sm text-zinc-600">
          Straight take: this campaign is doing okay overall, but the issues below are where performance is leaking.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-sm font-semibold">Problems detected</div>
          <div className="mt-3 flex flex-col gap-3">
            {problems.length === 0 ? (
              <div className="text-sm text-zinc-600">No major problems detected (mock).</div>
            ) : (
              problems.map((p) => (
                <div key={p.id} className="rounded-lg border border-zinc-200 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{p.type}</div>
                      <div className="mt-1 text-xs text-zinc-600">{p.reason}</div>
                    </div>
                    <div
                      className={`shrink-0 rounded-full border px-2 py-1 text-xs font-medium ${
                        severityStyles[p.severity] ??
                        "bg-zinc-50 text-zinc-700 border-zinc-200"
                      }`}
                    >
                      {p.severity}
                    </div>
                  </div>
                  <div className="mt-3 text-xs font-semibold text-zinc-900">Suggested fix</div>
                  <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700">
                    {p.recommendations.slice(0, 3).map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-sm font-semibold">Performance graph</div>
          <div className="mt-2 text-xs text-zinc-500">Mock placeholder (wire to daily metrics later)</div>
          <div className="mt-4 h-64 rounded-lg border border-zinc-200 bg-zinc-50" />

          <div className="mt-6 text-sm font-semibold">Quick guidance</div>
          <div className="mt-3 space-y-3 text-sm text-zinc-700">
            <div className="rounded-lg border border-zinc-200 p-3">
              <div className="font-semibold">If CTR is low</div>
              <div className="mt-1 text-zinc-600">
                Creative issue hai. People are not stopping. Change hook, offer angle, and first frame.
              </div>
            </div>
            <div className="rounded-lg border border-zinc-200 p-3">
              <div className="font-semibold">If CTR is high but conversions are low</div>
              <div className="mt-1 text-zinc-600">
                Landing page issue hai. Fix speed, trust, and reduce friction.
              </div>
            </div>
            <div className="rounded-lg border border-zinc-200 p-3">
              <div className="font-semibold">If spend is high with 0 conversions</div>
              <div className="mt-1 text-zinc-600">
                Tracking/objective mismatch. Before scaling, verify pixel + event mapping.
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm">
            <Link className="underline" href="/app/problems">
              Go to Problems
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
