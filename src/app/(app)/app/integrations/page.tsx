"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  formatLastSync,
  loadIntegrationsState,
  saveIntegrationsState,
  type IntegrationsState,
} from "@/lib/integrationsStorage";

export default function IntegrationsPage() {
  const [state, setState] = useState<IntegrationsState>(() => ({
    googleConnected: false,
    metaConnected: false,
    lastSyncAt: null,
    syncing: false,
  }));

  useEffect(() => {
    setState(loadIntegrationsState());
  }, []);

  useEffect(() => {
    saveIntegrationsState(state);
  }, [state]);

  const nextSyncLabel = useMemo(() => {
    if (!state.googleConnected && !state.metaConnected) return "After connection";
    return "Daily (and on demand)";
  }, [state.googleConnected, state.metaConnected]);

  async function runSyncNow() {
    if (!state.googleConnected && !state.metaConnected) return;
    setState((s) => ({ ...s, syncing: true }));
    await new Promise((r) => setTimeout(r, 1200));
    setState((s) => ({ ...s, syncing: false, lastSyncAt: new Date().toISOString() }));
  }

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Connect integrations</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Connect Google Ads and Meta Ads. We’ll sync daily.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold">Google Ads</div>
              <div className="mt-1 text-sm text-zinc-600">OAuth connection</div>
            </div>
            <div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700">
              {state.googleConnected ? "Connected" : "Disconnected"}
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              setState((s) => ({
                ...s,
                googleConnected: !s.googleConnected,
              }))
            }
            className={`mt-4 w-full rounded-full px-5 py-3 text-sm font-medium ${
              state.googleConnected
                ? "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50"
                : "bg-zinc-900 text-white hover:bg-zinc-800"
            }`}
          >
            {state.googleConnected ? "Disconnect Google" : "Connect Google"}
          </button>
          <div className="mt-2 text-xs text-zinc-500">Mock connect (local only).</div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold">Meta Ads</div>
              <div className="mt-1 text-sm text-zinc-600">OAuth connection</div>
            </div>
            <div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700">
              {state.metaConnected ? "Connected" : "Disconnected"}
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              setState((s) => ({
                ...s,
                metaConnected: !s.metaConnected,
              }))
            }
            className={`mt-4 w-full rounded-full px-5 py-3 text-sm font-medium ${
              state.metaConnected
                ? "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50"
                : "bg-zinc-900 text-white hover:bg-zinc-800"
            }`}
          >
            {state.metaConnected ? "Disconnect Meta" : "Connect Meta"}
          </button>
          <div className="mt-2 text-xs text-zinc-500">Mock connect (local only).</div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">Connection status</div>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-xs text-zinc-500">Last sync</div>
            <div className="mt-1 text-sm font-semibold">{formatLastSync(state.lastSyncAt)}</div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-xs text-zinc-500">Next sync</div>
            <div className="mt-1 text-sm font-semibold">{nextSyncLabel}</div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-xs text-zinc-500">Sync frequency</div>
            <div className="mt-1 text-sm font-semibold">Daily</div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={runSyncNow}
            disabled={state.syncing || (!state.googleConnected && !state.metaConnected)}
            className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium ${
              state.syncing
                ? "bg-zinc-400 text-white"
                : "bg-zinc-900 text-white hover:bg-zinc-800"
            } disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {state.syncing ? "Syncing…" : "Run sync now"}
          </button>
          <Link
            href="/sync-status"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            View sync status
          </Link>
        </div>
      </section>
    </div>
  );
}
