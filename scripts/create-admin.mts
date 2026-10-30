// İlk admin kullanıcısını oluşturur. Şifre ekrana yazılmaz; git dışındaki .admin-credentials.local dosyasına kaydedilir.
// Kullanım: npx tsx scripts/create-admin.mts e-posta@adres "Ad Soyad"
import { config } from "dotenv";
import { randomBytes } from "node:crypto";
import { writeFileSync } from "node:fs";
import { hash } from "@node-rs/argon2";
import { Client } from "pg";
config({ path: ".env.local", quiet: true });

const [email, name = "Yönetici"] = process.argv.slice(2);
if (!email || !email.includes("@")) throw new Error('Kullanım: npx tsx scripts/create-admin.mts e-posta@adres "Ad Soyad"');
const password = randomBytes(12).toString("base64url");
const passwordHash = await hash(password, { memoryCost: 19456, timeCost: 2, parallelism: 1 });
const c = new Client({ connectionString: (process.env.DATABASE_URL || "").replace("sslmode=require", "sslmode=verify-full") });
await c.connect();
const r = await c.query(
  `insert into users (email, name, password_hash, role) values ($1, $2, $3, 'admin')
   on conflict (lower(email)) do update set password_hash = excluded.password_hash, is_active = true
   returning id`,
  [email.trim().toLowerCase(), name, passwordHash],
);
await c.end();
writeFileSync(".admin-credentials.local", `Admin girişi: http://localhost:3460/admin/giris\nE-posta: ${email}\nŞifre: ${password}\n\nİlk girişten sonra şifrenizi admin panelinden değiştirin ve bu dosyayı silin.\n`);
console.log(`Admin hazır (id ${r.rows[0].id}). Şifre .admin-credentials.local dosyasına yazıldı (git dışında).`);
