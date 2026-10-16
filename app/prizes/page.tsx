import PageHeader, { PageFrame } from "@/components/PageHeader";

const prizes = [["$25K", "Grand Prize", "For the boldest idea and strongest execution."], ["$15K", "Runner Up", "For the team that pushes the craft further."], ["$10K", "Community Choice", "Chosen by the hackers and community."], ["∞", "Opportunities", "Mentorship, partnerships, and the next big launch."]];

export default function PrizesPage() {
  return <PageFrame accent><PageHeader eyebrow="The reward" title={<>Prizes &amp;<br />Rewards.</>} description="Big ideas deserve a big stage. Bring your best work and compete for more than $50K in prizes." /><div className="grid grid-cols-1 md:grid-cols-4 gap-5" style={{ maxWidth: "1100px", margin: "0 auto" }}>{prizes.map(([value, title, desc]) => <div key={title} style={{ background: "#0a0a0a", color: "#fff", borderRadius: "16px", padding: "30px 24px", minHeight: "210px" }}><div style={{ color: "#d4ff00", fontSize: "2.5rem", fontWeight: 800 }}>{value}</div><h2 style={{ margin: "20px 0 10px", fontSize: "1rem" }}>{title}</h2><p style={{ color: "#888", lineHeight: 1.6, fontSize: "0.85rem" }}>{desc}</p></div>)}</div></PageFrame>;
}
