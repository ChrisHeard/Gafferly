"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Brand } from "@/components/brand";
import { ButtonLink, DemoNotice } from "@/components/ui";
import { usePrototypeStore } from "@/hooks/use-prototype-store";
import { createMockPayment } from "@/lib/prototype/store";
import { currency } from "@/lib/utils";

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { state } = usePrototypeStore();
  const [error, setError] = useState<string | null>(null);

  const quote = useMemo(() => state.quotes.find((item) => item.enquiryId === params.id), [params.id, state.quotes]);

  if (!quote?.sentSnapshot) {
    return (
      <main>
        <DemoNotice />
        <header className="mx-auto max-w-xl px-5 py-5 sm:px-8"><Brand /></header>
        <div className="mx-auto max-w-xl px-5 pb-12 sm:px-8">
          <div className="surface p-6 text-sm text-[#50676d]">This checkout is unavailable until a quote has been sent and accepted.</div>
        </div>
      </main>
    );
  }

  const sentQuote = quote.sentSnapshot;
  const checkoutAllowed = quote.status === "accepted";

  return (
    <main>
      <DemoNotice />
      <header className="mx-auto max-w-xl px-5 py-5 sm:px-8"><Brand /></header>
      <div className="mx-auto max-w-xl px-5 pb-12 sm:px-8">
        <div className="surface overflow-hidden">
          <div className="bg-[#132e3c] p-6 text-white"><p className="text-xs font-bold uppercase tracking-[0.12em] text-white/65">Secure deposit payment</p><h1 className="mt-3 text-3xl font-bold">{currency(sentQuote.deposit)}</h1><p className="mt-1 text-sm text-white/70">BrightWash Exterior Cleaning · {quote.quoteNumber}</p></div>
          <div className="space-y-5 p-6">
            <div className="rounded-xl border border-[#e1e7e6] p-4 text-sm">
              <div className="flex justify-between"><span className="text-[#50676d]">Deposit due today</span><strong>{currency(sentQuote.deposit)}</strong></div>
              <div className="mt-3 flex justify-between"><span className="text-[#50676d]">Quote total</span><strong>{currency(sentQuote.total)}</strong></div>
              <div className="mt-3 flex justify-between"><span className="text-[#50676d]">Balance after work</span><strong>{currency(sentQuote.balance)}</strong></div>
            </div>
            <div className="rounded-xl bg-[#f4f7f6] p-4 text-sm leading-6 text-[#50676d]">The button below simulates successful payment so you can demonstrate the workflow safely.</div>
            <button
              type="button"
              disabled={!checkoutAllowed}
              onClick={() => {
                setError(null);

                try {
                  const createdPayment = createMockPayment(quote.id);
                  router.push(`/quote/${params.id}/payment-success?paymentId=${createdPayment.id}`);
                } catch (caughtError) {
                  setError(caughtError instanceof Error ? caughtError.message : "Unable to create payment");
                }
              }}
              className="min-h-12 w-full rounded-xl bg-[#087f83] px-4 text-sm font-bold text-white transition hover:bg-[#066d70] disabled:cursor-not-allowed disabled:bg-[#90bcbc]"
            >
              {checkoutAllowed ? "Simulate secure payment" : "Accept the quote to continue"}
            </button>
            {error ? <p className="text-xs text-rose-700">{error}</p> : null}
            {!checkoutAllowed ? <p className="text-center text-xs text-[#50676d]">Checkout is only available after quote acceptance.</p> : null}
            <ButtonLink href={`/quote/${params.id}`} className="w-full">Back to quote</ButtonLink>
          </div>
        </div>
      </div>
    </main>
  );
}
