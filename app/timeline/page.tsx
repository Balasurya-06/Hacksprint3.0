import PageHeader, { PageFrame } from "@/components/PageHeader";

const milestones = [["01", "Registration", "Oct 1–20", "DONE"], ["02", "Briefing", "Oct 21–24", "ACTIVE"], ["03", "Sprint Begins", "Oct 25", "UPCOMING"], ["04", "Submissions Close", "Oct 27", "UPCOMING"], ["05", "Pitch Day", "Oct 27 PM", "UPCOMING"], ["06", "Awards", "Oct 27 Eve", "UPCOMING"]];

export default function TimelinePage() {
  return <PageFrame><PageHeader eyebrow="Season 3.0" title="Mission Timeline." description="Every milestone on the road from registration to the final awards." /><div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ maxWidth: "1100px", margin: "0 auto" }}>{milestones.map(([num, title, date, status], i) => <div className="card" key={num} style={{ padding: "28px 24px" }}><div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}><span style={{ width: "36px", height: "36px", borderRadius: "50%", background: i < 2 ? "#d4ff00" : "#333", color: i < 2 ? "#0a0a0a" : "#888", display: "grid", placeItems: "center", fontWeight: 800, fontSize: "0.8rem" }}>{num}</span><span className="section-label" style={{ fontSize: "0.65rem" }}>{status}</span></div><h2 style={{ fontSize: "1.05rem" }}>{title}</h2><p style={{ color: "#666", marginTop: "8px" }}>{date}</p></div>)}</div></PageFrame>;
}
