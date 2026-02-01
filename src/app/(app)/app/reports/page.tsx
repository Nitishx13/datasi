export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
        <p className="mt-1 text-sm text-zinc-600">Weekly + monthly summaries.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Weekly summary</div>
          <div className="mt-2 text-sm text-zinc-600">
            What improved, what got worse, and what to fix next.
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Download PDF
            </button>
            <button
              type="button"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Download CSV
            </button>
          </div>
          <div className="mt-2 text-xs text-zinc-500">UI only.</div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Monthly summary</div>
          <div className="mt-2 text-sm text-zinc-600">
            Month-over-month performance + top recurring issues.
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Download PDF
            </button>
            <button
              type="button"
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Download CSV
            </button>
          </div>
          <div className="mt-2 text-xs text-zinc-500">UI only.</div>
        </div>
      </section>
    </div>
  );
}
