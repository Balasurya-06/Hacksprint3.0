import Image from "next/image";

const galleryImages = [
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.25%20PM.jpeg", "Students participating in a HackSprint event", "gallery-photo-one"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.26%20PM%20(1).jpeg", "Students collaborating during HackSprint", "gallery-photo-two"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.26%20PM.jpeg", "HackSprint event activity", "gallery-photo-three"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.27%20PM%20(1).jpeg", "Students gathered at a HackSprint event", "gallery-photo-four"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.27%20PM.jpeg", "Participants working in a computer laboratory", "gallery-photo-five"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.28%20PM.jpeg", "HackSprint workshop participants", "gallery-photo-six"],
];

export default function HighlightsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#090909", color: "#fff", padding: "62px 32px 110px" }}>
      <div style={{ maxWidth: "940px", margin: "0 auto" }}>
        <header style={{ margin: "0 auto 42px", textAlign: "center" }}>
          <p style={{ color: "#E53935", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.16em", marginBottom: "12px", textTransform: "uppercase" }}>
            HackSprint 2.0
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 4.8vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 1.05 }}>
            Highlights.
          </h1>
          <div style={{ width: "48px", height: "3px", margin: "16px auto 0", background: "#E53935", boxShadow: "0 0 14px #E5393588" }} />
          <p style={{ color: "#777", fontSize: "0.8rem", lineHeight: 1.6, margin: "16px auto 0", maxWidth: "460px" }}>
            A glimpse of the events, workshops, and moments from the past year.
          </p>
        </header>

        <div className="highlights-gallery" style={{ display: "grid", gridTemplateColumns: "1fr 1.12fr 1fr", gridTemplateRows: "170px 170px", gap: "16px" }}>
          {galleryImages.map(([src, alt, className]) => (
            <div key={src} className={className} style={{ position: "relative", minHeight: 0, overflow: "hidden", border: "1px solid #292929", borderRadius: "9px", background: "#1A1A1A" }}>
              <Image src={src} alt={alt} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
