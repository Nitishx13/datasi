import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">How it works</h1>
        <p className="mt-2 text-sm text-zinc-600">
          3 steps. No confusion.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">1) Connect Ads Account</div>
          <div className="mt-2 text-sm text-zinc-600">
            Login and connect Google Ads / Meta Ads with OAuth.
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">2) We analyze data</div>
          <div className="mt-2 text-sm text-zinc-600">
            Daily sync. We read performance at account, campaign, ad set, ad level.
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">3) Get clear fixes</div>
          <div className="mt-2 text-sm text-zinc-600">
            You get problems + recommended actions in simple language.
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">Example</div>
        <div className="mt-3 rounded-xl border border-zinc-200 p-4">
          <div className="text-sm font-semibold">Your ads are getting clicks, but people aren’t converting.</div>
          <div className="mt-2 text-sm text-zinc-600">
            Usually landing page needs improvement: speed, trust, or form friction.
          </div>
          <div className="mt-4 text-sm font-semibold">Suggested fix</div>
          <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700">
            <li>Check mobile load time (aim &lt; 3s)</li>
            <li>Reduce form fields</li>
            <li>Match landing headline with ad promise</li>
          </ul>
        </div>
      </section>

      <section className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
        <div>
          <div className="text-sm font-semibold">Ready?</div>
          <div className="mt-1 text-sm text-zinc-600">Start free and connect your first account.</div>
        </div>
        <Link
          href="/auth/signup"
          className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Start free
        </Link>
      </section>
    </div>
  );
}
