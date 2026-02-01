export type IntegrationsState = {
  googleConnected: boolean;
  metaConnected: boolean;
  lastSyncAt: string | null;
  syncing: boolean;
};

const STORAGE_KEY = "adi_integrations_state_v1";

const defaultState: IntegrationsState = {
  googleConnected: false,
  metaConnected: false,
  lastSyncAt: null,
  syncing: false,
};

export function loadIntegrationsState(): IntegrationsState {
  if (typeof window === "undefined") return defaultState;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState;
  try {
    const parsed = JSON.parse(raw) as Partial<IntegrationsState>;
    return {
      googleConnected: !!parsed.googleConnected,
      metaConnected: !!parsed.metaConnected,
      lastSyncAt: parsed.lastSyncAt ?? null,
      syncing: !!parsed.syncing,
    };
  } catch {
    return defaultState;
  }
}

export function saveIntegrationsState(state: IntegrationsState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function formatLastSync(lastSyncAt: string | null) {
  if (!lastSyncAt) return "Not yet";
  const d = new Date(lastSyncAt);
  if (Number.isNaN(d.getTime())) return "Not yet";
  return d.toLocaleString();
}
