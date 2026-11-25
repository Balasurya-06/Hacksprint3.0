# Finalist Portal: setup & runbook

Shortlisted teams log in with their **Team ID**, see their members, pay **₹300 × members** through Razorpay, get a confirmation mail and download their **entry pass** (with a QR code that volunteers scan at the gate).

## Pages

| URL | Who | What |
|---|---|---|
| `/finalist` | Teams | Enter Team ID → 6-digit code mailed to leader → log in |
| `/finalist/dashboard` | Teams | Members, shortlist status, pay, download entry pass |
| `/finalist/verify?t=…` | Gate volunteers | Opened by scanning the pass QR: shows ✓ Valid/Paid + member names |
| `/admin/finalists` | Organisers | All teams, paid/pending stats, search, CSV export, send/resend mails |

## Flow

1. Import shortlisted teams (CSV) → each team gets an ID like `VIGRON.K7Q2`.
2. Admin page → **Send Team ID mails** → each leader (members in CC) gets the shortlist mail with the Team ID.
3. Team logs in → dashboard → **Pay ₹N** → Razorpay Checkout.
4. Payment is confirmed on the server (checkout signature **and** webhook; whichever arrives first) → team marked **paid** → confirmation mail with receipt + entry QR.
5. Dashboard unlocks the entry pass PNG.

The amount is always calculated on the server from the member count. A team that has paid cannot pay again.

## Local demo mode (no accounts needed)

Running `npm run dev` with only `ADMIN_PASSWORD` and `SESSION_SECRET` in `.env.local`:
- **No `DATABASE_URL`** → built-in sample teams `UNIQUE.DEMO` (3 members) and `VIGRON.DEMO` (5 members), kept in memory and reset on restart.
- **No `SMTP_HOST`** → mails are printed in the dev terminal, and the login code is shown on screen.
- **No `RAZORPAY_KEY_ID`** → "Pay" simulates a successful payment.

Demo mode is never active in production (`next build` / Vercel): there, missing settings show a configuration error.

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
Unique,Arun Kumar,arun@example.com,yes
Unique,Divya R,divya@example.com,
Vigron,Priya M,priya@example.com,yes
```

```bash
node --env-file=.env.local scripts/import-teams.mjs data/finalists.csv --dry-run   # check first
node --env-file=.env.local scripts/import-teams.mjs data/finalists.csv             # import
```

- Writes `data/finalists-with-ids.csv` with every team's ID.
- Safe to re-run: teams that already exist (same name) are skipped.
- `data/*.csv` is git-ignored, so real participant data is never committed.

## Testing before go-live

1. Use `rzp_test_` keys. Import `data/finalists.sample.csv` with **your own email** as a leader.
2. Log in at `/finalist`, pay with Razorpay test UPI `success@razorpay` or card `4111 1111 1111 1111`.
3. Check: dashboard shows Paid, the mail arrives, the pass downloads, and scanning the QR opens `/finalist/verify` showing ✓.
4. For webhook testing on localhost, use the Vercel preview URL (webhooks need a public URL).
5. Go live: swap to `rzp_live_` keys + a live-mode webhook, then delete the test teams.

## Edge cases handled
- Payment succeeded but the browser closed → webhook still marks the team paid and sends the mail.
- Checkout callback and webhook both arrive → the team is updated once and **one** mail is sent.
- Mail server down after payment → payment is still recorded; resend from the admin page ("Resend receipt").
- Wrong login code 5× → code locked; request a new one (max 1 code/minute).
- Anyone with only the Team ID can't log in without the leader's mailbox.
