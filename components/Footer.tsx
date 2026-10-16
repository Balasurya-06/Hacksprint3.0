"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#080808", borderTop: "1px solid #1a1a1a" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 32px 32px" }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10" style={{ marginBottom: "48px" }}>
          {/* Brand */}
          <div className="md:col-span-2">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <img
                src="/logo.png"
                alt="HACKSPRINT"
                style={{
                  height: "44px",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
              <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#fff" }}>HACKSPRINT 3.0</span>
            </div>
            <p style={{ color: "#555", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "280px" }}>
              The most electrifying hackathon of the year. Build, compete, and push the boundaries of what&apos;s possible.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              {["TW", "IG", "DC", "YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    width: "36px",
                    height: "36px",
                    border: "1px solid #222",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    color: "#555",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#d4ff00";
                    e.currentTarget.style.color = "#d4ff00";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#222";
                    e.currentTarget.style.color = "#555";
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", marginBottom: "16px" }}>Quick Links</h4>
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Highlights", href: "/highlights" },
              { label: "Crew", href: "/crew" },
              { label: "Timeline", href: "/timeline" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ display: "block", color: "#555", fontSize: "0.875rem", padding: "4px 0", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#d4ff00")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", marginBottom: "16px" }}>More</h4>
            {[
              { label: "Sponsors", href: "/sponsors" },
              { label: "Prizes & Rewards", href: "/prizes" },
              { label: "Past Events", href: "/past-events" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ display: "block", color: "#555", fontSize: "0.875rem", padding: "4px 0", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#d4ff00")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ color: "#333", fontSize: "0.8rem" }}>© 2026 HACKSPRINT. All rights reserved.</p>
          <p style={{ color: "#333", fontSize: "0.8rem" }}>Built by hackers, for hackers.</p>
        </div>
      </div>
    </footer>
  );
}
