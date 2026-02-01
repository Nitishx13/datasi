import Link from "next/link";

const posts = [
  {
    title: "CTR low? Here’s what to fix first",
    desc: "Creative checklist in plain English.",
    href: "#",
  },
  {
    title: "High clicks, no leads — landing page basics",
    desc: "Speed, trust, friction.",
    href: "#",
  },
  {
    title: "Audience fatigue: when to refresh",
    desc: "Frequency, creative rotation, exclusions.",
    href: "#",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Blog / Resources</h1>
        <p className="mt-2 text-sm text-zinc-600">Short, useful, and practical.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <div key={p.title} className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="text-sm font-semibold">{p.title}</div>
            <div className="mt-2 text-sm text-zinc-600">{p.desc}</div>
            <div className="mt-4">
              <Link className="text-sm font-medium underline" href={p.href}>
                Read
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
        <div className="text-sm font-semibold">Case studies (coming soon)</div>
        <div className="mt-2 text-sm text-zinc-600">
          We’ll add real breakdowns once we have more user data.
        </div>
      </section>
    </div>
  );
}
