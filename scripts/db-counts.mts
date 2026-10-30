import { config } from "dotenv";
import { Client } from "pg";
config({ path: ".env.local", quiet: true });
const c = new Client({ connectionString: (process.env.DATABASE_URL || "").replace("sslmode=require", "sslmode=verify-full") });
await c.connect();
for (const t of ["media_assets", "services", "districts", "neighbourhoods", "blog_categories", "blog_posts", "faq_items", "site_settings", "pages", "users", "leads"]) {
  const r = await c.query(`select count(*)::int n from ${t}`);
  console.log(t.padEnd(16), r.rows[0].n);
}
const fix = process.argv.includes("--fix-name");
const r = await c.query(`select value from site_settings where key='business.name'`);
console.log("business.name =", JSON.stringify(r.rows[0]?.value));
if (fix) await c.query(`update site_settings set value = '{"value":"İST İlaçlama","verified":true}'::jsonb where key='business.name' and jsonb_typeof(value) <> 'object'`);
await c.end();
