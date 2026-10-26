const bodyText = {
  color: "#B3B3B3",
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "0.9rem",
  lineHeight: 1.8,
};

const labelText = {
  color: "#E53935",
  fontSize: "0.68rem",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
};

export default function AboutPage() {
  return (
    <main
      style={{
        background: "#090909",
        color: "#ffffff",
        minHeight: "100vh",
        padding: "72px 32px 88px",
      }}
    >
      <header
        style={{
          maxWidth: "720px",
          margin: "0 auto 58px",
          textAlign: "center",
        }}
      >
        <p style={{ ...labelText, margin: "0 0 14px" }}>
          About KAHE &amp; Metaverse
        </p>
        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            margin: "0 0 18px",
          }}
        >
          The community behind
          <br />
          HackSprint 3.0
        </h1>
        <p style={{ ...bodyText, margin: 0 }}>
          A place where academic learning, emerging technology, and student
          collaboration come together to create meaningful impact.
        </p>
      </header>

      <section
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "56px",
        }}
      >
        <article
          style={{
            padding: "26px 0",
            borderTop: "1px solid #333333",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "26px",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              About Metaverse
            </h2>
            <span style={{ color: "#E53935", fontSize: "1.4rem" }}>↗</span>
          </div>
          <p style={{ ...bodyText, margin: "0 0 18px" }}>
            The Metaverse Students Association is a student community under
            the Department of Computer Science &amp; Engineering at Karpagam
            Academy of Higher Education, focused on technology, creativity,
            collaboration, and innovation.
          </p>
          <p style={{ ...bodyText, margin: 0 }}>
            Through workshops, events, projects, and hackathons, students
            explore ideas and turn technical knowledge into real-world
            solutions.
          </p>
          <div
            style={{
              display: "flex",
              gap: "28px",
              marginTop: "28px",
              paddingTop: "20px",
              borderTop: "1px solid #292929",
            }}
          >
            <div>
              <strong style={{ color: "#E53935", fontSize: "1.8rem" }}>01</strong>
              <p style={{ color: "#666666", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "0.68rem", margin: "4px 0 0" }}>
                Student community
              </p>
            </div>
            <div>
              <strong style={{ color: "#E53935", fontSize: "1.8rem" }}>∞</strong>
              <p style={{ color: "#666666", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "0.68rem", margin: "4px 0 0" }}>
                Ideas to explore
              </p>
            </div>
          </div>
        </article>

        <article
          style={{
            padding: "26px 0",
            borderTop: "1px solid #333333",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "26px",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                margin: 0,
              }}
            >
              About KAHE
            </h2>
            <span style={{ color: "#E53935", fontSize: "1.4rem" }}>↗</span>
          </div>
          <p style={{ ...bodyText, margin: "0 0 18px" }}>
            Karpagam Academy of Higher Education (KAHE), located in Coimbatore,
            Tamil Nadu, is committed to academic excellence, research,
            innovation, and holistic student development.
          </p>
          <p style={{ ...bodyText, margin: 0 }}>
            KAHE connects classroom learning with creativity, practical skills,
            entrepreneurship, and emerging technology to prepare students for a
            rapidly evolving digital world.
          </p>
          <div
            style={{
              display: "flex",
              gap: "28px",
              marginTop: "28px",
              paddingTop: "20px",
              borderTop: "1px solid #292929",
            }}
          >
            <div>
              <strong style={{ color: "#E53935", fontSize: "1.8rem" }}>01</strong>
              <p style={{ color: "#666666", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "0.68rem", margin: "4px 0 0" }}>
                Learning ecosystem
              </p>
            </div>
            <div>
              <strong style={{ color: "#E53935", fontSize: "1.8rem" }}>✦</strong>
              <p style={{ color: "#666666", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "0.68rem", margin: "4px 0 0" }}>
                Innovation focused
              </p>
            </div>
          </div>
        </article>
      </section>

      <section
        style={{
          maxWidth: "1080px",
          margin: "58px auto 0",
          paddingTop: "28px",
          borderTop: "1px solid #292929",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "40px",
        }}
      >
        <div>
          <p style={{ ...labelText, margin: "0 0 12px" }}>Our Vision</p>
          <p style={{ ...bodyText, margin: 0 }}>
            To build a collaborative student community where innovation
            thrives, ideas become reality, and future-ready creators emerge.
          </p>
        </div>
        <div>
          <p style={{ ...labelText, margin: "0 0 12px" }}>Our Mission</p>
          <p style={{ ...bodyText, margin: 0 }}>
            Innovate, collaborate, empower, and build through hands-on learning
            and meaningful technology projects.
          </p>
        </div>
        <div>
          <p style={{ ...labelText, margin: "0 0 12px" }}>
            Metaverse × HackSprint 3.0
          </p>
          <p style={{ color: "#ffffff", fontSize: "1rem", lineHeight: 1.5, margin: 0 }}>
            We don&apos;t just imagine the future. We build it together.
          </p>
        </div>
      </section>
    </main>
  );
}
