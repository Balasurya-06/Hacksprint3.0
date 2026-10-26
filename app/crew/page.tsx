"use client";

import Image from "next/image";
import { useState } from "react";

interface TeamMember {
  id: string;
  number: string;
  name: string;
  role: string;
  positionCode: string;
  detail: string;
  tagRole: string;
  tagYear: string;
  bio: string;
  image: string;
  contact?: {
    phone?: string;
    whatsapp?: string;
    linkedin?: string;
  };
}

const conveners = [
  {
    kicker: "CONVENER & HEAD OF DEPARTMENT",
    name: "Dr. R. Santhosh",
    subtitle: "Head of Department · Computer Science and Engineering, KAHE",
  },
  {
    kicker: "FACULTY CONVENER",
    name: "Ramya",
    subtitle: "Assistant Professor · Department of Computer Science and Engineering, KAHE",
  },
];

const startingFive: TeamMember[] = [
  {
    id: "deepa",
    number: "04",
    name: "DEEPA",
    role: "Organizer · Operations & Logistics",
    positionCode: "04",
    detail: "Third Year · Computer Science and Engineering",
    tagRole: "ORGANIZER",
    tagYear: "THIRD YEAR · CSE",
    bio: "Spearheading operations, track scheduling, on-ground execution, and seamless participant engagement across all 36 hours.",
    image: "/deepa.jpeg",
  },
  {
    id: "kavinya",
    number: "02",
    name: "KAVINYA",
    role: "Organizer · Outreach & Partnerships",
    positionCode: "02",
    detail: "Third Year · Computer Science and Engineering",
    tagRole: "ORGANIZER",
    tagYear: "THIRD YEAR · CSE",
    bio: "Directing attendee outreach, judge and mentor relations, community partnerships, and mainstage coordination.",
    image: "/kavinya.jpeg",
  },
  {
    id: "surya",
    number: "01",
    name: "BALA SURYA S",
    role: "Lead Organizer · HackSprint 2.0 & 3.0",
    positionCode: "01",
    detail: "Final Year · Computer Science and Engineering",
    tagRole: "LEAD ORGANIZER (C)",
    tagYear: "FINAL YEAR · CSE",
    bio: "Spearheading overarching vision, platform architecture, ecosystem sponsorships, and builder experience for HackSprint.",
    image: "/surya.png",
    contact: {
      phone: "9597075831",
      whatsapp: "9597075831",
      linkedin: "https://www.linkedin.com/in/balasurya06/",
    },
  },
  {
    id: "harini",
    number: "03",
    name: "HARINI",
    role: "Organizer · Admin & Participant Hospitality",
    positionCode: "03",
    detail: "Third Year · Computer Science and Engineering",
    tagRole: "ORGANIZER",
    tagYear: "THIRD YEAR · CSE",
    bio: "Coordinating event administration, participant hospitality, schedule management, and stage operations.",
    image: "/harini.jpeg",
  },
  {
    id: "aravind",
    number: "05",
    name: "ARAVIND",
    role: "Organizer · Technical Infrastructure",
    positionCode: "05",
    detail: "Third Year · Computer Science and Engineering",
    tagRole: "ORGANIZER",
    tagYear: "THIRD YEAR · CSE",
    bio: "Managing technical operations, hackathon cloud infrastructure, platform workflows, and track logistics.",
    image: "/aravind.jpeg",
  },
];

export default function CrewPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#090909",
        color: "#ffffff",
        padding: "100px 24px 100px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1220px", margin: "0 auto" }}>
        {/* ── HEADER WITH SIGNATURE DIAGONAL SLASH ── */}
        <header
          className="crew-header-box"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "36px",
            marginBottom: "56px",
          }}
        >
          {/* Left Column: Meet the crew */}
          <div style={{ flex: "1 1 45%" }}>
            <p
              style={{
                color: "#E53935",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              The people behind the sprint
            </p>
            <h1
              style={{
                color: "#ffffff",
                fontSize: "clamp(2.7rem, 5.5vw, 4.8rem)",
                fontWeight: 900,
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
                margin: 0,
              }}
            >
              Meet the <span style={{ color: "#E53935" }}>crew</span>.
            </h1>
          </div>

          {/* Center Column: Controlled Diagonal Slash Divider */}
          <div
            className="crew-header-slash-col"
            aria-hidden="true"
            style={{
              width: "42px",
              height: "115px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg viewBox="0 0 42 115" style={{ width: "42px", height: "115px", display: "block" }}>
              <defs>
                <linearGradient id="headerMainSlash" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E53935" stopOpacity="0.1" />
                  <stop offset="45%" stopColor="#E53935" stopOpacity="0.95" />
                  <stop offset="85%" stopColor="#ffffff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line
                x1="2"
                y1="110"
                x2="40"
                y2="5"
                stroke="url(#headerMainSlash)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Right Column: User Intro & Button */}
          <div style={{ flex: "1 1 50%" }}>
            <p
              style={{
                color: "#B3B3B3",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                maxWidth: "460px",
                marginBottom: "20px",
              }}
            >
              The organizers, builders, and community leaders creating a space where ideas become real-world projects.
            </p>
            <a
              href="#starting-five"
              className="crew-pill-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 22px",
                border: "1px solid #E53935",
                borderRadius: "999px",
                color: "#E53935",
                fontSize: "0.75rem",
                fontWeight: 700,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              Meet the team ↓
            </a>
          </div>
        </header>

        {/* ── CONVENERS SECTION (PREVIOUS CLEAN BORDER STYLE MAINTAINED) ── */}
        <section aria-labelledby="conveners-title" style={{ marginBottom: "64px" }}>
          <p
            id="conveners-title"
            style={{
              color: "#E53935",
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.16em",
              marginBottom: "18px",
              textTransform: "uppercase",
            }}
          >
            Conveners
          </p>

          <div
            className="crew-conveners-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "28px",
            }}
          >
            {conveners.map((convener) => (
              <article
                key={convener.name}
                style={{
                  borderTop: "1px solid #E53935",
                  borderBottom: "1px solid #292929",
                  padding: "24px 0",
                  background: "transparent",
                }}
              >
                <div
                  style={{
                    color: "#E53935",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  {convener.kicker}
                </div>
                <h2
                  style={{
                    color: "#ffffff",
                    fontSize: "1.45rem",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  {convener.name}
                </h2>
                <p
                  style={{
                    color: "#888888",
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                    marginTop: "8px",
                    marginBottom: 0,
                  }}
                >
                  {convener.subtitle}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── ORGANIZERS: STARTING FIVE (OUR DARK THEME) ── */}
        <section id="starting-five" aria-label="Starting Five Lineup" style={{ marginBottom: "50px" }}>
          {/* Section Divider Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              margin: "0 0 28px",
              paddingBottom: "10px",
              borderBottom: "1px solid #1a1a1a",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                background: "rgba(229, 57, 53, 0.08)",
                border: "1px solid rgba(229, 57, 53, 0.3)",
                padding: "5px 14px",
                borderRadius: "999px",
                color: "#E53935",
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#E53935",
                  boxShadow: "0 0 6px #E53935",
                }}
              />
              01 // ORGANIZING LEADERSHIP
            </div>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "linear-gradient(90deg, rgba(229, 57, 53, 0.3) 0%, rgba(255, 255, 255, 0.05) 100%)",
              }}
            />
            <span
              style={{
                color: "#777777",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              5 Organizers · Starting Five
            </span>
          </div>

          {/* ── THE STARTING FIVE (CLEAN ON PAGE BACKGROUND) ── */}
          <div
            style={{
              position: "relative",
              width: "100%",
              color: "#f5f1ea",
              padding: "12px 0 20px",
            }}
          >
            {/* ── TOP HEADER (BADGE, TONIGHT, STARTING FIVE) ── */}
            <header
              style={{
                position: "relative",
                zIndex: 3,
                textAlign: "center",
                marginBottom: "38px",
              }}
            >
              {/* Futsal League Style Top Dark Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "#080c18",
                  border: "1px solid #281a1e",
                  color: "#ffffff",
                  padding: "7px 20px",
                  borderRadius: "3px",
                  marginBottom: "16px",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.5)",
                }}
              >
                {/* Trophy Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#e51b24">
                  <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H8v2h8v-2h-3v-3.1c1.94-.36 3.47-1.87 3.61-3.94C19.08 11.63 21 9.55 21 7V5c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
                </svg>
                <div style={{ textAlign: "left", lineHeight: 1.1 }}>
                  <div
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: "0.76rem",
                      fontWeight: 900,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#f5f1ea",
                    }}
                  >
                    HACKSPRINT
                  </div>
                  <div
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      color: "#e51b24",
                      textTransform: "uppercase",
                    }}
                  >
                    SEASON 3.0
                  </div>
                </div>
              </div>

              {/* Subtitle: TONIGHT */}
              <p
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  color: "#e51b24",
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                }}
              >
                TONIGHT
              </p>

              {/* Massive Heading: STARTING FIVE */}
              <h2
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "14px",
                  margin: 0,
                  lineHeight: 0.95,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                    fontSize: "clamp(3.4rem, 6.8vw, 5.2rem)",
                    fontWeight: 900,
                    letterSpacing: "0.04em",
                    color: "#f5f1ea",
                    textTransform: "uppercase",
                  }}
                >
                  STARTING
                </span>

                {/* Stylized Red "five" (Script / Brush Graphic matching reference) */}
                <span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    fontFamily: "'Playfair Display', 'Brush Script MT', cursive, serif",
                    fontSize: "clamp(3.6rem, 7.2vw, 5.6rem)",
                    fontWeight: 900,
                    fontStyle: "italic",
                    color: "#e51b24",
                    letterSpacing: "-0.04em",
                    transform: "rotate(-4deg)",
                    textShadow: "0 0 20px rgba(229, 27, 36, 0.6)",
                  }}
                >
                  five
                </span>
              </h2>
            </header>

            {/* ── 5 STAGGERED VERTICAL CARDS (OUR DARK THEME) ── */}
            <div
              style={{
                position: "relative",
                zIndex: 3,
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "12px",
                alignItems: "start",
                maxWidth: "1060px",
                margin: "0 auto 36px",
              }}
              className="starting-five-grid"
            >
              {startingFive.map((member, index) => {
                let topOffset = 0;
                let cardHeight = 390;
                const isCaptain = member.id === "surya";

                if (index === 0 || index === 4) {
                  topOffset = 28;
                  cardHeight = 365;
                } else if (index === 1 || index === 3) {
                  topOffset = 0;
                  cardHeight = 395;
                } else if (index === 2) {
                  topOffset = 12;
                  cardHeight = 430; // hangs lowest!
                }

                return (
                  <div
                    key={member.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transform: `translateY(${topOffset}px)`,
                      transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    {/* The Vertical Card Box in Dark Obsidian / Crimson theme */}
                    <div
                      onClick={() => setSelectedMember(member)}
                      tabIndex={0}
                      role="button"
                      aria-label={`View profile of ${member.name}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setSelectedMember(member);
                      }}
                      style={{
                        position: "relative",
                        width: "100%",
                        height: `${cardHeight}px`,
                        background: "linear-gradient(180deg, #1c1518 0%, #120d0f 45%, #080607 100%)",
                        borderRadius: "3px",
                        overflow: "hidden",
                        cursor: "pointer",
                        boxShadow: isCaptain
                          ? "0 18px 40px rgba(0,0,0,0.8), 0 0 25px rgba(229, 27, 36, 0.35)"
                          : "0 14px 32px rgba(0,0,0,0.7)",
                        border: isCaptain ? "1.5px solid #e51b24" : "1px solid #2a1619",
                        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
                        e.currentTarget.style.boxShadow = "0 22px 50px rgba(229, 27, 36, 0.45)";
                        e.currentTarget.style.borderColor = "#e51b24";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = isCaptain
                          ? "0 18px 40px rgba(0,0,0,0.8), 0 0 25px rgba(229, 27, 36, 0.35)"
                          : "0 14px 32px rgba(0,0,0,0.7)";
                        e.currentTarget.style.borderColor = isCaptain ? "#e51b24" : "#2a1619";
                      }}
                    >
                      {/* Top Watermark Tag: FLK / ANC / GK / ANC / PVT */}
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: 0,
                          right: 0,
                          textAlign: "center",
                          fontFamily: "'Oswald', sans-serif",
                          fontSize: "clamp(2.8rem, 4.2vw, 4.4rem)",
                          fontWeight: 900,
                          letterSpacing: "0.06em",
                          lineHeight: 1,
                          color: "rgba(229, 27, 36, 0.22)",
                          textTransform: "uppercase",
                          zIndex: 1,
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                      >
                        {member.positionCode}
                      </div>

                      {/* Member Monochrome Photograph */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "82%",
                          zIndex: 2,
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          src={member.image}
                          alt={`${member.name} - HackSprint 3.0 Starting Five`}
                          fill
                          sizes="(max-width: 900px) 33vw, 20vw"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center top",
                            filter: "grayscale(100%) contrast(1.18) brightness(0.92)",
                          }}
                          priority={member.id === "surya"}
                        />
                      </div>

                      {/* Rich Crimson Red Gradient Wash (Signature starting five reference style) */}
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "56%",
                          background:
                            "linear-gradient(to top, #e51b24 0%, rgba(229, 27, 36, 0.9) 32%, rgba(229, 27, 36, 0.28) 60%, transparent 80%)",
                          zIndex: 3,
                          pointerEvents: "none",
                        }}
                      />

                      {/* Captain Badge on center card */}
                      {isCaptain && (
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            zIndex: 4,
                            background: "#e51b24",
                            color: "#ffffff",
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: "0.6rem",
                            fontWeight: 900,
                            padding: "2px 6px",
                            borderRadius: "2px",
                            letterSpacing: "0.1em",
                            boxShadow: "0 0 10px rgba(229, 27, 36, 0.6)",
                          }}
                        >
                          LEAD
                        </div>
                      )}
                    </div>

                    {/* ── CARD LABEL: NAME ── */}
                    <div
                      style={{
                        marginTop: "14px",
                        textAlign: "center",
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: "clamp(0.85rem, 1.2vw, 1.05rem)",
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        color: "#f5f1ea",
                        textTransform: "uppercase",
                        lineHeight: 1.2,
                      }}
                    >
                      <span>{member.name} {member.id === "surya" ? "(LEAD)" : ""}</span>
                      <span
                        style={{
                          display: "block",
                          marginTop: "6px",
                          color: "#b3b3b3",
                          fontSize: "0.68em",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                        }}
                      >
                        {member.tagYear}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── QUERIES & CONTACT BAR (BALA SURYA MOBILE NUMBER) ── */}
            <div
              style={{
                position: "relative",
                zIndex: 3,
                marginTop: "48px",
                padding: "22px 28px",
                background: "#120c0e",
                border: "1px solid #281418",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
              }}
              className="crew-contact-bar"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "#e51b24",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    boxShadow: "0 0 16px rgba(229, 27, 36, 0.5)",
                    flexShrink: 0,
                  }}
                >
                  📞
                </div>
                <div>
                  <div
                    style={{
                      color: "#e51b24",
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: "0.74rem",
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    FOR ANY QUERIES OR ASSISTANCE
                  </div>
                  <div
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "#f5f1ea",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Bala Surya S <span style={{ color: "#8e8880", fontSize: "0.85rem", fontWeight: 400 }}>(Lead Organizer)</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href="tel:9597075831"
                  className="rdr-btn-red"
                  style={{
                    fontSize: "0.85rem",
                    padding: "10px 22px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>CALL: +91 9597075831</span>
                  <span style={{ fontSize: "1rem" }}>&gt;</span>
                </a>
                <a
                  href="https://wa.me/919597075831?text=Hi%20Bala,%20I%20have%20a%20query%20about%20HackSprint%203.0"
                  target="_blank"
                  rel="noreferrer"
                  className="rdr-btn-ghost"
                  style={{
                    fontSize: "0.85rem",
                    padding: "10px 20px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>WHATSAPP</span>
                  <span style={{ color: "#e51b24" }}>💬</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── MODAL DRAWER FOR SELECTED MEMBER DETAILS ── */}
        {selectedMember && (
          <div
            onClick={() => setSelectedMember(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(8px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#100b0d",
                border: "2px solid #e51b24",
                borderRadius: "12px",
                maxWidth: "520px",
                width: "100%",
                padding: "32px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.9), 0 0 40px rgba(229, 27, 36, 0.3)",
                color: "#f5f1ea",
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "transparent",
                  border: "none",
                  color: "#8e8880",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>

              <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "20px" }}>
                <div
                  style={{
                    position: "relative",
                    width: "80px",
                    height: "100px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    border: "1px solid #e51b24",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <span
                    style={{
                      background: "#e51b24",
                      color: "#fff",
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: "2px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    #{selectedMember.number} · {selectedMember.positionCode}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                      fontSize: "2rem",
                      margin: "6px 0 2px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {selectedMember.name}
                  </h3>
                  <p style={{ color: "#e51b24", fontSize: "0.85rem", fontWeight: 700, margin: 0 }}>
                    {selectedMember.role}
                  </p>
                  <p style={{ color: "#8e8880", fontSize: "0.78rem", margin: "2px 0 0" }}>
                    {selectedMember.detail}
                  </p>
                </div>
              </div>

              <p style={{ color: "#c2b8ad", fontSize: "0.9rem", lineHeight: 1.65, marginBottom: "24px" }}>
                {selectedMember.bio}
              </p>

              {selectedMember.contact && (
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {selectedMember.contact.phone && (
                    <a
                      href={`tel:${selectedMember.contact.phone}`}
                      className="rdr-btn-red"
                      style={{ fontSize: "0.8rem", padding: "8px 16px" }}
                    >
                      <span>📞 CALL {selectedMember.contact.phone}</span>
                    </a>
                  )}
                  {selectedMember.contact.whatsapp && (
                    <a
                      href={`https://wa.me/91${selectedMember.contact.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rdr-btn-red"
                      style={{ fontSize: "0.8rem", padding: "8px 16px" }}
                    >
                      <span>💬 WHATSAPP</span>
                    </a>
                  )}
                  {selectedMember.contact.linkedin && (
                    <a
                      href={selectedMember.contact.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="rdr-btn-ghost"
                      style={{ fontSize: "0.8rem", padding: "8px 16px" }}
                    >
                      <span>↗ LINKEDIN</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── RESPONSIVE MEDIA QUERIES ── */}
      <style>{`
        @media (max-width: 900px) {
          .crew-header-box {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          .crew-header-slash-col {
            display: none !important;
          }
          .crew-conveners-grid {
            grid-template-columns: 1fr !important;
          }
          .starting-five-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .starting-five-footer {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 16px !important;
          }
          .starting-five-footer > div {
            text-align: center !important;
          }
        }
        @media (max-width: 580px) {
          .starting-five-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </main>
  );
}
