"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "HOME", href: "/#home" },
  { label: "STORY", href: "/#story" },
  { label: "GAMEPLAY", href: "/#gameplay" },
  { label: "ONLINE", href: "/#online" },
  { label: "MEDIA", href: "/#media" },
  { label: "CREW", href: "/#crew" },
  { label: "SPONSORS", href: "/#sponsors" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setOpen(false);

    if (href.startsWith("/#")) {
      const hash = href.replace("/", "");
      if (pathname === "/") {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      router.push(href);
    } else {
      router.push(href);
    }
  };

  const searchResults = [
    { title: "Registration & Countdown", link: "/#registration", tag: "REGISTRATION" },
    { title: "Tracks & Problem Domains", link: "/#gameplay", tag: "GAMEPLAY" },
    { title: "Story & KAHE Department", link: "/#story", tag: "STORY" },
    { title: "Latest Trailers & Media", link: "/#media", tag: "MEDIA" },
    { title: "Meet The Organizing Crew", link: "/crew", tag: "CREW" },
    { title: "Why Sponsor Us (Prospectus)", link: "/why-sponsor-us", tag: "SPONSORS" },
    { title: "Past Events Gallery (2.0)", link: "/past-events", tag: "GALLERY" },
  ].filter((item) =>
    searchQuery ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          width: "100%",
          background: "#080708",
          borderBottom: "1px solid #1f1416",
        }}
      >
        {/* TOP MINI BAR (Outlaws for life / external links) */}
        <div
          style={{
            borderBottom: "1px solid #181112",
            background: "#050404",
            padding: "5px 24px",
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            fontFamily: "'Oswald', sans-serif",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#8c857e",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#d8d4cc", fontWeight: 700 }}>HACKERS FOR</span>
            <span style={{ color: "#e51b24", fontWeight: 800 }}>LIFE.</span>
            <span style={{ color: "#3a2829", margin: "0 4px" }}>|</span>
            <span style={{ color: "#a8a29a", fontSize: "0.62rem" }}>INDIA&apos;S PREMIER STUDENT HACKATHON</span>
          </div>

          <div className="hidden md:flex" style={{ alignItems: "center", gap: "18px" }}>
            <a
              href="https://kahedu.edu.in"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#99928a",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f1ea")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#99928a")}
            >
              KAHE CSE ↗
            </a>
            <a
              href="https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#99928a",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f1ea")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#99928a")}
            >
              SOCIAL CLUB ↗
            </a>
            <a
              href="mailto:hacksprint.official@gmail.com"
              style={{
                color: "#99928a",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f1ea")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#99928a")}
            >
              SUPPORT
            </a>
          </div>
        </div>

        {/* MAIN RDR2 NAVBAR */}
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/#home"
            onClick={(e) => handleClick(e, "/#home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <Image
              src="/hack.png"
              alt="HackSprint 3.0"
              width={44}
              height={44}
              style={{ objectFit: "contain" }}
              priority
            />
            <span
              style={{
                fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                fontSize: "1.75rem",
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
                fontSize: "1.75rem",
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

          {/* Center Navigation Links */}
          <nav
            className="hidden xl:flex"
            style={{
              alignItems: "center",
              gap: "28px",
            }}
          >
            {navLinks.map((item) => {
              const isActive = (item.href === "/#home" && pathname === "/") || pathname === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  style={{
                    position: "relative",
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: isActive ? "#ffffff" : "#a39d94",
                    textDecoration: "none",
                    padding: "8px 0",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#e51b24")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "#ffffff" : "#a39d94")}
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "#e51b24",
                        boxShadow: "0 0 8px #e51b24",
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "transparent",
                border: "none",
                color: "#b0a99f",
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: "6px 8px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f1ea")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#b0a99f")}
              aria-label="Search"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="hidden sm:inline">SEARCH</span>
            </button>

            {/* Login / Register */}
            <a
              href="#registration"
              onClick={(e) => handleClick(e, "/#registration")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "transparent",
                border: "none",
                color: "#b0a99f",
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "6px 8px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f1ea")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#b0a99f")}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="hidden sm:inline">REGISTER</span>
            </a>

            {/* Cart / Brochure */}
            <a
              href="/brochure.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "transparent",
                border: "1px solid #362225",
                color: "#e51b24",
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "6px 12px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e51b24";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = "#e51b24";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#e51b24";
                e.currentTarget.style.borderColor = "#362225";
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>BROCHURE</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              className="xl:hidden"
              onClick={() => setOpen(!open)}
              style={{
                background: "transparent",
                border: "none",
                color: "#f5f1ea",
                cursor: "pointer",
                padding: "6px",
              }}
              aria-label="Toggle Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
        </div>

        {/* MOBILE DRAWER */}
        {open && (
          <div
            style={{
              background: "#0c0a0b",
              borderTop: "1px solid #231618",
              padding: "20px 24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "1.1rem",
                  letterSpacing: "0.12em",
                  color: "#d4cebe",
                  textDecoration: "none",
                  padding: "10px 0",
                  borderBottom: "1px solid #1a1214",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{item.label}</span>
                <span style={{ color: "#e51b24" }}>&gt;</span>
              </a>
            ))}

            <a
              href="#registration"
              onClick={(e) => handleClick(e, "/#registration")}
              className="rdr-btn-red"
              style={{ marginTop: "14px", width: "100%", textAlign: "center" }}
            >
              REGISTER NOW &gt;
            </a>
          </div>
        )}
      </header>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(5, 4, 4, 0.88)",
            backdropFilter: "blur(12px)",
            display: "grid",
            placeItems: "center",
            padding: "20px",
          }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            style={{
              width: "min(640px, 100%)",
              background: "#110d0f",
              border: "1px solid #3d1f23",
              boxShadow: "0 25px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(229, 27, 36, 0.15)",
              padding: "28px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
              <div className="rdr-kicker">HACKSPRINT III ARCHIVE SEARCH</div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                style={{ background: "transparent", border: "none", color: "#8a8276", cursor: "pointer", fontSize: "1.2rem" }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderBottom: "2px solid #e51b24",
                paddingBottom: "8px",
                marginBottom: "20px",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e51b24" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracks, crew, timeline, registration..."
                autoFocus
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#f5f1ea",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "1.1rem",
                  letterSpacing: "0.06em",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "320px", overflowY: "auto" }}>
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <a
                    key={item.title}
                    href={item.link}
                    onClick={(e) => {
                      setSearchOpen(false);
                      handleClick(e, item.link);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                      background: "#171214",
                      border: "1px solid #281a1d",
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#e51b24";
                      e.currentTarget.style.background = "#211417";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#281a1d";
                      e.currentTarget.style.background = "#171214";
                    }}
                  >
                    <span style={{ color: "#f5f1ea", fontSize: "0.9rem", fontWeight: 600 }}>{item.title}</span>
                    <span
                      style={{
                        color: "#e51b24",
                        fontSize: "0.7rem",
                        fontFamily: "'Oswald', sans-serif",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {item.tag} &gt;
                    </span>
                  </a>
                ))
              ) : (
                <div style={{ color: "#8a8276", padding: "18px 0", textAlign: "center", fontSize: "0.88rem" }}>
                  No results found for &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
