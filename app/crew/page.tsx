"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ContactInfo {
  phone?: string;
  whatsapp?: string;
  linkedin?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  designation?: string;
  detail: string;
  bio: string;
  badge?: string;
  image?: string;
  objectPosition?: string;
  imageScale?: number;
  imageOrigin?: string;
  contact?: ContactInfo;
}

/* ── 1. CONVENERS (HOD & FACULTY LEADERSHIP · TEXT ONLY) ── */
const facultyMembers: TeamMember[] = [
  {
    id: "santhosh",
    name: "Dr. R. Santhosh",
    role: "Head of Department",
    designation: "Professor & Head of Department",
    detail: "Computer Science and Engineering",
    bio: "Head of the Department of Computer Science & Engineering at Karpagam Academy of Higher Education. Guiding overarching institutional strategy, industry partnerships, research incubation, and student innovation initiatives for HackSprint 3.0.",
    badge: "CONVENER · HOD",
    contact: {
      linkedin: "https://www.linkedin.com/in/dr-r-santhosh-8373801a/",
    },
  },
  {
    id: "ramya",
    name: "Ramya",
    role: "Assistant Professor",
    designation: "Assistant Professor",
    detail: "Department of Computer Science and Engineering",
    bio: "Assistant Professor in the Department of Computer Science & Engineering at KAHE. Providing continuous mentorship, institutional coordination, academic alignment, and operational supervision for the hackathon.",
    badge: "CONVENER · FACULTY ADVISOR",
  },
];

/* ── 2. LEAD ORGANIZER (BALA SURYA S) ── */
const leadOrganizer: TeamMember = {
  id: "surya",
  name: "BALA SURYA S",
  role: "Lead Organizer · HackSprint 2.0 & 3.0",
  designation: "Lead Organizer & Core Architect",
  detail: "Final Year · Computer Science and Engineering",
  bio: "Spearheading the overarching vision, platform architecture, ecosystem sponsorships, judge panels, and builder experience for HackSprint.",
  badge: "LEAD ORGANIZER",
  image: "/surya.png",
  objectPosition: "center top",
  imageScale: 1.05,
  imageOrigin: "center center",
  contact: {
    phone: "9597075831",
    whatsapp: "9597075831",
    linkedin: "https://www.linkedin.com/in/balasurya06/",
  },
};

/* ── 3. ORGANIZING COMMITTEE (AFTER THAT · REAL PHOTOS) ── */
const organizingTeam: TeamMember[] = [
  {
    id: "deepa",
    name: "DEEPA",
    role: "Organizer · Operations & Scheduling",
    designation: "Operations & Scheduling Lead",
    detail: "Third Year · Computer Science and Engineering",
    bio: "Spearheading operations, track scheduling, on-ground execution, and seamless participant engagement across all 36 hours of the hackathon.",
    badge: "OPERATIONS",
    image: "/deepa.jpeg",
    objectPosition: "center 30%",
    imageScale: 1.35,
    imageOrigin: "50% 30%",
  },
  {
    id: "kavinya",
    name: "KAVINYA",
    role: "Organizer · Outreach & Partnerships",
    designation: "Outreach & Partnerships Lead",
    detail: "Third Year · Computer Science and Engineering",
    bio: "Directing attendee outreach, judge and mentor relations, community partnerships, and main arena stage coordination.",
    badge: "OUTREACH",
    image: "/kavinya.jpeg",
    objectPosition: "center 28%",
    imageScale: 1.25,
    imageOrigin: "50% 28%",
  },
  {
    id: "harini",
    name: "HARINI",
    role: "Organizer · Event Admin & Hospitality",
    designation: "Event Admin & Hospitality Lead",
    detail: "Third Year · Computer Science and Engineering",
    bio: "Coordinating event administration, participant hospitality, schedule management, and round-the-clock arena logistics.",
    badge: "ADMIN & HOSPITALITY",
    image: "/harini.jpeg",
    objectPosition: "53% 25%",
    imageScale: 1.0,
    imageOrigin: "53% 25%",
  },
  {
    id: "aravind",
    name: "ARAVIND",
    role: "Organizer · Technical Operations",
    designation: "Technical Operations Lead",
    detail: "Third Year · Computer Science and Engineering",
    bio: "Managing technical operations, hackathon network infrastructure, platform workflows, and developer track logistics.",
    badge: "TECH OPS",
    image: "/aravind.jpeg",
    objectPosition: "center 48%",
    imageScale: 1.65,
    imageOrigin: "50% 48%",
  },
];

/* ── ARCHED COMMITTEE CARD (ROMAN DOME WITH PHOTO & FLOATING PILL) ── */
function ArchedCommitteeCard({
  member,
  onSelect,
}: {
  member: TeamMember;
  onSelect: (m: TeamMember) => void;
}) {
  const isCutout = member.id === "surya";

  return (
    <div
      onClick={() => onSelect(member)}
      style={{
        position: "relative",
        width: "250px",
        height: "360px",
        margin: "0 auto",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        transition: "transform 0.25s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
    >
      {/* 1. Roman Arch Dome Backdrop & Framed Image */}
      <div
        style={{
          position: "absolute",
          bottom: "35px",
          width: "230px",
          height: "285px",
          borderRadius: "115px 115px 0 0",
          background: isCutout
            ? "linear-gradient(180deg, #990e14 0%, #3d0508 100%)"
            : "#140a0c",
          boxShadow: "0 14px 40px rgba(153, 14, 20, 0.4), 0 0 25px rgba(229, 27, 36, 0.2)",
          overflow: "hidden",
          border: "1.5px solid rgba(229, 27, 36, 0.4)",
          borderBottom: "none",
        }}
      >
        {/* Subtle interior radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 25%, rgba(229, 27, 36, 0.35) 0%, transparent 70%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Scaled & Positioned Member Photo */}
        {member.image && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: member.imageScale ? `scale(${member.imageScale})` : "none",
              transformOrigin: member.imageOrigin || "center center",
              transition: "transform 0.3s ease",
              zIndex: 2,
            }}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="250px"
              style={{
                objectFit: isCutout ? "contain" : "cover",
                objectPosition: member.objectPosition || "center top",
                filter: isCutout
                  ? "drop-shadow(0 14px 22px rgba(0, 0, 0, 0.95))"
                  : "contrast(1.05) brightness(0.96)",
              }}
              priority={member.id === "surya"}
            />
          </div>
        )}

        {/* Dark crimson vignette mask to blend photo bottom into the card */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(14, 8, 9, 0.85) 0%, rgba(14, 8, 9, 0.2) 30%, transparent 60%)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* 2. Floating Dark Obsidian Pill Badge */}
      <div
        style={{
          position: "relative",
          zIndex: 4,
          width: "250px",
          background: "linear-gradient(135deg, #180d10 0%, #0b0708 100%)",
          border: "1px solid #3d1b1f",
          borderRadius: "10px",
          padding: "10px 14px 12px",
          boxShadow: "0 10px 28px rgba(0, 0, 0, 0.9), 0 0 16px rgba(229, 27, 36, 0.15)",
          textAlign: "left",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      >
        {/* Name */}
        <h3
          style={{
            color: "#f5f1ea",
            fontFamily: "'Oswald', sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 1.2,
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {member.name}
        </h3>

        {/* Role with crimson bullet */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#b0a89d",
            fontSize: "0.72rem",
            fontWeight: 500,
            lineHeight: 1.3,
            marginTop: "4px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span style={{ color: "#e51b24", fontSize: "0.75rem" }}>•</span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {member.role}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CrewPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#070606",
        color: "#f5f1ea",
        padding: "80px 24px 120px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ── HEADER: "Meet the crew." (MATCHING USER SCREENSHOT) ─────────── */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "32px 48px",
            marginBottom: "72px",
          }}
        >
          {/* Left Title */}
          <div>
            <p
              style={{
                color: "#e51b24",
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                margin: "0 0 10px",
              }}
            >
              THE PEOPLE BEHIND THE SPRINT
            </p>
            <h1
              style={{
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
                margin: 0,
                color: "#ffffff",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Meet the <span style={{ color: "#e51b24" }}>crew.</span>
            </h1>
          </div>

          {/* Right: Diagonal Slash + Description + CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
              flex: "1 1 360px",
              maxWidth: "520px",
            }}
          >
            {/* Glowing Diagonal Slash */}
            <div
              aria-hidden="true"
              style={{
                width: "2px",
                height: "68px",
                background: "linear-gradient(180deg, #e51b24 0%, rgba(229, 27, 36, 0.05) 100%)",
                transform: "rotate(20deg)",
                flexShrink: 0,
              }}
            />

            <div>
              <p
                style={{
                  color: "#9e978d",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  margin: "0 0 16px",
                }}
              >
                The organizers, builders, and community leaders creating a space where ideas become real-world projects.
              </p>

              <a
                href="#organizers"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 18px",
                  borderRadius: "9999px",
                  border: "1px solid #e51b24",
                  background: "transparent",
                  color: "#e51b24",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e51b24";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#e51b24";
                }}
              >
                <span>Meet the team</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ── CONVENERS (HOD & FACULTY LEADERSHIP · MATCHING SCREENSHOT) ──── */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section
          style={{
            marginBottom: "72px",
            paddingBottom: "56px",
            borderBottom: "1px solid #1f1416",
          }}
        >
          {/* Section Kicker */}
          <h2
            style={{
              color: "#e51b24",
              fontFamily: "'Oswald', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              margin: "0 0 14px",
            }}
          >
            CONVENERS
          </h2>

          {/* Clean Horizontal Rule */}
          <div
            style={{
              height: "1px",
              background: "rgba(229, 27, 36, 0.45)",
              marginBottom: "32px",
            }}
          />

          {/* 2 Columns: Dr. R. Santhosh & Ramya */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "36px 48px",
            }}
          >
            {/* Dr. R. Santhosh */}
            <div
              onClick={() => setSelectedMember(facultyMembers[0])}
              style={{
                cursor: "pointer",
                padding: "8px 0",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: "0 0 8px",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Dr. R. Santhosh
              </h3>
              <p
                style={{
                  color: "#e51b24",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  margin: "0 0 4px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Head of Department
              </p>
              <p
                style={{
                  color: "#8a8276",
                  fontSize: "0.88rem",
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Computer Science and Engineering
              </p>
            </div>

            {/* Ramya */}
            <div
              onClick={() => setSelectedMember(facultyMembers[1])}
              style={{
                cursor: "pointer",
                padding: "8px 0",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  margin: "0 0 8px",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Ramya
              </h3>
              <p
                style={{
                  color: "#e51b24",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  margin: "0 0 4px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Assistant Professor
              </p>
              <p
                style={{
                  color: "#8a8276",
                  fontSize: "0.88rem",
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Department of Computer Science and Engineering
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* ── 2. AFTER THAT: ORGANIZING COMMITTEE & LEAD ORGANIZER ─────────── */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="organizers" style={{ marginBottom: "60px", scrollMarginTop: "100px" }}>
          {/* ROW A: BRACKET HEADER (LEFT) + LEAD ORGANIZER (RIGHT) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              alignItems: "center",
              gap: "48px 40px",
              marginBottom: "56px",
            }}
          >
            {/* LEFT: BRACKETED HEADER FOR ORGANIZING COMMITTEE */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                padding: "20px 0",
              }}
            >
              {/* Left Bracket */}
              <svg
                width="28"
                height="96"
                viewBox="0 0 28 96"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M26 4 H10 C5.5 4 2 7.5 2 12 V84 C2 88.5 5.5 92 10 92 H26"
                  stroke="#e51b24"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </svg>

              {/* Title Texts */}
              <div style={{ textAlign: "center", padding: "0 8px" }}>
                <p
                  className="rdr-kicker"
                  style={{
                    fontSize: "0.75rem",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  THE CORE ORGANIZING POSSE
                </p>
                <h2
                  style={{
                    fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                    fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                    fontWeight: 900,
                    letterSpacing: "0.04em",
                    color: "#f5f1ea",
                    lineHeight: 0.95,
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  ORGANIZING <span style={{ color: "#e51b24" }}>COMMITTEE</span>
                </h2>
                <p
                  style={{
                    color: "#a39d93",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    margin: "10px 0 0",
                  }}
                >
                  HACKSPRINT 3.0 · COIMBATORE 2026
                </p>
                <p
                  style={{
                    color: "#6b655c",
                    fontSize: "0.76rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    margin: "4px 0 0",
                  }}
                >
                  METAVERSE STUDENTS ASSOCIATION
                </p>
              </div>

              {/* Right Bracket */}
              <svg
                width="28"
                height="96"
                viewBox="0 0 28 96"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M2 4 H18 C22.5 4 26 7.5 26 12 V84 C26 88.5 22.5 92 18 92 H2"
                  stroke="#e51b24"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* RIGHT: SINGLE LEAD ORGANIZER (BALA SURYA S) */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ArchedCommitteeCard member={leadOrganizer} onSelect={setSelectedMember} />
            </div>
          </div>

          {/* ROW B: THE 4 ORGANIZERS (DEEPA, KAVINYA, HARINI, ARAVIND) */}
          <div>
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
                ★ ORGANIZERS POSSE ★
              </span>
              <div style={{ width: "40px", height: "1px", background: "#e51b24" }} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                justifyContent: "center",
                gap: "36px 20px",
              }}
            >
              {organizingTeam.map((member) => (
                <ArchedCommitteeCard key={member.id} member={member} onSelect={setSelectedMember} />
              ))}
            </div>
          </div>
        </section>

        {/* ── RETURN NAVIGATION / DISPATCH CTA ── */}
        <section
          style={{
            marginTop: "80px",
            background: "radial-gradient(ellipse at 50% 50%, rgba(153, 14, 20, 0.35) 0%, #0d0a0b 80%)",
            border: "1px solid #381a1e",
            padding: "48px 32px",
            textAlign: "center",
          }}
        >
          <p className="rdr-kicker" style={{ marginBottom: "10px" }}>
            HACKSPRINT III COMMUNICATIONS
          </p>

          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              letterSpacing: "0.04em",
              color: "#f5f1ea",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            HAVE QUESTIONS FOR THE CREW?
          </h2>

          <p style={{ color: "#9e978d", fontSize: "0.95rem", maxWidth: "580px", margin: "0 auto 28px" }}>
            Connect with our organizers and faculty coordinators directly via WhatsApp or email for sponsorship, track guidelines,
            and registration inquiries.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K"
              target="_blank"
              rel="noreferrer"
              className="rdr-btn-red"
            >
              <span>JOIN OFFICIAL WHATSAPP POSSE</span>
              <span>↗</span>
            </a>
            <Link href="/why-sponsor-us" className="rdr-btn-ghost">
              <span>EXPLORE SPONSORSHIP</span>
              <span>&gt;</span>
            </Link>
            <Link href="/#home" className="rdr-btn-ghost">
              <span>← RETURN TO ARENA</span>
            </Link>
          </div>
        </section>
      </div>

      {/* ── DETAIL MODAL (WHEN ANY MEMBER OR FACULTY IS CLICKED) ── */}
      {selectedMember && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 400,
            background: "rgba(5, 4, 4, 0.88)",
            backdropFilter: "blur(12px)",
            display: "grid",
            placeItems: "center",
            padding: "20px",
          }}
          onClick={() => setSelectedMember(null)}
        >
          <div
            style={{
              width: "min(480px, 100%)",
              background: "#0e0b0c",
              border: "2px solid #3d1b1f",
              boxShadow: "0 25px 90px rgba(0, 0, 0, 0.95), 0 0 50px rgba(229, 27, 36, 0.25)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with crimson gradient */}
            <div
              style={{
                background: "linear-gradient(135deg, #7a0c10 0%, #1a0608 100%)",
                borderBottom: "1px solid #3d1b1f",
                padding: "26px 24px",
                color: "#ffffff",
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "16px",
                  background: "rgba(255, 255, 255, 0.12)",
                  border: "none",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  color: "#ffffff",
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                  transition: "background 0.2s",
                }}
              >
                ✕
              </button>

              <div
                style={{
                  color: "#ff8f94",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                {selectedMember.badge || "HACKSPRINT III PROFILE"}
              </div>

              <h3
                style={{
                  fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                  fontSize: "1.9rem",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                }}
              >
                {selectedMember.name}
              </h3>

              <p style={{ color: "#f5f1ea", fontSize: "0.86rem", fontWeight: 600, margin: 0 }}>
                • {selectedMember.role}
              </p>
              <p style={{ color: "#a39d93", fontSize: "0.78rem", margin: "4px 0 0" }}>
                {selectedMember.detail}
              </p>
            </div>

            {/* Body */}
            <div style={{ padding: "24px" }}>
              <p style={{ color: "#9e978d", fontSize: "0.88rem", lineHeight: 1.65, margin: "0 0 24px" }}>
                {selectedMember.bio}
              </p>

              {selectedMember.contact ? (
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", paddingTop: "16px", borderTop: "1px solid #221416" }}>
                  {selectedMember.contact.phone && (
                    <a
                      href={`tel:${selectedMember.contact.phone}`}
                      className="rdr-btn-red"
                      style={{ fontSize: "0.75rem", padding: "8px 16px" }}
                    >
                      ☎ CALL {selectedMember.contact.phone}
                    </a>
                  )}
                  {selectedMember.contact.whatsapp && (
                    <a
                      href={`https://wa.me/${selectedMember.contact.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rdr-btn-ghost"
                      style={{ fontSize: "0.75rem", padding: "8px 16px" }}
                    >
                      💬 WHATSAPP
                    </a>
                  )}
                  {selectedMember.contact.linkedin && (
                    <a
                      href={selectedMember.contact.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="rdr-btn-ghost"
                      style={{ fontSize: "0.75rem", padding: "8px 16px" }}
                    >
                      ↗ LINKEDIN
                    </a>
                  )}
                </div>
              ) : (
                <div style={{ paddingTop: "14px", borderTop: "1px solid #221416" }}>
                  <a
                    href="mailto:hacksprint.official@gmail.com"
                    className="rdr-btn-ghost"
                    style={{ fontSize: "0.75rem", padding: "8px 16px" }}
                  >
                    ✉ CONTACT VIA OFFICIAL DISPATCH
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
