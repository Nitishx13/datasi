import Link from "next/link";

export default function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="font-semibold tracking-tight">
            Ads Decision Intelligence
          </Link>
          <Link href="/" className="text-sm text-zinc-700 hover:text-zinc-950">
            Back
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md px-4 py-10">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
