import { db } from "@/lib/finalist/db";
import { markOrderPaid } from "@/lib/finalist/payments";
import { verifyCheckoutSignature } from "@/lib/finalist/razorpay";
import { currentTeam } from "@/lib/finalist/session";

/* Called by the browser right after Razorpay Checkout succeeds.
   The webhook does the same job server-to-server, in case this call never arrives. */
export async function POST(req: Request) {
  const team = await currentTeam();
  if (!team) return Response.json({ error: "Not logged in" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = body;
  if (!orderId || !paymentId || !signature) return Response.json({ error: "Missing payment details" }, { status: 400 });

  if (!verifyCheckoutSignature(orderId, paymentId, signature)) {
    return Response.json({ error: "Payment signature check failed" }, { status: 400 });
  }

  const [order] = await db()<{ team_id: number }[]>`select team_id from payments where order_id = ${orderId}`;
  if (!order || order.team_id !== team.id) return Response.json({ error: "Order not found" }, { status: 404 });

  await markOrderPaid(orderId, paymentId);
  return Response.json({ ok: true });
}
