"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";

/* The only parts of the home page that need the browser. Everything else
   in app/page.tsx renders on the server, so phones don't have to download
   and hydrate the whole landing page before it responds. */

/* Registration window — opens Nov 8, closes end of day Dec 28, 2026 (IST). */
const registrationOpens = new Date("2026-11-08T09:00:00+05:30").getTime();
const registrationCloses = new Date("2026-12-28T23:59:59+05:30").getTime();

/* One odometer wheel: a 0–9 strip that rolls to the current digit. */
function RollDigit({ d }: { d: number }) {
  return (
    <span className="cd-roll" aria-hidden="true">
      <span className="cd-strip" style={{ transform: `translateY(${-d * 10}%)` }}>
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n}>{n}</span>
        ))}
      </span>
    </span>
  );
}

const CD_SEGMENTS = 30;
const windowDays = Math.ceil((registrationCloses - registrationOpens) / 86400000);

export function HeroCountdown() {
  const [now, setNow] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  /* Tick once a second, but only while the countdown is on screen — no
     point re-rendering it while someone is reading the FAQ on a phone. */
  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    let id = 0;
    const run = (on: boolean) => {
      window.clearInterval(id);
      id = 0;
      if (on) {
        update();
        id = window.setInterval(update, 1000);
      }
    };
    run(true);
    const el = boxRef.current;
    const io = el ? new IntersectionObserver(([entry]) => run(entry.isIntersecting)) : null;
    if (el && io) io.observe(el);
    return () => {
      io?.disconnect();
      window.clearInterval(id);
    };
  }, []);

  const remaining = now === null ? null : Math.max(0, registrationCloses - now);
  const totalSeconds = remaining === null ? 0 : Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hrs = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const units = [
    { val: days, label: "DAYS", frac: days / windowDays },
    { val: hrs, label: "HRS", frac: hrs / 24 },
    { val: mins, label: "MINS", frac: mins / 60 },
    { val: secs, label: "SECS", frac: secs / 60, live: true },
  ];

  const progress =
    now === null
      ? 0
      : Math.min(100, Math.max(0, ((now - registrationOpens) / (registrationCloses - registrationOpens)) * 100));
  const litSegments = (progress / 100) * CD_SEGMENTS;
  const isClosed = remaining === 0;

  return (
    <div ref={boxRef} className={`cd${isClosed ? " is-closed" : ""}`} id="registration">
      <span className="cd-corner cd-corner--tl" aria-hidden="true" />
      <span className="cd-corner cd-corner--tr" aria-hidden="true" />
      <span className="cd-corner cd-corner--bl" aria-hidden="true" />
      <span className="cd-corner cd-corner--br" aria-hidden="true" />

      <div className="cd-head">
        <p className="cd-status">
          <i aria-hidden="true" className={isClosed ? "is-closed" : ""} />
          {isClosed ? "Registration closed" : "Registration closes in"}
        </p>
        <span className="cd-tag" aria-hidden="true">
          T-MINUS<b>_</b>
        </span>
      </div>

      <div className="cd-grid" role="timer" aria-label="Registration closing countdown">
        {remaining !== null && (
          <span className="sr-only">
            {days} days, {hrs} hours, {mins} minutes remaining
          </span>
        )}
        {units.map(({ val, label, frac, live }, i) => (
          <div className="cd-unit" key={label}>
            <div className={`cd-cell${live ? " cd-cell--live" : ""}`}>
              {live && remaining !== null && <span key={val} className="cd-flash" aria-hidden="true" />}
              <span className="cd-num" aria-hidden="true">
                {remaining === null ? (
                  <span className="cd-wait">--</span>
                ) : (
                  String(val)
                    .padStart(2, "0")
                    .split("")
                    .map((d, k, arr) => <RollDigit key={arr.length - k} d={Number(d)} />)
                )}
              </span>
              <span className="cd-label" aria-hidden="true">
                {label}
              </span>
              <span className="cd-fill" aria-hidden="true" style={{ transform: `scaleX(${remaining === null ? 0 : frac})` }} />
            </div>
            {i < units.length - 1 && (
              <span className="cd-sep" aria-hidden="true">
                <i />
                <i />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="cd-meta" aria-hidden="true">
        <span>NOV 8</span>
        <div className="cd-track">
          {Array.from({ length: CD_SEGMENTS }, (_, i) => (
            <span
              key={i}
              style={{ "--i": i } as CSSProperties}
              className={i < Math.floor(litSegments) ? "is-on" : i === Math.floor(litSegments) && !isClosed ? "is-now" : ""}
            />
          ))}
        </div>
        <span>DEC 28</span>
      </div>
      <p className="cd-foot">
        <b>{now === null ? "--" : progress.toFixed(1)}%</b> of the registration window elapsed · closes Dec 28, 2026
      </p>
    </div>
  );
}

/* Page-wide effects: Devfolio SDK + cursor spotlight on `.spot` cards. */
export function HomeEffects() {
  /* ── Load Devfolio SDK dynamically (per official Devfolio React documentation) ── */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  /* ── Cursor spotlight for any `.spot` card ── */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(".spot") as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
