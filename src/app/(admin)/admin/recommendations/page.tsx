"use client";

import { useEffect, useMemo, useState } from "react";

import {
  type RecommendationTemplate,
  defaultRecommendationsConfig,
  loadRecommendationsConfig,
} from "@/lib/recommendationsStorage";

function newId() {
  return `rec_${Math.random().toString(16).slice(2, 10)}`;
}

function normalizeBullets(raw: string) {
  return raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AdminRecommendationsPage() {
  const [templates, setTemplates] = useState<RecommendationTemplate[]>(defaultRecommendationsConfig.templates);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/recommendations", { cache: "no-store" });
        const json = (await res.json()) as { templates?: any[] };
        const apiTemplates = Array.isArray(json.templates) ? json.templates : null;
        if (apiTemplates && apiTemplates.length > 0) {
          setTemplates(
            apiTemplates.map((t) => ({
              id: String(t.id),
              title: String(t.title),
              bullets: Array.isArray(t.bullets) ? t.bullets.map((b) => String(b)) : [],
              enabled: t.enabled !== false,
              impactMultiplier: Number.isFinite(Number(t.impactMultiplier)) ? Number(t.impactMultiplier) : 1,
            })),
          );
        } else {
          const cfg = loadRecommendationsConfig();
          setTemplates(cfg.templates);
        }
      } catch {
        const cfg = loadRecommendationsConfig();
        setTemplates(cfg.templates);
      }
    })();
  }, []);

  const editing = useMemo(() => templates.find((t) => t.id === editingId) ?? null, [templates, editingId]);

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Recommendations manager</h1>
        <p className="mt-1 text-sm text-zinc-600">Add / edit / delete recommendation templates (global, frontend-only).</p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold">Templates</div>
            <div className="mt-1 text-xs text-zinc-500">Used by /app/recommendations (applies to all users).</div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                const id = newId();
                const next: RecommendationTemplate = {
                  id,
                  title: "New recommendation",
                  bullets: ["First action"],
                  enabled: true,
                  impactMultiplier: 1,
                };
                setTemplates((s) => [next, ...s]);
                setEditingId(id);
                setStatus(null);
              }}
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                (async () => {
                  try {
                    const res = await fetch("/api/recommendations", {
                      method: "PUT",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify({ templates }),
                    });
                    if (!res.ok) {
                      const t = await res.text();
                      setStatus(`Save failed: ${t}`);
                      return;
                    }
                    setStatus("Saved.");
                  } catch {
                    setStatus("Save failed.");
                  }
                })();
              }}
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                (async () => {
                  try {
                    const res = await fetch("/api/recommendations", {
                      method: "PUT",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify({ templates: defaultRecommendationsConfig.templates }),
                    });
                    if (!res.ok) {
                      const t = await res.text();
                      setStatus(`Reset failed: ${t}`);
                      return;
                    }
                    setTemplates(defaultRecommendationsConfig.templates);
                    setEditingId(null);
                    setStatus("Reset to defaults.");
                  } catch {
                    setStatus("Reset failed.");
                  }
                })();
              }}
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Reset
            </button>
          </div>
        </div>

        {status ? <div className="mt-3 text-sm text-emerald-700">{status}</div> : null}

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_420px]">
          <div className="flex flex-col gap-3">
            {templates.length === 0 ? (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">No templates.</div>
            ) : (
              templates.map((t) => (
                <div key={t.id} className="rounded-xl border border-zinc-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{t.title}</div>
                      <div className="mt-1 text-xs text-zinc-500">{t.id}</div>
                      <div className="mt-2 text-xs text-zinc-600">
                        {t.enabled ? "Enabled" : "Disabled"} • Impact × {t.impactMultiplier}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(t.id);
                          setStatus(null);
                        }}
                        className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium hover:bg-zinc-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTemplates((s) => s.filter((x) => x.id !== t.id));
                          if (editingId === t.id) setEditingId(null);
                          setStatus(null);
                        }}
                        className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium hover:bg-zinc-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <ul className="mt-3 list-disc pl-5 text-sm text-zinc-700">
                    {t.bullets.slice(0, 3).map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="text-sm font-semibold">Edit</div>
            <div className="mt-2 text-sm text-zinc-600">
              {editing ? "Update the selected template." : "Select a template to edit."}
            </div>

            {!editing ? null : (
              <div className="mt-4 grid grid-cols-1 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-zinc-600">Title</span>
                  <input
                    value={editing.title}
                    onChange={(e) => {
                      const v = e.target.value;
                      setTemplates((s) => s.map((x) => (x.id === editing.id ? { ...x, title: v } : x)));
                    }}
                    className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-400"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-zinc-600">Enabled</span>
                  <select
                    value={editing.enabled ? "yes" : "no"}
                    onChange={(e) => {
                      const enabled = e.target.value === "yes";
                      setTemplates((s) => s.map((x) => (x.id === editing.id ? { ...x, enabled } : x)));
                    }}
                    className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-400"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-zinc-600">Impact multiplier</span>
                  <input
                    inputMode="decimal"
                    value={String(editing.impactMultiplier)}
                    onChange={(e) => {
                      const n = Number(e.target.value);
                      const impactMultiplier = Number.isFinite(n) ? n : 1;
                      setTemplates((s) => s.map((x) => (x.id === editing.id ? { ...x, impactMultiplier } : x)));
                    }}
                    className="h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-zinc-400"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-zinc-600">Bullets (one per line)</span>
                  <textarea
                    value={editing.bullets.join("\n")}
                    onChange={(e) => {
                      const bullets = normalizeBullets(e.target.value);
                      setTemplates((s) => s.map((x) => (x.id === editing.id ? { ...x, bullets } : x)));
                    }}
                    className="min-h-[140px] rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    (async () => {
                      try {
                        const res = await fetch("/api/recommendations", {
                          method: "PUT",
                          headers: { "content-type": "application/json" },
                          body: JSON.stringify({ templates }),
                        });
                        if (!res.ok) {
                          const t = await res.text();
                          setStatus(`Save failed: ${t}`);
                          return;
                        }
                        setStatus("Saved.");
                      } catch {
                        setStatus("Save failed.");
                      }
                    })();
                  }}
                  className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
                >
                  Save changes
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-xs text-zinc-500">Frontend-only. No backend persistence.</div>
      </section>
    </div>
  );
}
