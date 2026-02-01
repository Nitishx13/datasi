import type { CurrentMetrics, GoalInputs, GoalTargets } from "@/lib/goalEngine";

export type GoalState = {
  inputs: GoalInputs;
  targets: GoalTargets;
  current: CurrentMetrics;
  savedAt: string;
};

type GoalStateByUser = Record<string, GoalState>;

const STORAGE_KEY = "adi_goal_state_by_user_v1";
const LEGACY_STORAGE_KEY = "adi_goal_state_v1";

function readAll(): GoalStateByUser {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as GoalStateByUser;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
}

function writeAll(state: GoalStateByUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function migrateLegacy(defaultUserId: string) {
  if (typeof window === "undefined") return;
  const legacyRaw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!legacyRaw) return;

  try {
    const legacy = JSON.parse(legacyRaw) as GoalState;
    if (!legacy?.inputs || !legacy?.targets || !legacy?.current) return;
    const all = readAll();
    if (!all[defaultUserId]) {
      all[defaultUserId] = legacy;
      writeAll(all);
    }
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    return;
  }
}

export function loadGoalState(userId: string): GoalState | null {
  if (typeof window === "undefined") return null;
  migrateLegacy(userId);
  const all = readAll();
  const parsed = all[userId];
  if (!parsed?.inputs || !parsed?.targets || !parsed?.current) return null;
  return parsed;
}

export function saveGoalState(userId: string, state: GoalState) {
  if (typeof window === "undefined") return;
  const all = readAll();
  all[userId] = state;
  writeAll(all);
}

export function clearGoalState(userId: string) {
  if (typeof window === "undefined") return;
  const all = readAll();
  delete all[userId];
  writeAll(all);
}

export function loadAllGoalStates(): GoalStateByUser {
  if (typeof window === "undefined") return {};
  migrateLegacy("user_1");
  return readAll();
}
