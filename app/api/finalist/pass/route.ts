import { withErrors } from "@/lib/finalist/http";
import { loadPerson } from "@/lib/finalist/passes";
import { readPassToken } from "@/lib/finalist/tokens";

/* Public: what anyone sees after scanning an entry-pass QR (pass status + who it belongs to).
   The schedule is shown by the page itself. No emails or other personal details here. */
async function handleGET(req: Request) {
  const token = new URL(req.url).searchParams.get("t") ?? "";
  const data = readPassToken(token);
  const found = data ? await loadPerson(data.m) : null;
  const noStore = { "Cache-Control": "no-store" };
  if (!found) return Response.json({ valid: false }, { status: 404, headers: noStore });

  const { person } = found;
  return Response.json(
    {
      valid: person.team.paid,
      name: person.name,
      isLeader: person.isLeader,
      passNumber: person.passNumber,
      team: { name: person.team.name, code: person.team.code },
      checkedIn: !!person.checkedInAt,
    },
    { headers: noStore },
  );
}

export const GET = withErrors(handleGET);
