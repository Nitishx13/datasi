import fs from "node:fs";
import path from "node:path";

import { neon } from "@neondatabase/serverless";

function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.POSTGRES_URL_NON_POOLING
  );
}

async function main() {
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Set it in .env.local or as an environment variable before running db:init.",
    );
  }

  const sql = neon(url);

  const schemaPath = path.join(process.cwd(), "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");

  const withoutLineComments = schema
    .split(/\r?\n/)
    .filter((line) => !line.trimStart().startsWith("--"))
    .join("\n");

  const statements = withoutLineComments
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  let applied = 0;
  for (const stmt of statements) {
    await sql(stmt);
    applied += 1;
  }

  console.log(`OK: applied ${applied} statements from schema.sql`);
}

main().catch((e) => {
  console.error("DB init failed:");
  console.error(e?.message ?? e);
  process.exit(1);
});
