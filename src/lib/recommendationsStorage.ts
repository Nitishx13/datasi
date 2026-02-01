export type RecommendationTemplate = {
  id: string;
  title: string;
  bullets: string[];
  enabled: boolean;
  impactMultiplier: number;
};

export type RecommendationsConfig = {
  templates: RecommendationTemplate[];
};

const STORAGE_KEY = "adi_recommendations_config_v1";

export const defaultRecommendationsConfig: RecommendationsConfig = {
  templates: [
    {
      id: "rec_creative",
      title: "Fix Creative",
      bullets: [
        "Improve CTR to hit target",
        "Change headline (keep it simple + outcome focused)",
        "Test UGC style video + 1 static image variant",
      ],
      enabled: true,
      impactMultiplier: 1,
    },
    {
      id: "rec_lp",
      title: "Fix Landing Page",
      bullets: [
        "Increase conversion rate to hit target",
        "Simplify the form (reduce steps/fields)",
        "Improve CTA + add trust (reviews, guarantees)",
      ],
      enabled: true,
      impactMultiplier: 1,
    },
    {
      id: "rec_cpa",
      title: "Reduce CPA",
      bullets: [
        "Bring CPA down to hit profit goal",
        "Cut waste: pause worst ads/adsets",
        "Shift budget to best performer + tighten targeting",
      ],
      enabled: true,
      impactMultiplier: 1,
    },
  ],
};

export function loadRecommendationsConfig(): RecommendationsConfig {
  if (typeof window === "undefined") return defaultRecommendationsConfig;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultRecommendationsConfig;
  try {
    const parsed = JSON.parse(raw) as Partial<RecommendationsConfig>;
    const templates = Array.isArray(parsed.templates) ? parsed.templates : defaultRecommendationsConfig.templates;
    return {
      templates: templates
        .filter((t) => t && typeof t === "object")
        .map((t) => {
          const anyT = t as Partial<RecommendationTemplate>;
          return {
            id: String(anyT.id ?? ""),
            title: String(anyT.title ?? ""),
            bullets: Array.isArray(anyT.bullets) ? anyT.bullets.map((b) => String(b)) : [],
            enabled: anyT.enabled !== false,
            impactMultiplier: Number.isFinite(Number(anyT.impactMultiplier)) ? Number(anyT.impactMultiplier) : 1,
          };
        })
        .filter((t) => !!t.id && !!t.title),
    };
  } catch {
    return defaultRecommendationsConfig;
  }
}

export function saveRecommendationsConfig(config: RecommendationsConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function resetRecommendationsConfig() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
