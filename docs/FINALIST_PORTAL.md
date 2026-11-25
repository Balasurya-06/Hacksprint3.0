# Finalist Portal: setup & runbook

Shortlisted teams log in with their **Team ID**, see their members, pay **₹300 × members** through Razorpay, get a confirmation mail and download their **entry pass** (with a QR code that volunteers scan at the gate).

## Pages

| URL | Who | What |
|---|---|---|
| `/finalist` | Any team member | Team ID + **their own registered email** → 6-digit OTP mailed to that email → log in |
| `/finalist/dashboard` | Teams | Progress steps, members, pay, one entry pass per member, food/snack token status, what to bring, schedule, venue |
| `/finalist/verify?t=…` | Anyone scanning a pass with a phone | Pass holder, ✓ valid/paid, the finale schedule and what to bring |
| `/admin/scan` | Volunteers at the venue (admin password) | Camera QR scanner: registration check-in (ID checked by sight) and food/snack tokens |
| `/admin/finalists` | Organisers | Add finalists (CSV upload with preview, or manually), add/remove members, delete teams, paid/pending stats, search, CSV export, send/resend mails |

## Flow

1. Import shortlisted teams (CSV) → each team gets an ID like `VIGRON.K7Q2`.
2. Admin page → **Send Team ID mails** → each leader (members in CC) gets the shortlist mail with the Team ID.
3. Any member logs in with the Team ID + their own email (OTP to that email) → dashboard shows all members → **Pay ₹N** → Razorpay Checkout.
4. Payment is confirmed on the server (checkout signature **and** webhook; whichever arrives first) → team marked **paid** → confirmation mail with receipt + entry QR.
5. Dashboard unlocks the entry pass PNG.

The amount is always calculated on the server from the member count. A team that has paid cannot pay again.

## Running locally without a database

With only `ADMIN_PASSWORD` and `SESSION_SECRET` in `.env.local`, `npm run dev` works without any accounts:
- **No `DATABASE_URL`** → teams you add in the admin page are saved to `.data/finalists-local.json` (git-ignored). It starts **empty**, with no demo data.
- **No `SMTP_HOST`** → mails are printed in the dev terminal, and the OTP is shown on the login screen.
- **No `RAZORPAY_KEY_ID`** → "Pay" simulates a successful payment.

None of this is active in production (`next build` / Vercel): there, missing settings show a configuration error.

## One-time setup

### 1. Database (Supabase free tier is enough)
1. Create a project at supabase.com → **SQL editor** → paste and run `db/schema.sql`.
2. Project Settings → Database → **Connection string → Transaction pooler** → that is `DATABASE_URL`.

### 2. Razorpay
1. Create an account and finish KYC (needed for live mode; **test mode works immediately**).
2. Settings → API Keys → generate → `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`.
3. Settings → Payment capture → keep **automatic capture** ON.
4. Settings → Webhooks → Add:
   - URL: `https://<your-domain>/api/payment/webhook`
   - Secret: any strong string → `RAZORPAY_WEBHOOK_SECRET`
   - Events: `payment.captured`, `order.paid`

### 3. Email (SMTP)
Gmail: turn on 2-step verification → Google Account → Security → **App passwords** → create one → `SMTP_PASS`.
Gmail allows ~500 mails/day; the bulk sender works in batches of 20, so 400 teams fit in one day. For more headroom use Brevo / Amazon SES / Zoho SMTP (same variables).

### 4. Environment variables
Copy `.env.example` → `.env.local` (local) and add the same keys in Vercel → Project → Settings → Environment Variables.

## Importing teams

Export the shortlisted participants from the event platform and shape it into this CSV (one row per member):

```csv
team_name,member_name,member_email,is_leader
Team Name,Leader Name,leader@email.com,yes
Team Name,Member 2 Name,member2@email.com,
```

```bash
node --env-file=.env.local scripts/import-teams.mjs data/finalists.csv --dry-run   # check first
node --env-file=.env.local scripts/import-teams.mjs data/finalists.csv             # import
```

- Writes `data/finalists-with-ids.csv` with every team's ID.
- Safe to re-run: teams that already exist (same name) are skipped.
- `data/*.csv` is git-ignored, so real participant data is never committed.

## Testing before go-live

1. Use `rzp_test_` keys. Add a test team from the admin page with **your own email** as one of the members.
2. Log in at `/finalist`, pay with Razorpay test UPI `success@razorpay` or card `4111 1111 1111 1111`.
3. Check: dashboard shows Paid, the mail arrives, the pass downloads, and scanning the QR opens `/finalist/verify` showing ✓.
4. For webhook testing on localhost, use the Vercel preview URL (webhooks need a public URL).
5. Go live: swap to `rzp_live_` keys + a live-mode webhook, then delete the test teams.

## At the venue

Open **/admin/scan** on a phone (the live HTTPS site, so the camera works), log in with the admin password and pick the mode:

- **Registration check-in**: scan the member's pass → name, team and pass no. appear → look at the **entry pass, college ID card and Aadhaar card** (name and photo match the person) → tick the three boxes → **Confirm check-in**. No ID numbers are typed or stored.
- **A food/snack token** (Day 1 Lunch, Snacks, …): scan → green **SERVE** or red **ALREADY USED**. Tokens work only after check-in, once per person.
- If a QR won't scan, type the pass number printed on the pass (e.g. `HS3-0042`).

Edit the schedule, food/snack tokens and the "what to bring" list in `lib/finalist/event.ts` (set `scheduleTentative: false` once timings are final).

## Edge cases handled
- Payment succeeded but the browser closed → webhook still marks the team paid and sends the mail.
- Checkout callback and webhook both arrive → the team is updated once and **one** mail is sent.
- Mail server down after payment → payment is still recorded; resend from the admin page ("Resend receipt").
- Wrong login code 5× → code locked; request a new one (max 1 code/minute).
- Anyone with only the Team ID can't log in: they also need a registered member email **and** access to that mailbox (OTP).
- Every member must have an email, unique within the team.
