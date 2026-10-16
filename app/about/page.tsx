import PageHeader, { PageFrame } from "@/components/PageHeader";

const values = [
  ["⚡", "Mission", "Ignite innovation by bringing the world's most ambitious hackers together for a 48-hour sprint."],
  ["🎯", "Vision", "A world where the next generation of products is born in 48 hours — every hacker gets a shot."],
  ["🔥", "Values", "Bold creativity. Relentless execution. Radical collaboration. We build the future."],
];

export default function AboutPage() {
  return <PageFrame><PageHeader eyebrow="About HACKSPRINT" title={<>The Ultimate Hackathon<br />Experience.</>} description="Born as a two-day sprint that fuses creativity with raw technical power, HACKSPRINT has grown into one of the most anticipated tech events of the year." /><div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>{values.map(([icon, title, desc]) => <div className="card" key={title} style={{ padding: "40px 32px" }}><div style={{ fontSize: "1.6rem", marginBottom: "24px" }}>{icon}</div><h2 className="section-label" style={{ marginBottom: "12px" }}>{title}</h2><p style={{ color: "#888", lineHeight: 1.7 }}>{desc}</p></div>)}</div></PageFrame>;
}
