/**
 * Hero arka katmanı: haşere/uygulama ikonları alttan yukarı süzülür, header'a yaklaşınca kaybolur.
 * Saf CSS (JS yok). İkonlar siyah PNG → mask-image ile marka renklerine boyanır.
 * Konumlar deterministik (hidrasyon farkı yok); mobilde `hidden sm:block` olanlar gizlenir.
 */
const ICONS = [
  "hamam-bocegi-hedef",
  "sivrisinek-yasak",
  "puskurtme-sisesi",
  "bocek-hedef",
  "koruyucu-tulum",
  "fare-yasak",
  "gaz-maskesi",
  "sivrisinek-hedef",
  "sirt-pulverizatoru",
  "bocek-yasak",
  "uygulayici-pulverizator",
];

const COLORS = ["#5fd3bc", "#8fe3d2", "#ffffff", "#4fb8dc", "#34d399"];

// [sol %, boyut px, süre s, gecikme s, salınım px, dönüş deg, opaklık, mobilde göster]
const PARTICLES: [number, number, number, number, number, number, number, boolean][] = [
  [4, 55, 19, 0, 18, -14, 0.62, true],
  [12, 38, 24, 7, -14, 10, 0.46, true],
  [19, 65, 22, 13, 22, 18, 0.55, false],
  [27, 43, 18, 4, -20, -8, 0.42, true],
  [35, 50, 26, 16, 16, 12, 0.50, true],
  [43, 35, 21, 9, -12, -16, 0.38, false],
  [51, 60, 23, 2, 20, 8, 0.62, true],
  [58, 40, 20, 18, -18, -12, 0.46, true],
  [64, 70, 27, 11, 24, 14, 0.59, false],
  [71, 45, 19, 5, -16, -10, 0.50, true],
  [77, 55, 24, 20, 14, 16, 0.62, true],
  [84, 38, 22, 14, -22, -6, 0.42, false],
  [90, 63, 25, 8, 18, 10, 0.59, true],
  [96, 43, 20, 1, -14, -14, 0.46, true],
  [8, 48, 28, 22, 16, 6, 0.50, false],
  [47, 45, 30, 25, -20, -18, 0.42, true],
  [68, 53, 29, 27, 18, 12, 0.50, true],
  [31, 58, 31, 29, -16, 8, 0.55, false],
];

export function HeroFloaters() {
  return (
    <div aria-hidden="true" className="hero-floaters pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map(([left, size, dur, delay, sway, rot, op, mobile], i) => {
        const icon = ICONS[i % ICONS.length];
        const url = `url(/images/icons/pest/${icon}.png)`;
        return (
          <span
            key={i}
            className={`hero-floater absolute bottom-0 ${mobile ? "" : "hidden sm:block"}`}
            style={
              {
                left: `${left}%`,
                width: size,
                height: size,
                "--dur": `${dur}s`,
                "--delay": `-${delay}s`,
                "--sway": `${sway}px`,
                "--rot": `${rot}deg`,
                "--op": op,
              } as React.CSSProperties
            }
          >
            <span
              className="hero-floater-icon block size-full"
              style={{
                backgroundColor: COLORS[i % COLORS.length],
                WebkitMaskImage: url,
                maskImage: url,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}
