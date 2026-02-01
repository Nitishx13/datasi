export type GoalInputs = {
  dailySpend: number;
  durationDays: number;
  desiredProfit: number;
  revenuePerConversion: number;
};

export type CurrentMetrics = {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
};

export type GoalTargets = {
  totalSpend: number;
  requiredRevenue: number;
  requiredConversions: number;
  requiredCpa: number;
  requiredClicks: number;
  requiredCvr: number;
  requiredCtr: number;
  targetRoas: number;
};

export type CurrentRates = {
  currentCpc: number;
  currentCpa: number;
  currentCtr: number;
  currentCvr: number;
  roas: number;
};

export type GoalGaps = {
  cpaGap: number;
  ctrGap: number;
  cvrGap: number;
  profitGap: number;
};

export type ProblemSeverity = "Critical" | "Medium" | "Low";

export type ProblemType =
  | "Profit Goal Not Achievable"
  | "Creative Problem"
  | "Landing Page Problem";

export type Problem = {
  id: string;
  type: ProblemType;
  severity: ProblemSeverity;
  metricGapLabel: string;
  summary: string;
};

export type Recommendation = {
  id: string;
  title: string;
  bullets: string[];
  impactScore: number;
};

export type RulesConfig = {
  healthWeights: {
    ctr: number;
    cvr: number;
    cpa: number;
    roas: number;
  };
  severityThresholds: {
    critical: number;
    medium: number;
  };
};

const defaultRules: RulesConfig = {
  healthWeights: { ctr: 25, cvr: 30, cpa: 30, roas: 15 },
  severityThresholds: { critical: 0.35, medium: 0.15 },
};

export const defaultCurrentMetrics: CurrentMetrics = {
  impressions: 10000,
  clicks: 120,
  conversions: 5,
  spend: 9000,
  revenue: 10000,
};

function safeDiv(n: number, d: number) {
  if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) return 0;
  return n / d;
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPct(value: number, digits = 2) {
  if (!Number.isFinite(value)) return "0%";
  return `${(value * 100).toFixed(digits)}%`;
}

export function computeCurrentRates(current: CurrentMetrics): CurrentRates {
  const currentCpc = safeDiv(current.spend, current.clicks);
  const currentCpa = safeDiv(current.spend, current.conversions);
  const currentCtr = safeDiv(current.clicks, current.impressions);
  const currentCvr = safeDiv(current.conversions, current.clicks);
  const roas = safeDiv(current.revenue, current.spend);

  return {
    currentCpc,
    currentCpa,
    currentCtr,
    currentCvr,
    roas,
  };
}

export function computeGoalTargets(inputs: GoalInputs, current: CurrentMetrics): GoalTargets {
  const totalSpend = inputs.dailySpend * inputs.durationDays;
  const requiredRevenue = totalSpend + inputs.desiredProfit;
  const requiredConversions = safeDiv(requiredRevenue, inputs.revenuePerConversion);

  const requiredCpa = safeDiv(totalSpend, requiredConversions);

  const { currentCpc } = computeCurrentRates(current);
  const requiredClicks = safeDiv(totalSpend, currentCpc);

  const requiredCvr = safeDiv(requiredConversions, requiredClicks);
  const requiredCtr = safeDiv(requiredClicks, current.impressions);

  const targetRoas = safeDiv(requiredRevenue, totalSpend);

  return {
    totalSpend,
    requiredRevenue,
    requiredConversions,
    requiredCpa,
    requiredClicks,
    requiredCvr,
    requiredCtr,
    targetRoas,
  };
}

export function computeGaps(targets: GoalTargets, current: CurrentMetrics): GoalGaps {
  const rates = computeCurrentRates(current);

  const cpaGap = rates.currentCpa - targets.requiredCpa;
  const ctrGap = targets.requiredCtr - rates.currentCtr;
  const cvrGap = targets.requiredCvr - rates.currentCvr;

  const profitGap = targets.requiredRevenue - current.revenue;

  return {
    cpaGap,
    ctrGap,
    cvrGap,
    profitGap,
  };
}

export function computeHealthScore(targets: GoalTargets, current: CurrentMetrics, rules?: RulesConfig) {
  const rates = computeCurrentRates(current);

  const w = rules?.healthWeights ?? defaultRules.healthWeights;

  const ctrPart = safeDiv(rates.currentCtr, targets.requiredCtr) * w.ctr;
  const cvrPart = safeDiv(rates.currentCvr, targets.requiredCvr) * w.cvr;
  const cpaPart = safeDiv(targets.requiredCpa, rates.currentCpa) * w.cpa;
  const roasPart = safeDiv(rates.roas, targets.targetRoas) * w.roas;

  const raw = ctrPart + cvrPart + cpaPart + roasPart;
  return clamp(Math.round(raw), 0, 100);
}

export function severityFromGapMagnitude(gap: number, requiredValue: number, rules?: RulesConfig): ProblemSeverity {
  const pct = requiredValue === 0 ? 0 : Math.abs(gap) / requiredValue;

  const t = rules?.severityThresholds ?? defaultRules.severityThresholds;
  if (pct >= t.critical) return "Critical";
  if (pct >= t.medium) return "Medium";
  return "Low";
}

export function deriveProblems(
  inputs: GoalInputs,
  targets: GoalTargets,
  current: CurrentMetrics,
  rules?: RulesConfig,
): Problem[] {
  const gaps = computeGaps(targets, current);
  const rates = computeCurrentRates(current);

  const out: Problem[] = [];

  if (gaps.cpaGap > 0) {
    out.push({
      id: "pb_profit",
      type: "Profit Goal Not Achievable",
      severity: severityFromGapMagnitude(gaps.cpaGap, targets.requiredCpa, rules),
      metricGapLabel: `CPA gap: ${formatINR(rates.currentCpa)} vs ${formatINR(targets.requiredCpa)}`,
      summary: "Your CPA is too high for your profit goal. You’ll need cheaper leads/sales or higher revenue per conversion.",
    });
  }

  if (gaps.ctrGap > 0 || gaps.cvrGap > 0) {
    if (gaps.ctrGap > gaps.cvrGap) {
      out.push({
        id: "pb_creative",
        type: "Creative Problem",
        severity: severityFromGapMagnitude(gaps.ctrGap, targets.requiredCtr, rules),
        metricGapLabel: `CTR gap: ${formatPct(rates.currentCtr)} vs ${formatPct(targets.requiredCtr)}`,
        summary: "Ads are not getting enough clicks. Creative/message needs improvement.",
      });
    } else {
      out.push({
        id: "pb_lp",
        type: "Landing Page Problem",
        severity: severityFromGapMagnitude(gaps.cvrGap, targets.requiredCvr, rules),
        metricGapLabel: `CVR gap: ${formatPct(rates.currentCvr)} vs ${formatPct(targets.requiredCvr)}`,
        summary: "Clicks are coming, but conversions are low. Landing page/offer needs improvement.",
      });
    }
  }

  return out;
}

export function deriveRecommendations(inputs: GoalInputs, targets: GoalTargets, current: CurrentMetrics): Recommendation[] {
  const gaps = computeGaps(targets, current);
  const rates = computeCurrentRates(current);

  const recs: Recommendation[] = [];

  if (gaps.ctrGap > 0) {
    recs.push({
      id: "rec_creative",
      title: "Fix Creative",
      bullets: [
        `Improve CTR by +${formatPct(gaps.ctrGap, 2)} (from ${formatPct(rates.currentCtr)} → ${formatPct(targets.requiredCtr)})`,
        "Change headline (keep it simple + outcome focused)",
        "Test UGC style video + 1 static image variant",
      ],
      impactScore: Math.abs(gaps.ctrGap) * 100,
    });
  }

  if (gaps.cvrGap > 0) {
    recs.push({
      id: "rec_lp",
      title: "Fix Landing Page",
      bullets: [
        `Increase CVR (from ${formatPct(rates.currentCvr)} → ${formatPct(targets.requiredCvr)})`,
        "Simplify the form (reduce steps/fields)",
        "Improve CTA + add trust (reviews, guarantees)",
      ],
      impactScore: Math.abs(gaps.cvrGap) * 120,
    });
  }

  if (gaps.cpaGap > 0) {
    recs.push({
      id: "rec_cpa",
      title: "Reduce CPA",
      bullets: [
        `Bring CPA down to ${formatINR(targets.requiredCpa)} (currently ${formatINR(rates.currentCpa)})`,
        "Cut waste: pause worst ads/adsets", 
        "Shift budget to best performer + tighten targeting",
      ],
      impactScore: Math.abs(gaps.cpaGap),
    });
  }

  return recs.sort((a, b) => b.impactScore - a.impactScore);
}
