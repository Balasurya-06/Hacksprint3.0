import postgres from "postgres";
import { requireEnv } from "./config";

/* One pooled client per server instance (survives hot reload in dev). */
const globalForDb = globalThis as unknown as { __hsSql?: postgres.Sql };

export function db() {
  if (!globalForDb.__hsSql) {
    globalForDb.__hsSql = postgres(requireEnv("DATABASE_URL"), {
      max: 5,
      ssl: process.env.DATABASE_SSL === "false" ? false : "require",
      prepare: false, // needed for Supabase/Neon poolers (pgbouncer transaction mode)
    });
  }
  return globalForDb.__hsSql;
}

export type TeamRow = {
  id: number;
  team_code: string;
  name: string;
  leader_email: string;
  status: "shortlisted" | "paid";
  paid_at: Date | null;
  payment_id: string | null;
  amount_paid: number | null;
  id_mail_sent_at: Date | null;
  paid_mail_sent_at: Date | null;
};

export type MemberRow = { id: number; team_id: number; name: string; email: string | null; is_leader: boolean };

export async function getTeamByCode(code: string) {
  const rows = await db()<TeamRow[]>`select * from teams where upper(team_code) = upper(${code.trim()}) limit 1`;
  return rows[0] ?? null;
}

export async function getTeamById(id: number) {
  const rows = await db()<TeamRow[]>`select * from teams where id = ${id} limit 1`;
  return rows[0] ?? null;
}

export async function getMembers(teamId: number) {
  return db()<MemberRow[]>`select * from members where team_id = ${teamId} order by is_leader desc, id asc`;
}
