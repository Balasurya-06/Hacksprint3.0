"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const registrationStart = new Date("2026-11-04T00:00:00+05:30").getTime();

export default function EntryLoader() {
  const [open, setOpen] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 450);
    const update = () => setRemaining(Math.max(0, registrationStart - Date.now()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => { window.clearTimeout(timer); window.clearInterval(interval); };
  }, []);

  if (!open || remaining === null) return null;

  const s = Math.floor(remaining / 1000);
  const units = [
    [Math.floor(s / 86400), "DAYS"],
    [Math.floor((s % 86400) / 3600), "HOURS"],
    [Math.floor((s % 3600) / 60), "MINS"],
    [s % 60, "SECS"],
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-popup-title"
      className="entry-loader"
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        display: "grid", placeItems: "center",
        background: "rgba(5,5,5,0.9)",
        padding: "24px",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="entry-loader-card"
        style={{
          position: "relative",
          width: "min(100%, 520px)",
          overflow: "hidden",
          border: "1px solid var(--border-grey)",
          borderRadius: "4px",
          background: "var(--charcoal)",
          boxShadow: "0 25px 90px rgba(0,0,0,0.95), 0 0 50px rgba(229,27,36,0.2)",
          padding: "36px 32px 30px",
          textAlign: "center",
        }}
      >
        {/* top red accent */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, var(--primary-red), var(--deep-red))" }} />

        {/* close */}
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          style={{
            position: "absolute", top: 14, right: 16,
            border: 0, background: "transparent",
            color: "var(--muted-text)", cursor: "pointer",
            fontSize: "1.3rem", lineHeight: 1,
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--bright-red)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted-text)")}
        >✕</button>

        {/* logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <Image
            src="/3.0.png"
            alt="HACKSPRINT 3.0"
            width={72}
            height={72}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* kicker */}
        <p style={{
          color: "#E53935", fontSize: "0.68rem", fontWeight: 800,
          letterSpacing: "0.16em", marginBottom: 10,
          textTransform: "uppercase", fontFamily: "'Oswald',sans-serif",
        }}>
          OFFICIAL DISPATCH · COIMBATORE 2026
        </p>

        {/* title */}
        <h2 id="entry-popup-title" style={{
          fontFamily: "'Bebas Neue','Oswald',sans-serif",
          fontSize: "clamp(2rem,5vw,2.8rem)",
          letterSpacing: "0.05em",
          color: "#F5F5F5", lineHeight: 1.05, margin: "0 0 10px",
        }}>
          HACKSPRINT <span style={{ color: "#E53935" }}>III</span>
        </h2>

        {/* divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: "#E53935", margin: "0 auto 16px" }}>
          <div style={{ width: 36, height: 1, background: "#E53935" }} />
          <span style={{ fontSize: "0.9rem" }}>★</span>
          <div style={{ width: 36, height: 1, background: "#E53935" }} />
        </div>

        <p style={{ color: "#B3B3B3", fontSize: "0.88rem", lineHeight: 1.6, maxWidth: 400, margin: "0 auto 24px" }}>
          Registration opens <strong style={{ color: "#F5F5F5" }}>November 4, 2026 at 12:00 AM IST</strong>. Prepare your squad.
        </p>

        {/* countdown */}
        {remaining === 0 ? (
          <p style={{ color: "#E53935", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Oswald',sans-serif" }}>
            REGISTRATION IS NOW LIVE
          </p>
        ) : (
          <div className="entry-loader-timer" style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {units.map(([val, lbl]) => (
              <div key={lbl} style={{
                minWidth: 72, border: "1px solid #292929",
                background: "#120d0f", padding: "10px 8px", textAlign: "center",
              }}>
                <strong style={{
                  color: "#F5F5F5", display: "block",
                  fontFamily: "'Bebas Neue','Oswald',sans-serif",
                  fontSize: "1.9rem", lineHeight: 1,
                  textShadow: "0 0 10px rgba(229,27,36,0.4)",
                }}>
                  {String(val).padStart(2, "0")}
                </strong>
                <span style={{
                  color: "#E53935", display: "block",
                  fontSize: "0.58rem", fontFamily: "'Oswald',sans-serif",
                  letterSpacing: "0.12em", marginTop: 4, fontWeight: 700,
                }}>
                  {lbl}
                </span>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen(false)}
          style={{
            marginTop: 24, border: "1px solid #292929",
            background: "transparent", color: "#777777",
            cursor: "pointer", fontSize: "0.76rem",
            fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", padding: "10px 24px",
            fontFamily: "'Oswald',sans-serif",
            transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.color = "#F5F5F5";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#E53935";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.color = "#777777";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#292929";
          }}
        >
          ENTER THE ARENA &gt;
        </button>
      </div>
    </div>
  );
}
