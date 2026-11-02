export default function PrizesPage() {
  const prizes = [
    { place:"1st",  amount:"₹10,000+", label:"WINNER",       icon:"🏆", desc:"Cash prize + trophy + certificates + startup incubation access + swag pack" },
    { place:"2nd",  amount:"₹7,000+",  label:"RUNNER UP",    icon:"🥈", desc:"Cash prize + certificates + swag pack" },
    { place:"3rd",  amount:"₹5,000+",  label:"SECOND RUNNER",icon:"🥉", desc:"Cash prize + certificates + swag pack" },
  ];

  const special = [
    { title:"Best Innovation",        desc:"Track-specific award for the most innovative solution across all 5 trails." },
    { title:"Best Beginner Team",     desc:"Specially awarded to first-time hackathon participants showing exceptional growth." },
    { title:"Best Social Impact",     desc:"For projects solving real-world grassroots problems in India." },
    { title:"Devfolio Special Prize", desc:"Awarded by Devfolio for the best use of their platform and ecosystem tools." },
  ];

  return (
    <main style={{
      background: "#070606",
      color: "#f5f1ea",
      minHeight: "100vh",
      padding: "100px 24px 100px",
      fontFamily: "'Inter',sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* glow */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 50% 35% at 50% 20%, rgba(204,17,24,0.08) 0%, transparent 100%)" }} />

      <div style={{ maxWidth:1100, margin:"0 auto", position:"relative", zIndex:1 }}>

        {/* header */}
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <p style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.24em", color:"#e51b24", textTransform:"uppercase", marginBottom:12 }}>
            ✦ &nbsp;BOUNTY POOL&nbsp; ✦
          </p>
          <h1 style={{ fontFamily:"'Bebas Neue','Oswald',sans-serif", fontSize:"clamp(3rem,7vw,5.5rem)", letterSpacing:"0.06em", color:"#f5f1ea", textTransform:"uppercase", margin:"0 0 14px", lineHeight:1 }}>
            PRIZES &amp; REWARDS
          </h1>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
            <div style={{ width:48, height:1, background:"linear-gradient(to left,#e51b24,transparent)" }} />
            <span style={{ color:"#e51b24" }}>✦</span>
            <div style={{ width:48, height:1, background:"linear-gradient(to right,#e51b24,transparent)" }} />
          </div>
          {/* total pool */}
          <div style={{ marginTop:24, display:"inline-block", background:"linear-gradient(135deg,#0f0a0b,#130d0e)", border:"1px solid #2a1b1d", borderTop:"3px solid #e51b24", padding:"16px 40px" }}>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.22em", color:"#e51b24", textTransform:"uppercase", marginBottom:4 }}>TOTAL PRIZE POOL</div>
            <div style={{ fontFamily:"'Bebas Neue','Oswald',sans-serif", fontSize:"clamp(2.5rem,5vw,4rem)", letterSpacing:"0.04em", color:"#f5f1ea", lineHeight:1 }}>₹21 LAKH+</div>
          </div>
        </div>

        {/* top 3 */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:48 }}>
          {prizes.map((p, i) => (
            <div key={p.place} style={{
              background:"linear-gradient(145deg,#0f0a0b 0%,#130d0e 100%)",
              border:`1px solid ${i===0?"#e51b24":"#2a1b1d"}`,
              borderTop:`3px solid ${i===0?"#e51b24":"#3d1e20"}`,
              padding:"32px 24px",
              position:"relative",
              overflow:"hidden",
              boxShadow: i===0 ? "0 0 40px rgba(204,17,24,0.15)" : "none",
              transform: i===0 ? "scale(1.03)" : "none",
            }}>
              <div style={{ position:"absolute", bottom:10, right:14, fontFamily:"'Bebas Neue',sans-serif", fontSize:"5rem", color:"rgba(229,27,36,0.04)", lineHeight:1, userSelect:"none" }}>{p.place}</div>
              <div style={{ fontSize:"2rem", marginBottom:12 }}>{p.icon}</div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.2em", color:"#e51b24", textTransform:"uppercase", marginBottom:8 }}>{p.label}</div>
              <div style={{ fontFamily:"'Bebas Neue','Oswald',sans-serif", fontSize:"clamp(2rem,3.5vw,2.8rem)", letterSpacing:"0.04em", color:"#f5f1ea", lineHeight:1, marginBottom:12 }}>{p.amount}</div>
              <div style={{ width:32, height:2, background:"#e51b24", marginBottom:12 }} />
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.78rem", lineHeight:1.65, color:"#7a7068", margin:0 }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* special awards */}
        <div style={{ marginBottom:48 }}>
          <p style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.22em", color:"#e51b24", textTransform:"uppercase", marginBottom:24, textAlign:"center" }}>
            ✦ &nbsp;SPECIAL AWARDS&nbsp; ✦
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16 }}>
            {special.map(s => (
              <div key={s.title} style={{ background:"#0f0a0b", border:"1px solid #1e1415", padding:"20px 20px", display:"flex", gap:14, alignItems:"flex-start" }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#e51b24", boxShadow:"0 0 6px rgba(229,27,36,0.7)", flexShrink:0, marginTop:6 }} />
                <div>
                  <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.82rem", fontWeight:700, letterSpacing:"0.1em", color:"#f5f1ea", textTransform:"uppercase", marginBottom:6 }}>{s.title}</div>
                  <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.76rem", lineHeight:1.6, color:"#7a7068", margin:0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* note */}
        <div style={{ textAlign:"center", padding:"24px", border:"1px solid #1e1415", background:"#0f0a0b" }}>
          <p style={{ fontFamily:"'Cinzel',serif", fontStyle:"italic", fontSize:"0.82rem", color:"#5a4a4a", margin:0 }}>
            Prize amounts are subject to final sponsor confirmation. Additional perks and goodies will be announced closer to the event.
          </p>
        </div>
      </div>
    </main>
  );
}
