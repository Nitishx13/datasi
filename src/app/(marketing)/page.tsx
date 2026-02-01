export default function LandingPage() {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-zinc-900">
      <div className="text-sm font-semibold">Duplicate route</div>
      <div className="mt-2 text-sm text-zinc-700">
        This file duplicates the root route <code className="rounded bg-white px-1">/</code>.
      </div>
      <div className="mt-2 text-sm text-zinc-700">
        Please delete:
        <code className="ml-2 rounded bg-white px-1">src/app/(marketing)/page.tsx</code>
      </div>
      <div className="mt-2 text-sm text-zinc-700">
        Keep:
        <code className="ml-2 rounded bg-white px-1">src/app/page.tsx</code>
      </div>
    </div>
  );
}
