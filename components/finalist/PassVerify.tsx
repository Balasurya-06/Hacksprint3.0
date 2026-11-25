"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Result =
  | { state: "loading" }
  | { state: "invalid" }
  | { state: "done"; valid: boolean; team: { code: string; name: string; status: string }; members: { name: string; isLeader: boolean }[] };

/* What a volunteer sees after scanning an entry-pass QR. */
export default function PassVerify() {
  const token = useSearchParams().get("t") ?? "";
  const [fetched, setR] = useState<Result>({ state: "loading" });
  const r: Result = token ? fetched : { state: "invalid" };

  useEffect(() => {
    if (!token) return;
    fetch(`/api/finalist/pass?t=${encodeURIComponent(token)}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return setR({ state: "invalid" });
        setR({ state: "done", ...(await res.json()) });
      })
      .catch(() => setR({ state: "invalid" }));
  }, [token]);

  if (r.state === "loading") return <div className="fp-card"><p className="fp-muted">Checking pass…</p></div>;

  if (r.state === "invalid")
    return (
      <div className="fp-card" style={{ borderColor: "rgba(255,59,48,0.6)" }}>
        <span className="fp-badge fp-badge--bad">✕ Invalid pass</span>
        <h1 className="fp-team-name">Not valid</h1>
        <p className="fp-muted">This QR is not a genuine HackSprint 3.0 entry pass. Send the team to the help desk.</p>
      </div>
    );

  return (
    <div className="fp-card" style={{ borderColor: r.valid ? "rgba(65,209,123,0.6)" : "rgba(255,59,48,0.6)" }}>
      <span className={`fp-badge ${r.valid ? "fp-badge--paid" : "fp-badge--short"}`}>
        {r.valid ? "✓ Valid · Paid" : "! Not paid"}
      </span>
      <h1 className="fp-team-name">{r.team.name}</h1>
      <p className="fp-code">TEAM ID · {r.team.code}</p>
      <ul className="fp-members">
        {r.members.map((m, i) => (
          <li key={i}>
            <span className="fp-avatar">{m.name.trim().charAt(0).toUpperCase()}</span>
            <span>{m.name}</span>
            {m.isLeader && <span className="fp-tag">LEADER</span>}
          </li>
        ))}
      </ul>
      <p className="fp-muted" style={{ marginTop: 16 }}>Match each member against their college ID card.</p>
    </div>
  );
}
