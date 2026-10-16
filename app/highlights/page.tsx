import PageHeader, { PageFrame } from "@/components/PageHeader";

const highlights = [
  ["linear-gradient(135deg,#ff6b35,#ff8c42)", "🚀", "Opening Ceremony", "Oct 25 @ 9:00 AM"],
  ["linear-gradient(135deg,#06b6d4,#3b82f6)", "⚡", "48h Sprint", "Oct 25–27"],
  ["linear-gradient(135deg,#f59e0b,#ef4444)", "🏆", "Pitch & Win", "Oct 27 @ 2:00 PM"],
];

export default function HighlightsPage() {
  return <PageFrame><PageHeader eyebrow="Trending" title="Highlights." description="Build and ship with top hackers across 20+ unique challenge tracks." /><div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ maxWidth: "1100px", margin: "0 auto" }}>{highlights.map(([bg, icon, title, time]) => <article className="card" key={title}><div style={{ height: "220px", background: bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}><span style={{ fontSize: "4rem", opacity: 0.7 }}>{icon}</span><span style={{ position: "absolute", top: "14px", right: "14px", background: "#000b", borderRadius: "100px", padding: "5px 12px", fontSize: "0.7rem" }}>{time}</span></div><div style={{ padding: "20px" }}><p className="section-label">Event</p><h2 style={{ marginTop: "6px", fontSize: "1.05rem" }}>{title}</h2></div></article>)}</div></PageFrame>;
}
