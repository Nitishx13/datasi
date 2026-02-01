"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import AuthShell from "@/components/AuthShell";
import { setActiveUserId } from "@/lib/userContext";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthShell
      title="Login"
      subtitle="Login karo. Then we’ll show you what’s broken and what to fix next."
    >
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          setError(null);

          (async () => {
            try {
              const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email, password }),
              });

              if (!res.ok) {
                setError("Invalid email or password");
                return;
              }

              const json = (await res.json()) as { user?: { id: string; role: string } };
              const userId = json?.user?.id;
              if (userId) {
                setActiveUserId(userId);
              }

              const next = json?.user?.role === "admin" ? "/admin" : "/app";
              router.push(next);
              router.refresh();
            } catch {
              setError("Login failed");
            }
          })();
        }}
      >
        <label className="text-sm">
          <div className="text-xs text-zinc-600">Email</div>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
            placeholder="you@company.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="text-sm">
          <div className="text-xs text-zinc-600">Password</div>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Login
        </button>

        <button
          type="button"
          className="rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
        >
          Continue with Google
        </button>

        <div className="mt-2 flex items-center justify-between text-sm">
          <Link className="underline" href="/auth/forgot-password">
            Forgot password?
          </Link>
          <Link className="underline" href="/auth/signup">
            Create account
          </Link>
        </div>

        {error ? <div className="mt-2 text-sm text-rose-700">{error}</div> : null}
      </form>
    </AuthShell>
  );
}
