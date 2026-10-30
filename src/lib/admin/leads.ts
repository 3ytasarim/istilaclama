export const LEAD_STATUS: Record<string, { label: string; cls: string }> = {
  new: { label: "Yeni", cls: "bg-[#2fb59b]/15 text-[#06604f] dark:text-[#5fd3bc]" },
  contacted: { label: "İletişime geçildi", cls: "bg-[#087ea4]/15 text-[#076e86] dark:text-[#4fb8dc]" },
  quoted: { label: "Teklif verildi", cls: "bg-amber-500/15 text-amber-700 dark:text-amber-300" },
  completed: { label: "Tamamlandı", cls: "bg-emerald-600/15 text-emerald-700 dark:text-emerald-300" },
  spam: { label: "Spam", cls: "bg-red-500/15 text-red-700 dark:text-red-300" },
};
export const LEAD_STATUSES = ["new", "contacted", "quoted", "completed", "spam"] as const;
export const fmtDate = (d: Date) =>
  new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Istanbul" }).format(d);
