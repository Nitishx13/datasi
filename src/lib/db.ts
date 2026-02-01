export function getSql(): never {
  throw new Error("SQL database layer removed. Use Upstash KV store in src/lib/store.ts");
}
