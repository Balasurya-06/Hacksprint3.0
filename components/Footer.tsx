"use client";

import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Register Now", href: "/#contact" },
  { label: "About HackSprint", href: "/about" },
  { label: "Highlights", href: "/highlights" },
  { label: "Meet the Crew", href: "/crew" },
  { label: "Past Events", href: "/past-events" },
  { label: "Why Sponsor Us?", href: "/why-sponsor-us" },
];

function ArrowIcon() {
  return <span aria-hidden="true" style={{ color: "#888", marginRight: "8px" }}>›</span>;
}

export default function Footer() {
  return (
    <footer style={{ background: "#030303", borderTop: "1px solid #171717", color: "#fff" }}>
      <div className="footer-grid" style={{ maxWidth: "1180px", margin: "0 auto", padding: "64px 32px 52px", display: "grid", gridTemplateColumns: "1.3fr 1fr 0.9fr", gap: "64px" }}>
        <div>
          <Image src="/logo.png" alt="HACKSPRINT 3.0" width={120} height={120} style={{ width: "120px", height: "120px", objectFit: "contain", objectPosition: "left center" }} />
          <div style={{ width: "92px", height: "3px", marginTop: "18px", background: "linear-gradient(90deg, #ff00e5 0 50%, #00d9ff 50%)" }} />
          <p style={{ color: "#8b8b9a", fontFamily: "monospace", fontSize: "0.78rem", lineHeight: 1.8, marginTop: "20px", maxWidth: "320px" }}>
            Unleash innovation. Code your dreams.
            <br />
            HackSprint 3.0 — KAHE.
          </p>
          <div style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
            {[
              { label: "in", href: "https://www.linkedin.com/in/balasurya06/", name: "LinkedIn" },
              { label: "wa", href: "https://wa.me/919597075831", name: "WhatsApp" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                style={{ width: "42px", height: "42px", display: "grid", placeItems: "center", border: "1px solid #28282d", borderRadius: "7px", color: "#fff", fontSize: "1rem", fontWeight: 800, textDecoration: "none", fontFamily: "Arial, sans-serif" }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.borderColor = "#d4ff00";
                  event.currentTarget.style.color = "#d4ff00";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.borderColor = "#28282d";
                  event.currentTarget.style.color = "#fff";
                }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ color: "#00ff20", fontSize: "0.78rem", fontWeight: 900, letterSpacing: "0.04em", marginBottom: "25px", textTransform: "uppercase" }}>
            <span style={{ fontSize: "1.65rem", lineHeight: 0, verticalAlign: "-0.2em", marginRight: "9px" }}>/</span>
            Contact Us
          </h2>
          <div style={{ display: "grid", gap: "17px", fontFamily: "monospace", fontSize: "0.77rem" }}>
            <a href="tel:+919597075831" style={{ color: "#9d9dac", textDecoration: "none" }}>
              <span style={{ color: "#00d9ff", marginRight: "10px" }}>☎</span>
              Bala Surya: <strong style={{ color: "#fff" }}>95970 75831</strong>
            </a>
            <a href="mailto:hacksprint.official@gmail.com" style={{ color: "#ff00e5", textDecoration: "none" }}>
              <span style={{ marginRight: "10px" }}>✉</span>
              hacksprint.official@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/balasurya06/" target="_blank" rel="noreferrer" style={{ color: "#9d9dac", textDecoration: "none" }}>
              <span style={{ color: "#00d9ff", marginRight: "10px" }}>in</span>
              Connect on LinkedIn
            </a>
          </div>
        </div>

        <div>
          <h2 style={{ color: "#ff00e5", fontSize: "0.78rem", fontWeight: 900, letterSpacing: "0.04em", marginBottom: "25px", textTransform: "uppercase" }}>
            <span style={{ fontSize: "1.65rem", lineHeight: 0, verticalAlign: "-0.2em", marginRight: "9px" }}>/</span>
            Quick Links
          </h2>
          <nav style={{ display: "grid", gap: "13px" }}>
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: "#8b8b9a", fontFamily: "monospace", fontSize: "0.78rem", textDecoration: "none" }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = "#8b8b9a";
                }}
              >
                <ArrowIcon />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #171717", textAlign: "center", padding: "28px 32px 24px", color: "#555565", fontFamily: "monospace", fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
        © 2026 <span style={{ color: "#ff00e5", fontWeight: 800 }}>HACKSPRINT 3.0</span> {"//"} All rights reserved
        <p style={{ color: "#4f4f5c", fontSize: "0.62rem", letterSpacing: "0.04em", marginTop: "12px", textTransform: "none" }}>
          Made with <span style={{ color: "#ff00e5" }}>♥</span> by the Metaverse Students Association
        </p>
      </div>
    </footer>
  );
}
