"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

/* ── Nav items ─────────────────────────────────────────────────── */
const navLinks = [
  { label: "Home", href: "#home", icon: HomeIcon },
  { label: "About", href: "#about", icon: AboutIcon },
  { label: "Highlights", href: "#highlights", icon: HighlightIcon },
  { label: "Timeline", href: "#timeline", icon: TimelineIcon },
  { label: "Crew", href: "#crew", icon: CrewIcon },
  { label: "Events", href: "#past-events", icon: EventsIcon },
  { label: "Sponsors", href: "#our-sponsors", icon: SponsorsIcon },
];

/* ── Partner logos ─────────────────────────────────────────────── */
const partnerLogos = [
  { src: "/Sponsor/kahe.png", alt: "KAHE", w: 48, h: 22 },
  { src: "/Sponsor/meta.png", alt: "Metaverse", w: 22, h: 22 },
  { src: "/Sponsor/incubation.png", alt: "Incubation", w: 48, h: 22 },
  { src: "/Sponsor/iic.png", alt: "IIC", w: 38, h: 22 },
  { src: "/Sponsor/dst.png", alt: "DST", w: 38, h: 22 },
];

/* ── SVG Icons ─────────────────────────────────────────────────── */
function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : "#6b5c62"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12L12 3l9 9" /><path d="M9 21V12h6v9" /><path d="M3 12v9h18v-9" />
    </svg>
  );
}
function AboutIcon({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#6b5c62";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3" /><path d="M6 21v-1a6 6 0 0 1 12 0v1" />
    </svg>
  );
}
function HighlightIcon({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#6b5c62";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function TimelineIcon({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#6b5c62";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function CrewIcon({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#6b5c62";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="17" cy="7" r="3" /><path d="M17 21v-2a4 4 0 0 0-1-.25" />
    </svg>
  );
}
function EventsIcon({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#6b5c62";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function SponsorsIcon({ active }: { active: boolean }) {
  const c = active ? "#fff" : "#6b5c62";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ── Main component ────────────────────────────────────────────── */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const router = useRouter();

  /* Track active section on scroll */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setOpen(false);
    setActive(href);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else router.push(`/${href}`);
    } else {
      router.push(href);
    }
  };

  return (
    <>
      {/* ── DESKTOP FLOATING PILL ──────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className="hidden lg:flex"
        style={{
          position: "fixed",
          top: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          /* outer pill */
          background: "linear-gradient(160deg, #1a0e14 0%, #120a0d 100%)",
          borderRadius: "999px",
          padding: "6px 6px",
          display: "flex",
          alignItems: "center",
          gap: "2px",
          boxShadow:
            "0 0 0 1px #2a1820, 0 8px 32px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.5)",
        }}
      >
        {/* Brand pill (always dark-filled like the active "Home" in reference) */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "3px",
            padding: "6px 10px",
            borderRadius: "0",
            background: "transparent",
            boxShadow: "none",
            textDecoration: "none",
            minWidth: "72px",
            flexShrink: 0,
          }}
        >
          <Image
            src="/3.0.png"
            alt="HACKSPRINT 3.0"
            width={28}
            height={28}
            style={{ objectFit: "contain", width: "28px", height: "28px" }}
          />
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: "#e51b24",
              textTransform: "uppercase",
              fontFamily: "'Oswald',sans-serif",
              lineHeight: 1,
            }}
          >
            HACKSPRINT
          </span>
        </a>

        {/* Thin divider */}
        <div
          aria-hidden="true"
          style={{
            width: "1px",
            height: "30px",
            background: "linear-gradient(180deg, transparent, #2a1820, transparent)",
            margin: "0 4px",
          }}
        />

        {/* Nav items */}
        {navLinks.map((link) => {
          const isActive = active === link.href;
          const Icon = link.icon;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                padding: "10px 14px",
                borderRadius: "999px",
                textDecoration: "none",
                minWidth: "62px",
                transition: "background 0.22s, box-shadow 0.22s",
                background: isActive
                  ? "linear-gradient(160deg, #2d0e12 0%, #1e0a0e 100%)"
                  : "transparent",
                boxShadow: isActive
                  ? "0 2px 12px rgba(229,27,36,0.22), inset 0 1px 0 rgba(229,27,36,0.15), 0 0 0 1px #3d1820"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(229,27,36,0.06)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <Icon active={isActive} />
              <span
                style={{
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: isActive ? "#f5f1ea" : "#6b5c62",
                  fontFamily: "'Oswald',sans-serif",
                  lineHeight: 1,
                  transition: "color 0.22s",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </span>
            </a>
          );
        })}

      </nav>
      {/* ── MOBILE NAV ─────────────────────────────────────────── */}
      <nav
        aria-label="Mobile navigation"
        className="lg:hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "#100b0d",
          borderBottom: "1px solid #2a1820",
          boxShadow: "0 2px 16px rgba(0,0,0,0.7)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
          }}
        >
          <a
            href="#home"
            onClick={(e) => handleClick(e, "#home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <Image
              src="/3.0.png"
              alt="HACKSPRINT 3.0"
              width={32}
              height={32}
              style={{ objectFit: "contain" }}
            />
            <span
              style={{
                fontFamily: "'Oswald',sans-serif",
                fontSize: "1rem",
                fontWeight: 800,
                color: "#f5f1ea",
              }}
            >
              HACK<span style={{ color: "#e51b24" }}>SPRINT</span>
            </span>
          </a>

          <button
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "none",
              color: "#f5f1ea",
              cursor: "pointer",
              padding: "6px",
            }}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div
            style={{
              background: "#0d0810",
              borderTop: "1px solid #2a1820",
              padding: "16px 20px 24px",
            }}
          >
            {navLinks.map((l) => {
              const Icon = l.icon;
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleClick(e, l.href)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 10px",
                    borderRadius: "10px",
                    marginBottom: "4px",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontFamily: "'Oswald',sans-serif",
                    color: isActive ? "#f5f1ea" : "#6b5c62",
                    textDecoration: "none",
                    background: isActive
                      ? "rgba(229,27,36,0.1)"
                      : "transparent",
                  }}
                >
                  <Icon active={isActive} />
                  {l.label}
                </a>
              );
            })}

            {/* Mobile partner logos */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                alignItems: "center",
                padding: "14px 10px 4px",
                borderTop: "1px solid #2a1820",
                marginTop: "8px",
              }}
            >
              {partnerLogos.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  style={{
                    objectFit: "contain",
                    maxHeight: `${logo.h}px`,
                    opacity: 0.75,
                    filter: "brightness(1.1)",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer so content starts below the mobile fixed navbar */}
      <div className="lg:hidden" style={{ height: "58px" }} aria-hidden="true" />
    </>
  );
}
