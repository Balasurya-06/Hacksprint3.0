import { randomBytes } from "node:crypto";
import { withErrors } from "@/lib/finalist/http";
import { amountForMembers, requireEnv } from "@/lib/finalist/config";
import { getMembers, store } from "@/lib/finalist/db";
import { isDemoPayments } from "@/lib/finalist/payments";
import { createOrder } from "@/lib/finalist/razorpay";
import { currentTeam } from "@/lib/finalist/session";

/* Creates (or reuses) a Razorpay order for the logged-in team.
   The amount is ALWAYS computed here from the member count, never taken from the browser. */
async function handlePOST() {
  const team = await currentTeam();
  if (!team) return Response.json({ error: "Not logged in" }, { status: 401 });
  if (team.status === "paid") return Response.json({ error: "Your team has already paid." }, { status: 409 });

  const members = await getMembers(team.id);
  if (members.length === 0) return Response.json({ error: "No members found for this team. Contact the organisers." }, { status: 400 });
  const amountPaise = amountForMembers(members.length) * 100;
  const demo = isDemoPayments();

  let orderId = await store().findReusableOrder(team.id, amountPaise);
  if (!orderId) {
    if (demo) {
      orderId = `order_demo_${randomBytes(6).toString("hex")}`;
    } else {
      try {
        const order = await createOrder(amountPaise, team.team_code, { team_id: String(team.id), team_code: team.team_code });
        orderId = order.id;
      } catch (err) {
        console.error("[finalist] create order failed", err);
        return Response.json({ error: "Couldn't start the payment. Please try again." }, { status: 502 });
      }
    }
    await store().insertOrder(team.id, orderId, amountPaise);
  }

  const leader = members.find((m) => m.is_leader);
  return Response.json({
    demo,
    keyId: demo ? null : requireEnv("RAZORPAY_KEY_ID"),
    orderId,
    amount: amountPaise,
    currency: "INR",
    teamName: team.name,
    teamCode: team.team_code,
    prefill: { name: leader?.name ?? "", email: team.leader_email },
  });
}

export const POST = withErrors(handlePOST);
