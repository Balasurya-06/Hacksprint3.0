import { withErrors } from "@/lib/finalist/http";
import { store } from "@/lib/finalist/db";
import { mealToken } from "@/lib/finalist/event";
import { loadPerson, memberIdFromScan } from "@/lib/finalist/passes";
import { isAdmin } from "@/lib/finalist/session";

/* Venue scanner (organisers / volunteers logged in to the admin).
   POST { scan, action: "lookup" }               → who is this pass for
   POST { scan, action: "checkin" }              → mark checked in (after checking pass + college ID + Aadhaar by sight)
   POST { scan, action: "undo-checkin" }
   POST { scan, action: "redeem", token: "<key>" } → use a food/snack token once
   No ID numbers are sent or stored: identity is verified by looking at the cards. */
type Body = { scan?: string; action?: string; token?: string };

async function handlePOST(req: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Not logged in as organiser" }, { status: 401 });
  const { scan = "", action = "lookup", token } = (await req.json().catch(() => ({}))) as Body;

  const memberId = memberIdFromScan(scan);
  const found = memberId ? await loadPerson(memberId) : null;
  if (!found) return Response.json({ result: "invalid", message: "Not a valid HackSprint 3.0 entry pass." }, { status: 404 });

  const { person } = found;
  const db = store();
  const reply = async (result: string, message: string, extra: Record<string, unknown> = {}) => {
    const fresh = (await loadPerson(person.memberId))!.person;
    return Response.json({ result, message, person: fresh, ...extra });
  };

  if (!person.team.paid) return reply("unpaid", "This team has NOT paid the finale fee. Send them to the help desk.");

  switch (action) {
    case "lookup":
      return reply("ok", person.checkedInAt ? "Already checked in." : "Valid pass. Verify ID cards, then check in.");

    case "checkin": {
      const r = await db.checkIn(person.memberId);
      return r.already
        ? reply("already", `Already checked in at ${new Date(r.at).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}.`)
        : reply("checked-in", `${person.name} checked in.`);
    }

    case "undo-checkin":
      await db.undoCheckIn(person.memberId);
      return reply("ok", "Check-in undone.");

    case "redeem": {
      const t = token ? mealToken(token) : undefined;
      if (!t) return Response.json({ error: "Choose which food/snack token to scan for." }, { status: 400 });
      if (!person.checkedInAt) return reply("not-checked-in", `${person.name} has not checked in at registration yet.`);
      const r = await db.redeem(person.memberId, t.key);
      return r.already
        ? reply("already", `${t.label} ALREADY USED at ${new Date(r.at).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}.`)
        : reply("redeemed", `${t.label} ✓ Serve ${person.name}.`);
    }

    default:
      return Response.json({ error: "Unknown action" }, { status: 400 });
  }
}

export const POST = withErrors(handlePOST);
