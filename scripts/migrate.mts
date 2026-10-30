// Migration'ları doğrudan host üzerinden uygular (pooler çok komutlu işlemlerde güvenilmez).
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";
config({ path: ".env.local", quiet: true });

const url = (process.env.DIRECT_URL || process.env.DATABASE_URL || "").replace("-pooler.", ".").replace("sslmode=require", "sslmode=verify-full");
if (!url) throw new Error("DATABASE_URL yok");
const client = new Client({ connectionString: url });
await client.connect();
await migrate(drizzle(client), { migrationsFolder: "./drizzle" });
const t = await client.query(`select count(*)::int n from information_schema.tables where table_schema='public' and table_type='BASE TABLE'`);
console.log("Migration tamam. public şemasındaki tablo sayısı:", t.rows[0].n);
await client.end();
