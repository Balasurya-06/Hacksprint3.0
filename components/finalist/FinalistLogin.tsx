"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "team" | "code";

export default function FinalistLogin() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("team");
  const [teamCode, setTeamCode] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [teamName, setTeamName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function post(url: string, body: unknown) {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Something went wrong. Try again.");
    return data;
  }

  async function requestCode(e?: React.FormEvent) {
    e?.preventDefault();
    setBusy(true);
    setError("");
    setInfo("");
    try {
      const data = await post("/api/finalist/login", { teamCode: teamCode.trim() });
      setEmail(data.email);
      setTeamName(data.teamName);
      setStep("code");
      setInfo(
        data.devCode
          ? `Dev mode (no SMTP): mail not sent. Your code is ${data.devCode}`
          : `Code sent to ${data.email}`,
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await post("/api/finalist/verify-code", { teamCode: teamCode.trim(), code });
      router.push("/finalist/dashboard");
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  }

  return (
    <div className="fp-card">
      {step === "team" ? (
        <form className="fp-form" onSubmit={requestCode} style={{ marginTop: 0 }}>
          <div>
            <label className="fp-label" htmlFor="team-id">Team ID</label>
            <input
              id="team-id"
              className="fp-input"
              placeholder="e.g. VIGRON.K7Q2"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              value={teamCode}
              onChange={(e) => setTeamCode(e.target.value.toUpperCase())}
              required
            />
          </div>
          <p className="fp-muted" style={{ margin: 0 }}>
            The Team ID is in your shortlist mail. We&apos;ll send a 6-digit login code to your team leader&apos;s email.
          </p>
          {error && <div className="fp-error">{error}</div>}
          <button className="hs-btn hs-btn--primary hs-btn--lg" disabled={busy || !teamCode.trim()}>
            {busy ? "Sending code…" : "Send login code →"}
          </button>
        </form>
      ) : (
        <form className="fp-form" onSubmit={verify} style={{ marginTop: 0 }}>
          <div>
            <p className="fp-label">Team</p>
            <p style={{ margin: 0, fontWeight: 700 }}>
              {teamName} <span className="fp-code">· {teamCode}</span>
            </p>
          </div>
          <div>
            <label className="fp-label" htmlFor="otp">6-digit code sent to {email}</label>
            <input
              id="otp"
              className="fp-input fp-input--code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              autoFocus
              required
            />
          </div>
          {info && !error && <div className="fp-ok">{info}</div>}
          {error && <div className="fp-error">{error}</div>}
          <button className="hs-btn hs-btn--primary hs-btn--lg" disabled={busy || code.length !== 6}>
            {busy ? "Checking…" : "Log in →"}
          </button>
          <div className="fp-btn-row" style={{ justifyContent: "space-between" }}>
            <button type="button" className="fp-link" onClick={() => { setStep("team"); setCode(""); setError(""); setInfo(""); }}>
              ← Change Team ID
            </button>
            <button type="button" className="fp-link" disabled={busy} onClick={() => requestCode()}>
              Resend code
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
