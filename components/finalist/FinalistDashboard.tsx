"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EntryPass, { downloadPass, type MemberPass } from "./EntryPass";
import Schedule from "./Schedule";
import { EVENT, MEAL_TOKENS, MUST_BRING, PROJECT_BRING } from "@/lib/finalist/event";

type Me = {
  team: { code: string; name: string; status: "shortlisted" | "paid"; paidAt: string | null; paymentId: string | null; amountPaid: number | null };
  members: {
    name: string;
    isLeader: boolean;
    isYou?: boolean;
    checkedInAt: string | null;
    pass: { passNumber: string; passToken: string; tokens: { key: string; usedAt: string | null }[] } | null;
  }[];
  you: string | null;
  feePerMember: number;
  amountDue: number;
};

type RazorpayResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayInstance = { open: () => void; on: (ev: string, cb: (r: { error?: { description?: string } }) => void) => void };
declare global {
  interface Window { Razorpay?: new (opts: Record<string, unknown>) => RazorpayInstance }
}


async function fetchMe(): Promise<Me | null> {
  const res = await fetch("/api/finalist/me", { cache: "no-store" });
  if (res.status === 401) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Server error (${res.status})`);
  return data as Me;
}

function loadCheckout() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function FinalistDashboard() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState(0);

  const load = useCallback(
    () =>
      fetchMe().then((data) => {
        if (!data) {
          router.replace("/finalist");
          return null;
        }
        setMe(data);
        setLoading(false);
        return data;
      }),
    [router],
  );

  useEffect(() => {
    let alive = true;
    fetchMe().then(
      (data) => {
        if (!alive) return;
        if (!data) return router.replace("/finalist");
        setMe(data);
        setLoading(false);
      },
      (err: Error) => {
        if (!alive) return;
        setError(err.message);
        setLoading(false);
      },
    );
    return () => { alive = false; };
  }, [router]);

  /* After checkout, the webhook may land a moment later than the browser: poll briefly. */
  async function waitForPaid() {
    for (let i = 0; i < 10; i++) {
      const data = await load().catch(() => null);
      if (data?.team.status === "paid") return true;
      await new Promise((r) => setTimeout(r, 2000));
    }
    return false;
  }

  async function pay() {
    setError("");
    setNotice("");
    setPaying(true);
    try {
      const res = await fetch("/api/payment/create-order", { method: "POST" });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error || "Couldn't start the payment.");

      if (order.demo) {
        /* Local dev without Razorpay keys: simulate a successful payment. */
        if (!confirm(`DEMO MODE (no Razorpay keys)\n\nSimulate a successful payment of ₹${(order.amount / 100).toLocaleString("en-IN")} for ${order.teamName}?`)) {
          setPaying(false);
          return;
        }
        setNotice("Demo payment, confirming…");
        const v = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ demo: true, razorpay_order_id: order.orderId }),
        });
        if (!v.ok) throw new Error((await v.json().catch(() => ({}))).error || "Demo payment failed");
        await load();
        setNotice("Payment successful (demo)! The confirmation mail is printed in the dev terminal.");
        setPaying(false);
        return;
      }

      if (!(await loadCheckout()) || !window.Razorpay) throw new Error("Couldn't load the payment window. Check your connection.");

      const rzp = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "HackSprint 3.0",
        description: `Grand Finale fee · ${order.teamName} (${order.teamCode})`,
        prefill: order.prefill,
        notes: { team_code: order.teamCode },
        theme: { color: "#e5191f" },
        modal: { ondismiss: () => setPaying(false) },
        handler: async (r: RazorpayResponse) => {
          setNotice("Payment received, confirming…");
          await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(r),
          }).catch(() => undefined);
          const ok = await waitForPaid();
          setNotice(ok ? "Payment successful! A confirmation mail is on its way." : "");
          if (!ok) setError(`We're still confirming your payment (ID ${r.razorpay_payment_id}). Refresh in a minute. Don't pay again.`);
          setPaying(false);
        },
      });
      rzp.on("payment.failed", (r) => {
        setError(r.error?.description || "Payment failed. No money was taken, or it will be refunded automatically.");
        setPaying(false);
      });
      rzp.open();
    } catch (err) {
      setError((err as Error).message);
      setPaying(false);
    }
  }

  async function logout() {
    await fetch("/api/finalist/logout", { method: "POST" });
    router.replace("/finalist");
  }

  if (loading) return <div className="fp-card"><p className="fp-muted">Loading your dashboard…</p></div>;
  if (!me) return <div className="fp-error">{error || "Couldn't load your dashboard. Please refresh."}</div>;

  const paid = me.team.status === "paid";
  const checkedIn = me.members.filter((m) => m.checkedInAt).length;
  const siteUrl = window.location.origin;
  const passOf = (i: number): MemberPass | null => {
    const m = me.members[i];
    return m?.pass
      ? { name: m.name, isLeader: m.isLeader, teamName: me.team.name, teamCode: me.team.code, passNumber: m.pass.passNumber, token: m.pass.passToken, siteUrl }
      : null;
  };
  const sel = Math.min(selected, me.members.length - 1);
  const selPass = passOf(sel);

  async function downloadAll() {
    for (let i = 0; i < me!.members.length; i++) {
      const p = passOf(i);
      if (p) await downloadPass(p);
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  const steps = [
    { label: "Shortlisted", done: true },
    { label: "Payment", done: paid },
    { label: "Entry passes", done: paid },
    { label: "Check-in at venue", done: me.members.length > 0 && checkedIn === me.members.length },
  ];
  const current = steps.findIndex((x) => !x.done);

  return (
    <>
      {/* ── Header ── */}
      <div className="fp-card">
        <div className="fp-head">
          <div>
            <span className={`fp-badge ${paid ? "fp-badge--paid" : "fp-badge--short"}`}>
              {paid ? "✓ Confirmed · Paid" : "★ Shortlisted for the Grand Finale"}
            </span>
            <h1 className="fp-team-name">{me.team.name}</h1>
            <p className="fp-code">TEAM ID · {me.team.code}</p>
            {me.you && <p className="fp-muted" style={{ margin: "6px 0 0" }}>Logged in as <b style={{ color: "var(--bone)" }}>{me.you}</b></p>}
          </div>
          <button className="hs-btn hs-btn--ghost hs-btn--sm" onClick={logout}>Log out</button>
        </div>

        <ol className="fp-steps">
          {steps.map((s, i) => (
            <li key={s.label} className={s.done ? "is-done" : current === i ? "is-current" : ""}>
              <span className="fp-step-dot">{s.done ? "✓" : i + 1}</span>
              <span>{s.label}</span>
            </li>
          ))}
        </ol>

        {!paid && (
          <p className="fp-muted" style={{ marginTop: 14, marginBottom: 0 }}>
            Congratulations! Your team made it to the {EVENT.name} ({EVENT.dates}, {EVENT.venueShort}). Complete the
            payment to confirm your spot and unlock an entry pass for every member.
          </p>
        )}
      </div>

      {notice && <div className="fp-ok" style={{ marginTop: 18 }}>{notice}</div>}
      {error && <div className="fp-error" style={{ marginTop: 18 }}>{error}</div>}

      {/* ── Members + payment ── */}
      <div className="fp-grid">
        <div className="fp-card">
          <h2 className="fp-card-title">Team members</h2>
          <p className="fp-muted" style={{ margin: 0 }}>
            {me.members.length} members{paid && checkedIn > 0 ? ` · ${checkedIn} checked in` : ""}
          </p>
          <ul className="fp-members">
            {me.members.map((m, i) => (
              <li key={i}>
                <span className="fp-avatar">{m.name.trim().charAt(0).toUpperCase()}</span>
                <span>
                  {m.name}
                  {m.isYou && <span className="fp-muted" style={{ fontSize: "0.78rem" }}> (you)</span>}
                  {m.checkedInAt && <span style={{ color: "#7fe6a8", fontSize: "0.74rem", marginLeft: 8 }}>✓ checked in</span>}
                </span>
                {m.isLeader && <span className="fp-tag">LEADER</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="fp-card">
          <h2 className="fp-card-title">{paid ? "Payment" : "Finale fee"}</h2>
          {paid ? (
            <>
              <div className="fp-bill">
                <div><span>Amount paid</span><span>₹{(me.team.amountPaid ?? me.amountDue).toLocaleString("en-IN")}</span></div>
                <div><span>Payment ID</span><span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>{me.team.paymentId}</span></div>
                <div><span>Paid on</span><span>{me.team.paidAt ? new Date(me.team.paidAt).toLocaleString("en-IN") : "—"}</span></div>
              </div>
              <span className="fp-badge fp-badge--paid">✓ Payment successful</span>
            </>
          ) : (
            <>
              <div className="fp-bill">
                <div><span>Fee per member</span><span>₹{me.feePerMember}</span></div>
                <div><span>Members</span><span>× {me.members.length}</span></div>
                <div className="fp-total"><span>Total</span><span>₹{me.amountDue.toLocaleString("en-IN")}</span></div>
              </div>
              <button className="hs-btn hs-btn--primary hs-btn--lg" style={{ width: "100%", justifyContent: "center" }} onClick={pay} disabled={paying}>
                {paying ? "Processing…" : `Pay ₹${me.amountDue.toLocaleString("en-IN")} →`}
              </button>
              <p className="fp-muted" style={{ fontSize: "0.8rem", marginTop: 12 }}>
                Secure payment by Razorpay · UPI, cards, netbanking. One payment covers the whole team.
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Entry passes (one per member) ── */}
      <div className="fp-card" style={{ marginTop: 18 }}>
        <div className="fp-head">
          <div>
            <h2 className="fp-card-title">Entry passes {paid ? "" : "🔒"}</h2>
            <p className="fp-muted" style={{ margin: 0 }}>
              {paid
                ? "Every member has a personal pass. The same QR is used for check-in and for food & snack tokens."
                : "Each member's entry pass unlocks here as soon as the payment is complete."}
            </p>
          </div>
          {paid && <button className="hs-btn hs-btn--primary hs-btn--sm" onClick={downloadAll}>⬇ Download all passes</button>}
        </div>

        {paid && selPass && (
          <>
            <div className="fp-pill-tabs">
              {me.members.map((m, i) => (
                <button key={i} className={i === sel ? "is-active" : ""} onClick={() => setSelected(i)}>
                  {m.name}{m.isYou ? " (you)" : ""}
                </button>
              ))}
            </div>
            <div className="fp-pass">
              <EntryPass data={selPass} />
              <div>
                <h3 className="fp-card-title" style={{ fontSize: "1.3rem" }}>{me.members[sel].name}</h3>
                <p className="fp-code" style={{ marginTop: 0 }}>PASS NO. {selPass.passNumber}</p>
                <div className="fp-btn-row" style={{ margin: "12px 0 20px" }}>
                  <button className="hs-btn hs-btn--primary hs-btn--sm" onClick={() => downloadPass(selPass)}>⬇ Download this pass</button>
                </div>
                <span className="fp-label">Food & snack tokens</span>
                <ul className="fp-tokens">
                  {MEAL_TOKENS.map((t) => {
                    const used = me.members[sel].pass?.tokens.find((x) => x.key === t.key)?.usedAt;
                    return (
                      <li key={t.key} className={used ? "is-used" : ""}>
                        <span>{t.kind === "food" ? "🍽" : "☕"} {t.label}</span>
                        <span className="fp-muted" style={{ fontSize: "0.74rem" }}>
                          {used ? `Used ${new Date(used).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}` : t.time}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <p className="fp-muted" style={{ fontSize: "0.8rem" }}>
                  Show the pass QR at the food counter. Each token can be used once, only by the pass holder.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── What to bring ── */}
      <div className="fp-grid">
        <div className="fp-card">
          <h2 className="fp-card-title">Must bring for registration</h2>
          <p className="fp-muted" style={{ marginTop: 0 }}>Every member must show all three at the registration desk. No entry without them.</p>
          <ul className="fp-checklist">
            {MUST_BRING.map((b) => (
              <li key={b.title}><b>{b.title}</b><span className="fp-muted">{b.note}</span></li>
            ))}
          </ul>
        </div>
        <div className="fp-card">
          <h2 className="fp-card-title">Bring for your project</h2>
          <p className="fp-muted" style={{ marginTop: 0 }}>Bring all the belongings you want to use for your project. Only power and Wi-Fi are provided.</p>
          <ul className="fp-checklist fp-checklist--plain">
            {PROJECT_BRING.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      </div>

      {/* ── Schedule ── */}
      <div className="fp-card" style={{ marginTop: 18 }}>
        <div className="fp-head">
          <h2 className="fp-card-title">Finale schedule</h2>
          {EVENT.scheduleTentative && <span className="fp-badge fp-badge--bad">Tentative · final timings will be shared</span>}
        </div>
        <Schedule />
      </div>

      <div className="fp-card" style={{ marginTop: 18 }}>
        <h2 className="fp-card-title">Venue & help</h2>
        <p className="fp-muted" style={{ margin: 0 }}>
          {EVENT.venue} · {EVENT.dates} ·{" "}
          <a className="fp-link" href={EVENT.mapUrl} target="_blank" rel="noreferrer">Open in Maps</a>
          <br />
          Questions? Call <a className="fp-link" href={`tel:${EVENT.contactPhone.replace(/\s/g, "")}`}>{EVENT.contactPhone}</a> or mail{" "}
          <a className="fp-link" href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a>
        </p>
      </div>
    </>
  );
}
