import { getMembers, store, type TeamRow } from "./db";
import { sendPaymentSuccessMail } from "./mail";

/** Local demo: no Razorpay keys in `next dev` → a simulated payment instead of Razorpay Checkout. */
export const isDemoPayments = () => !process.env.RAZORPAY_KEY_ID && process.env.NODE_ENV !== "production";

/**
 * Mark an order as paid. Safe to call many times (checkout callback AND webhook):
 * only the first call flips the team to "paid" and sends the confirmation mail.
 */
export async function markOrderPaid(orderId: string, paymentId: string, amountPaise?: number) {
  const team = await store().markOrderPaid(orderId, paymentId, amountPaise);
  if (team) await sendPaidMailSafely(team);
  return team;
}

export async function sendPaidMailSafely(team: TeamRow) {
  try {
    await sendPaymentSuccessMail(team, await getMembers(team.id));
    await store().setMailSent(team.id, "paid");
  } catch (err) {
    // Payment is already recorded; the admin page can resend the mail.
    console.error(`[finalist] confirmation mail failed for team ${team.team_code}`, err);
  }
}
