"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import {
  computeGoalTargets,
  defaultCurrentMetrics,
  formatINR,
  formatPct,
} from "@/lib/goalEngine";
import { getActiveUserId } from "@/lib/userContext";

type FieldState = {
  dailySpend: string;
  durationDays: string;
  desiredProfit: string;
  revenuePerConversion: string;
};

function toPositiveNumber(raw: string) {
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export default function OnboardingPage() {
  const router = useRouter();
  const userId = useMemo(() => getActiveUserId(), []);
  const [fields, setFields] = useState<FieldState>({
    dailySpend: "1500",
    durationDays: "30",
    desiredProfit: "50000",
    revenuePerConversion: "5000",
  });
  const [error, setError] = useState<string | null>(null);

  const preview = useMemo(() => {
    const dailySpend = toPositiveNumber(fields.dailySpend);
    const durationDays = toPositiveNumber(fields.durationDays);
    const desiredProfit = toPositiveNumber(fields.desiredProfit);
    const revenuePerConversion = toPositiveNumber(fields.revenuePerConversion);
    if (!dailySpend || !durationDays || !desiredProfit || !revenuePerConversion) return null;

    const inputs = { dailySpend, durationDays, desiredProfit, revenuePerConversion };
    const targets = computeGoalTargets(inputs, defaultCurrentMetrics);
    return { inputs, targets };
  }, [fields]);

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Goal setup</h1>
        <p className="mt-1 text-sm text-zinc-600">Set your profit goal. We tell you what to fix.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <form
          className="rounded-2xl border border-zinc-200 bg-white p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setError(null);

            const dailySpend = toPositiveNumber(fields.dailySpend);
            const durationDays = toPositiveNumber(fields.durationDays);
            const desiredProfit = toPositiveNumber(fields.desiredProfit);
            const revenuePerConversion = toPositiveNumber(fields.revenuePerConversion);

            if (!dailySpend || !durationDays || !desiredProfit || !revenuePerConversion) {
              setError("Please enter valid numbers (greater than zero).");
              return;
            }

            const inputs = { dailySpend, durationDays, desiredProfit, revenuePerConversion };
            const targets = computeGoalTargets(inputs, defaultCurrentMetrics);

            (async () => {
              try {
                const res = await fetch(`/api/goals/${userId}` as const, {
                  method: "PUT",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({
                    inputs,
                    targets,
                    current: defaultCurrentMetrics,
                  }),
                });

                if (!res.ok) {
                  setError("Failed to save goal. Please try again.");
                  return;
                }

                router.push("/app/goal-summary");
              } catch {
                setError("Failed to save goal. Please try again.");
              }
            })();
          }}
        >
          <div className="text-sm font-semibold">Your numbers</div>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-600">Daily Spend (₹)</span>
              <input
                inputMode="numeric"
                value={fields.dailySpend}
                onChange={(e) => setFields((s) => ({ ...s, dailySpend: e.target.value }))}
                className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-400"
                placeholder="e.g. 1500"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-600">Campaign Duration (days)</span>
              <input
                inputMode="numeric"
                value={fields.durationDays}
                onChange={(e) => setFields((s) => ({ ...s, durationDays: e.target.value }))}
                className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-400"
                placeholder="e.g. 30"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-600">Desired Profit (₹)</span>
              <input
                inputMode="numeric"
                value={fields.desiredProfit}
                onChange={(e) => setFields((s) => ({ ...s, desiredProfit: e.target.value }))}
                className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-400"
                placeholder="e.g. 50000"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-600">Revenue per Conversion (₹)</span>
              <input
                inputMode="numeric"
                value={fields.revenuePerConversion}
                onChange={(e) => setFields((s) => ({ ...s, revenuePerConversion: e.target.value }))}
                className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-400"
                placeholder="e.g. 5000"
              />
            </label>
          </div>

          {error ? <div className="mt-3 text-sm text-rose-700">{error}</div> : null}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Calculate My Target
            </button>
            <Link
              href="/app"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Skip for now
            </Link>
          </div>

          <div className="mt-3 text-xs text-zinc-500">
            Tip: connect ads later. For now we’ll use mock current metrics.
          </div>
        </form>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Preview</div>
          <div className="mt-2 text-sm text-zinc-600">
            This is what your goal roughly means.
          </div>

          {!preview ? (
            <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
              Enter all values to see preview.
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-3">
              <div className="rounded-xl border border-zinc-200 p-4">
                <div className="text-xs font-medium text-zinc-500">Total Spend</div>
                <div className="mt-2 text-lg font-semibold">{formatINR(preview.targets.totalSpend)}</div>
              </div>
              <div className="rounded-xl border border-zinc-200 p-4">
                <div className="text-xs font-medium text-zinc-500">Required CPA</div>
                <div className="mt-2 text-lg font-semibold">{formatINR(preview.targets.requiredCpa)}</div>
              </div>
              <div className="rounded-xl border border-zinc-200 p-4">
                <div className="text-xs font-medium text-zinc-500">Required CTR / CVR</div>
                <div className="mt-2 text-sm text-zinc-700">
                  CTR: <span className="font-semibold">{formatPct(preview.targets.requiredCtr)}</span>
                </div>
                <div className="mt-1 text-sm text-zinc-700">
                  CVR: <span className="font-semibold">{formatPct(preview.targets.requiredCvr)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
            Ads are getting clicks, but not enough conversions to make profit — we’ll tell you what to fix.
          </div>
        </div>
      </section>
    </div>
  );
}
