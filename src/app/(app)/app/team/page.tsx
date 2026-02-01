export default function TeamPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Team / Members</h1>
        <p className="mt-1 text-sm text-zinc-600">Agency plan feature (UI stub).</p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Members</div>
            <div className="mt-1 text-sm text-zinc-600">Invite teammates and set roles.</div>
          </div>
          <button
            type="button"
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Invite
          </button>
        </div>

        <div className="mt-4 overflow-auto">
          <table className="w-full min-w-[600px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-left text-xs text-zinc-500">
                <th className="border-b border-zinc-200 px-3 py-2">Name</th>
                <th className="border-b border-zinc-200 px-3 py-2">Email</th>
                <th className="border-b border-zinc-200 px-3 py-2">Role</th>
                <th className="border-b border-zinc-200 px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-zinc-50">
                <td className="border-b border-zinc-100 px-3 py-2">—</td>
                <td className="border-b border-zinc-100 px-3 py-2">—</td>
                <td className="border-b border-zinc-100 px-3 py-2">—</td>
                <td className="border-b border-zinc-100 px-3 py-2">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3 text-xs text-zinc-500">UI only.</div>
      </section>
    </div>
  );
}
