"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PastEventsPage from "./past-events/page";
import HighlightsPage from "./highlights/page";
import WhySponsorUsPage from "./why-sponsor-us/page";
import CrewPage from "./crew/page";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import TimelinePage from "./timeline/page";

const registrationStart = new Date("2026-11-04T00:00:00+05:30").getTime();

/* ── neon corner colours per unit ── */
const UNIT_COLORS = ["#cc1118", "#cc1118", "#cc1118", "#cc1118"] as const;

function CountdownTimer() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, registrationStart - Date.now()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (remaining === null) return null;

  if (remaining === 0) {
    return (
      <p style={{
        color: "#e51b24", fontSize: "1rem", fontWeight: 800,
        letterSpacing: "0.18em", textTransform: "uppercase",
        textAlign: "center", fontFamily: "'Oswald', sans-serif",
      }}>
        REGISTRATION IS NOW LIVE
      </p>
    );
  }

  const s = Math.floor(remaining / 1000);
  const units = [
    { val: Math.floor(s / 86400),            label: "DAYS" },
    { val: Math.floor((s % 86400) / 3600),   label: "HOURS" },
    { val: Math.floor((s % 3600) / 60),      label: "MINS" },
    { val: s % 60,                            label: "SECS" },
  ];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
    }}>
      {/* "LAUNCH INITIATED" label */}
      <p style={{
        fontFamily: "'Oswald', sans-serif",
        fontSize: "0.78rem",
        fontWeight: 700,
        letterSpacing: "0.3em",
        color: "#e51b24",
        textTransform: "uppercase",
        marginBottom: 4,
        textAlign: "center",
        textShadow: "0 0 12px rgba(229,27,36,0.6)",
      }}>
        LAUNCH INITIATED
      </p>

      {/* cards row */}
      <div style={{
        display: "flex",
        gap: "clamp(8px, 2vw, 16px)",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        {units.map(({ val, label }, i) => {
          const color = UNIT_COLORS[i];
          return (
            <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              {/* card */}
              <div style={{
                position: "relative",
                width: "clamp(72px, 12vw, 96px)",
                height: "clamp(72px, 12vw, 96px)",
                background: "#0c0a10",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {/* corner brackets — top-left */}
                <span style={{ position:"absolute", top:0, left:0, width:12, height:12,
                  borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
                {/* top-right */}
                <span style={{ position:"absolute", top:0, right:0, width:12, height:12,
                  borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />
                {/* bottom-left */}
                <span style={{ position:"absolute", bottom:0, left:0, width:12, height:12,
                  borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` }} />
                {/* bottom-right */}
                <span style={{ position:"absolute", bottom:0, right:0, width:12, height:12,
                  borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` }} />

                {/* number */}
                <strong style={{
                  fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                  fontSize: "clamp(2rem, 4.5vw, 2.8rem)",
                  lineHeight: 1,
                  color: "#f5f1ea",
                  letterSpacing: "0.04em",
                  textShadow: `0 0 18px ${color}55`,
                }}>
                  {String(val).padStart(2, "0")}
                </strong>
              </div>

              {/* label */}
              <span style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: color,
                textTransform: "uppercase",
                textShadow: `0 0 8px ${color}88`,
              }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TRAIL CAROUSEL — 3D fan/arc layout, auto-rotates 10s
══════════════════════════════════════════════════════ */
const TRAILS = [
  {
    roman: "I",
    name: "Open Innovation",
    tag: "UNRESTRICTED",
    desc: "Healthcare, climate-tech, fintech, edtech — any domain that solves real national challenges.",
    color: "#cc1118",
    accent: "#ff3040",
    bg: "linear-gradient(160deg, #2a0608 0%, #1a0306 50%, #0d0204 100%)",
    bgLight: "rgba(204,17,24,0.12)",
  },
  {
    roman: "II",
    name: "AgroTech",
    tag: "AGRICULTURE",
    desc: "Smart farming, precision agriculture, crop monitoring and rural supply-chain innovation.",
    color: "#d4900a",
    accent: "#f0b030",
    bg: "linear-gradient(160deg, #1e1200 0%, #140d00 50%, #0c0800 100%)",
    bgLight: "rgba(212,144,10,0.12)",
  },
  {
    roman: "III",
    name: "EduTech",
    tag: "EDUCATION",
    desc: "Next-gen learning systems, adaptive AI tutors, gamified education and accessibility tools.",
    color: "#1060b8",
    accent: "#2888ee",
    bg: "linear-gradient(160deg, #040e1e 0%, #030a16 50%, #02060e 100%)",
    bgLight: "rgba(16,96,184,0.12)",
  },
  {
    roman: "IV",
    name: "WildVision Tech",
    tag: "WILDLIFE & ENV",
    desc: "Wildlife tracking, biodiversity monitoring, conservation AI and environmental sensing.",
    color: "#0e8844",
    accent: "#18c060",
    bg: "linear-gradient(160deg, #041008 0%, #030c06 50%, #020804 100%)",
    bgLight: "rgba(14,136,68,0.12)",
  },
  {
    roman: "V",
    name: "MedTech",
    tag: "HEALTHCARE",
    desc: "Diagnostic AI, remote patient monitoring, medical imaging and health data infrastructure.",
    color: "#900090",
    accent: "#cc20cc",
    bg: "linear-gradient(160deg, #130413 0%, #0d030d 50%, #080208 100%)",
    bgLight: "rgba(144,0,144,0.12)",
  },
];

function TrailCarousel() {
  const [active, setActive] = useState(2);
  const [animDir, setAnimDir] = useState<"left"|"right">("right");

  useEffect(() => {
    const id = window.setInterval(() => {
      setAnimDir("right");
      setActive(a => (a + 1) % TRAILS.length);
    }, 10000);
    return () => window.clearInterval(id);
  }, []);

  const goTo = (idx: number) => {
    if (idx === active) return;
    setAnimDir(idx > active ? "right" : "left");
    setActive(idx);
  };

  /* 3-D transform for each card relative to active */
  const getCardStyle = (i: number): React.CSSProperties => {
    const diff = i - active;
    const absDiff = Math.abs(diff);

    /* cards more than 2 away are hidden */
    if (absDiff > 2) return { display: "none" };

    const rotY   = diff * 38;          /* degrees — tilt left/right */
    const transX = diff * 200;         /* px — spread horizontally */
    const transZ = -absDiff * 120;     /* depth — recede into bg */
    const scale  = 1 - absDiff * 0.14;
    const opacity = 1 - absDiff * 0.28;
    const zIndex = 10 - absDiff;

    return {
      position:  "absolute",
      top:       "50%",
      left:      "50%",
      transform: `translate(-50%, -50%) translateX(${transX}px) translateZ(${transZ}px) rotateY(${rotY}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: "all 0.55s cubic-bezier(0.22,1,0.36,1)",
      cursor:    absDiff === 0 ? "default" : "pointer",
    };
  };

  const trail = TRAILS[active];

  return (
    <div id="tracks-list" style={{ width:"100%", position:"relative", zIndex:1 }}>

      {/* progress bars */}
      <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:36, padding:"0 24px" }}>
        {TRAILS.map((t, i) => (
          <button
            key={i} type="button" onClick={() => goTo(i)}
            aria-label={`Trail ${t.roman}`}
            style={{
              flex:1, maxWidth:90, height:3, border:"none", cursor:"pointer",
              borderRadius:2, padding:0, overflow:"hidden",
              background: i === active ? "transparent" : "#1e1415",
              position:"relative",
            }}
          >
            {i === active && (
              <span style={{
                position:"absolute", inset:0,
                background: trail.color,
                transformOrigin:"left",
                animation:"track-progress 10s linear forwards",
              }} />
            )}
            {i !== active && (
              <span style={{ display:"block", width:"100%", height:"100%", background:"#1e1415" }} />
            )}
          </button>
        ))}
      </div>

      {/* 3D fan stage */}
      <div style={{
        width:"100%",
        height: "clamp(340px, 45vw, 480px)",
        position:"relative",
        perspective:"1000px",
        perspectiveOrigin:"50% 50%",
        transformStyle:"preserve-3d",
        overflow:"hidden",
      }}>

        {/* left fade */}
        <div style={{ position:"absolute", top:0, left:0, bottom:0, width:"15%", background:"linear-gradient(to right, #070606, transparent)", zIndex:20, pointerEvents:"none" }} />
        {/* right fade */}
        <div style={{ position:"absolute", top:0, right:0, bottom:0, width:"15%", background:"linear-gradient(to left, #070606, transparent)", zIndex:20, pointerEvents:"none" }} />

        {TRAILS.map((t, i) => {
          const diff    = i - active;
          const absDiff = Math.abs(diff);
          if (absDiff > 2) return null;

          const rotY   = diff * 36;
          const transX = diff * 210;
          const transZ = -absDiff * 110;
          const scale  = 1 - absDiff * 0.13;
          const opacity= 1 - absDiff * 0.25;
          const isCenter = i === active;

          return (
            <div
              key={t.roman}
              onClick={() => goTo(i)}
              style={{
                position:  "absolute",
                top:       "50%",
                left:      "50%",
                width:     "clamp(200px, 22vw, 260px)",
                height:    "clamp(300px, 34vw, 400px)",
                transform: `translate(-50%, -50%) translateX(${transX}px) translateZ(${transZ}px) rotateY(${rotY}deg) scale(${scale})`,
                opacity,
                zIndex:    10 - absDiff,
                transition:"all 0.55s cubic-bezier(0.22,1,0.36,1)",
                cursor:    isCenter ? "default" : "pointer",
                borderRadius: 16,
                overflow:  "hidden",
                background: isCenter ? t.bg : "linear-gradient(160deg, #100808 0%, #080404 100%)",
                border:    `${isCenter ? 2 : 1}px solid ${isCenter ? t.color : "#2a1618"}`,
                boxShadow: isCenter
                  ? `0 24px 60px rgba(0,0,0,0.9), 0 0 50px ${t.color}44`
                  : "0 8px 28px rgba(0,0,0,0.7)",
              }}
            >
              {/* top accent line */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(to right, ${t.color}, transparent)` }} />

              {/* watermark numeral */}
              <div style={{
                position:"absolute", top:"50%", left:"50%",
                transform:"translate(-50%,-50%)",
                fontFamily:"'Cinzel',serif", fontWeight:900,
                fontSize:"clamp(6rem,14vw,10rem)",
                color:`${t.color}08`,
                lineHeight:1, userSelect:"none", pointerEvents:"none",
                whiteSpace:"nowrap",
              }}>
                {t.roman}
              </div>

              {/* content */}
              <div style={{ position:"relative", zIndex:1, height:"100%", display:"flex", flexDirection:"column", padding:"28px 22px 24px" }}>

                {/* tag */}
                <div style={{
                  display:"inline-flex", alignItems:"center", gap:5,
                  background:`${t.color}18`, border:`1px solid ${t.color}44`,
                  borderRadius:4, padding:"3px 10px", width:"fit-content", marginBottom:"auto",
                }}>
                  <div style={{ width:4, height:4, borderRadius:"50%", background:t.color }} />
                  <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.16em", color:t.color, textTransform:"uppercase" }}>
                    {t.tag}
                  </span>
                </div>

                {/* Roman numeral */}
                <div style={{
                  fontFamily:"'Cinzel',serif", fontWeight:900,
                  fontSize:"clamp(3rem,6vw,4.5rem)",
                  color: isCenter ? t.accent : t.color,
                  lineHeight:0.95,
                  textShadow: isCenter ? `0 0 30px ${t.color}88` : "none",
                  marginBottom:10,
                }}>
                  {t.roman}
                </div>

                {/* diamond */}
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
                  <div style={{ width:24, height:1, background:`${t.color}44` }} />
                  <svg width="6" height="6" viewBox="0 0 8 8"><path d="M4,0 L8,4 L4,8 L0,4 Z" fill={t.color} opacity={0.6} /></svg>
                  <div style={{ width:24, height:1, background:`${t.color}44` }} />
                </div>

                {/* name */}
                <h3 style={{
                  fontFamily:"'Bebas Neue','Oswald',sans-serif",
                  fontSize:"clamp(1.2rem,2.2vw,1.65rem)",
                  letterSpacing:"0.05em",
                  color: isCenter ? "#f5f1ea" : "#6a5050",
                  textTransform:"uppercase",
                  lineHeight:1.1,
                  margin:"0 0 10px",
                }}>
                  {t.name}
                </h3>

                {/* desc — only on center */}
                {isCenter && (
                  <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", lineHeight:1.65, color:"#7a7068", margin:0 }}>
                    {t.desc}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* bottom info strip for active card */}
      <div style={{ textAlign:"center", padding:"24px 24px 0", position:"relative", zIndex:1 }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:"0.6rem", fontWeight:600, letterSpacing:"0.2em", color:"#3d2829", textTransform:"uppercase", marginBottom:6 }}>
          TRAIL No. {trail.roman} &nbsp;—&nbsp; {active + 1} / {TRAILS.length}
        </div>
        {/* dot indicators */}
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:14 }}>
          {TRAILS.map((t, i) => (
            <button
              key={i} type="button" onClick={() => goTo(i)}
              aria-label={`Trail ${t.roman}`}
              style={{
                width: i === active ? 28 : 8, height:8, borderRadius:4, padding:0,
                border:"none", cursor:"pointer",
                background: i === active ? trail.color : "#1e1415",
                transition:"all 0.3s ease",
                boxShadow: i === active ? `0 0 8px ${trail.color}88` : "none",
              }}
            />
          ))}
        </div>

        {/* arrow nav */}
        <div style={{ display:"flex", justifyContent:"center", gap:12, marginTop:20 }}>
          <button
            type="button" onClick={() => goTo((active - 1 + TRAILS.length) % TRAILS.length)}
            aria-label="Previous"
            style={{
              width:44, height:44, borderRadius:"50%",
              border:`1px solid ${trail.color}55`, background:"transparent",
              color:trail.color, fontSize:"1.1rem", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${trail.color}22`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >←</button>
          <button
            type="button" onClick={() => goTo((active + 1) % TRAILS.length)}
            aria-label="Next"
            style={{
              width:44, height:44, borderRadius:"50%",
              border:`1px solid ${trail.color}`, background:trail.color,
              color:"#f5f1ea", fontSize:"1.1rem", cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:`0 0 16px ${trail.color}66`,
              transition:"all 0.2s",
            }}
          >→</button>
        </div>
      </div>
    </div>
  );
}
export default function Home() {
  const [selectedTrailer, setSelectedTrailer] = useState<{
    title: string;
    tag: string;
    videoUrl: string;
    description: string;
  } | null>(null);

  /* ── Load Devfolio SDK dynamically (per official docs) ── */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const mediaItems = [
    {
      title: "Official HackSprint 3.0 Teaser",
      tag: "TRAILER",
      image: "/rdr/trailer_1.jpg",
      videoUrl: "https://www.youtube.com/embed/eaW0tYpxyp0?autoplay=1",
      description: "Witness the launch of Season 3.0. 500+ builders, 36 hours of relentless sprint, and infinite innovation.",
    },
    {
      title: "HackSprint Online: The Arena",
      tag: "TRAILER",
      image: "/rdr/trailer_2.jpg",
      videoUrl: "https://www.youtube.com/embed/gmA6MrX81z4?autoplay=1",
      description: "Step inside the high-octane 36-hour physical arena at Karpagam Academy of Higher Education.",
    },
    {
      title: "The Campus of Karpagam Academy",
      tag: "VIDEO",
      image: "/rdr/trailer_3.jpg",
      videoUrl: "https://www.youtube.com/embed/0G3_kG5FFfQ?autoplay=1",
      description: "Take a tour through state-of-the-art supercomputing labs, gigabit fiber network, and amphitheater.",
    },
    {
      title: "Championship: Outlaw Tech",
      tag: "TRAILER",
      image: "/rdr/trailer_4.jpg",
      videoUrl: "https://www.youtube.com/embed/H2S4zFfK41U?autoplay=1",
      description: "The championship bounties, winner belts, and startup incubation packages awaiting the victorious posse.",
    },
  ];

  return (
    <div style={{ background: "#070606", color: "#f5f1ea", overflowX: "hidden" }}>
      {/* ── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          background: "radial-gradient(ellipse at 80% 40%, rgba(138, 12, 16, 0.45) 0%, rgba(7, 6, 6, 0.95) 75%), #070606",
          overflow: "hidden",
          borderBottom: "1px solid #201315",
        }}
      >
        {/* ── Top-right logos cluster ── */}
        <div style={{
          position: "absolute",
          top: 24,
          right: 28,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 14px",
          background: "rgba(7,6,6,0.55)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 4,
        }}>
          {[
            { src: "/logo/KARPAGAM LOGO (1).png", alt: "Karpagam" },
            { src: "/logo/meta.png",              alt: "Metaverse Club" },
            { src: "/logo/iic.png",               alt: "IIC" },
            { src: "/logo/incubation.png",        alt: "Incubation" },
            { src: "/logo/image.png",             alt: "Logo" },
          ].map((logo, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
              {i > 0 && (
                <div style={{ width:1, height:28, background:"rgba(255,255,255,0.1)", marginRight:10, flexShrink:0 }} />
              )}
              <Image
                src={logo.src}
                alt={logo.alt}
                width={36}
                height={36}
                style={{
                  objectFit: "contain",
                  width: 36,
                  height: 36,
                  filter: "brightness(1.1)",
                  opacity: 0.9,
                }}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <Image
            src="/rdr/bg.png"
            alt="Red Dead Style Hackathon Key Art"
            fill
            priority
            style={{
              objectFit: "cover",
              objectPosition: "center right",
              opacity: 0.92,
            }}
          />
          {/* Dark gradient overlay on left for razor-sharp typography contrast */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, #070606 0%, rgba(7, 6, 6, 0.94) 42%, rgba(7, 6, 6, 0.6) 68%, rgba(7, 6, 6, 0.2) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "120px",
              background: "linear-gradient(to top, #070606 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Hero Content Container */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1360px",
            width: "100%",
            margin: "0 auto",
            padding: "80px 32px 70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ── LEFT: text content ── */}
          <div style={{ maxWidth: "620px" }}>
            {/* Kicker: ROCKSTAR GAMES PRESENTS style */}
            <p
              className="rdr-kicker"
              style={{
                marginBottom: "14px",
                display: "inline-block",
                textShadow: "0 0 12px rgba(229, 27, 36, 0.5)",
              }}
            >
              DEPARTMENT OF COMPUTER SCIENCE &amp; METAVERSE CLUB PRESENTS
            </p>

            {/* Massive RDR2 Style Title */}
            <h1
              style={{
                fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                fontSize: "clamp(3.8rem, 8.5vw, 6.8rem)",
                lineHeight: 0.92,
                letterSpacing: "0.04em",
                color: "#f5f1ea",
                textTransform: "uppercase",
                margin: "0 0 12px",
                textShadow: "0 8px 30px rgba(0, 0, 0, 0.95)",
              }}
            >
              HACKSPRINT
              <br />
              <span
                style={{
                  fontFamily: "'Cinzel', 'Bebas Neue', serif",
                  color: "#e51b24",
                  fontSize: "clamp(4.2rem, 9.5vw, 7.8rem)",
                  fontWeight: 900,
                  textShadow: "0 0 35px rgba(229, 27, 36, 0.6), 0 8px 30px rgba(0,0,0,0.9)",
                }}
              >
                III
              </span>
            </h1>

            {/* Red Star Separator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#e51b24",
                marginBottom: "20px",
              }}
            >
              <span style={{ fontSize: "1.1rem", textShadow: "0 0 10px #e51b24" }}>★</span>
              <div style={{ width: "90px", height: "1.5px", background: "#e51b24", opacity: 0.8 }} />
            </div>

            {/* Location & Tagline */}
            <div
              style={{
                fontFamily: "'Oswald', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                lineHeight: 1.35,
                marginBottom: "32px",
              }}
            >
              <div style={{ color: "#d8d4cc", fontSize: "1.05rem", fontWeight: 700 }}>
                COIMBATORE, 2026.
              </div>
              <div style={{ color: "#8e8880", fontSize: "0.95rem", fontWeight: 500 }}>
                THE ULTIMATE HACKATHON BATTLEFIELD HAS BEGUN.
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>

              {/* ── Official Apply with Devfolio button ── */}
              <div
                className="apply-button"
                data-hackathon-slug="hacksprint-3-0"
                data-button-theme="dark"
                style={{ height: "44px", width: "312px" }}
              />

              {/* Join WhatsApp — ghost */}
              <a
                href="https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K"
                target="_blank"
                rel="noreferrer"
                className="rdr-btn-ghost"
              >
                {/* WhatsApp icon */}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#25d366", flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>JOIN WHATSAPP</span>
              </a>

              {/* Download Brochure — ghost */}
              <a
                href="/pdf/HS3_Brochure.pdf"
                download="HackSprint3_Brochure.pdf"
                className="rdr-btn-ghost"
              >
                {/* download icon */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>BROCHURE</span>
              </a>
            </div>
          </div>

          {/* ── RIGHT: hack.png logo + countdown below ── */}
          <div
            className="hero-logo-right"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              paddingLeft: "40px",
              gap: "32px",
              marginBottom: "60px",
            }}
          >
            {/* logo */}
            <Image
              src="/hack.png"
              alt="HackSprint 3.0"
              width={480}
              height={220}
              priority
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                filter: "drop-shadow(0 0 40px rgba(229,27,36,0.35)) drop-shadow(0 8px 30px rgba(0,0,0,0.8))",
              }}
            />

            {/* countdown directly below logo */}
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* ── DEVFOLIO SUPPORTED BY STRIP (required branding) ── */}
      <div style={{
        background: "#0a0708",
        borderBottom: "1px solid #1a1214",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}>
        <span style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: "#3d2829",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}>
          SUPPORTED BY
        </span>

        <div style={{ width: 1, height: 22, background: "#2a1b1d", flexShrink: 0 }} />

        {/*
          Devfolio verification requires an <img> with src pointing to
          their CDN and alt="Devfolio" — using official white logo on dark bg
        */}
        <a
          href="https://devfolio.co"
          target="_blank"
          rel="noreferrer"
          style={{ display: "flex", alignItems: "center" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://assets.devfolio.co/hackathons/default/assets/logo/logo.svg"
            alt="Devfolio"
            width={120}
            height={28}
            style={{ objectFit: "contain" }}
          />
        </a>
      </div>

      {/* ── 2. FOUR FEATURE CARDS (LIVING WORLD / RICH STORY / DYNAMIC GAMEPLAY / RED DEAD ONLINE) ── */}
      <section
        id="gameplay"
        style={{
          background: "#080607",
          borderBottom: "1px solid #1f1416",
          padding: "60px 24px",
        }}
      >
        <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {/* Card 1: Hat Icon - Living World */}
            <div
              style={{
                background: "#0f0c0d",
                border: "1px solid #28181a",
                padding: "36px 28px 30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#cc1118";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(204, 17, 24, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#28181a";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
              }}
            >
              {/* Cowboy Hat Icon */}
              <div style={{ color: "#e51b24", marginBottom: "18px" }}>
                <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.5 16.5C3.8 15.6 6 15 8 15c1.5 0 2.8.3 3.8.8.4-.9.9-1.8 1.4-2.6-1.5-.7-2.6-2.1-2.9-3.8-.5-.3-.9-.9-.9-1.6 0-1 .8-1.8 1.8-1.8h.4C12 4.4 13.5 3 15.5 3c2.5 0 4.5 2 4.5 4.5 0 .5-.1 1-.3 1.4.7.4 1.3 1.1 1.3 2 0 .8-.4 1.5-1.1 1.8-.4 2.2-1.9 3.9-3.9 4.6.8.5 1.8.7 3 .7 2 0 4.2-.6 5.5-1.5.3-.2.8-.1 1 .2.2.3.1.8-.2 1C23.6 18.9 20.8 20 18 20c-1.8 0-3.3-.4-4.5-1.1-.9.6-2 1.1-3.5 1.1-2.8 0-5.6-1.1-7.3-2.3-.3-.2-.4-.7-.2-1 .2-.3.7-.4 1-.2z" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "#f5f1ea",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                LIVING WORLD
              </h3>
              <p style={{ color: "#9e978d", fontSize: "0.86rem", lineHeight: 1.6, marginBottom: "20px", flex: 1 }}>
                A vast and atmospheric arena filled with 5+ cutting-edge tracks, industrial problem statements, and unforgettable moments.
              </p>
              <a
                href="#tracks-list"
                style={{
                  color: "#e51b24",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "gap 0.2s",
                }}
              >
                EXPLORE THE TRACKS &gt;
              </a>
            </div>

            {/* Card 2: Revolver Icon - Rich Story */}
            <div
              style={{
                background: "#0f0c0d",
                border: "1px solid #28181a",
                padding: "36px 28px 30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#cc1118";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(204, 17, 24, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#28181a";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
              }}
            >
              {/* Revolver Icon */}
              <div style={{ color: "#e51b24", marginBottom: "18px" }}>
                <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 7h-6V5c0-1.1-.9-2-2-2H7C5.9 3 5 3.9 5 5v2H3c-.6 0-1 .4-1 1s.4 1 1 1h2v3c0 2.8 2.2 5 5 5h1v4c0 .6.4 1 1 1s1-.4 1-1v-4h2c2.8 0 5-2.2 5-5V9h1c.6 0 1-.4 1-1s-.4-1-1-1zm-9 9c-1.7 0-3-1.3-3-3V5h4v8c0 1.7-1.3 3-3 3z" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "#f5f1ea",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                RICH STORY
              </h3>
              <p style={{ color: "#9e978d", fontSize: "0.86rem", lineHeight: 1.6, marginBottom: "20px", flex: 1 }}>
                An epic trial of honor, loyalty, all-night debugging and the choices that define your team&apos;s hackathon legacy.
              </p>
              <a
                href="#story"
                style={{
                  color: "#e51b24",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                DISCOVER THE STORY &gt;
              </a>
            </div>

            {/* Card 3: Campfire Icon - Dynamic Gameplay */}
            <div
              style={{
                background: "#0f0c0d",
                border: "1px solid #28181a",
                padding: "36px 28px 30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#cc1118";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(204, 17, 24, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#28181a";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
              }}
            >
              {/* Campfire Flame Icon */}
              <div style={{ color: "#e51b24", marginBottom: "18px" }}>
                <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c-.6 2.2-2 4.4-4 5.9C6 9.4 5 11.6 5 14c0 3.9 3.1 7 7 7s7-3.1 7-7c0-2.4-1-4.6-3-6.1-2-1.5-3.4-3.7-4-5.9zm0 16c-1.7 0-3-1.3-3-3 0-1.2.7-2.3 1.8-2.8.5-.2.8-.7.8-1.2 0-.3-.1-.6-.3-.8 1.4 1 2.7 2.4 2.7 4.8 0 1.7-1.3 3-3 3z" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "#f5f1ea",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                DYNAMIC SPRINT
              </h3>
              <p style={{ color: "#9e978d", fontSize: "0.86rem", lineHeight: 1.6, marginBottom: "20px", flex: 1 }}>
                Code, prototype, debug and pitch in a high-stakes arena where every line of code brings consequences and rewards.
              </p>
              <a
                href="#registration"
                style={{
                  color: "#e51b24",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                LEARN MORE &gt;
              </a>
            </div>

            {/* Card 4: Star in Circle Icon - Red Dead Online */}
            <div
              style={{
                background: "#0f0c0d",
                border: "1px solid #28181a",
                padding: "36px 28px 30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#cc1118";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(204, 17, 24, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#28181a";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
              }}
            >
              {/* Star in Circle Badge Icon */}
              <div style={{ color: "#e51b24", marginBottom: "18px" }}>
                <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.8-6.1l-1.2 3.8-3.1-2.3-3.1 2.3 1.2-3.8-3.1-2.3h3.9L12 6.8l1.2 3.8h3.9l-3.3 2.3z" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "#f5f1ea",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                HACKSPRINT ONLINE
              </h3>
              <p style={{ color: "#9e978d", fontSize: "0.86rem", lineHeight: 1.6, marginBottom: "20px", flex: 1 }}>
                Join your friends and forge your own path in the ever-evolving community posse on WhatsApp, Discord, and GitHub.
              </p>
              <a
                href="https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#e51b24",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                JOIN COMMUNITY ▶
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2.5 CROSSING MARQUEE TAPE STRIPS ────────────────────────────── */}
      <div style={{
        position: "relative",
        background: "#070606",
        height: 200,
        overflow: "hidden",
      }}>

        {/* Band 1 — top-left to bottom-right \ — crimson */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "200%",
          height: 54,
          background: "#cc1118",
          transform: "translate(-50%, -50%) translateY(-38px) rotate(-8deg)",
          transformOrigin: "center center",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          boxShadow: "0 6px 30px rgba(204,17,24,0.6)",
          zIndex: 4,
        }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"rgba(255,255,255,0.2)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:"rgba(0,0,0,0.35)", pointerEvents:"none" }} />
          <div style={{ display:"flex", whiteSpace:"nowrap", animation:"marquee-tape-ltr 14s linear infinite", willChange:"transform" }}>
            {[0,1,2,3,4].map(n => (
              <span key={n} style={{ fontFamily:"'Bebas Neue','Oswald',sans-serif", fontSize:"1.15rem", fontWeight:900, letterSpacing:"0.2em", color:"#0d0608", flexShrink:0 }}>
                &nbsp;INNOVATION&nbsp;|&nbsp;CODE&nbsp;|&nbsp;COMPETE&nbsp;|&nbsp;CONQUER&nbsp;|&nbsp;36 HOURS&nbsp;|&nbsp;21 LAKH&nbsp;|&nbsp;DEVELOP&nbsp;|&nbsp;DEPLOY&nbsp;|&nbsp;DISRUPT&nbsp;|&nbsp;NEXT LEVEL&nbsp;|&nbsp;AGROTECH&nbsp;|&nbsp;MEDTECH&nbsp;|&nbsp;EDUTECH&nbsp;|&nbsp;OPEN INNOVATION&nbsp;|&nbsp;WILDVISION&nbsp;|
              </span>
            ))}
          </div>
        </div>

        {/* Band 2 — bottom-left to top-right / — bone/cream */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "200%",
          height: 50,
          background: "#f5f1ea",
          transform: "translate(-50%, -50%) translateY(38px) rotate(8deg)",
          transformOrigin: "center center",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          boxShadow: "0 -6px 30px rgba(0,0,0,0.5)",
          zIndex: 4,
        }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"rgba(255,255,255,0.8)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:"rgba(0,0,0,0.12)", pointerEvents:"none" }} />
          <div style={{ display:"flex", whiteSpace:"nowrap", animation:"marquee-tape-rtl 18s linear infinite", willChange:"transform" }}>
            {[0,1,2,3,4].map(n => (
              <span key={n} style={{ fontFamily:"'Bebas Neue','Oswald',sans-serif", fontSize:"1.1rem", fontWeight:900, letterSpacing:"0.2em", color:"#cc1118", flexShrink:0 }}>
                &nbsp;OPEN INNOVATION&nbsp;|&nbsp;HACKSPRINT 3.0&nbsp;|&nbsp;COIMBATORE&nbsp;|&nbsp;KAHE&nbsp;|&nbsp;INNOVATION&nbsp;|&nbsp;CREATIVITY&nbsp;|&nbsp;TECHNOLOGY&nbsp;|&nbsp;FUTURE&nbsp;|&nbsp;DEVELOP&nbsp;|&nbsp;DEPLOY&nbsp;|&nbsp;DISRUPT&nbsp;|&nbsp;AGROTECH&nbsp;|&nbsp;MEDTECH&nbsp;|&nbsp;EDUTECH&nbsp;|
              </span>
            ))}
          </div>
        </div>

        {/* dark strip — thin, same \ angle, between the two */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "200%",
          height: 26,
          background: "#0d0608",
          border: "1px solid #2a1418",
          transform: "translate(-50%, -50%) rotate(-8deg)",
          transformOrigin: "center center",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          zIndex: 3,
        }}>
          <div style={{ display:"flex", whiteSpace:"nowrap", animation:"marquee-tape-rtl 28s linear infinite", willChange:"transform" }}>
            {[0,1,2,3,4].map(n => (
              <span key={n} style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.28em", color:"#3d1e20", textTransform:"uppercase", flexShrink:0 }}>
                &nbsp;★&nbsp;HACKSPRINT 3.0&nbsp;★&nbsp;NOV 8&nbsp;★&nbsp;500+ BUILDERS&nbsp;★&nbsp;36 HRS&nbsp;★&nbsp;COIMBATORE&nbsp;★&nbsp;KAHE&nbsp;★&nbsp;METAVERSE CLUB&nbsp;★&nbsp;DEPT. OF CSE&nbsp;★&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. STORY & ABOUT US / METAVERSE (ABOUT PAGE COMPONENT) ───────── */}
      <section id="story" style={{ scrollMarginTop: "70px" }}>
        <div id="about" style={{ position: "relative", top: "-70px" }} />
        <AboutPage isEmbedded={true} />
      </section>

      {/* ── 4. QUICK SPECS STRIP (5 HORIZONTAL ITEMS) ────────────────────── */}
      <section
        style={{
          background: "#080607",
          borderBottom: "1px solid #1f1416",
          padding: "36px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1360px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "28px 20px",
          }}
        >
          {/* Spec 1: Globe */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <div style={{ color: "#e51b24", flexShrink: 0, marginTop: "2px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#f5f1ea",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                }}
              >
                VAST OPEN WORLD
              </h4>
              <p style={{ color: "#8a8276", fontSize: "0.78rem", lineHeight: 1.45, margin: 0 }}>
                Explore breathtaking laboratories, campus grounds, and high-speed gigabit Wi-Fi.
              </p>
            </div>
          </div>

          {/* Spec 2: Crosshair */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <div style={{ color: "#e51b24", flexShrink: 0, marginTop: "2px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="22" y1="12" x2="18" y2="12" />
                <line x1="6" y1="12" x2="2" y2="12" />
                <line x1="12" y1="6" x2="12" y2="2" />
                <line x1="12" y1="22" x2="12" y2="18" />
              </svg>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#f5f1ea",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                }}
              >
                HUNT &amp; SURVIVE
              </h4>
              <p style={{ color: "#8a8276", fontSize: "0.78rem", lineHeight: 1.45, margin: 0 }}>
                Track elusive bugs, craft robust prototypes, and survive the 36-hour sprint.
              </p>
            </div>
          </div>

          {/* Spec 3: Cards */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <div style={{ color: "#e51b24", flexShrink: 0, marginTop: "2px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="13" height="16" rx="2" />
                <path d="M7 5V3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-2" />
              </svg>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#f5f1ea",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                }}
              >
                GAMES &amp; ACTIVITIES
              </h4>
              <p style={{ color: "#8a8276", fontSize: "0.78rem", lineHeight: 1.45, margin: 0 }}>
                Midnight gaming, poker, tech trivia, caffeine refueling, and food.
              </p>
            </div>
          </div>

          {/* Spec 4: Horseshoe / Bond */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <div style={{ color: "#e51b24", flexShrink: 0, marginTop: "2px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 4v7a7 7 0 0 0 14 0V4" />
                <path d="M5 8h4" />
                <path d="M15 8h4" />
              </svg>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#f5f1ea",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                }}
              >
                BOND WITH YOUR CREW
              </h4>
              <p style={{ color: "#8a8276", fontSize: "0.78rem", lineHeight: 1.45, margin: 0 }}>
                Pair-program, divide modules, and ride alongside your loyal teammates.
              </p>
            </div>
          </div>

          {/* Spec 5: 2 Users */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <div style={{ color: "#e51b24", flexShrink: 0, marginTop: "2px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#f5f1ea",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                }}
              >
                HACKSPRINT ONLINE
              </h4>
              <p style={{ color: "#8a8276", fontSize: "0.78rem", lineHeight: 1.45, margin: 0 }}>
                Build your profile, join the WhatsApp posse, and live the hacker life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6.5 TIMELINE SECTION (EMBEDDED) ─────────────────────────────── */}
      <TimelinePage />

      {/* ── 7. FIVE TRAILS — PARCHMENT CARDS ─────────────────────────────── */}
      <section
        id="online"
        style={{
          background: "#070606",
          borderBottom: "1px solid #1f1416",
          padding: "80px 24px 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 60% 40% at 50% 50%, rgba(204,17,24,0.06) 0%, transparent 100%)" }} />

        <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>

          {/* header */}
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <p style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.26em", color:"#e51b24", textTransform:"uppercase", marginBottom:10 }}>
              ✦ &nbsp;FIVE TRAILS NOW OPEN&nbsp; ✦
            </p>
            <h2 style={{ fontFamily:"'Bebas Neue','Oswald',sans-serif", fontSize:"clamp(2.4rem,5vw,3.8rem)", letterSpacing:"0.06em", color:"#f5f1ea", textTransform:"uppercase", margin:"0 0 12px" }}>
              CHOOSE YOUR BATTLEGROUND
            </h2>
            <p style={{ fontFamily:"'Cinzel',serif", fontStyle:"italic", fontSize:"clamp(0.8rem,1.4vw,0.95rem)", color:"#5a4a3a", margin:0 }}>
              Every outfit must choose one —
            </p>
          </div>

          {/* 5 dark theme cards */}
          <div id="tracks-list" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:20 }}>
            {([
              { num:"I",   title:"Open Innovation",    tag:"UNRESTRICTED", desc:"Healthcare, climate-tech, fintech, edtech — any domain that solves real national challenges." },
              { num:"II",  title:"AgroTech",            tag:"AGRICULTURE",  desc:"Smart farming, precision agriculture, crop monitoring and rural supply-chain innovation." },
              { num:"III", title:"EduTech",             tag:"EDUCATION",    desc:"Next-gen learning systems, adaptive AI tutors, gamified education and accessibility tools." },
              { num:"IV",  title:"WildVision Tech",     tag:"WILDLIFE",     desc:"Wildlife tracking, biodiversity monitoring, conservation AI and environmental sensing." },
              { num:"V",   title:"MedTech",             tag:"HEALTHCARE",   desc:"Diagnostic AI, remote patient monitoring, medical imaging and health data infrastructure." },
            ] as { num: string; title: string; tag: string; desc: string }[]).map((track, i) => (
              <div
                key={track.num}
                style={{
                  background:"linear-gradient(160deg, #0f0a0b 0%, #130d0e 100%)",
                  border:"1px solid #2a1b1d",
                  borderTop:"3px solid #e51b24",
                  padding:"28px 20px 24px",
                  position:"relative",
                  overflow:"hidden",
                  transition:"transform 0.25s ease, box-shadow 0.25s ease",
                  display:"flex",
                  flexDirection:"column",
                  gap:12,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.boxShadow = "0 16px 40px rgba(204,17,24,0.18)";
                  el.style.borderColor = "#e51b24";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                  el.style.borderColor = "#2a1b1d";
                }}
              >
                {/* corner accents */}
                <div style={{ position:"absolute", top:0, left:0, width:28, height:28, borderRight:"1px solid #2a1b1d", borderBottom:"1px solid #2a1b1d", background:"rgba(204,17,24,0.04)" }} />
                <div style={{ position:"absolute", bottom:0, right:0, width:28, height:28, borderLeft:"1px solid #2a1b1d", borderTop:"1px solid #2a1b1d", background:"rgba(204,17,24,0.04)" }} />

                {/* roman numeral watermark */}
                <div style={{ position:"absolute", bottom:10, right:14, fontFamily:"'Cinzel',serif", fontWeight:900, fontSize:"4rem", color:"rgba(229,27,36,0.04)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>
                  {track.num}
                </div>

                {/* phase label */}
                <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.22em", color:"#e51b24", textTransform:"uppercase", position:"relative", zIndex:1 }}>
                  TRAIL {track.num}
                </div>

                {/* title */}
                <h3 style={{ fontFamily:"'Bebas Neue','Oswald',sans-serif", fontSize:"clamp(1.1rem,1.8vw,1.45rem)", letterSpacing:"0.05em", color:"#f5f1ea", textTransform:"uppercase", margin:0, lineHeight:1.15, position:"relative", zIndex:1 }}>
                  {track.title}
                </h3>

                {/* tag badge */}
                <div style={{
                  display:"inline-flex", alignItems:"center", gap:6,
                  border:"1px solid #2a1b1d", background:"rgba(204,17,24,0.07)",
                  padding:"3px 10px", width:"fit-content", position:"relative", zIndex:1,
                }}>
                  <span style={{ width:4, height:4, borderRadius:"50%", background:"#e51b24", boxShadow:"0 0 5px rgba(229,27,36,0.8)", flexShrink:0 }} />
                  <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.14em", color:"#e51b24", textTransform:"uppercase" }}>
                    {track.tag}
                  </span>
                </div>

                {/* divider */}
                <div style={{ width:"100%", height:1, background:"linear-gradient(to right, #e51b24, transparent)", opacity:0.3, position:"relative", zIndex:1 }} />

                {/* description */}
                <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.76rem", lineHeight:1.65, color:"#7a7068", margin:0, position:"relative", zIndex:1 }}>
                  {track.desc}
                </p>
              </div>
            ))}
          </div>

          {/* bottom diamond ornament */}
          <div style={{ display:"flex", justifyContent:"center", marginTop:40 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:60, height:1, background:"linear-gradient(to left, #3d1e20, transparent)" }} />
              <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5,0 L10,5 L5,10 L0,5 Z" fill="#3d1e20" /></svg>
              <div style={{ width:60, height:1, background:"linear-gradient(to right, #3d1e20, transparent)" }} />
            </div>
          </div>

          {/* marquee strip */}
          <div style={{ overflow:"hidden", background:"#cc1118", borderTop:"2px solid #e51b24", borderBottom:"2px solid #7a0a0e", padding:"10px 0", marginTop:48 }}>
            <div style={{ display:"flex", whiteSpace:"nowrap", animation:"marquee-tape-ltr 20s linear infinite" }}>
              {[0,1].map(n => (
                <span key={n} style={{ fontFamily:"'Bebas Neue','Oswald',sans-serif", fontSize:"1rem", fontWeight:900, letterSpacing:"0.2em", color:"#0d0608", flexShrink:0 }}>
                  &nbsp;★&nbsp;OPEN INNOVATION&nbsp;★&nbsp;AGROTECH&nbsp;★&nbsp;EDUTECH&nbsp;★&nbsp;WILDVISION TECH&nbsp;★&nbsp;MEDTECH&nbsp;★&nbsp;FIVE TRAILS&nbsp;★&nbsp;CHOOSE YOUR BATTLEGROUND&nbsp;★&nbsp;HACKSPRINT 3.0&nbsp;★&nbsp;36 HOURS&nbsp;★&nbsp;500+ BUILDERS&nbsp;★&nbsp;COIMBATORE&nbsp;★&nbsp;
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7.5 OUR SPONSORS ─────────────────────────────────────────────── */}
      <section
        id="our-sponsors"
        style={{
          background: "#070606",
          borderTop: "1px solid #1f1416",
          borderBottom: "1px solid #1f1416",
          padding: "80px 24px 90px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ambient glow */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 50% 40% at 50% 50%, rgba(204,17,24,0.06) 0%, transparent 100%)" }} />

        <div style={{ maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1 }}>

          {/* header */}
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <p style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.26em", color:"#e51b24", textTransform:"uppercase", marginBottom:10 }}>
              ✦ &nbsp;OFFICIAL SPONSORS&nbsp; ✦
            </p>
            <h2 style={{ fontFamily:"'Bebas Neue','Oswald',sans-serif", fontSize:"clamp(2.4rem,5vw,3.8rem)", letterSpacing:"0.06em", color:"#f5f1ea", textTransform:"uppercase", margin:"0 0 14px" }}>
              BACKED BY THE FRONTIER
            </h2>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
              <div style={{ width:48, height:1, background:"linear-gradient(to left, #e51b24, transparent)" }} />
              <span style={{ color:"#e51b24", fontSize:"0.75rem" }}>✦</span>
              <div style={{ width:48, height:1, background:"linear-gradient(to right, #e51b24, transparent)" }} />
            </div>
          </div>

          {/* GOLD tier */}
          <div style={{ marginBottom:52 }}>
            {/* tier badge */}
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32 }}>
              <div style={{ flex:1, height:1, background:"linear-gradient(to right, transparent, #c8960040)" }} />
              <div style={{
                display:"flex", alignItems:"center", gap:8,
                background:"linear-gradient(135deg, #c8960018, #c8960008)",
                border:"1px solid #c8960055",
                padding:"6px 20px", borderRadius:2,
              }}>
                {/* gold star */}
                <span style={{ fontSize:"1rem", color:"#c89600" }}>★</span>
                <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.22em", color:"#c89600", textTransform:"uppercase" }}>
                  GOLD SPONSOR
                </span>
                <span style={{ fontSize:"1rem", color:"#c89600" }}>★</span>
              </div>
              <div style={{ flex:1, height:1, background:"linear-gradient(to left, transparent, #c8960040)" }} />
            </div>

            {/* Devfolio card */}
            <div style={{ display:"flex", justifyContent:"center" }}>
              <div
                style={{
                  display:"flex", flexDirection:"column", alignItems:"center",
                  gap:20, padding:"36px 48px",
                  background:"linear-gradient(145deg, #0f0a0b 0%, #130d0e 100%)",
                  border:"1px solid #c8960030",
                  borderTop:"3px solid #c89600",
                  boxShadow:"0 12px 40px rgba(0,0,0,0.7), 0 0 40px rgba(200,150,0,0.06)",
                  maxWidth:340, width:"100%",
                  position:"relative",
                  overflow:"hidden",
                }}
              >
                {/* gold shimmer corner */}
                <div style={{ position:"absolute", top:0, left:0, width:60, height:60, background:"radial-gradient(circle at 0 0, rgba(200,150,0,0.08), transparent 70%)", pointerEvents:"none" }} />
                <div style={{ position:"absolute", top:0, right:0, width:60, height:60, background:"radial-gradient(circle at 100% 0, rgba(200,150,0,0.08), transparent 70%)", pointerEvents:"none" }} />

                {/* logo */}
                <div style={{
                  width: 220,
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://assets.devfolio.co/hackathons/default/assets/logo/logo.svg"
                    alt="Devfolio"
                    width={160}
                    height={36}
                    style={{ objectFit: "contain", width: "100%", height: "100%" }}
                  />
                </div>

                {/* name */}
                <div style={{ textAlign:"center" }}>
                  <h3 style={{ fontFamily:"'Bebas Neue','Oswald',sans-serif", fontSize:"1.5rem", letterSpacing:"0.08em", color:"#f5f1ea", margin:"0 0 6px", textTransform:"uppercase" }}>
                    Devfolio
                  </h3>
                  <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", lineHeight:1.6, color:"#7a7068", margin:"0 0 14px" }}>
                    India&apos;s leading hackathon platform powering thousands of builders across the country.
                  </p>
                  <a
                    href="https://devfolio.co"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display:"inline-flex", alignItems:"center", gap:6,
                      fontFamily:"'Oswald',sans-serif", fontSize:"0.68rem", fontWeight:700,
                      letterSpacing:"0.14em", color:"#c89600", textTransform:"uppercase",
                      textDecoration:"none",
                    }}
                  >
                    VISIT DEVFOLIO ↗
                  </a>
                </div>

                {/* gold star badge */}
                <div style={{
                  position:"absolute", top:14, right:14,
                  display:"flex", alignItems:"center", gap:5,
                }}>
                  <span style={{ color:"#c89600", fontSize:"0.75rem" }}>★</span>
                  <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.55rem", fontWeight:700, letterSpacing:"0.14em", color:"#c89600", textTransform:"uppercase" }}>
                    GOLD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* more sponsors coming */}
          <div style={{ textAlign:"center", paddingTop:20, borderTop:"1px solid #1e1415" }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontStyle:"italic", fontSize:"0.82rem", color:"#3d2829" }}>
              More sponsors to be announced — stay tuned
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. PAST EVENTS & RETROSPECTIVE (HACKSPRINT 2.0 ARCHIVE) ───── */}
      <section id="past-events" style={{ borderTop: "1px solid #1f1416", scrollMarginTop: "80px" }}>
        <PastEventsPage />
      </section>

      {/* ── 9. HIGHLIGHTS GALLERY ───────────────────────────────────────── */}
      <section id="highlights" style={{ borderTop: "1px solid #1f1416", scrollMarginTop: "80px" }}>
        <HighlightsPage />
      </section>

      {/* ── 10. WHY SPONSOR US (PATRONAGE & SPONSOR PACKAGES) ───────────── */}
      <section id="sponsors" style={{ borderTop: "1px solid #1f1416", scrollMarginTop: "80px" }}>
        <WhySponsorUsPage />
      </section>

      {/* ── 11. MEET THE CREW (CONVENERS & ORGANIZING POSSE) ───────────── */}
      <section id="crew" style={{ borderTop: "1px solid #1f1416", scrollMarginTop: "80px" }}>
        <CrewPage />
      </section>


      {/* ── 13. OFFICIAL DISPATCH & CONTACT ────────────────────────────── */}
      <section id="contact" style={{ borderTop: "1px solid #1f1416", scrollMarginTop: "80px" }}>
        <ContactPage />
      </section>

      {/* ── 14. TRAILER MODAL PREVIEW ────────────────────────────────────── */}
      {selectedTrailer && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 600,
            background: "rgba(5, 4, 4, 0.92)",
            backdropFilter: "blur(14px)",
            display: "grid",
            placeItems: "center",
            padding: "24px",
          }}
          onClick={() => setSelectedTrailer(null)}
        >
          <div
            style={{
              position: "relative",
              width: "min(960px, 100%)",
              background: "#0d0a0b",
              border: "2px solid #3d1b1f",
              boxShadow: "0 25px 90px rgba(0,0,0,0.95), 0 0 50px rgba(229, 27, 36, 0.3)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                borderBottom: "1px solid #231618",
                background: "#080607",
              }}
            >
              <div>
                <span
                  style={{
                    color: "#e51b24",
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                  }}
                >
                  {selectedTrailer.tag} PREVIEW
                </span>
                <h3
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: "1.2rem",
                    color: "#f5f1ea",
                    margin: "2px 0 0",
                  }}
                >
                  {selectedTrailer.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTrailer(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#8a8276",
                  fontSize: "1.4rem",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {/* Video Player Frame */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "#000" }}>
              <iframe
                src={selectedTrailer.videoUrl}
                title={selectedTrailer.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: 0 }}
              />
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: "18px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "14px",
                background: "#080607",
              }}
            >
              <p style={{ color: "#9e978d", fontSize: "0.85rem", margin: 0, maxWidth: "620px" }}>
                {selectedTrailer.description}
              </p>
              <a href="#registration" onClick={() => setSelectedTrailer(null)} className="rdr-btn-red">
                <span>REGISTER NOW</span>
                <span>&gt;</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
