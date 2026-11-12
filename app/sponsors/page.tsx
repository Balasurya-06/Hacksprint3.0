import Image from "next/image";

/* ── Sponsor tiers — only confirmed sponsors listed ──
   `logo` is a white / transparent version so it sits directly on the black page. */

interface Sponsor {
  name: string;
  logo: string;
  w: number;
  h: number;
  url: string;
}

const goldSponsors: Sponsor[] = [
  { name: "Devfolio", logo: "/Sponsor/_Dark.png", w: 436, h: 144, url: "https://devfolio.co" },
];

const coSponsors: Sponsor[] = [
  { name: "Adaption", logo: "/Sponsor/Adaption_Logo.png", w: 1080, h: 368, url: "https://adaptionlabs.ai" },
  { name: "Eventopia", logo: "/Sponsor/eventopia.png", w: 256, h: 85, url: "https://eventopia.in" },
];

function SponsorLogo({ s, height }: { s: Sponsor; height: number }) {
  return (
    <a href={s.url} target="_blank" rel="noreferrer" aria-label={`${s.name} website`} className="spp-logo">
      <Image
        src={s.logo}
        alt={s.name === "Devfolio" ? "DEVFOLIO LOGO" : s.name}
        width={s.w}
        height={s.h}
        className="spp-logo-image"
        style={{ height: `${height}px`, width: "auto", maxWidth: "100%" }}
      />
    </a>
  );
}

export default function SponsorsPage() {
  return (
    <section aria-label="Our Sponsors" className="hs-section spp">
      <div className="hs-container spp-inner">
        {/* ── GOLD ── */}
        <div className="spp-tier hs-reveal">
          <span className="spp-pill">Gold Sponsor</span>
          <div className="spp-logos spp-logos--gold">
            {goldSponsors.map((s) => (
              <SponsorLogo key={s.name} s={s} height={36} />
            ))}
          </div>
        </div>

        {/* ── CO-SPONSORS ── */}
        <div className="spp-tier hs-reveal">
          <span className="spp-pill spp-pill--outline">Co-Sponsors</span>
          <div className="spp-logos">
            {coSponsors.map((s, i) => (
              <div key={s.name} className="spp-slot">
                {i > 0 && <span className="spp-divider" aria-hidden="true" />}
                <SponsorLogo s={s} height={36} />
              </div>
            ))}
          </div>
        </div>

        {/* ── EVENT INFO (date + venue) ── */}
        <div className="spp-info hs-reveal">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="14" height="14" rx="2" />
            <line x1="13" y1="2" x2="13" y2="6" />
            <line x1="7" y1="2" x2="7" y2="6" />
            <line x1="3" y1="9" x2="17" y2="9" />
            <path d="M20 14.5c0 3-3 5.5-3 5.5s-3-2.5-3-5.5a3 3 0 0 1 6 0Z" />
          </svg>
          <div>
            <strong>Registration: Nov 8 – Dec 28, 2026</strong>
            <span>Karpagam Academy of Higher Education, Coimbatore</span>
          </div>
        </div>

        {/* ── ORGANIZED BY / EVENT MARK ── */}
        <div className="spp-foot">
          <div className="spp-org">
            <span>Organized by</span>
            <strong>Dept. of CSE &amp; Metaverse · KAHE</strong>
          </div>
          <a href="/pdf/HS3_SPONSORSHIP_PROPOSAL_FINAL%20(1).pdf" target="_blank" rel="noreferrer" className="spp-become">
            Want your brand here? <b>View sponsor deck ↗</b>
          </a>
          <Image src="/3.0.png" alt="HackSprint 3.0" width={640} height={325} sizes="160px" className="spp-mark" />
        </div>
      </div>
    </section>
  );
}
