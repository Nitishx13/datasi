export default function AdminCmsPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Content management (CMS)</h1>
        <p className="mt-1 text-sm text-zinc-600">Landing page content, blogs, help articles (UI stub).</p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">Pages</div>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            "Landing page",
            "Pricing",
            "Features",
            "Blog",
            "Help center",
          ].map((p) => (
            <div key={p} className="rounded-xl border border-zinc-200 p-4">
              <div className="text-sm font-semibold">{p}</div>
              <div className="mt-2 text-xs text-zinc-500">Draft</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-zinc-500">UI only.</div>
      </section>
    </div>
  );
}
