/* ──────────────────────────────────────────────────────────────
   Grand Finale details shown on the participant dashboard, the entry
   pass and the QR page. EDIT THIS FILE to change the schedule, the
   food/snack tokens or the "what to bring" list. Shared by server and
   client code (no secrets here).
   ────────────────────────────────────────────────────────────── */

export const EVENT = {
  name: "HackSprint 3.0 · Grand Finale",
  venue: "KAHE (Karpagam Academy of Higher Education), Coimbatore",
  venueShort: "KAHE, Coimbatore",
  dates: "Feb 5–6, 2027",
  mapUrl: "https://maps.google.com/?q=Karpagam+Academy+of+Higher+Education+Coimbatore",
  contactPhone: "+91 95970 75831",
  contactEmail: "hacksprint.official@gmail.com",
  /** Set to false once the final timings are confirmed. */
  scheduleTentative: true,
};

export type MealKind = "food" | "snack";
export type ScheduleItem = {
  time: string;
  title: string;
  note?: string;
  /** If set, this slot is a food/snack token each member can redeem once. */
  token?: { key: string; label: string; kind: MealKind };
};
export type ScheduleDay = { day: string; date: string; items: ScheduleItem[] };

export const SCHEDULE: ScheduleDay[] = [
  {
    day: "Day 1",
    date: "Thu, Feb 5, 2027",
    items: [
      { time: "08:00 AM", title: "Registration & check-in", note: "Show your entry pass, college ID card and Aadhaar card" },
      { time: "09:30 AM", title: "Opening ceremony" },
      { time: "10:00 AM", title: "Hacking begins" },
      { time: "01:00 PM", title: "Lunch", token: { key: "d1-lunch", label: "Day 1 Lunch", kind: "food" } },
      { time: "04:30 PM", title: "Evening snacks", token: { key: "d1-snacks", label: "Day 1 Snacks", kind: "snack" } },
      { time: "06:00 PM", title: "Review Round 1", note: "Mentors visit every team: idea & progress check" },
      { time: "08:30 PM", title: "Dinner", token: { key: "d1-dinner", label: "Day 1 Dinner", kind: "food" } },
      { time: "12:00 AM", title: "Midnight snacks", token: { key: "d1-midnight", label: "Midnight Snacks", kind: "snack" } },
    ],
  },
  {
    day: "Day 2",
    date: "Fri, Feb 6, 2027",
    items: [
      { time: "07:30 AM", title: "Breakfast", token: { key: "d2-breakfast", label: "Day 2 Breakfast", kind: "food" } },
      { time: "10:00 AM", title: "Review Round 2", note: "Working prototype check" },
      { time: "01:00 PM", title: "Lunch", token: { key: "d2-lunch", label: "Day 2 Lunch", kind: "food" } },
      { time: "04:00 PM", title: "Hacking ends · final submission" },
      { time: "04:30 PM", title: "Snacks", token: { key: "d2-snacks", label: "Day 2 Snacks", kind: "snack" } },
      { time: "05:00 PM", title: "Final Round: presentations to the jury" },
      { time: "08:00 PM", title: "Winner announcement & closing ceremony" },
    ],
  },
];

/** All food/snack tokens, in schedule order. */
export const MEAL_TOKENS = SCHEDULE.flatMap((d) => d.items.flatMap((i) => (i.token ? [{ ...i.token, time: `${d.day} · ${i.time}` }] : [])));
export const mealToken = (key: string) => MEAL_TOKENS.find((t) => t.key === key);

/** Shown on the dashboard. Verification items are checked by a volunteer by sight; nothing is recorded. */
export const MUST_BRING = [
  { title: "Entry pass", note: "One per person, on your phone or printed. Each member has their own QR." },
  { title: "College ID card", note: "Original card, to verify you are a student of your college." },
  { title: "Aadhaar card", note: "Original, for identity verification at check-in. The number is not recorded." },
];

export const PROJECT_BRING = [
  "Laptop and charger",
  "Every hardware component, kit, sensor or device your project needs",
  "Extension board / power strip (recommended)",
  "Any software licences, accounts or datasets you plan to use (set them up before you arrive)",
  "Personal items: water bottle, any medicines you need, a jacket for the night",
];

/** Short human-readable pass number (for manual lookup if the QR can't be scanned). */
export const passNumber = (memberId: number) => `HS3-${String(memberId).padStart(4, "0")}`;
export const parsePassNumber = (s: string) => {
  const m = /^HS3-?(\d{1,7})$/i.exec(s.trim());
  return m ? Number(m[1]) : null;
};
