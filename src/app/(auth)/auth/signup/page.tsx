"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import AuthShell from "@/components/AuthShell";
import { setActiveUserId } from "@/lib/userContext";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <AuthShell
      title="Create account"
      subtitle="Start free. Connect ads. Get clear fixes."
    >
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          setError(null);

          if (!accepted) {
            setError("Please accept terms.");
            return;
          }
          if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
          }
          if (password !== confirm) {
            setError("Passwords do not match.");
            return;
          }

          (async () => {
            try {
              const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email, password }),
              });

              if (!res.ok) {
                const t = await res.text();
                setError(t.includes("exists") ? "Account already exists" : "Signup failed");
                return;
              }

              const json = (await res.json()) as { user?: { id: string } };
              const userId = json?.user?.id;
              if (userId) {
                setActiveUserId(userId);
              }
              router.push("/app");
              router.refresh();
            } catch {
              setError("Signup failed");
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
            placeholder="Create a strong password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="text-sm">
          <div className="text-xs text-zinc-600">Confirm password</div>
          <input
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400"
            placeholder="Repeat password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </label>

        <label className="mt-2 flex items-start gap-2 text-sm text-zinc-700">
          <input type="checkbox" className="mt-1" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
          <span>
            I accept the <span className="underline">terms</span> and <span className="underline">privacy</span>.
          </span>
        </label>

        <button
          type="submit"
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

        {error ? <div className="mt-2 text-sm text-rose-700">{error}</div> : null}
      </form>
    </AuthShell>
  );
}
