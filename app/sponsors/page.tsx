"use client";

import Image from "next/image";

/* ── Sponsor tiers — only confirmed sponsors listed ── */

const goldSponsors = [
  {
    name: "Devfolio",
    tagline: "Official Hackathon Platform",
    logo: "/Sponsor/_Dark.png",
    bg: "none",
    accent: "#3770ff",
    url: "https://devfolio.co",
  },
];

const silverSponsors: { name: string; tagline: string; accent: string }[] = [];
const bronzeSponsors: { name: string; tagline: string; accent: string }[] = [];

const coSponsors = [
  {
    name: "Adaption",
    tagline: "Official AI Partner",
    logo: "/Sponsor/Adaption_Logo.png",
    bg: "none",
    accent: "#7c3aed",
    url: "https://adaptionlabs.ai",
  },
  {
    name: "Eventopia",
    tagline: "Media Partner",
    logo: "/Sponsor/eventopia.png",
    bg: "none",
    accent: "#f59e0b",
    url: "https://eventopia.in/",
  },
];

const techEvalPartners = [
  {
    name: "TCS",
    tagline: "Technical & Evaluation Partner",
    logo: "/Sponsor/tcs.png",
    bg: "none",
    accent: "#e51b24",
    url: "https://www.tcs.com",
  },
];

const organizingPartners: { name: string; tagline: string; accent: string }[] = [];

/* ── Card ─────────────────────────────────────────────────────── */

interface LogoCard {
  name: string;
  tagline: string;
  logo?: string;
  bg?: string;
  accent: string;
  url?: string;
}

function SponsorCard({ card, size = "md" }: { card: LogoCard; size?: "lg" | "md" | "sm" }) {
  const height = size === "lg" ? "150px" : size === "md" ? "110px" : "88px";

  const content = (
    <div
      style={{
        background: "rgba(18,10,14,0.9)",
        border: "1px solid #281418",
        borderRadius: "12px",
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "20px 28px",
        transition: "all 0.25s ease",
        cursor: card.url ? "pointer" : "default",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = card.accent;
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.7), 0 0 20px ${card.accent}33`;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#281418";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.5)";
        e.currentTarget.style.transform = "none";
      }}
    >
      {/* top glow line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          right: "15%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${card.accent}77, transparent)`,
        }}
      />

      {card.logo ? (
        <div
          style={{
            ...(card.bg && card.bg !== "none"
              ? {
                  background: card.bg,
                  borderRadius: "8px",
                  padding: "10px 20px",
                }
              : { padding: "10px 20px" }),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={card.logo}
            alt={card.name === "Devfolio" ? "DEVFOLIO LOGO" : card.name}
            width={160}
            height={56}
            style={{ objectFit: "contain", maxHeight: "56px" }}
          />
        </div>
      ) : (
        <div
          style={{
            fontFamily: "'Bebas Neue', 'Oswald', 'Inter', sans-serif",
            fontSize: "1.5rem",
            fontWeight: 900,
            color: "#f5f1ea",
            letterSpacing: "0.04em",
            textAlign: "center",
          }}
        >
          {card.name}
        </div>
      )}

      <div
        style={{
          fontSize: "0.62rem",
          color: "#666",
          fontFamily: "'Inter', sans-serif",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        {card.tagline}
      </div>
    </div>
  );

  if (card.url) {
    return (
      <a
        href={card.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${card.name} website`}
        style={{ textDecoration: "none", display: "block" }}
      >
        {content}
      </a>
    );
  }

  return content;
}

/* ── Tier heading ─────────────────────────────────────────────── */

function TierHeading({ label, color, icon, count }: { label: string; color: string; icon: string; count: number }) {
  const isPartner = label.toLowerCase().includes("partner") || label.toLowerCase().includes("co-sponsors");
  const displayLabel = isPartner ? label.toUpperCase() : `${label.toUpperCase()} SPONSORS`;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "28px" }}>
      {/* lines + icon row */}
      <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "12px", marginBottom: "10px" }}>
        <div aria-hidden="true" style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${color}55)` }} />
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: `${color}1a`,
            border: `1.5px solid ${color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div aria-hidden="true" style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${color}55, transparent)` }} />
      </div>
      {/* label */}
      <div
        style={{
          fontFamily: "'Oswald', 'Inter', sans-serif",
          fontSize: "1rem",
          fontWeight: 800,
          color,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        {displayLabel}
      </div>
      {/* partner count */}
      <div style={{ fontSize: "0.6rem", color: "#444", fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "4px" }}>
        {count} {count === 1 ? "partner" : "partners"}
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */

export default function SponsorsPage() {
  const allTiers = [
    { label: "Technical & Evaluation Partner", color: "#e51b24", icon: "⚙️", sponsors: techEvalPartners },
    { label: "Gold", color: "#F5C518", icon: "★", sponsors: goldSponsors },
    { label: "Silver", color: "#C0C0C0", icon: "◆", sponsors: silverSponsors },
    { label: "Bronze", color: "#CD7F32", icon: "▲", sponsors: bronzeSponsors },
    { label: "Co-Sponsors", color: "#a855f7", icon: "🤝", sponsors: coSponsors },
    { label: "Organizing Partner", color: "#e51b24", icon: "🏛️", sponsors: organizingPartners },
  ];

  // only render tiers that have at least one sponsor
  const activeTiers = allTiers.filter((t) => t.sponsors.length > 0);

  return (
    <section
      aria-label="Our Sponsors"
      style={{
        background: "#070506",
        minHeight: "60vh",
        padding: "100px 24px 80px",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* dot-grid starfield */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, #ffffff0d 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* red glow at bottom */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "360px",
          background: "radial-gradient(ellipse at center, rgba(229,27,36,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: "980px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section heading */}
        <div style={{ marginBottom: "60px", textAlign: "center" }}>
          <p
            style={{
              color: "#e51b24",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "12px",
              fontFamily: "'Oswald', sans-serif",
            }}
          >
            HACKSPRINT 3.0 · NOVEMBER 2026
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 900,
              color: "#f5f1ea",
              lineHeight: 0.92,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              margin: "0 0 18px",
              textShadow: "3px 3px 0 #000, 6px 6px 0 #e51b24, 10px 10px 20px rgba(0,0,0,0.9)",
            }}
          >
            Our <span style={{ color: "#e51b24" }}>Sponsors</span>
          </h2>
          <p style={{ color: "#555", fontSize: "0.88rem", maxWidth: "480px", margin: "0 auto", lineHeight: 1.65 }}>
            The brands and organisations powering India&apos;s boldest student hackathon.
          </p>
        </div>

        {/* Sponsor tiers */}
        {activeTiers.map((tier, i) => (
          <div key={tier.label} style={{ marginBottom: i < activeTiers.length - 1 ? "52px" : "0" }}>
            <TierHeading label={tier.label} color={tier.color} icon={tier.icon} count={tier.sponsors.length} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
                maxWidth: tier.sponsors.length === 1 ? "340px" : "100%",
                margin: "0 auto",
              }}
            >
              {tier.sponsors.map((s) => (
                <SponsorCard key={s.name} card={s as LogoCard} size="lg" />
              ))}
            </div>
          </div>
        ))}

        {/* Empty state — shown when sponsors not yet announced */}
        {activeTiers.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ color: "#333", fontSize: "0.9rem", fontFamily: "'Inter', sans-serif" }}>
              Sponsors will be announced soon. Stay tuned!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
