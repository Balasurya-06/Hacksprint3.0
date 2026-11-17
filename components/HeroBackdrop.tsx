"use client";
import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   HERO BACKDROP — "living circuit board"
   A pure-black stage: a dot grid with chip pads. Light packets race
   between chips, turning at right angles and etching copper-red
   traces that fade away. Chips flash when a packet passes and may
   fire a ping — a ring that sweeps the grid. Code fragments decode
   in place at random nodes, and a scan beam sweeps down the board.

   Cursor lights nearby nodes; clicking the board pings. Static
   under reduced motion; paused while off-screen or in a hidden tab.
   ═══════════════════════════════════════════════════════════════ */

type Pt = { x: number; y: number };
type Packet = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  tx: number;
  ty: number;
  speed: number;
  len: number;
  nodes: Pt[];
  rgb: string;
  age: number;
  life: number;
};
type Seg = { x1: number; y1: number; x2: number; y2: number; t: number; rgb: string };
type Ping = { x: number; y: number; r: number; max: number };
type Hub = { x: number; y: number; e: number; phase: number };
type Glyph = { x: number; y: number; text: string; age: number; life: number; rgb: string };

const RED = "229, 25, 31";
const HOT = "255, 59, 48";
const BONE = "244, 238, 228";
const DIRS: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const TOKENS = [
  "</>",
  "{ }",
  "0x3F",
  "01101",
  "=>",
  "&&",
  "fn()",
  "git push",
  "npm run dev",
  "36:00:00",
  "sudo hack",
  "while(true)",
  "200 OK",
  "deploy()",
  "ship it",
  "v3.0",
  "#!/bin/sh",
  "λ",
];
const SCRAMBLE = "01<>/{}[]#$%&*+=_ABCDEF0123456789";
const FONT = '600 10px "JetBrains Mono", ui-monospace, monospace';
const POINTER_R = 150;
const SEG_LIFE = 3.2;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export default function HeroBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const grid = document.createElement("canvas");
    const gctx = grid.getContext("2d")!;

    /* Layout */
    let w = 0;
    let h = 0;
    let dpr = 1;
    let gap = 30;
    let cols = 0;
    let rows = 0;
    let ox = 0;
    let oy = 0;
    let horizon = 0;
    let mobile = false;
    let maxPackets = 20;

    /* Scene */
    let packets: Packet[] = [];
    let segs: Seg[] = [];
    let pings: Ping[] = [];
    let glyphs: Glyph[] = [];
    let hubList: Hub[] = [];
    const hubs = new Map<number, Hub>();

    /* Clocks */
    let time = 0;
    let nextPing = 1.2;
    let nextGlyph = 0.4;
    let lastSpawn = 0;
    let lastGlyph = 0;
    let raf = 0;
    let last = 0;
    let inView = true;
    const pointer = { x: -9999, y: -9999 };

    const key = (c: number, r: number) => c * 4096 + r;
    const colOf = (x: number) => Math.round((x - ox) / gap);
    const rowOf = (y: number) => Math.round((y - oy) / gap);
    const clampC = (c: number) => Math.max(0, Math.min(cols - 1, c));
    const clampR = (r: number) => Math.max(0, Math.min(rows - 1, r));
    const boardBottom = () => oy + (rows - 1) * gap;

    /* ── Spawners ─────────────────────────────────────────────── */
    function spawnPacket(at?: Pt, dir?: [number, number]): Packet {
      let c: number;
      let r: number;
      if (at) {
        c = clampC(colOf(at.x));
        r = clampR(rowOf(at.y));
      } else if (hubList.length && Math.random() < 0.6) {
        const hb = pick(hubList);
        c = colOf(hb.x);
        r = rowOf(hb.y);
      } else {
        c = Math.floor(Math.random() * cols);
        r = Math.floor(Math.random() * rows);
      }
      const x = ox + c * gap;
      const y = oy + r * gap;
      const [dx, dirY] = dir ?? pick(DIRS);
      const dy = r >= rows - 1 && dirY > 0 ? -1 : dirY;
      const roll = Math.random();
      return {
        x,
        y,
        dx,
        dy,
        tx: x + dx * gap,
        ty: y + dy * gap,
        speed: gap * rand(3, 8),
        len: gap * rand(3, 9),
        nodes: [{ x, y }],
        rgb: roll < 0.2 ? BONE : roll < 0.45 ? HOT : RED,
        age: 0,
        life: rand(3, 8),
      };
    }

    function ping(at: Pt, burst = 3) {
      if (pings.length > 6) return;
      const p = { x: ox + clampC(colOf(at.x)) * gap, y: oy + clampR(rowOf(at.y)) * gap };
      pings.push({ ...p, r: 0, max: gap * rand(7, 12) });
      const dirs = [...DIRS].sort(() => Math.random() - 0.5).slice(0, burst);
      for (const d of dirs) if (packets.length < maxPackets + 12) packets.push(spawnPacket(p, d));
    }

    function spawnGlyph(at?: Pt) {
      if (glyphs.length >= (mobile ? 5 : 12)) return;
      const c = at ? clampC(colOf(at.x)) : Math.floor(Math.random() * cols);
      const r = at ? clampR(rowOf(at.y)) : Math.floor(Math.random() * Math.max(1, rows - 1));
      glyphs.push({
        x: ox + c * gap,
        y: oy + r * gap,
        text: pick(TOKENS),
        age: 0,
        life: rand(2.2, 4.6),
        rgb: Math.random() < 0.3 ? HOT : BONE,
      });
    }

    /* ── Layout ───────────────────────────────────────────────── */
    function drawGrid() {
      grid.width = Math.ceil(w * dpr);
      grid.height = Math.ceil(h * dpr);
      gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gctx.clearRect(0, 0, w, h);
      for (let r = 0; r < rows; r++) {
        const y = oy + r * gap;
        const nearHorizon = Math.min(1, (horizon - y) / (gap * 3));
        gctx.fillStyle = `rgba(255, 255, 255, ${0.075 * nearHorizon})`;
        for (let c = 0; c < cols; c++) gctx.fillRect(ox + c * gap - 0.75, y - 0.75, 1.5, 1.5);
      }
    }

    function placeHubs() {
      hubs.clear();
      hubList = [];
      const count = Math.round(Math.min(18, Math.max(5, (cols * rows) / 70)));
      for (let i = 0; i < count * 3 && hubList.length < count; i++) {
        const c = 1 + Math.floor(Math.random() * Math.max(1, cols - 2));
        const r = 1 + Math.floor(Math.random() * Math.max(1, rows - 2));
        if (hubs.has(key(c, r)) || hubs.has(key(c + 1, r)) || hubs.has(key(c, r + 1))) continue;
        const hb = { x: ox + c * gap, y: oy + r * gap, e: 0, phase: Math.random() * Math.PI * 2 };
        hubs.set(key(c, r), hb);
        hubList.push(hb);
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const nw = Math.max(1, rect.width);
      const nh = Math.max(1, rect.height);
      if (nw === w && nh === h) return;
      w = nw;
      h = nh;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      mobile = w < 640;
      gap = mobile ? 24 : 30;
      horizon = h;
      cols = Math.floor(w / gap) + 1;
      oy = gap * 0.5;
      rows = Math.max(2, Math.floor((horizon - gap - oy) / gap) + 1);
      ox = (w - (cols - 1) * gap) / 2;
      maxPackets = Math.round(Math.min(28, Math.max(8, (w * horizon) / 48000)));
      canvas!.width = Math.ceil(w * dpr);
      canvas!.height = Math.ceil(h * dpr);
      drawGrid();
      placeHubs();
      packets = [];
      segs = [];
      glyphs = [];
      pings = [];
      if (reduce) draw();
    }

    /* ── Simulation ───────────────────────────────────────────── */
    function step(p: Packet, dt: number) {
      p.age += dt;
      let move = p.speed * dt;
      while (move > 0) {
        const dist = Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y);
        if (move < dist) {
          p.x += p.dx * move;
          p.y += p.dy * move;
          break;
        }
        const prev = p.nodes[p.nodes.length - 1];
        p.x = p.tx;
        p.y = p.ty;
        move -= dist;
        segs.push({ x1: prev.x, y1: prev.y, x2: p.x, y2: p.y, t: time, rgb: p.rgb });
        p.nodes.push({ x: p.x, y: p.y });
        if (p.nodes.length > 24) p.nodes.shift();

        const hub = hubs.get(key(colOf(p.x), rowOf(p.y)));
        if (hub) {
          hub.e = 1;
          if (Math.random() < 0.2) ping(hub, 2);
        }
        if (Math.random() < 0.3) {
          const turn = Math.random() < 0.5 ? 1 : -1;
          [p.dx, p.dy] = [p.dy * turn, -p.dx * turn];
        }
        if (p.dy > 0 && p.y >= boardBottom() - 1) {
          p.dx = Math.random() < 0.5 ? 1 : -1;
          p.dy = 0;
        }
        p.tx = p.x + p.dx * gap;
        p.ty = p.y + p.dy * gap;
      }
    }

    function update(dt: number) {
      time += dt;

      nextPing -= dt;
      if (nextPing <= 0) {
        ping(hubList.length && Math.random() < 0.7 ? pick(hubList) : { x: rand(0, w), y: rand(0, horizon) }, 2 + Math.floor(Math.random() * 3));
        nextPing = rand(1.8, 4.2);
      }
      for (const pg of pings) pg.r += gap * 9 * dt;
      pings = pings.filter((pg) => pg.r < pg.max);

      for (const hb of hubList) hb.e = Math.max(0, hb.e - dt * 1.6);

      for (const p of packets) step(p, dt);
      const bottom = boardBottom() + 1;
      packets = packets.filter((p) => p.age < p.life && p.x > -gap && p.x < w + gap && p.y > -gap && p.y < bottom);
      while (packets.length < maxPackets && Math.random() < 0.1) packets.push(spawnPacket());

      let expired = 0;
      while (expired < segs.length && time - segs[expired].t > SEG_LIFE) expired++;
      if (expired) segs.splice(0, expired);

      for (const g of glyphs) g.age += dt;
      glyphs = glyphs.filter((g) => g.age < g.life);
      nextGlyph -= dt;
      if (nextGlyph <= 0) {
        spawnGlyph();
        nextGlyph = rand(0.35, 1.05) * (mobile ? 1.8 : 1);
      }
    }

    /* ── Rendering ────────────────────────────────────────────── */
    function lightNodes(cx: number, cy: number, reach: number, strength: (d: number) => number, rgb: string) {
      const c0 = Math.max(0, Math.floor((cx - reach - ox) / gap));
      const c1 = Math.min(cols - 1, Math.ceil((cx + reach - ox) / gap));
      const r0 = Math.max(0, Math.floor((cy - reach - oy) / gap));
      const r1 = Math.min(rows - 1, Math.ceil((cy + reach - oy) / gap));
      for (let c = c0; c <= c1; c++) {
        for (let r = r0; r <= r1; r++) {
          const x = ox + c * gap;
          const y = oy + r * gap;
          const a = strength(Math.hypot(x - cx, y - cy));
          if (a <= 0.01) continue;
          ctx!.fillStyle = `rgba(${rgb}, ${a})`;
          ctx!.fillRect(x - 1.25, y - 1.25, 2.5, 2.5);
        }
      }
    }

    function drawScan() {
      const period = 8;
      const sy = -60 + ((time % period) / period) * (horizon + 60);
      const band = ctx!.createLinearGradient(0, sy - 80, 0, sy);
      band.addColorStop(0, `rgba(${RED}, 0)`);
      band.addColorStop(1, `rgba(${RED}, 0.07)`);
      ctx!.fillStyle = band;
      ctx!.fillRect(0, sy - 80, w, 80);
      const line = ctx!.createLinearGradient(0, 0, w, 0);
      line.addColorStop(0, `rgba(${HOT}, 0)`);
      line.addColorStop(0.5, `rgba(${HOT}, 0.4)`);
      line.addColorStop(1, `rgba(${HOT}, 0)`);
      ctx!.fillStyle = line;
      ctx!.fillRect(0, sy, w, 1);

      const r = rowOf(sy);
      if (r < 0 || r >= rows) return;
      const ry = oy + r * gap;
      const k = 1 - Math.abs(ry - sy) / (gap * 0.6);
      if (k <= 0) return;
      for (let c = 0; c < cols; c++) {
        const x = ox + c * gap;
        ctx!.fillStyle = `rgba(${HOT}, ${0.5 * k * Math.sin((Math.PI * x) / w)})`;
        ctx!.fillRect(x - 1.25, ry - 1.25, 2.5, 2.5);
      }
    }

    function drawTraces() {
      ctx!.lineWidth = 1;
      ctx!.lineCap = "square";
      for (const s of segs) {
        const a = 0.32 * (1 - (time - s.t) / SEG_LIFE) ** 1.4 * (s.rgb === BONE ? 0.6 : 1);
        if (a <= 0.01) continue;
        ctx!.strokeStyle = `rgba(${s.rgb}, ${a})`;
        ctx!.beginPath();
        ctx!.moveTo(s.x1, s.y1);
        ctx!.lineTo(s.x2, s.y2);
        ctx!.stroke();
      }
    }

    function drawHubs() {
      for (const hb of hubList) {
        const e = hb.e;
        if (e > 0.02) {
          const glow = ctx!.createRadialGradient(hb.x, hb.y, 0, hb.x, hb.y, 30);
          glow.addColorStop(0, `rgba(${RED}, ${0.5 * e})`);
          glow.addColorStop(1, `rgba(${RED}, 0)`);
          ctx!.fillStyle = glow;
          ctx!.fillRect(hb.x - 30, hb.y - 30, 60, 60);
        }
        const idle = 0.16 + 0.06 * Math.sin(time * 2 + hb.phase);
        const tone = e > 0.02 ? HOT : BONE;
        const a = idle + 0.7 * e;
        ctx!.strokeStyle = `rgba(${tone}, ${a})`;
        ctx!.lineWidth = 1;
        ctx!.strokeRect(hb.x - 5.5, hb.y - 5.5, 11, 11);
        ctx!.fillStyle = `rgba(${tone}, ${a * 0.8})`;
        for (const k of [-3, 0, 3]) {
          ctx!.fillRect(hb.x + k - 0.5, hb.y - 9, 1, 2.5);
          ctx!.fillRect(hb.x + k - 0.5, hb.y + 6.5, 1, 2.5);
          ctx!.fillRect(hb.x - 9, hb.y + k - 0.5, 2.5, 1);
          ctx!.fillRect(hb.x + 6.5, hb.y + k - 0.5, 2.5, 1);
        }
        ctx!.fillStyle = `rgba(${RED}, ${0.3 + 0.7 * e})`;
        ctx!.fillRect(hb.x - 2, hb.y - 2, 4, 4);
      }
    }

    function drawPacket(p: Packet) {
      const fade = Math.min(1, p.age / 0.35) * Math.min(1, Math.max(0, (p.life - p.age) / 0.8));
      if (fade <= 0) return;
      const pts: Pt[] = [{ x: p.x, y: p.y }];
      for (let i = p.nodes.length - 1; i >= 0; i--) pts.push(p.nodes[i]);

      ctx!.lineWidth = 1.8;
      ctx!.lineCap = "round";
      let walked = 0;
      for (let i = 0; i < pts.length - 1 && walked < p.len; i++) {
        const a = pts[i];
        let b = pts[i + 1];
        const seg = Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
        if (seg === 0) continue;
        const take = Math.min(seg, p.len - walked);
        if (take < seg) b = { x: a.x + ((b.x - a.x) * take) / seg, y: a.y + ((b.y - a.y) * take) / seg };
        const g = ctx!.createLinearGradient(a.x, a.y, b.x, b.y);
        g.addColorStop(0, `rgba(${p.rgb}, ${0.9 * fade * (1 - walked / p.len)})`);
        g.addColorStop(1, `rgba(${p.rgb}, ${0.9 * fade * (1 - (walked + take) / p.len)})`);
        ctx!.strokeStyle = g;
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
        walked += take;
      }

      const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, 16);
      glow.addColorStop(0, `rgba(${p.rgb}, ${0.6 * fade})`);
      glow.addColorStop(1, `rgba(${p.rgb}, 0)`);
      ctx!.fillStyle = glow;
      ctx!.fillRect(p.x - 16, p.y - 16, 32, 32);
      ctx!.fillStyle = `rgba(255, 255, 255, ${0.95 * fade})`;
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawGlyphs() {
      ctx!.font = FONT;
      ctx!.textBaseline = "middle";
      ctx!.lineWidth = 1;
      for (const g of glyphs) {
        const fade = Math.min(1, g.age / 0.15) * Math.min(1, Math.max(0, (g.life - g.age) / 0.6));
        const settled = Math.min(1, g.age / 0.6) * g.text.length;
        let s = "";
        for (let i = 0; i < g.text.length; i++) {
          s += i < settled || g.text[i] === " " ? g.text[i] : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
        }
        ctx!.fillStyle = `rgba(${HOT}, ${0.85 * fade})`;
        ctx!.fillRect(g.x - 1.5, g.y - 1.5, 3, 3);
        ctx!.strokeStyle = `rgba(${RED}, ${0.4 * fade})`;
        ctx!.beginPath();
        ctx!.moveTo(g.x, g.y);
        ctx!.lineTo(g.x + 7, g.y - 7);
        ctx!.lineTo(g.x + 11, g.y - 7);
        ctx!.stroke();
        ctx!.fillStyle = `rgba(${g.rgb}, ${0.6 * fade})`;
        ctx!.fillText(s, g.x + 14, g.y - 7);
      }
    }

    function draw() {
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.drawImage(grid, 0, 0);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!reduce) drawScan();
      drawTraces();
      drawHubs();

      ctx!.globalCompositeOperation = "lighter";
      for (const pg of pings) {
        const t = pg.r / pg.max;
        lightNodes(pg.x, pg.y, pg.r + gap, (d) => (Math.abs(d - pg.r) < gap * 0.7 ? 0.75 * (1 - t) : 0), RED);
      }
      if (pointer.x > -999 && pointer.y < horizon) {
        lightNodes(pointer.x, pointer.y, POINTER_R, (d) => (d < POINTER_R ? 0.55 * (1 - d / POINTER_R) ** 1.6 : 0), BONE);
      }
      for (const p of packets) drawPacket(p);
      ctx!.globalCompositeOperation = "source-over";

      drawGlyphs();
    }

    /* ── Loop ─────────────────────────────────────────────────── */
    function frame(t: number) {
      const dt = Math.min(0.05, (t - last) / 1000 || 0);
      last = t;
      update(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (reduce || raf || !inView || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    /* ── Input ────────────────────────────────────────────────── */
    const local = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return x >= 0 && y >= 0 && x <= w && y <= h ? { x, y } : null;
    };
    const onMove = (e: PointerEvent) => {
      const p = local(e);
      if (!p) {
        pointer.x = pointer.y = -9999;
        return;
      }
      pointer.x = p.x;
      pointer.y = p.y;
      if (p.y >= horizon) return;
      const now = performance.now();
      if (now - lastSpawn > 140 && packets.length < maxPackets + 10) {
        lastSpawn = now;
        packets.push(spawnPacket(p));
      }
      if (now - lastGlyph > 900) {
        lastGlyph = now;
        spawnGlyph(p);
      }
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };
    const onDown = (e: PointerEvent) => {
      if ((e.target as Element | null)?.closest?.("a, button, input, textarea, select, label, [role='button']")) return;
      const p = local(e);
      if (!p) return;
      ping(p, 4);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    io.observe(canvas);

    resize();
    if (!reduce) {
      /* Pre-warm so the board is already alive on first paint. */
      for (let i = 0; i < 50; i++) update(0.05);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    } else {
      draw();
    }
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="hero-backdrop" aria-hidden="true" />;
}
