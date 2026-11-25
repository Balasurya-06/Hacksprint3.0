#!/usr/bin/env node
/*
  Import shortlisted teams into the finalist portal database.

  Usage:
    node --env-file=.env.local scripts/import-teams.mjs data/finalists.csv [--dry-run]

  CSV: one row per MEMBER (header names are case-insensitive):
    team_name, member_name, member_email, is_leader
  - is_leader: yes/true/1 for the leader (if no one is marked, the first row of the team is the leader)
  - Rows with the same team_name are grouped into one team.
  - Re-running is safe: existing teams (same name) are skipped, never duplicated.

  Writes data/finalists-with-ids.csv with the generated Team IDs (e.g. VIGRON.K7Q2).
*/
import { readFileSync, writeFileSync } from "node:fs";
import { randomInt } from "node:crypto";
import { dirname, join } from "node:path";
import postgres from "postgres";

const [, , file, ...flags] = process.argv;
const dryRun = flags.includes("--dry-run");
if (!file) {
  console.error("Usage: node --env-file=.env.local scripts/import-teams.mjs <file.csv> [--dry-run]");
  process.exit(1);
}

/* tiny CSV parser (quotes, commas, newlines inside quotes) */
function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", q = false;
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

const rows = parseCsv(readFileSync(file, "utf8").replace(/^﻿/, ""));
const head = rows.shift().map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
const col = (name) => {
  const i = head.indexOf(name);
  if (i < 0) { console.error(`Missing column "${name}". Found: ${head.join(", ")}`); process.exit(1); }
  return i;
};
const [cTeam, cName, cEmail] = [col("team_name"), col("member_name"), col("member_email")];
const cLeader = head.indexOf("is_leader");

const teams = new Map();
for (const r of rows) {
  const team = r[cTeam]?.trim();
  const name = r[cName]?.trim();
  if (!team || !name) continue;
  if (!teams.has(team)) teams.set(team, []);
  teams.get(team).push({
    name,
    email: r[cEmail]?.trim().toLowerCase() || null,
    leader: cLeader >= 0 && /^(y|yes|true|1)$/i.test(r[cLeader]?.trim() ?? ""),
  });
}

const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I confusion
const suffix = () => Array.from({ length: 4 }, () => ALPHA[randomInt(ALPHA.length)]).join("");
const slug = (s) => s.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12) || "TEAM";

const problems = [];
for (const [team, members] of teams) {
  if (members.length < 2 || members.length > 5) problems.push(`${team}: ${members.length} members (expected 2–5)`);
  if (!members.some((m) => m.leader)) members[0].leader = true;
  if (members.filter((m) => m.leader).length > 1) problems.push(`${team}: more than one leader`);
  if (!members.find((m) => m.leader).email) problems.push(`${team}: leader has no email`);
}
console.log(`Parsed ${teams.size} teams, ${[...teams.values()].flat().length} members.`);
if (problems.length) {
  console.warn("⚠ Check these:\n  " + problems.join("\n  "));
  if (problems.some((p) => p.includes("leader has no email"))) { console.error("A leader email is required for login. Fix the CSV."); process.exit(1); }
}
if (dryRun) { console.log("Dry run: nothing written."); process.exit(0); }

const sql = postgres(process.env.DATABASE_URL, { ssl: process.env.DATABASE_SSL === "false" ? false : "require", prepare: false, max: 1 });
const out = [["team_code", "team_name", "leader_email", "members_count", "members"]];
let created = 0, skipped = 0;

try {
  for (const [team, members] of teams) {
    const leader = members.find((m) => m.leader);
    const [existing] = await sql`select team_code from teams where lower(name) = lower(${team})`;
    if (existing) {
      skipped++;
      out.push([existing.team_code, team, leader.email, members.length, members.map((m) => m.name).join("; ")]);
      continue;
    }
    await sql.begin(async (tx) => {
      let code, inserted;
      for (let tries = 0; !inserted && tries < 10; tries++) {
        code = `${slug(team)}.${suffix()}`;
        [inserted] = await tx`insert into teams (team_code, name, leader_email) values (${code}, ${team}, ${leader.email})
                              on conflict (team_code) do nothing returning id`;
      }
      if (!inserted) throw new Error(`Couldn't generate a unique code for ${team}`);
      for (const m of members) {
        await tx`insert into members (team_id, name, email, is_leader) values (${inserted.id}, ${m.name}, ${m.email}, ${m.leader})`;
      }
      out.push([code, team, leader.email, members.length, members.map((m) => m.name).join("; ")]);
    });
    created++;
  }
} finally {
  await sql.end();
}

const outFile = join(dirname(file), "finalists-with-ids.csv");
writeFileSync(outFile, out.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n"));
console.log(`✓ Created ${created} teams, skipped ${skipped} existing. Team IDs written to ${outFile}`);
