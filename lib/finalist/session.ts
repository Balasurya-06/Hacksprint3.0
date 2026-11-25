import { cookies } from "next/headers";
import { makeToken, readToken } from "./tokens";
import { getTeamById } from "./db";

const TEAM_COOKIE = "hs_team";
const ADMIN_COOKIE = "hs_admin";
const TEAM_TTL_S = 60 * 60 * 24 * 7; // 7 days
const ADMIN_TTL_S = 60 * 60 * 12; // 12 hours

const cookieOpts = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge,
});

/* ── Team session ── */
export async function setTeamSession(teamId: number, memberId: number) {
  const token = makeToken({ t: teamId, m: memberId, exp: Date.now() + TEAM_TTL_S * 1000 }, "team");
  (await cookies()).set(TEAM_COOKIE, token, cookieOpts(TEAM_TTL_S));
}

export async function clearTeamSession() {
  (await cookies()).delete(TEAM_COOKIE);
}

async function sessionData() {
  return readToken<{ t: number; m?: number }>((await cookies()).get(TEAM_COOKIE)?.value, "team");
}

/** Returns the logged-in team, or null. */
export async function currentTeam() {
  const data = await sessionData();
  if (!data) return null;
  return getTeamById(data.t);
}

/** Id of the team member who logged in (null for old sessions). */
export async function currentMemberId() {
  return (await sessionData())?.m ?? null;
}

/* ── Admin session ── */
export async function setAdminSession() {
  const token = makeToken({ a: 1, exp: Date.now() + ADMIN_TTL_S * 1000 }, "admin");
  (await cookies()).set(ADMIN_COOKIE, token, cookieOpts(ADMIN_TTL_S));
}

export async function isAdmin() {
  return readToken((await cookies()).get(ADMIN_COOKIE)?.value, "admin") !== null;
}
