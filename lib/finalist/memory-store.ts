import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AdminTeamRow, LoginCodeRow, MemberRow, RedemptionRow, Store, TeamRow } from "./db";

/* Local store, used only in `next dev` when DATABASE_URL is not set.
   Starts EMPTY (add teams from /admin/finalists) and is saved to .data/finalists-local.json
   so teams survive a dev-server restart. Production always uses Postgres. */

type Order = { team_id: number; order_id: string; amount: number; status: "created" | "paid" | "failed"; created_at: number };
type State = { teams: TeamRow[]; members: MemberRow[]; orders: Order[]; redemptions?: RedemptionRow[] };

const FILE = join(process.cwd(), ".data", "finalists-local.json");

function loadState(): State {
  try {
    if (existsSync(FILE)) return JSON.parse(readFileSync(FILE, "utf8")) as State;
  } catch (err) {
    console.error("[finalist] couldn't read local data file, starting empty", err);
  }
  return { teams: [], members: [], orders: [] };
}

function save() {
  try {
    mkdirSync(join(process.cwd(), ".data"), { recursive: true });
    writeFileSync(FILE, JSON.stringify(st(), null, 2));
  } catch (err) {
    console.error("[finalist] couldn't save local data file", err);
  }
}

const g = globalThis as unknown as { __hsLocal?: State; __hsCodes?: Map<string, LoginCodeRow> };
const st = () => (g.__hsLocal ??= loadState());
const codes = () => (g.__hsCodes ??= new Map()); // login codes: memory only
const codeKey = (teamId: number, email: string) => `${teamId}:${email.toLowerCase()}`;
const nextId = (rows: { id: number }[]) => rows.reduce((n, r) => Math.max(n, r.id), 0) + 1;
const copy = <T,>(v: T): T => (v ? { ...v } : v);
const sortMembers = (ms: MemberRow[]) => ms.sort((a, b) => Number(b.is_leader) - Number(a.is_leader) || a.id - b.id);

const mem: Store = {
  async getTeamByCode(code) {
    return copy(st().teams.find((t) => t.team_code.toUpperCase() === code.trim().toUpperCase()) ?? null);
  },
  async getTeamById(id) {
    return copy(st().teams.find((t) => t.id === id) ?? null);
  },
  async getMembers(teamId) {
    return sortMembers(st().members.filter((m) => m.team_id === teamId).map((m) => ({ ...m })));
  },
  async getTeamByName(name) {
    return copy(st().teams.find((t) => t.name.toLowerCase() === name.trim().toLowerCase()) ?? null);
  },
  async createTeam(code, name, leader_email, members) {
    const s = st();
    if (s.teams.some((t) => t.team_code === code)) return null;
    const team: TeamRow = {
      id: nextId(s.teams), team_code: code, name, leader_email, status: "shortlisted",
      paid_at: null, payment_id: null, amount_paid: null, id_mail_sent_at: null, paid_mail_sent_at: null,
    };
    s.teams.push(team);
    for (const mb of members) s.members.push({ id: nextId(s.members), team_id: team.id, name: mb.name, email: mb.email, is_leader: mb.isLeader });
    save();
    return { ...team };
  },
  async addMember(team_id, name, email) {
    const mb: MemberRow = { id: nextId(st().members), team_id, name, email, is_leader: false };
    st().members.push(mb);
    save();
    return { ...mb };
  },
  async getMember(memberId) {
    return copy(st().members.find((x) => x.id === memberId) ?? null);
  },
  async removeMember(memberId) {
    st().members = st().members.filter((x) => x.id !== memberId);
    st().redemptions = (st().redemptions ?? []).filter((r) => r.member_id !== memberId);
    save();
  },
  async deleteTeam(teamId) {
    const s = st();
    const gone = new Set(s.members.filter((x) => x.team_id === teamId).map((x) => x.id));
    s.teams = s.teams.filter((t) => t.id !== teamId);
    s.members = s.members.filter((x) => x.team_id !== teamId);
    s.redemptions = (s.redemptions ?? []).filter((r) => !gone.has(r.member_id));
    s.orders = s.orders.filter((o) => o.team_id !== teamId);
    save();
  },

  async getLoginCode(teamId, email) {
    return copy(codes().get(codeKey(teamId, email)) ?? null);
  },
  async saveLoginCode(teamId, email, code_hash, ttlMs) {
    codes().set(codeKey(teamId, email), { code_hash, expires_at: new Date(Date.now() + ttlMs), attempts: 0, sent_at: new Date() });
  },
  async bumpLoginAttempts(teamId, email) {
    const c = codes().get(codeKey(teamId, email));
    if (c) c.attempts++;
  },
  async deleteLoginCode(teamId, email) {
    codes().delete(codeKey(teamId, email));
  },

  async findReusableOrder(teamId, amount) {
    return st().orders.find((o) => o.team_id === teamId && o.status === "created" && o.amount === amount)?.order_id ?? null;
  },
  async insertOrder(team_id, order_id, amount) {
    st().orders.push({ team_id, order_id, amount, status: "created", created_at: Date.now() });
    save();
  },
  async getOrder(orderId) {
    const o = st().orders.find((x) => x.order_id === orderId);
    return o ? { team_id: o.team_id, amount: o.amount, status: o.status } : null;
  },
  async markOrderPaid(orderId, paymentId, amount) {
    const o = st().orders.find((x) => x.order_id === orderId);
    if (!o) return null;
    if (amount !== undefined && amount !== o.amount) throw new Error(`Amount mismatch for ${orderId}`);
    o.status = "paid";
    const t = st().teams.find((x) => x.id === o.team_id);
    if (!t || t.status === "paid") { save(); return null; }
    Object.assign(t, { status: "paid", paid_at: new Date(), payment_id: paymentId, amount_paid: o.amount });
    save();
    return { ...t };
  },

  async setMailSent(teamId, kind) {
    const t = st().teams.find((x) => x.id === teamId);
    if (t) t[kind === "id" ? "id_mail_sent_at" : "paid_mail_sent_at"] = new Date();
    save();
  },
  async listTeams() {
    return st()
      .teams.map((t): AdminTeamRow => {
        const ms = sortMembers(st().members.filter((m) => m.team_id === t.id).map((m) => ({ ...m })));
        return { ...t, member_count: ms.length, members: ms.map((m) => m.name).join("; "), member_list: ms };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  },
  async checkIn(memberId) {
    const m = st().members.find((x) => x.id === memberId);
    if (!m) throw new Error("Member not found");
    if (m.checked_in_at) return { at: m.checked_in_at, already: true };
    m.checked_in_at = new Date();
    save();
    return { at: m.checked_in_at, already: false };
  },
  async undoCheckIn(memberId) {
    const m = st().members.find((x) => x.id === memberId);
    if (m) m.checked_in_at = null;
    save();
  },
  async redeem(member_id, token_key) {
    const list = (st().redemptions ??= []);
    const old = list.find((r) => r.member_id === member_id && r.token_key === token_key);
    if (old) return { at: old.redeemed_at, already: true };
    const row = { member_id, token_key, redeemed_at: new Date() };
    list.push(row);
    save();
    return { at: row.redeemed_at, already: false };
  },
  async getRedemptions(ids) {
    return (st().redemptions ?? []).filter((r) => ids.includes(r.member_id)).map((r) => ({ ...r }));
  },
  async stats() {
    return { checkedIn: st().members.filter((m) => m.checked_in_at).length };
  },
  async teamsWithoutIdMail(limit) {
    return st().teams.filter((t) => !t.id_mail_sent_at).slice(0, limit).map((t) => ({ ...t }));
  },
  async countWithoutIdMail() {
    return st().teams.filter((t) => !t.id_mail_sent_at).length;
  },
};

export const memoryStore = () => mem;
