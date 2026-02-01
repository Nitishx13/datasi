export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">Loading…</div>
        <div className="mt-2 text-sm text-zinc-600">Sync ho raha hai. Please wait.</div>
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="h-20 rounded-xl bg-zinc-100" />
          <div className="h-20 rounded-xl bg-zinc-100" />
          <div className="h-20 rounded-xl bg-zinc-100" />
        </div>
      </div>
    </div>
  );
}
