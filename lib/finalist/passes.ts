import { getMembers, getTeamById, store, type MemberRow, type TeamRow } from "./db";
import { MEAL_TOKENS, parsePassNumber, passNumber } from "./event";
import { passToken, readPassToken } from "./tokens";

/** Accepts what a scanner reads (the full QR URL or a raw token) or a typed pass number like HS3-0042. */
export function memberIdFromScan(input: string): number | null {
  const s = input.trim();
  if (!s) return null;
  const byNumber = parsePassNumber(s);
  if (byNumber) return byNumber;
  let token = s;
  try {
    const t = new URL(s).searchParams.get("t");
    if (t) token = t;
  } catch {
    /* not a URL, treat as raw token */
  }
  return readPassToken(token)?.m ?? null;
}

export type Person = {
  memberId: number;
  name: string;
  isLeader: boolean;
  passNumber: string;
  team: { name: string; code: string; paid: boolean; size: number };
  checkedInAt: string | null;
  tokens: { key: string; label: string; kind: string; time: string; usedAt: string | null }[];
};

const iso = (d: Date | string | null | undefined) => (d ? new Date(d).toISOString() : null);

export async function loadPerson(memberId: number): Promise<{ person: Person; member: MemberRow; team: TeamRow } | null> {
  const member = await store().getMember(memberId);
  if (!member) return null;
  const team = await getTeamById(member.team_id);
  if (!team) return null;
  const [members, red] = await Promise.all([getMembers(team.id), store().getRedemptions([member.id])]);
  return {
    member,
    team,
    person: {
      memberId: member.id,
      name: member.name,
      isLeader: member.is_leader,
      passNumber: passNumber(member.id),
      team: { name: team.name, code: team.team_code, paid: team.status === "paid", size: members.length },
      checkedInAt: iso(member.checked_in_at),
      tokens: MEAL_TOKENS.map((t) => ({ ...t, usedAt: iso(red.find((r) => r.token_key === t.key)?.redeemed_at) })),
    },
  };
}

/** Per-member pass data for the team dashboard (only once the team has paid). */
export async function teamPasses(team: TeamRow, members: MemberRow[]) {
  const red = await store().getRedemptions(members.map((m) => m.id));
  return members.map((m) => ({
    name: m.name,
    isLeader: m.is_leader,
    passNumber: passNumber(m.id),
    passToken: passToken(m.id),
    checkedInAt: iso(m.checked_in_at),
    tokens: MEAL_TOKENS.map((t) => ({ key: t.key, usedAt: iso(red.find((r) => r.member_id === m.id && r.token_key === t.key)?.redeemed_at) })),
  }));
}
