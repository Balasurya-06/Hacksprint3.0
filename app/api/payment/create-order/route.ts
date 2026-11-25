import { amountForMembers, requireEnv } from "@/lib/finalist/config";
import { db, getMembers } from "@/lib/finalist/db";
import { createOrder } from "@/lib/finalist/razorpay";
import { currentTeam } from "@/lib/finalist/session";

/* Creates (or reuses) a Razorpay order for the logged-in team.
   The amount is ALWAYS computed here from the member count, never taken from the browser. */
export async function POST() {
  const team = await currentTeam();
  if (!team) return Response.json({ error: "Not logged in" }, { status: 401 });
  if (team.status === "paid") return Response.json({ error: "Your team has already paid." }, { status: 409 });

  const members = await getMembers(team.id);
  if (members.length === 0) return Response.json({ error: "No members found for this team. Contact the organisers." }, { status: 400 });
  const amountPaise = amountForMembers(members.length) * 100;

  const sql = db();
  const [existing] = await sql<{ order_id: string }[]>`
    select order_id from payments
    where team_id = ${team.id} and status = 'created' and amount = ${amountPaise} and created_at > now() - interval '12 hours'
    order by created_at desc limit 1`;

  let orderId = existing?.order_id;
  if (!orderId) {
    try {
      const order = await createOrder(amountPaise, team.team_code, { team_id: String(team.id), team_code: team.team_code });
      orderId = order.id;
      await sql`insert into payments (team_id, order_id, amount) values (${team.id}, ${orderId}, ${amountPaise})`;
    } catch (err) {
      console.error("[finalist] create order failed", err);
      return Response.json({ error: "Couldn't start the payment. Please try again." }, { status: 502 });
    }
  }

  const leader = members.find((m) => m.is_leader);
  return Response.json({
    keyId: requireEnv("RAZORPAY_KEY_ID"),
    orderId,
    amount: amountPaise,
    currency: "INR",
    teamName: team.name,
    teamCode: team.team_code,
    prefill: { name: leader?.name ?? "", email: team.leader_email },
  });
}
