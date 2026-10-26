const benefits = [
  ["01", "Reach a growing community", "Connect your brand with 3,600+ participants, 150+ teams, and a wider community of 350+ innovators from KAHE and the Metaverse Students Association.", "#E53935", "◎"],
  ["02", "Meet future talent", "Engage with student builders who spend 36 hours developing practical solutions across Agrotech, Medtech, Edutech, WildVisionTech, and Open Innovation.", "#E53935", "✦"],
  ["03", "Join a proven ecosystem", "Build meaningful relationships with KAHE, student organizers, mentors, and a strong partner network shaped by HackSprint 2.0.", "#E53935", "⌘"],
  ["04", "Enable real innovation", "Support hands-on projects, workshops, and opportunities that help students move from ideas to solutions with measurable impact.", "#E53935", "✧"],
];

export default function WhySponsorUsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#090909", color: "#fff", padding: "110px 32px 100px" }}>
    <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
      <header style={{ maxWidth: "760px", margin: "0 auto 58px", textAlign: "center" }}>
        <p style={{ color: "#E53935", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          Partner with the next generation
        </p>
        <h2 style={{ fontSize: "clamp(2.8rem, 7vw, 5.8rem)", fontWeight: 900, letterSpacing: "-0.08em", lineHeight: 0.92, marginTop: "16px" }}>
          Why sponsor <span style={{ color: "#E53935" }}>us?</span>
        </h2>
        <div style={{ width: "58px", height: "4px", background: "#E53935", margin: "22px auto 0", boxShadow: "0 0 18px rgba(229,27,36,0.4)" }} />
        <p style={{ color: "#B3B3B3", lineHeight: 1.7, margin: "22px auto 0", maxWidth: "590px" }}>
          Support the next chapter of a community that has already conducted 15+ events and shipped 100+ projects through learning, collaboration, and hands-on innovation.
        </p>
      </header>

      <section className="sponsor-benefits" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
        {benefits.map(([number, title, description, accent, symbol]) => (
          <article key={number} style={{ minHeight: "280px", position: "relative", overflow: "hidden", background: "#121212", border: "1px solid #292929", borderTop: `3px solid ${accent}`, padding: "24px 22px", clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: accent, fontSize: "2rem", lineHeight: 1 }}>{symbol}</span>
              <span style={{ color: "#555", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.12em" }}>{number}</span>
            </div>
            <h3 style={{ color: "#fff", fontSize: "1.1rem", lineHeight: 1.2, marginTop: "34px", textTransform: "uppercase" }}>{title}</h3>
            <div style={{ height: "1px", background: "#292929", margin: "16px 0" }} />
            <p style={{ color: "#B3B3B3", fontSize: "0.8rem", lineHeight: 1.65 }}>{description}</p>
          </article>
        ))}
      </section>

      <p style={{ color: "#666", fontSize: "0.72rem", lineHeight: 1.6, margin: "22px auto 0", maxWidth: "720px", textAlign: "center" }}>
        Previous HackSprint editions have connected students with organizations including Cognizant, Rentr UK, StartupTN, Devfolio, ETHIndia, JetBrains, Balsamiq, Intel, and Dell.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginTop: "52px" }}>
        <a
          href="/pdf/HS3_SPONSORSHIP_PROPOSAL_FINAL%20(1).pdf"
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "15px 28px", background: "transparent", border: "1px solid #E53935", color: "#F5F5F5", fontSize: "0.78rem", fontWeight: 900, letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase", clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)" }}
        >
          View sponsor deck <span aria-hidden="true" style={{ fontSize: "1.1rem" }}>↗</span>
        </a>
      </div>
    </div>
    </main>
  );
}
