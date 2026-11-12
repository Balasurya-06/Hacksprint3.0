"use client";

import { useEffect, useRef, useState } from "react";
import { chatbotOnly, chatbotText, faqs, type QA } from "@/data/faq";

/* ─────────────────────────────────────────────
   Sprinty — the HackSprint 3.0 assistant.
   Answers come from data/faq.ts (keyword matching,
   runs entirely in the browser, no API key needed).
   ───────────────────────────────────────────── */

/* Sprinty mascot: a chunky little robot — rounded charcoal head, glossy black
   visor with two white square eyes, a red side "ear" and a stubby body. */
function Mascot({ size = 44 }: { size?: number }) {
  return (
    <svg className="bot" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="sp-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b5b5b" />
          <stop offset="1" stopColor="#2a2a2a" />
        </linearGradient>
        <linearGradient id="sp-visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#262626" />
          <stop offset="1" stopColor="#070707" />
        </linearGradient>
        <linearGradient id="sp-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3c3c3c" />
          <stop offset="1" stopColor="#222" />
        </linearGradient>
      </defs>
      {/* ground shadow */}
      <ellipse cx="32" cy="60.5" rx="15" ry="2.4" fill="rgba(0,0,0,0.45)" />
      {/* stubby body + arms */}
      <rect x="23" y="42" width="18" height="17" rx="6" fill="url(#sp-body)" />
      <circle cx="21.5" cy="47" r="3" fill="#333" />
      <circle cx="42.5" cy="47" r="3" fill="#333" />
      {/* head */}
      <rect x="5" y="7" width="54" height="37" rx="15" fill="url(#sp-head)" />
      <path d="M12 10.5 C22 8 42 8 52 10.5" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.6" strokeLinecap="round" />
      {/* red side "ear" */}
      <rect x="1.5" y="19" width="7" height="13" rx="3" fill="#e5191f" />
      <rect x="2.6" y="20.5" width="2.2" height="10" rx="1.1" fill="rgba(255,255,255,0.3)" />
      {/* glossy visor */}
      <rect x="17" y="13" width="38" height="26" rx="11" fill="url(#sp-visor)" stroke="#111" strokeWidth="1" />
      <path d="M22 16.5 C30 14.5 44 14.5 51 16.8" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.6" strokeLinecap="round" />
      {/* eyes */}
      <g className="bot-eyes">
        <rect x="31" y="24" width="8" height="9" rx="2.2" fill="#fff" />
        <rect x="41" y="24" width="8" height="9" rx="2.2" fill="#fff" />
      </g>
    </svg>
  );
}

type Message = { from: "bot" | "user"; text: string; links?: QA["links"] };

const knowledge: QA[] = [...faqs, ...chatbotOnly];

const STOP = new Set([
  "a", "an", "the", "is", "are", "am", "i", "we", "you", "it", "to", "of", "in", "on", "for", "and", "or", "do", "does",
  "can", "my", "our", "me", "be", "will", "there", "this", "that", "what", "how", "any", "please", "pls", "plz", "tell", "about",
]);

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function findAnswer(input: string): QA | null {
  const text = ` ${normalize(input)} `;
  const words = new Set(text.split(" ").filter((w) => w && !STOP.has(w)));

  let best: QA | null = null;
  let bestScore = 0;

  for (const item of knowledge) {
    let score = 0;
    for (const k of item.keywords) {
      const key = normalize(k);
      if (!key) continue;
      if (key.includes(" ")) {
        if (text.includes(` ${key} `) || text.includes(key)) score += 3;
      } else if (words.has(key)) {
        score += 2;
      } else if (key.length > 4 && [...words].some((w) => w.startsWith(key) || (key.startsWith(w) && w.length > 3))) {
        score += 1;
      }
    }
    for (const w of normalize(item.q).split(" ")) {
      if (w && !STOP.has(w) && words.has(w)) score += 0.5;
    }
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  return bestScore >= 1.5 ? best : null;
}

const GREETING = /^(hi|hii+|hello|hey|hai|helo|howdy|good (morning|afternoon|evening)|vanakkam|namaste)\b/;
const THANKS = /\b(thanks|thank you|thx|tq|ty|ok thanks|great|cool|super)\b/;

function reply(input: string): Message {
  const n = normalize(input);
  const nameMatch = input.match(/\b(?:i['’]?m|i am|my name is|call me)\s+([a-z][a-z'-]{1,24})\b/i);
  if (nameMatch) {
    const name = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1).toLowerCase();
    return { from: "bot", text: `Hi ${name}! 👋 I’m Sprinty, your HackSprint 3.0 guide. Ask me about registration, tracks, the 5–6 February 2027 finale, teams, judging, travel, or anything else about the hackathon.` };
  }
  if (GREETING.test(n) && n.split(" ").length <= 3) return { from: "bot", text: chatbotText.greeting };
  if (THANKS.test(n) && n.split(" ").length <= 4) return { from: "bot", text: "You're welcome! All the best for HackSprint 3.0 🚀" };
  const hit = findAnswer(input);
  if (hit) return { from: "bot", text: hit.a, links: hit.links };
  return {
    from: "bot",
    text: chatbotText.fallback,
    links: [{ label: "Join WhatsApp", href: "https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K" }],
  };
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: chatbotText.greeting }]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* A link with ?chat=1 (e.g. shared on WhatsApp) opens Sprinty straight away. */
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("chat") === "1") {
      const id = window.setTimeout(() => setOpen(true), 400);
      return () => window.clearTimeout(id);
    }
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { from: "user", text: q }]);
    setDraft("");
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, reply(q)]);
      setTyping(false);
    }, 550);
  };

  return (
    <div className={`sprinty ${open ? "is-open" : ""}`}>
      {open && (
        <div className="sprinty-panel" role="dialog" aria-label={`${chatbotText.name}, the HackSprint assistant`}>
          <div className="sprinty-head">
            <div className="sprinty-avatar">
              <Mascot size={40} />
            </div>
            <div>
              <strong>{chatbotText.name}</strong>
              <span>
                <i aria-hidden="true" /> HackSprint 3.0 assistant · online
              </span>
            </div>
            <button type="button" className="sprinty-close" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>

          <div className="sprinty-body" ref={listRef} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`sprinty-msg sprinty-msg--${m.from}`}>
                <p>{m.text}</p>
                {m.links && (
                  <div className="sprinty-links">
                    {m.links.map((l) => (
                      <a key={l.href} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="sprinty-msg sprinty-msg--bot sprinty-typing" aria-label={`${chatbotText.name} is typing`}>
                <i />
                <i />
                <i />
              </div>
            )}
          </div>

          <div className="sprinty-chips">
            {chatbotText.suggestions.map((s) => (
              <button key={s} type="button" onClick={() => ask(s)}>
                {s}
              </button>
            ))}
          </div>

          <form
            className="sprinty-input"
            onSubmit={(e) => {
              e.preventDefault();
              ask(draft);
            }}
          >
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Ask ${chatbotText.name} anything…`}
              aria-label="Type your question"
              maxLength={200}
            />
            <button type="submit" aria-label="Send" disabled={!draft.trim() || typing}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="sprinty-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : `Ask ${chatbotText.name}, the HackSprint assistant`}
        aria-expanded={open}
      >
        {open ? (
          <span className="sprinty-fab-x">✕</span>
        ) : (
          <span className="sprinty-fab-bot">
            <Mascot size={42} />
          </span>
        )}
      </button>
    </div>
  );
}
