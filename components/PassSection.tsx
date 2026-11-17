import PassGenerator from "@/components/PassGenerator";

/* Participant-pass block — used on the home page (after Crew) and on /pass. */
export default function PassSection() {
  return (
    <div className="hs-section pass-page">
      <div className="hs-container">
        <header className="hs-head hs-head--center">
          <p className="hs-eyebrow hs-eyebrow--center">HackSprint 3.0 · Participant pass</p>
          <h2 className="hs-title">
            Get your <span className="hs-accent">hacker pass</span>
          </h2>
          <p className="hs-lead">
            Celebrate being part of HackSprint 3.0. Add your name, team and photo, download your pass and share it on
            LinkedIn or Instagram — tag <b>@hacksprint3.0</b>.
          </p>
          <p className="pass-note">
            A keepsake to share — <b>not an entry ticket</b>. Registration closes <b>Dec 28, 2026</b>; the grand finale is
            on <b>Feb 5–6, 2027</b> at KAHE, Coimbatore.
          </p>
        </header>
        <PassGenerator />
      </div>
    </div>
  );
}
