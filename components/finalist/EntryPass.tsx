"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import qrcode from "qrcode-generator";

/* Grand-finale entry pass (1080 × 1600), drawn on one <canvas> so the preview and
   the downloaded PNG are identical. The QR points at /finalist/verify?t=<signed token>. */

const W = 1080;
const H = 1600;
const RED = "#e5191f";
const RED_HOT = "#ff3b30";
const INK = "#0b0b0d";
const BONE = "#f4eee4";
const MUTED = "#a9a4a0";

export type PassData = {
  teamName: string;
  teamCode: string;
  members: { name: string; isLeader: boolean }[];
  amountPaid: number | null;
  paymentId: string | null;
  token: string;
  venue: string;
  dates: string;
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

function draw(canvas: HTMLCanvasElement, d: PassData) {
  const ctx = canvas.getContext("2d") as Ctx;
  canvas.width = W;
  canvas.height = H;

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

  /* red side band */
  ctx.fillStyle = RED;
  ctx.fillRect(0, 0, 18, H);

  const L = 80;
  /* header */
  ctx.fillStyle = RED_HOT;
  ctx.font = "800 28px 'JetBrains Mono', monospace";
  spaced(ctx, 8);
  ctx.fillText("GRAND FINALE · ENTRY PASS", L, 120);
  spaced(ctx, 0);

  ctx.fillStyle = BONE;
  ctx.font = "150px Anton, Impact, sans-serif";
  ctx.fillText("HACKSPRINT", L, 280);
  ctx.fillStyle = RED;
  ctx.fillText("3.0", L + ctx.measureText("HACKSPRINT ").width, 280);

  /* team */
  ctx.fillStyle = MUTED;
  ctx.font = "700 26px 'JetBrains Mono', monospace";
  spaced(ctx, 6);
  ctx.fillText("TEAM", L, 400);
  spaced(ctx, 0);
  ctx.fillStyle = BONE;
  const name = d.teamName.toUpperCase();
  fit(ctx, name, W - L * 2, 130, 56, "Anton, Impact, sans-serif");
  ctx.fillText(name, L, 530);

  ctx.fillStyle = RED_HOT;
  ctx.font = "700 36px 'JetBrains Mono', monospace";
  spaced(ctx, 4);
  ctx.fillText(d.teamCode, L, 600);
  spaced(ctx, 0);

  /* members */
  ctx.fillStyle = MUTED;
  ctx.font = "700 26px 'JetBrains Mono', monospace";
  spaced(ctx, 6);
  ctx.fillText(`MEMBERS · ${d.members.length}`, L, 700);
  spaced(ctx, 0);
  d.members.slice(0, 6).forEach((m, i) => {
    const y = 770 + i * 70;
    ctx.fillStyle = RED;
    ctx.beginPath();
    ctx.arc(L + 14, y - 14, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = BONE;
    fit(ctx, m.name, W - L * 2 - 240, 44, 26, "Inter, Arial, sans-serif", "700");
    ctx.fillText(m.name, L + 46, y);
    if (m.isLeader) {
      ctx.fillStyle = RED_HOT;
      ctx.font = "800 22px 'JetBrains Mono', monospace";
      spaced(ctx, 4);
      ctx.fillText("LEADER", W - L - 120, y - 4);
      spaced(ctx, 0);
    }
  });

  /* perforation */
  const py = 1200;
  ctx.fillStyle = INK;
  ctx.beginPath(); ctx.arc(0, py, 34, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(W, py, 34, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(244,238,228,0.35)";
  ctx.setLineDash([16, 14]);
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(50, py); ctx.lineTo(W - 50, py); ctx.stroke();
  ctx.setLineDash([]);

  /* stub */
  const qr = qrcode(0, "M");
  qr.addData(`${d.siteUrl}/finalist/verify?t=${d.token}`);
  qr.make();
  const n = qr.getModuleCount();
  const qs = 300;
  const qx = W - L - qs;
  const qy = py + 50;
  ctx.fillStyle = "#fff";
  ctx.fillRect(qx - 16, qy - 16, qs + 32, qs + 32);
  const cell = qs / n;
  ctx.fillStyle = "#000";
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      if (qr.isDark(r, c)) ctx.fillRect(qx + c * cell, qy + r * cell, Math.ceil(cell), Math.ceil(cell));

  const rows: [string, string][] = [
    ["VENUE", d.venue],
    ["DATES", d.dates],
    ["STATUS", d.amountPaid ? `PAID · ₹${d.amountPaid.toLocaleString("en-IN")}` : "PAID"],
  ];
  rows.forEach(([k, v], i) => {
    const y = py + 90 + i * 100;
    ctx.fillStyle = MUTED;
    ctx.font = "700 22px 'JetBrains Mono', monospace";
    spaced(ctx, 5);
    ctx.fillText(k, L, y);
    spaced(ctx, 0);
    ctx.fillStyle = k === "STATUS" ? "#7fe6a8" : BONE;
    fit(ctx, v, qx - L - 60, 40, 24, "Inter, Arial, sans-serif", "800");
    ctx.fillText(v, L, y + 46);
  });
  ctx.fillStyle = "rgba(244,238,228,0.45)";
  ctx.font = "500 20px 'JetBrains Mono', monospace";
  ctx.fillText("Show this QR at the entry desk · non-transferable", L, H - 40);
}

export default function EntryPass({ data }: { data: PassData }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all([
      document.fonts.load("150px Anton"),
      document.fonts.load("700 36px 'JetBrains Mono'"),
      document.fonts.load("700 44px Inter"),
    ])
      .catch(() => undefined)
      .then(() => {
        if (alive && ref.current) {
          draw(ref.current, data);
          setReady(true);
        }
      });
    return () => { alive = false; };
  }, [data]);

  const download = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = `HackSprint3-EntryPass-${data.teamCode}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  }, [data.teamCode]);

  return (
    <div className="fp-pass">
      <canvas ref={ref} width={W} height={H} aria-label={`Entry pass for team ${data.teamName}`} />
      <div>
        <h3 className="fp-card-title">Your entry pass</h3>
        <p className="fp-muted">
          Download the pass and keep it on your phone. One pass covers the whole team. Volunteers scan the QR at the
          entry desk, and every member listed should carry their college ID card.
        </p>
        <div className="fp-btn-row" style={{ marginTop: 18 }}>
          <button className="hs-btn hs-btn--primary" onClick={download} disabled={!ready}>
            ⬇ Download entry pass
          </button>
        </div>
      </div>
    </div>
  );
}
