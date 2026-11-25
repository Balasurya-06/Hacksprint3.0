"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { MEAL_TOKENS } from "@/lib/finalist/event";

/* Venue scanner for organisers/volunteers (needs the admin password).
   Mode "checkin": scan → see the person → look at their pass, college ID and Aadhaar → Confirm check-in.
   Mode "<token>": scan → the food/snack token is used once (big green SERVE / red ALREADY USED).
   No ID numbers are typed or stored: verification is by sight only. */

type Person = {
  memberId: number;
  name: string;
  isLeader: boolean;
  passNumber: string;
  team: { name: string; code: string; paid: boolean; size: number };
  checkedInAt: string | null;
  tokens: { key: string; label: string; usedAt: string | null }[];
};
type ScanReply = { result: string; message: string; person?: Person; error?: string };

const time = (iso: string) => new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
const GOOD = ["checked-in", "redeemed"];
const WARN = ["ok", "already"];

export default function AdminScanner() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<string>("checkin");
  const [camOn, setCamOn] = useState(false);
  const [camError, setCamError] = useState("");
  const [manual, setManual] = useState("");
  const [busy, setBusy] = useState(false);
  const [reply, setReply] = useState<ScanReply | null>(null);
  const [lastScan, setLastScan] = useState("");
  const [checks, setChecks] = useState({ pass: false, college: false, aadhaar: false });
  const [count, setCount] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const pausedRef = useRef(false);
  const lastRef = useRef({ text: "", at: 0 });
  const modeRef = useRef(mode);
  useEffect(() => { modeRef.current = mode; }, [mode]);

  /* who am I */
  useEffect(() => {
    let alive = true;
    fetch("/api/admin/scan", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" })
      .then((r) => { if (alive) setAuthed(r.status !== 401); })
      .catch(() => alive && setAuthed(false));
    return () => { alive = false; };
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    setAuthed(res.ok);
    if (!res.ok) setCamError("Wrong password");
  }

  const send = useCallback(async (scan: string, action: string, token?: string) => {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scan, action, token }),
      });
      const data = (await res.json().catch(() => ({}))) as ScanReply;
      if (res.status === 401) setAuthed(false);
      if (!res.ok && !data.result) data.result = "error";
      if (!data.message) data.message = data.error || "Something went wrong.";
      setReply(data);
      if (GOOD.includes(data.result)) setCount((c) => c + 1);
      if (GOOD.includes(data.result) || data.result === "already") navigator.vibrate?.(data.result === "already" ? [80, 60, 80] : 60);
      return data;
    } finally {
      setBusy(false);
    }
  }, []);

  /* a QR / typed pass came in */
  const handleScan = useCallback(
    async (text: string) => {
      pausedRef.current = true;
      setLastScan(text);
      setChecks({ pass: false, college: false, aadhaar: false });
      const m = modeRef.current;
      await send(text, m === "checkin" ? "lookup" : "redeem", m === "checkin" ? undefined : m);
    },
    [send],
  );

  /* camera loop */
  useEffect(() => {
    if (!camOn) return;
    let raf = 0;
    let stopped = false;
    (async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error("Camera needs HTTPS (or localhost). Use the live site on phones, or type the pass number below.");
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
        if (stopped) { stream.getTracks().forEach((t) => t.stop()); return; }
        streamRef.current = stream;
        const v = videoRef.current!;
        v.srcObject = stream;
        await v.play();
        canvasRef.current ??= document.createElement("canvas");
        const tick = () => {
          if (stopped) return;
          if (!pausedRef.current && v.readyState === v.HAVE_ENOUGH_DATA) {
            const c = canvasRef.current!;
            const w = Math.min(v.videoWidth, 640);
            const h = Math.round((v.videoHeight / v.videoWidth) * w);
            c.width = w;
            c.height = h;
            const ctx = c.getContext("2d", { willReadFrequently: true })!;
            ctx.drawImage(v, 0, 0, w, h);
            const code = jsQR(ctx.getImageData(0, 0, w, h).data, w, h, { inversionAttempts: "dontInvert" });
            const now = Date.now();
            if (code?.data && !(code.data === lastRef.current.text && now - lastRef.current.at < 4000)) {
              lastRef.current = { text: code.data, at: now };
              handleScan(code.data);
            }
          }
          raf = requestAnimationFrame(tick);
        };
        tick();
      } catch (err) {
        setCamError((err as Error).message || "Couldn't open the camera.");
        setCamOn(false);
      }
    })();
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [camOn, handleScan]);

  function next() {
    setReply(null);
    setLastScan("");
    setManual("");
    pausedRef.current = false;
  }

  if (authed === null) return <div className="fp-card"><p className="fp-muted">Loading…</p></div>;
  if (!authed)
    return (
      <div className="fp-card fp-wrap--sm" style={{ margin: "0 auto" }}>
        <h1 className="fp-card-title">Organiser login</h1>
        <form className="fp-form" onSubmit={login}>
          <input className="fp-input" type="password" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {camError && <div className="fp-error">{camError}</div>}
          <button className="hs-btn hs-btn--primary">Log in</button>
        </form>
      </div>
    );

  const p = reply?.person;
  const tone = !reply ? "" : GOOD.includes(reply.result) ? "fp-result--good" : WARN.includes(reply.result) ? "fp-result--warn" : "fp-result--bad";
  const modeLabel = mode === "checkin" ? "Registration check-in" : MEAL_TOKENS.find((t) => t.key === mode)?.label;
  const canConfirm = checks.pass && checks.college && checks.aadhaar;

  return (
    <div className="fp-wrap">
      <div className="fp-card">
        <div className="fp-head">
          <div>
            <h1 className="fp-card-title">Venue scanner</h1>
            <p className="fp-muted" style={{ margin: 0 }}>
              Mode: <b style={{ color: "var(--bone)" }}>{modeLabel}</b> · {count} done this session
            </p>
          </div>
          <a className="hs-btn hs-btn--ghost hs-btn--sm" href="/admin/finalists">← Finalists</a>
        </div>

        <label className="fp-label" htmlFor="scan-mode" style={{ marginTop: 18 }}>What are you scanning for?</label>
        <select id="scan-mode" className="fp-input" style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem" }} value={mode}
          onChange={(e) => { setMode(e.target.value); next(); }}>
          <option value="checkin">🎫 Registration check-in</option>
          {MEAL_TOKENS.map((t) => (
            <option key={t.key} value={t.key}>{t.kind === "food" ? "🍽" : "☕"} {t.label} ({t.time})</option>
          ))}
        </select>

        <div style={{ marginTop: 18 }}>
          {camOn ? (
            <div className="fp-scan-video"><video ref={videoRef} playsInline muted /></div>
          ) : (
            <button className="hs-btn hs-btn--primary hs-btn--lg" style={{ width: "100%", justifyContent: "center" }}
              onClick={() => { setCamError(""); pausedRef.current = false; setCamOn(true); }}>
              📷 Start camera
            </button>
          )}
          {camOn && (
            <div className="fp-btn-row" style={{ justifyContent: "center", marginTop: 10 }}>
              <button className="fp-link" onClick={() => setCamOn(false)}>Stop camera</button>
            </div>
          )}
          {camError && <div className="fp-error" style={{ marginTop: 12 }}>{camError}</div>}
        </div>

        <form className="fp-btn-row" style={{ marginTop: 16 }} onSubmit={(e) => { e.preventDefault(); if (manual.trim()) handleScan(manual.trim()); }}>
          <input className="fp-input" style={{ flex: 1, minWidth: 200, height: 46, fontSize: "0.95rem" }} placeholder="Or type pass no. e.g. HS3-0042"
            value={manual} onChange={(e) => setManual(e.target.value)} />
          <button className="hs-btn hs-btn--ghost hs-btn--sm" disabled={busy}>Look up</button>
        </form>

        {busy && !reply && <p className="fp-muted" style={{ marginTop: 16 }}>Checking…</p>}

        {reply && (
          <div className={`fp-result ${tone}`}>
            <p className="fp-result-msg">{reply.message}</p>

            {p && (
              <>
                <h2 className="fp-team-name" style={{ fontSize: "clamp(1.8rem, 6vw, 2.8rem)", margin: "8px 0 4px" }}>{p.name}</h2>
                <p className="fp-code" style={{ margin: 0 }}>
                  {p.isLeader ? "LEADER · " : ""}TEAM {p.team.name.toUpperCase()} · {p.team.code} · {p.passNumber}
                </p>
                <p className="fp-muted" style={{ margin: "6px 0 0", fontSize: "0.85rem" }}>
                  {p.team.paid ? "✓ Team paid" : "✕ Team NOT paid"} · {p.checkedInAt ? `✓ Checked in ${time(p.checkedInAt)}` : "Not checked in yet"}
                </p>

                {mode === "checkin" && p.team.paid && !p.checkedInAt && (
                  <>
                    <p className="fp-label" style={{ marginTop: 18 }}>Verify by sight. Don&apos;t write down any ID numbers.</p>
                    <ul className="fp-verify-list">
                      <li><label><input type="checkbox" checked={checks.pass} onChange={(e) => setChecks((c) => ({ ...c, pass: e.target.checked }))} /> Entry pass shows <b>{p.name}</b></label></li>
                      <li><label><input type="checkbox" checked={checks.college} onChange={(e) => setChecks((c) => ({ ...c, college: e.target.checked }))} /> College ID card seen: name &amp; photo match the person</label></li>
                      <li><label><input type="checkbox" checked={checks.aadhaar} onChange={(e) => setChecks((c) => ({ ...c, aadhaar: e.target.checked }))} /> Aadhaar card seen: name &amp; photo match the person</label></li>
                    </ul>
                    <div className="fp-btn-row">
                      <button className="hs-btn hs-btn--primary" disabled={!canConfirm || busy} onClick={() => send(lastScan, "checkin")}>✓ Confirm check-in</button>
                      <button className="hs-btn hs-btn--ghost" onClick={next}>Cancel</button>
                    </div>
                  </>
                )}

                {mode === "checkin" && p.checkedInAt && (
                  <div className="fp-btn-row" style={{ marginTop: 14 }}>
                    <button className="fp-link" disabled={busy}
                      onClick={() => confirm(`Undo check-in for ${p.name}?`) && send(lastScan, "undo-checkin")}>Undo check-in</button>
                  </div>
                )}

                {mode !== "checkin" && (
                  <ul className="fp-tokens" style={{ marginTop: 14 }}>
                    {p.tokens.map((t) => (
                      <li key={t.key} className={t.usedAt ? "is-used" : ""} style={t.key === mode ? { borderColor: "var(--red)" } : undefined}>
                        <span>{t.label}</span>
                        <span className="fp-muted" style={{ fontSize: "0.74rem" }}>{t.usedAt ? `used ${time(t.usedAt)}` : "available"}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {!(mode === "checkin" && p?.team.paid && !p?.checkedInAt) && (
              <button className="hs-btn hs-btn--primary" style={{ marginTop: 16 }} onClick={next}>Scan next →</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
