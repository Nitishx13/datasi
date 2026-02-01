import Link from "next/link";

import AuthShell from "@/components/AuthShell";

export default function AdminLoginPage() {
  return (
    <AuthShell title="Admin login" subtitle="Internal access only (UI stub).">
      <form className="flex flex-col gap-3">
        <label className="text-sm">
          <div className="text-xs text-zinc-600">Email</div>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
            placeholder="admin@company.com"
            type="email"
          />
        </label>
        <label className="text-sm">
          <div className="text-xs text-zinc-600">Password</div>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
            placeholder="••••••••"
            type="password"
          />
        </label>
        <button
          type="button"
          className="mt-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Login
        </button>

        <div className="mt-2 text-sm">
          <Link className="underline" href="/">
            Back to public site
          </Link>
        </div>

        <div className="mt-2 text-xs text-zinc-500">UI only.</div>
      </form>
    </AuthShell>
  );
}
