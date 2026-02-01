import CampaignsTable from "@/components/CampaignsTable";
import { getDashboardSummary } from "@/lib/mockData";

export default function CampaignListPage() {
  const { campaigns } = getDashboardSummary();

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Campaigns</h1>
        <p className="mt-1 text-sm text-zinc-600">
          All campaigns in one table. Focus on low health first.
        </p>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-4">
        <CampaignsTable campaigns={campaigns} />
      </section>
    </div>
  );
}
