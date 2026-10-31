import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slug";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/contact";
import { istanbulDistricts } from "@/content/regions";
import { services } from "@/content/services";
import { siteSettings } from "@/content/settings";

describe("slugify", () => {
  it("Türkçe karakterleri dönüştürür", () => {
    expect(slugify("Kadıköy")).toBe("kadikoy");
    expect(slugify("Üsküdar")).toBe("uskudar");
    expect(slugify("İşyeri İlaçlama")).toBe("isyeri-ilaclama");
    expect(slugify("  Şişli / Çağlayan  ")).toBe("sisli-caglayan");
  });
});

describe("İstanbul ilçeleri", () => {
  it("39 benzersiz ilçe, 14 Anadolu + 25 Avrupa", () => {
    expect(istanbulDistricts).toHaveLength(39);
    expect(new Set(istanbulDistricts.map((d) => d.slug)).size).toBe(39);
    expect(istanbulDistricts.filter((d) => d.side === "anadolu")).toHaveLength(14);
  });
  it("ilçe sayfaları yayında; hizmet kapsamı doğrulanana kadar hiçbiri 'aktif' değil", () => {
    expect(istanbulDistricts.every((d) => !d.active && d.status === "published")).toBe(true);
  });
});

describe("hizmetler", () => {
  it("slug'lar benzersiz ve ASCII", () => {
    expect(new Set(services.map((s) => s.slug)).size).toBe(services.length);
    expect(services.every((s) => /^[a-z0-9-]+$/.test(s.slug))).toBe(true);
  });
  it("yasaklı iddia içermez", () => {
    const banned = /%\s?100|zararsız|kesin çözüm|garanti/i;
    expect(services.filter((s) => banned.test(s.excerpt + s.title))).toEqual([]);
  });
});

describe("WhatsApp placeholder modu", () => {
  it("doğrulanmamış numarada bağlantı üretmez", () => {
    expect(whatsappHref(siteSettings)).toBeNull();
  });
  it("doğrulanmış numarada hizmet + bölge içeren mesaj üretir", () => {
    const href = whatsappHref(
      { ...siteSettings, whatsapp: { value: "905550000000", verified: true } },
      { service: "Hamam Böceği İlaçlama", region: "Kadıköy" },
    );
    expect(href).toContain("https://wa.me/905550000000?text=");
    expect(decodeURIComponent(href!.split("text=")[1]!)).toContain("Bölge: Kadıköy.");
  });
});

describe("cn", () => {
  it("özel font ölçeğini renk sınıfıyla birlikte korur", () => {
    expect(cn("text-h2", "text-foreground")).toBe("text-h2 text-foreground");
  });
});
