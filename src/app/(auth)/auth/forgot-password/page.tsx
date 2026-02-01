import Link from "next/link";

import AuthShell from "@/components/AuthShell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot password"
      subtitle="Email daalo. Reset link bhej denge."
    >
      <form className="flex flex-col gap-3">
        <label className="text-sm">
          <div className="text-xs text-zinc-600">Email</div>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
            placeholder="you@company.com"
            type="email"
          />
        </label>

        <button
          type="button"
          className="mt-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Send reset link
        </button>

        <div className="mt-2 text-sm">
          <Link className="underline" href="/auth/login">
            Back to login
          </Link>
        </div>

        <div className="mt-2 text-xs text-zinc-500">UI only (email not wired yet).</div>
      </form>
    </AuthShell>
  );
}
