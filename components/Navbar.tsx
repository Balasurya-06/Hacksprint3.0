"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

/* ── Nav items ─────────────────────────────────────────────────── */
const navLinks = [
  { label: "Home", href: "#home", icon: HomeIcon },
  { label: "About", href: "#about", icon: AboutIcon },
  { label: "Tracks", href: "#tracks", icon: HighlightIcon },
  { label: "Timeline", href: "#timeline", icon: TimelineIcon },
  { label: "Sponsors", href: "#our-sponsors", icon: SponsorsIcon },
  { label: "Crew", href: "#crew", icon: CrewIcon },
  { label: "Events", href: "#past-events", icon: EventsIcon },
  { label: "FAQ", href: "#faq", icon: FaqIcon },
];

/* ── Partner logos ─────────────────────────────────────────────── */
const partnerLogos = [
  { src: "/Sponsor/kahe.png", alt: "KAHE", w: 48, h: 22 },
  { src: "/Sponsor/meta.png", alt: "Metaverse", w: 22, h: 22 },
  { src: "/Sponsor/incubation.png", alt: "Incubation", w: 48, h: 22 },
  { src: "/Sponsor/iic.png", alt: "IIC", w: 38, h: 22 },
  { src: "/Sponsor/dst.png", alt: "DST", w: 38, h: 22 },
];

/* ── SVG Icons ─────────────────────────────────────────────────── */
type IconProps = { active: boolean };
const iconColor = (active: boolean) => (active ? "#F4EEE4" : "#8a7d79");
function Svg({ active, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
function HomeIcon({ active }: IconProps) {
  return <Svg active={active}><path d="M3 12L12 3l9 9" /><path d="M9 21V12h6v9" /><path d="M3 12v9h18v-9" /></Svg>;
}
function AboutIcon({ active }: IconProps) {
  return <Svg active={active}><circle cx="12" cy="8" r="3" /><path d="M6 21v-1a6 6 0 0 1 12 0v1" /></Svg>;
}
function HighlightIcon({ active }: IconProps) {
  return <Svg active={active}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></Svg>;
}
function TimelineIcon({ active }: IconProps) {
  return <Svg active={active}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Svg>;
}
function CrewIcon({ active }: IconProps) {
  return (
    <Svg active={active}>
      <circle cx="9" cy="7" r="3" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="17" cy="7" r="3" /><path d="M17 21v-2a4 4 0 0 0-1-.25" />
    </Svg>
  );
}
function EventsIcon({ active }: IconProps) {
  return (
    <Svg active={active}>
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </Svg>
  );
}
function FaqIcon({ active }: IconProps) {
  return <Svg active={active}><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></Svg>;
}
function SponsorsIcon({ active }: IconProps) {
  return <Svg active={active}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></Svg>;
}

const registerUrl = "https://hacksprint-3.devfolio.co/overview";

/* ── Main component ────────────────────────────────────────────── */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  /* Track active section on scroll */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    setActive(href);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else router.push(`/${href}`);
    } else {
      router.push(href);
    }
  };

  return (
    <header className={`site-nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="site-nav-bar">
        {/* Brand */}
        <a href="#home" onClick={(e) => handleClick(e, "#home")} className="site-nav-brand" aria-label="HACKSPRINT 3.0 home">
          <Image src="/3.0.png" alt="HACKSPRINT 3.0" width={640} height={325} priority sizes="80px" />
        </a>

        {/* Desktop links */}
        <nav aria-label="Main navigation" className="site-nav-links">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={isActive ? "is-active" : ""}
                aria-current={isActive ? "true" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="site-nav-right">
          <a href={registerUrl} target="_blank" rel="noreferrer" className="site-nav-cta">
            Register <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="site-nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <nav aria-label="Mobile navigation" className="site-nav-mobile">
        {navLinks.map((l) => {
          const Icon = l.icon;
          const isActive = active === l.href;
          return (
            <a key={l.href} href={l.href} onClick={(e) => handleClick(e, l.href)} className={isActive ? "is-active" : ""}>
              <Icon active={isActive} />
              {l.label}
            </a>
          );
        })}

        <div className="site-nav-mobile-logos">
          {partnerLogos.map((logo) => (
            <Image key={logo.alt} src={logo.src} alt={logo.alt} width={logo.w} height={logo.h} style={{ objectFit: "contain", maxHeight: `${logo.h}px`, width: "auto" }} />
          ))}
        </div>
      </nav>
    </header>
  );
}
