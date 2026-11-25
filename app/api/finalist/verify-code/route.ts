import { withErrors } from "@/lib/finalist/http";
import { getMembers, getTeamByCode, store } from "@/lib/finalist/db";
import { setTeamSession } from "@/lib/finalist/session";
import { hashCode, safeEqual } from "@/lib/finalist/tokens";

const MAX_ATTEMPTS = 5;

/* Step 2: Team ID + email + 6-digit one-time code → logged in to the team dashboard. */
async function handlePOST(req: Request) {
  const { teamCode, email, code } = (await req.json().catch(() => ({}))) as { teamCode?: string; email?: string; code?: string };
  const mail = email?.trim().toLowerCase() ?? "";
  if (!teamCode || !mail || !code || !/^\d{6}$/.test(code)) return Response.json({ error: "Enter the 6-digit code." }, { status: 400 });

  const team = await getTeamByCode(teamCode);
  const member = team ? (await getMembers(team.id)).find((m) => m.email?.toLowerCase() === mail) : null;
  if (!team || !member) return Response.json({ error: "Team ID and email don't match." }, { status: 404 });

  const db = store();
  const row = await db.getLoginCode(team.id, mail);
  if (!row || new Date(row.expires_at).getTime() < Date.now()) {
    return Response.json({ error: row ? "OTP expired. Request a new one." : "No OTP was sent to this email yet. Click Send OTP first." }, { status: 400 });
  }
  if (row.attempts >= MAX_ATTEMPTS) {
    return Response.json({ error: "Too many wrong attempts. Request a new code." }, { status: 429 });
  }
  if (!safeEqual(row.code_hash, hashCode(team.id, mail, code))) {
    await db.bumpLoginAttempts(team.id, mail);
    return Response.json({ error: "Wrong code. Try again." }, { status: 400 });
  }

  await db.deleteLoginCode(team.id, mail);
  await setTeamSession(team.id, member.id);
  return Response.json({ ok: true });
}

export const POST = withErrors(handlePOST);
