import PageHeader, { PageFrame } from "@/components/PageHeader";

const events = [["Season 01", "2024", "150+", "42", "linear-gradient(135deg,#3b82f6,#6366f1)"], ["Season 02", "2025", "350+", "98", "linear-gradient(135deg,#f59e0b,#ef4444)"]];

export default function PastEventsPage() {
  return <PageFrame><PageHeader eyebrow="The legacy" title="Past Events." description="A look back at the hackers, projects, and ideas that built the HACKSPRINT community." /><div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxWidth: "900px", margin: "0 auto" }}>{events.map(([season, year, participants, projects, bg]) => <article className="card" key={season}><div style={{ height: "180px", background: bg, display: "grid", placeItems: "center" }}><div style={{ textAlign: "center" }}><span style={{ fontSize: "0.7rem", fontWeight: 700 }}>{season}</span><div style={{ fontSize: "3.5rem", fontWeight: 800 }}>&apos;{year.slice(2)}</div></div></div><div style={{ padding: "28px", display: "flex", gap: "40px" }}><div><strong style={{ color: "#d4ff00", fontSize: "2rem" }}>{participants}</strong><p style={{ color: "#555", fontSize: "0.7rem" }}>Participants</p></div><div><strong style={{ color: "#d4ff00", fontSize: "2rem" }}>{projects}</strong><p style={{ color: "#555", fontSize: "0.7rem" }}>Projects</p></div></div></article>)}</div></PageFrame>;
}
