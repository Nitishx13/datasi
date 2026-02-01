export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Account settings</h1>
        <p className="mt-1 text-sm text-zinc-600">Profile, password, email preferences.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Profile</div>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <label className="text-sm">
              <div className="text-xs text-zinc-600">Name</div>
              <input
                className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                placeholder="Your name"
              />
            </label>
            <label className="text-sm">
              <div className="text-xs text-zinc-600">Email</div>
              <input
                className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                placeholder="you@company.com"
              />
            </label>
            <button
              type="button"
              className="mt-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Save
            </button>
          </div>
          <div className="mt-2 text-xs text-zinc-500">UI only.</div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="text-sm font-semibold">Password</div>
          <div className="mt-4 grid grid-cols-1 gap-3">
            <label className="text-sm">
              <div className="text-xs text-zinc-600">Current password</div>
              <input
                type="password"
                className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
              />
            </label>
            <label className="text-sm">
              <div className="text-xs text-zinc-600">New password</div>
              <input
                type="password"
                className="mt-1 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
              />
            </label>
            <button
              type="button"
              className="mt-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Change password
            </button>
          </div>
          <div className="mt-2 text-xs text-zinc-500">UI only.</div>
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6">
        <div className="text-sm font-semibold">Email preferences</div>
        <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-700">
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" />
            <span>Weekly summary email</span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" />
            <span>Important alerts only</span>
          </label>
        </div>
        <div className="mt-4 text-xs text-zinc-500">UI only.</div>
      </section>
    </div>
  );
}
