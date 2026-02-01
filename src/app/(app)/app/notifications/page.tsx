const alerts = [
  { title: "Performance drop", desc: "CTR down 22% WoW on Lead Gen | Winter Offer" },
  { title: "New issue detected", desc: "Audience fatigue on Remarketing | Website Visitors" },
  { title: "Sync pending", desc: "Connect Google Ads to start daily sync" },
];

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
        <p className="mt-1 text-sm text-zinc-600">Alerts you should act on.</p>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-4">
        <div className="text-sm font-semibold">Alerts</div>
        <div className="mt-4 flex flex-col gap-3">
          {alerts.map((a) => (
            <div key={a.title} className="rounded-xl border border-zinc-200 p-4">
              <div className="text-sm font-semibold">{a.title}</div>
              <div className="mt-1 text-sm text-zinc-600">{a.desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-zinc-500">UI only.</div>
      </section>
    </div>
  );
}
