"use client";

import { useEffect, useState } from "react";
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
    accent: "#e51b24",
    highlights: ["80+ Finalist Teams", "Auditorium Packed", "Nationwide Outreach"],
  },
  {
    step: "ACT 02",
    tag: "THE GRIND",
    title: "36 Hours In The Arena",
    desc: "From twilight until dawn, teams turned abstract concepts into functional software and hardware prototypes across 5 high-impact tracks, supported by 24/7 industry mentors.",
    image: "/past-events/hacksprint-2-3.jpg",
    accent: "#e51b24",
    highlights: ["Agro · Med · Edu · WildVision", "24/7 Mentorship", "Midnight Hardware Sprints"],
  },
  {
    step: "ACT 03",
    tag: "THE CLIMAX",
    title: "₹1L Worth Prizes Awarded",
    desc: "The intense finale culminated in fierce stage pitches, live product demonstrations, and ₹1 Lakh worth of prizes awarded to the most impactful real-world solutions.",
    image: "/past-events/hacksprint-2-7.jpg",
    accent: "#e51b24",
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

/* ─────────────────────────────────────────────
   LEGACY ARCHIVE — an editorial flip-book
   ───────────────────────────────────────────── */

function useNarrow(query = "(max-width: 860px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return narrow;
}

function Paper({ side, num, children }: { side: "left" | "right"; num: number; children: React.ReactNode }) {
  return (
    <div className={`page page--${side}`}>
      <div className="page-run" aria-hidden="true">
        <span>HACKSPRINT 2.0</span>
        <span>LEGACY ARCHIVE · EDITION 2.0</span>
      </div>
      <div className="page-body">{children}</div>
      <div className="page-num" aria-hidden="true">
        {String(num).padStart(2, "0")}
      </div>
    </div>
  );
}

function ActPage({ chapter, index }: { chapter: (typeof storyChapters)[number]; index: number }) {
  return (
    <div className="pg-act">
      <div className="pg-act-media">
        <Image src={chapter.image} alt={chapter.title} fill sizes="(max-width: 860px) 100vw, 520px" style={{ objectFit: "cover" }} />
        <span className="pg-act-badge">
          {chapter.step} {"//"} {chapter.tag}
        </span>
      </div>
      <span className="pg-act-ghost" aria-hidden="true">
        0{index + 1}
      </span>
      <h3>{chapter.title}</h3>
      <p>{chapter.desc}</p>
      <div className="pg-pills">
        {chapter.highlights.map((item) => (
          <span key={item}>✦ {item}</span>
        ))}
      </div>
    </div>
  );
}

export default function PastEventsPage() {
  const [page, setPage] = useState(0);
  const [turning, setTurning] = useState<null | { dir: "next" | "prev"; to: number }>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const narrow = useNarrow();

  const pages: React.ReactNode[] = [
    /* 1 — opening */
    <div key="open" className="pg-open">
      <p className="pg-eyebrow">
        <span className="hs-live-dot" aria-hidden="true" /> LEGACY ARCHIVE · EDITION 2.0
      </p>
      <div className="pg-big" aria-hidden="true">
        2.0
      </div>
      <h2 className="pg-title">
        THE STORY OF <span>HACKSPRINT 2.0</span>
      </h2>
      <p className="pg-intro">
        In January 2026, 4,200+ developers converged at Karpagam Academy of Higher Education for India&apos;s biggest student-led hackathon — a high-octane 36-hour sprint of code, caffeine, and breakthrough technology.
      </p>
      <p className="pg-date">January 21–22, 2026 · Coimbatore, India</p>
    </div>,

    /* 2 — numbers + contents */
    <div key="numbers" className="pg-numbers">
      <div className="pg-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
            <small>{stat.sub}</small>
          </div>
        ))}
      </div>
      <ol className="pg-contents">
        {(
          [
            ["⚡ 3-Act Story", 2],
            ["🎯 5 Challenge Tracks", 5],
            ["📷 Moments Gallery", 6],
          ] as const
        ).map(([label, target]) => (
          <li key={label}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(target);
              }}
            >
              <span>{label}</span>
              <i aria-hidden="true" />
              <b>{String(target + 1).padStart(2, "0")}</b>
            </button>
          </li>
        ))}
      </ol>
    </div>,

    /* 3–5 — the three acts */
    ...storyChapters.map((chapter, i) => <ActPage key={chapter.step} chapter={chapter} index={i} />),

    /* 6 — tracks */
    <div key="tracks" className="pg-tracks">
      <h3 className="pg-section-title">🎯 5 Challenge Tracks</h3>
      <ol>
        {tracks.map((track, i) => (
          <li key={track.name}>
            <span className="pg-track-num">DOMAIN 0{i + 1}</span>
            <strong>{track.name}</strong>
            <p>{track.desc}</p>
          </li>
        ))}
      </ol>
    </div>,

    /* 7–8 — gallery */
    ...[0, 1].map((half) => (
      <div key={`gallery-${half}`} className="pg-gallery">
        {half === 0 && <h3 className="pg-section-title">📷 Moments Gallery</h3>}
        <div className={`pg-photos ${half === 1 ? "pg-photos--tall" : ""}`}>
          {eventGallery.slice(half * 3, half * 3 + 3).map((photo, j) => {
            const n = half * 3 + j;
            return (
              <button
                key={photo.src}
                type="button"
                className="pg-photo"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(photo.src);
                }}
              >
                <span className="pg-photo-img">
                  <Image src={photo.src} alt={photo.caption} fill sizes="(max-width: 860px) 100vw, 480px" style={{ objectFit: "cover" }} />
                </span>
                <span className="pg-photo-cap">
                  <b>MOMENT #{n + 1}</b> {photo.caption}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    )),

    /* 9 — partners */
    <div key="partners" className="pg-partners">
      <p className="pg-eyebrow">Ecosystem &amp; Corporate Backing</p>
      <h3 className="pg-section-title">HackSprint 2.0 Sponsors &amp; Partners</h3>
      <p className="pg-count">15+ Prestigious Partners</p>
      <div className="pg-names">
        {partners.map((partner) => (
          <span key={partner}>{partner}</span>
        ))}
      </div>
    </div>,

    /* 10 — back cover */
    <div key="credits" className="pg-credits">
      <div className="pg-credits-logo">
        <Image src="/3.0.png" alt="HACKSPRINT" width={640} height={325} sizes="320px" />
      </div>
      <p>Organized by Department of Computer Science &amp; Engineering, KAHE in association with Team Metaverse.</p>
      <p className="pg-credits-names">Student Leadership: Mukilan T · Lokesh P · Natesan K · Balasurya S</p>
    </div>,
  ];

  const spreads = pages.length / 2;
  const spread = Math.floor(page / 2);

  function goTo(target: number) {
    if (turning) return;
    if (narrow) {
      setPage(Math.max(0, Math.min(pages.length - 1, target)));
      return;
    }
    const to = Math.floor(target / 2);
    if (to === spread || to < 0 || to >= spreads) return;
    setTurning({ dir: to > spread ? "next" : "prev", to });
  }

  const next = () => goTo(narrow ? page + 1 : (spread + 1) * 2);
  const prev = () => goTo(narrow ? page - 1 : (spread - 1) * 2);

  const finishTurn = () => {
    if (!turning) return;
    setPage(turning.to * 2);
    setTurning(null);
  };

  const pageNode = (i: number, side: "left" | "right") => (
    <Paper side={side} num={i + 1}>
      {pages[i]}
    </Paper>
  );

  /* Which pages sit underneath while a leaf is turning */
  let baseLeft = spread * 2;
  let baseRight = spread * 2 + 1;
  if (turning?.dir === "next") baseRight = turning.to * 2 + 1;
  if (turning?.dir === "prev") baseLeft = turning.to * 2;

  const total = narrow ? pages.length : spreads;
  const current = narrow ? page : spread;

  return (
    <div className="hs-section legacy">
      <div className="hs-container">
        <header className="hs-head hs-head--center legacy-page-heading hs-reveal">
          <p className="hs-eyebrow hs-eyebrow--center">HACKSPRINT ARCHIVE</p>
          <h1 className="hs-title hs-title--xl">
            Past <span className="hs-accent">Events</span>
          </h1>
          <p className="hs-lead">Explore the story, milestones, and moments of HackSprint 2.0.</p>
        </header>

        <div
          className="book-wrap hs-reveal"
          tabIndex={0}
          role="region"
          aria-label="HackSprint 2.0 legacy archive book"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
          }}
        >
          {narrow ? (
            <div className="book book--single">
              <div key={page} className="book-single-page">
                {pageNode(page, page % 2 ? "right" : "left")}
              </div>
            </div>
          ) : (
            <div className="book">
              <div className="book-half book-half--left" onClick={prev}>
                {pageNode(baseLeft, "left")}
              </div>
              <div className="book-half book-half--right" onClick={next}>
                {pageNode(baseRight, "right")}
              </div>
              <div className="book-spine" aria-hidden="true" />

              {turning && (
                <div className={`leaf leaf--${turning.dir}`} onAnimationEnd={finishTurn} aria-hidden="true">
                  <div className="leaf-face leaf-front">
                    {turning.dir === "next" ? pageNode(spread * 2 + 1, "right") : pageNode(spread * 2, "left")}
                  </div>
                  <div className="leaf-face leaf-back">
                    {turning.dir === "next" ? pageNode(turning.to * 2, "left") : pageNode(turning.to * 2 + 1, "right")}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="book-controls">
            <button type="button" className="book-btn" onClick={prev} disabled={current === 0} aria-label="Previous page">
              ←
            </button>
            <div className="book-dots">
              {Array.from({ length: total }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={i === current ? "is-active" : ""}
                  aria-label={`Go to ${narrow ? "page" : "spread"} ${i + 1}`}
                  onClick={() => goTo(narrow ? i : i * 2)}
                />
              ))}
            </div>
            <span className="book-count">
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button type="button" className="book-btn" onClick={next} disabled={current === total - 1} aria-label="Next page">
              →
            </button>
          </div>
        </div>

        {/* ── LIGHTBOX ── */}
        {selectedImage && (
          <div className="hs-lightbox" onClick={() => setSelectedImage(null)}>
            <div className="hs-lightbox-frame">
              <Image src={selectedImage} alt="HackSprint 2.0 expanded preview" fill style={{ objectFit: "contain" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
