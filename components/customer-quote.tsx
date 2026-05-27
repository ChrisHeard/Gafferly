"use client";

import { useSyncExternalStore } from "react";
import { ButtonLink } from "@/components/ui";
import { getPrototypeState } from "@/lib/prototype/store";
import { currency } from "@/lib/utils";

function subscribe() { return () => undefined; }
function getSnapshot() { return JSON.stringify(getPrototypeState()); }
function getServerSnapshot() { return JSON.stringify(null); }

export function CustomerQuote({ enquiryId }: { enquiryId: string }) {
  const serialized = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const state = JSON.parse(serialized) as ReturnType<typeof getPrototypeState> | null;

  const quote = state?.quotes.find((item) => item.enquiryId === enquiryId);

  if (!quote || !quote.sentSnapshot) {
    return <div className="surface p-6 text-sm text-[#50676d]">This quote is not available yet. Ask BrightWash to send it first.</div>;
  }

  const sent = quote.sentSnapshot;

  return (
    <div className="surface overflow-hidden">
      <div className="border-b border-[#e2e9e8] bg-[#f7fafa] p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#087f83]">Quote {quote.quoteNumber}</p>
        <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div><h1 className="text-2xl font-bold text-[#132e3c]">Exterior cleaning quote</h1><p className="mt-1 text-sm text-[#50676d]">Prepared for {quote.customer}</p></div>
          <div className="text-sm text-[#50676d]">Valid until <strong className="text-[#132e3c]">{sent.validUntil}</strong></div>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-[#50676d]">Scope and pricing</h2>
        <div className="mt-4 divide-y divide-[#e5ecec]">
          {sent.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4 py-4 text-sm"><span>{item.description}</span><strong>{currency(item.price)}</strong></div>
          ))}
          <div className="flex justify-between py-5 text-lg font-bold"><span>Total</span><span>{currency(sent.total)}</span></div>
        </div>
        <div className="mt-5 rounded-xl border border-[#cae1df] bg-[#eef7f6] p-5">
          <div className="flex justify-between font-bold text-[#132e3c]"><span>Deposit to secure booking</span><span>{currency(sent.deposit)}</span></div>
          <p className="mt-2 text-sm text-[#50676d]">Remaining balance after completion: {currency(sent.balance)}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-[#50676d]">Notes</h2>
          <p className="mt-3 rounded-xl bg-[#f7fafa] p-4 text-sm leading-6 text-[#36545c]">{sent.notes}</p>
        </div>
        <label className="mt-7 flex items-start gap-3 text-sm leading-6 text-[#50676d]">
          <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 accent-[#087f83]" />
          I confirm the described scope of work and understand that the deposit is required before a booking is confirmed. Prototype wording only.
        </label>
        <ButtonLink href={`/quote/${enquiryId}/checkout`} className="mt-6 w-full">Accept quote and pay deposit</ButtonLink>
      </div>
    </div>
  );
}
