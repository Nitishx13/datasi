import Link from "next/link";

export default async function AdDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-6">
      <section>
        <div className="text-xs text-zinc-500">Ad</div>
        <h1 className="text-2xl font-semibold tracking-tight">Ad {id}</h1>
        <p className="mt-1 text-sm text-zinc-600">Ad-level metrics + creative feedback.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {[
          { label: "Impressions", value: "92,410" },
          { label: "Clicks", value: "1,102" },
          { label: "CTR", value: "1.19%" },
          { label: "Spend", value: "₹ 19,200" },
        ].map((k) => (
          <div key={k.label} className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="text-xs text-zinc-500">{k.label}</div>
            <div className="mt-1 text-lg font-semibold">{k.value}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Creative preview</div>
          <div className="mt-4 h-72 rounded-xl border border-zinc-200 bg-zinc-50" />
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">What to fix</div>
          <div className="mt-2 text-sm text-zinc-600">
            If CTR is low, creative hook needs improvement.
          </div>
          <ul className="mt-4 list-disc pl-5 text-sm text-zinc-700">
            <li>Change first frame to show outcome</li>
            <li>Use UGC style, not polished ad</li>
            <li>Shorter headline, clearer offer</li>
          </ul>
          <div className="mt-4 text-sm">
            <Link className="underline" href="/app/recommendations">
              View all recommendations
            </Link>
          </div>
        </div>
      </section>

      <div className="text-xs text-zinc-500">UI only.</div>
    </div>
  );
}
