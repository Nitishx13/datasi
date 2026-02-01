export default function UseCasesPage() {
  const cases = [
    {
      title: "Freelancers",
      desc: "Quick diagnosis so you can give clients clear actions, not long reports.",
    },
    {
      title: "Agencies",
      desc: "Multi-client visibility. Standardized issue language across the team.",
    },
    {
      title: "Founders",
      desc: "Know where the leak is before you spend more.",
    },
    {
      title: "Local Businesses",
      desc: "Simple fixes: creative, landing page, tracking. No jargon.",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Use cases</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Who this is made for.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cases.map((c) => (
          <div key={c.title} className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="text-sm font-semibold">{c.title}</div>
            <div className="mt-2 text-sm text-zinc-600">{c.desc}</div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">Example questions you can answer</div>
        <ul className="mt-4 list-disc pl-5 text-sm text-zinc-700">
          <li>Should I change creative or landing page first?</li>
          <li>Why is CPC going up week over week?</li>
          <li>Which campaign is wasting budget?</li>
          <li>Is tracking broken or is targeting wrong?</li>
        </ul>
      </section>
    </div>
  );
}
