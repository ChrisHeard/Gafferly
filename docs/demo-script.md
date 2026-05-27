# Trader demonstration script (5 minutes)

Use this as a fast, repeatable walkthrough for discovery calls.

## Before the meeting (30–60 seconds)

1. Run the app with `npm run dev`.
2. Confirm you are on `http://localhost:3000`.
3. Reset demo state so the walkthrough starts clean:
   - Clear site data for `localhost:3000`, or
   - Open a fresh private/incognito window, or
   - In DevTools Console run:

```js
localStorage.clear()
location.reload()
```

4. Remind the trader that this is a prototype and must not yet be used for real enquiries, real photos or real deposits.

## Five-minute flow

### 0:00–1:30 — Submit a new enquiry live

1. Open `/brightwash` on a phone-sized viewport.
2. Explain this is the customer entry point.
3. Go to `/brightwash/request-quote` and complete the form with a fresh scenario (do not rely only on seeded data).
4. Add a demonstration photo only.
5. Submit and confirm the enquiry is accepted.

Talking point: “This new enquiry is now available in the trader workflow and persists in this browser session.”

### 1:30–3:00 — Review in trader dashboard

1. Switch to `/dashboard`.
2. Open the newly submitted enquiry from the list (not just `demo-001`).
3. Show the structured data and Brenda summary panel.
4. Clarify Brenda is advisory support, not a guaranteed automated decision.

### 3:00–4:15 — Create and share quote

1. Open **Create quote** for that same new enquiry.
2. Edit one line item and the deposit value to reflect trader preference.
3. Preview via `/quote/<enquiry-id>` and show what the customer sees.

### 4:15–5:00 — Demonstrate deposit state transition

1. Open `/quote/<enquiry-id>/checkout` and run the built-in demo checkout confirmation.
2. Return to `/dashboard/jobs/<enquiry-id>` and show the **Deposit Paid** state.
3. State explicitly that this is demonstration state, not live payment processing.

## Important scope notes to say out loud

- Browser data persists using `localStorage` until reset.
- Stripe test checkout is no longer in the primary walkthrough path.
- Do not collect real customer data or money in this prototype phase.

## Discovery questions after walkthrough

- Would this capture enough detail for you to quote without a site visit?
- Which enquiry fields are missing, unclear or unnecessary?
- What default add-ons should appear for your typical jobs?
- How do you decide deposit amount (fixed vs percentage)?
- What would block you from trialling this once security and payment controls are complete?
