import "server-only";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

/** Uygulama bağlantısı: Neon pooler (DATABASE_URL). Dev'de HMR'da tek havuz. */
const g = globalThis as unknown as { __istPool?: Pool };
const pool =
  g.__istPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL?.replace("sslmode=require", "sslmode=verify-full"),
    max: 5,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 10_000,
  });
if (process.env.NODE_ENV !== "production") g.__istPool = pool;

export const db = drizzle(pool, { schema });
export { schema };
