"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ background: "#0a0a0a" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          paddingTop: "68px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "68px 32px 0",
          gap: "0",
          position: "relative",
        }}
      >
        {/* Left panel */}
        <div style={{ paddingTop: "60px", paddingBottom: "40px" }}>
          {/* small profile avatars */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
            {["#ff6b35", "#a855f7", "#06b6d4", "#f59e0b"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: c,
                  border: "2px solid #0a0a0a",
                  marginLeft: i === 0 ? "0" : "-10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {["A", "B", "C", "D"][i]}
              </div>
            ))}
            <span style={{ color: "#666", fontSize: "0.8rem", marginLeft: "8px" }}>500+ Participants</span>
          </div>

          <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: "8px" }}>
            Build and compete with the world&apos;s top hackers.
            <br />More than 20 unique challenge tracks.
          </p>

          <Link
            href="/highlights"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#d4ff00",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
              marginTop: "4px",
              borderBottom: "1px solid #d4ff0066",
              paddingBottom: "2px",
            }}
          >
            Explore All Tracks ↗
          </Link>

          {/* Avatar row repeat */}
          <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
            {["#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${c}, #000)`,
                  border: "1px solid #222",
                }}
              />
            ))}
          </div>
        </div>

        {/* Center hero headline — spans full width */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "100px",
            pointerEvents: "none",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#888", fontSize: "1rem", fontWeight: 400, marginBottom: "8px" }}>
            Create, Explore &amp; Compete
          </p>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.8rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: "600px",
            }}
          >
            The Ultimate<br />
            <span style={{ color: "#d4ff00" }}>Hackathon</span> Sprint
          </h1>

          {/* Floating badge */}
          <div
            style={{
              marginTop: "32px",
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              border: "1px solid #333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                background: "#d4ff00",
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
            />
            <span style={{ color: "#666", fontSize: "0.5rem", letterSpacing: "0.2em", marginTop: "6px" }}>
              SUPER • RARE • SPRINT •
            </span>
          </div>

          {/* Hero 3D placeholder character area */}
          <div
            style={{
              marginTop: "-80px",
              width: "300px",
              height: "340px",
              background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
              borderRadius: "20px 20px 0 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #1f1f1f",
              borderBottom: "none",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(circle at 50% 30%, #d4ff0015 0%, transparent 60%)",
              }}
            />
            <span
              style={{
                fontFamily: "Impact, sans-serif",
                fontSize: "6rem",
                fontWeight: 900,
                color: "#d4ff00",
                opacity: 0.15,
                letterSpacing: "-0.05em",
              }}
            >
              HS3
            </span>
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#d4ff00",
                borderRadius: "100px",
                padding: "6px 16px",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#0a0a0a",
                whiteSpace: "nowrap",
              }}
            >
              HACKSPRINT 3.0
            </div>
          </div>
        </div>

        {/* Right stats panel */}
        <div style={{ paddingTop: "100px", paddingBottom: "40px", textAlign: "right" }}>
          {[
            { value: "500+", label: "Active Hackers" },
            { value: "20+", label: "Challenge Tracks" },
            { value: "48h", label: "Sprint Duration" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                marginBottom: "28px",
                paddingBottom: "24px",
                borderBottom: i < 2 ? "1px solid #1a1a1a" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "2.8rem",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {s.value}
              </div>
              <div style={{ color: "#555", fontSize: "0.8rem", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEON STRIP — supported by ── */}
      <section style={{ background: "#d4ff00", padding: "40px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <p style={{ color: "#0a0a0a", fontSize: "0.8rem", fontWeight: 600, marginBottom: "6px" }}>Supported by</p>
          <div style={{ width: "40px", height: "2px", background: "#0a0a0a", marginBottom: "20px" }} />
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {["Ethereum", "Solana", "TypeScript", "React", "Next.js", "GitHub"].map((t) => (
              <div
                key={t}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  borderRadius: "100px",
                  border: "1.5px solid #0a0a0a",
                  background: "transparent",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#0a0a0a",
                }}
              >
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#0a0a0a", opacity: 0.15 }} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRENDING SECTION ── */}
      <section style={{ background: "#0a0a0a", padding: "80px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          {/* Header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "40px",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <p style={{ color: "#d4ff00", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", marginBottom: "6px" }}>
                Trending
              </p>
              <h2
                style={{
                  fontSize: "2.8rem",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                Highlights.
              </h2>
            </div>
            <div style={{ maxWidth: "280px" }}>
              <p style={{ color: "#555", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "16px" }}>
                Build and ship with the world&apos;s top hackers. More than 20 unique challenge tracks.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                {["←", "→"].map((a, i) => (
                  <button
                    key={i}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1px solid #222",
                      background: i === 1 ? "#d4ff00" : "transparent",
                      color: i === 1 ? "#0a0a0a" : "#fff",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { bg: "linear-gradient(135deg, #ff6b35, #ff8c42)", tag: "Opening", title: "Grand Kick-Off", time: "2h : 30m : 22s" },
              { bg: "linear-gradient(135deg, #06b6d4, #3b82f6)", tag: "Sprint", title: "48h Hack Marathon", time: "2h : 30m : 22s" },
              { bg: "linear-gradient(135deg, #f59e0b, #ef4444)", tag: "Finale", title: "Pitch & Win", time: "2h : 30m : 22s" },
            ].map((card, i) => (
              <div
                key={i}
                className="card"
                style={{ cursor: "pointer" }}
              >
                {/* Image area */}
                <div
                  style={{
                    height: "260px",
                    background: card.bg,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Timer badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                      background: "rgba(0,0,0,0.7)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "100px",
                      padding: "5px 12px",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "#fff",
                    }}
                  >
                    End in &nbsp;&nbsp;{card.time}
                  </div>
                  {/* Character placeholder */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "5rem",
                        opacity: 0.15,
                        filter: "grayscale(1)",
                      }}
                    >
                      {["🚀", "⚡", "🏆"][i]}
                    </span>
                  </div>
                </div>
                {/* Card footer */}
                <div
                  style={{
                    padding: "18px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#161616",
                  }}
                >
                  <div>
                    <p style={{ color: "#555", fontSize: "0.7rem", marginBottom: "2px" }}>Current Bid</p>
                    <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{card.title}</p>
                  </div>
                  <button
                    style={{
                      padding: "8px 18px",
                      background: "#d4ff00",
                      border: "none",
                      borderRadius: "100px",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      color: "#0a0a0a",
                      cursor: "pointer",
                    }}
                  >
                    JOIN NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: "#111", padding: "60px 0", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: "78K+", label: "Active Hackers" },
              { val: "27K+", label: "Projects Built" },
              { val: "44K+", label: "Tracks Completed" },
              { val: "$50K+", label: "Prize Pool" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "0 16px", borderLeft: i > 0 ? "1px solid #1a1a1a" : "none" }}>
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    color: "#fff",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.val}
                </div>
                <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "6px" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREW PREVIEW ── */}
      <section style={{ background: "#0a0a0a", padding: "80px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p className="section-label" style={{ marginBottom: "6px" }}>The Team</p>
              <h2 style={{ fontSize: "2.8rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>Meet the Crew.</h2>
            </div>
            <Link
              href="/crew"
              style={{
                padding: "10px 24px",
                border: "1px solid #222",
                borderRadius: "100px",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#d4ff00"; e.currentTarget.style.color = "#d4ff00"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#fff"; }}
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Alex Storm", role: "Lead Organizer", color: "#3b82f6" },
              { name: "Priya Core", role: "Tech Director", color: "#a855f7" },
              { name: "Marcus Blaze", role: "Design Lead", color: "#f59e0b" },
              { name: "Zoe Flux", role: "Community", color: "#06b6d4" },
            ].map((m, i) => (
              <div
                key={i}
                className="card"
                style={{ padding: "24px 20px", textAlign: "center" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#d4ff00"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#222"; }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${m.color}, #000)`,
                    margin: "0 auto 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  {m.name.charAt(0)}
                </div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{m.name}</p>
                <p style={{ color: "#555", fontSize: "0.75rem", marginTop: "4px" }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #d4ff00 0%, #a8cc00 100%)",
          padding: "80px 32px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#0a0a0a", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>
          Season 3.0 — October 2026
        </p>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            color: "#0a0a0a",
            letterSpacing: "-0.03em",
            marginBottom: "24px",
          }}
        >
          Ready to Sprint Into History?
        </h2>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/contact"
            style={{
              padding: "14px 36px",
              background: "#0a0a0a",
              color: "#d4ff00",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Register Now →
          </Link>
          <Link
            href="/about"
            style={{
              padding: "14px 36px",
              background: "transparent",
              border: "2px solid #0a0a0a",
              color: "#0a0a0a",
              borderRadius: "100px",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Learn More
          </Link>
        </div>
      </section>

    </div>
  );
}
