"use client";

import { useMemo } from "react";
import { ButtonLink } from "@/components/ui";
import { getPrototypeState } from "@/lib/prototype/store";

export function EnquiryConfirmation() {
  const enquiryId =
    typeof window === "undefined"
      ? null
      : new URLSearchParams(window.location.search).get("enquiry") ??
        window.localStorage.getItem("gafferly:last-enquiry-id");
  const record = useMemo(() => {
    if (!enquiryId) return null;
    const state = getPrototypeState();
    return state.enquiries.find((enquiry) => enquiry.id === enquiryId) ?? null;
  }, [enquiryId]);

  if (!record) {
    return (
      <div className="surface mx-auto max-w-xl overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-[#132e3c]">We couldn&apos;t find that enquiry</h1>
        <p className="mt-2 text-sm text-[#50676d]">Please return to the request form and submit your details again.</p>
      </div>
    );
  }

  return (
    <div className="surface mx-auto max-w-xl overflow-hidden">
      <div className="bg-[#e6f0f0] px-6 py-8 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#087f83] text-2xl text-white">✓</div>
        <h1 className="text-2xl font-bold text-[#132e3c]">Your request has been sent</h1>
        <p className="mt-2 text-sm text-[#50676d]">BrightWash will review your photos and details before sending a quote.</p>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex justify-between border-b border-[#e4ebeb] pb-3 text-sm"><span className="text-[#50676d]">Reference</span><strong>{record.reference}</strong></div>
        <div className="flex justify-between border-b border-[#e4ebeb] pb-3 text-sm"><span className="text-[#50676d]">Customer</span><strong>{record.customer}</strong></div>
        <div className="flex justify-between border-b border-[#e4ebeb] pb-3 text-sm"><span className="text-[#50676d]">Job</span><strong>{record.jobType}</strong></div>
        <div className="flex justify-between border-b border-[#e4ebeb] pb-3 text-sm"><span className="text-[#50676d]">Photos</span><strong>{record.photoCount} supplied</strong></div>
        <p className="rounded-xl bg-[#f4f7f6] p-4 text-sm leading-6 text-[#50676d]">You will receive a quote link once the work has been reviewed. A booking is not confirmed until any required deposit is paid.</p>
        <ButtonLink href={`/dashboard/enquiries/${record.id}`} className="w-full">Switch to trader view</ButtonLink>
      </div>
    </div>
  );
}
