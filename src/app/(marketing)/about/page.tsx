export default function AboutPage() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Built with a simple philosophy.
        </p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">Mission</div>
        <p className="mt-2 text-sm text-zinc-700">
          Help advertisers make better decisions faster. Not by adding more dashboards,
          but by clearly telling what’s broken and how to fix it.
        </p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">Product philosophy</div>
        <p className="mt-2 text-sm text-zinc-700">
          “We don’t show numbers. We tell you what’s broken and how to fix it.”
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="font-semibold">Clarity</div>
            <div className="mt-1 text-sm text-zinc-600">Explain like a consultant.</div>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="font-semibold">No auto-changes</div>
            <div className="mt-1 text-sm text-zinc-600">Only recommendations.</div>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="font-semibold">Action &gt; analytics</div>
            <div className="mt-1 text-sm text-zinc-600">Next steps come first.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
