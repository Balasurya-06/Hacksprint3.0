"use client";

import { useState } from "react";
import Image from "next/image";

const stats = [
  { value: "4,200+", label: "National Applicants", sub: "From 120+ Universities" },
  { value: "80+", label: "Shortlisted Teams", sub: "Selected for On-Campus Finals" },
  { value: "36 hrs", label: "Non-Stop Sprint", sub: "Overnight Intensive Hacking" },
  { value: "₹1L Worth", label: "Prize & Grants", sub: "Awarded to Top Innovators" },
];

const storyChapters = [
  {
    step: "ACT 01",
    tag: "THE SURGE",
    title: "4,200+ Builders Assembled",
    desc: "HackSprint 2.0 electrified the KAHE campus as over 4,200 aspiring innovators registered nationwide. Following rigorous screening, 80+ elite teams were invited for the 36-hour physical hackathon.",
    image: "/past-events/hacksprint-2-1.jpg",
    accent: "#00c2ff",
    highlights: ["80+ Finalist Teams", "Auditorium Packed", "Nationwide Outreach"],
  },
  {
    step: "ACT 02",
    tag: "THE GRIND",
    title: "36 Hours In The Arena",
    desc: "From twilight until dawn, teams turned abstract concepts into functional software and hardware prototypes across 5 high-impact tracks, supported by 24/7 industry mentors.",
    image: "/past-events/hacksprint-2-3.jpg",
    accent: "#d4ff00",
    highlights: ["Agro · Med · Edu · WildVision", "24/7 Mentorship", "Midnight Hardware Sprints"],
  },
  {
    step: "ACT 03",
    tag: "THE CLIMAX",
    title: "₹1L Worth Prizes Awarded",
    desc: "The intense finale culminated in fierce stage pitches, live product demonstrations, and ₹1 Lakh worth of prizes awarded to the most impactful real-world solutions.",
    image: "/past-events/hacksprint-2-7.jpg",
    accent: "#ff007f",
    highlights: ["₹1L Prize Pool", "Stage Pitches", "Real-World Deployments"],
  },
];

const eventGallery = [
  { src: "/past-events/hacksprint-2-1.jpg", caption: "Inaugural ceremony & keynote address at KAHE Auditorium" },
  { src: "/past-events/hacksprint-2-2.jpg", caption: "Teams brainstorming architecture during initial sprint hours" },
  { src: "/past-events/hacksprint-2-3.jpg", caption: "Intensive 36-hour coding and hardware prototyping" },
  { src: "/past-events/hacksprint-2-5.jpg", caption: "Industry mentors reviewing live codebase and architecture" },
  { src: "/past-events/hacksprint-2-7.jpg", caption: "Final round project presentations before the jury panel" },
  { src: "/past-events/hacksprint-2-9.jpg", caption: "Grand felicitation & award ceremony celebrating the winners" },
];

const tracks = [
  { name: "Agrotech", desc: "Smart agriculture, soil sensors & crop health telemetry" },
  { name: "Medtech", desc: "Healthcare diagnostics, AI imaging & patient monitors" },
  { name: "Edutech", desc: "Adaptive learning algorithms & gamified student tech" },
  { name: "WildVisionTech", desc: "Wildlife conservation & anti-poaching camera traps" },
  { name: "Open Innovation", desc: "Autonomous drones, Web3, FinTech & smart campus" },
];

const partners = [
  "Cognizant",
  "Rentr",
  "Startup TN",
  "Startup Singam",
  "Nimbuz Cloud",
  "GWF",
  "Devfolio",
  "ETHIndia",
  ".XYZ",
  "JetBrains",
  "Balsamiq",
  "Interview Buddy",
  "Art of Problem Solving",
  "Eventopia",
  "ISTE",
];

export default function PastEventsPage() {
  const [activeTab, setActiveTab] = useState<"story" | "gallery" | "tracks">("story");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#ffffff", padding: "110px 24px 100px" }}>
      <div style={{ maxWidth: "1220px", margin: "0 auto" }}>
        {/* Scoped responsive styles */}
        <style>{`
          .past-event-tab-btn {
            background: #141414;
            color: #888888;
            border: 1px solid #222222;
            padding: 9px 20px;
            border-radius: 999px;
            font-size: 0.76rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.25s ease;
          }
          .past-event-tab-btn:hover {
            color: #ffffff;
            border-color: #444444;
          }
          .past-event-tab-btn.active {
            background: #d4ff00;
            color: #0a0a0a;
            border-color: #d4ff00;
            box-shadow: 0 0 16px rgba(212, 255, 0, 0.3);
          }
          .story-card-item:hover {
            transform: translateY(-6px);
            border-color: rgba(212, 255, 0, 0.35) !important;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), 0 0 24px rgba(212, 255, 0, 0.08) !important;
          }
          .story-card-item:hover .story-card-title {
            color: #d4ff00 !important;
          }
          .gallery-tile:hover img {
            transform: scale(1.06);
          }
          .gallery-tile:hover .gallery-overlay {
            opacity: 1 !important;
          }
          @media (max-width: 900px) {
            .past-event-stats-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
            .story-cards-grid {
              grid-template-columns: 1fr !important;
            }
            .gallery-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
            .tracks-grid {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 600px) {
            .past-event-stats-grid,
            .gallery-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* ── HEADER ── */}
        <header
          style={{
            marginBottom: "48px",
            paddingBottom: "32px",
            borderBottom: "1px solid #1a1a1a",
          }}
        >
          <div style={{ maxWidth: "780px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d4ff00", boxShadow: "0 0 8px #d4ff00" }} />
              <span style={{ color: "#d4ff00", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                LEGACY ARCHIVE · EDITION 2.0
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)",
                fontWeight: 900,
                letterSpacing: "-0.05em",
                lineHeight: 0.94,
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              THE STORY OF <span style={{ color: "#d4ff00" }}>HACKSPRINT 2.0</span>
            </h1>

            <p style={{ color: "#888888", fontSize: "0.94rem", lineHeight: 1.65, marginTop: "16px", margin: "16px 0 0 0" }}>
              In January 2026, 4,200+ developers converged at Karpagam Academy of Higher Education for India&apos;s biggest student-led hackathon — a high-octane 36-hour sprint of code, caffeine, and breakthrough technology.
            </p>
          </div>
        </header>

        {/* ── KEY NUMBERS (SHORT & IMPACTFUL) ── */}
        <section style={{ marginBottom: "48px" }}>
          <div
            className="past-event-stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "18px",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "linear-gradient(180deg, #131313 0%, #0d0d0d 100%)",
                  border: "1px solid #222222",
                  borderRadius: "14px",
                  padding: "24px 22px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, width: "38px", height: "2px", background: "#d4ff00" }} />
                <div style={{ color: "#d4ff00", fontSize: "clamp(2rem, 3.2vw, 2.7rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ color: "#ffffff", fontSize: "0.86rem", fontWeight: 700, marginTop: "10px" }}>
                  {stat.label}
                </div>
                <div style={{ color: "#777777", fontSize: "0.72rem", marginTop: "3px" }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── INTERACTIVE VIEW SWITCHER ── */}
        <section style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                className={`past-event-tab-btn ${activeTab === "story" ? "active" : ""}`}
                onClick={() => setActiveTab("story")}
              >
                ⚡ 3-Act Story
              </button>
              <button
                type="button"
                className={`past-event-tab-btn ${activeTab === "gallery" ? "active" : ""}`}
                onClick={() => setActiveTab("gallery")}
              >
                📷 Moments Gallery
              </button>
              <button
                type="button"
                className={`past-event-tab-btn ${activeTab === "tracks" ? "active" : ""}`}
                onClick={() => setActiveTab("tracks")}
              >
                🎯 5 Challenge Tracks
              </button>
            </div>

            <div style={{ color: "#666666", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              January 21–22, 2026 · Coimbatore, India
            </div>
          </div>
        </section>

        {/* ── TAB 1: 3-ACT STORY (SHORT, CINEMATIC & PUNCHY) ── */}
        {activeTab === "story" && (
          <section style={{ marginBottom: "56px" }}>
            <div
              className="story-cards-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "22px",
              }}
            >
              {storyChapters.map((chapter) => (
                <article
                  key={chapter.step}
                  className="story-card-item"
                  style={{
                    background: "linear-gradient(180deg, #131313 0%, #0a0a0a 100%)",
                    border: "1px solid #202020",
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Photo Container */}
                  <div style={{ position: "relative", width: "100%", height: "210px", background: "#0a0a0a", overflow: "hidden" }}>
                    <Image
                      src={chapter.image}
                      alt={chapter.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(10,10,10,0.95) 100%)" }} />

                    {/* Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        background: "rgba(10, 10, 10, 0.85)",
                        border: `1px solid ${chapter.accent}`,
                        color: chapter.accent,
                        fontSize: "0.62rem",
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        padding: "3px 9px",
                        borderRadius: "999px",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {chapter.step} // {chapter.tag}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3
                      className="story-card-title"
                      style={{
                        color: "#ffffff",
                        fontSize: "1.25rem",
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                        margin: "0 0 10px 0",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {chapter.title}
                    </h3>

                    <p style={{ color: "#8e8e8e", fontSize: "0.82rem", lineHeight: 1.6, margin: "0 0 18px 0", flex: 1 }}>
                      {chapter.desc}
                    </p>

                    {/* Bullet pills */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {chapter.highlights.map((item) => (
                        <span
                          key={item}
                          style={{
                            background: "#161616",
                            border: "1px solid #282828",
                            color: "#bbbbbb",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            padding: "4px 9px",
                            borderRadius: "6px",
                          }}
                        >
                          ✦ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── TAB 2: MOMENTS GALLERY (ACTUAL HACKSPRINT 2.0 PHOTOS) ── */}
        {activeTab === "gallery" && (
          <section style={{ marginBottom: "56px" }}>
            <div
              className="gallery-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "18px",
              }}
            >
              {eventGallery.map((photo, i) => (
                <div
                  key={photo.src}
                  className="gallery-tile"
                  onClick={() => setSelectedImage(photo.src)}
                  style={{
                    position: "relative",
                    height: "240px",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid #222222",
                    cursor: "pointer",
                    background: "#121212",
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                  />

                  {/* Caption Overlay */}
                  <div
                    className="gallery-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "16px",
                      opacity: 0.9,
                      transition: "opacity 0.25s ease",
                    }}
                  >
                    <div>
                      <span style={{ color: "#d4ff00", fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        MOMENT #{i + 1}
                      </span>
                      <p style={{ color: "#ffffff", fontSize: "0.78rem", fontWeight: 600, lineHeight: 1.4, margin: "4px 0 0 0" }}>
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── TAB 3: 5 CHALLENGE TRACKS ── */}
        {activeTab === "tracks" && (
          <section style={{ marginBottom: "56px" }}>
            <div
              className="tracks-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "18px",
              }}
            >
              {tracks.map((track, i) => (
                <div
                  key={track.name}
                  style={{
                    background: "linear-gradient(180deg, #141414 0%, #0d0d0d 100%)",
                    border: "1px solid #222222",
                    borderLeft: "3px solid #d4ff00",
                    borderRadius: "12px",
                    padding: "22px 20px",
                  }}
                >
                  <span style={{ color: "#666666", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.12em" }}>
                    DOMAIN 0{i + 1}
                  </span>
                  <h3 style={{ color: "#ffffff", fontSize: "1.2rem", fontWeight: 800, margin: "6px 0" }}>
                    {track.name}
                  </h3>
                  <p style={{ color: "#888888", fontSize: "0.78rem", lineHeight: 1.55, margin: 0 }}>
                    {track.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── LIGHTBOX POPUP MODAL FOR GALLERY ── */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(10px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              cursor: "zoom-out",
            }}
          >
            <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh", width: "900px", height: "600px" }}>
              <Image
                src={selectedImage}
                alt="HackSprint 2.0 expanded preview"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        )}

        {/* ── BACKED BY TITANS (SPONSORS & ECOSYSTEM) ── */}
        <section
          style={{
            background: "linear-gradient(180deg, #111111 0%, #090909 100%)",
            border: "1px solid #202020",
            borderRadius: "16px",
            padding: "32px 30px",
            marginBottom: "36px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
            <div>
              <p style={{ color: "#d4ff00", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", margin: 0 }}>
                Ecosystem &amp; Corporate Backing
              </p>
              <h3 style={{ color: "#ffffff", fontSize: "1.35rem", fontWeight: 800, marginTop: "4px", margin: "4px 0 0 0" }}>
                Supported by Government Bodies &amp; Tech Giants
              </h3>
            </div>
            <span style={{ color: "#666666", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em" }}>
              15+ Prestigious Partners
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {partners.map((partner) => (
              <span
                key={partner}
                style={{
                  background: "#161616",
                  border: "1px solid #292929",
                  borderRadius: "999px",
                  color: "#d0d0d0",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  padding: "7px 15px",
                  letterSpacing: "0.04em",
                }}
              >
                {partner}
              </span>
            ))}
          </div>
        </section>

        {/* ── STUDENT COORDINATORS CREDITS ── */}
        <footer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "18px",
            padding: "24px 0 0",
            borderTop: "1px solid #1a1a1a",
          }}
        >
          <div>
            <p style={{ color: "#777777", fontSize: "0.76rem", margin: 0 }}>
              Organized by Department of Computer Science &amp; Engineering, KAHE in association with Team Metaverse.
            </p>
            <p style={{ color: "#d4ff00", fontSize: "0.76rem", fontWeight: 700, marginTop: "4px" }}>
              Student Leadership: Mukilan T · Lokesh P · Natesan K · Balasurya S
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}