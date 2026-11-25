import postgres from "postgres";
import { requireEnv } from "./config";
import { memoryStore } from "./memory-store";

/* All data access for the finalist portal goes through `store()`.
   - DATABASE_URL set        → Postgres
   - not set, in `next dev`  → local JSON file store (.data/finalists-local.json), starts empty */

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
export type MemberRow = {
  id: number;
  team_id: number;
  name: string;
  email: string | null;
  is_leader: boolean;
  checked_in_at?: Date | string | null;
};
export type RedemptionRow = { member_id: number; token_key: string; redeemed_at: Date | string };
export type LoginCodeRow = { code_hash: string; expires_at: Date; attempts: number; sent_at: Date };
export type OrderRow = { team_id: number; amount: number; status: "created" | "paid" | "failed" };
export type AdminTeamRow = TeamRow & { member_count: number; members: string; member_list: MemberRow[] };

export interface Store {
  getTeamByCode(code: string): Promise<TeamRow | null>;
  getTeamById(id: number): Promise<TeamRow | null>;
  getMembers(teamId: number): Promise<MemberRow[]>;
  getTeamByName(name: string): Promise<TeamRow | null>;
  /** Inserts team + members. Returns null if the team code is already taken. */
  createTeam(code: string, name: string, leaderEmail: string, members: { name: string; email: string | null; isLeader: boolean }[]): Promise<TeamRow | null>;
  addMember(teamId: number, name: string, email: string | null): Promise<MemberRow>;
  getMember(memberId: number): Promise<MemberRow | null>;
  removeMember(memberId: number): Promise<void>;
  deleteTeam(teamId: number): Promise<void>;

  /* Login codes are per (team, member email): any member can log in with their own email. */
  getLoginCode(teamId: number, email: string): Promise<LoginCodeRow | null>;
  saveLoginCode(teamId: number, email: string, codeHash: string, ttlMs: number): Promise<void>;
  bumpLoginAttempts(teamId: number, email: string): Promise<void>;
  deleteLoginCode(teamId: number, email: string): Promise<void>;

  findReusableOrder(teamId: number, amount: number): Promise<string | null>;
  insertOrder(teamId: number, orderId: string, amount: number): Promise<void>;
  getOrder(orderId: string): Promise<OrderRow | null>;
  /** Marks order + team paid. Returns the team only the FIRST time (null if already paid). */
  markOrderPaid(orderId: string, paymentId: string, amount?: number): Promise<TeamRow | null>;

  setMailSent(teamId: number, kind: "id" | "paid"): Promise<void>;
  listTeams(): Promise<AdminTeamRow[]>;
  teamsWithoutIdMail(limit: number): Promise<TeamRow[]>;
  countWithoutIdMail(): Promise<number>;

  /* Venue check-in + food/snack tokens (per member). */
  /** Sets checked_in_at if not set. Returns the (existing or new) time and whether it was already set. */
  checkIn(memberId: number): Promise<{ at: Date | string; already: boolean }>;
  undoCheckIn(memberId: number): Promise<void>;
  /** Redeems a token once. Returns the (existing or new) time and whether it was already used. */
  redeem(memberId: number, key: string): Promise<{ at: Date | string; already: boolean }>;
  getRedemptions(memberIds: number[]): Promise<RedemptionRow[]>;
  stats(): Promise<{ checkedIn: number }>;
}

export const isDemoDb = () => !process.env.DATABASE_URL && process.env.NODE_ENV !== "production";

const g = globalThis as unknown as { __hsSql?: postgres.Sql };
function sql() {
  if (!g.__hsSql) {
    g.__hsSql = postgres(requireEnv("DATABASE_URL"), {
      max: 5,
      ssl: process.env.DATABASE_SSL === "false" ? false : "require",
      prepare: false, // needed for Supabase/Neon poolers (pgbouncer transaction mode)
    });
  }
  return g.__hsSql;
}

const pgStore: Store = {
  async getTeamByCode(code) {
    const [t] = await sql()<TeamRow[]>`select * from teams where upper(team_code) = upper(${code.trim()}) limit 1`;
    return t ?? null;
  },
  async getTeamById(id) {
    const [t] = await sql()<TeamRow[]>`select * from teams where id = ${id} limit 1`;
    return t ?? null;
  },
  getMembers: (teamId) => sql()<MemberRow[]>`select * from members where team_id = ${teamId} order by is_leader desc, id asc`,
  async getTeamByName(name) {
    const [t] = await sql()<TeamRow[]>`select * from teams where lower(name) = lower(${name.trim()}) limit 1`;
    return t ?? null;
  },
  async createTeam(code, name, leaderEmail, members) {
    return sql().begin(async (tx) => {
      const [team] = await tx<TeamRow[]>`
        insert into teams (team_code, name, leader_email) values (${code}, ${name}, ${leaderEmail})
        on conflict (team_code) do nothing returning *`;
      if (!team) return null;
      for (const m of members) {
        await tx`insert into members (team_id, name, email, is_leader) values (${team.id}, ${m.name}, ${m.email}, ${m.isLeader})`;
      }
      return team;
    });
  },
  async addMember(teamId, name, email) {
    const [m] = await sql()<MemberRow[]>`insert into members (team_id, name, email) values (${teamId}, ${name}, ${email}) returning *`;
    return m;
  },
  async getMember(memberId) {
    const [m] = await sql()<MemberRow[]>`select * from members where id = ${memberId}`;
    return m ?? null;
  },
  async removeMember(memberId) {
    await sql()`delete from members where id = ${memberId}`;
  },
  async deleteTeam(teamId) {
    await sql()`delete from teams where id = ${teamId}`;
  },

  async getLoginCode(teamId, email) {
    const [r] = await sql()<LoginCodeRow[]>`
      select code_hash, expires_at, attempts, sent_at from login_codes where team_id = ${teamId} and email = ${email.toLowerCase()}`;
    return r ?? null;
  },
  async saveLoginCode(teamId, email, codeHash, ttlMs) {
    const expires = new Date(Date.now() + ttlMs);
    await sql()`
      insert into login_codes (team_id, email, code_hash, expires_at, attempts, sent_at)
      values (${teamId}, ${email.toLowerCase()}, ${codeHash}, ${expires}, 0, now())
      on conflict (team_id, email) do update set code_hash = excluded.code_hash, expires_at = excluded.expires_at, attempts = 0, sent_at = now()`;
  },
  async bumpLoginAttempts(teamId, email) {
    await sql()`update login_codes set attempts = attempts + 1 where team_id = ${teamId} and email = ${email.toLowerCase()}`;
  },
  async deleteLoginCode(teamId, email) {
    await sql()`delete from login_codes where team_id = ${teamId} and email = ${email.toLowerCase()}`;
  },

  async findReusableOrder(teamId, amount) {
    const [r] = await sql()<{ order_id: string }[]>`
      select order_id from payments
      where team_id = ${teamId} and status = 'created' and amount = ${amount} and created_at > now() - interval '12 hours'
      order by created_at desc limit 1`;
    return r?.order_id ?? null;
  },
  async insertOrder(teamId, orderId, amount) {
    await sql()`insert into payments (team_id, order_id, amount) values (${teamId}, ${orderId}, ${amount})`;
  },
  async getOrder(orderId) {
    const [r] = await sql()<OrderRow[]>`select team_id, amount, status from payments where order_id = ${orderId}`;
    return r ?? null;
  },
  async markOrderPaid(orderId, paymentId, amount) {
    return sql().begin(async (tx) => {
      const [order] = await tx<OrderRow[]>`select team_id, amount, status from payments where order_id = ${orderId} for update`;
      if (!order) return null;
      if (amount !== undefined && amount !== order.amount) {
        throw new Error(`Amount mismatch for ${orderId}: got ${amount}, expected ${order.amount}`);
      }
      if (order.status !== "paid") {
        await tx`update payments set status = 'paid', payment_id = ${paymentId}, paid_at = now() where order_id = ${orderId}`;
      }
      const [team] = await tx<TeamRow[]>`
        update teams set status = 'paid', paid_at = now(), payment_id = ${paymentId}, amount_paid = ${order.amount}
        where id = ${order.team_id} and status <> 'paid' returning *`;
      return team ?? null;
    });
  },

  async setMailSent(teamId, kind) {
    if (kind === "id") await sql()`update teams set id_mail_sent_at = now() where id = ${teamId}`;
    else await sql()`update teams set paid_mail_sent_at = now() where id = ${teamId}`;
  },
  listTeams: () => sql()<AdminTeamRow[]>`
    select t.*, count(m.id)::int as member_count,
           coalesce(string_agg(m.name, '; ' order by m.is_leader desc, m.id), '') as members,
           coalesce(json_agg(json_build_object('id', m.id, 'team_id', m.team_id, 'name', m.name, 'email', m.email, 'is_leader', m.is_leader, 'checked_in_at', m.checked_in_at)
                    order by m.is_leader desc, m.id) filter (where m.id is not null), '[]') as member_list
    from teams t left join members m on m.team_id = t.id
    group by t.id order by t.name`,
  async checkIn(memberId) {
    const [r] = await sql()<{ checked_in_at: Date; fresh: boolean }[]>`
      with upd as (update members set checked_in_at = now() where id = ${memberId} and checked_in_at is null returning checked_in_at)
      select checked_in_at, true as fresh from upd
      union all select checked_in_at, false from members where id = ${memberId} and not exists (select 1 from upd)`;
    return { at: r.checked_in_at, already: !r.fresh };
  },
  async undoCheckIn(memberId) {
    await sql()`update members set checked_in_at = null where id = ${memberId}`;
  },
  async redeem(memberId, key) {
    const [ins] = await sql()<{ redeemed_at: Date }[]>`
      insert into token_redemptions (member_id, token_key) values (${memberId}, ${key})
      on conflict (member_id, token_key) do nothing returning redeemed_at`;
    if (ins) return { at: ins.redeemed_at, already: false };
    const [old] = await sql()<{ redeemed_at: Date }[]>`
      select redeemed_at from token_redemptions where member_id = ${memberId} and token_key = ${key}`;
    return { at: old.redeemed_at, already: true };
  },
  getRedemptions: (ids) =>
    ids.length ? sql()<RedemptionRow[]>`select member_id, token_key, redeemed_at from token_redemptions where member_id in ${sql()(ids)}` : Promise.resolve([]),
  async stats() {
    const [r] = await sql()<{ n: number }[]>`select count(*)::int as n from members where checked_in_at is not null`;
    return { checkedIn: r.n };
  },
  teamsWithoutIdMail: (limit) => sql()<TeamRow[]>`select * from teams where id_mail_sent_at is null order by id limit ${limit}`,
  async countWithoutIdMail() {
    const [{ n }] = await sql()<{ n: number }[]>`select count(*)::int as n from teams where id_mail_sent_at is null`;
    return n;
  },
};

export function store(): Store {
  return isDemoDb() ? memoryStore() : pgStore;
}

/* Convenience wrappers (used widely). */
export const getTeamByCode = (code: string) => store().getTeamByCode(code);
export const getTeamById = (id: number) => store().getTeamById(id);
export const getMembers = (teamId: number) => store().getMembers(teamId);
