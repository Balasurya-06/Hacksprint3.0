"use client";

const phases = [
  {
    num: "I",
    label: "PHASE I",
    title: "Registration\nOpens",
    date: "NOV 8, 2026",
    desc: "The arena gates swing open. Submit your team, claim your territory, and lock in your spot before the frontier fills up.",
    status: "confirmed",
    side: "top",
  },
  {
    num: "II",
    label: "PHASE II",
    title: "Project Idea\nSubmission Deadline",
    date: "DEC 28, 2026",
    desc: "Last call. Submit your project idea before the bounty board shuts down. Make sure your outlaw squad has filed their concept.",
    status: "confirmed",
    side: "bottom",
  },
  {
    num: "III",
    label: "PHASE III",
    title: "Finalized Teams\nAnnounced",
    date: "JAN 4, 2027",
    desc: "The roster is sealed. Every confirmed posse receives their official dispatch — check the list and prepare your arsenal.",
    status: "upcoming",
    side: "top",
  },
  {
    num: "IV",
    label: "PHASE IV",
    title: "HackSprint\n3.0 Begins",
    date: "TO BE ANNOUNCED",
    desc: "36 hours. One shot at glory. The sprint fires — code, build, and ship something that changes everything.",
    status: "tba",
    side: "bottom",
  },
  {
    num: "V",
    label: "PHASE V",
    title: "Winner\nAnnouncement",
    date: "TO BE ANNOUNCED",
    desc: "The dust settles. Legends are crowned, bounties claimed. The final verdict echoes across the frontier.",
    status: "tba",
    side: "top",
  },
];

export default function TimelinePage() {
  return (
    <section
      id="timeline"
      style={{
        background: "#090909",
        padding: "90px 0 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ambient glow */}
      <div className="timeline-phase-grid" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(204,17,24,0.06) 0%, transparent 100%)",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1, padding: "0 40px" }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: 72 }}>
          <p style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "0.72rem", fontWeight: 700,
            letterSpacing: "0.24em", color: "#E53935",
            textTransform: "uppercase", marginBottom: 10,
          }}>
            ✦ &nbsp;CHAPTER III&nbsp; ✦
          </p>
          <h2 style={{
            fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            letterSpacing: "0.06em", color: "#F5F5F5",
            textTransform: "uppercase", margin: "0 0 8px",
            lineHeight: 1,
          }}>
            TIMELINE
          </h2>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontStyle: "italic",
            fontSize: "0.9rem",
            color: "#777777",
            letterSpacing: "0.08em",
          }}>
            HORIZONTAL INFOGRAPHIC — five milestones to the frontier
          </p>
          {/* red underline */}
          <div style={{ width: 64, height: 3, background: "#E53935", marginTop: 16, boxShadow: "0 0 10px rgba(229,27,36,0.5)" }} />
        </div>

        {/* ══════════════════════════════════════
            HORIZONTAL TIMELINE TRACK
        ══════════════════════════════════════ */}
        <div style={{ position: "relative" }}>

          {/* ── top cards row ── */}
          <div className="timeline-node-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 20,
            marginBottom: 0,
          }}>
            {phases.map((p) => (
              <div key={p.num} style={{ minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                {p.side === "top" ? (
                  <PhaseCard phase={p} />
                ) : (
                  /* spacer for bottom cards */
                  <div />
                )}
              </div>
            ))}
          </div>

          {/* ── SPINE LINE ── */}
          <div style={{ position: "relative", height: 40, margin: "0 0" }}>
            {/* horizontal line */}
            <div className="timeline-phase-grid" style={{
              position: "absolute",
              top: "50%",
              left: 0, right: 0,
              height: 2,
              background: "linear-gradient(to right, transparent 0%, #E53935 5%, #E53935 95%, transparent 100%)",
              transform: "translateY(-50%)",
            }} />

            {/* nodes */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 20,
              position: "absolute",
              inset: 0,
            }}>
              {phases.map((p) => {
                const isTba       = p.status === "tba";
                const nodeColor   = isTba ? "#292929" : "#E53935";
                return (
                  <div key={p.num} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}>
                    {/* outer pulse ring */}
                    {!isTba && (
                      <div style={{
                        position: "absolute",
                        width: 32, height: 32,
                        borderRadius: "50%",
                        border: `1px solid ${nodeColor}`,
                        opacity: 0.3,
                      }} />
                    )}
                    {/* main node */}
                    <div style={{
                      width: 20, height: 20,
                      borderRadius: "50%",
                      background: isTba ? "#121212" : "#090909",
                      border: `2px solid ${nodeColor}`,
                      boxShadow: isTba ? "none" : `0 0 12px rgba(229,27,36,0.6)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                      position: "relative",
                    }}>
                      <div style={{
                        width: 7, height: 7,
                        borderRadius: "50%",
                        background: isTba ? "#292929" : "#E53935",
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── bottom cards row ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 20,
          }}>
            {phases.map((p) => (
              <div key={p.num} style={{ minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                {p.side === "bottom" ? (
                  <PhaseCard phase={p} />
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PHASE CARD
───────────────────────────────────────── */
function PhaseCard({ phase }: { phase: typeof phases[number] }) {
  const isTba       = phase.status === "tba";
  const isConfirmed = phase.status === "confirmed";

  const accentColor = isTba ? "#292929" : "#E53935";
  const titleColor  = isTba ? "#3d2829"  : "#F5F5F5";
  const dateColor   = isTba ? "#3d2629"  : "#E53935";
  const descColor   = isTba ? "#2e1e1e"  : "#B3B3B3";
  const labelColor  = isTba ? "#292929"  : "#E53935";

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #121212 0%, #130d0e 100%)",
        border: `1px solid ${isTba ? "#1a1214" : "#292929"}`,
        borderTop: `3px solid ${accentColor}`,
        padding: "20px 18px",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        if (!isTba) {
          el.style.transform = "translateY(-4px)";
          el.style.boxShadow = "0 12px 36px rgba(204,17,24,0.18)";
        }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* corner bracket top-left */}
      <div style={{ position:"absolute", top:0, left:0, width:20, height:20, borderRight:`1px solid ${isTba?"#1a1214":"#292929"}`, borderBottom:`1px solid ${isTba?"#1a1214":"#292929"}`, background:`rgba(204,17,24,${isTba?"0":"0.04"})` }} />
      {/* corner bracket bottom-right */}
      <div style={{ position:"absolute", bottom:0, right:0, width:20, height:20, borderLeft:`1px solid ${isTba?"#1a1214":"#292929"}`, borderTop:`1px solid ${isTba?"#1a1214":"#292929"}`, background:`rgba(204,17,24,${isTba?"0":"0.04"})` }} />

      {/* confirmed badge */}
      {isConfirmed && (
        <div style={{ position:"absolute", top:10, right:10, display:"flex", alignItems:"center", gap:4 }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:"#E53935", boxShadow:"0 0 6px rgba(229,27,36,0.9)" }} />
          <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.5rem", fontWeight:700, letterSpacing:"0.14em", color:"#E53935", textTransform:"uppercase" }}>CONFIRMED</span>
        </div>
      )}

      {/* phase label */}
      <p style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.2em", color:labelColor, textTransform:"uppercase", margin:"0 0 6px" }}>
        {phase.label}
      </p>

      {/* title */}
      <h3 style={{
        fontFamily: "'Bebas Neue','Oswald',sans-serif",
        fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
        letterSpacing: "0.05em",
        color: titleColor,
        textTransform: "uppercase",
        margin: "0 0 10px",
        lineHeight: 1.15,
        whiteSpace: "pre-line",
      }}>
        {phase.title}
      </h3>

      {/* date */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        border: `1px solid ${isTba ? "#292929" : "#292929"}`,
        background: isTba ? "transparent" : "rgba(204,17,24,0.07)",
        padding: "3px 8px", marginBottom: 10,
      }}>
        {!isTba && <span style={{ color:"#E53935", fontSize:"0.45rem" }}>✦</span>}
        <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.1em", color:dateColor, textTransform:"uppercase" }}>
          {phase.date}
        </span>
      </div>

      {/* divider */}
      <div style={{ width:"100%", height:1, background:`linear-gradient(to right, ${isTba?"#292929":"#292929"}, transparent)`, margin:"6px 0 8px" }} />

      {/* desc */}
      <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.72rem", lineHeight:1.6, color:descColor, margin:0 }}>
        {phase.desc}
      </p>
    </div>
  );
}
