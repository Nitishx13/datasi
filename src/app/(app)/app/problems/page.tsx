"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { deriveProblems } from "@/lib/goalEngine";
import type { GoalState } from "@/lib/goalStorage";
import { defaultRulesConfig } from "@/lib/rulesStorage";
import { getActiveUserId } from "@/lib/userContext";

const severityStyles: Record<string, string> = {
  Low: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Medium: "bg-amber-50 text-amber-800 border-amber-200",
  Critical: "bg-rose-50 text-rose-800 border-rose-200",
};

export default function AppProblemsPage() {
  const [goalState, setGoalState] = useState<GoalState | null>(null);
  const [rules, setRules] = useState<any | null>(null);
  const userId = useMemo(() => getActiveUserId(), []);

  useEffect(() => {
    (async () => {
      try {
        const [rulesRes, goalRes] = await Promise.all([
          fetch("/api/rules", { cache: "no-store" }),
          fetch(`/api/goals/${userId}` as const, { cache: "no-store" }),
        ]);
        const rulesJson = (await rulesRes.json()) as { config: any };
        setRules(rulesJson?.config ?? defaultRulesConfig);

        const goalJson = (await goalRes.json()) as { goal: any };
        const g = goalJson?.goal;
        if (!g) {
          setGoalState(null);
          return;
        }
        setGoalState({
          inputs: g.inputs,
          targets: g.targets,
          current: g.current,
          savedAt: g.saved_at,
        });
      } catch {
        setRules(defaultRulesConfig);
        setGoalState(null);
      }
    })();
  }, []);

  const problems = useMemo(() => {
    if (!goalState) return null;
    return deriveProblems(goalState.inputs, goalState.targets, goalState.current, rules ?? undefined);
  }, [goalState, rules]);

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Problems</h1>
        <p className="text-sm text-zinc-600">Simple diagnostics. No jargon. Only what to fix.</p>
      </section>

      {!goalState ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Set a goal first</div>
          <div className="mt-2 text-sm text-zinc-600">
            Once you set your profit goal, we’ll show what’s blocking it.
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
      ) : problems && problems.length === 0 ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Looks good</div>
          <div className="mt-2 text-sm text-zinc-600">
            Based on the current numbers, your goal looks achievable.
          </div>
          <div className="mt-4">
            <Link className="text-sm font-medium underline" href="/app/recommendations">
              View recommendations
            </Link>
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {(problems ?? []).map((p) => (
            <div key={p.id} className="rounded-xl border border-zinc-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{p.type}</div>
                  <div className="mt-1 text-xs text-zinc-500">{p.metricGapLabel}</div>
                </div>
                <div
                  className={`shrink-0 rounded-full border px-2 py-1 text-xs font-medium ${
                    severityStyles[p.severity] ?? "bg-zinc-50 text-zinc-700 border-zinc-200"
                  }`}
                >
                  {p.severity}
                </div>
              </div>

              <div className="mt-3 text-sm text-zinc-700">{p.summary}</div>

              <div className="mt-4 flex gap-2">
                <Link
                  href="/app/recommendations"
                  className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
                >
                  See fixes
                </Link>
                <Link
                  href="/app/goal-summary"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
                >
                  View goal
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
