# Açık Maddeler — Kullanıcıdan Beklenenler

## Sprint 2'yi bloklayanlar

- [ ] **Neon bağlantısı**: `IST-Ilaclama/.env.local` dosyasına `DATABASE_URL` (pooled) ve `DIRECT_URL` (direct). Şifre hiçbir dosyaya, loga veya commit’e yazılmamalı.
- [ ] `SESSION_SECRET` — yerelde üretilebilir (`.env.local`).

## Gerçek işletme bilgileri (doğrulanana kadar sitede gizli)

- [ ] Ticari unvan, telefon, WhatsApp, e-posta
- [ ] Fiziksel adres var mı? (yoksa LocalBusiness yerine hizmet alanı işletmesi olarak işaretlenecek)
- [ ] Çalışma saatleri
- [ ] Gerçekten hizmet verilen ilçeler (ilk 8–12)
- [ ] Biyosidal ürün uygulama izin belgesi, sorumlu yönetici, belge no ve geçerlilik tarihleri
- [ ] Kullanılan ürünlerin ruhsat bilgileri (yayın kararı işletmede)
- [ ] Kuruluş yılı / tecrübe (yalnız belgelenebiliyorsa)
- [ ] Sosyal medya hesapları, Google Business Profile bağlantısı
- [ ] Gerçek müşteri yorumları (izinli)

## Marka ve medya

- [ ] Logo (SVG tercihen) — şu an geçici amblem kullanılıyor
- [ ] Gerçek uygulama/ekip fotoğrafları — şu an Unsplash stok görselleri kullanılıyor (src/content/media.ts); gerçek fotoğraflar güven için daha değerli

## Hukuk

- [ ] KVKK aydınlatma metni, gizlilik ve çerez politikası — işletmenin onayladığı metinler

## Onay bekleyen içerik

- [ ] Hero altındaki istatistik bandı: firma rakamları (yıl, tamamlanan iş vb.) doğrulanırsa site verileri yerine konabilir
- [ ] Hizmet listesi: hepsi gerçekten sunuluyor mu? (akrep, kene, fumigasyon vb.)
- [ ] SSS cevapları — uzman onayı
