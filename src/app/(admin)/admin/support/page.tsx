export default function AdminSupportTicketsPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Support / tickets</h1>
        <p className="mt-1 text-sm text-zinc-600">User issues, feedback, bug reports (UI stub).</p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">Tickets</div>
        <div className="mt-4 overflow-auto">
          <table className="w-full min-w-[900px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-left text-xs text-zinc-500">
                <th className="border-b border-zinc-200 px-3 py-2">Ticket</th>
                <th className="border-b border-zinc-200 px-3 py-2">User</th>
                <th className="border-b border-zinc-200 px-3 py-2">Status</th>
                <th className="border-b border-zinc-200 px-3 py-2">Priority</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "T-101", user: "user1@example.com", s: "Open", p: "High" },
                { id: "T-102", user: "user2@example.com", s: "Open", p: "Medium" },
                { id: "T-103", user: "user3@example.com", s: "Closed", p: "Low" },
              ].map((t) => (
                <tr key={t.id} className="hover:bg-zinc-50">
                  <td className="border-b border-zinc-100 px-3 py-2">{t.id}</td>
                  <td className="border-b border-zinc-100 px-3 py-2">{t.user}</td>
                  <td className="border-b border-zinc-100 px-3 py-2">{t.s}</td>
                  <td className="border-b border-zinc-100 px-3 py-2">{t.p}</td>
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
