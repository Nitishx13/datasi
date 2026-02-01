export type Platform = "Google" | "Meta";

export type Severity = "Low" | "Medium" | "High";

export type ProblemType =
  | "Creative Issue"
  | "Audience Fatigue"
  | "Landing Page Issue"
  | "Tracking / Objective Issue"
  | "Budget Waste"
  | "Targeting Problem";

export type Problem = {
  id: string;
  campaignId: string;
  platform: Platform;
  type: ProblemType;
  reason: string;
  severity: Severity;
  recommendations: string[];
};

export type Campaign = {
  id: string;
  name: string;
  platform: Platform;
  spend: number;
  ctr: number;
  cpc: number;
  conversions: number;
  frequency?: number;
  healthScore: number;
  topIssue?: ProblemType;
};

export type DailyTrendPoint = {
  date: string;
  spend: number;
  conversions: number;
};

const campaigns: Campaign[] = [
  {
    id: "cmp_101",
    name: "Lead Gen | Winter Offer",
    platform: "Meta",
    spend: 42110,
    ctr: 0.0062,
    cpc: 18,
    conversions: 31,
    frequency: 3.6,
    healthScore: 61,
    topIssue: "Creative Issue",
  },
  {
    id: "cmp_202",
    name: "Search | Brand + Competitor",
    platform: "Google",
    spend: 51540,
    ctr: 0.041,
    cpc: 29,
    conversions: 78,
    healthScore: 82,
    topIssue: "Budget Waste",
  },
  {
    id: "cmp_303",
    name: "Remarketing | Website Visitors",
    platform: "Meta",
    spend: 30950,
    ctr: 0.019,
    cpc: 14,
    conversions: 37,
    frequency: 3.2,
    healthScore: 79,
    topIssue: "Audience Fatigue",
  },
];

const problems: Problem[] = [
  {
    id: "pb_1",
    campaignId: "cmp_101",
    platform: "Meta",
    type: "Creative Issue",
    severity: "High",
    reason: "CTR is 0.6% (typical ~1.5%). People are not finding the ad compelling.",
    recommendations: [
      "Test a new headline + first 3-second hook",
      "Add UGC/testimonial style creative",
      "Try 2-3 new angles: price, outcome, proof",
    ],
  },
  {
    id: "pb_2",
    campaignId: "cmp_101",
    platform: "Meta",
    type: "Landing Page Issue",
    severity: "Medium",
    reason:
      "Your ads are getting clicks, but people aren’t converting. Usually landing page speed, offer clarity, or form friction.",
    recommendations: [
      "Check page load time on mobile (aim < 3s)",
      "Reduce form fields (name + phone/email is enough)",
      "Match landing page headline with ad promise",
    ],
  },
  {
    id: "pb_3",
    campaignId: "cmp_303",
    platform: "Meta",
    type: "Audience Fatigue",
    severity: "High",
    reason: "Frequency is 3.2+. Same people are seeing the same ad too often.",
    recommendations: [
      "Rotate 3-5 new creatives",
      "Expand audience (lookalike / broad)",
      "Add exclusions (recent converters / engaged users)",
    ],
  },
  {
    id: "pb_4",
    campaignId: "cmp_202",
    platform: "Google",
    type: "Budget Waste",
    severity: "Medium",
    reason:
      "Spend is growing but results are not growing proportionately. Likely leakage via broad keywords / placements.",
    recommendations: [
      "Review search terms and add negatives",
      "Split brand vs non-brand",
      "Check locations/devices that burn spend",
    ],
  },
  {
    id: "pb_5",
    campaignId: "cmp_202",
    platform: "Google",
    type: "Tracking / Objective Issue",
    severity: "Low",
    reason:
      "If conversion count looks off, it might be tracking duplication or wrong primary event.",
    recommendations: [
      "Confirm primary conversion action",
      "Check tag firing (GTM / gtag)",
      "Verify attribution window is correct",
    ],
  },
];

const trend7d: DailyTrendPoint[] = [
  { date: "Mon", spend: 15400, conversions: 26 },
  { date: "Tue", spend: 17100, conversions: 24 },
  { date: "Wed", spend: 18200, conversions: 19 },
  { date: "Thu", spend: 16000, conversions: 21 },
  { date: "Fri", spend: 19300, conversions: 18 },
  { date: "Sat", spend: 17800, conversions: 20 },
  { date: "Sun", spend: 16800, conversions: 18 },
];

export function getDashboardSummary() {
  return {
    totalSpend7d: 124600,
    leads7d: 146,
    healthScore: 74,
    topIssues: problems
      .slice(0, 3)
      .map((p) => ({ id: p.id, type: p.type, reason: p.reason, next: p.recommendations[0] })),
    trend7d,
    campaigns,
  };
}

export function getAllProblems() {
  return problems;
}

export function getCampaignById(id: string) {
  return campaigns.find((c) => c.id === id) ?? null;
}

export function getProblemsByCampaignId(campaignId: string) {
  return problems.filter((p) => p.campaignId === campaignId);
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPct(value: number) {
  return `${(value * 100).toFixed(2)}%`;
}
