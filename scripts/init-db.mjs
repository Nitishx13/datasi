async function main() {
  await import("dotenv/config");
  const { ensureDefaults } = await import("../src/lib/store");
  await ensureDefaults();
  console.log("OK: Upstash KV initialized (defaults ensured)");
}

main().catch((e) => {
  console.error("DB init failed:");
  console.error(e?.message ?? e);
  process.exit(1);
});
