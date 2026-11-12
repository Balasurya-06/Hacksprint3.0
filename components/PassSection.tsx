import PassGenerator from "@/components/PassGenerator";

/* Round 1 participant-pass block — used on the home page (after Crew) and on /pass. */
export default function PassSection() {
  return (
    <div className="hs-section pass-page">
      <div className="hs-container">
        <header className="hs-head hs-head--center">
          <p className="hs-eyebrow hs-eyebrow--center">Round 1 · Participant pass</p>
          <h2 className="hs-title">
            Get your <span className="hs-accent">round 1 pass</span>
          </h2>
          <p className="hs-lead">
            Took part in Round 1? Add your name, team and photo, download your participant pass and post it on Instagram or
            LinkedIn — tag <b>@hacksprint3.0</b>.
          </p>
          <p className="pass-note">
            This pass celebrates your Round 1 participation — it is <b>not an entry ticket</b>. Teams shortlisted for the
            grand finale (Feb 5–6, 2027) will receive a separate finale pass.
          </p>
        </header>
        <PassGenerator />
      </div>
    </div>
  );
}
