import { randomInt } from "node:crypto";
import { withErrors } from "@/lib/finalist/http";
import { getTeamByCode, store } from "@/lib/finalist/db";
import { isDevMail, sendLoginCode } from "@/lib/finalist/mail";
import { hashCode } from "@/lib/finalist/tokens";

/* Step 1: team enters its Team ID → we mail a 6-digit code to the team leader. */
async function handlePOST(req: Request) {
  const { teamCode } = (await req.json().catch(() => ({}))) as { teamCode?: string };
  if (!teamCode || teamCode.length > 60) return Response.json({ error: "Enter your Team ID." }, { status: 400 });

  const team = await getTeamByCode(teamCode);
  if (!team) return Response.json({ error: "Team ID not found. Check the ID in your shortlist mail." }, { status: 404 });

  const recent = await store().getLoginCode(team.id);
  if (recent && Date.now() - new Date(recent.sent_at).getTime() < 60_000) {
    return Response.json({ error: "A code was just sent. Wait a minute before asking for another." }, { status: 429 });
  }

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  await store().saveLoginCode(team.id, hashCode(team.id, code), 10 * 60_000);

  try {
    await sendLoginCode(team, code);
  } catch (err) {
    console.error("[finalist] login code mail failed", err);
    return Response.json({ error: "Couldn't send the code right now. Please try again." }, { status: 502 });
  }

  return Response.json({
    ok: true,
    email: maskEmail(team.leader_email),
    teamName: team.name,
    ...(isDevMail() ? { devCode: code } : {}), // local dev without SMTP only
  });
}

function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  return `${user.slice(0, 2)}${"•".repeat(Math.max(user.length - 2, 3))}@${domain}`;
}

export const POST = withErrors(handlePOST);
