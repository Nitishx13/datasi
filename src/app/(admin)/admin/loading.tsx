export default function AdminLoading() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="text-sm font-semibold">Loading admin…</div>
      <div className="mt-2 text-sm text-zinc-600">One second.</div>
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="h-24 rounded-xl bg-zinc-100" />
        <div className="h-24 rounded-xl bg-zinc-100" />
        <div className="h-24 rounded-xl bg-zinc-100" />
      </div>
    </div>
  );
}
