export default function AdminReportsAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Reports & analytics</h1>
        <p className="mt-1 text-sm text-zinc-600">Platform usage, churn, feature usage (UI stub).</p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {[
          { label: "Feature usage", value: "Problems page" },
          { label: "Churn risk", value: "Medium" },
          { label: "Top platform", value: "Meta" },
        ].map((k) => (
          <div key={k.label} className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="text-xs text-zinc-500">{k.label}</div>
            <div className="mt-1 text-lg font-semibold">{k.value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">Charts</div>
        <div className="mt-4 h-64 rounded-xl border border-zinc-200 bg-zinc-50" />
        <div className="mt-2 text-xs text-zinc-500">UI only (wire later).</div>
      </section>
    </div>
  );
}
