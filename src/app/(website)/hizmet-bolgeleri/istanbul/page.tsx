import { permanentRedirect } from "next/navigation";

// Şimdilik tek il: İstanbul hub'ı ana bölge sayfasına yönlenir (ileride ayrı içerik alabilir).
export default function Page() {
  permanentRedirect("/hizmet-bolgeleri");
}
