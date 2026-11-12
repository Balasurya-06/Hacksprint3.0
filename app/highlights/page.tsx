import Image from "next/image";

const galleryImages = [
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.25%20PM.jpeg", "Students participating in a HackSprint event"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.26%20PM%20(1).jpeg", "Students collaborating during HackSprint"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.26%20PM.jpeg", "HackSprint event activity"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.27%20PM%20(1).jpeg", "Students gathered at a HackSprint event"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.27%20PM.jpeg", "Participants working in a computer laboratory"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.28%20PM.jpeg", "HackSprint workshop participants"],
];

export default function HighlightsPage() {
  return (
    <div className="hs-section hs-section--alt">
      <div className="hs-container">
        <header className="hs-head hs-head--center hs-reveal">
          <p className="hs-eyebrow hs-eyebrow--center">HackSprint 2.0</p>
          <h2 className="hs-title hs-title--xl">
            Highlights<span className="hs-accent">.</span>
          </h2>
          <p className="hs-lead">A glimpse of the events, workshops, and moments from the past year.</p>
        </header>

        <div className="polaroids">
          {galleryImages.map(([src, alt], i) => (
            <figure key={src} className={`polaroid polaroid--${i + 1} hs-reveal`}>
              <div className="polaroid-photo">
                <Image src={src} alt={alt} fill sizes="(max-width: 700px) 90vw, 33vw" style={{ objectFit: "cover" }} />
              </div>
              <figcaption>
                <span>IMG_{String(i + 1).padStart(3, "0")}</span>
                <span aria-hidden="true">HS 2.0</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
