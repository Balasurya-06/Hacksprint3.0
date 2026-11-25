import { withErrors } from "@/lib/finalist/http";
import { db, getTeamByCode } from "@/lib/finalist/db";
import { setTeamSession } from "@/lib/finalist/session";
import { hashCode, safeEqual } from "@/lib/finalist/tokens";

const MAX_ATTEMPTS = 5;

/* Step 2: team enters the 6-digit code → session cookie is set. */
async function handlePOST(req: Request) {
  const { teamCode, code } = (await req.json().catch(() => ({}))) as { teamCode?: string; code?: string };
  if (!teamCode || !code || !/^\d{6}$/.test(code)) return Response.json({ error: "Enter the 6-digit code." }, { status: 400 });

  const team = await getTeamByCode(teamCode);
  if (!team) return Response.json({ error: "Team ID not found." }, { status: 404 });

  const sql = db();
  const [row] = await sql<{ code_hash: string; expires_at: Date; attempts: number }[]>`
    select code_hash, expires_at, attempts from login_codes where team_id = ${team.id}`;

  if (!row || new Date(row.expires_at).getTime() < Date.now()) {
    return Response.json({ error: "Code expired. Request a new one." }, { status: 400 });
  }
  if (row.attempts >= MAX_ATTEMPTS) {
    return Response.json({ error: "Too many wrong attempts. Request a new code." }, { status: 429 });
  }
  if (!safeEqual(row.code_hash, hashCode(team.id, code))) {
    await sql`update login_codes set attempts = attempts + 1 where team_id = ${team.id}`;
    return Response.json({ error: "Wrong code. Try again." }, { status: 400 });
  }

  await sql`delete from login_codes where team_id = ${team.id}`;
  await setTeamSession(team.id);
  return Response.json({ ok: true });
}

export const POST = withErrors(handlePOST);
