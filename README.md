# Gafferly prototype starter

A mobile-first demonstrator for Gafferly's initial workflow:

**Storefront → structured enquiry → trader inbox → trader-approved quote → customer acceptance → deposit demonstration**

The seeded trade business is **BrightWash Exterior Cleaning**, serving Bristol. The app contains a customer journey, trader dashboard, editable quote builder, simulated deposit completion, an optional Stripe Checkout test-mode endpoint and a draft Supabase schema for the later pilot foundation.

## What is intentionally mocked

This is a prototype for trader demonstrations. It does not yet provide authenticated trader accounts, production tenant isolation, private photograph persistence, live-payment webhooks, email delivery or production legal wording. Do not use it to receive real customer enquiries or payments until those controls are implemented and reviewed.

## Run locally

Requirements: Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and choose either the customer journey or the trader dashboard.

## Demo routes

| Route | Purpose |
| --- | --- |
| `/brightwash` | Customer-facing storefront |
| `/brightwash/request-quote` | Structured enquiry form |
| `/dashboard` | Trader overview |
| `/dashboard/enquiries/demo-001` | Seeded enquiry and Brenda summary |
| `/dashboard/enquiries/demo-001/create-quote` | Editable quote builder |
| `/quote/demo-001` | Customer quote view |
| `/quote/demo-001/checkout` | Mock checkout and optional Stripe test path |
| `/dashboard/jobs/demo-001` | Paid-deposit job state |

## Optional Stripe test-mode checkout

The default flow uses a mock payment confirmation. To try Stripe-hosted Checkout in **test mode only**:

1. Copy `.env.example` to `.env.local`.
2. Add a Stripe test secret key to `STRIPE_SECRET_KEY`.
3. Set `ENABLE_STRIPE_TEST_CHECKOUT=true`.
4. Restart the development server and open the checkout screen.

The server creates the test checkout amount from the seeded approved quote; the browser does not submit an amount. This is not yet a live-pilot payment implementation: there is no Stripe Connect onboarding or verified webhook reconciliation in this starter.

## Supabase foundation

`supabase/migrations/0001_initial_schema.sql` provides an initial organisation-scoped schema and RLS starting point. It deliberately does **not** permit anonymous customer enquiry inserts: implement intake through a validated server-side route with rate limiting/private media design before accepting personal data.

The `.env.example` fields and `lib/supabase/` client factories are present for the next stage of development, but the prototype pages run from seeded/demo browser state.

## Useful commands

```bash
npm run dev          # local development
npm run lint         # lint checks
npm run typecheck    # TypeScript validation
npm run build        # production build check
npm run test:e2e     # Playwright journey test; install browser once with npx playwright install
```

## Next implementation steps

1. Show the prototype to prospective pressure-washing/exterior-cleaning pilot traders.
2. Refine enquiry fields, add-ons and deposit rules from their feedback.
3. Wire Supabase authentication, tenant-scoped records and private media handling.
4. Add Stripe Connect and webhook-backed payment state before any live deposit pilot.

See `docs/demo-script.md` and `docs/trader-feedback-log.csv` for demonstration support.
