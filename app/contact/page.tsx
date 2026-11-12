const channels = [
  { label: "EMAIL", value: "hacksprint.official@gmail.com", href: "mailto:hacksprint.official@gmail.com", icon: "✉", cmd: "mail" },
  { label: "PHONE", value: "+91 95970 75831 — Bala Surya S (Lead)", href: "tel:+919597075831", icon: "☎", cmd: "call" },
  { label: "INSTAGRAM", value: "instagram.com/hacksprint3.0", href: "https://www.instagram.com/hacksprint3.0", icon: "◉", cmd: "open", external: true },
  { label: "LINKEDIN", value: "linkedin.com/showcase/hacksprint3-0", href: "https://www.linkedin.com/showcase/hacksprint3-0", icon: "in", cmd: "open", external: true },
];

export default function ContactPage() {
  return (
    <div className="hs-section page-top">
      <div className="hs-bg-grid" aria-hidden="true" />
      <div className="hs-container hs-container--narrow">
        <header className="hs-head hs-head--center">
          <p className="hs-eyebrow hs-eyebrow--center">Get in touch</p>
          <h1 className="hs-title hs-title--xl">
            Contact
            <br />
            <span className="hs-accent">HackSprint 3.0</span>
          </h1>
          <p className="hs-lead">Reach out to the organizing team for queries, sponsorships, or partnerships.</p>
        </header>

        <div className="contact-grid">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="contact-card spot"
              {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span className="contact-icon" aria-hidden="true">
                {c.icon}
              </span>
              <span className="contact-label">{c.label}</span>
              <span className="contact-value">{c.value}</span>
              <span className="contact-cmd" aria-hidden="true">
                $ {c.cmd} <span className="type-caret" />
              </span>
              <span className="contact-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
