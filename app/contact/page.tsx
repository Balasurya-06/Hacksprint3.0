"use client";

import PageHeader, { PageFrame } from "@/components/PageHeader";

export default function ContactPage() {
  return (
    <PageFrame accent>
      <PageHeader
        eyebrow="Get in touch"
        title={<>Contact<br />HackSprint 3.0</>}
        description="Reach out to the organizing team for queries, sponsorships, or partnerships."
      />

      <div style={{ maxWidth:"640px", margin:"0 auto", display:"flex", flexDirection:"column", gap:24 }}>

        {/* Email */}
        <a
          href="mailto:hacksprint.official@gmail.com"
          style={{
            display:"flex", alignItems:"center", gap:16,
            background:"#0f0a0b", border:"1px solid #2a1b1d",
            borderLeft:"3px solid #e51b24",
            padding:"20px 24px", textDecoration:"none",
            transition:"border-color 0.2s, transform 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(4px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}
        >
          <span style={{ color:"#e51b24", fontSize:"1.2rem" }}>✉</span>
          <div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", color:"#e51b24", textTransform:"uppercase", marginBottom:4 }}>EMAIL</div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.92rem", color:"#f5f1ea" }}>hacksprint.official@gmail.com</div>
          </div>
        </a>

        {/* Phone */}
        <a
          href="tel:+919597075831"
          style={{
            display:"flex", alignItems:"center", gap:16,
            background:"#0f0a0b", border:"1px solid #2a1b1d",
            borderLeft:"3px solid #e51b24",
            padding:"20px 24px", textDecoration:"none",
            transition:"border-color 0.2s, transform 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(4px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}
        >
          <span style={{ color:"#e51b24", fontSize:"1.2rem" }}>☎</span>
          <div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", color:"#e51b24", textTransform:"uppercase", marginBottom:4 }}>PHONE</div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.92rem", color:"#f5f1ea" }}>+91 95970 75831 — Bala Surya S (Lead)</div>
          </div>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/hacksprint3.0"
          target="_blank"
          rel="noreferrer"
          style={{
            display:"flex", alignItems:"center", gap:16,
            background:"#0f0a0b", border:"1px solid #2a1b1d",
            borderLeft:"3px solid #e51b24",
            padding:"20px 24px", textDecoration:"none",
            transition:"border-color 0.2s, transform 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(4px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}
        >
          <span style={{ color:"#e51b24", fontSize:"1.2rem" }}>◉</span>
          <div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", color:"#e51b24", textTransform:"uppercase", marginBottom:4 }}>INSTAGRAM</div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.92rem", color:"#f5f1ea" }}>instagram.com/hacksprint3.0</div>
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/showcase/hacksprint3-0"
          target="_blank"
          rel="noreferrer"
          style={{
            display:"flex", alignItems:"center", gap:16,
            background:"#0f0a0b", border:"1px solid #2a1b1d",
            borderLeft:"3px solid #e51b24",
            padding:"20px 24px", textDecoration:"none",
            transition:"border-color 0.2s, transform 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(4px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "none"; }}
        >
          <span style={{ color:"#e51b24", fontSize:"1.2rem" }}>in</span>
          <div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.18em", color:"#e51b24", textTransform:"uppercase", marginBottom:4 }}>LINKEDIN</div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.92rem", color:"#f5f1ea" }}>linkedin.com/showcase/hacksprint3-0</div>
          </div>
        </a>
      </div>
    </PageFrame>
  );
}
