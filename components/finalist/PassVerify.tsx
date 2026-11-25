"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Schedule from "./Schedule";
import { EVENT, MUST_BRING } from "@/lib/finalist/event";

type Result =
  | { state: "loading" }
  | { state: "invalid" }
  | { state: "done"; valid: boolean; name: string; isLeader: boolean; passNumber: string; team: { code: string; name: string }; checkedIn: boolean };

/* What anyone sees after scanning an entry-pass QR with a phone camera:
   who the pass belongs to, whether it's valid, and the finale schedule.
   (Volunteers check people in from the organiser scanner at /admin/scan.) */
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

  return (
    <>
      {r.state === "loading" && <div className="fp-card"><p className="fp-muted">Checking pass…</p></div>}

      {r.state === "invalid" && (
        <div className="fp-card" style={{ borderColor: "rgba(255,59,48,0.6)" }}>
          <span className="fp-badge fp-badge--bad">✕ Invalid pass</span>
          <h1 className="fp-team-name">Not valid</h1>
          <p className="fp-muted">This QR is not a genuine HackSprint 3.0 entry pass. Please contact the help desk.</p>
        </div>
      )}

      {r.state === "done" && (
        <div className="fp-card" style={{ borderColor: r.valid ? "rgba(65,209,123,0.6)" : "rgba(255,59,48,0.6)" }}>
          <div className="fp-btn-row">
            <span className={`fp-badge ${r.valid ? "fp-badge--paid" : "fp-badge--short"}`}>{r.valid ? "✓ Valid entry pass" : "! Payment pending"}</span>
            {r.checkedIn && <span className="fp-badge fp-badge--paid">✓ Checked in</span>}
          </div>
          <h1 className="fp-team-name">{r.name}</h1>
          <p className="fp-code">
            {r.isLeader ? "TEAM LEADER · " : ""}TEAM {r.team.name.toUpperCase()} · {r.team.code} · PASS {r.passNumber}
          </p>
          <p className="fp-muted" style={{ marginBottom: 0 }}>
            {EVENT.name} · {EVENT.venueShort} · {EVENT.dates}
          </p>
        </div>
      )}

      {r.state !== "loading" && (
        <>
          <div className="fp-card" style={{ marginTop: 18 }}>
            <div className="fp-head">
              <h2 className="fp-card-title">Finale schedule</h2>
              {EVENT.scheduleTentative && <span className="fp-badge fp-badge--bad">Tentative</span>}
            </div>
            <Schedule />
          </div>
          <div className="fp-card" style={{ marginTop: 18 }}>
            <h2 className="fp-card-title">Bring to registration</h2>
            <ul className="fp-checklist">
              {MUST_BRING.map((b) => (
                <li key={b.title}><b>{b.title}</b><span className="fp-muted">{b.note}</span></li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
