import { cookies } from "next/headers";

import { getSql } from "@/lib/db";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
};

const SESSION_COOKIE = "adi_session";

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export async function getSessionUser(): Promise<AuthUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const sql = getSql();
  const rows = (await sql`
    select u.id, u.email, u.role
    from sessions s
    join users u on u.id = s.user_id
    where s.token = ${token}
      and s.expires_at > now()
    limit 1
  `) as Array<{ id: string; email: string; role: string }>;

  return rows[0] ?? null;
}

export async function requireUser(): Promise<AuthUser> {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("UNAUTHENTICATED");
  }
  return user;
}

export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireUser();
  if (user.role !== "admin") {
    throw new Error("FORBIDDEN");
  }
  return user;
}
