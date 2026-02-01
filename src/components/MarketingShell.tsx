import Link from "next/link";

export default function MarketingShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="font-semibold tracking-tight">
            Ads Decision Intelligence
          </Link>
          <nav className="hidden items-center gap-4 text-sm md:flex">
            <Link href="/features" className="text-zinc-700 hover:text-zinc-950">
              Features
            </Link>
            <Link href="/how-it-works" className="text-zinc-700 hover:text-zinc-950">
              How it works
            </Link>
            <Link href="/pricing" className="text-zinc-700 hover:text-zinc-950">
              Pricing
            </Link>
            <Link href="/use-cases" className="text-zinc-700 hover:text-zinc-950">
              Use cases
            </Link>
            <Link href="/about" className="text-zinc-700 hover:text-zinc-950">
              About
            </Link>
            <Link href="/contact" className="text-zinc-700 hover:text-zinc-950">
              Support
            </Link>
            <Link href="/blog" className="text-zinc-700 hover:text-zinc-950">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm text-zinc-700 hover:text-zinc-950">
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-4">
          <div>
            <div className="font-semibold">Ads Decision Intelligence</div>
            <div className="mt-2 text-sm text-zinc-600">
              We don’t show numbers. We tell you what’s broken and how to fix it.
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold">Product</div>
            <div className="mt-2 flex flex-col gap-2 text-sm">
              <Link className="text-zinc-600 hover:text-zinc-900" href="/features">
                Features
              </Link>
              <Link className="text-zinc-600 hover:text-zinc-900" href="/pricing">
                Pricing
              </Link>
              <Link className="text-zinc-600 hover:text-zinc-900" href="/how-it-works">
                How it works
              </Link>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold">Company</div>
            <div className="mt-2 flex flex-col gap-2 text-sm">
              <Link className="text-zinc-600 hover:text-zinc-900" href="/about">
                About
              </Link>
              <Link className="text-zinc-600 hover:text-zinc-900" href="/contact">
                Contact
              </Link>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold">Platforms</div>
            <div className="mt-2 text-sm text-zinc-600">
              Google Ads • Meta Ads
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-200 py-4">
          <div className="mx-auto w-full max-w-6xl px-4 text-xs text-zinc-500">
            © {new Date().getFullYear()} Ads Decision Intelligence
          </div>
        </div>
      </footer>
    </div>
  );
}
