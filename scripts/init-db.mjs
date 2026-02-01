async function main() {
  const dotenv = await import("dotenv");
  dotenv.config({ path: ".env.local" });

  const { Redis } = await import("@upstash/redis");
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.KV_REST_API_READ_ONLY_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Upstash env vars missing. Set KV_REST_API_URL and KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN) in .env.local",
    );
  }

  const redis = new Redis({ url, token });

  const existingRules = await redis.get("rules_config");
  if (!existingRules) {
    await redis.set(
      "rules_config",
      JSON.stringify({
        healthWeights: { ctr: 25, cvr: 30, cpa: 30, roas: 15 },
        severityThresholds: { critical: 0.35, medium: 0.15 },
      }),
    );
  }

  console.log("OK: Upstash KV initialized (defaults ensured)");
}

main().catch((e) => {
  console.error("DB init failed:");
  console.error(e?.message ?? e);
  process.exit(1);
});
