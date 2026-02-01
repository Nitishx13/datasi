"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import CampaignsTable from "@/components/CampaignsTable";
import SpendConversionsChart from "@/components/SpendConversionsChart";
import {
  computeCurrentRates,
  computeGaps,
  computeHealthScore,
  formatINR as formatINRGoal,
  formatPct,
} from "@/lib/goalEngine";
import { formatINR, getDashboardSummary } from "@/lib/mockData";
import type { GoalState } from "@/lib/goalStorage";
import { defaultRulesConfig } from "@/lib/rulesStorage";
import { getActiveUserId } from "@/lib/userContext";

function scoreTone(score: number) {
  if (score >= 75) return { label: "Green", cls: "text-emerald-700 bg-emerald-50 border-emerald-200" };
  if (score >= 50) return { label: "Yellow", cls: "text-amber-800 bg-amber-50 border-amber-200" };
  return { label: "Red", cls: "text-rose-800 bg-rose-50 border-rose-200" };
}

export default function AppDashboardPage() {
  const dashboard = getDashboardSummary();
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

  const goalDerived = useMemo(() => {
    if (!goalState) return null;
    const rates = computeCurrentRates(goalState.current);
    const gaps = computeGaps(goalState.targets, goalState.current);
    const healthScore = computeHealthScore(goalState.targets, goalState.current, rules ?? undefined);
    return { rates, gaps, healthScore };
  }, [goalState, rules]);

  const healthScore = goalDerived?.healthScore ?? dashboard.healthScore;
  const tone = scoreTone(healthScore);

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-zinc-600">Set your profit goal. We tell you what to fix.</p>
      </section>

      {!goalState ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold">Start with your goal</div>
              <div className="mt-1 text-sm text-zinc-600">
                Add daily spend, duration, profit goal, and revenue per conversion.
              </div>
            </div>
            <Link
              href="/app/onboarding"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Set my goal
            </Link>
          </div>
        </section>
      ) : (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold">Goal summary</div>
              <div className="mt-1 text-sm text-zinc-600">
                Total spend: <span className="font-semibold text-zinc-900">{formatINRGoal(goalState.targets.totalSpend)}</span>
                <span className="mx-2 text-zinc-300">|</span>
                Required revenue: <span className="font-semibold text-zinc-900">{formatINRGoal(goalState.targets.requiredRevenue)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/app/goal-summary"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                View details
              </Link>
              <Link
                href="/app/onboarding"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Edit goal
              </Link>
            </div>
          </div>

          {goalDerived ? (
            <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
              Your current CPA is {formatINRGoal(goalDerived.rates.currentCpa)} but to hit your goal it must be {formatINRGoal(goalState.targets.requiredCpa)}.
            </div>
          ) : null}
        </section>
      )}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs font-medium text-zinc-500">Total Spend (last 7 days)</div>
          <div className="mt-2 text-2xl font-semibold">{formatINR(dashboard.totalSpend7d)}</div>
          <div className="mt-1 text-xs text-zinc-500">Up 12% WoW</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs font-medium text-zinc-500">Leads / Sales (last 7 days)</div>
          <div className="mt-2 text-2xl font-semibold">{dashboard.leads7d}</div>
          <div className="mt-1 text-xs text-zinc-500">Down 6% WoW</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs font-medium text-zinc-500">Health Score</div>
          <div className="mt-3 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-zinc-200 bg-white">
              <div className="text-sm font-semibold">{healthScore}</div>
            </div>
            <div>
              <div className="text-sm font-semibold">{healthScore} / 100</div>
              <div className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${tone.cls}`}>
                {tone.label}
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs text-zinc-600">
            Based on CTR, CVR, CPA, and ROAS vs your goal.
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs font-medium text-zinc-500">Reality check</div>
          {!goalDerived ? (
            <div className="mt-2 text-sm text-zinc-700">Set a goal to see what must change.</div>
          ) : (
            <div className="mt-2 text-sm text-zinc-700">
              CTR: {formatPct(goalDerived.rates.currentCtr)} vs {formatPct(goalState?.targets.requiredCtr ?? 0)}
            </div>
          )}
          {goalDerived ? (
            <div className="mt-1 text-xs text-zinc-600">
              CVR gap: {formatPct(goalDerived.gaps.cvrGap)} • CTR gap: {formatPct(goalDerived.gaps.ctrGap)}
            </div>
          ) : null}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Spend vs Conversions (7 days)</div>
              <div className="text-xs text-zinc-500">If spend is up but conversions aren’t, something’s broken.</div>
            </div>
            <div className="text-xs text-zinc-500">Mock data</div>
          </div>
          <div className="mt-4">
            <SpendConversionsChart data={dashboard.trend7d} />
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-sm font-semibold">Top 3 issues today</div>
          <div className="mt-3 flex flex-col gap-3">
            {dashboard.topIssues.map((issue) => (
              <div key={issue.id} className="rounded-lg border border-zinc-200 p-3">
                <div className="text-sm font-semibold">{issue.type}</div>
                <div className="mt-1 text-xs text-zinc-600">{issue.reason}</div>
                <div className="mt-2 text-xs text-zinc-700">Next step: {issue.next}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Campaigns</div>
            <div className="text-xs text-zinc-500">Sorted by “needs attention” first.</div>
          </div>
          <Link href="/app/problems" className="text-sm font-medium text-zinc-900 underline">
            View all problems
          </Link>
        </div>
        <div className="mt-4">
          <CampaignsTable campaigns={dashboard.campaigns} />
        </div>
      </section>
    </div>
  );
}
