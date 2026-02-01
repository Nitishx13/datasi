import { cookies } from "next/headers";

import { getSession, getUserById } from "@/lib/store";

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

  const session = await getSession(token);
  if (!session?.userId) return null;

  const user = await getUserById(session.userId);
  if (!user) return null;

  return { id: user.id, email: user.email, role: user.role };
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
