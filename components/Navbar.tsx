"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const navLinks = [
  { label: "Home", href: "#home", icon: "⌂" },
  { label: "About", href: "#about", icon: "◎" },
  { label: "Highlights", href: "#highlights", icon: "✦" },
  { label: "Crew", href: "#crew", icon: "♧" },
  { label: "Past Events", href: "#past-events", icon: "◷" },
  { label: "Sponsors", href: "#why-sponsor-us", icon: "◇" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setOpen(false);
    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: "16px",
        left: "50%",
        width: "calc(100% - 32px)",
        transform: "translateX(-50%)",
        zIndex: 100,
        maxWidth: "1120px",
        background: "rgba(17,17,17,0.9)",
        backdropFilter: "blur(16px)",
        border: "1px solid #303030",
        borderRadius: "999px",
        boxShadow: "0 14px 35px #00000055",
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "7px 10px 7px 16px",
          minHeight: "58px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(event) => handleClick(event, "#home")}
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "9px", paddingRight: "14px" }}
        >
          <Image
            src="/logo.png"
            alt="HACKSPRINT 3.0"
            width={42}
            height={42}
            style={{ width: "42px", height: "42px", objectFit: "contain" }}
          />
          <span style={{ fontWeight: 900, fontSize: "0.9rem", letterSpacing: "-0.03em" }}>
            <span style={{ color: "#2d8cff" }}>HACKSPRINT</span>
            <span style={{ color: "#d4ff00", marginLeft: "4px" }}>3.0</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex" style={{ gap: "2px", alignItems: "center", flex: 1, justifyContent: "center" }}>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(event) => handleClick(event, l.href)}
              style={{
                display: "flex",
                minWidth: "68px",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                padding: "7px 8px",
                fontSize: "0.68rem",
                fontWeight: 600,
                color: "#999",
                textDecoration: "none",
                borderRadius: "999px",
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
              <span style={{ color: l.label === "Home" ? "#d4ff00" : "#aaa", fontSize: "1.05rem", lineHeight: 1 }}>{l.icon}</span>
              {l.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex" style={{ gap: "7px", alignItems: "center" }}>
          <a
            href="#contact"
            onClick={(event) => handleClick(event, "#contact")}
            style={{
              padding: "10px 15px",
              border: "1px solid #d4ff00",
              borderRadius: "100px",
              color: "#fff",
              fontSize: "0.72rem",
              fontWeight: 800,
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
              width: "34px",
              height: "34px",
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
        <div style={{ background: "#111", padding: "20px 24px 28px", borderTop: "1px solid #1a1a1a", borderRadius: "0 0 24px 24px" }}>
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
