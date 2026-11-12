const cards = [
  {
    file: "metaverse.md",
    title: "About Metaverse",
    paragraphs: [
      <>
        The Metaverse Students Association is a student community under the Department of Computer Science &amp; Engineering at Karpagam Academy of Higher Education, focused on technology, creativity, collaboration, and innovation.
      </>,
      <>Through workshops, events, projects, and hackathons, students explore ideas and turn technical knowledge into real-world solutions.</>,
    ],
    stats: [
      ["01", "Student community"],
      ["∞", "Ideas to explore"],
    ],
  },
  {
    file: "kahe.md",
    title: "About KAHE",
    paragraphs: [
      <>Karpagam Academy of Higher Education (KAHE), located in Coimbatore, Tamil Nadu, is committed to academic excellence, research, innovation, and holistic student development.</>,
      <>KAHE connects classroom learning with creativity, practical skills, entrepreneurship, and emerging technology to prepare students for a rapidly evolving digital world.</>,
    ],
    stats: [
      ["01", "Learning ecosystem"],
      ["✦", "Innovation focused"],
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="hs-section">
      <div className="hs-bg-grid" aria-hidden="true" />
      <div className="hs-container">
        <header className="split-head hs-reveal">
          <div>
            <p className="hs-eyebrow">About KAHE &amp; Metaverse</p>
            <h2 className="hs-title hs-title--xl">
              The community behind
              <br />
              <span className="hs-accent">HackSprint 3.0</span>
            </h2>
          </div>
          <p className="hs-lead">
            A place where academic learning, emerging technology, and student collaboration come together to create meaningful impact.
          </p>
        </header>

        <div className="bento">
          {cards.map((card, i) => (
            <article key={card.title} className="editor spot hs-reveal">
              <div className="editor-tabs" aria-hidden="true">
                <span className="term-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="editor-tab is-active">{card.file}</span>
              </div>
              <div className="editor-body">
                <div className="editor-gutter" aria-hidden="true">
                  {Array.from({ length: 14 }, (_, n) => (
                    <span key={n}>{n + 1}</span>
                  ))}
                </div>
                <div className="editor-content">
                  <div className="editor-title-row">
                    <h3>
                      <span className="editor-hash" aria-hidden="true">
                        #{" "}
                      </span>
                      {card.title}
                    </h3>
                    <span className="editor-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                  {card.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                  <div className="editor-stats">
                    {card.stats.map(([value, label]) => (
                      <div key={label}>
                        <strong>{value}</strong>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <span className="editor-ghost" aria-hidden="true">
                0{i + 1}
              </span>
            </article>
          ))}

          <div className="code-card spot hs-reveal">
            <div className="editor-tabs" aria-hidden="true">
              <span className="term-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="editor-tab is-active">hacksprint.config.ts</span>
            </div>
            <div className="code-block">
              <p className="code-line">
                <span className="c-kw">export const</span> <span className="c-var">hacksprint</span> = {"{"}
              </p>
              <p className="code-line code-indent">
                <span className="c-cm">{"// "}Our Vision</span>
              </p>
              <p className="code-line code-indent">
                <span className="c-key">vision</span>:{" "}
                <span className="c-str">
                  &quot;To build a collaborative student community where innovation thrives, ideas become reality, and future-ready creators emerge.&quot;
                </span>
                ,
              </p>
              <p className="code-line code-indent code-gap">
                <span className="c-cm">{"// "}Our Mission</span>
              </p>
              <p className="code-line code-indent">
                <span className="c-key">mission</span>:{" "}
                <span className="c-str">&quot;Innovate, collaborate, empower, and build through hands-on learning and meaningful technology projects.&quot;</span>,
              </p>
              <p className="code-line">{"};"}</p>
            </div>
          </div>

          <div className="quote-card hs-reveal">
            <p className="hs-eyebrow">Metaverse × HackSprint 3.0</p>
            <p className="quote-card-text">We don&apos;t just imagine the future. We build it together.</p>
            <span className="quote-card-mark" aria-hidden="true">
              ”
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
