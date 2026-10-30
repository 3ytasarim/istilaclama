"use client";

import { useEffect } from "react";

/*
 * İndüksiyon butonu: buton kenarında dolaşan elektrik arkları (WebGL shader). Üzerine gelince/odakta
 * arklar çoğalır, tıklamada parlama dalgası çıkar.
 *
 * Shader "Induction Button" (VALENCE CORE, threeui) çalışmasından uyarlanmıştır; renkler marka
 * paletine çekildi, plaka boyutu/yarıçapı butonun gerçek ölçüsünden gelir.
 *
 * Kaynak: BıcırıklarKids projesindeki aynı bileşen; İST İlaçlama yeşil–mavi paletine uyarlandı.
 *
 * Mimari: Sayfadaki tüm .ind-primary / .ind-dark butonlar TEK bir paylaşılan WebGL bağlamıyla
 * çizilir; her kare paylaşılan tuvalde çizilip butonun kendi 2D tuvaline kopyalanır. Böylece tarayıcının
 * WebGL bağlam sınırına (~16) takılmadan sınırsız buton desteklenir. Yalnız ekranda görünen butonlar
 * çizilir, hiçbiri görünmüyorsa döngü durur. WebGL yoksa butonun CSS görünümü (globals.css) kalır.
 */

const SELECTOR = ".ind-primary, .ind-dark";
/** Açık zeminli varyantlar (bg-white vb.) ve bilerek hariç tutulanlar */
const SKIP = ".bg-white, [data-no-induction]";
/** Kanvasın butondan taşma payı (px) — arkların ışıması plakanın dışına yayılır */
const BLEED = 14;

type Palette = { plate: [number, number, number]; arc: [number, number, number]; core: [number, number, number] };
const PALETTES: Record<"primary" | "dark", Palette> = {
  // marka yeşili zemin (#087F6D), mint arklar, açık mint çekirdek
  primary: { plate: [0.031, 0.498, 0.427], arc: [0.37, 0.86, 0.74], core: [0.86, 1.0, 0.95] },
  // koyu lacivert zemin (#103342), turkuaz–mavi arklar, buz beyazı çekirdek
  dark: { plate: [0.063, 0.2, 0.259], arc: [0.31, 0.72, 0.86], core: [0.86, 0.97, 1.0] },
};

const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
const FS = `precision highp float;
uniform vec2 u_res;uniform vec2 u_box;uniform float u_rad;
uniform float u_time;uniform float u_arcs;uniform float u_flash;
uniform vec3 u_plate;uniform vec3 u_arc;uniform vec3 u_core;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.0-2.0*f);
return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.0;float a=0.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.05+vec2(9.7,3.1);a*=0.5;}return v;}
float sdRBox(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.0))+min(max(q.x,q.y),0.0)-r;}
void main(){
  float H=u_res.y;
  vec2 p=(gl_FragCoord.xy-0.5*u_res)/H;
  vec2 hs=u_box/H;
  float r=min(u_rad/H,min(hs.x,hs.y));
  float d=sdRBox(p,hs,r);
  float t=u_time;
  float hover=clamp(u_arcs/6.0,0.0,1.0);
  float plate=1.0-smoothstep(-0.004,0.004,d);
  vec3 plateCol=u_plate+u_plate*0.12*(fbm(p*9.0)-0.5);
  plateCol+=u_arc*0.3*exp(d*12.0)*(0.25+hover*0.5);
  float a=atan(p.y,p.x);
  vec3 arcCol=vec3(0.0);
  for(int i=0;i<6;i++){
    float fi=float(i);
    float w=clamp(u_arcs-fi,0.0,1.0);
    float n1=fbm(vec2(a*2.4+fi*11.3,t*(1.6+fi*0.27)+fi*53.1));
    float off=(n1-0.5)*(0.06+u_flash*0.06);
    float seg=smoothstep(0.35,0.75,noise(vec2(a*1.8+fi*7.7,t*(0.9+fi*0.13)+fi*19.0)));
    seg=0.3+0.7*seg;
    float g=0.0042/(abs(d+off)+0.006);
    arcCol+=(u_arc*g+u_core*g*g*0.55)*w*seg;
  }
  float outerMask=1.0-smoothstep(0.04,0.15,d);
  vec3 glow=arcCol*(0.6+0.4*hover)*outerMask;
  float ring=0.006/(abs(d)+0.006);
  glow+=u_core*ring*u_flash*1.5*outerMask;
  glow+=u_core*u_flash*0.16*outerMask;
  vec3 col=min(plateCol*plate+glow,vec3(1.0));
  float alpha=clamp(plate+max(glow.r,max(glow.g,glow.b)),0.0,1.0);
  gl_FragColor=vec4(min(col,vec3(alpha)),alpha);
}`;

type Entry = {
  el: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  palette: Palette;
  visible: boolean;
  arcs: number;
  arcsTarget: number;
  flash: number;
  crawl: number;
  drawn: boolean;
  /** ResizeObserver ile güncellenen ölçüler — her karede layout/stil okumamak için */
  bw: number;
  bh: number;
  radius: number;
  off: () => void;
};

type Renderer = {
  draw: (e: Entry, dpr: number) => boolean;
};

function createRenderer(): Renderer | null {
  const glCanvas = document.createElement("canvas");
  const gl = glCanvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: true });
  if (!gl) return null;
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = sh(gl.VERTEX_SHADER, VS);
  const fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = (n: string) => gl.getUniformLocation(prog, n);
  const U = { res: u("u_res"), box: u("u_box"), rad: u("u_rad"), time: u("u_time"), arcs: u("u_arcs"), flash: u("u_flash"), plate: u("u_plate"), arc: u("u_arc"), core: u("u_core") };
  gl.clearColor(0, 0, 0, 0);

  return {
    draw(e, dpr) {
      const { bw, bh } = e;
      if (!bw || !bh) return false;
      const w = Math.round((bw + BLEED * 2) * dpr);
      const h = Math.round((bh + BLEED * 2) * dpr);
      if (glCanvas.width !== w || glCanvas.height !== h) {
        glCanvas.width = w;
        glCanvas.height = h;
      }
      if (e.canvas.width !== w || e.canvas.height !== h) {
        e.canvas.width = w;
        e.canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const radius = e.radius || bh / 2;
      gl.uniform2f(U.res, w, h);
      gl.uniform2f(U.box, (bw / 2) * dpr, (bh / 2) * dpr);
      gl.uniform1f(U.rad, Math.min(radius, bh / 2) * dpr);
      gl.uniform1f(U.time, e.crawl);
      gl.uniform1f(U.arcs, e.arcs);
      gl.uniform1f(U.flash, e.flash);
      gl.uniform3fv(U.plate, e.palette.plate);
      gl.uniform3fv(U.arc, e.palette.arc);
      gl.uniform3fv(U.core, e.palette.core);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      e.ctx.clearRect(0, 0, w, h);
      e.ctx.drawImage(glCanvas, 0, 0);
      return true;
    },
  };
}

/** Site kabuğuna bir kez eklenir; sayfadaki dolu butonları bulur ve indüksiyon efektini uygular. */
export function InductionButtons() {
  useEffect(() => {
    // İlk boyama ve hidrasyonu yavaşlatmasın: WebGL ilk etkileşimde ya da sayfa boşa çıkınca başlar.
    // O ana kadar butonların CSS görünümü (globals.css) zaten tam.
    let cleanup: (() => void) | undefined;
    let idle = 0;
    const EVENTS = ["pointerdown", "pointermove", "keydown", "scroll", "touchstart"] as const;
    const start = () => {
      if (cleanup) return;
      EVENTS.forEach((ev) => window.removeEventListener(ev, start));
      cleanup = setup() ?? (() => {});
    };
    const t = window.setTimeout(() => {
      idle = window.requestIdleCallback ? window.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 0);
    }, 3500);
    EVENTS.forEach((ev) => window.addEventListener(ev, start, { once: true, passive: true }));
    return () => {
      window.clearTimeout(t);
      if (idle && window.cancelIdleCallback) window.cancelIdleCallback(idle);
      EVENTS.forEach((ev) => window.removeEventListener(ev, start));
      cleanup?.();
    };
  }, []);

  return null;
}

function setup(): (() => void) | undefined {
  const renderer = createRenderer();
  if (!renderer) return; // WebGL yok → CSS görünümü kalır
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Arklar 30 fps'te de akıcı görünür; ana iş parçacığını ve GPU'yu yarı yarıya rahatlatır.
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const minGap = 1000 / 30;
  const maxDpr = coarse ? 1.25 : 1.5;
  const ro = new ResizeObserver((list) => {
    for (const it of list) {
      const e = entries.get(it.target as HTMLElement);
      if (!e) continue;
      const box = it.borderBoxSize?.[0];
      e.bw = box ? box.inlineSize : (it.target as HTMLElement).offsetWidth;
      e.bh = box ? box.blockSize : (it.target as HTMLElement).offsetHeight;
      e.radius = parseFloat(getComputedStyle(e.el).borderTopLeftRadius) || e.bh / 2;
    }
    kick();
  });
  const entries = new Map<HTMLElement, Entry>();
  let raf = 0;
  let last = performance.now();

  const io = new IntersectionObserver(
    (list) => {
      for (const it of list) {
        const e = entries.get(it.target as HTMLElement);
        if (e) e.visible = it.isIntersecting;
      }
      kick();
    },
    { rootMargin: "80px" },
  );

  const drawOne = (e: Entry) => {
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    if (renderer.draw(e, dpr) && !e.drawn) {
      e.drawn = true;
      e.el.dataset.induction = "on";
    }
  };

  const frame = (now: number) => {
    if (now - last < minGap) {
      raf = requestAnimationFrame(frame);
      return;
    }
    raf = 0;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    let any = false;
    for (const e of entries.values()) {
      if (!e.el.isConnected) {
        remove(e);
        continue;
      }
      if (!e.visible) continue;
      any = true;
      e.arcs += (e.arcsTarget - e.arcs) * Math.min(1, dt * 5);
      e.flash *= Math.exp(-3.6 * dt);
      e.crawl += dt * (0.6 + (e.arcs / 6) * 1.1 + e.flash * 2.0);
      drawOne(e);
    }
    if (any && !reduced) raf = requestAnimationFrame(frame);
  };

  function kick() {
    if (reduced) {
      // Hareket azaltıldığında sabit tek kare (arklar görünür ama akmaz)
      for (const e of entries.values()) if (e.visible) drawOne(e);
      return;
    }
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }

  function remove(e: Entry) {
    e.off();
    io.unobserve(e.el);
    ro.unobserve(e.el);
    e.canvas.remove();
    delete e.el.dataset.induction;
    entries.delete(e.el);
  }

  const add = (el: HTMLElement) => {
    if (entries.has(el) || el.matches(SKIP)) return;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.className = "induction-canvas";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    el.appendChild(canvas);
    const e: Entry = {
      el,
      canvas,
      ctx,
      palette: el.classList.contains("ind-primary") ? PALETTES.primary : PALETTES.dark,
      visible: false,
      arcs: 2.4,
      arcsTarget: 2.4,
      flash: 0,
      crawl: Math.random() * 20,
      drawn: false,
      bw: 0,
      bh: 0,
      radius: 0,
      off: () => {},
    };
    const on = () => ((e.arcsTarget = 5.8), kick());
    const offHover = () => ((e.arcsTarget = 2.4), kick());
    const click = () => ((e.flash = 1), kick());
    el.addEventListener("pointerenter", on);
    el.addEventListener("pointerleave", offHover);
    el.addEventListener("focus", on);
    el.addEventListener("blur", offHover);
    el.addEventListener("click", click);
    e.off = () => {
      el.removeEventListener("pointerenter", on);
      el.removeEventListener("pointerleave", offHover);
      el.removeEventListener("focus", on);
      el.removeEventListener("blur", offHover);
      el.removeEventListener("click", click);
    };
    entries.set(el, e);
    io.observe(el);
    ro.observe(el);
  };

  const scan = () => document.querySelectorAll<HTMLElement>(SELECTOR).forEach(add);
  scan();
  let pending = 0;
  const mo = new MutationObserver(() => {
    if (!pending) pending = window.setTimeout(() => ((pending = 0), scan()), 150);
  });
  mo.observe(document.body, { childList: true, subtree: true });

  return () => {
    mo.disconnect();
    io.disconnect();
    ro.disconnect();
    window.clearTimeout(pending);
    cancelAnimationFrame(raf);
    for (const e of [...entries.values()]) remove(e);
  };
}
