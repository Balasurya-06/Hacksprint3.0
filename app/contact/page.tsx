import PageHeader, { PageFrame } from "@/components/PageHeader";

export default function ContactPage() {
  return <PageFrame accent><PageHeader eyebrow="Join the sprint" title={<>Ready to Sprint<br />Into History?</>} description="Join 500+ hackers, designers, and builders. Registration closes October 20, 2026." /><div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}><a href="mailto:hello@hacksprint.dev" className="pill-btn" style={{ background: "#0a0a0a", color: "#d4ff00", padding: "14px 36px" }}>Email the team →</a><div style={{ borderTop: "2px solid #0a0a0022", marginTop: "52px", paddingTop: "28px" }}><p style={{ color: "#3a5a00", marginBottom: "14px" }}>Get in touch</p><p style={{ fontSize: "0.9rem" }}>hello@hacksprint.dev · discord.gg/hacksprint · @hacksprint</p></div></div></PageFrame>;
}
