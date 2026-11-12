/* HackSprint 3.0 tracks — names from the official brochure and sponsorship deck.
   Example areas build on the HackSprint 2.0 track descriptions.
   Layout: interlocking "step" infographic — number tile + icon tile + body card. */

/* Line icons adapted from the Lucide icon set (ISC licence). */
const icons: Record<string, React.ReactNode> = {
  agro: (
    <>
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
    </>
  ),
  edu: (
    <>
      <path d="M22 10v6" />
      <path d="M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </>
  ),
  med: (
    <>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
    </>
  ),
  wild: (
    <>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  open: (
    <>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </>
  ),
};

const tracks = [
  { name: "AgroTech", icon: "agro", desc: "Smart agriculture, soil sensors & crop health telemetry." },
  { name: "EduTech", icon: "edu", desc: "Adaptive learning algorithms, gamified student tech & learning tools." },
  { name: "MedTech", icon: "med", desc: "Healthcare diagnostics, AI imaging & patient monitors." },
  { name: "WildVision Tech", icon: "wild", desc: "Wildlife conservation, anti-poaching camera traps & habitat monitoring." },
  { name: "Open Innovation", icon: "open", desc: "Any idea, any stack — AI agents & agentic apps, autonomous drones, Web3, FinTech & smart campus." },
];

export default function TracksPage() {
  return (
    <div className="hs-section">
      <div className="hs-container">
        <header className="hs-head hs-head--center hs-reveal">
          <p className="hs-eyebrow hs-eyebrow--center">HackSprint 3.0 · 5 Tracks</p>
          <h2 className="hs-title hs-title--xl">
            Challenge <span className="hs-accent">Tracks</span>
          </h2>
          <p className="hs-lead">Bring your ideas, build something remarkable, and compete for the grand rewards.</p>
        </header>

        <ol className="steps">
          {tracks.map((t, i) => {
            /* Row 1 (01–03): tiles above the card. Row 2 (04–05): card above the tiles.
               Number tile alternates left / right, like the reference infographic. */
            const flip = i >= 3;
            const numRight = i % 2 === 1;
            return (
              <li key={t.name} className={`step ${flip ? "step--flip" : ""} ${numRight ? "step--num-right" : ""} ${i === 4 ? "step--hero" : ""} hs-reveal`}>
                <div className="step-tiles">
                  <div className="step-num">
                    <b>0{i + 1}</b>
                    <span>Track</span>
                  </div>
                  <div className="step-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {icons[t.icon]}
                    </svg>
                  </div>
                </div>
                <div className="step-body">
                  <h3>
                    <i aria-hidden="true">+</i>
                    {t.name}
                  </h3>
                  <p>{t.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
