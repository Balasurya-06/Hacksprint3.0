const phases = [
  {
    num: "I",
    label: "PHASE I",
    title: "Registration\nOpens",
    date: "NOV 8, 2026",
    desc: "The arena gates swing open. Submit your team, claim your territory, and lock in your spot before the frontier fills up.",
    status: "confirmed",
  },
  {
    num: "II",
    label: "PHASE II",
    title: "Project Idea\nSubmission Deadline",
    date: "DEC 28, 2026",
    desc: "Last call. Submit your project idea before the bounty board shuts down. Make sure your outlaw squad has filed their concept.",
    status: "confirmed",
  },
  {
    num: "III",
    label: "PHASE III",
    title: "Finalized Teams\nAnnounced",
    date: "JAN 4, 2027",
    desc: "The roster is sealed. Every confirmed posse receives their official dispatch — check the list and prepare your arsenal.",
    status: "upcoming",
  },
  {
    num: "IV",
    label: "PHASE IV",
    title: "HackSprint\n3.0 Begins",
    date: "FEB 5–6, 2027",
    desc: "36 hours. One shot at glory. The sprint fires — code, build, and ship something that changes everything.",
    status: "upcoming",
  },
  {
    num: "V",
    label: "PHASE V",
    title: "Winner\nAnnouncement",
    date: "FEB 6, 2027 · 8:00 PM",
    desc: "The dust settles. Legends are crowned, bounties claimed. The final verdict echoes across the frontier.",
    status: "upcoming",
  },
];

/* The road swings to the side opposite each card: right, left, right… */
const ROW = 100 / phases.length;
const roadX = (i: number) => (i % 2 === 0 ? 74 : 26);
const roadPath = (() => {
  let d = `M50 0 C50 ${ROW * 0.3} ${roadX(0)} ${ROW * 0.2} ${roadX(0)} ${ROW / 2}`;
  for (let i = 1; i < phases.length; i++) {
    const y0 = ROW * (i - 1) + ROW / 2;
    const y1 = ROW * i + ROW / 2;
    const mid = (y0 + y1) / 2;
    d += ` C${roadX(i - 1)} ${mid} ${roadX(i)} ${mid} ${roadX(i)} ${y1}`;
  }
  const last = ROW * (phases.length - 1) + ROW / 2;
  d += ` C${roadX(phases.length - 1)} ${last + ROW * 0.3} 50 ${100 - ROW * 0.2} 50 100`;
  return d;
})();

export default function TimelinePage() {
  return (
    <div className="hs-section">
      <div className="hs-container">
        <header className="road-head hs-reveal">
          <p className="road-script">✦ &nbsp;CHAPTER III&nbsp; ✦</p>
          <h2 className="road-title">TIMELINE</h2>
          <p className="road-sub">Five milestones to the frontier</p>
        </header>

        <div className="road" style={{ ["--rows" as string]: phases.length }}>
          <svg className="road-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d={roadPath} className="road-edge" vectorEffect="non-scaling-stroke" />
            <path d={roadPath} className="road-body" vectorEffect="non-scaling-stroke" />
            <path d={roadPath} className="road-lane" vectorEffect="non-scaling-stroke" />
          </svg>

          <ol className="road-stops">
            {phases.map((p, i) => (
              <li key={p.num} className={`road-stop road-stop--${p.status} ${i % 2 ? "is-right" : "is-left"}`}>
                <div className="road-pin" style={{ left: `${roadX(i)}%` }} aria-hidden="true">
                  <span className="road-pin-head">{p.num}</span>
                  <span className="road-pin-stick" />
                  <span className="road-pin-note">{p.date}</span>
                </div>

                <article className="road-card hs-reveal">
                  <div className="road-card-top">
                    <p className="road-label">{p.label}</p>
                    {p.status === "confirmed" && (
                      <span className="road-badge">
                        <i aria-hidden="true" />
                        CONFIRMED
                      </span>
                    )}
                  </div>
                  <h3 className="road-card-title">{p.title}</h3>
                  <div className="road-date">
                    {p.status !== "tba" && <span aria-hidden="true">✦</span>}
                    {p.date}
                  </div>
                  <p className="road-desc">{p.desc}</p>
                </article>
              </li>
            ))}
          </ol>

          <span className="road-finish" aria-hidden="true">
            🏁
          </span>
        </div>
      </div>
    </div>
  );
}
