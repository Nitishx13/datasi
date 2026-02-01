import Link from "next/link";

import AuthShell from "@/components/AuthShell";

export default function ResetPasswordPage() {
  return (
    <AuthShell
      title="Reset password"
      subtitle="New password set karo."
    >
      <form className="flex flex-col gap-3">
        <label className="text-sm">
          <div className="text-xs text-zinc-600">New password</div>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
            placeholder="New password"
            type="password"
          />
        </label>
        <label className="text-sm">
          <div className="text-xs text-zinc-600">Confirm password</div>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
            placeholder="Confirm"
            type="password"
          />
        </label>

        <button
          type="button"
          className="mt-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Update password
        </button>

        <div className="mt-2 text-sm">
          <Link className="underline" href="/auth/login">
            Back to login
          </Link>
        </div>

        <div className="mt-2 text-xs text-zinc-500">UI only (reset not wired yet).</div>
      </form>
    </AuthShell>
  );
}
