import { withErrors } from "@/lib/finalist/http";
import { markOrderPaid } from "@/lib/finalist/payments";
import { verifyWebhookSignature } from "@/lib/finalist/razorpay";

/* Razorpay → server webhook. Configure in Razorpay Dashboard → Settings → Webhooks:
   URL: https://<your-domain>/api/payment/webhook   Events: payment.captured, order.paid */
async function handlePOST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") ?? "";
  if (!verifyWebhookSignature(raw, signature)) return new Response("bad signature", { status: 400 });

  const event = JSON.parse(raw) as {
    event: string;
    payload?: { payment?: { entity?: { id: string; order_id: string; amount: number; status: string } } };
  };

  const payment = event.payload?.payment?.entity;
  if ((event.event === "payment.captured" || event.event === "order.paid") && payment?.order_id) {
    try {
      await markOrderPaid(payment.order_id, payment.id, payment.amount);
    } catch (err) {
      console.error("[finalist] webhook processing failed", err);
      return new Response("error", { status: 500 }); // Razorpay will retry
    }
  }
  return new Response("ok");
}

export const POST = withErrors(handlePOST);
