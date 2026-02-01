export default function AdminSyncLogsPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Data sync logs</h1>
        <p className="mt-1 text-sm text-zinc-600">Cron runs, API errors, last sync time (UI stub).</p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">Recent runs</div>
        <div className="mt-4 overflow-auto">
          <table className="w-full min-w-[900px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-left text-xs text-zinc-500">
                <th className="border-b border-zinc-200 px-3 py-2">Time</th>
                <th className="border-b border-zinc-200 px-3 py-2">Status</th>
                <th className="border-b border-zinc-200 px-3 py-2">Duration</th>
                <th className="border-b border-zinc-200 px-3 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-zinc-50">
                  <td className="border-b border-zinc-100 px-3 py-2">Today 0{i}:00</td>
                  <td className="border-b border-zinc-100 px-3 py-2">Success</td>
                  <td className="border-b border-zinc-100 px-3 py-2">2m</td>
                  <td className="border-b border-zinc-100 px-3 py-2">—</td>
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
