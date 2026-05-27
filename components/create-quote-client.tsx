"use client";

import Link from "next/link";
import { QuoteBuilder } from "@/components/quote-builder";
import { usePrototypeStore } from "@/hooks/use-prototype-store";

export function CreateQuoteClient({ enquiryId }: { enquiryId: string }) {
  const { state } = usePrototypeStore();
  const enquiry = state.enquiries.find((item) => item.id === enquiryId) ?? null;

  if (!enquiry) {
    return (
      <div className="space-y-6">
        <Link href="/dashboard/enquiries" className="text-sm font-bold text-[#087f83]">← Back to enquiries</Link>
        <div className="surface p-6 text-sm text-[#50676d]">This enquiry is unavailable in the current prototype state.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href={`/dashboard/enquiries/${enquiry.id}`} className="text-sm font-bold text-[#087f83]">← Back to enquiry</Link>
      <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#087f83]">Quote draft</p><h1 className="mt-2 text-3xl font-bold text-[#132e3c]">Prepare quote for {enquiry.customer}</h1><p className="mt-2 text-sm text-[#50676d]">Set the commercial terms before previewing the customer-facing quote.</p></div>
      <QuoteBuilder enquiryId={enquiry.id} />
    </div>
  );
}
