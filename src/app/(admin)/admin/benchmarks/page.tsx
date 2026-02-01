export default function AdminBenchmarksPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Benchmarks manager</h1>
        <p className="mt-1 text-sm text-zinc-600">Industry CTR/CR benchmarks (UI stub).</p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">Benchmarks</div>
        <div className="mt-4 overflow-auto">
          <table className="w-full min-w-[700px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-left text-xs text-zinc-500">
                <th className="border-b border-zinc-200 px-3 py-2">Industry</th>
                <th className="border-b border-zinc-200 px-3 py-2">CTR</th>
                <th className="border-b border-zinc-200 px-3 py-2">Conv. rate</th>
                <th className="border-b border-zinc-200 px-3 py-2">Updated</th>
              </tr>
            </thead>
            <tbody>
              {[
                { i: "Ecom", ctr: "1.5%", cr: "2.1%" },
                { i: "Lead gen", ctr: "1.2%", cr: "3.4%" },
                { i: "SaaS", ctr: "2.0%", cr: "1.8%" },
              ].map((row) => (
                <tr key={row.i} className="hover:bg-zinc-50">
                  <td className="border-b border-zinc-100 px-3 py-2">{row.i}</td>
                  <td className="border-b border-zinc-100 px-3 py-2">{row.ctr}</td>
                  <td className="border-b border-zinc-100 px-3 py-2">{row.cr}</td>
                  <td className="border-b border-zinc-100 px-3 py-2">Today</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs text-zinc-500">UI only.</div>
      </section>
    </div>
  );
}
