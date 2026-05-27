# Gafferly prototype starter

A mobile-first demonstrator for Gafferly's initial workflow:

**Storefront → structured enquiry → trader inbox → trader-approved quote → customer acceptance → deposit demonstration**

The seeded trade business is **BrightWash Exterior Cleaning**, serving Bristol. The app contains a customer journey, trader dashboard and editable quote builder for trader demos.

## Prototype guardrails (important)

This is a demonstration prototype, not a production service.

- Do **not** use real customer enquiries yet.
- Do **not** upload real customer photos yet.
- Do **not** take real deposits yet.
- Do **not** present this as live payment processing.

The current flow is designed for guided meetings and product validation only.

## Run the prototype locally

Requirements: Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Primary demonstration routes

| Route | Purpose |
| --- | --- |
| `/brightwash` | Customer-facing storefront |
| `/brightwash/request-quote` | Structured enquiry form |
| `/dashboard` | Trader overview |
| `/dashboard/enquiries/<enquiry-id>` | Enquiry detail and Brenda summary |
| `/dashboard/enquiries/<enquiry-id>/create-quote` | Editable quote builder |
| `/quote/<enquiry-id>` | Customer quote view |
| `/quote/<enquiry-id>/checkout` | Demonstration checkout state |
| `/dashboard/jobs/<enquiry-id>` | Job record with deposit state |

## Demo state persistence and reset

The prototype stores demonstration data in browser `localStorage`, so submitted enquiries and quote/deposit state persist between page reloads in the same browser profile.

### Reset before each trader meeting

Use one of these options before a fresh demo:

1. **Quick browser reset**: clear site data for `http://localhost:3000` in DevTools/Application Storage.
2. **New clean session**: open the demo in a private/incognito window.
3. **Manual localStorage reset** (DevTools Console):

```js
localStorage.clear()
location.reload()
```

After reset, the seeded baseline data is shown again and you can run the script from a newly submitted enquiry.

## Stripe test checkout status

Stripe test checkout is no longer part of the **primary** demonstration path. The default script should stay on the prototype's internal demo payment state to keep sessions focused on workflow feedback.

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
3. Add secure backend handling before any real enquiry/photo usage.
4. Add verified payment architecture before any real deposit pilot.

See `docs/demo-script.md` and `docs/trader-feedback-log.csv` for demonstration support.
