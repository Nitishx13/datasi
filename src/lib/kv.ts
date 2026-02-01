import { Redis } from "@upstash/redis/cloudflare";

let redis: Redis | null = null;

export function getRedis() {
  if (redis) return redis;

  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.KV_REST_API_READ_ONLY_TOKEN;

  if (!url || !token) {
    redis = Redis.fromEnv();
    return redis;
  }

  redis = new Redis({ url, token });
  return redis;
}
