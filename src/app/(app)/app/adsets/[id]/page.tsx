import Link from "next/link";

export default async function AdSetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-6">
      <section>
        <div className="text-xs text-zinc-500">Ad set</div>
        <h1 className="text-2xl font-semibold tracking-tight">Ad Set {id}</h1>
        <p className="mt-1 text-sm text-zinc-600">Performance metrics + recommendations.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {[
          { label: "CTR", value: "1.2%" },
          { label: "CPC", value: "₹ 19" },
          { label: "Frequency", value: "3.4" },
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
          <div className="mt-4 h-64 rounded-xl border border-zinc-200 bg-zinc-50" />
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Recommendations</div>
          <ul className="mt-4 list-disc pl-5 text-sm text-zinc-700">
            <li>Refresh creatives (fatigue risk)</li>
            <li>Expand audience slightly</li>
            <li>Exclude recent converters</li>
          </ul>
          <div className="mt-4 text-sm">
            <Link className="underline" href="/app/problems">
              Go to Problems
            </Link>
          </div>
        </div>
      </section>

      <div className="text-xs text-zinc-500">UI only.</div>
    </div>
  );
}
