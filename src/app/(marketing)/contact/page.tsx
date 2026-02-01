export default function ContactPage() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Contact / Support</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Tell us what’s stuck. We’ll help.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Contact form</div>
          <form className="mt-4 flex flex-col gap-3">
            <label className="text-sm">
              <div className="text-xs text-zinc-600">Your email</div>
              <input
                className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
                placeholder="you@company.com"
              />
            </label>
            <label className="text-sm">
              <div className="text-xs text-zinc-600">Message</div>
              <textarea
                className="mt-1 min-h-[120px] w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
                placeholder="Example: CTR is fine but conversions are 0. What should I check?"
              />
            </label>
            <button
              type="button"
              className="mt-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Send
            </button>
            <div className="text-xs text-zinc-500">
              UI only (no backend wired yet).
            </div>
          </form>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Email support</div>
          <div className="mt-2 text-sm text-zinc-600">support@yourdomain.com</div>
          <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-sm font-semibold">What to include</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700">
              <li>Platform (Google/Meta)</li>
              <li>Campaign name</li>
              <li>What changed recently</li>
              <li>Screenshot of issue card</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
