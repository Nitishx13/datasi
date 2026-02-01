import { getRedis } from "@/lib/kv";

export type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
};

export type StoredSession = {
  token: string;
  userId: string;
  expiresAt: string;
};

const KEY = {
  user: (id: string) => `user:${id}`,
  userEmail: (email: string) => `user_email:${email.toLowerCase()}`,
  users: "users",
  session: (token: string) => `session:${token}`,
  goal: (userId: string) => `goal:${userId}`,
  rules: "rules_config",
  recIds: "recommendation_templates",
  rec: (id: string) => `recommendation_template:${id}`,
};

async function getJson<T>(key: string): Promise<T | null> {
  const redis = getRedis();
  const raw = (await redis.get(key)) as any;
  if (!raw) return null;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }
  return raw as T;
}

async function setJson(key: string, value: unknown) {
  const redis = getRedis();
  await redis.set(key, JSON.stringify(value));
}

async function setJsonWithTtlSeconds(key: string, value: unknown, ttlSeconds: number) {
  const redis = getRedis();
  await redis.set(key, JSON.stringify(value));
  await redis.expire(key, ttlSeconds);
}

export async function getUserById(id: string): Promise<StoredUser | null> {
  return await getJson<StoredUser>(KEY.user(id));
}

export async function getUserByEmail(email: string): Promise<StoredUser | null> {
  const redis = getRedis();
  const ref = await getJson<{ id: string }>(KEY.userEmail(email));
  if (!ref?.id) return null;
  return await getUserById(ref.id);
}

export async function listUsers(): Promise<Array<Pick<StoredUser, "id" | "email" | "createdAt">>> {
  const redis = getRedis();
  const ids = (await redis.smembers(KEY.users)) as string[];
  const out: Array<Pick<StoredUser, "id" | "email" | "createdAt">> = [];
  for (const id of ids ?? []) {
    const u = await getUserById(id);
    if (u) out.push({ id: u.id, email: u.email, createdAt: u.createdAt });
  }
  out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return out;
}

export async function createUser(params: {
  id: string;
  email: string;
  passwordHash: string;
  role: "admin" | "user";
}): Promise<StoredUser> {
  const redis = getRedis();
  const email = params.email.toLowerCase();

  const existing = await getJson<{ id: string }>(KEY.userEmail(email));
  if (existing?.id) {
    throw new Error("USER_EXISTS");
  }

  const now = new Date().toISOString();
  const user: StoredUser = {
    id: params.id,
    email,
    passwordHash: params.passwordHash,
    role: params.role,
    createdAt: now,
    updatedAt: now,
  };

  await setJson(KEY.user(user.id), user);
  await setJson(KEY.userEmail(email), { id: user.id });
  await redis.sadd(KEY.users, user.id);

  return user;
}

export async function upsertAdminByEmail(emailInput: string, passwordHash: string) {
  const redis = getRedis();
  const email = emailInput.toLowerCase();

  const ref = await getJson<{ id: string }>(KEY.userEmail(email));
  if (ref?.id) {
    const u = await getUserById(ref.id);
    if (!u) {
      await setJson(KEY.userEmail(email), null);
    } else {
      const next: StoredUser = {
        ...u,
        role: "admin",
        passwordHash,
        updatedAt: new Date().toISOString(),
      };
      await setJson(KEY.user(u.id), next);
      await redis.sadd(KEY.users, next.id);
      return { user: next, promoted: true };
    }
  }

  const id = crypto.randomUUID();
  const user = await createUser({ id, email, passwordHash, role: "admin" });
  return { user, promoted: false };
}

export async function createSession(userId: string, token: string, expiresAt: Date) {
  const ttlSeconds = Math.max(1, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
  const session: StoredSession = {
    token,
    userId,
    expiresAt: expiresAt.toISOString(),
  };
  await setJsonWithTtlSeconds(KEY.session(token), session, ttlSeconds);
  return session;
}

export async function deleteSession(token: string) {
  const redis = getRedis();
  await redis.del(KEY.session(token));
}

export async function getSession(token: string): Promise<StoredSession | null> {
  const s = await getJson<StoredSession>(KEY.session(token));
  if (!s?.userId || !s?.expiresAt) return null;
  if (Date.parse(s.expiresAt) <= Date.now()) return null;
  return s;
}

export async function getGoal(userId: string) {
  return await getJson<any>(KEY.goal(userId));
}

export async function setGoal(userId: string, goal: unknown) {
  await setJson(KEY.goal(userId), goal);
}

export async function deleteGoal(userId: string) {
  const redis = getRedis();
  await redis.del(KEY.goal(userId));
}

export async function getRulesConfig() {
  return await getJson<any>(KEY.rules);
}

export async function setRulesConfig(config: unknown) {
  await setJson(KEY.rules, config);
}

export type RecommendationTemplate = {
  id: string;
  title: string;
  bullets: string[];
  enabled: boolean;
  impactMultiplier: number;
};

export async function listRecommendationTemplates(): Promise<RecommendationTemplate[]> {
  const redis = getRedis();
  const ids = (await redis.smembers(KEY.recIds)) as string[];
  const out: RecommendationTemplate[] = [];
  for (const id of ids ?? []) {
    const t = await getJson<RecommendationTemplate>(KEY.rec(id));
    if (t) out.push(t);
  }
  return out;
}

export async function replaceRecommendationTemplates(templates: RecommendationTemplate[]) {
  const redis = getRedis();
  const existingIds = (await redis.smembers(KEY.recIds)) as string[];
  for (const id of existingIds ?? []) {
    await redis.del(KEY.rec(id));
  }
  await redis.del(KEY.recIds);

  for (const t of templates) {
    if (!t?.id || !t?.title) continue;
    const normalized: RecommendationTemplate = {
      id: t.id,
      title: t.title,
      bullets: Array.isArray(t.bullets) ? t.bullets : [],
      enabled: t.enabled !== false,
      impactMultiplier: Number.isFinite(Number(t.impactMultiplier)) ? Number(t.impactMultiplier) : 1,
    };
    await setJson(KEY.rec(normalized.id), normalized);
    await redis.sadd(KEY.recIds, normalized.id);
  }
}

export async function ensureDefaults() {
  const redis = getRedis();

  const existingRules = await getRulesConfig();
  if (!existingRules) {
    await setRulesConfig({
      healthWeights: { ctr: 25, cvr: 30, cpa: 30, roas: 15 },
      severityThresholds: { critical: 0.35, medium: 0.15 },
    });
  }

  const recIds = (await redis.smembers(KEY.recIds)) as string[];
  if (!recIds || recIds.length === 0) {
    // ensure key exists (no-op; leaving empty is fine)
  }
}
