import Link from "next/link";

import AuthShell from "@/components/AuthShell";

export default function SignupPage() {
  return (
    <AuthShell
      title="Create account"
      subtitle="Start free. Connect ads. Get clear fixes."
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
        <label className="text-sm">
          <div className="text-xs text-zinc-600">Password</div>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
            placeholder="Create a strong password"
            type="password"
          />
        </label>
        <label className="text-sm">
          <div className="text-xs text-zinc-600">Confirm password</div>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
            placeholder="Repeat password"
            type="password"
          />
        </label>

        <label className="mt-2 flex items-start gap-2 text-sm text-zinc-700">
          <input type="checkbox" className="mt-1" />
          <span>
            I accept the <span className="underline">terms</span> and <span className="underline">privacy</span>.
          </span>
        </label>

        <button
          type="button"
          className="mt-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Create account
        </button>

        <button
          type="button"
          className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
        >
          Sign up with Google
        </button>

        <div className="mt-2 text-sm text-zinc-700">
          Already have an account?{" "}
          <Link className="underline" href="/auth/login">
            Login
          </Link>
        </div>

        <div className="mt-2 text-xs text-zinc-500">UI only (auth not wired yet).</div>
      </form>
    </AuthShell>
  );
}
