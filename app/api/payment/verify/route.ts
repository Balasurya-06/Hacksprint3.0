import { randomBytes } from "node:crypto";
import { withErrors } from "@/lib/finalist/http";
import { store } from "@/lib/finalist/db";
import { isDemoPayments, markOrderPaid } from "@/lib/finalist/payments";
import { verifyCheckoutSignature } from "@/lib/finalist/razorpay";
import { currentTeam } from "@/lib/finalist/session";

/* Called by the browser right after Razorpay Checkout succeeds.
   The webhook does the same job server-to-server, in case this call never arrives. */
async function handlePOST(req: Request) {
  const team = await currentTeam();
  if (!team) return Response.json({ error: "Not logged in" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as {
    demo?: boolean;
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };
  const orderId = body.razorpay_order_id;
  if (!orderId) return Response.json({ error: "Missing payment details" }, { status: 400 });

  const order = await store().getOrder(orderId);
  if (!order || order.team_id !== team.id) return Response.json({ error: "Order not found" }, { status: 404 });

  /* Local demo only: simulated payment (never available in production). */
  if (body.demo) {
    if (!isDemoPayments() || !orderId.startsWith("order_demo_")) return Response.json({ error: "Demo payments are disabled" }, { status: 400 });
    await markOrderPaid(orderId, `pay_demo_${randomBytes(6).toString("hex")}`);
    return Response.json({ ok: true });
  }

  const { razorpay_payment_id: paymentId, razorpay_signature: signature } = body;
  if (!paymentId || !signature) return Response.json({ error: "Missing payment details" }, { status: 400 });
  if (!verifyCheckoutSignature(orderId, paymentId, signature)) {
    return Response.json({ error: "Payment signature check failed" }, { status: 400 });
  }

  await markOrderPaid(orderId, paymentId);
  return Response.json({ ok: true });
}

export const POST = withErrors(handlePOST);
