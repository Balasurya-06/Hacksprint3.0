"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import qrcode from "qrcode-generator";

/* ──────────────────────────────────────────────────────────────
   HackSprint 3.0 — Round 1 Participant Pass (event-ticket layout).
   A keepsake for everyone who took part in Round 1 — NOT an entry
   ticket. Shortlisted teams get a separate finale pass later.
   Main body: logo, pass title, name/team, registration window,
   Round 1 status, finale date (shortlisted only) and the photo.
   Tear-off stub: round/status, QR → hacksprint.tech, pass ID.
   Everything is drawn on one <canvas>, so the preview and the
   downloaded PNG are pixel-identical.
   ────────────────────────────────────────────────────────────── */

const W = 1800;
const H = 700;
const STUB_X = 1330;
const SITE_URL = "https://www.hacksprint.tech";
const PASS_URL = `${SITE_URL}/pass`;

const themes = {
  night: {
    label: "Night",
    body: "#0b0b0d",
    bodyText: "#ffffff",
    bodyMuted: "rgba(244,238,228,0.55)",
    stub: "#f4eee4",
    stubText: "#0b0b0d",
    stubMuted: "rgba(11,11,13,0.55)",
  },
  bone: {
    label: "Bone",
    body: "#f4eee4",
    bodyText: "#0b0b0d",
    bodyMuted: "rgba(11,11,13,0.55)",
    stub: "#e5191f",
    stubText: "#ffffff",
    stubMuted: "rgba(255,255,255,0.75)",
  },
} as const;
type ThemeKey = keyof typeof themes;

const RED = "#e5191f";
const RED_HOT = "#ff3b30";
const RED_DEEP = "#8f0c10";

const shareText =
  "I took part in Round 1 of HACKSPRINT 3.0 🔥 — India's biggest student hackathon. Fingers crossed for the shortlist! Grand finale: Feb 5–6, 2027 at KAHE, Coimbatore. Get your participant pass 👉";
const caption = `${shareText} ${PASS_URL}\n\n@hacksprint3.0 #HackSprint3 #HackSprint2027 #Hackathon #KAHE`;

function newPassId() {
  const n = Math.floor(Math.random() * 9000) + 1000;
  const c = "ABCDEFGHJKLMNPQRSTUVWXYZ"[Math.floor(Math.random() * 24)];
  return `HS3-R1-${c}${n}`;
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

/* Location pin icon. */
function pin(ctx: Ctx, x: number, y: number, s: number, color: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 22);
  ctx.bezierCurveTo(-4, 14, -14, 8, -14, -2);
  ctx.arc(0, -2, 14, Math.PI, 0);
  ctx.bezierCurveTo(14, 8, 4, 14, 0, 22);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(0, -2, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

type DrawState = {
  name: string;
  team: string;
  theme: ThemeKey;
  passId: string;
  photo: HTMLImageElement | null;
  logo: HTMLImageElement | null;
};

function drawPass(ctx: Ctx, s: DrawState) {
  const t = themes[s.theme];
  const display = "Anton, Impact, sans-serif";
  const mono = "'JetBrains Mono', ui-monospace, monospace";
  const body = "Inter, system-ui, sans-serif";

  ctx.save();
  ctx.clearRect(0, 0, W, H);
  spaced(ctx, 0);
  ctx.textBaseline = "alphabetic";

  /* Ticket silhouette with notches at the perforation */
  const r = 26;
  const notch = 30;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(STUB_X - notch, 0);
  ctx.arc(STUB_X, 0, notch, Math.PI, 0, true);
  ctx.lineTo(W - r, 0);
  ctx.arcTo(W, 0, W, r, r);
  ctx.lineTo(W, H - r);
  ctx.arcTo(W, H, W - r, H, r);
  ctx.lineTo(STUB_X + notch, H);
  ctx.arc(STUB_X, H, notch, 0, Math.PI, true);
  ctx.lineTo(r, H);
  ctx.arcTo(0, H, 0, H - r, r);
  ctx.lineTo(0, r);
  ctx.arcTo(0, 0, r, 0, r);
  ctx.closePath();
  ctx.clip();

  /* ── Main body ── */
  ctx.fillStyle = t.body;
  ctx.fillRect(0, 0, STUB_X, H);
  if (s.theme === "night") {
    const glow = ctx.createRadialGradient(420, 0, 0, 420, 0, 700);
    glow.addColorStop(0, "rgba(229,25,31,0.22)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, STUB_X, H);
    ctx.fillStyle = "rgba(255,255,255,0.018)";
    for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, STUB_X, 1);
  }

  /* Decorative waves behind the photo (right side of the body) */
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(880, 0);
  ctx.bezierCurveTo(820, 160, 980, 230, 900, 380);
  ctx.bezierCurveTo(840, 500, 960, 600, 920, H);
  ctx.lineTo(STUB_X, H);
  ctx.lineTo(STUB_X, 0);
  ctx.closePath();
  ctx.fillStyle = RED;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(990, 0);
  ctx.bezierCurveTo(940, 120, 1060, 210, 1010, 330);
  ctx.bezierCurveTo(960, 450, 1080, 560, 1040, H);
  ctx.lineTo(STUB_X, H);
  ctx.lineTo(STUB_X, 0);
  ctx.closePath();
  ctx.fillStyle = RED_DEEP;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(1150, 0);
  ctx.bezierCurveTo(1110, 140, 1210, 230, 1170, 360);
  ctx.bezierCurveTo(1130, 480, 1230, 580, 1200, H);
  ctx.lineTo(STUB_X, H);
  ctx.lineTo(STUB_X, 0);
  ctx.closePath();
  ctx.fillStyle = "#14090a";
  ctx.fill();
  ctx.restore();

  /* Vertical hashtag on the left edge */
  ctx.save();
  ctx.translate(46, H / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.font = `700 18px ${mono}`;
  spaced(ctx, 6);
  ctx.fillStyle = t.bodyMuted;
  ctx.fillText("#HACKSPRINT3 · @HACKSPRINT3.0", 0, 6);
  ctx.restore();
  spaced(ctx, 0);

  /* Logo */
  const lx = 96;
  if (s.logo && s.logo.complete && s.logo.naturalWidth) {
    const lh = 120;
    const lw = (s.logo.naturalWidth / s.logo.naturalHeight) * lh;
    if (s.theme === "bone") {
      ctx.fillStyle = "#0b0b0d";
      ctx.beginPath();
      ctx.roundRect(lx - 14, 42, lw + 28, lh + 20, 16);
      ctx.fill();
    }
    ctx.drawImage(s.logo, lx, 52, lw, lh);
  } else {
    ctx.fillStyle = t.bodyText;
    ctx.font = `90px ${display}`;
    ctx.fillText("HACKSPRINT 3.0", lx, 150);
  }

  /* Pass title chip */
  ctx.font = `30px ${display}`;
  spaced(ctx, 4);
  const chip = "ROUND 1 · PARTICIPANT PASS";
  const cw = ctx.measureText(chip).width + 40;
  ctx.fillStyle = RED;
  ctx.beginPath();
  ctx.roundRect(lx, 200, cw, 50, 8);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.fillText(chip, lx + 20, 237);
  spaced(ctx, 0);

  /* Name + team */
  const name = (s.name.trim() || "YOUR NAME").toUpperCase();
  ctx.fillStyle = t.bodyText;
  fitFont(ctx, name, 720, 118, 56, display);
  spaced(ctx, 1);
  ctx.fillText(name, lx - 4, 390);
  const team = (s.team.trim() || "TEAM NAME").toUpperCase();
  fitFont(ctx, `TEAM // ${team}`, 720, 30, 18, mono, "700");
  spaced(ctx, 6);
  ctx.fillStyle = s.theme === "night" ? RED_HOT : RED;
  ctx.fillText(`TEAM // ${team}`, lx, 438);
  spaced(ctx, 0);

  /* Info row: registration · finale · venue */
  ctx.fillStyle = s.theme === "night" ? "rgba(255,255,255,0.12)" : "rgba(11,11,13,0.14)";
  ctx.fillRect(lx, 484, 740, 2);
  const info = (label: string, value: string, x: number) => {
    ctx.font = `700 16px ${mono}`;
    spaced(ctx, 4);
    ctx.fillStyle = t.bodyMuted;
    ctx.fillText(label, x, 528);
    ctx.font = `34px ${display}`;
    spaced(ctx, 1);
    ctx.fillStyle = t.bodyText;
    ctx.fillText(value, x, 572);
  };
  info("REGISTRATION", "NOV 8 – DEC 28", lx);
  info("ROUND 1", "PARTICIPATED", lx + 280);
  info("GRAND FINALE", "FEB 5–6, 2027", lx + 520);
  pin(ctx, lx + 12, 626, 1, RED);
  ctx.font = `600 22px ${body}`;
  spaced(ctx, 1);
  ctx.fillStyle = t.bodyText;
  ctx.fillText("Grand finale at KAHE, Coimbatore · shortlisted teams only", lx + 40, 640);
  spaced(ctx, 0);

  /* Photo — right-side space over the waves */
  const px = 940;
  const py = 92;
  const pw = 330;
  const ph = 400;
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 18;
  ctx.fillStyle = "#f4eee4";
  ctx.beginPath();
  ctx.roundRect(px - 12, py - 12, pw + 24, ph + 24, 22);
  ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(px, py, pw, ph, 14);
  ctx.clip();
  ctx.fillStyle = "#121214";
  ctx.fillRect(px, py, pw, ph);
  if (s.photo) {
    const k = Math.max(pw / s.photo.naturalWidth, ph / s.photo.naturalHeight);
    const dw = s.photo.naturalWidth * k;
    const dh = s.photo.naturalHeight * k;
    ctx.drawImage(s.photo, px + (pw - dw) / 2, py + (ph - dh) / 2, dw, dh);
  } else {
    const cx = px + pw / 2;
    const cy = py + ph / 2 - 16;
    ctx.fillStyle = "rgba(255,255,255,0.14)";
    ctx.beginPath();
    ctx.arc(cx, cy - 30, 46, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx, cy + 90, 90, 60, 0, Math.PI, 0);
    ctx.fill();
    ctx.textAlign = "center";
    ctx.font = `700 18px ${mono}`;
    spaced(ctx, 5);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.fillText("YOUR PHOTO", cx, py + ph - 34);
    ctx.textAlign = "left";
    spaced(ctx, 0);
  }
  ctx.restore();
  /* Photo label */
  ctx.font = `26px ${display}`;
  spaced(ctx, 4);
  const tag = "HACKER";
  const tw = ctx.measureText(tag).width + 36;
  ctx.fillStyle = "#0b0b0d";
  ctx.beginPath();
  ctx.roundRect(px + pw / 2 - tw / 2, py + ph - 4, tw, 44, 22);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(tag, px + pw / 2, py + ph + 28);
  ctx.textAlign = "left";
  spaced(ctx, 0);

  /* ── Stub ── */
  ctx.fillStyle = t.stub;
  ctx.fillRect(STUB_X, 0, W - STUB_X, H);

  /* Perforation */
  ctx.strokeStyle = s.theme === "night" ? "rgba(11,11,13,0.45)" : "rgba(255,255,255,0.7)";
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 12]);
  ctx.beginPath();
  ctx.moveTo(STUB_X, notch + 10);
  ctx.lineTo(STUB_X, H - notch - 10);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.textAlign = "right";
  ctx.font = `700 15px ${mono}`;
  spaced(ctx, 4);
  ctx.fillStyle = t.stubMuted;
  ctx.fillText("#HACKSPRINT3", W - 40, 52);
  ctx.textAlign = "left";

  /* Rotated date / time, like a classic ticket stub */
  ctx.save();
  ctx.translate(STUB_X + 70, H - 70);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = t.stubText;
  ctx.font = `46px ${display}`;
  spaced(ctx, 2);
  ctx.fillText("ROUND", 0, 0);
  ctx.fillText("01", 0, 52);
  ctx.fillRect(0, 70, 520, 3);
  ctx.fillText("STATUS", 200, 0);
  ctx.fillText("PARTICIPANT", 200, 52);
  ctx.restore();
  spaced(ctx, 0);

  /* QR → website */
  const qr = qrcode(0, "M");
  qr.addData(SITE_URL);
  qr.make();
  const count = qr.getModuleCount();
  const qs = 250;
  const qx = W - 40 - qs;
  const qy = 90;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(qx - 14, qy - 14, qs + 28, qs + 28, 14);
  ctx.fill();
  const cell = qs / count;
  ctx.fillStyle = "#0b0b0d";
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (qr.isDark(row, col)) ctx.fillRect(qx + col * cell, qy + row * cell, Math.ceil(cell), Math.ceil(cell));
    }
  }
  ctx.textAlign = "center";
  ctx.font = `700 17px ${mono}`;
  spaced(ctx, 3);
  ctx.fillStyle = t.stubText;
  ctx.fillText("SCAN · HACKSPRINT.TECH", qx + qs / 2, qy + qs + 50);
  ctx.font = `700 15px ${mono}`;
  ctx.fillStyle = t.stubMuted;
  ctx.fillText("PASS ID", qx + qs / 2, qy + qs + 96);
  ctx.font = `700 24px ${mono}`;
  ctx.fillStyle = t.stubText;
  ctx.fillText(s.passId, qx + qs / 2, qy + qs + 128);
  ctx.font = `700 14px ${mono}`;
  spaced(ctx, 3);
  ctx.fillStyle = t.stubMuted;
  ctx.fillText("NOT AN ENTRY PASS", qx + qs / 2, H - 124, qs + 20);
  ctx.fillText("FINALE · SHORTLISTED ONLY", qx + qs / 2, H - 100, qs + 20);
  ctx.font = `40px ${display}`;
  spaced(ctx, 4);
  ctx.fillStyle = s.theme === "night" ? RED : "#ffffff";
  ctx.fillText("PARTICIPANT", qx + qs / 2, H - 46);
  ctx.textAlign = "left";
  spaced(ctx, 0);

  ctx.restore(); // silhouette clip
  ctx.restore();
}

export default function PassGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [theme, setTheme] = useState<ThemeKey>("night");
  const [passId, setPassId] = useState("HS3-R1-X0000");
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const [fontsReady, setFontsReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [canShareFile, setCanShareFile] = useState(false);
  const photoUrl = useRef<string | null>(null);

  /* Client-only setup: logo, fonts, random pass ID, share support. */
  useEffect(() => {
    const img = new Image();
    img.onload = () => setLogo(img);
    img.src = "/3.0.png";
    Promise.all([
      document.fonts.load("100px Anton"),
      document.fonts.load("700 28px 'JetBrains Mono'"),
      document.fonts.load("600 22px Inter"),
    ])
      .catch(() => undefined)
      .finally(() => {
        setPassId(newPassId());
        setFontsReady(true);
        try {
          const probe = new File([new Blob()], "p.png", { type: "image/png" });
          setCanShareFile(typeof navigator.canShare === "function" && navigator.canShare({ files: [probe] }));
        } catch {
          setCanShareFile(false);
        }
      });
    return () => {
      if (photoUrl.current) URL.revokeObjectURL(photoUrl.current);
    };
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) drawPass(ctx as Ctx, { name, team, theme, passId, photo, logo });
  }, [name, team, theme, passId, photo, logo, fontsReady]);

  const loadFile = useCallback((file?: File | null) => {
    if (!file || !file.type.startsWith("image/")) return;
    if (photoUrl.current) URL.revokeObjectURL(photoUrl.current);
    const url = URL.createObjectURL(file);
    photoUrl.current = url;
    const img = new Image();
    img.onload = () => setPhoto(img);
    img.src = url;
  }, []);

  const fileName = () => {
    const slug = (name.trim() || "hacker").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return `hacksprint3-pass-${slug || "hacker"}.png`;
  };

  const toBlob = () =>
    new Promise<Blob | null>((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) return resolve(null);
      canvas.toBlob((b) => resolve(b), "image/png");
    });

  const download = async () => {
    const blob = await toBlob();
    if (!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName();
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  /* Native share sheet (phones) — lets people post straight to Instagram stories, WhatsApp, LinkedIn… */
  const shareImage = async () => {
    const blob = await toBlob();
    if (!blob) return;
    const file = new File([blob], fileName(), { type: "image/png" });
    try {
      await navigator.share({ files: [file], title: "HACKSPRINT 3.0 — Round 1 Participant Pass", text: caption });
    } catch {
      /* user cancelled */
    }
  };

  const copyCaption = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  const enc = encodeURIComponent;
  const shareLinks = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(PASS_URL)}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(PASS_URL)}&hashtags=HackSprint3` },
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(`${shareText} ${PASS_URL}`)}` },
    { label: "Instagram", href: "https://www.instagram.com/hacksprint3.0" },
  ];

  return (
    <div className="pass-layout">
      <div className={`pass-preview pass-preview--${theme}`}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="pass-canvas"
          style={{ display: "block", width: "100%", height: "auto", aspectRatio: `${W} / ${H}` }}
          aria-label="Your HackSprint 3.0 Round 1 participant pass preview"
          role="img"
        />
      </div>

      <form className="pass-panel" onSubmit={(e) => { e.preventDefault(); download(); }}>
        <div className="pass-grid">
          <label className="pass-field">
            <span className="pass-label">{"// Your name"}</span>
            <input className="pass-input" value={name} maxLength={24} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" autoComplete="name" />
          </label>

          <label className="pass-field">
            <span className="pass-label">{"// Team name"}</span>
            <input className="pass-input" value={team} maxLength={26} onChange={(e) => setTeam(e.target.value)} placeholder="Enter your team name" />
          </label>

          <div className="pass-field">
            <span className="pass-label">{"// Photo"}</span>
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
              <span>{photo ? "Photo added — click to change" : "Click or drop a photo"}</span>
              <small>Stays on your device. Nothing is uploaded.</small>
            </label>
          </div>

          <div className="pass-field">
            <span className="pass-label">{"// Finish"}</span>
            <div className="pass-seg pass-seg--2" role="radiogroup" aria-label="Finish">
              {(Object.keys(themes) as ThemeKey[]).map((k) => (
                <button key={k} type="button" role="radio" aria-checked={theme === k} className={theme === k ? "is-on" : ""} onClick={() => setTheme(k)}>
                  {themes[k].label}
                </button>
              ))}
            </div>
            <div className="pass-actions">
              <button type="button" className="pass-shuffle" onClick={() => setPassId(newPassId())} aria-label="Generate a new pass ID" title="New pass ID">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="16 3 21 3 21 8" />
                  <line x1="4" y1="20" x2="21" y2="3" />
                  <polyline points="21 16 21 21 16 21" />
                  <line x1="15" y1="15" x2="21" y2="21" />
                  <line x1="4" y1="4" x2="9" y2="9" />
                </svg>
              </button>
              <button type="submit" className="pass-download">
                Download pass
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="pass-share">
          <p className="pass-share-title">
            Share it on <b>Instagram</b>, <b>LinkedIn</b> or anywhere — and tag <b>@hacksprint3.0</b> with <b>#HackSprint3</b>
          </p>
          <div className="pass-share-row">
            {canShareFile && (
              <button type="button" className="pass-share-btn pass-share-btn--primary" onClick={shareImage}>
                Share image
              </button>
            )}
            {shareLinks.map((l) => (
              <a key={l.label} className="pass-share-btn" href={l.href} target="_blank" rel="noreferrer">
                {l.label} ↗
              </a>
            ))}
            <button type="button" className="pass-share-btn" onClick={copyCaption}>
              {copied ? "Caption copied ✓" : "Copy caption"}
            </button>
          </div>
          <p className="pass-share-hint">Tip: download the pass, then post it with the copied caption. On your phone, “Share image” sends it straight to Instagram Stories or WhatsApp.</p>
        </div>
      </form>
    </div>
  );
}
