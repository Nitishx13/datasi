export default function AdminSubscriptionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Subscription management</h1>
        <p className="mt-1 text-sm text-zinc-600">Plans, payments, failed transactions (UI stub).</p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Plans</div>
          <div className="mt-3 space-y-2 text-sm text-zinc-700">
            <div className="rounded-xl border border-zinc-200 p-3">Free</div>
            <div className="rounded-xl border border-zinc-200 p-3">Pro</div>
            <div className="rounded-xl border border-zinc-200 p-3">Agency</div>
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Failed transactions</div>
          <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
            None (mock).
          </div>
        </div>
      </section>
    </div>
  );
}
