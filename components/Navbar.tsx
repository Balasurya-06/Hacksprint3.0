"use client";
import { useState } from "react";
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Highlights", href: "#highlights" },
  { label: "Timeline", href: "#timeline" },
  { label: "Prizes", href: "#prizes" },
  { label: "Crew", href: "#crew" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Past Events", href: "#past-events" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #1a1a1a",
      }}
    >
      <div
        style={{
          maxWidth: "880px",
          margin: "0 auto",
          padding: "0 32px",
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(event) => handleClick(event, "#home")}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}
        >
          <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#d4ff00", color: "#0a0a0a", display: "grid", placeItems: "center", fontSize: "0.65rem", fontWeight: 900 }}>HS</span>
          <span style={{ fontWeight: 800, fontSize: "1rem", color: "#fff", letterSpacing: "-0.02em" }}>
            HACKSPRINT
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex" style={{ gap: "4px", alignItems: "center" }}>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(event) => handleClick(event, l.href)}
              style={{
                padding: "8px 12px",
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "#999",
                textDecoration: "none",
                borderRadius: "8px",
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "#1a1a1a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#999";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex" style={{ gap: "12px", alignItems: "center" }}>
          <a
            href="#contact"
            onClick={(event) => handleClick(event, "#contact")}
            style={{
              padding: "9px 20px",
              border: "1px solid #333",
              borderRadius: "100px",
              color: "#fff",
              fontSize: "0.8rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#d4ff00";
              e.currentTarget.style.color = "#d4ff00";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#333";
              e.currentTarget.style.color = "#fff";
            }}
          >
            Register Now
          </a>
          <a
            href="#contact"
            onClick={(event) => handleClick(event, "#contact")}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#d4ff00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0a0a",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.75rem",
            }}
          >
            →
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "4px" }}
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

      {/* Mobile drawer */}
      {open && (
        <div style={{ background: "#111", padding: "20px 32px 28px", borderTop: "1px solid #1a1a1a" }}>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(event) => handleClick(event, l.href)}
              style={{
                display: "block",
                padding: "12px 0",
                fontSize: "1rem",
                fontWeight: 500,
                color: "#aaa",
                textDecoration: "none",
                borderBottom: "1px solid #1a1a1a",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(event) => handleClick(event, "#contact")}
            style={{
              display: "block",
              marginTop: "20px",
              padding: "12px 0",
              textAlign: "center",
              background: "#d4ff00",
              color: "#0a0a0a",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Register Now
          </a>
        </div>
      )}
    </nav>
  );
}
