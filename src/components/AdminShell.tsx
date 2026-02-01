import Link from "next/link";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/subscriptions", label: "Subscriptions" },
  { href: "/admin/integrations", label: "Integrations" },
  { href: "/admin/sync-logs", label: "Sync logs" },
  { href: "/admin/rules", label: "Rule engine" },
  { href: "/admin/recommendations", label: "Recommendations" },
  { href: "/admin/benchmarks", label: "Benchmarks" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/cms", label: "CMS" },
  { href: "/admin/support", label: "Support" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/admin" className="font-semibold tracking-tight">
            Admin • Ads Decision Intelligence
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link className="text-zinc-700 hover:text-zinc-950" href="/app">
              App
            </Link>
            <Link className="text-zinc-700 hover:text-zinc-950" href="/">
              Public site
            </Link>
            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <nav className="rounded-xl border border-zinc-200 bg-white p-3">
            <div className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
