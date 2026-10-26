"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import AboutPage from "./about/page";
import HighlightsPage from "./highlights/page";
import TimelinePage from "./timeline/page";
import CrewPage from "./crew/page";
import PastEventsPage from "./past-events/page";
import WhySponsorUsPage from "./why-sponsor-us/page";
import SponsorsPage from "./sponsors/page";
import PartnerBar from "@/components/PartnerBar";

const hackathonDate = new Date("2026-11-08T09:00:00+05:30").getTime();

function DevfolioApplyButton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`apply-button devfolio-apply-button ${className}`.trim()}
      data-hackathon-slug="hacksprint3"
      data-button-theme="light"
      style={{ height: "44px", width: "312px" }}
    />
  );
}

function HeroCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, hackathonDate - Date.now()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (remaining === null) {
    return (
      <div
        className="homepage-countdown"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(8px, 1.8vw, 16px)",
          flexWrap: "nowrap",
        }}
      >
        {["DAYS", "HRS", "MINS", "SECS"].map((label) => (
          <div
            key={label}
            style={{
              background: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              minWidth: "clamp(68px, 11vw, 115px)",
              padding: "clamp(10px, 1.6vw, 16px) clamp(12px, 2vw, 20px) 10px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
                fontWeight: 900,
                lineHeight: 0.95,
                color: "#0d0d0d",
              }}
            >
              00
            </div>
            <div
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(0.58rem, 1vw, 0.68rem)",
                fontWeight: 800,
                letterSpacing: "0.2em",
                color: "#4a4a4a",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const units = [
    { val: Math.floor(totalSeconds / 86400),          label: "DAYS" },
    { val: Math.floor((totalSeconds % 86400) / 3600), label: "HRS"  },
    { val: Math.floor((totalSeconds % 3600) / 60),    label: "MINS" },
    { val: totalSeconds % 60,                         label: "SECS" },
  ];

  return (
    <div
      className="homepage-countdown"
      aria-label="Event countdown"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(8px, 1.8vw, 16px)",
        flexWrap: "nowrap",
      }}
    >
      {units.map(({ val, label }) => (
        <div
          key={label}
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            minWidth: "clamp(68px, 11vw, 115px)",
            padding: "clamp(10px, 1.6vw, 16px) clamp(12px, 2vw, 20px) 10px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.04)",
          }}
        >
          {/* Subtle horizontal flip-slit line across center */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "47%",
              left: 0,
              right: 0,
              height: "1px",
              background: "rgba(0, 0, 0, 0.12)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
              fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
              fontWeight: 900,
              lineHeight: 0.95,
              color: "#0d0d0d",
              letterSpacing: "-0.01em",
              position: "relative",
            }}
          >
            {String(val).padStart(2, "0")}
          </div>
          <div
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(0.58rem, 1vw, 0.68rem)",
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: "#4a4a4a",
              textTransform: "uppercase",
              marginTop: "4px",
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [showBrochure, setShowBrochure] = useState(false);

  return (
    <div style={{ background: "#070506" }}>

      {/* ══ HERO SECTION — EXACT REFERENCE STYLE ═════════════════════════ */}
      <section
        id="home"
        className="homepage-hero-red-black"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: "100px",
          paddingBottom: "56px",
          background: "radial-gradient(circle at 50% 15%, #351116 0%, #12090b 42%, #070506 100%)",
        }}
      >
        <PartnerBar />

        {/* Subtle background grain / paper texture */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
            backgroundSize: "160px 160px",
          }}
        />

        {/* ── STICKER 1: Pastel Blue Star on Left ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "22%",
            left: "6%",
            zIndex: 2,
            filter: "drop-shadow(3px 3px 0px #000000)",
            pointerEvents: "none",
          }}
        >
          <svg width="78" height="78" viewBox="0 0 100 100" style={{ transform: "rotate(-6deg)" }}>
            <polygon
              points="50,2 62,36 98,39 68,64 78,98 50,76 22,98 32,64 2,39 38,36"
              fill="#8ED2F5"
              stroke="#000000"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ── STICKER 2: Location Tag Pin on Left ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "43%",
            left: "5%",
            zIndex: 3,
            background: "#D8C5FB",
            border: "2px solid #000000",
            borderRadius: "999px",
            padding: "5px 14px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            transform: "rotate(-4deg)",
            boxShadow: "3px 3px 0px #000000",
          }}
        >
          <span style={{ fontSize: "0.85rem" }}>📍</span>
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            KAHE, COIMBATORE
          </span>
        </div>

        {/* ── STICKER 3: Date Banner Ribbon on Left ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "52%",
            left: "3%",
            zIndex: 3,
            background: "#FCA892",
            border: "2px solid #000000",
            padding: "8px 24px",
            transform: "rotate(-10deg)",
            boxShadow: "3.5px 3.5px 0px #000000",
            clipPath: "polygon(0 0, 100% 0, 94% 50%, 100% 100%, 0 100%, 6% 50%)",
          }}
        >
          <span
            style={{
              fontFamily: "'Anton', 'Archivo Black', 'Oswald', sans-serif",
              fontSize: "clamp(0.95rem, 1.6vw, 1.25rem)",
              fontWeight: 900,
              letterSpacing: "0.06em",
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            NOV 8 – DEC 28, 2026
          </span>
        </div>

        {/* ── STICKER 4: Blue Tape on Top-Right (Organizers) ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "14%",
            right: "10%",
            zIndex: 3,
            background: "#82CDF4",
            border: "2px solid #000000",
            borderRadius: "4px",
            padding: "6px 14px",
            transform: "rotate(4deg)",
            boxShadow: "3px 3px 0px #000000",
          }}
        >
          <span
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(0.68rem, 1.2vw, 0.78rem)",
              fontWeight: 800,
              letterSpacing: "0.14em",
              color: "#000000",
              textTransform: "uppercase",
            }}
          >
            DEPT OF CSE &amp; METAVERSE
          </span>
        </div>

        {/* ── STICKER 5: Pink Scalloped Rosette Circular Badge on Right ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "26%",
            right: "6%",
            zIndex: 3,
            width: "96px",
            height: "96px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "drop-shadow(3.5px 3.5px 0px #000000)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "hero-spin 14s linear infinite",
            }}
          >
            <svg viewBox="0 0 100 100" width="96" height="96">
              {/* 16-lobed scalloped outer rosette shape */}
              <path
                d="M92.0,50.0 A5.5,5.5 0 0,1 88.8,66.1 A5.5,5.5 0 0,1 79.7,79.7 A5.5,5.5 0 0,1 66.1,88.8 A5.5,5.5 0 0,1 50.0,92.0 A5.5,5.5 0 0,1 33.9,88.8 A5.5,5.5 0 0,1 20.3,79.7 A5.5,5.5 0 0,1 11.2,66.1 A5.5,5.5 0 0,1 8.0,50.0 A5.5,5.5 0 0,1 11.2,33.9 A5.5,5.5 0 0,1 20.3,20.3 A5.5,5.5 0 0,1 33.9,11.2 A5.5,5.5 0 0,1 50.0,8.0 A5.5,5.5 0 0,1 66.1,11.2 A5.5,5.5 0 0,1 79.7,20.3 A5.5,5.5 0 0,1 88.8,33.9 A5.5,5.5 0 0,1 92.0,50.0 Z"
                fill="#F2A8CD"
                stroke="#000000"
                strokeWidth="2.2"
              />
              <defs>
                <path id="scallop-text-path" d="M 50,50 m -29,0 a 29,29 0 1,1 58,0 a 29,29 0 1,1 -58,0" />
              </defs>
              <text fontSize="5.6" fontFamily="'Oswald', sans-serif" fontWeight="800" fill="#000000" letterSpacing="1.2">
                <textPath href="#scallop-text-path">
                  DEPT OF CSE &amp; METAVERSE · KAHE · HACKSPRINT ·
                </textPath>
              </text>
              {/* Inner dark center circle */}
              <circle cx="50" cy="50" r="14" fill="#141416" />
            </svg>
            <span
              style={{
                position: "absolute",
                color: "#ffffff",
                fontSize: "1.15rem",
                fontWeight: 900,
                lineHeight: 1,
                animation: "hero-counter-spin 14s linear infinite",
              }}
            >
              ↓
            </span>
          </div>
        </div>

        {/* ── STICKER 6: Bottom Right Delicate Star Doodle ── */}
        <svg
          aria-hidden="true"
          width="48"
          height="48"
          viewBox="0 0 50 50"
          style={{
            position: "absolute",
            bottom: "3%",
            right: "5%",
            zIndex: 1,
            opacity: 0.75,
            pointerEvents: "none",
          }}
        >
          <path
            d="M 25,2 L 27,21 L 46,25 L 27,29 L 25,48 L 23,29 L 4,25 L 23,21 Z"
            fill="none"
            stroke="#a38500"
            strokeWidth="1.8"
          />
        </svg>

        {/* ══ CENTER HERO CONTENT ══════════════════════════════════════════ */}
        <div
          className="homepage-hero-content"
          style={{
            position: "relative",
            zIndex: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 20px",
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          {/* 🏛️ PROMINENT ORGANIZER TOP BANNER */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "transparent",
              border: "0",
              borderRadius: "0",
              padding: "0",
              boxShadow: "none",
              marginBottom: "20px",
              maxWidth: "94vw",
            }}
          >
            <span style={{ fontSize: "1rem" }}>🏛️</span>
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(0.68rem, 1.25vw, 0.85rem)",
                fontWeight: 800,
                letterSpacing: "0.1em",
                color: "#ffffff",
                textTransform: "uppercase",
              }}
            >
              ORGANIZED BY THE DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING AND METAVERSE
            </span>
          </div>

          <p
            style={{
              margin: "0 0 16px",
              color: "#ffffff",
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            INDIA&apos;S BIGGEST &amp; LARGEST STUDENT HACKATHON 2027
          </p>

          {/* ══ GIANT HEADLINE (EXACT STYLE AND CADENCE OF REFERENCE) ════ */}
          <h1
            style={{
              fontFamily: "'Anton', 'Archivo Black', 'Bebas Neue', 'Oswald', sans-serif",
              fontSize: "clamp(3.3rem, 9.4vw, 8.8rem)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.015em",
              color: "#ffffff",
              textTransform: "uppercase",
              margin: "0",
              userSelect: "none",
            }}
          >
            <div style={{ display: "block" }}>THE ULTIMATE</div>
            <div style={{ display: "block", color: "#e53935" }}>HACKATHON SPRINT</div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "18px",
              }}
            >
              <Image
                src="/3.0.png"
                alt="HACKSPRINT 3.0"
                width={150}
                height={56}
                style={{
                  width: "clamp(92px, 14vw, 150px)",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "999px",
                  transform: "translateY(-4px)",
                  boxShadow: "2.5px 2.5px 0px rgba(0,0,0,0.25)",
                }}
              />
            </div>
          </h1>

          {/* ══ 3 ACTION BUTTONS: BROCHURE, JOIN WHATSAPP, REGISTER ═══════ */}
          <div
            className="homepage-hero-actions"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(8px, 1.5vw, 14px)",
              flexWrap: "wrap",
              marginTop: "26px",
              marginBottom: "36px",
            }}
          >
            {/* 1. BROCHURE BUTTON */}
            <a
              href="/pdf/HS3_Brochure.pdf"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#ffffff",
                border: "2px solid #000000",
                borderRadius: "999px",
                padding: "5px 5px 5px 20px",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
                boxShadow: "3px 3px 0px #000000",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-1px, -1px)";
                e.currentTarget.style.boxShadow = "4.5px 4.5px 0px #000000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "3px 3px 0px #000000";
              }}
            >
              <span
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  color: "#000000",
                  textTransform: "uppercase",
                }}
              >
                BROCHURE
              </span>
              <span
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "6px",
                  background: "#82CDF4",
                  border: "1.5px solid #000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </span>
            </a>

            {/* 2. JOIN WHATSAPP BUTTON */}
            <a
              href="https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#ffffff",
                border: "2px solid #000000",
                borderRadius: "999px",
                padding: "5px 5px 5px 20px",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                boxShadow: "3px 3px 0px #000000",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-1px, -1px)";
                e.currentTarget.style.boxShadow = "4.5px 4.5px 0px #000000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "3px 3px 0px #000000";
              }}
            >
              <span
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  color: "#000000",
                  textTransform: "uppercase",
                }}
              >
                JOIN WHATSAPP
              </span>
              <span
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "6px",
                  background: "#25D366",
                  border: "1.5px solid #000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2M12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.24 3.68 16.31 4.54 17.86 6.09C19.41 7.64 20.27 9.71 20.27 11.91C20.27 16.46 18.57 20.15 12.04 20.15M16.56 14.39C16.31 14.26 15.09 13.66 14.86 13.58C14.64 13.49 14.47 13.45 14.31 13.7C14.14 13.95 13.66 14.52 13.51 14.68C13.37 14.85 13.22 14.87 12.97 14.75C12.72 14.62 11.92 14.36 10.97 13.51C10.23 12.85 9.73 12.04 9.58 11.79C9.44 11.54 9.56 11.4 9.69 11.28C9.8 11.17 9.94 10.99 10.06 10.84C10.19 10.7 10.23 10.59 10.31 10.43C10.39 10.26 10.35 10.12 10.29 9.99C10.23 9.87 9.73 8.65 9.53 8.14C9.33 7.65 9.12 7.71 8.97 7.71C8.82 7.7 8.66 7.7 8.49 7.7C8.32 7.7 8.05 7.76 7.82 8.01C7.6 8.26 6.96 8.85 6.96 10.07C6.96 11.29 7.85 12.46 7.97 12.63C8.1 12.79 9.71 15.28 12.19 16.35C12.78 16.61 13.24 16.76 13.6 16.87C14.19 17.06 14.73 17.03 15.16 16.97C15.64 16.9 16.63 16.37 16.84 15.78C17.05 15.19 17.05 14.69 16.99 14.58C16.92 14.48 16.79 14.43 16.56 14.31" />
                </svg>
              </span>
            </a>

            {/* 3. APPLY WITH DEVFOLIO */}
            <DevfolioApplyButton />
          </div>

          {/* ══ EXACT COUNTDOWN TIMER (FROM REFERENCE IMAGE) ══════════════ */}
          <HeroCountdown />
          <p
            style={{
              marginTop: "14px",
              color: "#ff7777",
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(0.62rem, 1.2vw, 0.78rem)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Registration starts November 8, 2026
          </p>
        </div>
      </section>

      {/* ══ INTERACTIVE BROCHURE MODAL ═══════════════════════════════════ */}
      {showBrochure && (
        <div
          role="dialog"
          aria-modal="true"
          className="brochure-modal"
          onClick={() => setShowBrochure(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.78)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#ffffff",
              border: "3px solid #000000",
              borderRadius: "16px",
              boxShadow: "8px 8px 0px #000000",
              maxWidth: "620px",
              width: "100%",
              maxHeight: "88vh",
              overflowY: "auto",
              padding: "28px",
              position: "relative",
              color: "#111111",
            }}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setShowBrochure(false)}
              aria-label="Close brochure modal"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "#F2A8CD",
                border: "2px solid #000000",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                fontSize: "1.1rem",
                fontWeight: 900,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "2px 2px 0px #000000",
              }}
            >
              ✕
            </button>

            {/* Header Badge */}
            <div
              style={{
                display: "inline-block",
                background: "#82CDF4",
                border: "1.5px solid #000000",
                padding: "4px 12px",
                borderRadius: "4px",
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                marginBottom: "12px",
              }}
            >
              OFFICIAL EVENT BROCHURE
            </div>

            <h2
              style={{
                fontFamily: "'Anton', 'Archivo Black', 'Oswald', sans-serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                lineHeight: 1.05,
                margin: "0 0 6px",
                color: "#000000",
                textTransform: "uppercase",
              }}
            >
              THE ULTIMATE HACKATHON SPRINT 3.0
            </h2>
            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 800,
                letterSpacing: "0.06em",
                color: "#e51b24",
                marginBottom: "18px",
                textTransform: "uppercase",
              }}
            >
              ORGANIZED BY DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING AND METAVERSE
            </p>

            <div style={{ borderTop: "2px dashed #000000", borderBottom: "2px dashed #000000", padding: "16px 0", margin: "16px 0" }}>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "#333333", margin: "0 0 16px" }}>
                HackSprint 3.0 is a 36-hour national-level hackathon bringing together over 500+ top student developers, designers, and innovators to solve real-world problems and push technical boundaries.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "10px" }}>
                {[
                  { label: "DURATION", val: "36 Hours Live" },
                  { label: "PRIZE POOL", val: "₹1,50,000+" },
                  { label: "VENUE", val: "KAHE, Coimbatore" },
                  { label: "DATE", val: "Nov 8 – Dec 28, 2026" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "#F7DC4E",
                      border: "1.5px solid #000000",
                      borderRadius: "8px",
                      padding: "10px",
                      boxShadow: "2px 2px 0px #000000",
                    }}
                  >
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.12em", color: "#555" }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: "'Anton', 'Oswald', sans-serif", fontSize: "0.95rem", fontWeight: 800, color: "#000" }}>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "16px" }}>
                <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                  CORE TRACKS:
                </p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {["AI & Machine Learning", "Web3 & Blockchain", "FinTech & Open Banking", "IoT & Smart Hardware", "Open Innovation"].map((track) => (
                    <span
                      key={track}
                      style={{
                        background: "#f0f0f0",
                        border: "1px solid #000",
                        borderRadius: "999px",
                        padding: "3px 10px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {track}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "20px" }}>
              <DevfolioApplyButton />
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  padding: "12px 22px",
                  background: "#82CDF4",
                  color: "#000000",
                  border: "2px solid #000000",
                  borderRadius: "999px",
                  fontFamily: "'Oswald', sans-serif",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  boxShadow: "3px 3px 0px #000000",
                }}
              >
                PRINT / SAVE 🖨️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── HIGH CONTRAST ANNOUNCEMENT MARQUEE ── */}
      <section
        style={{
          overflow: "hidden",
          padding: "13px 0",
          background: "#000000",
          borderTop: "3px solid #000000",
          borderBottom: "1px solid #1a1a1a",
          color: "#F7DC4E",
        }}
        aria-label="Announcements"
      >
        <div style={{ minWidth: 0, overflow: "hidden", whiteSpace: "nowrap" }}>
          <div style={{ display: "flex", width: "max-content", animation: "announcement-marquee 28s linear infinite" }}>
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  paddingRight: "20px",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "'Oswald',sans-serif",
                }}
              >
                <span style={{ color: "#ffffff" }}>⚡ THE ULTIMATE HACKATHON SPRINT 3.0</span>
                <span style={{ opacity: 0.5, color: "#82CDF4" }}>◆</span>
                <span style={{ color: "#F7DC4E" }}>ORGANIZED BY DEPT OF COMPUTER SCIENCE &amp; ENGINEERING &amp; METAVERSE</span>
                <span style={{ opacity: 0.5, color: "#82CDF4" }}>◆</span>
                <span style={{ color: "#ffffff" }}>36 HOURS · NOV 8 – DEC 28, 2026 · KAHE COIMBATORE</span>
                <span style={{ opacity: 0.5, color: "#82CDF4" }}>◆</span>
                <span style={{ color: "#F2A8CD" }}>BUILD · COMPETE · WIN</span>
                <span style={{ opacity: 0.5, color: "#82CDF4" }}>◆</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <AboutPage />
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section id="highlights">
        <HighlightsPage />
      </section>

      {/* ── TIMELINE ── */}
      <section id="timeline" style={{ borderTop: "1px solid #1f1416", scrollMarginTop: "80px" }}>
        <TimelinePage />
      </section>

      {/* ── OUR SPONSORS ── */}
      <section id="our-sponsors" style={{ scrollMarginTop: "80px" }}>
        <SponsorsPage />
      </section>

      {/* ── CREW ── */}
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
          background: "radial-gradient(ellipse at 50% 50%, rgba(138,12,16,0.4) 0%, #0c090a 80%)",
          padding: "80px 32px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#E53935", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>
          Season 3.0 — November 8 to December 28, 2026
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#F5F5F5", letterSpacing: "-0.03em", marginBottom: "24px" }}>
          Ready to Sprint Into History?
        </h2>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <DevfolioApplyButton />
          <Link
            href="#about"
            style={{ padding: "14px 36px", background: "transparent", border: "1px solid #292929", color: "#F5F5F5", borderRadius: "100px", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}
          >
            Learn More
          </Link>
        </div>
      </section>

    </div>
  );
}
