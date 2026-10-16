const tracks = ["Agrotech", "Medtech", "Edutech", "WildVisionTech", "Open Innovation"];
const partners = ["Cognizant", "Rentr UK", "StartupTN", "Devfolio", "ETHIndia", "JetBrains", "Balsamiq", "Intel", "Dell"];

const stats = [
  ["3,600+", "Participants"],
  ["150+", "Teams"],
  ["36 hrs", "Build duration"],
  ["₹1 lakh", "Advertised prize pool"],
];

export default function PastEventsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", padding: "110px 32px 100px" }}>
    <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
      <header style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "60px", alignItems: "end", marginBottom: "58px" }}>
        <div>
          <p style={{ color: "#d4ff00", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.16em", marginBottom: "14px", textTransform: "uppercase" }}>
            The legacy · 2026
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2.7rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.08em", lineHeight: 0.94 }}>
            HackSprint <span style={{ color: "#d4ff00" }}>2.0.</span>
          </h1>
        </div>
        <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.7 }}>
          A national-level hackathon organized by the Department of Computer Science &amp; Engineering, KAHE, in association with the Metaverse Students Association.
        </p>
      </header>

      <section style={{ borderTop: "1px solid #d4ff00", borderBottom: "1px solid #222", padding: "22px 0", marginBottom: "42px" }}>
        <div className="legacy-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px" }}>
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong style={{ color: "#d4ff00", fontSize: "clamp(1.5rem, 3vw, 2.4rem)", fontWeight: 900, letterSpacing: "-0.06em" }}>{value}</strong>
              <p style={{ color: "#777", fontSize: "0.7rem", letterSpacing: "0.08em", marginTop: "5px", textTransform: "uppercase" }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="legacy-content-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "22px", marginBottom: "22px" }}>
        <section style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "28px" }}>
          <p style={{ color: "#d4ff00", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>Event snapshot</p>
          <h2 style={{ color: "#fff", fontSize: "1.5rem", marginTop: "14px" }}>January 21–22, 2026</h2>
          <p style={{ color: "#888", lineHeight: 1.7, marginTop: "12px" }}>
            Teams had 36 hours to turn bold ideas into working solutions across five challenge tracks. The event brought together students, mentors, builders, and industry collaborators at KAHE.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "22px" }}>
            {tracks.map((track) => (
              <span key={track} style={{ border: "1px solid #304700", borderRadius: "999px", color: "#d4ff00", fontSize: "0.68rem", padding: "7px 11px" }}>{track}</span>
            ))}
          </div>
        </section>

        <section style={{ background: "#d4ff00", borderRadius: "12px", color: "#0a0a0a", padding: "28px" }}>
          <p style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>What stood out</p>
          <h2 style={{ fontSize: "1.5rem", marginTop: "14px" }}>Built beyond the shortlist.</h2>
          <p style={{ color: "#304700", lineHeight: 1.7, marginTop: "12px" }}>
            The final-round highlights featured nearly 50 teams and 250 participants, alongside an advertised foreign internship opportunity through Rentr (UK).
          </p>
        </section>
      </div>

      <section style={{ background: "#111", border: "1px solid #222", borderRadius: "12px", padding: "28px", marginBottom: "22px" }}>
        <div className="legacy-achievements" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
          <div>
            <p style={{ color: "#d4ff00", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>Association achievements</p>
            <h2 style={{ color: "#fff", fontSize: "1.4rem", marginTop: "12px" }}>A community that keeps building.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
            {[["350+", "Innovators"], ["15+", "Events"], ["100+", "Projects shipped"]].map(([value, label]) => (
              <div key={label}>
                <strong style={{ color: "#d4ff00", fontSize: "1.5rem" }}>{value}</strong>
                <p style={{ color: "#777", fontSize: "0.68rem", marginTop: "4px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: "1px solid #d4ff00", borderBottom: "1px solid #222", padding: "28px 0", marginBottom: "30px" }}>
        <div className="legacy-dedication" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "28px", alignItems: "start" }}>
          <div>
            <p style={{ color: "#d4ff00", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>With gratitude</p>
            <h2 style={{ color: "#fff", fontSize: "1.5rem", lineHeight: 1.2, marginTop: "12px" }}>Built through dedication.</h2>
          </div>
          <div>
            <p style={{ color: "#888", lineHeight: 1.7 }}>
              HackSprint 2.0 was made possible by the dedication of the faculty, organizers, mentors, volunteers, and student coordinators who worked together to create a meaningful national-level platform for innovation.
            </p>
            <p style={{ color: "#d4ff00", fontSize: "0.76rem", fontWeight: 700, lineHeight: 1.6, marginTop: "16px" }}>
              Student coordinators: Mukilan T · Lokesh P · Natesan K · Balasurya S
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "12px 0 0" }}>
        <p style={{ color: "#d4ff00", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.14em", marginBottom: "14px", textTransform: "uppercase" }}>Previous edition partners</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "9px" }}>
          {partners.map((partner) => (
            <span key={partner} style={{ color: "#777", border: "1px solid #222", borderRadius: "999px", fontSize: "0.7rem", padding: "8px 12px" }}>{partner}</span>
          ))}
        </div>
      </section>
    </div>
    </main>
  );
}
