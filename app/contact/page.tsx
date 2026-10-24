import Link from "next/link";

export default function ContactPage() {
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
      <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
        <p className="rdr-kicker" style={{ marginBottom: "12px" }}>
          OFFICIAL DISPATCH &amp; TELEGRAPH
        </p>

        <h1
          style={{
            fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
            fontSize: "clamp(3rem, 6.5vw, 5rem)",
            letterSpacing: "0.04em",
            color: "#f5f1ea",
            lineHeight: 0.95,
            textTransform: "uppercase",
            margin: "0 0 16px",
          }}
        >
          READY TO SPRINT <span style={{ color: "#e51b24" }}>INTO HISTORY?</span>
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            color: "#e51b24",
            margin: "16px auto 24px",
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
            maxWidth: "600px",
            margin: "0 auto 36px",
          }}
        >
          Join 500+ builders, mentors, and hackers for 36 hours of relentless innovation. Connect directly with our organizing
          posse at Karpagam Academy of Higher Education.
        </p>

        <div
          style={{
            background: "#0d0a0b",
            border: "1px solid #28181a",
            padding: "40px 32px",
            boxShadow: "0 14px 40px rgba(0,0,0,0.7), 0 0 35px rgba(229, 27, 36, 0.15)",
            marginBottom: "40px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
            <a
              href="mailto:hacksprint.official@gmail.com"
              className="rdr-btn-red"
            >
              <span>EMAIL THE TEAM</span>
              <span>&gt;</span>
            </a>

            <a
              href="https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K"
              target="_blank"
              rel="noreferrer"
              className="rdr-btn-ghost"
            >
              <span>WHATSAPP POSSE</span>
              <span>↗</span>
            </a>

            <a
              href="tel:+919597075831"
              className="rdr-btn-ghost"
            >
              <span>LEAD: 95970 75831</span>
              <span>☎</span>
            </a>
          </div>

          <div style={{ height: "1px", background: "#221416", marginBottom: "28px" }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "24px",
              textAlign: "left",
            }}
          >
            <div>
              <p className="rdr-kicker" style={{ fontSize: "0.72rem", marginBottom: "6px" }}>
                HEADQUARTERS
              </p>
              <p style={{ color: "#f5f1ea", fontSize: "0.88rem", fontWeight: 700, margin: "0 0 4px" }}>
                Dept. of Computer Science &amp; Engg.
              </p>
              <p style={{ color: "#8a8276", fontSize: "0.8rem", lineHeight: 1.5, margin: 0 }}>
                Karpagam Academy of Higher Education, Coimbatore 641021
              </p>
            </div>

            <div>
              <p className="rdr-kicker" style={{ fontSize: "0.72rem", marginBottom: "6px" }}>
                DIRECT INQUIRIES
              </p>
              <p style={{ color: "#f5f1ea", fontSize: "0.88rem", fontWeight: 700, margin: "0 0 4px" }}>
                hacksprint.official@gmail.com
              </p>
              <p style={{ color: "#8a8276", fontSize: "0.8rem", lineHeight: 1.5, margin: 0 }}>
                Bala Surya S (Lead): +91 95970 75831
              </p>
            </div>

            <div>
              <p className="rdr-kicker" style={{ fontSize: "0.72rem", marginBottom: "6px" }}>
                COMMUNITY CHANNELS
              </p>
              <p style={{ color: "#f5f1ea", fontSize: "0.88rem", fontWeight: 700, margin: "0 0 4px" }}>
                WhatsApp &amp; Discord
              </p>
              <p style={{ color: "#8a8276", fontSize: "0.8rem", lineHeight: 1.5, margin: 0 }}>
                Metaverse Students Association
              </p>
            </div>
          </div>
        </div>

        <Link href="/#home" className="rdr-btn-ghost" style={{ fontSize: "0.8rem" }}>
          <span>← RETURN TO ARENA</span>
        </Link>
      </div>
    </main>
  );
}
