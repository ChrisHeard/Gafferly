"use client";

import { ButtonLink, StatusPill } from "@/components/ui";
import { usePrototypeStore } from "@/hooks/use-prototype-store";
import { selectJobTimeline } from "@/lib/prototype/selectors";
import { currency } from "@/lib/utils";

const formatDateTime = (value: string) => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" }).format(new Date(value));

export function JobDetailClient({ enquiryId }: { enquiryId: string }) {
  const { state } = usePrototypeStore();
  const enquiry = state.enquiries.find((item) => item.id === enquiryId);
  const quote = state.quotes.find((item) => item.enquiryId === enquiryId);
  const timeline = selectJobTimeline(state, enquiryId);
  const payment = quote ? state.payments.find((item) => item.quoteId === quote.id && item.status === "succeeded") : null;

  if (!enquiry || !quote?.sentSnapshot) return <div className="surface p-5 text-sm text-[#50676d]">This job record is unavailable in the current prototype state.</div>;

  return <div className="space-y-6"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#087f83]">Job record</p><h1 className="mt-2 text-3xl font-bold text-[#132e3c]">{enquiry.customer}</h1><p className="mt-2 text-sm text-[#50676d]">{quote.quoteNumber} · {enquiry.jobType}</p></div><StatusPill status="Deposit Paid" /></div><div className="grid gap-5 lg:grid-cols-[1fr_21rem]"><article className="surface p-5 sm:p-6"><h2 className="text-lg font-bold text-[#132e3c]">Activity</h2><ol className="mt-5 space-y-0">{timeline.map((item, index) => <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0"><div className="relative"><span className={`mt-1 block h-3 w-3 rounded-full ${index === timeline.length - 1 ? "bg-emerald-500" : "bg-[#087f83]"}`} />{index < timeline.length - 1 && <span className="absolute left-[5px] top-5 h-[calc(100%-12px)] w-px bg-[#d5dfdf]" />}</div><div className="-mt-1"><p className="font-bold text-[#132e3c]">{item.label}</p><p className="text-sm text-[#50676d]">{formatDateTime(item.occurredAt)} · {item.detail}</p></div></li>)}</ol></article><aside className="surface h-fit p-5"><h2 className="font-bold text-[#132e3c]">Payment status</h2><div className="mt-5 rounded-xl bg-emerald-50 p-4"><p className="text-xs font-bold uppercase tracking-[.1em] text-emerald-700">Deposit received</p><p className="mt-2 text-3xl font-bold text-emerald-900">{currency(payment?.amount ?? quote.sentSnapshot.deposit)}</p></div><dl className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><dt className="text-[#50676d]">Quote total</dt><dd className="font-bold">{currency(quote.sentSnapshot.total)}</dd></div><div className="flex justify-between"><dt className="text-[#50676d]">Balance due</dt><dd className="font-bold">{currency(quote.sentSnapshot.balance)}</dd></div></dl><ButtonLink href="/dashboard" variant="secondary" className="mt-6 w-full">Back to dashboard</ButtonLink></aside></div></div>;
}
