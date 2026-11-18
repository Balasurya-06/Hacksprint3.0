import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
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
import HeroBackdrop from "@/components/HeroBackdrop";
import { CountUp } from "@/components/HeroFx";
import { HeroCountdown, HomeEffects } from "@/components/HomeClient";

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

export default function Home() {
  return (
    <div className="home">
      <HomeEffects />
      {/* ══ HERO — bold wordmark left, logo + launch countdown right ═══ */}
      <section id="home" className="hero hero--launch">
        <HeroBackdrop />
        <PartnerBar />

        <div className="lx">
          <div className="hx-main">
            <div className="hx-org">
              <span className="hx-org-label">Organized by</span>
              <p className="hx-org-names">
                <span>Department of Computer Science &amp; Engineering</span>
                <span>
                  <i aria-hidden="true">×</i> Metaverse Students Association
                </span>
              </p>
            </div>

            <h1 className="hx-title">
              <span className="sr-only">HackSprint 3.0 (2027) — India’s biggest national level student hackathon in Coimbatore, Tamil Nadu</span>
              <span className="hx-tag" aria-hidden="true">
                <b />
                The Ultimate Hackathon Sprint
              </span>
              <span className="hx-lockup" aria-hidden="true">
                <span className="hx-line hx-line--hack">
                  <span>HACK</span>
                </span>
                <span className="hx-ver">
                  <span>3.0</span>
                </span>
                <span className="hx-row2">
                  <span className="hx-line hx-line--sprint">
                    <span>SPRINT</span>
                  </span>
                  <span className="hx-year">
                    <span>2027</span>
                  </span>
                </span>
              </span>
            </h1>

            <p className="hx-kicker">
              <span className="hx-kicker-main">
                India&apos;s Biggest &amp; Largest Student Hackathon <em>2027</em>
              </span>
              <span className="hx-kicker-sub">
                Live in Coimbatore <i aria-hidden="true" /> Feb 5–6, 2027 <i aria-hidden="true" /> Build · Compete · Win
              </span>
            </p>

            {/* ══ ACTIONS: REGISTER, BROCHURE, JOIN WHATSAPP ══ */}
            <div className="hero-actions hx-actions">
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
          </div>

          <aside className="lx-side" aria-label="Registration countdown">
            <div className="lx-logo">
              <Image src="/3.0.png" alt="HackSprint 3.0 logo" width={640} height={325} sizes="(max-width: 760px) 80vw, 400px" priority />
            </div>

            <HeroCountdown />

            <ul className="lx-stats">
              {heroStats.map((s, i) => (
                <li key={s.label} style={{ "--i": i } as CSSProperties}>
                  <strong>
                    <CountUp value={s.num} delay={900 + i * 120} />
                  </strong>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="hero-sponsors lx-sponsors">
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
