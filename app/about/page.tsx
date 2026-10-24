"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface AboutPageProps {
  isEmbedded?: boolean;
}

export default function AboutPage({ isEmbedded = false }: AboutPageProps) {
  const [activeTab, setActiveTab] = useState<"about" | "metaverse">("about");

  return (
    <div
      style={{
        background: "#050404",
        color: "#f5f1ea",
        borderBottom: "1px solid #1f1416",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── MAIN TWO-COLUMN LAYOUT ── */}
      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          alignItems: "center",
          gap: "60px 40px",
          padding: "90px 24px 80px",
        }}
      >
        {/* ── LEFT COLUMN — tabs + content ── */}
        <div>
          {/* Tab strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                color: "#e51b24",
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.86rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              THE STORY
            </span>
            <span style={{ color: "#381a1e" }}>·</span>

            {(["about", "metaverse"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? "#e51b24" : "rgba(20,12,14,0.7)",
                  color: activeTab === tab ? "#ffffff" : "#a8a299",
                  border: `1px solid ${activeTab === tab ? "#e51b24" : "#381a1e"}`,
                  padding: "5px 15px",
                  borderRadius: "3px",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: activeTab === tab ? "0 0 14px rgba(229,27,36,0.4)" : "none",
                }}
              >
                {tab === "about" ? "ABOUT US (KAHE CSE)" : "ABOUT METAVERSE"}
              </button>
            ))}
          </div>

          {/* Massive title */}
          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
              fontSize: "clamp(3.5rem, 7.5vw, 6.2rem)",
              lineHeight: 0.92,
              letterSpacing: "0.04em",
              color: "#f5f1ea",
              textTransform: "uppercase",
              margin: "0 0 24px",
              textShadow: "0 6px 20px rgba(0,0,0,0.8)",
            }}
          >
            {activeTab === "about" ? (
              <>
                LOYALTY.
                <br />
                HONOR.
                <br />
                REDEMPTION.
              </>
            ) : (
              <>
                INNOVATE.
                <br />
                DISRUPT.
                <br />
                BUILD TOGETHER.
              </>
            )}
          </h2>

          {/* Red star separator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#e51b24",
              marginBottom: "20px",
            }}
          >
            <span style={{ fontSize: "1.1rem", textShadow: "0 0 10px #e51b24" }}>★</span>
            <div style={{ width: "90px", height: "1.5px", background: "#e51b24", opacity: 0.8 }} />
          </div>

          {/* Body paragraph */}
          <p
            style={{
              color: "#b0a99e",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              marginBottom: "36px",
              maxWidth: "580px",
            }}
          >
            {activeTab === "about" ? (
              <>
                Organized by the Department of Computer Science &amp; Engineering, Karpagam Academy
                of Higher Education (KAHE), Coimbatore. A NAAC A+ accredited vanguard institution
                empowering 500+ student innovators with state-of-the-art supercomputing laboratories
                and gigabit fiber infrastructure. Across 36 grueling hours, elite coders from across
                the nation converge on Coimbatore to prototype, debug, and pitch their breakthroughs
                to claim the outlaw crown.
              </>
            ) : (
              <>
                The Metaverse Students Association is the flagship student community under the
                Department of Computer Science &amp; Engineering, KAHE. Founded by outlaws of code to
                push technical frontiers beyond conventional academic boundaries, our guild drives
                high-stakes hackathons, open-source cohorts, and deep-tech innovation. We don&apos;t
                predict the future — we assemble in the arena and build it together.
              </>
            )}
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
            {activeTab === "about" ? (
              <a href="#highlights" className="rdr-btn-red">
                <span>EXPLORE THE STORY</span>
                <span style={{ fontSize: "1.1rem" }}>&gt;</span>
              </a>
            ) : (
              <a
                href="https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K"
                target="_blank"
                rel="noreferrer"
                className="rdr-btn-red"
              >
                <span>JOIN COMMUNITY</span>
                <span style={{ fontSize: "1.1rem" }}>▶</span>
              </a>
            )}
            <Link href="/#crew" className="rdr-btn-ghost">
              <span>MEET THE CREW</span>
              <span style={{ color: "#e51b24" }}>&gt;</span>
            </Link>
          </div>
        </div>

        {/* ── RIGHT COLUMN — Arthur Morgan key art ── */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              position: "relative",
              width: "min(520px, 100%)",
              aspectRatio: "1 / 1",
              border: "2px solid #3d1b1f",
              boxShadow: "0 20px 60px rgba(0,0,0,0.9), 0 0 45px rgba(229,27,36,0.25)",
              overflow: "hidden",
            }}
          >
            <Image
              src="/rdr/story_arthur.jpg"
              alt="Arthur Morgan Outlaw Key Art"
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              style={{ objectFit: "cover" }}
              priority
            />
            {/* Vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                boxShadow: "inset 0 0 60px rgba(0,0,0,0.85)",
              }}
            />
            {/* Tag */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                right: "16px",
                background: "rgba(10,6,7,0.88)",
                border: "1px solid #3d1b1f",
                padding: "6px 14px",
                color: "#f5f1ea",
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              DEPT. OF CSE × METAVERSE
            </div>
          </div>
        </div>
      </div>

      {/* ── STANDALONE EXTENSIONS (only on /about route) ── */}
      {!isEmbedded && (
        <>
          {/* 5 Quick Specs Strip */}
          <div
            style={{
              background: "#080607",
              borderTop: "1px solid #1f1416",
              borderBottom: "1px solid #1f1416",
              padding: "36px 24px",
            }}
          >
            <div
              style={{
                maxWidth: "1360px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "28px 20px",
              }}
            >
              {[
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  ),
                  title: "VAST OPEN WORLD",
                  desc: "Explore breathtaking laboratories, campus grounds, and high-speed gigabit Wi-Fi.",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="22" y1="12" x2="18" y2="12" />
                      <line x1="6" y1="12" x2="2" y2="12" />
                      <line x1="12" y1="6" x2="12" y2="2" />
                      <line x1="12" y1="22" x2="12" y2="18" />
                    </svg>
                  ),
                  title: "HUNT & SURVIVE",
                  desc: "Track elusive bugs, craft robust prototypes, and survive the 36-hour sprint.",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="5" width="13" height="16" rx="2" />
                      <path d="M7 5V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-2" />
                    </svg>
                  ),
                  title: "GAMES & ACTIVITIES",
                  desc: "Midnight gaming, poker, tech trivia, caffeine refueling, and food.",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 4v7a7 7 0 0 0 14 0V4" />
                      <path d="M5 8h4" />
                      <path d="M15 8h4" />
                    </svg>
                  ),
                  title: "BOND WITH YOUR CREW",
                  desc: "Pair-program, divide modules, and ride alongside your loyal teammates.",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  title: "HACKSPRINT ONLINE",
                  desc: "Join 500+ outlaws in our official community on Discord, WhatsApp, and GitHub.",
                },
              ].map((spec) => (
                <div key={spec.title} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{ color: "#e51b24", flexShrink: 0, marginTop: "2px" }}>{spec.icon}</div>
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        color: "#f5f1ea",
                        textTransform: "uppercase",
                        margin: "0 0 4px",
                      }}
                    >
                      {spec.title}
                    </h4>
                    <p style={{ color: "#8a8276", fontSize: "0.78rem", lineHeight: 1.45, margin: 0 }}>
                      {spec.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trinity of Purpose Cards */}
          <div
            id="about-creed"
            style={{
              maxWidth: "1360px",
              margin: "0 auto",
              padding: "72px 24px 80px",
              scrollMarginTop: "80px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "36px",
              }}
            >
              <div style={{ width: "40px", height: "1px", background: "#e51b24" }} />
              <span
                style={{
                  color: "#e51b24",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                ★ THE TRINITY OF PURPOSE ★
              </span>
              <div style={{ width: "40px", height: "1px", background: "#e51b24" }} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {[
                {
                  icon: "★",
                  kicker: "OUR VISION",
                  title: "THE SACRED CREED",
                  text: "To build a legendary student sanctuary where bold ideas escape paper and emerge as hardened, deployable systems ready to reshape industries.",
                },
                {
                  icon: "⚔",
                  kicker: "OUR MISSION",
                  title: "THE 36-HOUR MANDATE",
                  text: "Sprint relentlessly without sleep. Challenge obsolete conventions, embrace brutal feedback from mentors, and ship battle-tested architectures.",
                },
                {
                  icon: "🔥",
                  kicker: "THE DOCTRINE",
                  title: "OUTLAWS FOR LIFE",
                  text: "We don't wait for permission or predict the future from afar. We gather in the arena, fire up our compilers, and forge it together.",
                },
              ].map((pillar) => (
                <div
                  key={pillar.title}
                  style={{
                    background: "#0c090a",
                    border: "1px solid #281619",
                    padding: "30px 24px",
                    boxShadow: "0 10px 28px rgba(0,0,0,0.6)",
                  }}
                >
                  <div style={{ color: "#e51b24", fontSize: "1.4rem", marginBottom: "12px" }}>
                    {pillar.icon}
                  </div>
                  <p className="rdr-kicker" style={{ fontSize: "0.72rem", marginBottom: "6px" }}>
                    {pillar.kicker}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                      fontSize: "1.7rem",
                      letterSpacing: "0.04em",
                      color: "#f5f1ea",
                      textTransform: "uppercase",
                      margin: "0 0 10px",
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p style={{ color: "#9e978d", fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
