import { NextResponse, type NextRequest } from "next/server";

import { getSql } from "@/lib/db";

const SESSION_COOKIE = "adi_session";

async function getUserForRequest(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
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

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/_next") || pathname.startsWith("/public") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  const isAuthPage = pathname.startsWith("/auth");
  const isApp = pathname.startsWith("/app");
  const isAdmin = pathname.startsWith("/admin");

  if (!isApp && !isAdmin && !isAuthPage) {
    return NextResponse.next();
  }

  const user = await getUserForRequest(req);

  if (isAuthPage && user) {
    const url = req.nextUrl.clone();
    url.pathname = user.role === "admin" ? "/admin" : "/app";
    return NextResponse.redirect(url);
  }

  if (isApp) {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  if (isAdmin) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    if (user.role !== "admin") {
      const url = req.nextUrl.clone();
      url.pathname = "/app";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
