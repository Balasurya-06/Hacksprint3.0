import PageHeader, { PageFrame } from "@/components/PageHeader";

const sponsors = ["TECHCORP", "AXIOM AI", "CLOUDNOVA", "DEVSTUDIO", "STACKPILOT", "CODEX LABS", "BUILDSPACE", "GITHUB"];

export default function SponsorsPage() {
  return <PageFrame><PageHeader eyebrow="Season 3.0 partners" title="Our Sponsors." description="The organizations helping the next generation of builders turn ambitious ideas into reality." /><div className="grid grid-cols-2 md:grid-cols-4 gap-5" style={{ maxWidth: "1000px", margin: "0 auto" }}>{sponsors.map((sponsor) => <div className="card" key={sponsor} style={{ padding: "32px 24px", textAlign: "center" }}><div style={{ height: "60px", background: "#111", borderRadius: "12px", display: "grid", placeItems: "center", border: "1px solid #1a1a1a" }}><span style={{ color: "#d4ff00", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.08em" }}>{sponsor}</span></div><p style={{ color: "#555", fontSize: "0.75rem", marginTop: "16px" }}>Sponsor</p></div>)}</div></PageFrame>;
}
