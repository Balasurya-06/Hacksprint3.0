import { SCHEDULE } from "@/lib/finalist/event";

/** Finale schedule (also shown on the public QR page). */
export default function Schedule() {
  return (
    <div className="fp-schedule">
      {SCHEDULE.map((d) => (
        <div key={d.day}>
          <p className="fp-label" style={{ color: "var(--red-soft)" }}>{d.day} · {d.date}</p>
          <ul>
            {d.items.map((it) => (
              <li key={it.time + it.title}>
                <span className="fp-time">{it.time}</span>
                <span>
                  <b>{it.title}</b>
                  {it.token && <span className="fp-token-tag">{it.token.kind === "food" ? "🍽 food token" : "☕ snack token"}</span>}
                  {it.note && <span className="fp-muted" style={{ display: "block", fontSize: "0.8rem" }}>{it.note}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
