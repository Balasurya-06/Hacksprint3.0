"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import qrcode from "qrcode-generator";

/* ──────────────────────────────────────────────────────────────
   HackSprint 3.0 — Participant Pass ("picture of me" card, 1080 × 1350).
   A shareable keepsake to celebrate being part of HackSprint 3.0,
   sized 4:5 for LinkedIn / Instagram feeds.
   Composition: a dark, out-of-focus graffiti backdrop (red brush
   strokes, spray splatter, giant blurred letters) under a slightly
   tilted, crumpled bone-paper card. On the card: logo + title +
   stamp; huge bubbly HACK / SPRINT letters fading black → red; the
   photo in a white polaroid frame with crop marks and the name as a
   bubbly sticker; a 2027 row with the team; a quote; and a footer
   with venue + finale date, registration deadline, pass ID and a QR
   code to hacksprint.tech.
   Everything is drawn on one <canvas>, so the preview and the
   downloaded PNG are pixel-identical.
   ────────────────────────────────────────────────────────────── */

const PW = 1080;
const PH = 1350;
const SITE_URL = "https://www.hacksprint.tech";

const RED = "#e5191f";
const RED_HOT = "#ff3b30";
const RED_DEEP = "#8f0c10";
const INK = "#0b0b0d";
const BONE = "#f4eee4";


function newPassId() {
  const n = Math.floor(Math.random() * 9000) + 1000;
  const c = "ABCDEFGHJKLMNPQRSTUVWXYZ"[Math.floor(Math.random() * 24)];
  return `HS3-${c}${n}`;
}

type Ctx = CanvasRenderingContext2D & { letterSpacing?: string };

function spaced(ctx: Ctx, px: number) {
  if ("letterSpacing" in ctx) ctx.letterSpacing = `${px}px`;
}

function fitFont(ctx: Ctx, text: string, maxW: number, start: number, min: number, family: string, weight = "") {
  let size = start;
  const set = () => (ctx.font = `${weight} ${size}px ${family}`.trim());
  set();
  while (ctx.measureText(text).width > maxW && size > min) {
    size -= 2;
    set();
  }
  return size;
}

/* Seeded random, so textures don't shimmer while someone types. */
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Four-point sparkle. */
function sparkle(ctx: Ctx, x: number, y: number, r: number, color: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y);
  ctx.quadraticCurveTo(x, y, x, y - r);
  ctx.fill();
}

/* QR code (→ website) on a white tile with a thin ink border. */
/* The URL never changes, so build the QR matrix once (it's slow on low-end
   phones) instead of on every redraw / keystroke. */
let qrCache: ReturnType<typeof qrcode> | null = null;
function qrTile(ctx: Ctx, x: number, y: number, size: number) {
  if (!qrCache) {
    qrCache = qrcode(0, "M");
    qrCache.addData(SITE_URL);
    qrCache.make();
  }
  const qr = qrCache;
  const count = qr.getModuleCount();
  const pad = 8;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x - pad, y - pad, size + pad * 2, size + pad * 2);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2;
  ctx.strokeRect(x - pad, y - pad, size + pad * 2, size + pad * 2);
  const cell = size / count;
  ctx.fillStyle = INK;
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (qr.isDark(row, col)) ctx.fillRect(x + col * cell, y + row * cell, Math.ceil(cell), Math.ceil(cell));
    }
  }
}

/* Stretched bubbly line filling a box, with a vertical gradient. */
function bigLine(ctx: Ctx, text: string, family: string, cx: number, baseline: number, maxW: number, height: number, from: string, to: string) {
  ctx.font = `100px ${family}`;
  const size = maxW / (ctx.measureText(text).width / 100);
  const sy = Math.min(2.3, Math.max(0.9, height / (size * 0.74)));
  ctx.save();
  ctx.translate(cx, baseline);
  ctx.scale(1, sy);
  ctx.font = `${size}px ${family}`;
  ctx.textAlign = "center";
  const g = ctx.createLinearGradient(0, -size * 0.78, 0, 0);
  g.addColorStop(0, from);
  g.addColorStop(1, to);
  ctx.fillStyle = g;
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

type DrawState = {
  name: string;
  team: string;
  passId: string;
  photo: HTMLImageElement | null;
  logo: HTMLImageElement | null;
};

function drawPass(ctx: Ctx, s: DrawState) {
  const display = "Anton, Impact, sans-serif";
  const mono = "'JetBrains Mono', ui-monospace, monospace";
  const body = "Inter, system-ui, sans-serif";
  const bubble = "'Rammetto One', 'Arial Black', sans-serif";

  ctx.save();
  ctx.clearRect(0, 0, PW, PH);
  spaced(ctx, 0);
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  /* ── Backdrop: dark, out-of-focus graffiti ── */
  ctx.fillStyle = "#070707";
  ctx.fillRect(0, 0, PW, PH);
  const r = rng(7);
  ctx.save();
  ctx.filter = "blur(10px)";
  ctx.globalAlpha = 0.6;
  ctx.font = `440px ${bubble}`;
  ctx.fillStyle = RED_DEEP;
  ctx.fillText("HS", -60, 430);
  ctx.fillStyle = RED;
  ctx.fillText("3.0", 470, 1390);
  ctx.restore();
  ctx.save();
  ctx.filter = "blur(2px)";
  ctx.lineCap = "round";
  for (let i = 0; i < 16; i++) {
    const pick = r();
    ctx.strokeStyle = pick < 0.45 ? RED : pick < 0.8 ? RED_DEEP : "rgba(244,238,228,0.55)";
    ctx.globalAlpha = 0.35 + r() * 0.45;
    ctx.lineWidth = 18 + r() * 52;
    const x0 = r() * PW;
    const y0 = r() * PH;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.bezierCurveTo(x0 + (r() - 0.5) * 640, y0 + (r() - 0.5) * 640, x0 + (r() - 0.5) * 640, y0 + (r() - 0.5) * 640, x0 + (r() - 0.5) * 520, y0 + (r() - 0.5) * 520);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  for (let c = 0; c < 6; c++) {
    const sx = r() * PW;
    const sy = r() * PH;
    ctx.fillStyle = c % 2 ? RED_HOT : BONE;
    for (let i = 0; i < 46; i++) {
      const a = r() * Math.PI * 2;
      const d = Math.pow(r(), 1.8) * 120;
      ctx.globalAlpha = 0.25 + r() * 0.5;
      ctx.beginPath();
      ctx.arc(sx + Math.cos(a) * d, sy + Math.sin(a) * d, 1 + r() * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
  const vig = ctx.createRadialGradient(PW / 2, PH / 2, PH * 0.25, PW / 2, PH / 2, PH * 0.75);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(0,0,0,0.65)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, PW, PH);

  /* ── The paper card ── */
  const cx = 70;
  const cy = 56;
  const cw = 940;
  const ch = 1238;
  ctx.save();
  ctx.translate(PW / 2, PH / 2);
  ctx.rotate(-0.02);
  ctx.translate(-PW / 2, -PH / 2);

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.65)";
  ctx.shadowBlur = 60;
  ctx.shadowOffsetY = 26;
  ctx.fillStyle = BONE;
  ctx.beginPath();
  ctx.roundRect(cx, cy, cw, ch, 22);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(cx, cy, cw, ch, 22);
  ctx.clip();

  /* Paper grain + soft creases. */
  const pr = rng(42);
  for (let i = 0; i < 2600; i++) {
    ctx.fillStyle = pr() < 0.5 ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.45)";
    ctx.fillRect(cx + pr() * cw, cy + pr() * ch, 1.6, 1.6);
  }
  for (let i = 0; i < 8; i++) {
    const y = cy + pr() * ch;
    ctx.save();
    ctx.translate(cx + cw / 2, y);
    ctx.rotate((pr() - 0.5) * 0.7);
    const g = ctx.createLinearGradient(0, -26, 0, 26);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(0.48, "rgba(0,0,0,0.045)");
    g.addColorStop(0.52, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(-cw, -26, cw * 2, 52);
    ctx.restore();
  }

  /* Top row: logo · title · stamp. */
  if (s.logo && s.logo.complete && s.logo.naturalWidth) {
    const lh = 64;
    const lw = (s.logo.naturalWidth / s.logo.naturalHeight) * lh;
    ctx.drawImage(s.logo, cx + 40, cy + 30, lw, lh);
  }
  ctx.textAlign = "center";
  ctx.fillStyle = INK;
  ctx.font = `52px ${display}`;
  spaced(ctx, 2);
  ctx.fillText("HACKER PASS", PW / 2, cy + 78);
  ctx.font = `700 13px ${mono}`;
  spaced(ctx, 4);
  ctx.fillStyle = RED;
  ctx.fillText("HACKSPRINT 3.0 · EDITION 2027", PW / 2, cy + 104);
  spaced(ctx, 0);
  ctx.save();
  ctx.translate(cx + cw - 92, cy + 66);
  ctx.rotate(-0.2);
  ctx.strokeStyle = RED;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 46, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(0, 0, 39, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = RED;
  ctx.font = `700 9px ${mono}`;
  spaced(ctx, 2);
  ctx.fillText("HACKSPRINT", 0, -14);
  ctx.font = `36px ${display}`;
  spaced(ctx, 0);
  ctx.fillText("3.0", 0, 22);
  ctx.restore();
  ctx.textAlign = "left";

  /* Huge bubbly letters behind the photo. */
  bigLine(ctx, "HACK", bubble, PW / 2, cy + 440, cw - 80, 300, INK, RED_DEEP);
  bigLine(ctx, "SPRINT", bubble, PW / 2, cy + 790, cw - 80, 320, RED, "#ff7a5c");

  /* Polaroid photo frame, slightly rotated, with crop marks. */
  const fx = 280;
  const fy = 196;
  const fw = 520;
  const fh = 610;
  const px = fx + 18;
  const py = fy + 18;
  const pw = fw - 36;
  const ph = 486;
  ctx.save();
  ctx.translate(fx + fw / 2, fy + fh / 2);
  ctx.rotate(0.035);
  ctx.translate(-(fx + fw / 2), -(fy + fh / 2));
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(fx, fy, fw, fh);
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.rect(px, py, pw, ph);
  ctx.clip();
  if (s.photo) {
    const k = Math.max(pw / s.photo.naturalWidth, ph / s.photo.naturalHeight);
    const dw = s.photo.naturalWidth * k;
    const dh = s.photo.naturalHeight * k;
    ctx.drawImage(s.photo, px + (pw - dw) / 2, py + (ph - dh) * 0.2, dw, dh);
  } else {
    /* Abstract red/black swirl as the placeholder backdrop. */
    ctx.fillStyle = "#160506";
    ctx.fillRect(px, py, pw, ph);
    const sx = px + pw * 0.62;
    const sy = py + ph * 0.36;
    const bands = [RED, INK, RED_DEEP, BONE, RED_HOT, INK];
    for (let i = 18; i >= 1; i--) {
      ctx.fillStyle = bands[i % bands.length];
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.08) {
        const rr = i * 30 + Math.sin(a * 3 + i * 0.9) * 12;
        const x = sx + Math.cos(a) * rr * 1.15;
        const y = sy + Math.sin(a) * rr;
        if (a === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.beginPath();
    ctx.arc(px + pw / 2, py + ph * 0.42, 78, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(px + pw / 2, py + ph + 40, 190, 170, 0, Math.PI, 0);
    ctx.fill();
    ctx.textAlign = "center";
    ctx.font = `700 18px ${mono}`;
    spaced(ctx, 5);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("ADD YOUR PHOTO", px + pw / 2, py + 50);
    ctx.textAlign = "left";
    spaced(ctx, 0);
  }
  ctx.restore();

  /* Strip labels: PAR / TICI / PANT  ·  HS / 3.0 */
  ctx.fillStyle = INK;
  ctx.font = `26px ${display}`;
  spaced(ctx, 1);
  ["PAR", "TICI", "PANT"].forEach((t, i) => ctx.fillText(t, fx + 22, fy + fh - 66 + i * 26));
  ctx.textAlign = "right";
  ctx.font = `32px ${display}`;
  ctx.fillText("HS", fx + fw - 22, fy + fh - 46);
  ctx.fillStyle = RED;
  ctx.fillText("3.0", fx + fw - 22, fy + fh - 14);
  ctx.textAlign = "left";
  spaced(ctx, 0);

  /* Crop marks at the frame corners. */
  ctx.strokeStyle = INK;
  ctx.lineWidth = 3;
  const mark = (x: number, y: number) => {
    ctx.beginPath();
    ctx.moveTo(x - 9, y);
    ctx.lineTo(x + 9, y);
    ctx.moveTo(x, y - 9);
    ctx.lineTo(x, y + 9);
    ctx.stroke();
  };
  mark(fx - 18, fy - 18);
  mark(fx + fw + 18, fy - 18);
  mark(fx - 18, fy + fh + 18);
  mark(fx + fw + 18, fy + fh + 18);
  ctx.restore();

  /* Name sticker — bubbly, red, ink outline, white die-cut edge. */
  const name = (s.name.trim() || "YOUR NAME").toUpperCase();
  const ns = fitFont(ctx, name, 290, 78, 26, bubble);
  ctx.save();
  ctx.translate(PW / 2 + 4, fy + fh - 50);
  ctx.rotate(-0.06);
  ctx.font = `${ns}px ${bubble}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 8;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = ns * 0.3;
  ctx.strokeText(name, 0, 0);
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = INK;
  ctx.lineWidth = ns * 0.14;
  ctx.strokeText(name, 0, 0);
  const ng = ctx.createLinearGradient(0, -ns * 0.45, 0, ns * 0.45);
  ng.addColorStop(0, "#ff7466");
  ng.addColorStop(0.5, RED);
  ng.addColorStop(1, RED_DEEP);
  ctx.fillStyle = ng;
  ctx.fillText(name, 0, 0);
  ctx.restore();
  ctx.textBaseline = "alphabetic";
  sparkle(ctx, fx + fw + 6, fy + fh - 96, 18, RED);
  sparkle(ctx, fx + fw + 30, fy + fh - 66, 8, RED);

  /* 2027 row: logo · year · team. */
  const rowY = cy + 935;
  if (s.logo && s.logo.complete && s.logo.naturalWidth) {
    const lh = 50;
    const lw = (s.logo.naturalWidth / s.logo.naturalHeight) * lh;
    ctx.drawImage(s.logo, cx + 44, rowY - 44, lw, lh);
  }
  ctx.save();
  ctx.font = `104px ${bubble}`;
  ctx.textAlign = "center";
  const yg = ctx.createLinearGradient(0, rowY - 80, 0, rowY);
  yg.addColorStop(0, INK);
  yg.addColorStop(1, RED);
  ctx.fillStyle = yg;
  ctx.fillText("2027", PW / 2, rowY + 4);
  ctx.restore();
  const team = (s.team.trim() || "TEAM NAME").toUpperCase();
  ctx.textAlign = "right";
  ctx.font = `700 12px ${mono}`;
  spaced(ctx, 3);
  ctx.fillStyle = RED;
  ctx.fillText("TEAM", cx + cw - 44, rowY - 34);
  spaced(ctx, 1);
  ctx.fillStyle = INK;
  fitFont(ctx, team, 230, 32, 16, display);
  ctx.fillText(team, cx + cw - 44, rowY);
  ctx.textAlign = "left";
  spaced(ctx, 0);

  /* Quote + rule. */
  ctx.textAlign = "center";
  ctx.font = `italic 500 18px ${body}`;
  ctx.fillStyle = "rgba(11,11,13,0.78)";
  ctx.fillText("“36 hours. One idea. Build it, break it, ship it.”", PW / 2, rowY + 50);
  ctx.font = `700 12px ${mono}`;
  spaced(ctx, 3);
  ctx.fillStyle = RED;
  ctx.fillText("— INDIA'S BIGGEST STUDENT HACKATHON", PW / 2, rowY + 76);
  spaced(ctx, 0);
  ctx.textAlign = "left";
  ctx.fillStyle = INK;
  ctx.fillRect(cx + 44, rowY + 94, cw - 88, 2);

  /* Footer: venue + finale | deadline + pass ID | QR. */
  const fyb = rowY + 94;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx + 56, fyb + 40, 9, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = INK;
  ctx.font = `30px ${display}`;
  spaced(ctx, 1);
  ctx.fillText("KAHE · COIMBATORE", cx + 76, fyb + 51);
  fitFont(ctx, "FEB 5–6, 2027", 330, 66, 40, display);
  ctx.fillText("FEB 5–6, 2027", cx + 44, fyb + 124);
  ctx.font = `700 12px ${mono}`;
  spaced(ctx, 3);
  ctx.fillStyle = RED;
  ctx.fillText("GRAND FINALE · 36 HOURS", cx + 46, fyb + 152);
  spaced(ctx, 0);

  const divX = cx + 410;
  ctx.fillStyle = INK;
  ctx.fillRect(divX, fyb + 22, 2, 140);
  const tx = divX + 22;
  ctx.font = `italic 500 16px ${body}`;
  ctx.fillStyle = "rgba(11,11,13,0.82)";
  ["Registration closes Dec 28, 2026.", "Proud to be part of HackSprint 3.0 —", "where ideas sprint into reality."].forEach((l, i) =>
    ctx.fillText(l, tx, fyb + 46 + i * 24),
  );
  ctx.font = `700 12px ${mono}`;
  spaced(ctx, 2);
  ctx.fillStyle = INK;
  ctx.fillText(`PASS ID · ${s.passId}`, tx, fyb + 140);
  spaced(ctx, 0);

  const qs = 100;
  const qx = cx + cw - 44 - qs;
  const qy = fyb + 28;
  qrTile(ctx, qx, qy, qs);
  ctx.textAlign = "center";
  ctx.font = `700 9px ${mono}`;
  spaced(ctx, 2);
  ctx.fillStyle = INK;
  ctx.fillText("SCAN · HACKSPRINT.TECH", qx + qs / 2, qy + qs + 26);
  ctx.textAlign = "left";
  spaced(ctx, 0);

  ctx.restore(); // card clip
  ctx.restore(); // card rotation
  ctx.restore();
}

export default function PassGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [passId, setPassId] = useState("HS3-X0000");
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const [fontsReady, setFontsReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const photoUrl = useRef<string | null>(null);

  /* Client-only setup: logo, fonts, random pass ID. */
  useEffect(() => {
    const img = new Image();
    img.onload = () => setLogo(img);
    img.src = "/3.0.png";
    Promise.all([
      document.fonts.load("100px Anton"),
      document.fonts.load("700 28px 'JetBrains Mono'"),
      document.fonts.load("100px 'Rammetto One'"),
      document.fonts.load("italic 500 18px Inter"),
    ])
      .catch(() => undefined)
      .finally(() => {
        setPassId(newPassId());
        setFontsReady(true);
      });
    return () => {
      if (photoUrl.current) URL.revokeObjectURL(photoUrl.current);
    };
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) drawPass(ctx as Ctx, { name, team, passId, photo, logo });
  }, [name, team, passId, photo, logo, fontsReady]);

  const loadFile = useCallback((file?: File | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (photoUrl.current) URL.revokeObjectURL(photoUrl.current);
    const url = URL.createObjectURL(file);
    photoUrl.current = url;
    const img = new Image();
    img.onload = () => setPhoto(img);
    img.src = url;
  }, []);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const slug = (name.trim() || "hacker").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `hacksprint3-pass-${slug || "hacker"}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }, "image/png");
  };

  return (
    <div className="pass-layout">
      <form className="pass-panel pass-panel--simple" onSubmit={(e) => { e.preventDefault(); download(); }}>
        <label className="pass-field">
          <span className="pass-label">{"// Your name"}</span>
          <input className="pass-input" value={name} maxLength={24} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" autoComplete="name" />
        </label>

        <label className="pass-field">
          <span className="pass-label">{"// Team name"}</span>
          <input className="pass-input" value={team} maxLength={26} onChange={(e) => setTeam(e.target.value)} placeholder="Enter your team name" />
        </label>

        <div className="pass-field">
          <span className="pass-label">{"// Your photo"}</span>
          <label
            className={`pass-drop ${dragging ? "is-drag" : ""} ${photo ? "has-photo" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); loadFile(e.dataTransfer.files?.[0]); }}
          >
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => loadFile(e.target.files?.[0])} />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span>{photo ? "Photo added — click to change" : "Upload a photo"}</span>
            <small>Stays on your device. Nothing is uploaded.</small>
          </label>
        </div>

        <button type="submit" className="pass-download">
          Download pass
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </form>

      <div className="pass-preview pass-preview--poster">
        <p className="pass-preview-label">Live preview</p>
        <canvas
          ref={canvasRef}
          width={PW}
          height={PH}
          className="pass-canvas"
          style={{ display: "block", width: "100%", height: "auto", aspectRatio: `${PW} / ${PH}` }}
          aria-label="Your HackSprint 3.0 participant pass preview"
          role="img"
        />
      </div>
    </div>
  );
}
