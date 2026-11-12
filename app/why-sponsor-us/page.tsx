const benefits = [
  ["01", "Reach a growing community", "Connect your brand with 3,600+ participants, 150+ teams, and a wider community of 350+ innovators from KAHE and the Metaverse Students Association.", "◎"],
  ["02", "Meet future talent", "Engage with student builders who spend 36 hours developing practical solutions across Agrotech, Medtech, Edutech, WildVisionTech, and Open Innovation.", "✦"],
  ["03", "Join a proven ecosystem", "Build meaningful relationships with KAHE, student organizers, mentors, and a strong partner network shaped by HackSprint 2.0.", "⌘"],
  ["04", "Enable real innovation", "Support hands-on projects, workshops, and opportunities that help students move from ideas to solutions with measurable impact.", "✧"],
];

/* Telephone handset (Lucide "phone" path, ISC licence) — echoes the "calling for sponsors" poster style. */
function Handset() {
  return (
    <svg className="call-phone" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function WhySponsorUsPage() {
  return (
    <div className="hs-section call">
      <div className="call-bg" aria-hidden="true">
        <span className="call-streak call-streak--a" />
        <span className="call-streak call-streak--b" />
      </div>
      <Handset />
      <span className="call-hourglass" aria-hidden="true">
        ⌛
      </span>

      <div className="hs-container">
        <header className="call-head hs-reveal">
          <p className="call-kicker">Partner with the next generation</p>
          <h2 className="call-title">
            <span className="call-title-a">Why</span>
            <span className="call-title-b">Sponsor</span>
            <span className="call-title-c">us?</span>
          </h2>
        </header>

        <div className="call-frame hs-reveal">
          <i className="call-corner call-corner--tl" aria-hidden="true" />
          <i className="call-corner call-corner--tr" aria-hidden="true" />
          <i className="call-corner call-corner--bl" aria-hidden="true" />
          <i className="call-corner call-corner--br" aria-hidden="true" />

          <p className="call-lead">
            Support the next chapter of a community that has already conducted 15+ events and shipped 100+ projects through learning, collaboration, and hands-on innovation.
          </p>

          <ol className="call-list">
            {benefits.map(([number, title, description, symbol]) => (
              <li key={number} className="call-item">
                <div className="call-item-top">
                  <span className="call-item-num">{number}</span>
                  <span className="call-item-symbol" aria-hidden="true">
                    {symbol}
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>

          <p className="call-note">
            Previous HackSprint editions have connected students with organizations including Cognizant, Rentr UK, StartupTN, Devfolio, ETHIndia, JetBrains, Balsamiq, Intel, and Dell.
          </p>
        </div>

        <div className="call-bar hs-reveal">
          <a href="tel:+919597075831" className="call-contact">
            <span className="call-contact-icon" aria-hidden="true">
              ☎
            </span>
            <span className="call-contact-num">+91 95970 75831</span>
            <span className="call-contact-who">Bala Surya S (Lead Organizer)</span>
          </a>
          <a href="mailto:hacksprint.official@gmail.com" className="call-contact">
            <span className="call-contact-icon" aria-hidden="true">
              ✉
            </span>
            <span className="call-contact-num">hacksprint.official@gmail.com</span>
            <span className="call-contact-who">Contact Support</span>
          </a>
          <a href="/pdf/HS3_SPONSORSHIP_PROPOSAL_FINAL%20(1).pdf" target="_blank" rel="noreferrer" className="call-deck">
            View sponsor deck <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
