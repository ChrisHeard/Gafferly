"use client";

import Link from "next/link";
import { useMemo } from "react";
import { PhotoThumb } from "@/components/demo-illustration";
import { StatusPill } from "@/components/ui";
import { getPrototypeState } from "@/lib/prototype/store";
import { buildBrendaMissingInformation, buildBrendaSummary } from "@/lib/prototype/brenda";

const toDisplayStatus = (status: string) =>
  status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const formatSubmitted = (submittedAt: string) => {
  const date = new Date(submittedAt);
  return Number.isNaN(date.valueOf()) ? "Unknown" : date.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
};

export function DashboardRecentEnquiries() {
  const enquiries = useMemo(() => getPrototypeState().enquiries, []);

  return (
    <>
      {enquiries.map((enquiry) => (
        <Link
          key={enquiry.id}
          href={`/dashboard/enquiries/${enquiry.id}`}
          className="flex flex-col justify-between gap-3 border-b border-[#edf1f1] p-5 last:border-0 hover:bg-[#fafcfc] sm:flex-row sm:items-center"
        >
          <div>
            <p className="font-bold text-[#132e3c]">{enquiry.customer}</p>
            <p className="mt-1 text-sm text-[#50676d]">
              {enquiry.jobType} · {enquiry.postcode} · {enquiry.photoCount} photos
            </p>
          </div>
          <div className="flex items-center gap-4">
            <StatusPill status={toDisplayStatus(enquiry.status)} />
            <span className="text-xs text-[#50676d]">{formatSubmitted(enquiry.submittedAt)}</span>
          </div>
        </Link>
      ))}
    </>
  );
}

export function EnquiryDetailClient({ id }: { id: string }) {
  const enquiry = useMemo(() => getPrototypeState().enquiries.find((item) => item.id === id) ?? null, [id]);
  const brendaSummary = enquiry ? buildBrendaSummary(enquiry) : "";
  const brendaMissing = enquiry ? buildBrendaMissingInformation(enquiry) : "";

  if (!enquiry) {
    return (
      <div className="space-y-5">
        <Link href="/dashboard/enquiries" className="text-sm font-bold text-[#087f83]">← Enquiries</Link>
        <article className="surface p-6">
          <h1 className="text-2xl font-bold text-[#132e3c]">Enquiry not found</h1>
          <p className="mt-2 text-sm text-[#50676d]">
            No enquiry exists for ID <code className="rounded bg-[#f2f6f6] px-2 py-1">{id}</code>. Please return to the enquiries list.
          </p>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Link href="/dashboard/enquiries" className="text-sm font-bold text-[#087f83]">← Enquiries</Link>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h1 className="text-3xl font-bold text-[#132e3c]">{enquiry.customer}</h1><p className="mt-1 text-sm text-[#50676d]">{enquiry.jobType} · {enquiry.postcode} · Received {formatSubmitted(enquiry.submittedAt)}</p></div><StatusPill status={toDisplayStatus(enquiry.status)} /></div>
      <div className="grid gap-5 lg:grid-cols-[1fr_21rem]">
        <div className="space-y-5">
          <article className="surface p-5 sm:p-6"><h2 className="text-lg font-bold text-[#132e3c]">Customer request</h2><dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">{[["Work type", enquiry.jobType], ["Approximate size", enquiry.size], ["Condition", enquiry.condition], ["Access", enquiry.access], ["Requested extras", enquiry.addOns.join(', ') || 'None'], ["Notes", enquiry.notes]].map(([label, value]) => <div key={label}><dt className="mb-1 text-xs font-bold uppercase tracking-[.09em] text-[#50676d]">{label}</dt><dd className="leading-6">{value}</dd></div>)}</dl></article>
          <article className="surface p-5 sm:p-6"><h2 className="text-lg font-bold text-[#132e3c]">Photos supplied</h2><div className="mt-4 grid gap-3 sm:grid-cols-3">{Array.from({ length: enquiry.photoCount }).map((_, index) => <PhotoThumb key={index} index={index + 1} />)}</div></article>
        </div>
        <aside className="space-y-5">
          <article className="surface border-[#bfdcdb] bg-[#f0f8f7] p-5"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#087f83]">Brenda · front desk</p><h2 className="mt-3 font-bold text-[#132e3c]">Enquiry summary</h2><p className="mt-2 text-sm leading-6 text-[#36545c]">{brendaSummary}</p><h3 className="mt-5 text-sm font-bold text-[#132e3c]">Missing detail to confirm</h3><p className="mt-2 text-sm leading-6 text-[#36545c]">{brendaMissing}</p><p className="mt-4 border-t border-[#d5e6e5] pt-4 text-xs text-[#50676d]">Prototype assistance only. Advisory notes must be reviewed by the trader. Brenda does not set prices or promise quotes.</p></article>
          <Link href={`/dashboard/enquiries/${enquiry.id}/create-quote`} className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#087f83] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#096467]">Create quote</Link>
          <Link href="#" className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-[#cedcdd] bg-white px-5 py-3 text-sm font-bold text-[#17323b] transition hover:border-[#087f83]">Request more information</Link>
        </aside>
      </div>
    </div>
  );
}
