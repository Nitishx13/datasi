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

const STORAGE_KEY = "adi_rules_config_v1";

export const defaultRulesConfig: RulesConfig = {
  healthWeights: {
    ctr: 25,
    cvr: 30,
    cpa: 30,
    roas: 15,
  },
  severityThresholds: {
    critical: 0.35,
    medium: 0.15,
  },
};

export function loadRulesConfig(): RulesConfig {
  if (typeof window === "undefined") return defaultRulesConfig;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultRulesConfig;
  try {
    const parsed = JSON.parse(raw) as Partial<RulesConfig>;
    return {
      healthWeights: {
        ctr: Number(parsed.healthWeights?.ctr ?? defaultRulesConfig.healthWeights.ctr),
        cvr: Number(parsed.healthWeights?.cvr ?? defaultRulesConfig.healthWeights.cvr),
        cpa: Number(parsed.healthWeights?.cpa ?? defaultRulesConfig.healthWeights.cpa),
        roas: Number(parsed.healthWeights?.roas ?? defaultRulesConfig.healthWeights.roas),
      },
      severityThresholds: {
        critical: Number(parsed.severityThresholds?.critical ?? defaultRulesConfig.severityThresholds.critical),
        medium: Number(parsed.severityThresholds?.medium ?? defaultRulesConfig.severityThresholds.medium),
      },
    };
  } catch {
    return defaultRulesConfig;
  }
}

export function saveRulesConfig(config: RulesConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function resetRulesConfig() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
