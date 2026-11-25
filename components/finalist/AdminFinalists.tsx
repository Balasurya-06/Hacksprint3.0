"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Team = {
  id: number;
  team_code: string;
  name: string;
  leader_email: string;
  status: "shortlisted" | "paid";
  paid_at: string | null;
  payment_id: string | null;
  amount_paid: number | null;
  id_mail_sent_at: string | null;
  paid_mail_sent_at: string | null;
  member_count: number;
  members: string;
};

async function fetchTeams(): Promise<Team[] | null> {
  const res = await fetch("/api/admin/teams", { cache: "no-store" });
  if (res.status === 401) return null;
  return (await res.json()).teams;
}

export default function AdminFinalists() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "paid" | "pending">("all");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(
    () =>
      fetchTeams().then((list) => {
        if (list) setTeams(list);
        setAuthed(!!list);
      }),
    [],
  );

  useEffect(() => {
    let alive = true;
    fetchTeams().then((list) => {
      if (!alive) return;
      if (list) setTeams(list);
      setAuthed(!!list);
    });
    return () => { alive = false; };
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (!res.ok) return setMsg("Wrong password");
    setMsg("");
    load();
  }

  async function mail(body: Record<string, unknown>) {
    const res = await fetch("/api/admin/mail", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Mail failed");
    return data;
  }

  async function sendAllShortlist() {
    const pending = teams.filter((t) => !t.id_mail_sent_at).length;
    if (!confirm(`Send the "shortlisted + Team ID" mail to ${pending} teams that haven't got it yet?`)) return;
    setBusy(true);
    let sent = 0;
    try {
      for (;;) {
        const r = await mail({ kind: "shortlist", all: true });
        sent += r.sent;
        setMsg(`Sent ${sent} · ${r.remaining} remaining${r.failed.length ? ` · failed: ${r.failed.join(", ")}` : ""}`);
        if (r.remaining === 0 || r.sent === 0) break;
      }
    } catch (err) {
      setMsg((err as Error).message);
    }
    setBusy(false);
    load();
  }

  async function resend(t: Team, kind: "shortlist" | "paid") {
    setBusy(true);
    try {
      await mail({ kind, teamId: t.id });
      setMsg(`Mail sent to ${t.name}`);
    } catch (err) {
      setMsg((err as Error).message);
    }
    setBusy(false);
    load();
  }

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return teams.filter(
      (t) =>
        (filter === "all" || (filter === "paid" ? t.status === "paid" : t.status !== "paid")) &&
        (!s || [t.name, t.team_code, t.leader_email, t.members].some((v) => v.toLowerCase().includes(s))),
    );
  }, [teams, q, filter]);

  const stats = useMemo(() => {
    const paid = teams.filter((t) => t.status === "paid");
    return {
      teams: teams.length,
      paid: paid.length,
      pending: teams.length - paid.length,
      members: teams.reduce((n, t) => n + t.member_count, 0),
      collected: paid.reduce((n, t) => n + (t.amount_paid ?? 0), 0) / 100,
    };
  }, [teams]);

  if (authed === null) return <div className="fp-card"><p className="fp-muted">Loading…</p></div>;

  if (!authed)
    return (
      <div className="fp-card fp-wrap--sm" style={{ margin: "0 auto" }}>
        <h1 className="fp-card-title">Organiser login</h1>
        <form className="fp-form" onSubmit={login}>
          <input className="fp-input" type="password" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {msg && <div className="fp-error">{msg}</div>}
          <button className="hs-btn hs-btn--primary">Log in</button>
        </form>
      </div>
    );

  return (
    <div className="fp-card">
      <div className="fp-head">
        <h1 className="fp-card-title">Finalists</h1>
        <div className="fp-btn-row">
          <button className="hs-btn hs-btn--ghost hs-btn--sm" onClick={load} disabled={busy}>↻ Refresh</button>
          <a className="hs-btn hs-btn--ghost hs-btn--sm" href="/api/admin/teams?format=csv">⬇ Export CSV</a>
          <button className="hs-btn hs-btn--primary hs-btn--sm" onClick={sendAllShortlist} disabled={busy}>✉ Send Team ID mails</button>
        </div>
      </div>

      <div className="fp-stats">
        <div className="fp-stat"><b>{stats.teams}</b><span>Teams</span></div>
        <div className="fp-stat"><b>{stats.members}</b><span>Participants</span></div>
        <div className="fp-stat"><b style={{ color: "#7fe6a8" }}>{stats.paid}</b><span>Paid</span></div>
        <div className="fp-stat"><b style={{ color: "var(--red-soft)" }}>{stats.pending}</b><span>Pending</span></div>
        <div className="fp-stat"><b>₹{stats.collected.toLocaleString("en-IN")}</b><span>Collected</span></div>
      </div>

      {msg && <div className="fp-ok" style={{ marginTop: 16 }}>{msg}</div>}

      <div className="fp-btn-row" style={{ marginTop: 18 }}>
        <input className="fp-input" style={{ flex: 1, minWidth: 220, height: 44, fontSize: "0.9rem" }} placeholder="Search team, ID, email, member…" value={q} onChange={(e) => setQ(e.target.value)} />
        {(["all", "paid", "pending"] as const).map((f) => (
          <button key={f} className={`hs-btn hs-btn--sm ${filter === f ? "hs-btn--primary" : "hs-btn--ghost"}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="fp-table-wrap">
        <table className="fp-table">
          <thead>
            <tr><th>Team</th><th>Team ID</th><th>Members</th><th>Leader email</th><th>Status</th><th>Mails</th></tr>
          </thead>
          <tbody>
            {shown.map((t) => (
              <tr key={t.id}>
                <td><b>{t.name}</b></td>
                <td style={{ fontFamily: "var(--font-mono)" }}>{t.team_code}</td>
                <td>{t.member_count} · <span className="fp-muted" style={{ fontSize: "0.78rem" }}>{t.members}</span></td>
                <td>{t.leader_email}</td>
                <td>
                  <span className={`fp-badge ${t.status === "paid" ? "fp-badge--paid" : "fp-badge--short"}`}>
                    {t.status === "paid" ? `Paid ₹${((t.amount_paid ?? 0) / 100).toLocaleString("en-IN")}` : "Pending"}
                  </span>
                  {t.payment_id && <div className="fp-muted" style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>{t.payment_id}</div>}
                </td>
                <td>
                  <div className="fp-btn-row">
                    <button className="fp-link" disabled={busy} onClick={() => resend(t, "shortlist")}>
                      {t.id_mail_sent_at ? "Resend ID" : "Send ID"}
                    </button>
                    {t.status === "paid" && (
                      <button className="fp-link" disabled={busy} onClick={() => resend(t, "paid")}>Resend receipt</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
