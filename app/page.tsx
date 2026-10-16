"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const registrationStart = new Date("2026-11-04T00:00:00+05:30").getTime();

function RegistrationTimer() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const updateTimer = () => setRemaining(Math.max(0, registrationStart - Date.now()));
    updateTimer();
    const interval = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(interval);
  }, []);

  if (remaining === null) return null;
  if (remaining === 0) {
    return <p style={{ color: "#d4ff00", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>Registration is now open</p>;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const values = [
    [Math.floor(totalSeconds / 86400), "Days"],
    [Math.floor((totalSeconds % 86400) / 3600), "Hours"],
    [Math.floor((totalSeconds % 3600) / 60), "Minutes"],
    [totalSeconds % 60, "Seconds"],
  ];

  return (
    <div aria-label="Registration countdown" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "8px" }}>
      {values.map(([value, label]) => (
        <div key={label} style={{ minWidth: "68px", border: "1px solid #344800", borderRadius: "7px", background: "#111700", padding: "9px 8px", textAlign: "center" }}>
          <strong style={{ color: "#d4ff00", display: "block", fontFamily: "monospace", fontSize: "1.1rem", lineHeight: 1 }}>{String(value).padStart(2, "0")}</strong>
          <span style={{ color: "#71804f", display: "block", fontSize: "0.55rem", letterSpacing: "0.08em", marginTop: "6px", textTransform: "uppercase" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ background: "#0a0a0a" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="hero"
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
        <div className="hero-left" style={{ width: "100%", maxWidth: "360px", paddingTop: "60px", paddingBottom: "40px", position: "relative", zIndex: 1 }}>
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

          <p style={{ color: "#888", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "8px" }}>
            Organized by the Department of Computer Science &amp; Engineering, KAHE, in association with the Metaverse Students Association.
            <br />
            <strong style={{ color: "#d4ff00", display: "inline-block", fontSize: "0.95rem", letterSpacing: "0.04em", marginTop: "6px", textTransform: "uppercase" }}>
              India&apos;s Largest Student Hackathon 2027
            </strong>
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

          <div style={{ display: "flex", flexDirection: "column", gap: "0", marginTop: "26px", maxWidth: "360px", padding: "4px 0 12px 8px" }}>
            <a
              href="https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                width: "270px",
                alignItems: "center",
                gap: "11px",
                border: "1px solid #73b8ff",
                borderRadius: "14px",
                background: "#bfe1ff",
                boxShadow: "0 5px 0 #5799d8",
                color: "#2764a0",
                fontSize: "0.95rem",
                fontWeight: 800,
                padding: "13px 18px",
                textDecoration: "none",
                transform: "rotate(-4deg)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "rotate(-4deg) translateY(-3px)";
                event.currentTarget.style.boxShadow = "0 8px 0 #5799d8";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "rotate(-4deg)";
                event.currentTarget.style.boxShadow = "0 5px 0 #5799d8";
              }}
            >
              <span aria-hidden="true" style={{ color: "#2764a0", fontSize: "1.4rem", lineHeight: 1 }}>◉</span>
              <span>Join WhatsApp Community ↗</span>
            </a>
            <a
              href="/brochure.pdf"
              download
              style={{
                display: "flex",
                width: "250px",
                alignItems: "center",
                gap: "11px",
                border: "1px solid #a0dc26",
                borderRadius: "14px",
                background: "#d9ff70",
                boxShadow: "0 5px 0 #8dbb28",
                color: "#49741c",
                fontSize: "0.95rem",
                fontWeight: 900,
                marginTop: "-2px",
                padding: "13px 18px",
                textDecoration: "none",
                transform: "rotate(3deg) translateX(22px)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "rotate(3deg) translateX(22px) translateY(-3px)";
                event.currentTarget.style.boxShadow = "0 8px 0 #8dbb28";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "rotate(3deg) translateX(22px)";
                event.currentTarget.style.boxShadow = "0 5px 0 #8dbb28";
              }}
            >
              <span aria-hidden="true" style={{ fontSize: "1.4rem", lineHeight: 1 }}>↓</span>
              <span>Download Brochure</span>
            </a>
          </div>
        </div>

        {/* Center hero headline — spans full width */}
        <div
          className="hero-title"
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

          <Image
            src="/logo.png"
            alt="Hacksprint 3.0"
            width={500}
            height={500}
            style={{
              width: "min(64vw, 420px)",
              height: "auto",
              marginTop: "16px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Right stats panel */}
        <div className="hero-stats" style={{ paddingTop: "100px", paddingBottom: "40px", textAlign: "right" }}>
          {[
            { value: "500+", label: "Active Hackers" },
            { value: "5+", label: "Challenge Tracks" },
            { value: "36h", label: "Sprint Duration" },
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

      <section id="registration" style={{ background: "#111", borderTop: "1px solid #222", borderBottom: "1px solid #222", padding: "24px 32px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#d4ff00", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", marginBottom: "8px", textTransform: "uppercase" }}>
            Registration opens November 4, 2026 at 12:00 AM IST
          </p>
          <RegistrationTimer />
        </div>
      </section>

      {/* ── ANNOUNCEMENT MARQUEE ── */}
      <section style={{ overflow: "hidden", padding: "16px 32px", background: "#d4ff00", color: "#0a0a0a" }} aria-label="Announcements">
        <div style={{ minWidth: 0, overflow: "hidden", whiteSpace: "nowrap" }} role="region" aria-label="HackSprint announcements">
          <div style={{ display: "flex", width: "max-content", animation: "announcement-marquee 28s linear infinite" }}>
            {[0, 1].map((copy) => (
              <div style={{ display: "flex", alignItems: "center", gap: "18px", paddingRight: "18px", fontSize: "0.76rem", fontWeight: 700 }} key={copy} aria-hidden={copy === 1}>
                <span style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", border: "1px solid #0a0a0a", borderRadius: "999px", padding: "4px 9px" }}>Announcement</span>
                <span>HackSprint 3.0 is live — registration is now open</span>
                <span style={{ fontSize: "0.85rem" }}>✦</span>
                <span>Build, compete, and win with the world&apos;s top hackers</span>
                <span style={{ fontSize: "0.85rem" }}>✦</span>
                <span>Supported by Ethereum, Solana, TypeScript, React, Next.js, and GitHub</span>
                <span style={{ fontSize: "0.85rem" }}>✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: "#0a0a0a", padding: 0 }}>
        <AboutContent />
      </section>

      {/* ── TRENDING SECTION ── */}
      <section id="highlights" style={{ background: "#0a0a0a", padding: "80px 32px" }}>
        <HighlightsGallery />
      </section>

      {/* ── CREW PREVIEW ── */}
      <section id="crew" style={{ background: "#0a0a0a", padding: "80px 0" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 32px" }}>
          <CrewContent />
        </div>
      </section>

      {/* ── PAST EVENTS ── */}
      <section id="past-events" style={{ background: "#0a0a0a", padding: "80px 32px" }}>
        <PastEventsContent />
      </section>

      <section id="why-sponsor-us" style={{ background: "#0a0a0a", padding: "80px 32px" }}>
        <WhySponsorContent />
      </section>

      {/* ── CTA BANNER ── */}
      <section
        id="contact"
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


const bodyText = {
  color: "#888888",
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "0.9rem",
  lineHeight: 1.8,
};

const labelText = {
  color: "#d4ff00",
  fontSize: "0.68rem",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
};

function AboutContent() {
  return (
    <main
      style={{
        background: "#0a0a0a",
        color: "#ffffff",
        minHeight: "100vh",
        padding: "72px 32px 88px",
      }}
    >
      <header
        style={{
          maxWidth: "720px",
          margin: "0 auto 58px",
          textAlign: "center",
        }}
      >
        <p style={{ ...labelText, margin: "0 0 14px" }}>
          About KAHE &amp; Metaverse
        </p>
        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            margin: "0 0 18px",
          }}
        >
          The community behind
          <br />
          HackSprint 3.0
        </h1>
        <p style={{ ...bodyText, margin: 0 }}>
          A place where academic learning, emerging technology, and student
          collaboration come together to create meaningful impact.
        </p>
      </header>

      <section
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "56px",
        }}
      >
        <article
          style={{
            padding: "26px 0",
            borderTop: "1px solid #333333",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "26px",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              About Metaverse
            </h2>
            <span style={{ color: "#d4ff00", fontSize: "1.4rem" }}>↗</span>
          </div>
          <p style={{ ...bodyText, margin: "0 0 18px" }}>
            The Metaverse Students Association is a student community under
            the Department of Computer Science &amp; Engineering at Karpagam
            Academy of Higher Education, focused on technology, creativity,
            collaboration, and innovation.
          </p>
          <p style={{ ...bodyText, margin: 0 }}>
            Through workshops, events, projects, and hackathons, students
            explore ideas and turn technical knowledge into real-world
            solutions.
          </p>
          <div
            style={{
              display: "flex",
              gap: "28px",
              marginTop: "28px",
              paddingTop: "20px",
              borderTop: "1px solid #222222",
            }}
          >
            <div>
              <strong style={{ color: "#d4ff00", fontSize: "1.8rem" }}>01</strong>
              <p style={{ color: "#666666", fontSize: "0.68rem", margin: "4px 0 0" }}>
                Student community
              </p>
            </div>
            <div>
              <strong style={{ color: "#d4ff00", fontSize: "1.8rem" }}>∞</strong>
              <p style={{ color: "#666666", fontSize: "0.68rem", margin: "4px 0 0" }}>
                Ideas to explore
              </p>
            </div>
          </div>
        </article>

        <article
          style={{
            padding: "26px 0",
            borderTop: "1px solid #333333",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "26px",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              About KAHE
            </h2>
            <span style={{ color: "#d4ff00", fontSize: "1.4rem" }}>↗</span>
          </div>
          <p style={{ ...bodyText, margin: "0 0 18px" }}>
            Karpagam Academy of Higher Education (KAHE), located in Coimbatore,
            Tamil Nadu, is committed to academic excellence, research,
            innovation, and holistic student development.
          </p>
          <p style={{ ...bodyText, margin: 0 }}>
            KAHE connects classroom learning with creativity, practical skills,
            entrepreneurship, and emerging technology to prepare students for a
            rapidly evolving digital world.
          </p>
          <div
            style={{
              display: "flex",
              gap: "28px",
              marginTop: "28px",
              paddingTop: "20px",
              borderTop: "1px solid #222222",
            }}
          >
            <div>
              <strong style={{ color: "#d4ff00", fontSize: "1.8rem" }}>01</strong>
              <p style={{ color: "#666666", fontSize: "0.68rem", margin: "4px 0 0" }}>
                Learning ecosystem
              </p>
            </div>
            <div>
              <strong style={{ color: "#d4ff00", fontSize: "1.8rem" }}>✦</strong>
              <p style={{ color: "#666666", fontSize: "0.68rem", margin: "4px 0 0" }}>
                Innovation focused
              </p>
            </div>
          </div>
        </article>
      </section>

      <section
        style={{
          maxWidth: "1080px",
          margin: "58px auto 0",
          paddingTop: "28px",
          borderTop: "1px solid #222222",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "40px",
        }}
      >
        <div>
          <p style={{ ...labelText, margin: "0 0 12px" }}>Our Vision</p>
          <p style={{ ...bodyText, margin: 0 }}>
            To build a collaborative student community where innovation
            thrives, ideas become reality, and future-ready creators emerge.
          </p>
        </div>
        <div>
          <p style={{ ...labelText, margin: "0 0 12px" }}>Our Mission</p>
          <p style={{ ...bodyText, margin: 0 }}>
            Innovate, collaborate, empower, and build through hands-on learning
            and meaningful technology projects.
          </p>
        </div>
        <div>
          <p style={{ ...labelText, margin: "0 0 12px" }}>
            Metaverse × HackSprint 3.0
          </p>
          <p style={{ color: "#ffffff", fontSize: "1rem", lineHeight: 1.5, margin: 0 }}>
            We don&apos;t just imagine the future. We build it together.
          </p>
        </div>
      </section>
    </main>
  );
}



const galleryImages = [
  {
    src: "/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.25%20PM.jpeg",
    alt: "Students participating in a HackSprint event",
    className: "gallery-photo-one",
  },
  {
    src: "/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.26%20PM%20(1).jpeg",
    alt: "Students collaborating during HackSprint",
    className: "gallery-photo-two",
  },
  {
    src: "/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.26%20PM.jpeg",
    alt: "HackSprint event activity",
    className: "gallery-photo-three",
  },
  {
    src: "/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.27%20PM%20(1).jpeg",
    alt: "Students gathered at a HackSprint event",
    className: "gallery-photo-four",
  },
  {
    src: "/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.27%20PM.jpeg",
    alt: "Participants working in a computer laboratory",
    className: "gallery-photo-five",
  },
  {
    src: "/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.28%20PM.jpeg",
    alt: "HackSprint workshop participants",
    className: "gallery-photo-six",
  },
];

function HighlightsGallery() {
  return (
    <div style={{ maxWidth: "940px", margin: "0 auto" }}>
      <header style={{ margin: "0 auto 42px", textAlign: "center" }}>
        <p
          style={{
            color: "#d4ff00",
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: "0.16em",
            marginBottom: "12px",
            textTransform: "uppercase",
          }}
        >
          HackSprint 2.0
        </p>
        <h2
          style={{
            color: "#fff",
            fontSize: "clamp(2rem, 4.8vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.06em",
            lineHeight: 1.05,
          }}
        >
          Highlights.
        </h2>
        <div
          style={{
            width: "48px",
            height: "3px",
            margin: "16px auto 0",
            background: "#d4ff00",
            boxShadow: "0 0 14px #d4ff0088",
          }}
        />
        <p style={{ color: "#777", fontSize: "0.8rem", lineHeight: 1.6, margin: "16px auto 0", maxWidth: "460px" }}>
          A glimpse of the events, workshops, and moments from the past year.
        </p>
      </header>

      <div
        className="highlights-gallery"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.12fr 1fr",
          gridTemplateRows: "170px 170px",
          gap: "16px",
        }}
      >
        {galleryImages.map((image) => (
          <div
            key={image.src}
            className={image.className}
            style={{
              position: "relative",
              minHeight: 0,
              overflow: "hidden",
              border: "1px solid #304700",
              borderRadius: "9px",
              background: "#161616",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 700px) 100vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}




const crew = [
  {
    image: "/surya.png",
    initials: "BS",
    name: "Bala Surya S",
    role: "Organizer · HackSprint 2.0 & 3.0",
    detail: "Final Year · Computer Science and Engineering",
    contact: {
      phone: "9597075831",
      whatsapp: "9597075831",
      linkedin: "https://www.linkedin.com/in/balasurya06/",
    },
    accent: "#d4ff00",
    className: "crew-profile-one",
  },
  { initials: "D", name: "Deepa", role: "Organizer · HackSprint 3.0", detail: "Coordinator · HackSprint 2.0 · Third Year · Computer Science and Engineering", accent: "#b9c4c4", className: "crew-profile-two" },
  { initials: "K", name: "Kavinya", role: "Organizer · HackSprint 3.0", detail: "Coordinator · HackSprint 2.0 · Third Year · Computer Science and Engineering", accent: "#758300", className: "crew-profile-three" },
];

function CrewContent() {
  return (
    <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
      <div className="crew-intro" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "70px", alignItems: "end", marginBottom: "72px" }}>
        <div>
          <p style={{ color: "#d4ff00", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.16em", marginBottom: "16px", textTransform: "uppercase" }}>
            The people behind the sprint
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2.7rem, 6vw, 5.2rem)", fontWeight: 800, letterSpacing: "-0.07em", lineHeight: 0.95 }}>
            Meet the <span style={{ color: "#d4ff00" }}>crew</span>.
          </h1>
        </div>
        <div>
          <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "430px" }}>
            The organizers, builders, and community leaders creating a space where ideas become real-world projects.
          </p>
          <a href="#crew-profiles" style={{ display: "inline-flex", marginTop: "22px", padding: "10px 18px", border: "1px solid #d4ff00", borderRadius: "999px", color: "#d4ff00", fontSize: "0.75rem", fontWeight: 700, textDecoration: "none" }}>
            Meet the team ↓
          </a>
        </div>
      </div>

      <section style={{ marginBottom: "64px" }} aria-labelledby="conveners-title">
        <p
          id="conveners-title"
          style={{
            color: "#d4ff00",
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: "0.16em",
            marginBottom: "18px",
            textTransform: "uppercase",
          }}
        >
          Conveners
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "18px",
          }}
        >
          {[
            ["Dr. R. Santhosh", "Head of Department", "Computer Science and Engineering"],
            ["Ramaya", "Assistant Professor", "Department of Computer Science and Engineering"],
          ].map(([name, role, department]) => (
            <article
              key={name}
              style={{
                borderTop: "1px solid #d4ff00",
                borderBottom: "1px solid #222",
                padding: "22px 0",
              }}
            >
              <h2 style={{ color: "#fff", fontSize: "1.2rem", letterSpacing: "-0.03em" }}>{name}</h2>
              <p style={{ color: "#d4ff00", fontSize: "0.78rem", fontWeight: 700, marginTop: "8px" }}>{role}</p>
              <p style={{ color: "#777", fontSize: "0.8rem", lineHeight: 1.5, marginTop: "4px" }}>{department}</p>
            </article>
          ))}
        </div>
      </section>

      <div
        id="crew-profiles"
        className="crew-profiles"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "18px",
          alignItems: "end",
        }}
      >
        {crew.map((member) => (
          <article
            key={member.name}
            className={member.className}
            style={{
              minHeight: "450px",
              position: "relative",
              overflow: "hidden",
              border: "1px solid #222",
              borderRadius: "190px 190px 0 0",
              background: `linear-gradient(180deg, ${member.accent} 0%, ${member.accent}cc 44%, #161616 100%)`,
              padding: "42px 18px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ color: "#0a0a0a", fontSize: "1.15rem", fontWeight: 800 }}>{member.name}</h2>
              <p style={{ color: "#0a0a0acc", fontSize: "0.7rem", lineHeight: 1.4, marginTop: "6px" }}>{member.role}</p>
              {"detail" in member && <p style={{ color: "#0a0a0a99", fontSize: "0.62rem", lineHeight: 1.4, marginTop: "5px" }}>{member.detail}</p>}
              {"contact" in member && member.contact && (
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "14px" }}>
                  <a
                    href={`tel:${member.contact.phone}`}
                    aria-label={`Call ${member.name}`}
                    style={{ color: "#0a0a0a", fontSize: "0.68rem", fontWeight: 800, textDecoration: "none" }}
                  >
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${member.contact.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`WhatsApp ${member.name}`}
                    style={{ color: "#0a0a0a", fontSize: "0.68rem", fontWeight: 800, textDecoration: "none" }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href={member.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    style={{ color: "#0a0a0a", fontSize: "0.68rem", fontWeight: 800, textDecoration: "none" }}
                  >
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: "-24px",
                transform: "translateX(-50%)",
                width: "250px",
                height: "310px",
                borderRadius: "130px 130px 0 0",
                background: "linear-gradient(160deg, #222, #080808)",
                display: "grid",
                placeItems: "center",
                color: member.accent,
                fontSize: "3.6rem",
                fontWeight: 900,
                letterSpacing: "-0.1em",
                boxShadow: "0 -10px 30px #00000033",
              }}
            >
              {"image" in member && member.image ? (
                <Image
                  src={member.image}
                  alt={`${member.name} profile`}
                  fill
                  sizes="250px"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              ) : (
                member.initials
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}


const tracks = ["Agrotech", "Medtech", "Edutech", "WildVisionTech", "Open Innovation"];
const partners = ["Cognizant", "Rentr UK", "StartupTN", "Devfolio", "ETHIndia", "JetBrains", "Balsamiq", "Intel", "Dell"];

const stats = [
  ["3,600+", "Participants"],
  ["150+", "Teams"],
  ["36 hrs", "Build duration"],
  ["₹1 lakh", "Advertised prize pool"],
];

function PastEventsContent() {
  return (
    <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
      <header style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "60px", alignItems: "end", marginBottom: "58px" }}>
        <div>
          <p style={{ color: "#d4ff00", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.16em", marginBottom: "14px", textTransform: "uppercase" }}>
            The legacy · 2026
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2.7rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.08em", lineHeight: 0.94 }}>
            HackSprint <span style={{ color: "#d4ff00" }}>2.0.</span>
          </h1>
        </div>
        <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.7 }}>
          A national-level hackathon organized by the Department of Computer Science &amp; Engineering, KAHE, in association with the Metaverse Students Association.
        </p>
      </header>

      <section style={{ borderTop: "1px solid #d4ff00", borderBottom: "1px solid #222", padding: "22px 0", marginBottom: "42px" }}>
        <div className="legacy-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong style={{ color: "#d4ff00", fontSize: "clamp(1.5rem, 3vw, 2.4rem)", fontWeight: 900, letterSpacing: "-0.06em" }}>{value}</strong>
              <p style={{ color: "#777", fontSize: "0.7rem", letterSpacing: "0.08em", marginTop: "5px", textTransform: "uppercase" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="legacy-content-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "22px", marginBottom: "22px" }}>
        <section style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "28px" }}>
          <p style={{ color: "#d4ff00", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>Event snapshot</p>
          <h2 style={{ color: "#fff", fontSize: "1.5rem", marginTop: "14px" }}>January 21–22, 2026</h2>
          <p style={{ color: "#888", lineHeight: 1.7, marginTop: "12px" }}>
            Teams had 36 hours to turn bold ideas into working solutions across five challenge tracks. The event brought together students, mentors, builders, and industry collaborators at KAHE.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "22px" }}>
            {tracks.map((track) => (
              <span key={track} style={{ border: "1px solid #304700", borderRadius: "999px", color: "#d4ff00", fontSize: "0.68rem", padding: "7px 11px" }}>{track}</span>
            ))}
          </div>
        </section>

        <section style={{ background: "#d4ff00", borderRadius: "12px", color: "#0a0a0a", padding: "28px" }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>What stood out</p>
          <h2 style={{ fontSize: "1.5rem", marginTop: "14px" }}>Built beyond the shortlist.</h2>
          <p style={{ color: "#304700", lineHeight: 1.7, marginTop: "12px" }}>
            The final-round highlights featured nearly 50 teams and 250 participants, alongside an advertised foreign internship opportunity through Rentr (UK).
          </p>
        </section>
      </div>

      <section style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "28px", marginBottom: "22px" }}>
        <div className="legacy-achievements" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
          <div>
            <p style={{ color: "#d4ff00", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>Association achievements</p>
            <h2 style={{ color: "#fff", fontSize: "1.4rem", marginTop: "12px" }}>A community that keeps building.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
            {[["350+", "Innovators"], ["15+", "Events"], ["100+", "Projects shipped"]].map(([value, label]) => (
              <div key={label}>
                <strong style={{ color: "#d4ff00", fontSize: "1.5rem" }}>{value}</strong>
                <p style={{ color: "#777", fontSize: "0.68rem", marginTop: "4px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid #d4ff00", borderBottom: "1px solid #222", padding: "28px 0", marginBottom: "30px" }}>
        <div className="legacy-dedication" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "28px", alignItems: "start" }}>
          <div>
            <p style={{ color: "#d4ff00", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>With gratitude</p>
            <h2 style={{ color: "#fff", fontSize: "1.5rem", lineHeight: 1.2, marginTop: "12px" }}>Built through dedication.</h2>
          </div>
          <div>
            <p style={{ color: "#888", lineHeight: 1.7 }}>
              HackSprint 2.0 was made possible by the dedication of the faculty, organizers, mentors, volunteers, and student coordinators who worked together to create a meaningful national-level platform for innovation.
            </p>
            <p style={{ color: "#d4ff00", fontSize: "0.76rem", fontWeight: 700, lineHeight: 1.6, marginTop: "16px" }}>
              Student coordinators: Mukilan T · Lokesh P · Natesan K · Balasurya S
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "12px 0 0" }}>
        <p style={{ color: "#d4ff00", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", marginBottom: "14px", textTransform: "uppercase" }}>Previous edition partners</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "9px" }}>
          {partners.map((partner) => (
            <span key={partner} style={{ color: "#777", border: "1px solid #222", borderRadius: "999px", fontSize: "0.7rem", padding: "8px 12px" }}>{partner}</span>
          ))}
        </div>
      </section>
    </div>
  );
}



const benefits = [
  ["01", "Reach a growing community", "Connect your brand with 3,600+ participants, 150+ teams, and a wider community of 350+ innovators from KAHE and the Metaverse Students Association.", "#d4ff00", "◎"],
  ["02", "Meet future talent", "Engage with student builders who spend 36 hours developing practical solutions across Agrotech, Medtech, Edutech, WildVisionTech, and Open Innovation.", "#00c2ff", "✦"],
  ["03", "Join a proven ecosystem", "Build meaningful relationships with KAHE, student organizers, mentors, and a strong partner network shaped by HackSprint 2.0.", "#9b6cff", "⌘"],
  ["04", "Enable real innovation", "Support hands-on projects, workshops, and opportunities that help students move from ideas to solutions with measurable impact.", "#ff4bd8", "✧"],
];

function WhySponsorContent() {
  return (
    <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
      <header style={{ maxWidth: "760px", margin: "0 auto 58px", textAlign: "center" }}>
        <p style={{ color: "#d4ff00", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          Partner with the next generation
        </p>
        <h2 style={{ fontSize: "clamp(2.8rem, 7vw, 5.8rem)", fontWeight: 900, letterSpacing: "-0.08em", lineHeight: 0.92, marginTop: "16px" }}>
          Why sponsor <span style={{ color: "#d4ff00" }}>us?</span>
        </h2>
        <div style={{ width: "58px", height: "4px", background: "#d4ff00", margin: "22px auto 0", boxShadow: "0 0 18px #d4ff0088" }} />
        <p style={{ color: "#888", lineHeight: 1.7, margin: "22px auto 0", maxWidth: "590px" }}>
          Support the next chapter of a community that has already conducted 15+ events and shipped 100+ projects through learning, collaboration, and hands-on innovation.
        </p>
      </header>

      <section className="sponsor-benefits" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
        {benefits.map(([number, title, description, accent, symbol]) => (
          <article key={number} style={{ minHeight: "280px", position: "relative", overflow: "hidden", background: "#11131f", border: "1px solid #25283a", borderTop: `3px solid ${accent}`, padding: "24px 22px", clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: accent, fontSize: "2rem", lineHeight: 1 }}>{symbol}</span>
              <span style={{ color: "#555", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.12em" }}>{number}</span>
            </div>
            <h3 style={{ color: "#fff", fontSize: "1.1rem", lineHeight: 1.2, marginTop: "34px", textTransform: "uppercase" }}>{title}</h3>
            <div style={{ height: "1px", background: "#303345", margin: "16px 0" }} />
            <p style={{ color: "#9094a5", fontSize: "0.8rem", lineHeight: 1.65 }}>{description}</p>
          </article>
        ))}
      </section>

      <p style={{ color: "#666", fontSize: "0.72rem", lineHeight: 1.6, margin: "22px auto 0", maxWidth: "720px", textAlign: "center" }}>
        Previous HackSprint editions have connected students with organizations including Cognizant, Rentr UK, StartupTN, Devfolio, ETHIndia, JetBrains, Balsamiq, Intel, and Dell.
      </p>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "52px" }}>
        <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "15px 28px", background: "#d4ff00", color: "#0a0a0a", fontSize: "0.78rem", fontWeight: 900, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)" }}>
          Discuss sponsorship <span aria-hidden="true" style={{ fontSize: "1.1rem" }}>→</span>
        </Link>
      </div>
    </div>
  );
}
