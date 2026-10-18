"use client";

import Image from "next/image";

interface ContactInfo {
  phone?: string;
  whatsapp?: string;
  linkedin?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  detail: string;
  tagRole: string;
  tagYear: string;
  bio: string;
  image?: string;
  initials: string;
  isTba?: boolean;
  contact?: ContactInfo;
}

const conveners = [
  {
    name: "Dr. R. Santhosh",
    role: "Head of Department",
    department: "Computer Science and Engineering",
  },
  {
    name: "Ramya",
    role: "Assistant Professor",
    department: "Department of Computer Science and Engineering",
  },
];

const organizers: TeamMember[] = [
  {
    id: "surya",
    name: "BALA SURYA S",
    role: "Lead Organizer · HackSprint 2.0 & 3.0",
    detail: "Final Year · Computer Science and Engineering",
    tagRole: "LEAD ORGANIZER",
    tagYear: "FINAL YEAR · CSE",
    bio: "Spearheading the overarching vision, platform architecture, ecosystem sponsorships, and builder experience for HackSprint.",
    image: "/surya.png",
    initials: "BS",
    contact: {
      phone: "9597075831",
      whatsapp: "9597075831",
      linkedin: "https://www.linkedin.com/in/balasurya06/",
    },
  },
  {
    id: "deepa",
    name: "DEEPA",
    role: "Organizer · HackSprint 3.0",
    detail: "Coordinator · HackSprint 2.0 · Third Year · CSE",
    tagRole: "ORGANIZER",
    tagYear: "THIRD YEAR · CSE",
    bio: "Spearheading operations, track scheduling, on-ground execution, and seamless participant engagement across all 24 hours.",
    initials: "D",
  },
  {
    id: "kavinya",
    name: "KAVINYA",
    role: "Organizer · HackSprint 3.0",
    detail: "Coordinator · HackSprint 2.0 · Third Year · CSE",
    tagRole: "ORGANIZER",
    tagYear: "THIRD YEAR · CSE",
    bio: "Directing attendee outreach, judge and mentor relations, community partnerships, and stage coordination.",
    initials: "K",
  },
];

const coordinators: TeamMember[] = [
  {
    id: "vishal",
    name: "VISHAL",
    role: "Student Coordinator · HackSprint 3.0",
    detail: "Second Year · Computer Science and Engineering",
    tagRole: "COORDINATOR",
    tagYear: "SECOND YEAR · CSE",
    bio: "Facilitating on-ground technical assistance, participant logistics, track mentoring support, and operational flow.",
    initials: "V",
  },
  {
    id: "sudharshan",
    name: "SUDHARSHAN",
    role: "Student Coordinator · HackSprint 3.0",
    detail: "Second Year · Computer Science and Engineering",
    tagRole: "COORDINATOR",
    tagYear: "SECOND YEAR · CSE",
    bio: "Managing attendee support, campus outreach, registration flow, and hardware track arrangements.",
    initials: "S",
  },
  {
    id: "coord-3",
    name: "COORDINATOR",
    role: "Student Coordinator · HackSprint 3.0",
    detail: "Second Year · Computer Science and Engineering",
    tagRole: "COORDINATOR",
    tagYear: "SECOND YEAR · CSE",
    bio: "Second Year student coordinator joining the HackSprint 3.0 organizing force. Profile reveal coming soon.",
    initials: "HS",
    isTba: true,
  },
  {
    id: "coord-4",
    name: "COORDINATOR",
    role: "Student Coordinator · HackSprint 3.0",
    detail: "Second Year · Computer Science and Engineering",
    tagRole: "COORDINATOR",
    tagYear: "SECOND YEAR · CSE",
    bio: "Second Year student coordinator joining the HackSprint 3.0 organizing force. Profile reveal coming soon.",
    initials: "HS",
    isTba: true,
  },
];

function SilhouetteAvatar({ initials, isTba }: { initials: string; isTba?: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "160px",
          height: "210px",
          display: "block",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.8))",
        }}
      >
        <defs>
          <radialGradient id={`glow-${initials}`} cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#d4ff00" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#d4ff00" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`suit-${initials}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#222222" />
            <stop offset="60%" stopColor="#151515" />
            <stop offset="100%" stopColor="#0d0d0d" />
          </linearGradient>
          <linearGradient id={`rim-${initials}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4ff00" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#d4ff00" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00c2ff" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Ambient Glow & Target Rings */}
        <circle cx="100" cy="95" r="72" fill={`url(#glow-${initials})`} />
        <circle cx="100" cy="95" r="62" stroke="#d4ff00" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.25" />
        <circle cx="100" cy="95" r="45" stroke="#ffffff" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.15" />

        {/* Head */}
        <ellipse cx="100" cy="62" rx="22" ry="29" fill={`url(#suit-${initials})`} stroke={`url(#rim-${initials})`} strokeWidth="1.2" />

        {/* Neck */}
        <path d="M 93 88 L 93 104 L 107 104 L 107 88 Z" fill="#151515" />

        {/* Torso & Shoulders */}
        <path
          d="M 42 240 L 48 145 C 52 124 66 109 87 105 L 100 103 L 113 105 C 134 109 148 124 152 145 L 158 240 Z"
          fill={`url(#suit-${initials})`}
          stroke={`url(#rim-${initials})`}
          strokeWidth="1.2"
        />

        {/* Collar V lines */}
        <path d="M 88 106 L 100 134 L 112 106" stroke="#d4ff00" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M 100 134 L 100 185" stroke="#d4ff00" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.3" />

        {/* Chest Hexagon Badge */}
        <polygon
          points="100,140 119,151 119,173 100,184 81,173 81,151"
          fill="#101010"
          stroke="#d4ff00"
          strokeWidth="1.3"
          filter="drop-shadow(0 0 6px rgba(212, 255, 0, 0.4))"
        />

        {/* Initials Text */}
        <text
          x="100"
          y="167"
          textAnchor="middle"
          fill="#d4ff00"
          fontSize={isTba ? "11" : "13"}
          fontWeight="900"
          letterSpacing="0.04em"
          fontFamily="system-ui, sans-serif"
        >
          {initials}
        </text>
      </svg>
    </div>
  );
}

function CrewCard({ member }: { member: TeamMember }) {
  const slashId = `card-slash-${member.id}`;

  return (
    <article
      className="crew-member-card"
      style={{
        background: "transparent",
        border: "none",
        borderRadius: "0",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Upper Figure Section */}
      <div
        style={{
          position: "relative",
          height: "250px",
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          background: "transparent",
          overflow: "hidden",
        }}
      >
        {/* Clipped photo area */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 24px), 0 100%)",
          }}
        >
          {member.image ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Image
                src={member.image}
                alt={`${member.name} - HackSprint 3.0`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{
                  objectFit: "contain",
                  objectPosition: "center bottom",
                  filter: "contrast(1.05) drop-shadow(0 12px 24px rgba(0,0,0,0.85))",
                }}
                priority={member.id === "surya"}
              />
            </div>
          ) : (
            <SilhouetteAvatar initials={member.initials} isTba={member.isTba} />
          )}
        </div>

        {/* Small floating role tag in upper right (matching reference image) */}
        <div
          style={{
            position: "absolute",
            right: "12px",
            top: "34%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "2px",
            zIndex: 4,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: "0.58rem",
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#d4ff00",
              background: "rgba(10, 10, 10, 0.88)",
              padding: "2px 7px",
              borderRadius: "4px",
              borderLeft: "2px solid #d4ff00",
              backdropFilter: "blur(6px)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
            }}
          >
            {member.tagRole}
          </span>
          <span
            style={{
              fontSize: "0.52rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#777777",
            }}
          >
            {member.tagYear}
          </span>
        </div>
      </div>

      {/* Controlled Diagonal Slash Line (matching reference image) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "26px",
          marginTop: "-26px",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <svg
          viewBox="0 0 300 26"
          preserveAspectRatio="none"
          style={{
            width: "100%",
            height: "26px",
            display: "block",
            overflow: "visible",
          }}
        >
          <defs>
            <linearGradient id={slashId} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4ff00" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#d4ff00" stopOpacity="0.5" />
              <stop offset="90%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <filter id={`glow-${slashId}`}>
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <line
            x1="0"
            y1="25"
            x2="300"
            y2="1"
            stroke={`url(#${slashId})`}
            strokeWidth="2"
            strokeLinecap="round"
            filter={`url(#glow-${slashId})`}
          />
        </svg>
      </div>

      {/* Card Info Body */}
      <div
        style={{
          padding: "16px 2px 20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          position: "relative",
          zIndex: 6,
        }}
      >
        {member.isTba && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.6rem",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#d4ff00",
              background: "rgba(212, 255, 0, 0.08)",
              border: "1px dashed rgba(212, 255, 0, 0.4)",
              padding: "2px 8px",
              borderRadius: "999px",
              width: "fit-content",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: "#d4ff00",
                display: "inline-block",
                boxShadow: "0 0 6px #d4ff00",
              }}
            />
            Announcing Soon
          </div>
        )}

        <h3
          className="crew-card-name"
          style={{
            color: "#d4ff00",
            fontSize: "1.22rem",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            lineHeight: 1.15,
            margin: "0 0 5px 0",
            transition: "color 0.2s ease, text-shadow 0.2s ease",
          }}
        >
          {member.name}
        </h3>

        <p style={{ color: "#ffffff", fontSize: "0.74rem", fontWeight: 700, margin: "0 0 2px 0", lineHeight: 1.3 }}>
          {member.role}
        </p>

        <p style={{ color: "#777777", fontSize: "0.68rem", lineHeight: 1.35, margin: "0 0 10px 0" }}>
          {member.detail}
        </p>

        <p style={{ color: "#999999", fontSize: "0.76rem", lineHeight: 1.55, margin: "0 0 14px 0", flex: 1 }}>
          {member.bio}
        </p>

        {/* Contact Links */}
        {member.contact && (
          <div
            style={{
              display: "flex",
              gap: "7px",
              alignItems: "center",
              flexWrap: "wrap",
              paddingTop: "10px",
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            {member.contact.phone && (
              <a
                href={`tel:${member.contact.phone}`}
                className="crew-pill-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "5px 11px",
                  borderRadius: "999px",
                  background: "#181818",
                  border: "1px solid #2c2c2c",
                  color: "#cccccc",
                  fontSize: "0.66rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                aria-label={`Call ${member.name}`}
              >
                <span>📞</span> Call
              </a>
            )}
            {member.contact.whatsapp && (
              <a
                href={`https://wa.me/${member.contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="crew-pill-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "5px 11px",
                  borderRadius: "999px",
                  background: "#181818",
                  border: "1px solid #2c2c2c",
                  color: "#cccccc",
                  fontSize: "0.66rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                aria-label={`WhatsApp ${member.name}`}
              >
                <span>💬</span> WhatsApp
              </a>
            )}
            {member.contact.linkedin && (
              <a
                href={member.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="crew-pill-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "5px 11px",
                  borderRadius: "999px",
                  background: "#181818",
                  border: "1px solid #2c2c2c",
                  color: "#cccccc",
                  fontSize: "0.66rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                aria-label={`${member.name} LinkedIn Profile`}
              >
                <span>↗</span> LinkedIn
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function CrewPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#ffffff", padding: "110px 24px 100px" }}>
      <div style={{ maxWidth: "1220px", margin: "0 auto" }}>
        {/* Responsive and hover styles */}
        <style>{`
          .crew-member-card:hover {
            transform: translateY(-6px);
          }
          .crew-member-card:hover .crew-card-name {
            color: #ffffff !important;
            text-shadow: 0 0 12px rgba(212, 255, 0, 0.4) !important;
          }
          .crew-pill-btn:hover {
            background: #d4ff00 !important;
            color: #0a0a0a !important;
            transform: translateY(-2px);
          }
          .crew-pill-link:hover {
            background: rgba(212, 255, 0, 0.1) !important;
            border-color: #d4ff00 !important;
            color: #d4ff00 !important;
            transform: translateY(-1px);
          }
          @media (max-width: 900px) {
            .crew-header-box {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 24px !important;
              margin-bottom: 40px !important;
            }
            .crew-header-slash-col {
              display: none !important;
            }
            .crew-organizers-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
            .crew-coordinators-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
            .crew-conveners-grid {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 600px) {
            .crew-organizers-grid,
            .crew-coordinators-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* ── HEADER WITH SIGNATURE DIAGONAL SLASH ── */}
        <header
          className="crew-header-box"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "36px",
            marginBottom: "60px",
          }}
        >
          {/* Left Column: Meet the crew */}
          <div style={{ flex: "1 1 45%" }}>
            <p
              style={{
                color: "#d4ff00",
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
              Meet the <span style={{ color: "#d4ff00" }}>crew</span>.
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
            <svg
              viewBox="0 0 42 115"
              style={{
                width: "42px",
                height: "115px",
                display: "block",
                overflow: "visible",
              }}
            >
              <defs>
                <linearGradient id="headerMainSlash" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d4ff00" stopOpacity="0.1" />
                  <stop offset="45%" stopColor="#d4ff00" stopOpacity="0.95" />
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

          {/* Right Column: Exact user intro & button */}
          <div style={{ flex: "1 1 50%" }}>
            <p
              style={{
                color: "#888888",
                fontSize: "0.95rem",
                lineHeight: 1.7,
                maxWidth: "460px",
                marginBottom: "20px",
              }}
            >
              The organizers, builders, and community leaders creating a space where ideas become real-world projects.
            </p>
            <a
              href="#crew-profiles"
              className="crew-pill-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 20px",
                border: "1px solid #d4ff00",
                borderRadius: "999px",
                color: "#d4ff00",
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

        {/* ── CONVENERS SECTION (CLEAN, NO CONTAINER/CARD BORDERS) ── */}
        <section aria-labelledby="conveners-title" style={{ marginBottom: "64px" }}>
          <p
            id="conveners-title"
            style={{
              color: "#d4ff00",
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
              gap: "24px",
            }}
          >
            {conveners.map((convener) => (
              <article
                key={convener.name}
                style={{
                  borderTop: "1px solid #d4ff00",
                  borderBottom: "1px solid #222222",
                  padding: "22px 0",
                  background: "transparent",
                }}
              >
                <h2 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.03em", margin: 0 }}>
                  {convener.name}
                </h2>
                <p style={{ color: "#d4ff00", fontSize: "0.78rem", fontWeight: 700, marginTop: "8px", marginBottom: "4px" }}>
                  {convener.role}
                </p>
                <p style={{ color: "#777777", fontSize: "0.82rem", lineHeight: 1.5, margin: 0 }}>
                  {convener.department}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── TEAM PROFILES CONTAINER ── */}
        <div id="crew-profiles">
          {/* ── 1ST LINE: 3 ORGANIZERS ── */}
          <section id="crew-organizers" aria-labelledby="organizers-heading" style={{ marginBottom: "48px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                margin: "0 0 24px",
                paddingBottom: "10px",
                borderBottom: "1px solid #1a1a1a",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  background: "rgba(212, 255, 0, 0.08)",
                  border: "1px solid rgba(212, 255, 0, 0.25)",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  color: "#d4ff00",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    backgroundColor: "#d4ff00",
                    boxShadow: "0 0 6px #d4ff00",
                  }}
                />
                01 // ORGANIZING LEADERSHIP
              </div>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "linear-gradient(90deg, rgba(212, 255, 0, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)",
                }}
              />
              <span style={{ color: "#666666", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                3 Organizers
              </span>
            </div>

            <div
              className="crew-organizers-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "22px",
              }}
            >
              {organizers.map((member) => (
                <CrewCard key={member.id} member={member} />
              ))}
            </div>
          </section>

          {/* ── 2ND LINE: 4 COORDINATORS ── */}
          <section id="crew-coordinators" aria-labelledby="coordinators-heading">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                margin: "0 0 24px",
                paddingBottom: "10px",
                borderBottom: "1px solid #1a1a1a",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  background: "rgba(212, 255, 0, 0.08)",
                  border: "1px solid rgba(212, 255, 0, 0.25)",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  color: "#d4ff00",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    backgroundColor: "#d4ff00",
                    boxShadow: "0 0 6px #d4ff00",
                  }}
                />
                02 // STUDENT COORDINATORS · 2ND YEAR
              </div>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "linear-gradient(90deg, rgba(212, 255, 0, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)",
                }}
              />
              <span style={{ color: "#666666", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                4 Coordinators
              </span>
            </div>

            <div
              className="crew-coordinators-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "18px",
              }}
            >
              {coordinators.map((member) => (
                <CrewCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
