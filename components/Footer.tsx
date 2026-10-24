"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      style={{
        background: "#080708",
        borderTop: "1px solid #1f1416",
        color: "#c2bcaf",
        padding: "68px 32px 40px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
        }}
      >
        {/* MAIN 4-COLUMN CONTENT GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "48px 32px",
            paddingBottom: "56px",
            borderBottom: "1px solid #1a1214",
          }}
        >
          {/* LEFT COLUMN: BRAND + RATING BADGE */}
          <div style={{ maxWidth: "340px" }}>
            <Link
              href="/#home"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                  fontSize: "2.1rem",
                  letterSpacing: "0.06em",
                  color: "#f5f1ea",
                  lineHeight: 1,
                  textTransform: "uppercase",
                }}
              >
                HACKSPRINT
              </span>
              <span
                style={{
                  fontFamily: "'Cinzel', 'Bebas Neue', serif",
                  fontSize: "2.1rem",
                  fontWeight: 900,
                  letterSpacing: "0.02em",
                  color: "#e51b24",
                  lineHeight: 1,
                  textShadow: "0 0 16px rgba(229, 27, 36, 0.4)",
                }}
              >
                III
              </span>
            </Link>

            {/* ESRB-STYLE HACKER RATING BADGE */}
            <div
              style={{
                display: "inline-flex",
                border: "1.5px solid #d4cebe",
                padding: "8px 12px",
                gap: "14px",
                alignItems: "center",
                background: "#050404",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  borderRight: "1.5px solid #d4cebe",
                  paddingRight: "12px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "2.2rem",
                    fontWeight: 900,
                    lineHeight: 1,
                    display: "block",
                    color: "#f5f1ea",
                  }}
                >
                  H
                </span>
                <span
                  style={{
                    fontSize: "0.5rem",
                    letterSpacing: "0.08em",
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    color: "#8a8276",
                    display: "block",
                    marginTop: "2px",
                  }}
                >
                  RATED
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.62rem",
                  lineHeight: 1.45,
                  color: "#d4cebe",
                  fontFamily: "'Oswald', sans-serif",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                <div>Blood, Sweat and Code</div>
                <div>Intense Brainstorming</div>
                <div>Sleep Deprivation</div>
                <div>Strong Logic Required</div>
                <div>Heavy Doses of Caffeine</div>
              </div>
            </div>

            {/* SOCIAL ICONS (Rockstar style) */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {[
                {
                  label: "WhatsApp",
                  href: "https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K",
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/showcase/hacksprint3-0",
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  ),
                },
                {
                  label: "X (Twitter)",
                  href: "https://x.com/hacksprint3",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/hacksprint3.0",
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ),
                },
                {
                  label: "YouTube",
                  href: "https://youtube.com/@hacksprint",
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  style={{
                    color: "#8a8276",
                    transition: "color 0.2s, transform 0.2s",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#e51b24";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#8a8276";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: EVENT */}
          <div>
            <h3
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#f5f1ea",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              EVENT
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "The Story & Mission",        href: "/#story" },
                { label: "Challenge Tracks",           href: "/#online" },
                { label: "Timeline",                   href: "/#timeline" },
                { label: "Prizes & Bounties",          href: "/prizes" },
                { label: "Campus Venue & Map",         href: "/#venue" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    style={{
                      color: "#948e84",
                      fontSize: "0.82rem",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f1ea")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#948e84")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: SUPPORT */}
          <div>
            <h3
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#f5f1ea",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              SUPPORT
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Contact Coordinators",          href: "/#contact" },
                { label: "Call: +91 95970 75831",         href: "tel:+919597075831" },
                { label: "Email Us ↗",                    href: "mailto:hacksprint.official@gmail.com" },
                { label: "Download Brochure ↓",           href: "/pdf/HS3_Brochure.pdf" },
                { label: "Sponsorship Deck ↓",            href: "/pdf/HS3_SPONSORSHIP_PROPOSAL_FINAL .pdf" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      color: "#948e84",
                      fontSize: "0.82rem",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f1ea")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#948e84")}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: COMMUNITY */}
          <div>
            <h3
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#f5f1ea",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              COMMUNITY
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "WhatsApp Community ↗",       href: "https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K", external: true },
                { label: "Instagram ↗",                href: "https://www.instagram.com/hacksprint3.0", external: true },
                { label: "LinkedIn ↗",                 href: "https://www.linkedin.com/showcase/hacksprint3-0", external: true },
                { label: "Meet The Organizing Crew",   href: "/#crew", external: false },
                { label: "Department of CSE, KAHE ↗",  href: "https://kahedu.edu.in", external: true },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    style={{
                      color: "#948e84",
                      fontSize: "0.82rem",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f1ea")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#948e84")}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 5: NEWSLETTER */}
          <div>
            <h3
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#f5f1ea",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              NEWSLETTER
            </h3>
            <p style={{ color: "#8a8276", fontSize: "0.8rem", lineHeight: 1.5, marginBottom: "16px" }}>
              Get the latest tracks, bounties, and problem statement announcements straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", maxWidth: "280px" }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  background: "#141011",
                  border: "1px solid #2e1d20",
                  borderRight: "none",
                  padding: "10px 14px",
                  color: "#f5f1ea",
                  fontSize: "0.8rem",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                aria-label="Subscribe"
                style={{
                  background: "#cc1118",
                  border: "1px solid #cc1118",
                  color: "#ffffff",
                  padding: "0 16px",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e51b24")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#cc1118")}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
            {subscribed && (
              <p style={{ color: "#e51b24", fontSize: "0.75rem", marginTop: "8px", fontWeight: 600 }}>
                ✓ Subscribed to HackSprint Outlaw Dispatch
              </p>
            )}
          </div>
        </div>

        {/* BOTTOM ROW: COPYRIGHT + ROCKSTAR-STYLE EMBLEM */}
        <div
          style={{
            paddingTop: "28px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <p
            style={{
              color: "#6b655c",
              fontSize: "0.74rem",
              lineHeight: 1.6,
              maxWidth: "840px",
              margin: 0,
            }}
          >
            © 2026 HackSprint 3.0. Department of Computer Science &amp; Engineering, Karpagam Academy of Higher Education
            (KAHE), in association with the Metaverse Students Association. All trademarks and event assets are property of
            their respective owners.
          </p>

          {/* ROCKSTAR STYLE EMBLEM */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              border: "1.5px solid #d4cebe",
              borderRadius: "8px",
              background: "#080708",
              position: "relative",
            }}
            title="HackSprint Studio Emblem"
          >
            <span
              style={{
                fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                fontSize: "1.25rem",
                color: "#f5f1ea",
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              HS
            </span>
            <span
              style={{
                position: "absolute",
                bottom: "3px",
                right: "4px",
                color: "#e51b24",
                fontSize: "0.65rem",
                lineHeight: 1,
              }}
            >
              ★
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
