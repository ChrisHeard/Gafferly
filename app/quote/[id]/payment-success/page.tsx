"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { Brand } from "@/components/brand";
import { ButtonLink, DemoNotice } from "@/components/ui";
import { usePrototypeStore } from "@/hooks/use-prototype-store";
import { completeMockPayment } from "@/lib/prototype/store";
import { currency } from "@/lib/utils";

export default function PaymentSuccessPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const { state } = usePrototypeStore();

  const paymentId = searchParams.get("paymentId");

  const payment = useMemo(() => {
    if (!paymentId) return null;

    try {
      return completeMockPayment(paymentId);
    } catch {
      return state.payments.find((item) => item.id === paymentId) ?? null;
    }
  }, [paymentId, state.payments]);

  const quote = useMemo(() => state.quotes.find((item) => item.enquiryId === params.id), [params.id, state.quotes]);

  if (!quote?.sentSnapshot || !payment) {
    return (
      <main>
        <DemoNotice />
        <header className="mx-auto max-w-xl px-5 py-5 sm:px-8"><Brand /></header>
        <div className="mx-auto max-w-xl px-5 pb-12 sm:px-8"><div className="surface p-7 text-sm text-[#50676d]">Payment details are unavailable. Return to checkout and simulate payment again.</div></div>
      </main>
    );
  }

  const sentQuote = quote.sentSnapshot;

  return (
    <main>
      <DemoNotice />
      <header className="mx-auto max-w-xl px-5 py-5 sm:px-8"><Brand /></header>
      <div className="mx-auto max-w-xl px-5 pb-12 sm:px-8">
        <div className="surface p-7 text-center sm:p-10">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-700">✓</div>
          <h1 className="mt-5 text-3xl font-bold text-[#132e3c]">Deposit received</h1>
          <p className="mt-3 text-sm leading-6 text-[#50676d]">Your {currency(payment.amount)} deposit has been recorded. BrightWash will contact you to confirm the booking date.</p>
          <div className="my-7 rounded-xl bg-[#f4f7f6] p-4 text-left text-sm">
            <div className="flex justify-between"><span className="text-[#50676d]">Quote reference</span><strong>{quote.quoteNumber}</strong></div>
            <div className="mt-3 flex justify-between"><span className="text-[#50676d]">Payment reference</span><strong>{payment.reference}</strong></div>
            <div className="mt-3 flex justify-between"><span className="text-[#50676d]">Deposit paid</span><strong>{currency(payment.amount)}</strong></div>
            <div className="mt-3 flex justify-between"><span className="text-[#50676d]">Quote total</span><strong>{currency(sentQuote.total)}</strong></div>
            <div className="mt-3 flex justify-between"><span className="text-[#50676d]">Balance due after work</span><strong>{currency(sentQuote.balance)}</strong></div>
          </div>
          <ButtonLink href="/dashboard/jobs/demo-001" className="w-full">Return to trader dashboard</ButtonLink>
        </div>
      </div>
    </main>
  );
}
