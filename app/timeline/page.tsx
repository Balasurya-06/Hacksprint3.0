"use client";

/* ─────────────────────────────────────────────────────────────
   HackSprint 3.0 — TIMELINE
   History-poster card layout, RDR site theme:
     • Dark #070606 background — no outer container box
     • SVG ribbon banner title
     • Row 1: 3 cards   Row 2: 2 cards centred
     • Red dashed zigzag connector
     • Each card: dark bg, red accent, slight rotation
   ───────────────────────────────────────────────────────────── */

const topRow = [
  {
    phase: "PHASE I",
    date: "NOV 8, 2026",
    title: "Registration\nOpens",
    desc: "The arena gates swing open. Submit your team, claim your territory, and lock in your spot before the frontier fills up.",
    status: "confirmed",
    rotate: "-1.4deg",
  },
  {
    phase: "PHASE II",
    date: "DEC 28, 2026",
    title: "Project Idea\nSubmission Deadline",
    desc: "Last call. Submit your project idea before the bounty board shuts down. Make sure your outlaw squad has filed their concept.",
    status: "confirmed",
    rotate: "1.2deg",
  },
  {
    phase: "PHASE III",
    date: "JAN 4, 2027",
    title: "Finalized Teams\nAnnounced",
    desc: "The roster is sealed. Every confirmed posse receives their official dispatch — check the list and prepare your arsenal.",
    status: "upcoming",
    rotate: "-0.8deg",
  },
];

const bottomRow = [
  {
    phase: "PHASE IV",
    date: "TO BE ANNOUNCED",
    title: "HackSprint\n3.0 Begins",
    desc: "36 hours. One shot at glory. The sprint fires — code, build, and ship something that changes everything.",
    status: "tba",
    rotate: "1.6deg",
  },
  {
    phase: "PHASE V",
    date: "TO BE ANNOUNCED",
    title: "Winner\nAnnouncement",
    desc: "The dust settles. Legends are crowned, bounties claimed. The final verdict echoes across the frontier.",
    status: "tba",
    rotate: "-1.1deg",
  },
];

export default function TimelinePage() {
  return (
    <section
      id="timeline"
      style={{
        background: "#070606",
        padding: "90px 20px 110px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── ambient red glow ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 35% at 50% 20%, rgba(204,17,24,0.09) 0%, transparent 100%)",
      }} />

      {/* ── subtle grid texture ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ════════════════════════════════════════
            HANGING WOODEN SIGN HEADER
        ════════════════════════════════════════ */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>

          {/* ── WOODEN HANGING SIGN ── */}
          <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            <svg
              viewBox="0 0 620 300"
              style={{ width: "clamp(300px, 58vw, 580px)", display: "block", overflow: "visible" }}
              aria-label="Timeline"
            >
              <defs>
                {/* wood grain base gradient */}
                <linearGradient id="woodBase" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#8B5E2A" />
                  <stop offset="18%"  stopColor="#A06C30" />
                  <stop offset="35%"  stopColor="#7A5225" />
                  <stop offset="52%"  stopColor="#9B6530" />
                  <stop offset="68%"  stopColor="#6E4820" />
                  <stop offset="82%"  stopColor="#8A5828" />
                  <stop offset="100%" stopColor="#5C3D18" />
                </linearGradient>

                {/* wood grain horizontal streaks */}
                <linearGradient id="grain1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="rgba(0,0,0,0)"   />
                  <stop offset="20%"  stopColor="rgba(0,0,0,0.06)" />
                  <stop offset="40%"  stopColor="rgba(255,200,120,0.08)" />
                  <stop offset="60%"  stopColor="rgba(0,0,0,0.05)" />
                  <stop offset="80%"  stopColor="rgba(255,180,80,0.07)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)"   />
                </linearGradient>

                {/* edge shadow */}
                <linearGradient id="edgeShadowL" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"  stopColor="rgba(0,0,0,0.45)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </linearGradient>
                <linearGradient id="edgeShadowR" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"  stopColor="rgba(0,0,0,0)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
                </linearGradient>
                <linearGradient id="edgeShadowT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"  stopColor="rgba(255,255,255,0.15)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </linearGradient>
                <linearGradient id="edgeShadowB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"  stopColor="rgba(0,0,0,0)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
                </linearGradient>

                {/* rope gradient */}
                <linearGradient id="ropeG" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%"   stopColor="#7a6030" />
                  <stop offset="30%"  stopColor="#c8a050" />
                  <stop offset="50%"  stopColor="#e8c070" />
                  <stop offset="70%"  stopColor="#c0903a" />
                  <stop offset="100%" stopColor="#8a6828" />
                </linearGradient>

                {/* drop shadow filter */}
                <filter id="woodShadow" x="-10%" y="-10%" width="120%" height="130%">
                  <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="rgba(0,0,0,0.8)" />
                </filter>
                <filter id="ropeShadow">
                  <feDropShadow dx="1" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.6)" />
                </filter>
              </defs>

              {/* ── ROPES (drawn first, behind sign) ── */}

              {/* Left rope — two strands twisted */}
              <g filter="url(#ropeShadow)">
                {/* left rope strand A */}
                <path d="M155,0 C152,30 148,55 151,80 C153,95 157,105 156,120 C155,135 150,145 151,162"
                  fill="none" stroke="#c8a050" strokeWidth="5" strokeLinecap="round" />
                {/* left rope strand B */}
                <path d="M163,0 C165,28 168,52 165,78 C163,92 159,103 160,120 C161,135 165,144 164,162"
                  fill="none" stroke="#9a7830" strokeWidth="4" strokeLinecap="round" />
                {/* cross-wrap marks */}
                {[15,35,55,75,95,115,140].map((y, i) => (
                  <line key={i} x1={153} y1={y} x2={163} y2={y+8}
                    stroke="#7a5820" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                ))}
              </g>

              {/* Right rope — two strands twisted */}
              <g filter="url(#ropeShadow)">
                <path d="M457,0 C454,30 450,55 453,80 C455,95 459,105 458,120 C457,135 452,145 453,162"
                  fill="none" stroke="#c8a050" strokeWidth="5" strokeLinecap="round" />
                <path d="M465,0 C467,28 470,52 467,78 C465,92 461,103 462,120 C463,135 467,144 466,162"
                  fill="none" stroke="#9a7830" strokeWidth="4" strokeLinecap="round" />
                {[15,35,55,75,95,115,140].map((y, i) => (
                  <line key={i} x1={455} y1={y} x2={465} y2={y+8}
                    stroke="#7a5820" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                ))}
              </g>

              {/* ── WOOD BOARD (rough irregular shape) ── */}
              <g filter="url(#woodShadow)">
                {/* board shape — irregular jagged edges like rough-cut wood */}
                <path
                  d="
                    M58,162
                    C50,160 42,158 36,162 C30,166 28,170 30,174
                    L30,175
                    C28,178 27,182 30,186
                    L31,250
                    C29,254 28,260 32,264
                    L32,265
                    C30,268 29,272 34,275
                    L34,276
                    C32,280 33,284 38,286
                    C44,288 50,284 56,286
                    L564,286
                    C570,284 576,288 582,286
                    C587,284 588,280 586,276
                    L586,275
                    C591,272 590,268 588,265
                    L588,264
                    C592,260 591,254 589,250
                    L590,186
                    C593,182 592,178 590,175
                    L590,174
                    C592,170 590,166 584,162
                    C578,158 570,160 562,162
                    Z
                  "
                  fill="url(#woodBase)"
                />

                {/* wood grain overlay strips */}
                {[175,188,200,212,224,236,248,260,272].map((y, i) => (
                  <line key={i}
                    x1={35} y1={y + (i % 3) * 1.5} x2={585} y2={y + ((i+1) % 3) * 1.5}
                    stroke={i % 2 === 0 ? "rgba(0,0,0,0.07)" : "rgba(255,180,80,0.06)"}
                    strokeWidth={i % 3 === 0 ? 3 : 1.5}
                  />
                ))}

                {/* horizontal grain texture rect */}
                <path
                  d="M36,163 L564,163 L589,250 L589,286 L31,286 L31,250 Z"
                  fill="url(#grain1)" opacity="0.8"
                />

                {/* knot 1 — left */}
                <ellipse cx={110} cy={228} rx={18} ry={12} fill="rgba(0,0,0,0.12)" />
                <ellipse cx={110} cy={228} rx={12} ry={8}  fill="rgba(0,0,0,0.08)" />
                <ellipse cx={108} cy={226} rx={5}  ry={4}  fill="rgba(0,0,0,0.1)"  />

                {/* knot 2 — right */}
                <ellipse cx={470} cy={218} rx={22} ry={14} fill="rgba(0,0,0,0.1)" />
                <ellipse cx={470} cy={218} rx={14} ry={9}  fill="rgba(0,0,0,0.07)" />
                <ellipse cx={468} cy={216} rx={6}  ry={5}  fill="rgba(0,0,0,0.09)" />

                {/* small crack lines */}
                <path d="M200,170 Q205,200 202,230" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                <path d="M380,175 Q375,205 378,240" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />

                {/* top edge highlight */}
                <path d="M36,163 L564,163" stroke="url(#edgeShadowT)" strokeWidth="8" opacity="0.9" />
                {/* bottom edge shadow */}
                <path d="M36,282 L564,282" stroke="url(#edgeShadowB)" strokeWidth="10" opacity="0.9" />
                {/* left edge shadow */}
                <path d="M36,163 L36,283" stroke="url(#edgeShadowL)" strokeWidth="16" opacity="0.7" />
                {/* right edge shadow */}
                <path d="M564,163 L564,283" stroke="url(#edgeShadowR)" strokeWidth="16" opacity="0.7" />

                {/* board outline */}
                <path
                  d="
                    M58,162 C50,160 42,158 36,162 C30,166 28,170 30,174 L31,250
                    C29,254 28,260 32,264 L32,265 C30,268 29,272 34,275 L34,276
                    C32,280 33,284 38,286 C44,288 50,284 56,286 L564,286
                    C570,284 576,288 582,286 C587,284 588,280 586,276 L586,275
                    C591,272 590,268 588,265 L588,264 C592,260 591,254 589,250
                    L590,186 C593,182 592,178 590,175 L590,174
                    C592,170 590,166 584,162 C578,158 570,160 562,162 Z
                  "
                  fill="none"
                  stroke="rgba(40,20,5,0.6)"
                  strokeWidth="2"
                />
              </g>

              {/* ── ROPE KNOTS where rope meets board ── */}
              <g>
                {/* left knot wrap */}
                <ellipse cx={159} cy={166} rx={14} ry={8} fill="#b08840" stroke="#7a5820" strokeWidth="1.5" />
                <ellipse cx={159} cy={166} rx={9}  ry={5} fill="#d0a850" opacity="0.6" />
                {/* right knot wrap */}
                <ellipse cx={461} cy={166} rx={14} ry={8} fill="#b08840" stroke="#7a5820" strokeWidth="1.5" />
                <ellipse cx={461} cy={166} rx={9}  ry={5} fill="#d0a850" opacity="0.6" />
              </g>

              {/* ── TEXT ON SIGN ── */}
              {/* "CHAPTER III" small label */}
              <text
                x="310" y="208"
                textAnchor="middle"
                fontFamily="'Oswald', sans-serif"
                fontSize="15"
                fontWeight="700"
                letterSpacing="5"
                fill="rgba(30,10,0,0.55)"
                textDecoration="none"
              >
                CHAPTER III
              </text>

              {/* "TIMELINE" main title */}
              <text
                x="310" y="256"
                textAnchor="middle"
                fontFamily="'Bebas Neue', 'Oswald', sans-serif"
                fontSize="68"
                fontWeight="900"
                letterSpacing="8"
                fill="#1a0a02"
                opacity="0.88"
              >
                TIMELINE
              </text>

              {/* engraved shadow effect under text */}
              <text
                x="312" y="258"
                textAnchor="middle"
                fontFamily="'Bebas Neue', 'Oswald', sans-serif"
                fontSize="68"
                fontWeight="900"
                letterSpacing="8"
                fill="rgba(255,200,100,0.12)"
              >
                TIMELINE
              </text>
            </svg>
          </div>

          {/* subtitle below sign */}
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontStyle: "italic",
            fontSize: "clamp(0.8rem, 1.4vw, 0.94rem)",
            color: "#5a4a3a",
            marginTop: -8,
            letterSpacing: "0.08em",
          }}>
            Five milestones on the road to the frontier
          </p>
        </div>

        {/* ════════════════════════════════════════
            CARD BOARD  (no outer box)
        ════════════════════════════════════════ */}
        <div style={{ position: "relative" }}>

          {/* ── SVG ZIGZAG CONNECTOR (behind cards) ── */}
          <ZigzagLine />

          {/* ── ROW 1 — 3 cards ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px 28px",
            marginBottom: 40,
            position: "relative",
            zIndex: 2,
          }}>
            {topRow.map((item, i) => (
              <PhaseCard key={i} item={item} />
            ))}
          </div>

          {/* ── ROW 2 — 2 cards centred ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr repeat(2, minmax(0,400px)) 1fr",
            gap: "24px 28px",
            position: "relative",
            zIndex: 2,
          }}>
            <div />
            {bottomRow.map((item, i) => (
              <PhaseCard key={i} item={item} />
            ))}
            <div />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PHASE CARD  — parchment paper style, RDR accents
══════════════════════════════════════════════════════════════ */
function PhaseCard({ item }: { item: (typeof topRow)[number] }) {
  const isTba       = item.status === "tba";
  const isConfirmed = item.status === "confirmed";

  /* parchment tones */
  const paperBg      = isTba
    ? "linear-gradient(155deg, #cfc0a0 0%, #bfae8a 45%, #b0a078 100%)"
    : "linear-gradient(155deg, #efe0bc 0%, #e0ca98 45%, #d0b87a 100%)";
  const phaseColor   = isTba ? "#8a6a3a" : "#8a1010";
  const titleColor   = isTba ? "#4a3820" : "#1a0e06";
  const descColor    = isTba ? "#7a6040" : "#3d2410";
  const borderColor  = isTba ? "rgba(90,60,20,0.25)" : "rgba(90,60,20,0.45)";
  const accentBorder = isTba ? "#a08060" : "#8a1010";
  const dateColor    = isTba ? "#7a5a30" : "#8a1010";

  return (
    <div
      style={{
        position: "relative",
        transform: `rotate(${item.rotate})`,
        transformOrigin: "center top",
        transition: "transform 0.28s ease, box-shadow 0.28s ease",
        cursor: "default",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "rotate(0deg) translateY(-6px) scale(1.02)";
        el.style.zIndex = "10";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = `rotate(${item.rotate}) translateY(0) scale(1)`;
        el.style.zIndex = "2";
      }}
    >
      {/* ── push pin ── */}
      <div style={{
        position: "absolute",
        top: -14, left: "50%",
        transform: "translateX(-50%)",
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <div style={{
          width: 16, height: 16,
          borderRadius: "50%",
          background: isConfirmed
            ? "radial-gradient(circle at 35% 30%, #ff4040, #cc1118)"
            : isTba
            ? "radial-gradient(circle at 35% 30%, #c8a060, #8a6a30)"
            : "radial-gradient(circle at 35% 30%, #ffb040, #cc8010)",
          boxShadow: isConfirmed
            ? "0 2px 8px rgba(204,17,24,0.7), 0 0 0 1.5px rgba(255,255,255,0.1)"
            : "0 2px 6px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
        }} />
        <div style={{
          width: 2, height: 18,
          background: "linear-gradient(180deg, #7a5a30 0%, #4a3820 100%)",
          marginTop: -1,
        }} />
      </div>

      {/* ── parchment card body ── */}
      <div style={{
        background: paperBg,
        border: `1px solid ${borderColor}`,
        borderTop: `3px solid ${accentBorder}`,
        borderBottom: `3px solid rgba(90,60,20,0.3)`,
        padding: "28px 22px 24px",
        position: "relative",
        overflow: "hidden",
        minHeight: 220,
        boxShadow: isTba
          ? "0 8px 30px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.2)"
          : "0 10px 40px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.3), 0 0 20px rgba(139,16,16,0.08)",
      }}>
        {/* ruled-line texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(90,60,20,0.055) 23px, rgba(90,60,20,0.055) 24px)",
        }} />

        {/* aged-paper vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(circle at 15% 15%, rgba(0,0,0,0.06) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(0,0,0,0.07) 0%, transparent 40%)",
        }} />

        {/* torn top edge */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 9,
          background: "rgba(0,0,0,0.07)",
          clipPath: "polygon(0 0,3% 100%,6% 0,9% 100%,12% 0,15% 100%,18% 0,21% 100%,24% 0,27% 100%,30% 0,33% 100%,36% 0,39% 100%,42% 0,45% 100%,48% 0,51% 100%,54% 0,57% 100%,60% 0,63% 100%,66% 0,69% 100%,72% 0,75% 100%,78% 0,81% 100%,84% 0,87% 100%,90% 0,93% 100%,96% 0,100% 100%)",
          zIndex: 3, pointerEvents: "none",
        }} />

        {/* corner fold — bottom-right */}
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: 0, height: 0,
          borderLeft: "22px solid transparent",
          borderBottom: `22px solid rgba(90,60,20,0.25)`,
          zIndex: 3,
        }} />

        {/* phase label */}
        <div style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: phaseColor,
          textTransform: "uppercase",
          marginBottom: 8,
          position: "relative", zIndex: 1,
        }}>
          {item.phase}
        </div>

        {/* title */}
        <h3 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
          fontWeight: 700,
          color: titleColor,
          margin: "0 0 12px",
          lineHeight: 1.2,
          whiteSpace: "pre-line",
          position: "relative", zIndex: 1,
        }}>
          {item.title}
        </h3>

        {/* date badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          border: `1px solid ${isTba ? "rgba(90,60,20,0.3)" : "rgba(139,16,16,0.4)"}`,
          background: isTba ? "rgba(90,60,20,0.12)" : "rgba(139,16,16,0.1)",
          padding: "4px 12px",
          marginBottom: 12,
          position: "relative", zIndex: 1,
        }}>
          {!isTba && <span style={{ color: "#8a1010", fontSize: "0.5rem" }}>✦</span>}
          <span style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: dateColor,
            textTransform: "uppercase",
          }}>
            {item.date}
          </span>
        </div>

        {/* divider */}
        <div style={{
          width: "100%", height: 1,
          background: `linear-gradient(to right, rgba(90,60,20,${isTba ? "0.2" : "0.35"}), transparent)`,
          margin: "8px 0 12px",
          position: "relative", zIndex: 1,
        }} />

        {/* description */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.77rem",
          lineHeight: 1.65,
          color: descColor,
          margin: 0,
          position: "relative", zIndex: 1,
        }}>
          {item.desc}
        </p>

        {/* confirmed stamp */}
        {isConfirmed && (
          <div style={{
            position: "absolute", top: 14, right: 14,
            display: "flex", alignItems: "center", gap: 5,
            zIndex: 4,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#8a1010",
              boxShadow: "0 0 6px rgba(139,16,16,0.6)",
            }} />
            <span style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#8a1010",
              textTransform: "uppercase",
            }}>
              CONFIRMED
            </span>
          </div>
        )}

        {/* TBA watermark */}
        {isTba && (
          <div style={{
            position: "absolute",
            bottom: 20, right: 18,
            fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
            fontSize: "2.4rem",
            letterSpacing: "0.08em",
            color: "rgba(90,60,20,0.10)",
            textTransform: "uppercase",
            zIndex: 0,
            userSelect: "none",
            lineHeight: 1,
          }}>
            TBA
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ZIGZAG DASHED CONNECTOR
   Spans full width of the 2-row layout.
   Row 1 card centres  ≈  16.7%, 50%, 83.3%   of width,  at ~43% height
   Row 2 card centres  ≈  31%,   69%           of width,  at ~85% height
══════════════════════════════════════════════════════════════ */
function ZigzagLine() {
  return (
    <svg
      viewBox="0 0 1200 520"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
      aria-hidden
    >
      <defs>
        <filter id="redGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* zigzag path through all 5 card pin-tops */}
      <path
        d="M200,195 L600,195 L1000,195 L1000,195 L820,385 L380,385"
        fill="none"
        stroke="#e51b24"
        strokeWidth={1.8}
        strokeDasharray="11 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.45}
        filter="url(#redGlow)"
      />

      {/* node circles at each pin-top */}
      {([
        [200, 195],
        [600, 195],
        [1000, 195],
        [820, 385],
        [380, 385],
      ] as [number, number][]).map(([x, y], i) => (
        <g key={i}>
          {/* outer pulse ring */}
          <circle cx={x} cy={y} r={10} fill="none"
            stroke="rgba(229,27,36,0.2)" strokeWidth={1} />
          {/* mid ring */}
          <circle cx={x} cy={y} r={6} fill="#070606"
            stroke="rgba(229,27,36,0.6)" strokeWidth={1.5} />
          {/* inner dot */}
          <circle cx={x} cy={y} r={3} fill="#e51b24" opacity={0.8} />
        </g>
      ))}
    </svg>
  );
}
