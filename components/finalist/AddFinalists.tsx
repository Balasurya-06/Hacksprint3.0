"use client";

import { useState } from "react";

type PreviewRow = {
  name: string;
  members: { name: string; email: string | null; isLeader: boolean }[];
  problems: string[];
  status: "new" | "exists" | "error";
};
type MemberInput = { name: string; email: string };

const SAMPLE = `team_name,member_name,member_email,is_leader
Unique,Arun Kumar,arun@example.com,yes
Unique,Divya R,divya@example.com,
Unique,Karthik S,karthik@example.com,
Vigron,Priya M,priya@example.com,yes
Vigron,Rahul V,rahul@example.com,
`;

async function post(url: string, body: unknown) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export default function AddFinalists({ onDone }: { onDone: () => void }) {
  const [tab, setTab] = useState<"csv" | "manual">("csv");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);

  /* CSV */
  const [csv, setCsv] = useState("");
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState<PreviewRow[] | null>(null);

  /* Manual */
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<MemberInput[]>([{ name: "", email: "" }, { name: "", email: "" }]);

  const reset = () => { setErr(""); setOk(""); };

  async function pickFile(file: File | undefined) {
    reset();
    setPreview(null);
    if (!file) return;
    setFileName(file.name);
    const text = await file.text();
    setCsv(text);
    setBusy(true);
    try {
      setPreview((await post("/api/admin/import", { csv: text, dryRun: true })).preview);
    } catch (e) {
      setErr((e as Error).message);
    }
    setBusy(false);
  }

  async function importCsv() {
    reset();
    setBusy(true);
    try {
      const r = await post("/api/admin/import", { csv });
      setOk(
        `Imported ${r.created.length} team(s)` +
          (r.skipped ? ` · ${r.skipped} already existed (skipped)` : "") +
          (r.failed.length ? ` · ${r.failed.length} with errors not imported` : ""),
      );
      setPreview(null);
      setCsv("");
      setFileName("");
      onDone();
    } catch (e) {
      setErr((e as Error).message);
    }
    setBusy(false);
  }

  async function addTeam(e: React.FormEvent) {
    e.preventDefault();
    reset();
    setBusy(true);
    try {
      const r = await post("/api/admin/team", {
        action: "create",
        name: teamName,
        members: members.map((m, i) => ({ name: m.name, email: m.email, isLeader: i === 0 })),
      });
      setOk(`Team "${r.name}" added. Team ID: ${r.code}`);
      setTeamName("");
      setMembers([{ name: "", email: "" }, { name: "", email: "" }]);
      onDone();
    } catch (e) {
      setErr((e as Error).message);
    }
    setBusy(false);
  }

  const setMember = (i: number, key: keyof MemberInput, v: string) =>
    setMembers((ms) => ms.map((m, j) => (j === i ? { ...m, [key]: v } : m)));

  const counts = preview && {
    new: preview.filter((p) => p.status === "new").length,
    exists: preview.filter((p) => p.status === "exists").length,
    error: preview.filter((p) => p.status === "error").length,
  };

  return (
    <div className="fp-card" style={{ marginTop: 18, background: "rgba(0,0,0,0.4)" }}>
      <div className="fp-btn-row">
        <button className={`hs-btn hs-btn--sm ${tab === "csv" ? "hs-btn--primary" : "hs-btn--ghost"}`} onClick={() => { setTab("csv"); reset(); }}>⬆ Upload CSV</button>
        <button className={`hs-btn hs-btn--sm ${tab === "manual" ? "hs-btn--primary" : "hs-btn--ghost"}`} onClick={() => { setTab("manual"); reset(); }}>＋ Add team manually</button>
      </div>

      {err && <div className="fp-error" style={{ marginTop: 16 }}>{err}</div>}
      {ok && <div className="fp-ok" style={{ marginTop: 16 }}>{ok}</div>}

      {tab === "csv" ? (
        <div style={{ marginTop: 18 }}>
          <p className="fp-muted" style={{ marginTop: 0 }}>
            One row per member, with columns <code>team_name, member_name, member_email, is_leader</code>. Put{" "}
            <code>yes</code> in <code>is_leader</code> for the leader (if none is marked, the first member is the leader).
            Teams that already exist are skipped, so re-uploading is safe.{" "}
            <a
              className="fp-link"
              href={`data:text/csv;charset=utf-8,${encodeURIComponent(SAMPLE)}`}
              download="finalists-template.csv"
            >
              Download template
            </a>
          </p>
          <label className="hs-btn hs-btn--ghost" style={{ cursor: "pointer" }}>
            {fileName ? `📄 ${fileName}` : "Choose CSV file…"}
            <input type="file" accept=".csv,text/csv" hidden onChange={(e) => { pickFile(e.target.files?.[0]); e.target.value = ""; }} />
          </label>

          {preview && counts && (
            <>
              <p className="fp-muted" style={{ marginTop: 16 }}>
                Preview: <b style={{ color: "#7fe6a8" }}>{counts.new} new</b> · {counts.exists} already exist ·{" "}
                <b style={{ color: counts.error ? "#ffb3ad" : undefined }}>{counts.error} with errors</b>
              </p>
              <div className="fp-table-wrap" style={{ maxHeight: 360, overflowY: "auto" }}>
                <table className="fp-table">
                  <thead><tr><th>Team</th><th>Members</th><th>Check</th></tr></thead>
                  <tbody>
                    {preview.map((p, i) => (
                      <tr key={i}>
                        <td><b>{p.name}</b></td>
                        <td>
                          {p.members.map((m, j) => (
                            <div key={j}>
                              {m.name} <span className="fp-muted" style={{ fontSize: "0.75rem" }}>{m.email}</span>
                              {m.isLeader && <span className="fp-tag" style={{ color: "var(--red-soft)", fontSize: "0.6rem", marginLeft: 6 }}>LEADER</span>}
                            </div>
                          ))}
                        </td>
                        <td>
                          {p.status === "new" && <span className="fp-badge fp-badge--paid">✓ New</span>}
                          {p.status === "exists" && <span className="fp-badge fp-badge--bad">Exists · skip</span>}
                          {p.status === "error" && <span style={{ color: "#ffb3ad", fontSize: "0.8rem" }}>{p.problems.join(" · ")}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="fp-btn-row" style={{ marginTop: 16 }}>
                <button className="hs-btn hs-btn--primary" disabled={busy || counts.new === 0} onClick={importCsv}>
                  {busy ? "Importing…" : `Import ${counts.new} new team(s)`}
                </button>
                <button className="hs-btn hs-btn--ghost" disabled={busy} onClick={() => { setPreview(null); setCsv(""); setFileName(""); }}>Cancel</button>
              </div>
            </>
          )}
        </div>
      ) : (
        <form onSubmit={addTeam} style={{ marginTop: 18, display: "grid", gap: 14 }}>
          <div>
            <label className="fp-label" htmlFor="new-team">Team name</label>
            <input id="new-team" className="fp-input" style={{ fontFamily: "var(--font-body)" }} value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="e.g. Vigron" required />
          </div>
          <div>
            <span className="fp-label">Members (2–5) · first member is the team leader</span>
            <div style={{ display: "grid", gap: 8 }}>
              {members.map((m, i) => (
                <div key={i} className="fp-btn-row" style={{ alignItems: "center" }}>
                  <input className="fp-input" style={{ flex: "1 1 200px", height: 46, fontSize: "0.92rem", fontFamily: "var(--font-body)" }} placeholder={i === 0 ? "Leader name" : `Member ${i + 1} name`} value={m.name} onChange={(e) => setMember(i, "name", e.target.value)} required={i < 2} />
                  <input className="fp-input" style={{ flex: "1 1 220px", height: 46, fontSize: "0.92rem", fontFamily: "var(--font-body)" }} type="email" placeholder={i === 0 ? "Leader email (used for login)" : "Email (optional)"} value={m.email} onChange={(e) => setMember(i, "email", e.target.value)} required={i === 0} />
                  {i >= 2 && (
                    <button type="button" className="fp-link" onClick={() => setMembers((ms) => ms.filter((_, j) => j !== i))}>Remove</button>
                  )}
                </div>
              ))}
            </div>
            {members.length < 5 && (
              <button type="button" className="fp-link" style={{ marginTop: 10 }} onClick={() => setMembers((ms) => [...ms, { name: "", email: "" }])}>
                ＋ Add member
              </button>
            )}
          </div>
          <div className="fp-btn-row">
            <button className="hs-btn hs-btn--primary" disabled={busy}>{busy ? "Adding…" : "Add team"}</button>
          </div>
        </form>
      )}
    </div>
  );
}
