"use client";

import { useEffect, useMemo, useState } from "react";

import { defaultRulesConfig } from "@/lib/rulesStorage";

type FieldState = {
  weightCtr: string;
  weightCvr: string;
  weightCpa: string;
  weightRoas: string;
  severityCritical: string;
  severityMedium: string;
};

function toNumber(raw: string, fallback: number) {
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return n;
}

export default function AdminRulesPage() {
  const [fields, setFields] = useState<FieldState>({
    weightCtr: String(defaultRulesConfig.healthWeights.ctr),
    weightCvr: String(defaultRulesConfig.healthWeights.cvr),
    weightCpa: String(defaultRulesConfig.healthWeights.cpa),
    weightRoas: String(defaultRulesConfig.healthWeights.roas),
    severityCritical: String(defaultRulesConfig.severityThresholds.critical),
    severityMedium: String(defaultRulesConfig.severityThresholds.medium),
  });
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/rules", { cache: "no-store" });
        const json = (await res.json()) as { config: any };
        const cfg = json?.config ?? defaultRulesConfig;
        setFields({
          weightCtr: String(cfg.healthWeights?.ctr ?? defaultRulesConfig.healthWeights.ctr),
          weightCvr: String(cfg.healthWeights?.cvr ?? defaultRulesConfig.healthWeights.cvr),
          weightCpa: String(cfg.healthWeights?.cpa ?? defaultRulesConfig.healthWeights.cpa),
          weightRoas: String(cfg.healthWeights?.roas ?? defaultRulesConfig.healthWeights.roas),
          severityCritical: String(
            cfg.severityThresholds?.critical ?? defaultRulesConfig.severityThresholds.critical,
          ),
          severityMedium: String(cfg.severityThresholds?.medium ?? defaultRulesConfig.severityThresholds.medium),
        });
      } catch {
        setFields({
          weightCtr: String(defaultRulesConfig.healthWeights.ctr),
          weightCvr: String(defaultRulesConfig.healthWeights.cvr),
          weightCpa: String(defaultRulesConfig.healthWeights.cpa),
          weightRoas: String(defaultRulesConfig.healthWeights.roas),
          severityCritical: String(defaultRulesConfig.severityThresholds.critical),
          severityMedium: String(defaultRulesConfig.severityThresholds.medium),
        });
      }
    })();
  }, []);

  const previewTotalWeight = useMemo(() => {
    const ctr = toNumber(fields.weightCtr, defaultRulesConfig.healthWeights.ctr);
    const cvr = toNumber(fields.weightCvr, defaultRulesConfig.healthWeights.cvr);
    const cpa = toNumber(fields.weightCpa, defaultRulesConfig.healthWeights.cpa);
    const roas = toNumber(fields.weightRoas, defaultRulesConfig.healthWeights.roas);
    return ctr + cvr + cpa + roas;
  }, [fields]);

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Rule engine</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Global rules apply automatically to every user (frontend-only localStorage).
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <form
          className="rounded-2xl border border-zinc-200 bg-white p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setStatus(null);

            const config = {
              healthWeights: {
                ctr: toNumber(fields.weightCtr, defaultRulesConfig.healthWeights.ctr),
                cvr: toNumber(fields.weightCvr, defaultRulesConfig.healthWeights.cvr),
                cpa: toNumber(fields.weightCpa, defaultRulesConfig.healthWeights.cpa),
                roas: toNumber(fields.weightRoas, defaultRulesConfig.healthWeights.roas),
              },
              severityThresholds: {
                critical: toNumber(fields.severityCritical, defaultRulesConfig.severityThresholds.critical),
                medium: toNumber(fields.severityMedium, defaultRulesConfig.severityThresholds.medium),
              },
            };

            (async () => {
              try {
                const res = await fetch("/api/rules", {
                  method: "PUT",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ config }),
                });
                if (!res.ok) {
                  const t = await res.text();
                  setStatus(`Save failed: ${t}`);
                  return;
                }
                setStatus("Saved. Open /app to see changes.");
              } catch {
                setStatus("Save failed.");
              }
            })();
          }}
        >
          <div className="text-sm font-semibold">Health score weights</div>
          <div className="mt-1 text-xs text-zinc-500">Total weight is currently {previewTotalWeight}.</div>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-600">CTR weight</span>
              <input
                inputMode="numeric"
                value={fields.weightCtr}
                onChange={(e) => setFields((s) => ({ ...s, weightCtr: e.target.value }))}
                className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-400"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-600">CVR weight</span>
              <input
                inputMode="numeric"
                value={fields.weightCvr}
                onChange={(e) => setFields((s) => ({ ...s, weightCvr: e.target.value }))}
                className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-400"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-600">CPA weight</span>
              <input
                inputMode="numeric"
                value={fields.weightCpa}
                onChange={(e) => setFields((s) => ({ ...s, weightCpa: e.target.value }))}
                className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-400"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-600">ROAS weight</span>
              <input
                inputMode="numeric"
                value={fields.weightRoas}
                onChange={(e) => setFields((s) => ({ ...s, weightRoas: e.target.value }))}
                className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-400"
              />
            </label>
          </div>

          <div className="mt-6 text-sm font-semibold">Severity thresholds</div>
          <div className="mt-1 text-xs text-zinc-500">
            Gap magnitude is measured as |gap| / required. Example: 0.35 means 35% off target.
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-600">Critical threshold</span>
              <input
                inputMode="decimal"
                value={fields.severityCritical}
                onChange={(e) => setFields((s) => ({ ...s, severityCritical: e.target.value }))}
                className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-400"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-zinc-600">Medium threshold</span>
              <input
                inputMode="decimal"
                value={fields.severityMedium}
                onChange={(e) => setFields((s) => ({ ...s, severityMedium: e.target.value }))}
                className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-400"
              />
            </label>
          </div>

          {status ? <div className="mt-4 text-sm text-emerald-700">{status}</div> : null}

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Save rules
            </button>
            <button
              type="button"
              onClick={() => {
                (async () => {
                  try {
                    const res = await fetch("/api/rules", {
                      method: "PUT",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify({ config: defaultRulesConfig }),
                    });
                    if (!res.ok) {
                      const t = await res.text();
                      setStatus(`Reset failed: ${t}`);
                      return;
                    }
                    setFields({
                      weightCtr: String(defaultRulesConfig.healthWeights.ctr),
                      weightCvr: String(defaultRulesConfig.healthWeights.cvr),
                      weightCpa: String(defaultRulesConfig.healthWeights.cpa),
                      weightRoas: String(defaultRulesConfig.healthWeights.roas),
                      severityCritical: String(defaultRulesConfig.severityThresholds.critical),
                      severityMedium: String(defaultRulesConfig.severityThresholds.medium),
                    });
                    setStatus("Reset to defaults.");
                  } catch {
                    setStatus("Reset failed.");
                  }
                })();
              }}
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Reset defaults
            </button>
          </div>
        </form>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">What this affects</div>
          <div className="mt-2 text-sm text-zinc-600">
            Changes apply automatically across all users:
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3">
            {[
              "Health score weights (CTR/CVR/CPA/ROAS)",
              "Problem severity (Critical/Medium/Low)",
              "Dashboard and Problems page calculations",
            ].map((t) => (
              <div key={t} className="rounded-xl border border-zinc-200 p-4 text-sm text-zinc-700">
                {t}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
            Tip: After saving, refresh the App to see changes. This is frontend-only.
          </div>
        </div>
      </section>
    </div>
  );
}
