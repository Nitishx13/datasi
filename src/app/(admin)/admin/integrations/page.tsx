export default function AdminIntegrationsMonitorPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Integrations monitor</h1>
        <p className="mt-1 text-sm text-zinc-600">Google API + Meta API status (UI stub).</p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Google Ads API</div>
          <div className="mt-2 text-sm text-zinc-600">Status: OK</div>
          <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
            Last error: —
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Meta Marketing API</div>
          <div className="mt-2 text-sm text-zinc-600">Status: OK</div>
          <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
            Last error: —
          </div>
        </div>
      </section>
    </div>
  );
}
