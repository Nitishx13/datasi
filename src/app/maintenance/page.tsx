import Link from "next/link";

export default function MaintenancePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-xs text-zinc-500">Maintenance</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          We’ll be back soon
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          Abhi maintenance chal raha hai. Thoda time do.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Go to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
