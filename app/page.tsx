import Link from "next/link";

const aboutCards = [
  ["⚡", "Mission", "Ignite innovation by bringing the world's most ambitious hackers together for a 48-hour sprint."],
  ["🎯", "Vision", "A world where the next generation of products is born in 48 hours — every hacker gets a shot."],
  ["🔥", "Values", "Bold creativity. Relentless execution. Radical collaboration. We build the future."],
];
const highlights = [
  ["linear-gradient(135deg,#ff6b35,#ff8c42)", "🚀", "Opening Ceremony", "Oct 25 @ 9:00 AM"],
  ["linear-gradient(135deg,#06b6d4,#3b82f6)", "⚡", "48h Sprint", "Oct 25–27"],
  ["linear-gradient(135deg,#f59e0b,#ef4444)", "🏆", "Pitch & Win", "Oct 27 @ 2:00 PM"],
];
const milestones = [["01", "Registration", "Oct 1–20", "DONE"], ["02", "Briefing", "Oct 21–24", "ACTIVE"], ["03", "Sprint Begins", "Oct 25", "UPCOMING"], ["04", "Submissions Close", "Oct 27", "UPCOMING"], ["05", "Pitch Day", "Oct 27 PM", "UPCOMING"], ["06", "Awards", "Oct 27 Eve", "UPCOMING"]];
const prizes = [["$25K", "Grand Prize"], ["$15K", "Runner Up"], ["$10K", "Community Choice"], ["∞", "Opportunities"]];
const crew = [["AL", "Alex Lee", "Program Director", "#ff6b35"], ["BM", "Bea Morgan", "Community Lead", "#a855f7"], ["CJ", "Chris Jones", "Technical Lead", "#06b6d4"], ["DK", "Drew Kim", "Partnerships", "#f59e0b"]];
const sponsors = ["TECHCORP", "AXIOM AI", "CLOUDNOVA", "DEVSTUDIO", "STACKPILOT", "CODEX LABS", "BUILDSPACE", "GITHUB"];
const pastEvents = [["Season 01", "2024", "150+", "42", "linear-gradient(135deg,#3b82f6,#6366f1)"], ["Season 02", "2025", "350+", "98", "linear-gradient(135deg,#f59e0b,#ef4444)"]];

const sectionStyle = { padding: "100px 32px", borderTop: "1px solid #1a1a1a" };
const containerStyle = { maxWidth: "1100px", margin: "0 auto" };
const heading = (eyebrow: string, title: string, description?: string) => (
  <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 56px" }}>
    <p className="section-label" style={{ marginBottom: "14px" }}>{eyebrow}</p>
    <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1.05 }}>{title}</h2>
    {description && <p style={{ color: "#777", lineHeight: 1.7, marginTop: "20px" }}>{description}</p>}
  </div>
);

export default function Home() {
  return (
    <div style={{ background: "#0a0a0a" }}>
      <section id="home" className="hero" style={{ minHeight: "calc(100vh - 52px)", maxWidth: "938px", margin: "0 auto", position: "relative", padding: "32px 0" }}>
        <div className="hero-title">
          <h1 style={{ fontSize: "clamp(3rem, 4.5vw, 4.5rem)", fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.065em", maxWidth: "650px" }}>
            The Ultimate<br /><span style={{ color: "#d4ff00" }}>Hackathon</span> Sprint
          </h1>
        </div>

        <div className="hero-left">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "26px" }}>
            {["A", "B", "C", "D"].map((letter, index) => <span key={letter} style={{ width: "30px", height: "30px", marginLeft: index ? "-4px" : 0, borderRadius: "50%", display: "grid", placeItems: "center", color: "#fff", fontSize: "0.68rem", fontWeight: 800, background: ["#ff6b35", "#a855f7", "#06b6d4", "#f59e0b"][index], border: "2px solid #0a0a0a" }}>{letter}</span>)}
            <span style={{ color: "#666", fontSize: "0.75rem", marginLeft: "4px" }}>500+ Participants</span>
          </div>
          <p style={{ color: "#888", fontSize: "0.82rem", lineHeight: 1.6, maxWidth: "310px" }}>Build and compete with the world&apos;s top hackers.<br />More than 20 unique challenge tracks.</p>
          <a href="#highlights" style={{ display: "inline-block", color: "#d4ff00", fontSize: "0.8rem", fontWeight: 700, marginTop: "14px", textDecoration: "none", borderBottom: "1px solid #d4ff00" }}>Explore All Tracks ↗</a>
          <div style={{ display: "flex", gap: "10px", marginTop: "26px" }}>{["#2165c5", "#7540cf", "#bd2472", "#087b70"].map((color) => <span key={color} style={{ width: "34px", height: "34px", borderRadius: "50%", background: `linear-gradient(135deg, ${color}, #071018)`, border: "1px solid #222" }} />)}</div>
        </div>

        <div className="hero-card">
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 30%, #d4ff0017, transparent 58%)" }} />
          <div className="hero-mark" aria-label="HS3">HS<span>3</span></div>
          <span style={{ background: "#d4ff00", color: "#0a0a0a", borderRadius: "100px", padding: "7px 16px", fontSize: "0.65rem", fontWeight: 800, position: "relative" }}>HACKSPRINT 3.0</span>
        </div>

        <div className="hero-stats">
          {[["500+", "Active Hackers"], ["20+", "Challenge Tracks"], ["48h", "Sprint Duration"]].map(([value, label]) => <div key={label} style={{ padding: "0 0 20px", marginBottom: "24px", borderBottom: "1px solid #1b1b1b" }}><div style={{ fontSize: "2.7rem", fontWeight: 800, lineHeight: 1 }}>{value}</div><p style={{ color: "#555", fontSize: "0.75rem", marginTop: "6px" }}>{label}</p></div>)}
        </div>
      </section>

      <section style={{ background: "#d4ff00", padding: "40px 32px", color: "#0a0a0a" }}>
        <div style={containerStyle}><p style={{ fontWeight: 700, marginBottom: "16px" }}>Supported by</p><div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>{["Ethereum", "Solana", "TypeScript", "React", "Next.js", "GitHub"].map((name) => <span key={name} style={{ border: "1px solid #0a0a0a", borderRadius: "100px", padding: "10px 18px", fontWeight: 600, fontSize: "0.85rem" }}>{name}</span>)}</div></div>
      </section>

      <section id="about" style={sectionStyle}>{heading("About HACKSPRINT", "The Ultimate Hackathon Experience.", "Born as a two-day sprint that fuses creativity with raw technical power, HACKSPRINT has grown into one of the most anticipated tech events of the year.")}<div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={containerStyle}>{aboutCards.map(([icon, title, desc]) => <div className="card" key={title} style={{ padding: "40px 32px" }}><div style={{ fontSize: "1.6rem", marginBottom: "24px" }}>{icon}</div><h3 className="section-label" style={{ marginBottom: "12px" }}>{title}</h3><p style={{ color: "#888", lineHeight: 1.7 }}>{desc}</p></div>)}</div></section>

      <section id="highlights" style={sectionStyle}>{heading("Trending", "Highlights.", "Build and ship with top hackers across 20+ unique challenge tracks.")}<div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={containerStyle}>{highlights.map(([bg, icon, title, time]) => <article className="card" key={title}><div style={{ height: "220px", background: bg, display: "grid", placeItems: "center", position: "relative" }}><span style={{ fontSize: "4rem" }}>{icon}</span><span style={{ position: "absolute", top: "14px", right: "14px", background: "#000b", borderRadius: "100px", padding: "5px 12px", fontSize: "0.7rem" }}>{time}</span></div><div style={{ padding: "20px" }}><p className="section-label">Event</p><h3 style={{ marginTop: "6px" }}>{title}</h3></div></article>)}</div></section>

      <section style={{ background: "#111", padding: "60px 32px", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}><div className="grid grid-cols-2 md:grid-cols-4 gap-8" style={containerStyle}>{[["500+", "Active Hackers"], ["140+", "Projects Built"], ["20+", "Challenge Tracks"], ["$50K+", "Prize Pool"]].map(([value, label]) => <div key={label}><div className="stat-number">{value}</div><p style={{ color: "#555", marginTop: "8px" }}>{label}</p></div>)}</div></section>

      <section id="timeline" style={sectionStyle}>{heading("Season 3.0", "Mission Timeline.", "Every milestone on the road from registration to the final awards.")}<div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={containerStyle}>{milestones.map(([num, title, date, status], i) => <div className="card" key={num} style={{ padding: "28px 24px" }}><div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}><span style={{ width: "36px", height: "36px", borderRadius: "50%", background: i < 2 ? "#d4ff00" : "#333", color: i < 2 ? "#0a0a0a" : "#888", display: "grid", placeItems: "center", fontWeight: 800 }}>{num}</span><span className="section-label" style={{ fontSize: "0.65rem" }}>{status}</span></div><h3>{title}</h3><p style={{ color: "#666", marginTop: "8px" }}>{date}</p></div>)}</div></section>

      <section id="prizes" style={{ ...sectionStyle, background: "#d4ff00", color: "#0a0a0a" }}>{heading("The Reward", "Prizes & Rewards.", "Big ideas deserve a big stage. Compete for more than $50K in prizes.")}<div className="grid grid-cols-2 md:grid-cols-4 gap-5" style={containerStyle}>{prizes.map(([value, title]) => <div key={title} style={{ background: "#0a0a0a", color: "#fff", borderRadius: "16px", padding: "30px 24px", minHeight: "170px" }}><div style={{ color: "#d4ff00", fontSize: "2.5rem", fontWeight: 800 }}>{value}</div><h3 style={{ marginTop: "20px" }}>{title}</h3></div>)}</div></section>

      <section id="crew" style={sectionStyle}>{heading("Meet the Team", "The Crew.", "The builders, mentors, and community leaders behind HACKSPRINT 3.0.")}<div className="grid grid-cols-2 md:grid-cols-4 gap-5" style={{ ...containerStyle, maxWidth: "900px" }}>{crew.map(([initials, name, role, color]) => <div className="card" key={name} style={{ padding: "28px 20px", textAlign: "center" }}><div style={{ width: "80px", height: "80px", borderRadius: "50%", background: color, display: "grid", placeItems: "center", margin: "0 auto 20px", fontWeight: 800 }}>{initials}</div><h3>{name}</h3><p style={{ color: "#777", fontSize: "0.8rem", marginTop: "8px" }}>{role}</p></div>)}</div></section>

      <section id="sponsors" style={sectionStyle}>{heading("Season 3.0 Partners", "Our Sponsors.", "The organizations helping the next generation of builders turn ambitious ideas into reality.")}<div className="grid grid-cols-2 md:grid-cols-4 gap-5" style={{ ...containerStyle, maxWidth: "1000px" }}>{sponsors.map((sponsor) => <div className="card" key={sponsor} style={{ padding: "32px 24px", textAlign: "center" }}><div style={{ height: "60px", background: "#111", borderRadius: "12px", display: "grid", placeItems: "center" }}><span style={{ color: "#d4ff00", fontWeight: 800, fontSize: "0.7rem" }}>{sponsor}</span></div></div>)}</div></section>

      <section id="past-events" style={sectionStyle}>{heading("The Legacy", "Past Events.", "A look back at the hackers, projects, and ideas that built the HACKSPRINT community.")}<div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ ...containerStyle, maxWidth: "900px" }}>{pastEvents.map(([season, year, participants, projects, bg]) => <article className="card" key={season}><div style={{ height: "180px", background: bg, display: "grid", placeItems: "center" }}><div style={{ textAlign: "center" }}><span>{season}</span><div style={{ fontSize: "3.5rem", fontWeight: 800 }}>&apos;{year.slice(2)}</div></div></div><div style={{ padding: "28px", display: "flex", gap: "40px" }}><div><strong style={{ color: "#d4ff00", fontSize: "2rem" }}>{participants}</strong><p style={{ color: "#555" }}>Participants</p></div><div><strong style={{ color: "#d4ff00", fontSize: "2rem" }}>{projects}</strong><p style={{ color: "#555" }}>Projects</p></div></div></article>)}</div></section>

      <section id="contact" style={{ background: "#d4ff00", color: "#0a0a0a", padding: "100px 32px", textAlign: "center" }}>{heading("Join the Sprint", "Ready to Sprint Into History?", "Join 500+ hackers, designers, and builders. Registration closes October 20, 2026.")}<Link href="/contact" className="pill-btn" style={{ background: "#0a0a0a", color: "#d4ff00", padding: "14px 36px" }}>Register Now →</Link><div style={{ borderTop: "2px solid #0a0a0022", margin: "52px auto 0", paddingTop: "28px", maxWidth: "600px" }}><p>hello@hacksprint.dev · discord.gg/hacksprint · @hacksprint</p></div></section>
    </div>
  );
}
