"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  computeCurrentRates,
  computeGaps,
  formatINR,
  formatPct,
} from "@/lib/goalEngine";
import type { GoalState } from "@/lib/goalStorage";
import { getActiveUserId } from "@/lib/userContext";

export default function GoalSummaryPage() {
  const [state, setState] = useState<GoalState | null>(null);
  const userId = useMemo(() => getActiveUserId(), []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/goals/${userId}` as const, { cache: "no-store" });
        const json = (await res.json()) as { goal: any };
        const g = json?.goal;
        if (!g) {
          setState(null);
          return;
        }
        setState({
          inputs: g.inputs,
          targets: g.targets,
          current: g.current,
          savedAt: g.saved_at,
        });
      } catch {
        setState(null);
      }
    })();
  }, []);

  const derived = useMemo(() => {
    if (!state) return null;
    const rates = computeCurrentRates(state.current);
    const gaps = computeGaps(state.targets, state.current);
    return { rates, gaps };
  }, [state]);

  if (!state || !derived) {
    return (
      <div className="flex flex-col gap-6">
        <section>
          <h1 className="text-2xl font-semibold tracking-tight">Goal Summary</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Set your profit goal. We tell you what to fix.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">No goal set yet</div>
          <div className="mt-2 text-sm text-zinc-600">
            First set your daily spend, duration, profit goal, and revenue per conversion.
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
      </div>
    );
  }

  const { targets, current } = state;
  const { rates } = derived;

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Goal Summary</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Required vs Current — no math, only decisions.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs font-medium text-zinc-500">Total Spend</div>
          <div className="mt-2 text-lg font-semibold">{formatINR(targets.totalSpend)}</div>
          <div className="mt-1 text-xs text-zinc-500">Based on your daily spend × duration</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs font-medium text-zinc-500">Required Revenue</div>
          <div className="mt-2 text-lg font-semibold">{formatINR(targets.requiredRevenue)}</div>
          <div className="mt-1 text-xs text-zinc-500">Spend + desired profit</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs font-medium text-zinc-500">Required Conversions</div>
          <div className="mt-2 text-lg font-semibold">{targets.requiredConversions.toFixed(1)}</div>
          <div className="mt-1 text-xs text-zinc-500">Based on revenue per conversion</div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Reality check</div>
            <div className="mt-1 text-xs text-zinc-500">Required vs current performance</div>
          </div>
          <Link className="text-sm font-medium underline" href="/app">
            Back to dashboard
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="text-xs font-medium text-zinc-500">CPA</div>
            <div className="mt-2 text-sm text-zinc-600">
              Current: <span className="font-semibold text-zinc-900">{formatINR(rates.currentCpa)}</span>
            </div>
            <div className="mt-1 text-sm text-zinc-600">
              Required: <span className="font-semibold text-zinc-900">{formatINR(targets.requiredCpa)}</span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="text-xs font-medium text-zinc-500">CTR</div>
            <div className="mt-2 text-sm text-zinc-600">
              Current: <span className="font-semibold text-zinc-900">{formatPct(rates.currentCtr)}</span>
            </div>
            <div className="mt-1 text-sm text-zinc-600">
              Required: <span className="font-semibold text-zinc-900">{formatPct(targets.requiredCtr)}</span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="text-xs font-medium text-zinc-500">CVR</div>
            <div className="mt-2 text-sm text-zinc-600">
              Current: <span className="font-semibold text-zinc-900">{formatPct(rates.currentCvr)}</span>
            </div>
            <div className="mt-1 text-sm text-zinc-600">
              Required: <span className="font-semibold text-zinc-900">{formatPct(targets.requiredCvr)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
          Your current CPA is {formatINR(rates.currentCpa)} but to hit your goal it must be {formatINR(targets.requiredCpa)}.
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="text-xs font-medium text-zinc-500">Current metrics (mock)</div>
            <div className="mt-2 text-sm text-zinc-700">Impressions: {current.impressions.toLocaleString()}</div>
            <div className="mt-1 text-sm text-zinc-700">Clicks: {current.clicks.toLocaleString()}</div>
            <div className="mt-1 text-sm text-zinc-700">Conversions: {current.conversions.toLocaleString()}</div>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="text-xs font-medium text-zinc-500">Spend & revenue (mock)</div>
            <div className="mt-2 text-sm text-zinc-700">Spend: {formatINR(current.spend)}</div>
            <div className="mt-1 text-sm text-zinc-700">Revenue: {formatINR(current.revenue)}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
