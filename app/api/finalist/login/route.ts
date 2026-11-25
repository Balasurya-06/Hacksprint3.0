import { randomInt } from "node:crypto";
import { withErrors } from "@/lib/finalist/http";
import { getMembers, getTeamByCode, store } from "@/lib/finalist/db";
import { isDevMail, sendLoginCode } from "@/lib/finalist/mail";
import { hashCode } from "@/lib/finalist/tokens";

/* Step 1: Team ID + the email of ANY member of that team → a 6-digit one-time code is mailed to that email. */
async function handlePOST(req: Request) {
  const { teamCode, email } = (await req.json().catch(() => ({}))) as { teamCode?: string; email?: string };
  const mail = email?.trim().toLowerCase() ?? "";
  if (!teamCode || teamCode.length > 60) return Response.json({ error: "Enter your Team ID." }, { status: 400 });
  if (!mail || mail.length > 200) return Response.json({ error: "Enter your email." }, { status: 400 });

  const team = await getTeamByCode(teamCode);
  const member = team ? (await getMembers(team.id)).find((m) => m.email?.toLowerCase() === mail) : null;
  if (!team || !member) {
    return Response.json(
      { error: "Team ID and email don't match. Use the Team ID from your shortlist mail and the email registered for your team." },
      { status: 404 },
    );
  }

  const recent = await store().getLoginCode(team.id, mail);
  if (recent && Date.now() - new Date(recent.sent_at).getTime() < 60_000) {
    return Response.json({ error: "A code was just sent. Wait a minute before asking for another." }, { status: 429 });
  }

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  await store().saveLoginCode(team.id, mail, hashCode(team.id, mail, code), 10 * 60_000);

  try {
    await sendLoginCode(team, member, code);
  } catch (err) {
    console.error("[finalist] login code mail failed", err);
    return Response.json({ error: "Couldn't send the code right now. Please try again." }, { status: 502 });
  }

  return Response.json({
    ok: true,
    teamName: team.name,
    memberName: member.name,
    ...(isDevMail() ? { devCode: code } : {}), // local dev without SMTP only
  });
}

export const POST = withErrors(handlePOST);
