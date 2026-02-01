export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Admin settings</h1>
        <p className="mt-1 text-sm text-zinc-600">API keys, env configs, feature flags (UI stub).</p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">API keys</div>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
              Keys are not stored in frontend. Use env vars.
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Feature flags</div>
          <div className="mt-4 space-y-2 text-sm text-zinc-700">
            <div className="rounded-xl border border-zinc-200 p-3">GA4 integration (off)</div>
            <div className="rounded-xl border border-zinc-200 p-3">AI insights (off)</div>
            <div className="rounded-xl border border-zinc-200 p-3">WhatsApp summaries (off)</div>
          </div>
        </div>
      </section>

      <div className="text-xs text-zinc-500">UI only.</div>
    </div>
  );
}
