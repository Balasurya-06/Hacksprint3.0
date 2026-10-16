"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const registrationStart = new Date("2026-11-04T00:00:00+05:30").getTime();

export default function EntryLoader() {
  const [open, setOpen] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 450);
    const updateTimer = () => setRemaining(Math.max(0, registrationStart - Date.now()));
    updateTimer();
    const interval = window.setInterval(updateTimer, 1000);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, []);

  if (!open || remaining === null) {
    return null;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const values = [
    [Math.floor(totalSeconds / 86400), "Days"],
    [Math.floor((totalSeconds % 86400) / 3600), "Hours"],
    [Math.floor((totalSeconds % 3600) / 60), "Minutes"],
    [totalSeconds % 60, "Seconds"],
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-popup-title"
      className="entry-loader"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "grid",
        placeItems: "center",
        background: "#000000aa",
        padding: "24px",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="entry-loader-card"
        style={{
          position: "relative",
          width: "min(100%, 520px)",
          overflow: "hidden",
          border: "1px solid #d4ff00",
          borderRadius: "18px",
          background: "#101010",
          boxShadow: "0 24px 80px #000",
          padding: "34px 28px 28px",
          textAlign: "center",
        }}
      >
        <button
          type="button"
          aria-label="Close registration popup"
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            top: "14px",
            right: "16px",
            border: 0,
            background: "transparent",
            color: "#777",
            cursor: "pointer",
            fontSize: "1.4rem",
            lineHeight: 1,
          }}
        >
          ×
        </button>
        <Image
          src="/logo.png"
          alt="HACKSPRINT 3.0"
          width={110}
          height={110}
          style={{ width: "110px", height: "110px", objectFit: "contain", margin: "0 auto 12px" }}
        />
        <p style={{ color: "#d4ff00", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.16em", marginBottom: "12px", textTransform: "uppercase" }}>
          HackSprint 3.0
        </p>
        <h2 id="registration-popup-title" style={{ color: "#fff", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", letterSpacing: "-0.05em", margin: 0 }}>
          Registration opens soon
        </h2>
        <p style={{ color: "#888", fontSize: "0.85rem", lineHeight: 1.6, margin: "12px auto 22px", maxWidth: "380px" }}>
          Registration opens on November 4, 2026 at 12:00 AM IST.
        </p>
        {remaining === 0 ? (
          <p style={{ color: "#d4ff00", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Registration is now open
          </p>
        ) : (
          <div className="entry-loader-timer" style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            {values.map(([value, label]) => (
              <div key={label} style={{ minWidth: "68px", border: "1px solid #344800", borderRadius: "8px", background: "#151c00", padding: "10px 6px" }}>
                <strong style={{ color: "#d4ff00", display: "block", fontFamily: "monospace", fontSize: "1.15rem" }}>{String(value).padStart(2, "0")}</strong>
                <span style={{ color: "#71804f", display: "block", fontSize: "0.52rem", letterSpacing: "0.08em", marginTop: "5px", textTransform: "uppercase" }}>{label}</span>
              </div>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={{ marginTop: "24px", border: "1px solid #333", borderRadius: "999px", background: "transparent", color: "#aaa", cursor: "pointer", fontSize: "0.76rem", fontWeight: 700, padding: "10px 20px" }}
        >
          Continue to website
        </button>
      </div>
    </div>
  );
}