import MarketingShell from "@/components/MarketingShell";
import Link from "next/link";

export default function Home() {
  return (
    <MarketingShell>
      <div className="flex flex-col gap-14">
        <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600">
              Google + Meta ads • Decision-first diagnostics
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Stop guessing.
              <br />
              Know what’s broken in your ads.
            </h1>
            <p className="mt-4 text-lg text-zinc-600">
              You already have metrics. This tool tells you the problem (creative, audience,
              landing page, tracking, budget) and the exact next step.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Start free
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                See how it works
              </Link>
            </div>
            <div className="mt-6 text-sm text-zinc-600">
              Consultant-like guidance. Simple English/Hinglish. No marketing jargon.
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="text-sm font-semibold">Example diagnosis</div>
            <div className="mt-3 rounded-xl border border-zinc-200 p-4">
              <div className="text-xs text-zinc-500">Campaign: Lead Gen | Winter Offer</div>
              <div className="mt-2 text-base font-semibold">Creative Issue (High)</div>
              <div className="mt-1 text-sm text-zinc-700">
                CTR is 0.6% (typical ~1.5%). People are not stopping.
              </div>
              <div className="mt-3 text-xs font-semibold text-zinc-900">What to do next</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700">
                <li>Test a new hook in the first 3 seconds</li>
                <li>Add UGC/testimonial creative</li>
                <li>Try 2-3 new angles: price, outcome, proof</li>
              </ul>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                <div className="text-xs text-zinc-500">Health score</div>
                <div className="mt-1 text-lg font-semibold">74 / 100</div>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                <div className="text-xs text-zinc-500">Top leak</div>
                <div className="mt-1 font-semibold">Audience fatigue</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="text-sm font-semibold">1) Connect</div>
            <div className="mt-2 text-sm text-zinc-600">
              Connect Google Ads + Meta Ads securely with OAuth.
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="text-sm font-semibold">2) Diagnose</div>
            <div className="mt-2 text-sm text-zinc-600">
              Rules spot creative, audience, landing page, tracking, budget issues.
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="text-sm font-semibold">3) Fix</div>
            <div className="mt-2 text-sm text-zinc-600">
              Clear recommendations. No auto-changes.
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-zinc-900 p-8 text-white">
          <div className="text-2xl font-semibold tracking-tight">
            Ready to stop wasting budget?
          </div>
          <div className="mt-2 text-sm text-white/80">
            Start free. Connect one account. See issues in minutes.
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
    </MarketingShell>
  );
}
