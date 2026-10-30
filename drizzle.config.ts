import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config({ path: ".env.local" });

/** Migration'lar doğrudan host üzerinden (pooler çok komutlu işlemlerde güvenilmez). */
const direct = (process.env.DIRECT_URL || process.env.DATABASE_URL || "").replace("-pooler.", ".");

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: direct },
  strict: true,
});
