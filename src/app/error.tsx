"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-xs text-zinc-500">500</div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Something broke
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          Kuch error aaya. Try again — if it repeats, share screenshot with support.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Retry
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            Go to home
          </Link>
        </div>
        <div className="mt-4 text-xs text-zinc-500">
          Error id: {error.digest ?? "—"}
        </div>
      </div>
    </div>
  );
}
