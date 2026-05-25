import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { demoQuote } from "@/lib/demo-data";

export async function POST(request: NextRequest) {
  const enabled = process.env.ENABLE_STRIPE_TEST_CHECKOUT === "true";
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
  if (!enabled || !secretKey) {
    return NextResponse.redirect(new URL("/quote/demo-001/payment-success?mode=mock", siteUrl), 303);
  }
  const stripe = new Stripe(secretKey);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ quantity: 1, price_data: { currency: "gbp", unit_amount: demoQuote.deposit, product_data: { name: `Deposit for ${demoQuote.quoteNumber}`, description: "Prototype test-mode payment only" } } }],
    metadata: { quote_id: demoQuote.id, quote_number: demoQuote.quoteNumber, prototype: "true" },
    success_url: `${siteUrl}/quote/demo-001/payment-success?mode=stripe-test&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/quote/demo-001/checkout`,
  });
  if (!session.url) return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 502 });
  return NextResponse.redirect(session.url, 303);
}
