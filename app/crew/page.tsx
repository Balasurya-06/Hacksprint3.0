import PageHeader, { PageFrame } from "@/components/PageHeader";

const crew = [["AL", "Alex Lee", "Program Director", "#ff6b35"], ["BM", "Bea Morgan", "Community Lead", "#a855f7"], ["CJ", "Chris Jones", "Technical Lead", "#06b6d4"], ["DK", "Drew Kim", "Partnerships", "#f59e0b"]];

export default function CrewPage() {
  return <PageFrame><PageHeader eyebrow="Meet the team" title="The Crew." description="The builders, mentors, and community leaders behind HACKSPRINT 3.0." /><div className="grid grid-cols-2 md:grid-cols-4 gap-5" style={{ maxWidth: "900px", margin: "0 auto" }}>{crew.map(([initials, name, role, color]) => <div className="card" key={name} style={{ padding: "28px 20px", textAlign: "center" }}><div style={{ width: "80px", height: "80px", borderRadius: "50%", background: color, display: "grid", placeItems: "center", margin: "0 auto 20px", fontWeight: 800, fontSize: "1.4rem" }}>{initials}</div><h2 style={{ fontSize: "1rem" }}>{name}</h2><p style={{ color: "#777", fontSize: "0.8rem", marginTop: "8px" }}>{role}</p></div>)}</div></PageFrame>;
}
