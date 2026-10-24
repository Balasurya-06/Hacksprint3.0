"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const registrationStart = new Date("2026-11-04T00:00:00+05:30").getTime();

export default function EntryLoader() {
  const [open, setOpen] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 400);
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
    [Math.floor(totalSeconds / 86400), "DAYS"],
    [Math.floor((totalSeconds % 86400) / 3600), "HOURS"],
    [Math.floor((totalSeconds % 3600) / 60), "MINUTES"],
    [totalSeconds % 60, "SECONDS"],
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-popup-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "grid",
        placeItems: "center",
        background: "rgba(5, 4, 4, 0.88)",
        padding: "24px",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(100%, 540px)",
          background: "#0e0b0c",
          border: "2px solid #3d1b1f",
          boxShadow: "0 25px 90px rgba(0, 0, 0, 0.95), 0 0 50px rgba(229, 27, 36, 0.2)",
          padding: "36px 32px 30px",
          textAlign: "center",
        }}
      >
        {/* Close Button */}
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
            color: "#8a8276",
            cursor: "pointer",
            fontSize: "1.3rem",
            lineHeight: 1,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e51b24")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8276")}
        >
          ✕
        </button>

        <p className="rdr-kicker" style={{ marginBottom: "8px" }}>
          OFFICIAL DISPATCH · COIMBATORE 2026
        </p>

        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
          <Image
            src="/hack.png"
            alt="HackSprint 3.0"
            width={72}
            height={72}
            style={{ objectFit: "contain" }}
          />
        </div>

        <h2
          id="registration-popup-title"
          style={{
            fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
            letterSpacing: "0.05em",
            color: "#f5f1ea",
            lineHeight: 1.05,
            margin: "0 0 10px",
          }}
        >
          HACKSPRINT <span style={{ color: "#e51b24" }}>III</span>
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            color: "#e51b24",
            margin: "0 auto 16px",
          }}
        >
          <div style={{ width: "36px", height: "1px", background: "#e51b24" }} />
          <span style={{ fontSize: "0.9rem" }}>★</span>
          <div style={{ width: "36px", height: "1px", background: "#e51b24" }} />
        </div>

        <p
          style={{
            color: "#a39d93",
            fontSize: "0.88rem",
            lineHeight: 1.6,
            maxWidth: "420px",
            margin: "0 auto 24px",
          }}
        >
          The outlaw arena calls. Registration for India&apos;s largest student hackathon commences on{" "}
          <strong style={{ color: "#f5f1ea" }}>November 4, 2026 at 12:00 AM IST</strong>.
        </p>

        {remaining === 0 ? (
          <p style={{ color: "#e51b24", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            REGISTRATION IS NOW LIVE
          </p>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            {values.map(([value, label]) => (
              <div
                key={label}
                style={{
                  minWidth: "72px",
                  border: "1px solid #361c20",
                  background: "#161012",
                  padding: "10px 8px",
                  textAlign: "center",
                }}
              >
                <strong
                  style={{
                    color: "#f5f1ea",
                    display: "block",
                    fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                    fontSize: "1.8rem",
                    lineHeight: 1,
                    textShadow: "0 0 10px rgba(229, 27, 36, 0.4)",
                  }}
                >
                  {String(value).padStart(2, "0")}
                </strong>
                <span
                  style={{
                    color: "#e51b24",
                    display: "block",
                    fontSize: "0.58rem",
                    fontFamily: "'Oswald', sans-serif",
                    letterSpacing: "0.12em",
                    marginTop: "4px",
                    fontWeight: 700,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "28px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rdr-btn-red"
            style={{ fontSize: "0.82rem", padding: "10px 22px" }}
          >
            ENTER THE ARENA &gt;
          </button>
          <a
            href="https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K"
            target="_blank"
            rel="noreferrer"
            className="rdr-btn-ghost"
            style={{ fontSize: "0.82rem", padding: "10px 20px" }}
          >
            JOIN POSSE ↗
          </a>
        </div>
      </div>
    </div>
  );
}