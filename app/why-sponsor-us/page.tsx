
const benefits = [
  {
    number: "01",
    title: "MASSIVE BUILDER COMMUNITY",
    description:
      "Connect your brand directly with 3,600+ participants, 150+ teams, and 350+ elite student innovators from KAHE, Coimbatore, and across India.",
    symbol: "★",
    tag: "OUTREACH",
  },
  {
    number: "02",
    title: "TOP-TIER TECHNICAL TALENT",
    description:
      "Engage with builders who spend 36 non-stop hours developing production-ready solutions across AI/ML, Web3, IoT, Cybersecurity, and Open Innovation.",
    symbol: "⚔",
    tag: "RECRUITING",
  },
  {
    number: "03",
    title: "PROVEN ECOSYSTEM & LEGACY",
    description:
      "Build enduring partnerships with KAHE faculty, student organizers, industry mentors, and an established sponsor network proven by HackSprint 2.0.",
    symbol: "❖",
    tag: "NETWORK",
  },
  {
    number: "04",
    title: "MEASURABLE REAL-WORLD IMPACT",
    description:
      "Support hands-on challenges, keynotes, developer workshops, and bounties that help student builders move from prototype to startup scale.",
    symbol: "⚑",
    tag: "ROI & BRAND",
  },
];

const pastSponsors = [
  "Cognizant",
  "StartupTN",
  "Devfolio",
  "ETHIndia",
  "JetBrains",
  "Balsamiq",
  "Intel",
  "Dell",
  "Rentr UK",
];

export default function WhySponsorUsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#070606",
        color: "#f5f1ea",
        padding: "80px 24px 100px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* ── HEADER ── */}
        <header style={{ maxWidth: "840px", margin: "0 auto 60px", textAlign: "center" }}>
          <p className="rdr-kicker" style={{ marginBottom: "12px" }}>
            PARTNER WITH THE OUTLAW REVOLUTION
          </p>

          <h1
            style={{
              fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
              fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
              fontWeight: 900,
              letterSpacing: "0.04em",
              lineHeight: 0.95,
              color: "#f5f1ea",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            WHY SPONSOR <span style={{ color: "#e51b24" }}>HACKSPRINT III?</span>
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              color: "#e51b24",
              margin: "18px auto 22px",
            }}
          >
            <div style={{ width: "45px", height: "1.5px", background: "#e51b24" }} />
            <span style={{ fontSize: "1rem" }}>★</span>
            <div style={{ width: "45px", height: "1.5px", background: "#e51b24" }} />
          </div>

          <p
            style={{
              color: "#a39d93",
              fontSize: "1rem",
              lineHeight: 1.7,
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Back the next chapter of an unstoppable builder community. Over 15+ hackathons and workshops conducted, 100+
            shipped products, and over 3,600+ developers empowered across Tamil Nadu.
          </p>
        </header>

        {/* ── 4 BENEFITS CARDS ── */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "24px",
            marginBottom: "64px",
          }}
        >
          {benefits.map((item) => (
            <article
              key={item.number}
              style={{
                background: "#0e0b0c",
                border: "1px solid #28181a",
                borderTop: "3px solid #e51b24",
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                transition: "all 0.25s ease",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                      fontSize: "1.8rem",
                      color: "#e51b24",
                      lineHeight: 1,
                    }}
                  >
                    {item.number}
                  </span>
                  <span
                    style={{
                      color: "#8a8276",
                      fontSize: "0.68rem",
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      border: "1px solid #28171a",
                      padding: "3px 8px",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.tag}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "#f5f1ea",
                    textTransform: "uppercase",
                    lineHeight: 1.25,
                    marginBottom: "14px",
                  }}
                >
                  {item.title}
                </h2>

                <div style={{ height: "1px", background: "#221416", marginBottom: "16px" }} />

                <p style={{ color: "#9e978d", fontSize: "0.85rem", lineHeight: 1.65, margin: 0 }}>
                  {item.description}
                </p>
              </div>

              <div style={{ marginTop: "24px", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#e51b24", fontSize: "0.85rem" }}>★</span>
                <span
                  style={{
                    color: "#8a8276",
                    fontSize: "0.7rem",
                    fontFamily: "'Oswald', sans-serif",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  VERIFIED HACKSPRINT ADVANTAGE
                </span>
              </div>
            </article>
          ))}
        </section>

        {/* ── PAST ALLIANCES STRIP ── */}
        <section
          style={{
            background: "#0c090a",
            border: "1px solid #231517",
            padding: "36px 32px",
            marginBottom: "56px",
            textAlign: "center",
          }}
        >
          <p
            className="rdr-kicker"
            style={{
              fontSize: "0.75rem",
              marginBottom: "16px",
            }}
          >
            PROVEN SPONSOR ALUMNI &amp; ALLIANCES
          </p>

          <p style={{ color: "#9e978d", fontSize: "0.88rem", maxWidth: "780px", margin: "0 auto 24px" }}>
            Past HackSprint seasons connected ambitious builders with pioneering brands, tech giants, and regional ecosystems:
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px 20px",
            }}
          >
            {pastSponsors.map((brand) => (
              <div
                key={brand}
                style={{
                  background: "#140f11",
                  border: "1px solid #2e1c1f",
                  padding: "8px 18px",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#d8d2c4",
                  textTransform: "uppercase",
                }}
              >
                {brand}
              </div>
            ))}
          </div>
        </section>

        {/* ── SPONSORSHIP TIERS (OUTLAW BOUNTY TIERS) ── */}
        <section style={{ marginBottom: "64px" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <p className="rdr-kicker" style={{ marginBottom: "8px" }}>
              TIERED PACKAGES
            </p>
            <h2
              style={{
                fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                letterSpacing: "0.04em",
                color: "#f5f1ea",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              CHOOSE YOUR PATRON LEVEL
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                tier: "TITLE PATRON",
                badge: "CHAMPIONSHIP BOUNTY",
                desc: "Highest brand prominence across all 36 hours, keynote stage address, naming rights, and exclusive grand bounty presentation.",
                perks: [
                  "Exclusive Title Naming Rights",
                  "Main Stage 30-min Keynote",
                  "Direct Access to All Participant Resumes",
                  "Custom Dedicated Track Challenge",
                  "VIP Judge & Mentor Seats",
                ],
                featured: true,
              },
              {
                tier: "POWERED BY",
                badge: "MARSHAL LEVEL",
                desc: "Co-branding across banners, shirts, badges, and hackathon collateral with prime recruitment booth access.",
                perks: [
                  "Prominent Logo on All Media & Swag",
                  "15-min Workshop Slot",
                  "Recruitment & Interview Desk",
                  "Mentorship & Evaluation Rights",
                  "Social & PR Spotlight Coverage",
                ],
                featured: false,
              },
              {
                tier: "TRACK PARTNER",
                badge: "OUTLAW BOUNTY",
                desc: "Own a specialized challenge track (AI, Web3, IoT, or CyberSec) and reward teams with your tailored API and tools.",
                perks: [
                  "Track-Specific Problem Statement",
                  "Direct Mentorship for Track Builders",
                  "Track Award Ceremony Presentation",
                  "Logo on Track Leaderboards",
                  "Access to Track Finalists",
                ],
                featured: false,
              },
            ].map((tier) => (
              <div
                key={tier.tier}
                style={{
                  background: tier.featured ? "#140c0e" : "#0e0b0c",
                  border: tier.featured ? "2px solid #e51b24" : "1px solid #28181a",
                  padding: "36px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: tier.featured ? "0 14px 40px rgba(229, 27, 36, 0.25)" : "none",
                  position: "relative",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#e51b24",
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    {tier.badge}
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
                      fontSize: "2rem",
                      letterSpacing: "0.05em",
                      color: "#f5f1ea",
                      textTransform: "uppercase",
                      margin: "0 0 14px",
                    }}
                  >
                    {tier.tier}
                  </h3>

                  <p style={{ color: "#9e978d", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "22px" }}>
                    {tier.desc}
                  </p>

                  <div style={{ height: "1px", background: "#221416", marginBottom: "20px" }} />

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {tier.perks.map((perk) => (
                      <li key={perk} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem", color: "#d8d2c4" }}>
                        <span style={{ color: "#e51b24", fontSize: "0.8rem" }}>✓</span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: "32px", paddingTop: "18px", borderTop: "1px solid #221416" }}>
                  <a
                    href="/pdf/HS3_SPONSORSHIP_PROPOSAL_FINAL .pdf"
                    download="HackSprint3_Sponsorship_Deck.pdf"
                    className={tier.featured ? "rdr-btn-red" : "rdr-btn-ghost"}
                    style={{ width: "100%", textAlign: "center", fontSize: "0.82rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    DOWNLOAD DECK
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CALL TO ACTION ── */}
        <section
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(138, 12, 16, 0.4) 0%, #0c090a 80%)",
            border: "1px solid #381a1e",
            padding: "54px 32px",
            textAlign: "center",
          }}
        >
          <p className="rdr-kicker" style={{ marginBottom: "10px" }}>
            LET&apos;S SHAPE THE SPRINT TOGETHER
          </p>

          <h2
            style={{
              fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              letterSpacing: "0.04em",
              color: "#f5f1ea",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            BECOME AN OFFICIAL PATRON
          </h2>

          <p style={{ color: "#9e978d", fontSize: "0.95rem", maxWidth: "600px", margin: "0 auto 30px" }}>
            Connect with Bala Surya (Lead Organizer) to request our tailored sponsorship prospectus and schedule a discovery call.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="mailto:hacksprint.official@gmail.com?subject=HackSprint%203.0%20Sponsorship"
              className="rdr-btn-red"
            >
              <span>DISCUSS SPONSORSHIP</span>
              <span>&gt;</span>
            </a>

            <a href="/pdf/HS3_SPONSORSHIP_PROPOSAL_FINAL .pdf" download="HackSprint3_Sponsorship_Deck.pdf" className="rdr-btn-ghost">
              <span>DOWNLOAD DECK</span>
              <span>↓</span>
            </a>

            <a href="tel:+919597075831" className="rdr-btn-ghost">
              <span>CALL: +91 95970 75831</span>
              <span>☎</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
