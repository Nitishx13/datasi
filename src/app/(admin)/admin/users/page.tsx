"use client";

import { useEffect, useMemo, useState } from "react";

import { formatINR } from "@/lib/goalEngine";
import { getActiveUserId, setActiveUserId } from "@/lib/userContext";

type UserRow = {
  id: string;
  email: string;
  created_at: string;
};

type GoalRow = {
  user_id: string;
  inputs: any;
  targets: any;
  current: any;
  saved_at: string;
} | null;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [goalsByUserId, setGoalsByUserId] = useState<Record<string, GoalRow>>({});
  const activeUserId = useMemo(() => getActiveUserId(), []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/users", { cache: "no-store" });
        const json = (await res.json()) as { users?: UserRow[] };
        const rows = Array.isArray(json.users) ? json.users : [];
        setUsers(rows);

        const entries = await Promise.all(
          rows.map(async (u) => {
            try {
              const goalRes = await fetch(`/api/goals/${u.id}` as const, { cache: "no-store" });
              const goalJson = (await goalRes.json()) as { goal: GoalRow };
              return [u.id, goalJson?.goal ?? null] as const;
            } catch {
              return [u.id, null] as const;
            }
          }),
        );
        setGoalsByUserId(Object.fromEntries(entries));
      } catch {
        setUsers([]);
        setGoalsByUserId({});
      }
    })();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Frontend-only admin view. Onboarding/goal data is stored per user in localStorage.
        </p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">User list</div>
          <button
            type="button"
            onClick={() => {
              (async () => {
                try {
                  const res = await fetch("/api/users", { cache: "no-store" });
                  const json = (await res.json()) as { users?: UserRow[] };
                  const rows = Array.isArray(json.users) ? json.users : [];
                  setUsers(rows);

                  const entries = await Promise.all(
                    rows.map(async (u) => {
                      try {
                        const goalRes = await fetch(`/api/goals/${u.id}` as const, { cache: "no-store" });
                        const goalJson = (await goalRes.json()) as { goal: GoalRow };
                        return [u.id, goalJson?.goal ?? null] as const;
                      } catch {
                        return [u.id, null] as const;
                      }
                    }),
                  );
                  setGoalsByUserId(Object.fromEntries(entries));
                } catch {
                  setUsers([]);
                  setGoalsByUserId({});
                }
              })();
            }}
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            Refresh
          </button>
        </div>

        <div className="mt-4 overflow-auto">
          <table className="w-full min-w-[1000px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-left text-xs text-zinc-500">
                <th className="border-b border-zinc-200 px-3 py-2">User</th>
                <th className="border-b border-zinc-200 px-3 py-2">Goal status</th>
                <th className="border-b border-zinc-200 px-3 py-2">Daily spend</th>
                <th className="border-b border-zinc-200 px-3 py-2">Duration</th>
                <th className="border-b border-zinc-200 px-3 py-2">Desired profit</th>
                <th className="border-b border-zinc-200 px-3 py-2">Saved</th>
                <th className="border-b border-zinc-200 px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const goal = goalsByUserId[u.id] ?? null;
                const savedAt = goal?.saved_at ? new Date(goal.saved_at) : null;
                const isActive = u.id === activeUserId;
                return (
                  <tr key={u.id} className="hover:bg-zinc-50">
                    <td className="border-b border-zinc-100 px-3 py-2">
                      <div className="font-medium text-zinc-900">{u.email}</div>
                      <div className="text-xs text-zinc-500">{u.id}</div>
                    </td>
                    <td className="border-b border-zinc-100 px-3 py-2">
                      {goal ? (
                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-800">
                          Goal set
                        </span>
                      ) : (
                        <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-700">
                          Not set
                        </span>
                      )}
                      {isActive ? (
                        <span className="ml-2 rounded-full border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-900">
                          Active
                        </span>
                      ) : null}
                    </td>
                    <td className="border-b border-zinc-100 px-3 py-2">
                      {goal ? formatINR(Number(goal.inputs?.dailySpend ?? 0)) : "—"}
                    </td>
                    <td className="border-b border-zinc-100 px-3 py-2">
                      {goal ? `${Number(goal.inputs?.durationDays ?? 0)} days` : "—"}
                    </td>
                    <td className="border-b border-zinc-100 px-3 py-2">
                      {goal ? formatINR(Number(goal.inputs?.desiredProfit ?? 0)) : "—"}
                    </td>
                    <td className="border-b border-zinc-100 px-3 py-2">
                      {savedAt && !Number.isNaN(savedAt.getTime()) ? savedAt.toLocaleString() : "—"}
                    </td>
                    <td className="border-b border-zinc-100 px-3 py-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveUserId(u.id);
                          if (typeof window !== "undefined") window.location.assign("/app");
                        }}
                        className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium hover:bg-zinc-50"
                      >
                        View as user
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-3 text-xs text-zinc-500">Loaded from Neon via /api/users.</div>
      </section>
    </div>
  );
}
