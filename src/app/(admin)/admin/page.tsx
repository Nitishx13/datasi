export default function AdminOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Admin dashboard</h1>
        <p className="mt-1 text-sm text-zinc-600">High-level system overview (UI stub).</p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: "Total users", value: "1,248" },
          { label: "Active users", value: "312" },
          { label: "Revenue", value: "₹ 4.2L" },
          { label: "Connected accounts", value: "689" },
        ].map((k) => (
          <div key={k.label} className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="text-xs text-zinc-500">{k.label}</div>
            <div className="mt-1 text-lg font-semibold">{k.value}</div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">Integrations health</div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-sm font-semibold">Google API</div>
            <div className="mt-1 text-sm text-zinc-600">OK</div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-sm font-semibold">Meta API</div>
            <div className="mt-1 text-sm text-zinc-600">OK</div>
          </div>
        </div>
      </section>
    </div>
  );
}
