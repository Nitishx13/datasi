"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { deriveRecommendations } from "@/lib/goalEngine";
import type { GoalState } from "@/lib/goalStorage";
import { getActiveUserId } from "@/lib/userContext";

export default function RecommendationsPage() {
  const [goalState, setGoalState] = useState<GoalState | null>(null);
  const userId = useMemo(() => getActiveUserId(), []);
  const [templates, setTemplates] = useState<any[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [goalRes, tplRes] = await Promise.all([
          fetch(`/api/goals/${userId}` as const, { cache: "no-store" }),
          fetch("/api/recommendations", { cache: "no-store" }),
        ]);

        const goalJson = (await goalRes.json()) as { goal: any };
        const g = goalJson?.goal;
        if (g) {
          setGoalState({ inputs: g.inputs, targets: g.targets, current: g.current, savedAt: g.saved_at });
        } else {
          setGoalState(null);
        }

        const tplJson = (await tplRes.json()) as { templates?: any[] };
        setTemplates(Array.isArray(tplJson.templates) ? tplJson.templates : []);
      } catch {
        setGoalState(null);
        setTemplates([]);
      }
    })();
  }, []);

  const recs = useMemo(() => {
    if (!goalState) return null;

    const enabledTemplates = (templates ?? []).filter((t) => t.enabled !== false);
    if (enabledTemplates.length > 0) {
      const baseline = deriveRecommendations(goalState.inputs, goalState.targets, goalState.current);
      const baselineById = new Map(baseline.map((b) => [b.id, b] as const));

      return enabledTemplates
        .map((t) => {
          const base = baselineById.get(t.id);
          const impactScore = (base?.impactScore ?? 1) * (t.impactMultiplier || 1);
          return {
            id: t.id,
            title: t.title,
            bullets: t.bullets,
            impactScore,
          };
        })
        .sort((a, b) => b.impactScore - a.impactScore);
    }

    return deriveRecommendations(goalState.inputs, goalState.targets, goalState.current);
  }, [goalState, templates]);

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Recommendations</h1>
        <p className="mt-1 text-sm text-zinc-600">A simple action list, sorted by impact on profit.</p>
      </section>

      {!goalState ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Set a goal first</div>
          <div className="mt-2 text-sm text-zinc-600">
            We need your profit goal to generate the right fixes.
          </div>
          <div className="mt-4">
            <Link
              href="/app/onboarding"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Go to Goal Setup
            </Link>
          </div>
        </section>
      ) : recs && recs.length === 0 ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">No big fixes needed</div>
          <div className="mt-2 text-sm text-zinc-600">
            Based on your current numbers, you’re close to your target.
          </div>
          <div className="mt-4 flex gap-3">
            <Link className="text-sm font-medium underline" href="/app/goal-summary">
              View goal summary
            </Link>
            <Link className="text-sm font-medium underline" href="/app/problems">
              View problems
            </Link>
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm font-semibold">Action list</div>
            <Link href="/app/problems" className="text-sm font-medium underline">
              Back to problems
            </Link>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {(recs ?? []).map((r) => (
              <div key={r.id} className="rounded-xl border border-zinc-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{r.title}</div>
                    <div className="mt-1 text-xs text-zinc-600">Do this first. It moves the needle faster.</div>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-900 hover:bg-zinc-50"
                  >
                    Mark done
                  </button>
                </div>
                <ul className="mt-3 list-disc pl-5 text-sm text-zinc-700">
                  {r.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-zinc-500">UI only (state not persisted).</div>
        </section>
      )}
    </div>
  );
}
