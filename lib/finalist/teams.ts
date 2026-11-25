import { randomInt } from "node:crypto";
import { store, type TeamRow } from "./db";

/* Shared logic for adding finalist teams (admin CSV upload + manual add). */

export const MIN_MEMBERS = 2;
export const MAX_MEMBERS = 5;

export type NewMember = { name: string; email: string | null; isLeader: boolean };
export type NewTeam = { name: string; members: NewMember[] };

const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I confusion
const suffix = () => Array.from({ length: 4 }, () => ALPHA[randomInt(ALPHA.length)]).join("");
const slug = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12) || "TEAM";
export const makeTeamCode = (name: string) => `${slug(name)}.${suffix()}`;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Clean up + validate a team. Returns a list of problems (empty = OK). */
export function validateTeam(t: NewTeam): string[] {
  const p: string[] = [];
  t.name = t.name.trim();
  t.members = t.members
    .map((m) => ({ name: m.name.trim(), email: m.email?.trim().toLowerCase() || null, isLeader: !!m.isLeader }))
    .filter((m) => m.name);
  if (!t.name) p.push("Team name is required");
  if (t.name.length > 80) p.push("Team name is too long");
  if (t.members.length < MIN_MEMBERS || t.members.length > MAX_MEMBERS)
    p.push(`${t.members.length} members (needs ${MIN_MEMBERS}–${MAX_MEMBERS})`);
  if (t.members.length && !t.members.some((m) => m.isLeader)) t.members[0].isLeader = true;
  if (t.members.filter((m) => m.isLeader).length > 1) p.push("More than one leader");
  const missing = t.members.filter((m) => !m.email).map((m) => m.name);
  if (missing.length) p.push(`Email missing for: ${missing.join(", ")} (every member logs in with their email)`);
  for (const m of t.members) if (m.email && !EMAIL.test(m.email)) p.push(`Invalid email: ${m.email}`);
  const emails = t.members.map((m) => m.email).filter(Boolean);
  if (new Set(emails).size !== emails.length) p.push("The same email is used twice in this team");
  return p;
}

/** Creates a team with a fresh unique Team ID. Returns null if a team with that name exists. */
export async function createTeam(t: NewTeam): Promise<TeamRow | null> {
  const db = store();
  if (await db.getTeamByName(t.name)) return null;
  const leader = t.members.find((m) => m.isLeader)!;
  for (let i = 0; i < 10; i++) {
    const code = makeTeamCode(t.name);
    const team = await db.createTeam(code, t.name, leader.email!, t.members);
    if (team) return team;
  }
  throw new Error(`Couldn't generate a unique Team ID for ${t.name}`);
}

/* ── CSV: one row per member: team_name, member_name, member_email, is_leader ── */

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let q = false;
  text = text.replace(/^﻿/, "");
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') q = false;
      else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim()));
}

/** Groups CSV rows into teams. Throws a readable error if required columns are missing. */
export function teamsFromCsv(text: string): NewTeam[] {
  const rows = parseCsv(text);
  if (rows.length < 2) throw new Error("The CSV is empty.");
  const head = rows.shift()!.map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
  const find = (...names: string[]) => head.findIndex((h) => names.includes(h));
  const cTeam = find("team_name", "team");
  const cName = find("member_name", "name", "participant_name");
  const cEmail = find("member_email", "email", "participant_email");
  const cLeader = find("is_leader", "leader", "role");
  if (cTeam < 0 || cName < 0 || cEmail < 0) {
    throw new Error(`CSV needs columns team_name, member_name, member_email (found: ${head.join(", ")})`);
  }
  const map = new Map<string, NewTeam>();
  for (const r of rows) {
    const team = r[cTeam]?.trim();
    if (!team) continue;
    const key = team.toLowerCase();
    if (!map.has(key)) map.set(key, { name: team, members: [] });
    map.get(key)!.members.push({
      name: r[cName] ?? "",
      email: r[cEmail] ?? null,
      isLeader: cLeader >= 0 && /^(y|yes|true|1|leader|team leader)$/i.test(r[cLeader]?.trim() ?? ""),
    });
  }
  return [...map.values()];
}
