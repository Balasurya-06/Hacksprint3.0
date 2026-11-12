"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import AboutPage from "./about/page";
import HighlightsPage from "./highlights/page";
import TimelinePage from "./timeline/page";
import CrewPage from "./crew/page";
import PastEventsPage from "./past-events/page";
import WhySponsorUsPage from "./why-sponsor-us/page";
import SponsorsPage from "./sponsors/page";
import TracksPage from "./tracks/page";
import FaqPage from "./faq/page";
import PartnerBar from "@/components/PartnerBar";
import PassSection from "@/components/PassSection";

/* Registration window — opens Nov 8, closes end of day Dec 28, 2026 (IST). */
const registrationOpens = new Date("2026-11-08T09:00:00+05:30").getTime();
const registrationCloses = new Date("2026-12-28T23:59:59+05:30").getTime();

/* Headline numbers, Snowflake-summit style. */
const heroStats = [
  { num: "36", label: "Hours" },
  { num: "5", label: "Tracks" },
  { num: "500+", label: "Innovators" },
  { num: "100+", label: "Projects" },
];

/* Sponsors shown along the bottom of the hero. */
const heroSponsors = [
  { src: "/Sponsor/_Dark.png", alt: "Devfolio", w: 436, h: 144 },
  { src: "/Sponsor/Adaption_Logo.png", alt: "Adaption", w: 1080, h: 368 },
  { src: "/Sponsor/Eventopia-Logo-01.png", alt: "Eventopia", w: 300, h: 100 },
];

function WhatsAppIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2M12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.24 3.68 16.31 4.54 17.86 6.09C19.41 7.64 20.27 9.71 20.27 11.91C20.27 16.46 18.57 20.15 12.04 20.15M16.56 14.39C16.31 14.26 15.09 13.66 14.86 13.58C14.64 13.49 14.47 13.45 14.31 13.7C14.14 13.95 13.66 14.52 13.51 14.68C13.37 14.85 13.22 14.87 12.97 14.75C12.72 14.62 11.92 14.36 10.97 13.51C10.23 12.85 9.73 12.04 9.58 11.79C9.44 11.54 9.56 11.4 9.69 11.28C9.8 11.17 9.94 10.99 10.06 10.84C10.19 10.7 10.23 10.59 10.31 10.43C10.39 10.26 10.35 10.12 10.29 9.99C10.23 9.87 9.73 8.65 9.53 8.14C9.33 7.65 9.12 7.71 8.97 7.71C8.82 7.7 8.66 7.7 8.49 7.7C8.32 7.7 8.05 7.76 7.82 8.01C7.6 8.26 6.96 8.85 6.96 10.07C6.96 11.29 7.85 12.46 7.97 12.63C8.1 12.79 9.71 15.28 12.19 16.35C12.78 16.61 13.24 16.76 13.6 16.87C14.19 17.06 14.73 17.03 15.16 16.97C15.64 16.9 16.63 16.37 16.84 15.78C17.05 15.19 17.05 14.69 16.99 14.58C16.92 14.48 16.79 14.43 16.56 14.31" />
    </svg>
  );
}

const tickerItems = [
  "⚡ THE ULTIMATE HACKATHON SPRINT 3.0",
  "ORGANIZED BY DEPT OF COMPUTER SCIENCE & ENGINEERING & METAVERSE",
  "36 HOURS · REGISTRATION NOV 8 – DEC 28, 2026 · KAHE COIMBATORE",
  "BUILD · COMPETE · WIN",
];

function DevfolioApplyButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://hacksprint-3.devfolio.co/overview"
      target="_blank"
      rel="noreferrer"
      aria-label="Apply with Devfolio"
      className={`devfolio-btn ${className}`}
    >
      {/* Devfolio "D" logo mark */}
      <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.15" />
        <path d="M10 10h10c5.523 0 10 4.477 10 10s-4.477 10-10 10H10V10z" fill="white" />
      </svg>
      <span>Apply with Devfolio</span>
    </a>
  );
}

function HeroCountdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = now === null ? null : Math.max(0, registrationCloses - now);
  const totalSeconds = remaining === null ? 0 : Math.floor(remaining / 1000);
  const units = [
    { val: Math.floor(totalSeconds / 86400), label: "DAYS" },
    { val: Math.floor((totalSeconds % 86400) / 3600), label: "HRS" },
    { val: Math.floor((totalSeconds % 3600) / 60), label: "MINS" },
    { val: totalSeconds % 60, label: "SECS" },
  ];

  const progress =
    now === null
      ? 0
      : Math.min(100, Math.max(0, ((now - registrationOpens) / (registrationCloses - registrationOpens)) * 100));
  const isClosed = remaining === 0;

  return (
    <div className="cd" id="registration">
      <p className="cd-status">
        <i aria-hidden="true" className={isClosed ? "is-closed" : ""} />
        {isClosed ? "Registration closed" : "Registration closes in"}
      </p>

      <div className="cd-grid" aria-label="Registration closing countdown" role="timer">
        {units.map(({ val, label }, i) => (
          <div className="cd-unit" key={label}>
            <div className="cd-cell">
              <span className="cd-num">
                <span key={remaining === null ? "init" : val} className="cd-digit">
                  {remaining === null ? "--" : String(val).padStart(2, "0")}
                </span>
              </span>
              <span className="cd-label">{label}</span>
            </div>
            {i < units.length - 1 && (
              <span className="cd-sep" aria-hidden="true">
                :
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="cd-meta">
        <span aria-hidden="true">NOV 8</span>
        <div className="cd-progress" aria-hidden="true">
          <div className="cd-progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <span aria-hidden="true">DEC 28</span>
      </div>
      <p className="cd-foot">Registration closes December 28, 2026</p>
    </div>
  );
}

export default function Home() {
  /* ── Load Devfolio SDK dynamically (per official Devfolio React documentation) ── */
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

  /* ── Cursor spotlight for any `.spot` card ── */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(".spot") as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="home">
      {/* ══ HERO — cinematic title card: plain backdrop, content only ═══ */}
      <section id="home" className="hero">
        <PartnerBar />

        <div className="hero-inner">
          <div className="hero-org">
            <span>ORGANIZED BY THE DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING AND METAVERSE</span>
          </div>

          <h1 className="hero-title">
            <span className="sr-only">HACKSPRINT 3.0 — The Ultimate Hackathon Sprint</span>
            <span className="hero-title-sm" aria-hidden="true">
              The Ultimate Hackathon Sprint
            </span>
            <span className="hero-title-lg" aria-hidden="true">
              HACKSPRINT <em>3.0</em>
            </span>
          </h1>

          <p className="hero-dateline">
            <span>Live in Coimbatore</span>
            <i aria-hidden="true">|</i>
            <span>Feb 5–6, 2027</span>
          </p>
          <p className="hero-kicker">India&apos;s Biggest &amp; Largest Student Hackathon 2027 · Build · Compete · Win</p>

          {/* ══ ACTIONS: REGISTER, BROCHURE, JOIN WHATSAPP ══ */}
          <div className="hero-actions">
            <DevfolioApplyButton />
            <a href="/pdf/HS3_Brochure.pdf" target="_blank" rel="noreferrer" className="hs-btn hero-pill">
              <span>Brochure</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
            <a href="https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K" target="_blank" rel="noreferrer" className="hs-btn hero-pill hero-pill--outline">
              <WhatsAppIcon />
              <span>Join WhatsApp</span>
            </a>
          </div>

          <ul className="hero-stats">
            {heroStats.map((s) => (
              <li key={s.label}>
                <strong>{s.num}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>

          <HeroCountdown />
        </div>

        <div className="hero-sponsors">
          <span className="hero-sponsors-label">Our Sponsors</span>
          {heroSponsors.map((s) => (
            <Image key={s.alt} src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="120px" />
          ))}
        </div>
      </section>

      {/* ── CROSSING TAPE ANNOUNCEMENTS ── */}
      <section className="tapes" aria-label="Announcements">
        <div className="tape tape--red">
          <div className="tape-track">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="tape-content">
                {tickerItems.map((t) => (
                  <span key={t}>
                    {t} <i>✦</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <AboutPage />
      </section>

      {/* ── TRACKS ── */}
      <section id="tracks" style={{ scrollMarginTop: "80px" }}>
        <TracksPage />
      </section>

      {/* ── TIMELINE ── */}
      <section id="timeline" style={{ scrollMarginTop: "80px" }}>
        <TimelinePage />
      </section>

      {/* ── OUR SPONSORS ── */}
      <section id="our-sponsors" style={{ scrollMarginTop: "80px" }}>
        <SponsorsPage />
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section id="highlights">
        <HighlightsPage />
      </section>

      {/* ── CREW ── */}
      <section id="crew">
        <CrewPage />
      </section>

      {/* ── HACKER PASS ── */}
      <section id="pass" style={{ scrollMarginTop: "80px" }}>
        <PassSection />
      </section>

      {/* ── PAST EVENTS ── */}
      <section id="past-events">
        <PastEventsPage />
      </section>

      {/* ── WHY SPONSOR US ── */}
      <section id="why-sponsor-us">
        <WhySponsorUsPage />
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ scrollMarginTop: "80px" }}>
        <FaqPage />
      </section>

      {/* ── CTA BANNER ── */}
      <section id="contact" className="cta">
        <div className="cta-floor" aria-hidden="true" />
        <div className="cta-inner hs-reveal">
          <p className="hs-eyebrow hs-eyebrow--center">Season 3.0 — Registration open November 8 to December 28, 2026</p>
          <h2 className="cta-title">
            <span className="cta-line">Ready to Sprint</span>
            <span className="cta-line cta-line--outline">Into</span>
            <span className="cta-line glitch" data-text="History?">
              History?
            </span>
          </h2>
          <div className="cta-actions">
            <DevfolioApplyButton />
            <Link href="#about" className="hs-btn hs-btn--ghost">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
