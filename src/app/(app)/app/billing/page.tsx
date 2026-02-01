export default function BillingPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Billing & subscription</h1>
        <p className="mt-1 text-sm text-zinc-600">Plan, upgrades, invoices.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Current plan</div>
          <div className="mt-2 text-sm text-zinc-600">Free</div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Upgrade
            </button>
            <button
              type="button"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Manage
            </button>
          </div>
          <div className="mt-2 text-xs text-zinc-500">UI only.</div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Payment history</div>
          <div className="mt-4 overflow-auto">
            <table className="w-full min-w-[480px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="text-left text-xs text-zinc-500">
                  <th className="border-b border-zinc-200 px-3 py-2">Date</th>
                  <th className="border-b border-zinc-200 px-3 py-2">Amount</th>
                  <th className="border-b border-zinc-200 px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-zinc-50">
                  <td className="border-b border-zinc-100 px-3 py-2">—</td>
                  <td className="border-b border-zinc-100 px-3 py-2">—</td>
                  <td className="border-b border-zinc-100 px-3 py-2">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">Invoices</div>
        <div className="mt-2 text-sm text-zinc-600">Download past invoices (UI only).</div>
      </section>
    </div>
  );
}
