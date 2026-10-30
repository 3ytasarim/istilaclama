// Salt-okunur veritabanı incelemesi: hiçbir şey yazmaz.
import { config } from "dotenv";
import { Client } from "pg";
config({ path: ".env.local" });

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL yok");
const c = new Client({ connectionString: url });
await c.connect();
await c.query("SET default_transaction_read_only = on");
const v = await c.query("select version(), current_database() db, current_user usr");
console.log("Sunucu:", v.rows[0].version.split(" on ")[0], "| db:", v.rows[0].db, "| kullanıcı:", v.rows[0].usr);
const schemas = await c.query(`select schema_name from information_schema.schemata where schema_name not in ('pg_catalog','information_schema','pg_toast') and schema_name not like 'pg_%' order by 1`);
console.log("Şemalar:", schemas.rows.map((r) => r.schema_name).join(", "));
const t = await c.query(`select table_schema, table_name from information_schema.tables where table_schema not in ('pg_catalog','information_schema') and table_type='BASE TABLE' order by 1,2`);
console.log(`Tablo sayısı: ${t.rowCount}`);
for (const r of t.rows) {
  const n = await c.query(`select count(*)::int n from "${r.table_schema}"."${r.table_name}"`);
  console.log(` - ${r.table_schema}.${r.table_name}: ${n.rows[0].n} satır`);
}
const ext = await c.query("select extname from pg_extension order by 1");
console.log("Eklentiler:", ext.rows.map((r) => r.extname).join(", "));
await c.end();
