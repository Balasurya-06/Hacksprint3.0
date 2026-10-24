"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "4,200+", label: "NATIONAL APPLICANTS", sub: "From 120+ Universities" },
  { value: "80+", label: "SHORTLISTED TEAMS", sub: "Selected for On-Campus Finals" },
  { value: "36 HRS", label: "NON-STOP SPRINT", sub: "Overnight Intensive Hacking" },
  { value: "₹1,00,000", label: "BOUNTIES & GRANTS", sub: "Awarded to Top Innovators" },
];

const storyChapters = [
  {
    step: "ACT 01",
    tag: "THE SURGE",
    title: "4,200+ BUILDERS ASSEMBLED",
    desc: "HackSprint 2.0 electrified the KAHE campus as over 4,200 aspiring innovators registered nationwide. Following rigorous screening, 80+ elite teams were invited for the 36-hour physical hackathon.",
    image: "/past-events/hacksprint-2-1.jpg",
    highlights: ["80+ Finalist Teams", "Auditorium Packed", "Nationwide Outreach"],
  },
  {
    step: "ACT 02",
    tag: "THE GRIND",
    title: "36 HOURS IN THE ARENA",
    desc: "From twilight until dawn, teams turned abstract concepts into functional software and hardware prototypes across 5 high-impact tracks, supported by 24/7 industry mentors.",
    image: "/past-events/hacksprint-2-3.jpg",
    highlights: ["Agro · Med · Edu · WildVision", "24/7 Mentorship", "Midnight Hardware Sprints"],
  },
  {
    step: "ACT 03",
    tag: "THE CLIMAX",
    title: "₹1L BOUNTIES AWARDED",
    desc: "The intense finale culminated in fierce stage pitches, live product demonstrations, and ₹1 Lakh worth of prizes awarded to the most impactful real-world solutions.",
    image: "/past-events/hacksprint-2-7.jpg",
    highlights: ["₹1L Prize Pool", "Stage Pitches", "Real-World Deployments"],
  },
];

const eventGallery = [
  { src: "/past-events/hacksprint-2-1.jpg", caption: "Inaugural ceremony & keynote address at KAHE Auditorium" },
  { src: "/past-events/hacksprint-2-2.jpg", caption: "Teams brainstorming architecture during initial sprint hours" },
  { src: "/past-events/hacksprint-2-3.jpg", caption: "Intensive 36-hour coding and hardware prototyping" },
  { src: "/past-events/hacksprint-2-5.jpg", caption: "Industry mentors reviewing live codebase and architecture" },
  { src: "/past-events/hacksprint-2-7.jpg", caption: "Final round project presentations before the jury panel" },
  { src: "/past-events/hacksprint-2-9.jpg", caption: "Grand award ceremony celebrating victorious outlaws" },
];

const tracks = [
  { name: "Agrotech", desc: "Smart agriculture, telemetry soil sensors & crop health analytics" },
  { name: "Medtech", desc: "Healthcare diagnostics, patient telemetry & biomedical AI imaging" },
  { name: "Edutech", desc: "Adaptive learning algorithms & next-gen educational platforms" },
  { name: "WildVisionTech", desc: "Wildlife conservation, anti-poaching traps & bio-monitoring" },
  { name: "Open Innovation", desc: "Autonomous drones, Web3 protocols, FinTech & smart campus" },
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
    <main
      style={{
        minHeight: "100vh",
        background: "#070606",
        color: "#f5f1ea",
        padding: "80px 24px 100px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Scoped CSS for RDR2 Outlaw Styles */}
        <style>{`
          .rdr-tab-btn {
            background: #120b0d;
            color: #a39d94;
            border: 1px solid #381a1e;
            padding: 8px 22px;
            border-radius: 9999px;
            font-family: 'Oswald', sans-serif;
            font-size: 0.8rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .rdr-tab-btn:hover {
            color: #ffffff;
            border-color: #e51b24;
          }
          .rdr-tab-btn.active {
            background: #e51b24;
            color: #ffffff;
            border-color: #e51b24;
            box-shadow: 0 0 18px rgba(229, 27, 36, 0.4);
          }
          .rdr-story-card:hover {
            transform: translateY(-6px);
            border-color: #e51b24 !important;
            box-shadow: 0 16px 36px rgba(229, 27, 36, 0.2) !important;
          }
          .rdr-gallery-tile:hover img {
            transform: scale(1.05);
          }
          .rdr-gallery-tile:hover {
            border-color: #e51b24 !important;
            box-shadow: 0 0 25px rgba(229, 27, 36, 0.3) !important;
          }
        `}</style>

        {/* ── HEADER ── */}
        <header style={{ maxWidth: "860px", margin: "0 auto 60px", textAlign: "center" }}>
          <p className="rdr-kicker" style={{ marginBottom: "12px" }}>
            ★ LEGACY ARCHIVES · EDITION 2.0 ★
          </p>

          <h1
            style={{
              fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
              fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
              fontWeight: 900,
              letterSpacing: "0.04em",
              lineHeight: 0.95,
              color: "#f5f1ea",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            HOW THE BATTLE WAS WON: <span style={{ color: "#e51b24" }}>HACKSPRINT 2.0</span>
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              color: "#e51b24",
              margin: "18px auto 22px",
            }}
          >
            <div style={{ width: "45px", height: "1.5px", background: "#e51b24" }} />
            <span style={{ fontSize: "1rem" }}>★</span>
            <div style={{ width: "45px", height: "1.5px", background: "#e51b24" }} />
          </div>

          <p style={{ color: "#a39d93", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>
            In January 2026, 4,200+ outlaws of code converged at Karpagam Academy of Higher Education for 36 non-stop hours
            of high-voltage architecture, nocturnal debugging, and ₹1,00,000 in grand bounties.
          </p>
        </header>

        {/* ── 4 STATS DOSSIERS ── */}
        <section style={{ marginBottom: "56px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "linear-gradient(145deg, #120b0d 0%, #090607 100%)",
                  border: "1px solid #331518",
                  borderTop: "3px solid #e51b24",
                  padding: "24px 20px",
                  position: "relative",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.6)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                    fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
                    color: "#e51b24",
                    letterSpacing: "0.04em",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    color: "#f5f1ea",
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    marginTop: "8px",
                  }}
                >
                  {stat.label}
                </div>
                <div style={{ color: "#8a8276", fontSize: "0.76rem", marginTop: "4px" }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── VIEW SWITCHER TABS ── */}
        <section style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
              paddingBottom: "18px",
              borderBottom: "1px solid #1f1416",
            }}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                type="button"
                className={`rdr-tab-btn ${activeTab === "story" ? "active" : ""}`}
                onClick={() => setActiveTab("story")}
              >
                ★ 3-ACT SAGA
              </button>
              <button
                type="button"
                className={`rdr-tab-btn ${activeTab === "gallery" ? "active" : ""}`}
                onClick={() => setActiveTab("gallery")}
              >
                📷 ARENA MOMENTS
              </button>
              <button
                type="button"
                className={`rdr-tab-btn ${activeTab === "tracks" ? "active" : ""}`}
                onClick={() => setActiveTab("tracks")}
              >
                ⚔ 5 CHALLENGE TRACKS
              </button>
            </div>

            <span
              style={{
                color: "#8a8276",
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.76rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              JANUARY 2026 · KAHE SHOWDOWN ARENA
            </span>
          </div>
        </section>

        {/* ── TAB 1: 3-ACT SAGA ── */}
        {activeTab === "story" && (
          <section style={{ marginBottom: "64px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "28px",
              }}
            >
              {storyChapters.map((chapter) => (
                <article
                  key={chapter.step}
                  className="rdr-story-card"
                  style={{
                    background: "linear-gradient(145deg, #120b0d 0%, #090607 100%)",
                    border: "1px solid #331518",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 14px 40px rgba(0,0,0,0.7)",
                    transition: "all 0.25s ease",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "220px", background: "#050404" }}>
                    <Image
                      src={chapter.image}
                      alt={chapter.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, #090607 0%, transparent 70%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        background: "rgba(10, 6, 7, 0.9)",
                        border: "1px solid #e51b24",
                        color: "#e51b24",
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        padding: "3px 10px",
                        textTransform: "uppercase",
                      }}
                    >
                      {chapter.step} · {chapter.tag}
                    </div>
                  </div>

                  <div style={{ padding: "24px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                        fontSize: "1.7rem",
                        letterSpacing: "0.04em",
                        color: "#f5f1ea",
                        margin: "0 0 10px",
                        textTransform: "uppercase",
                      }}
                    >
                      {chapter.title}
                    </h3>

                    <p style={{ color: "#9e978d", fontSize: "0.88rem", lineHeight: 1.65, margin: "0 0 20px", flex: 1 }}>
                      {chapter.desc}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {chapter.highlights.map((item) => (
                        <span
                          key={item}
                          style={{
                            background: "#180d10",
                            border: "1px solid #3d1b1f",
                            color: "#c2bcaf",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            padding: "4px 10px",
                          }}
                        >
                          ★ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── TAB 2: ARENA MOMENTS GALLERY ── */}
        {activeTab === "gallery" && (
          <section style={{ marginBottom: "64px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {eventGallery.map((photo, i) => (
                <div
                  key={photo.src}
                  className="rdr-gallery-tile"
                  onClick={() => setSelectedImage(photo.src)}
                  style={{
                    position: "relative",
                    height: "250px",
                    overflow: "hidden",
                    border: "1px solid #331518",
                    cursor: "pointer",
                    background: "#0d090a",
                    boxShadow: "0 10px 28px rgba(0,0,0,0.6)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(7, 6, 6, 0.95) 0%, rgba(7, 6, 6, 0.2) 60%, transparent 100%)",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "18px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: "#e51b24",
                          fontFamily: "'Oswald', sans-serif",
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                      >
                        DISPATCH MOMENT #{i + 1}
                      </span>
                      <p style={{ color: "#f5f1ea", fontSize: "0.85rem", fontWeight: 600, margin: "4px 0 0" }}>
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
          <section style={{ marginBottom: "64px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "22px",
              }}
            >
              {tracks.map((track, i) => (
                <div
                  key={track.name}
                  style={{
                    background: "linear-gradient(145deg, #120b0d 0%, #090607 100%)",
                    border: "1px solid #331518",
                    borderLeft: "4px solid #e51b24",
                    padding: "26px 24px",
                    boxShadow: "0 10px 28px rgba(0,0,0,0.6)",
                  }}
                >
                  <span
                    style={{
                      color: "#e51b24",
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                    }}
                  >
                    BOUNTY DOMAIN 0{i + 1}
                  </span>
                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                      fontSize: "1.7rem",
                      letterSpacing: "0.04em",
                      color: "#f5f1ea",
                      margin: "6px 0 8px",
                      textTransform: "uppercase",
                    }}
                  >
                    {track.name}
                  </h3>
                  <p style={{ color: "#9e978d", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                    {track.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── LIGHTBOX MODAL ── */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(5, 4, 4, 0.94)",
              backdropFilter: "blur(12px)",
              zIndex: 9999,
              display: "grid",
              placeItems: "center",
              padding: "24px",
              cursor: "zoom-out",
            }}
          >
            <div style={{ position: "relative", maxWidth: "92vw", maxHeight: "86vh", width: "900px", height: "600px" }}>
              <Image src={selectedImage} alt="HackSprint 2.0 expanded preview" fill style={{ objectFit: "contain" }} />
            </div>
          </div>
        )}

        {/* ── BACKED BY TITANS (ECOSYSTEM) ── */}
        <section
          style={{
            background: "#0c090a",
            border: "1px solid #281619",
            padding: "36px 32px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div>
              <p className="rdr-kicker" style={{ fontSize: "0.72rem", marginBottom: "4px" }}>
                ECOSYSTEM ALLIANCE &amp; SPONSORS
              </p>
              <h3
                style={{
                  fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                  fontSize: "1.8rem",
                  letterSpacing: "0.04em",
                  color: "#f5f1ea",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                PROUDLY SUPPORTED BY INDUSTRY TITANS &amp; GOVT. BODIES
              </h3>
            </div>
            <span style={{ color: "#e51b24", fontFamily: "'Oswald', sans-serif", fontSize: "0.8rem", fontWeight: 700 }}>
              ★ 15+ PROVEN PATRONS
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {partners.map((partner) => (
              <span
                key={partner}
                style={{
                  background: "#160c0e",
                  border: "1px solid #381a1e",
                  color: "#d8d4cc",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  padding: "7px 16px",
                  textTransform: "uppercase",
                }}
              >
                {partner}
              </span>
            ))}
          </div>
        </section>

        {/* ── RETURN CTA ── */}
        <div style={{ textAlign: "center" }}>
          <Link href="/#home" className="rdr-btn-ghost" style={{ fontSize: "0.8rem" }}>
            <span>← RETURN TO ARENA</span>
          </Link>
        </div>
      </div>
    </main>
  );
}