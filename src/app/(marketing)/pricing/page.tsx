import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    desc: "Try the diagnosis flow.",
    items: ["1 ad account", "Basic health score", "Top issues (limited)", "Community support"],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "₹2,999/mo",
    desc: "For founders & freelancers.",
    items: ["Up to 5 ad accounts", "Full diagnostics", "Recommendations", "Weekly summary"],
    cta: "Go Pro",
    featured: true,
  },
  {
    name: "Agency",
    price: "₹9,999/mo",
    desc: "Multi-client workflows.",
    items: ["Unlimited clients", "Team members", "Priority support", "Advanced reporting"],
    cta: "Talk to us",
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Start free. Upgrade when you want deeper diagnosis.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl border p-6 ${
              p.featured
                ? "border-zinc-900 bg-white"
                : "border-zinc-200 bg-white"
            }`}
          >
            <div className="text-sm font-semibold">{p.name}</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight">{p.price}</div>
            <div className="mt-2 text-sm text-zinc-600">{p.desc}</div>
            <ul className="mt-5 list-disc pl-5 text-sm text-zinc-700">
              {p.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href={p.name === "Agency" ? "/contact" : "/auth/signup"}
                className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium ${
                  p.featured
                    ? "bg-zinc-900 text-white hover:bg-zinc-800"
                    : "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">FAQs</div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="font-semibold">Do you auto-change campaigns?</div>
            <div className="mt-1 text-sm text-zinc-600">No. Only recommendations.</div>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="font-semibold">Can I use Google + Meta together?</div>
            <div className="mt-1 text-sm text-zinc-600">Yes, in one dashboard.</div>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="font-semibold">Is this for beginners?</div>
            <div className="mt-1 text-sm text-zinc-600">
              Yes. We explain in simple language.
            </div>
          </div>
          <div className="rounded-xl border border-zinc-200 p-4">
            <div className="font-semibold">Can agencies invite team?</div>
            <div className="mt-1 text-sm text-zinc-600">Agency plan supports members.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
