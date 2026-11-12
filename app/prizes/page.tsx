export default function PrizesPage() {
  const prizes = [
    { place:"1st",  amount:"To be announced", label:"WINNER",       icon:"🏆", desc:"Cash prize + trophy + certificates + startup incubation access + swag pack" },
    { place:"2nd",  amount:"To be announced", label:"RUNNER UP",    icon:"🥈", desc:"Cash prize + certificates + swag pack" },
    { place:"3rd",  amount:"To be announced", label:"SECOND RUNNER",icon:"🥉", desc:"Cash prize + certificates + swag pack" },
  ];

  const special = [
    { title:"Best Innovation",        desc:"Track-specific award for the most innovative solution across all 5 trails." },
    { title:"Best Beginner Team",     desc:"Specially awarded to first-time hackathon participants showing exceptional growth." },
    { title:"Best Social Impact",     desc:"For projects solving real-world grassroots problems in India." },
    { title:"Devfolio Special Prize", desc:"Awarded by Devfolio for the best use of their platform and ecosystem tools." },
  ];

  /* Podium order on screen: 2nd · 1st · 3rd */
  const podium = [prizes[1], prizes[0], prizes[2]];

  return (
    <div className="hs-section page-top">
      <div className="hs-container">
        <header className="hs-head hs-head--center">
          <p className="hs-eyebrow hs-eyebrow--center">✦ &nbsp;BOUNTY POOL&nbsp; ✦</p>
          <h1 className="hs-title hs-title--xl">PRIZES &amp; REWARDS</h1>
          <div className="pool">
            <span className="pool-label">TOTAL PRIZE POOL</span>
            <span className="pool-value">ANNOUNCING SOON</span>
          </div>
        </header>

        <div className="podium">
          {podium.map((p) => (
            <div key={p.place} className={`podium-col podium-col--${p.place}`}>
              <div className="podium-card spot">
                <div className="podium-icon">{p.icon}</div>
                <div className="podium-label">{p.label}</div>
                <div className="podium-amount">{p.amount}</div>
                <p>{p.desc}</p>
              </div>
              <div className="podium-block" aria-hidden="true">
                {p.place}
              </div>
            </div>
          ))}
        </div>

        <p className="hs-eyebrow hs-eyebrow--center special-title">✦ &nbsp;SPECIAL AWARDS&nbsp; ✦</p>
        <div className="special-grid">
          {special.map((s) => (
            <div key={s.title} className="special-card spot">
              <span className="special-dot" aria-hidden="true" />
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="prize-note">
          Prize amounts will be announced soon. Additional perks and goodies will be announced closer to the event.
        </p>
      </div>
    </div>
  );
}
