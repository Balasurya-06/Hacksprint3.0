import Image from "next/image";

/* ── Sponsor tiers — only confirmed sponsors listed ──
   Logos sit directly on the page (no cards). */

interface Sponsor {
  name: string;
  role?: string;
  roleWrap?: boolean;
  roleTone?: "tooling" | "media" | "platform" | "community";
  logo: string;
  w: number;
  h: number;
  url: string;
}

const goldSponsors: Sponsor[] = [
  { name: "Devfolio", role: "PLATFORM & COMMUNITY SPONSOR", roleWrap: true, roleTone: "platform", logo: "/Sponsor/_Dark.png", w: 436, h: 144, url: "https://devfolio.co" },
  { name: "HackIndia", role: "PLATFORM & COMMUNITY SPONSOR", roleWrap: true, roleTone: "community", logo: "/Sponsor/hackindia.png", w: 1600, h: 400, url: "https://hackindia.io" },
];

const coSponsors: Sponsor[] = [
  { name: "Adaption", role: "TOOLING SPONSOR", roleTone: "tooling", logo: "/Sponsor/Adaption_Logo.png", w: 1080, h: 368, url: "https://adaptionlabs.ai" },
  { name: "Eventopia", role: "MEDIA PARTNER", roleTone: "media", logo: "/Sponsor/eventopia.png", w: 256, h: 85, url: "https://eventopia.in" },
];

const SPONSOR_DECK = "/pdf/HS3_SPONSORSHIP_PROPOSAL_FINAL%20(1).pdf";

function SponsorLogo({ s, height }: { s: Sponsor; height: number }) {
  return (
    <div className="sps-sponsor">
      <a href={s.url} target="_blank" rel="noreferrer" className="sps-logo" aria-label={`${s.name} website`}>
        <Image
          src={s.logo}
          alt={`${s.name} logo`}
          width={s.w}
          height={s.h}
          className="sps-logo-img"
          style={{ height: `${height}px`, width: "auto", maxWidth: "100%" }}
        />
      </a>
      {s.role && (
        <span className={`sps-role${s.roleTone ? ` sps-role--${s.roleTone}` : ""}${s.roleWrap ? " sps-role--wrap" : ""}`}>
          <span className="sps-role-title">{s.role}</span>
        </span>
      )}
    </div>
  );
}

export default function SponsorsPage() {
  return (
    <section aria-labelledby="sponsors-title" className="hs-section sps">
      <div className="hs-container sps-inner">
        <header className="hs-head hs-head--center sps-head">
          <p className="hs-eyebrow hs-eyebrow--center">Meet our sponsors</p>
          <h2 id="sponsors-title" className="hs-title">
            Powered by our <span className="hs-accent">sponsors</span>
          </h2>
          <p className="sps-cta">
            Want your brand in front of 500+ innovators?{" "}
            <a href={SPONSOR_DECK} target="_blank" rel="noreferrer">
              Become a partner →
            </a>
          </p>
        </header>

        {/* ── GOLD SPONSOR ── */}
        <div className="sps-group sps-group--gold hs-reveal">
          <p className="sps-label sps-label--gold">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Gold Sponsor
          </p>
          <div className="sps-row">
            {goldSponsors.map((s, i) => (
              <div key={s.name} className="sps-slot">
                {i > 0 && <span className="sps-divider" aria-hidden="true" />}
                <SponsorLogo s={s} height={60} />
              </div>
            ))}
          </div>
        </div>

        {/* ── CO-SPONSORS ── */}
        <div className="sps-group hs-reveal">
          <p className="sps-label">Co-Sponsors</p>
          <div className="sps-row">
            {coSponsors.map((s, i) => (
              <div key={s.name} className="sps-slot">
                {i > 0 && <span className="sps-divider" aria-hidden="true" />}
                <SponsorLogo s={s} height={50} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
