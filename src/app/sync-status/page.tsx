"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  formatLastSync,
  loadIntegrationsState,
  type IntegrationsState,
} from "@/lib/integrationsStorage";

export default function SyncStatusPage() {
  const [state, setState] = useState<IntegrationsState>(() => ({
    googleConnected: false,
    metaConnected: false,
    lastSyncAt: null,
    syncing: false,
  }));

  useEffect(() => {
    setState(loadIntegrationsState());
    const onStorage = () => setState(loadIntegrationsState());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const googleStatus = state.googleConnected
    ? state.syncing
      ? "Syncing…"
      : "Connected"
    : "Waiting for connection";
  const metaStatus = state.metaConnected
    ? state.syncing
      ? "Syncing…"
      : "Connected"
    : "Waiting for connection";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-xs text-zinc-500">Sync status</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Data syncing</h1>
        <p className="mt-2 text-sm text-zinc-600">
          We’re fetching data from Google/Meta. ETA depends on account size.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-xs text-zinc-500">Google Ads</div>
            <div className="mt-1 text-sm font-semibold">{googleStatus}</div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-xs text-zinc-500">Meta Ads</div>
            <div className="mt-1 text-sm font-semibold">{metaStatus}</div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-xs text-zinc-500">Last sync</div>
            <div className="mt-1 text-sm font-semibold">{formatLastSync(state.lastSyncAt)}</div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-zinc-200 p-4">
          <div className="text-sm font-semibold">What you can do</div>
          <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700">
            <li>Connect integrations first</li>
            <li>Check permissions</li>
            <li>Wait 5–10 minutes for large accounts</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/app/integrations"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Connect integrations
          </Link>
          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            Go to app
          </Link>
        </div>

        <div className="mt-4 text-xs text-zinc-500">
          Mock sync (local only). Real Google/Meta OAuth + backend sync can be added later.
        </div>
      </div>
    </div>
  );
}
