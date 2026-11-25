"use client";

import { useEffect, useRef } from "react";
import qrcode from "qrcode-generator";
import { EVENT, MEAL_TOKENS } from "@/lib/finalist/event";

/* Personal grand-finale entry pass (1080 × 1700), drawn on one <canvas> so the preview
   and the downloaded PNG are identical. The QR (→ /finalist/verify?t=…) is used for
   check-in, food & snack tokens, and shows the schedule when scanned by a phone. */

export const PASS_W = 1080;
export const PASS_H = 1700;
const RED = "#e5191f";
const RED_HOT = "#ff3b30";
const INK = "#0b0b0d";
const BONE = "#f4eee4";
const MUTED = "#a9a4a0";

export type MemberPass = {
  name: string;
  isLeader: boolean;
  teamName: string;
  teamCode: string;
  passNumber: string;
  token: string;
  siteUrl: string;
};

type Ctx = CanvasRenderingContext2D & { letterSpacing?: string };
const spaced = (ctx: Ctx, px: number) => { if ("letterSpacing" in ctx) ctx.letterSpacing = `${px}px`; };

function fit(ctx: Ctx, text: string, maxW: number, start: number, min: number, family: string, weight = "") {
  let size = start;
  do {
    ctx.font = `${weight} ${size}px ${family}`.trim();
    if (ctx.measureText(text).width <= maxW) break;
    size -= 2;
  } while (size > min);
  return size;
}

function label(ctx: Ctx, text: string, x: number, y: number, color = MUTED) {
  ctx.fillStyle = color;
  ctx.font = "700 24px 'JetBrains Mono', monospace";
  spaced(ctx, 6);
  ctx.fillText(text, x, y);
  spaced(ctx, 0);
}

function roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function drawPass(canvas: HTMLCanvasElement, d: MemberPass) {
  const ctx = canvas.getContext("2d") as Ctx;
  canvas.width = PASS_W;
  canvas.height = PASS_H;
  const W = PASS_W, H = PASS_H, L = 80;

  /* background */
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "rgba(255,255,255,0.045)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= W; x += 54) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 54) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  const glow = ctx.createRadialGradient(W * 0.85, 120, 20, W * 0.85, 120, 700);
  glow.addColorStop(0, "rgba(229,25,31,0.45)");
  glow.addColorStop(1, "rgba(229,25,31,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = RED;
  ctx.fillRect(0, 0, 18, H);

  /* header */
  label(ctx, "GRAND FINALE · ENTRY PASS", L, 110, RED_HOT);
  ctx.fillStyle = BONE;
  ctx.font = "140px Anton, Impact, sans-serif";
  ctx.fillText("HACKSPRINT", L, 260);
  ctx.fillStyle = RED;
  ctx.fillText("3.0", L + ctx.measureText("HACKSPRINT ").width, 260);

  /* participant */
  label(ctx, d.isLeader ? "PARTICIPANT · TEAM LEADER" : "PARTICIPANT", L, 370);
  ctx.fillStyle = BONE;
  const name = d.name.toUpperCase();
  fit(ctx, name, W - L * 2, 120, 50, "Anton, Impact, sans-serif");
  ctx.fillText(name, L, 490);

  label(ctx, "TEAM", L, 580);
  ctx.fillStyle = BONE;
  fit(ctx, d.teamName, W - L * 2 - 380, 52, 28, "Inter, Arial, sans-serif", "800");
  ctx.fillText(d.teamName, L, 640);
  ctx.fillStyle = RED_HOT;
  ctx.font = "700 30px 'JetBrains Mono', monospace";
  ctx.textAlign = "right";
  ctx.fillText(d.teamCode, W - L, 640);
  ctx.textAlign = "left";

  /* food & snack tokens */
  label(ctx, "FOOD & SNACK TOKENS · SCAN QR AT THE COUNTER", L, 740);
  const cols = 2, gap = 18, bw = (W - L * 2 - gap) / cols, bh = 78;
  MEAL_TOKENS.forEach((t, i) => {
    const x = L + (i % cols) * (bw + gap);
    const y = 770 + Math.floor(i / cols) * (bh + 14);
    roundRect(ctx, x, y, bw, bh, 14);
    ctx.fillStyle = t.kind === "food" ? "rgba(229,25,31,0.14)" : "rgba(255,255,255,0.05)";
    ctx.fill();
    ctx.strokeStyle = t.kind === "food" ? "rgba(229,25,31,0.55)" : "rgba(255,255,255,0.18)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = BONE;
    ctx.font = "800 30px Inter, Arial, sans-serif";
    ctx.fillText(`${t.kind === "food" ? "🍽" : "☕"}  ${t.label}`, x + 22, y + 50);
  });

  /* perforation */
  const py = 1290;
  ctx.fillStyle = INK;
  ctx.beginPath(); ctx.arc(0, py, 34, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(W, py, 34, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(244,238,228,0.35)";
  ctx.setLineDash([16, 14]);
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(50, py); ctx.lineTo(W - 50, py); ctx.stroke();
  ctx.setLineDash([]);

  /* stub: QR + details */
  const qr = qrcode(0, "M");
  qr.addData(`${d.siteUrl}/finalist/verify?t=${d.token}`);
  qr.make();
  const n = qr.getModuleCount();
  const qs = 300, qx = W - L - qs, qy = py + 46;
  ctx.fillStyle = "#fff";
  ctx.fillRect(qx - 16, qy - 16, qs + 32, qs + 32);
  const cell = qs / n;
  ctx.fillStyle = "#000";
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      if (qr.isDark(r, c)) ctx.fillRect(qx + c * cell, qy + r * cell, Math.ceil(cell), Math.ceil(cell));

  const rows: [string, string][] = [
    ["PASS NO.", d.passNumber],
    ["VENUE · DATES", `${EVENT.venueShort} · ${EVENT.dates}`],
    ["BRING", "This pass + College ID + Aadhaar"],
  ];
  rows.forEach(([k, v], i) => {
    const y = py + 80 + i * 96;
    label(ctx, k, L, y);
    ctx.fillStyle = i === 0 ? RED_HOT : BONE;
    fit(ctx, v, qx - L - 50, i === 0 ? 40 : 30, 20, i === 0 ? "'JetBrains Mono', monospace" : "Inter, Arial, sans-serif", "800");
    ctx.fillText(v, L, y + 44);
  });
  ctx.fillStyle = "rgba(244,238,228,0.45)";
  ctx.font = "500 20px 'JetBrains Mono', monospace";
  ctx.fillText("Personal & non-transferable · scan QR for the schedule", L, H - 36);
}

let fontsReady: Promise<unknown> | null = null;
export function loadPassFonts() {
  fontsReady ??= Promise.all([
    document.fonts.load("140px Anton"),
    document.fonts.load("700 30px 'JetBrains Mono'"),
    document.fonts.load("800 30px Inter"),
  ]).catch(() => undefined);
  return fontsReady;
}

export function downloadPass(d: MemberPass) {
  return loadPassFonts().then(() => {
    const canvas = document.createElement("canvas");
    drawPass(canvas, d);
    const a = document.createElement("a");
    a.download = `HackSprint3-Pass-${d.name.replace(/[^a-z0-9]+/gi, "-")}-${d.passNumber}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  });
}

/** Live preview of one member's pass. */
export default function EntryPass({ data }: { data: MemberPass }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let alive = true;
    loadPassFonts().then(() => {
      if (alive && ref.current) drawPass(ref.current, data);
    });
    return () => { alive = false; };
  }, [data]);
  return <canvas ref={ref} width={PASS_W} height={PASS_H} aria-label={`Entry pass for ${data.name}`} />;
}
