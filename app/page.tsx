"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import AboutPage from "./about/page";
import HighlightsPage from "./highlights/page";
import CrewPage from "./crew/page";
import PastEventsPage from "./past-events/page";
import WhySponsorUsPage from "./why-sponsor-us/page";

const registrationStart = new Date("2026-11-04T00:00:00+05:30").getTime();

function RegistrationTimer() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const updateTimer = () => setRemaining(Math.max(0, registrationStart - Date.now()));
    updateTimer();
    const interval = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (remaining === null) return null;
  if (remaining === 0) {
    return <p style={{ color: "#d4ff00", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>Registration is now open</p>;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const values = [
    [Math.floor(totalSeconds / 86400), "Days"],
    [Math.floor((totalSeconds % 86400) / 3600), "Hours"],
    [Math.floor((totalSeconds % 3600) / 60), "Minutes"],
    [totalSeconds % 60, "Seconds"],
  ];

  return (
    <div aria-label="Registration countdown" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "8px" }}>
      {values.map(([value, label]) => (
        <div key={label} style={{ minWidth: "68px", border: "1px solid #344800", borderRadius: "7px", background: "#111700", padding: "9px 8px", textAlign: "center" }}>
          <strong style={{ color: "#d4ff00", display: "block", fontFamily: "monospace", fontSize: "1.1rem", lineHeight: 1 }}>{String(value).padStart(2, "0")}</strong>
          <span style={{ color: "#71804f", display: "block", fontSize: "0.55rem", letterSpacing: "0.08em", marginTop: "6px", textTransform: "uppercase" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ background: "#0a0a0a" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="homepage-hero"
        style={{
          minHeight: "100vh",
          paddingTop: "68px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "68px 32px 0",
          gap: "0",
          position: "relative",
        }}
      >
        {/* Left panel */}
        <div className="homepage-hero-left" style={{ width: "100%", maxWidth: "360px", paddingTop: "60px", paddingBottom: "40px", position: "relative", zIndex: 1 }}>
          {/* small profile avatars */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
            {["#ff6b35", "#a855f7", "#06b6d4", "#f59e0b"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: c,
                  border: "2px solid #0a0a0a",
                  marginLeft: i === 0 ? "0" : "-10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {["A", "B", "C", "D"][i]}
              </div>
            ))}
            <span style={{ color: "#666", fontSize: "0.8rem", marginLeft: "8px" }}>500+ Participants</span>
          </div>

          <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "8px" }}>
            Organized by the Department of Computer Science &amp; Engineering, KAHE, in association with the Metaverse Students Association.
            <br />
            <strong style={{ color: "#d4ff00", display: "inline-block", fontSize: "0.95rem", letterSpacing: "0.04em", marginTop: "6px", textTransform: "uppercase" }}>
              India&apos;s Largest Student Hackathon 2027
            </strong>
          </p>

          <Link
            href="/highlights"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#d4ff00",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
              marginTop: "4px",
              borderBottom: "1px solid #d4ff0066",
              paddingBottom: "2px",
            }}
          >
            Explore All Tracks ↗
          </Link>

          <div style={{ display: "flex", flexDirection: "column", gap: "0", marginTop: "26px", maxWidth: "360px", padding: "4px 0 12px 8px" }}>
            <a
              href="https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                width: "270px",
                alignItems: "center",
                gap: "11px",
                border: "1px solid #73b8ff",
                borderRadius: "14px",
                background: "#bfe1ff",
                boxShadow: "0 5px 0 #5799d8",
                color: "#2764a0",
                fontSize: "0.95rem",
                fontWeight: 800,
                padding: "13px 18px",
                textDecoration: "none",
                transform: "rotate(-4deg)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "rotate(-4deg) translateY(-3px)";
                event.currentTarget.style.boxShadow = "0 8px 0 #5799d8";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "rotate(-4deg)";
                event.currentTarget.style.boxShadow = "0 5px 0 #5799d8";
              }}
            >
              <span aria-hidden="true" style={{ color: "#2764a0", fontSize: "1.4rem", lineHeight: 1 }}>◉</span>
              <span>Join WhatsApp Community ↗</span>
            </a>
            <a
              href="/brochure.pdf"
              download
              style={{
                display: "flex",
                width: "250px",
                alignItems: "center",
                gap: "11px",
                border: "1px solid #a0dc26",
                borderRadius: "14px",
                background: "#d9ff70",
                boxShadow: "0 5px 0 #8dbb28",
                color: "#49741c",
                fontSize: "0.95rem",
                fontWeight: 900,
                marginTop: "-2px",
                padding: "13px 18px",
                textDecoration: "none",
                transform: "rotate(3deg) translateX(22px)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "rotate(3deg) translateX(22px) translateY(-3px)";
                event.currentTarget.style.boxShadow = "0 8px 0 #8dbb28";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "rotate(3deg) translateX(22px)";
                event.currentTarget.style.boxShadow = "0 5px 0 #8dbb28";
              }}
            >
              <span aria-hidden="true" style={{ fontSize: "1.4rem", lineHeight: 1 }}>↓</span>
              <span>Download Brochure</span>
            </a>
          </div>
        </div>

        {/* Center hero headline — spans full width */}
        <div
          className="homepage-hero-title"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "100px",
            pointerEvents: "none",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#888", fontSize: "1rem", fontWeight: 400, marginBottom: "8px" }}>
            Create, Explore &amp; Compete
          </p>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.8rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: "600px",
            }}
          >
            The Ultimate<br />
            <span style={{ color: "#d4ff00" }}>Hackathon</span> Sprint
          </h1>

          <Image
            src="/logo.png"
            alt="Hacksprint 3.0"
            width={500}
            height={500}
            style={{
              width: "min(64vw, 420px)",
              height: "auto",
              marginTop: "16px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Right stats panel */}
        <div className="homepage-hero-stats" style={{ paddingTop: "100px", paddingBottom: "40px", textAlign: "right" }}>
          {[
            { value: "500+", label: "Active Hackers" },
            { value: "5+", label: "Challenge Tracks" },
            { value: "36h", label: "Sprint Duration" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                marginBottom: "28px",
                paddingBottom: "24px",
                borderBottom: i < 2 ? "1px solid #1a1a1a" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "2.8rem",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {s.value}
              </div>
              <div style={{ color: "#555", fontSize: "0.8rem", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="registration" style={{ background: "#111", borderTop: "1px solid #222", borderBottom: "1px solid #222", padding: "24px 32px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#d4ff00", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", marginBottom: "8px", textTransform: "uppercase" }}>
            Registration opens November 4, 2026 at 12:00 AM IST
          </p>
          <RegistrationTimer />
        </div>
      </section>

      {/* ── ANNOUNCEMENT MARQUEE ── */}
      <section style={{ overflow: "hidden", padding: "16px 32px", background: "#d4ff00", color: "#0a0a0a" }} aria-label="Announcements">
        <div style={{ minWidth: 0, overflow: "hidden", whiteSpace: "nowrap" }} role="region" aria-label="HackSprint announcements">
          <div style={{ display: "flex", width: "max-content", animation: "announcement-marquee 28s linear infinite" }}>
            {[0, 1].map((copy) => (
              <div style={{ display: "flex", alignItems: "center", gap: "18px", paddingRight: "18px", fontSize: "0.76rem", fontWeight: 700 }} key={copy} aria-hidden={copy === 1}>
                <span style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid #0a0a0a", borderRadius: "999px", padding: "4px 9px" }}>Announcement</span>
                <span>HackSprint 3.0 is live — registration is now open</span>
                <span style={{ fontSize: "0.85rem" }}>✦</span>
                <span>Build, compete, and win with the world&apos;s top hackers</span>
                <span style={{ fontSize: "0.85rem" }}>✦</span>
                <span>Supported by Ethereum, Solana, TypeScript, React, Next.js, and GitHub</span>
                <span style={{ fontSize: "0.85rem" }}>✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <AboutPage />
      </section>

      {/* ── TRENDING SECTION ── */}
      <section id="highlights">
        <HighlightsPage />
      </section>

      {/* ── CREW PREVIEW ── */}
      <section id="crew">
        <CrewPage />
      </section>

      {/* ── PAST EVENTS ── */}
      <section id="past-events">
        <PastEventsPage />
      </section>

      {/* ── WHY SPONSOR US ── */}
      <section id="why-sponsor-us">
        <WhySponsorUsPage />
      </section>

      {/* ── CTA BANNER ── */}
      <section
        id="contact"
        style={{
          background: "linear-gradient(135deg, #d4ff00 0%, #a8cc00 100%)",
          padding: "80px 32px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#0a0a0a", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>
          Season 3.0 — October 2026
        </p>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            color: "#0a0a0a",
            letterSpacing: "-0.03em",
            marginBottom: "24px",
          }}
        >
          Ready to Sprint Into History?
        </h2>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/contact"
            style={{
              padding: "14px 36px",
              background: "#0a0a0a",
              color: "#d4ff00",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Register Now →
          </Link>
          <Link
            href="/about"
            style={{
              padding: "14px 36px",
              background: "transparent",
              border: "2px solid #0a0a0a",
              color: "#0a0a0a",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Learn More
          </Link>
        </div>
      </section>

    </div>
  );
}
