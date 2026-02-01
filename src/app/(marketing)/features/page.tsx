import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Features</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Built for decision-making. Not just charts.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Ad Health Score</div>
          <div className="mt-2 text-sm text-zinc-600">
            Every campaign gets a 0–100 score so you know where to focus.
          </div>
          <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-xs text-zinc-500">Example</div>
            <div className="mt-1 text-lg font-semibold">74 / 100</div>
            <div className="mt-1 text-sm text-zinc-600">Performing well (but a few leaks)</div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Problem Diagnosis</div>
          <div className="mt-2 text-sm text-zinc-600">
            Rule-based diagnosis like:
            <div className="mt-2 space-y-2">
              <div className="rounded-lg border border-zinc-200 bg-white p-3 text-sm">
                CTR low → Creative problem
              </div>
              <div className="rounded-lg border border-zinc-200 bg-white p-3 text-sm">
                High CTR + low conversions → Landing page issue
              </div>
              <div className="rounded-lg border border-zinc-200 bg-white p-3 text-sm">
                Frequency &gt; 3 → Audience fatigue
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Actionable Recommendations</div>
          <div className="mt-2 text-sm text-zinc-600">
            Clear next steps. No auto-changes.
          </div>
          <ul className="mt-4 list-disc pl-5 text-sm text-zinc-700">
            <li>Test new headline / hook</li>
            <li>Improve landing page speed + form friction</li>
            <li>Verify pixel/event mapping</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Multi-platform support</div>
          <div className="mt-2 text-sm text-zinc-600">
            Google Ads + Meta Ads in one place, same language.
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm">
              Google Ads
            </div>
            <div className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm">
              Meta Ads
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-zinc-900 p-8 text-white">
        <div className="text-2xl font-semibold tracking-tight">Want to see this on your account?</div>
        <div className="mt-2 text-sm text-white/80">
          Start free. Connect once. Get issues + fixes.
        </div>
        <div className="mt-6">
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
          >
            Create account
          </Link>
        </div>
      </section>
    </div>
  );
}
