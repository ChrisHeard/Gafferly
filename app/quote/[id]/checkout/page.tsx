import { Brand } from "@/components/brand";
import { ButtonLink, DemoNotice } from "@/components/ui";
import { demoQuote } from "@/lib/demo-data";
import { currency } from "@/lib/utils";

export default function CheckoutPage() {
  const stripeEnabled = process.env.ENABLE_STRIPE_TEST_CHECKOUT === "true" && Boolean(process.env.STRIPE_SECRET_KEY);
  return (
    <main>
      <DemoNotice />
      <header className="mx-auto max-w-xl px-5 py-5 sm:px-8"><Brand /></header>
      <div className="mx-auto max-w-xl px-5 pb-12 sm:px-8">
        <div className="surface overflow-hidden">
          <div className="bg-[#132e3c] p-6 text-white"><p className="text-xs font-bold uppercase tracking-[0.12em] text-white/65">Secure deposit payment</p><h1 className="mt-3 text-3xl font-bold">{currency(demoQuote.deposit)}</h1><p className="mt-1 text-sm text-white/70">BrightWash Exterior Cleaning · {demoQuote.quoteNumber}</p></div>
          <div className="space-y-5 p-6">
            <div className="rounded-xl border border-[#e1e7e6] p-4 text-sm"><div className="flex justify-between"><span className="text-[#50676d]">Deposit due today</span><strong>{currency(demoQuote.deposit)}</strong></div><div className="mt-3 flex justify-between"><span className="text-[#50676d]">Balance after work</span><strong>{currency(demoQuote.balance)}</strong></div></div>
            <div className="rounded-xl bg-[#f4f7f6] p-4 text-sm leading-6 text-[#50676d]">The default button below simulates successful payment so you can demonstrate the workflow safely.</div>
            <ButtonLink href="/quote/demo-001/payment-success?mode=mock" className="w-full">Simulate secure payment</ButtonLink>
            {stripeEnabled && <form action="/api/checkout/demo" method="post"><button className="min-h-12 w-full rounded-xl border border-[#087f83] bg-white px-4 text-sm font-bold text-[#087f83]">Open Stripe Checkout test mode</button></form>}
            <p className="text-center text-xs text-[#50676d]">No live card payment is taken in the default prototype journey.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
