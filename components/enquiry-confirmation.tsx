"use client";

import { useSyncExternalStore } from "react";
import { ButtonLink } from "@/components/ui";

type StoredEnquiry = { customer?: string; jobType?: string; postcode?: string; photos?: string[]; addOns?: string[] };

function subscribe() { return () => undefined; }
function getEnquirySnapshot() { return sessionStorage.getItem("gafferly_enquiry") ?? "{}"; }
function getServerEnquirySnapshot() { return "{}"; }

export function EnquiryConfirmation() {
  const serialized = useSyncExternalStore(subscribe, getEnquirySnapshot, getServerEnquirySnapshot);
  const record: StoredEnquiry = JSON.parse(serialized);
  return (
    <div className="surface mx-auto max-w-xl overflow-hidden">
      <div className="bg-[#e6f0f0] px-6 py-8 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#087f83] text-2xl text-white">✓</div>
        <h1 className="text-2xl font-bold text-[#132e3c]">Your request has been sent</h1>
        <p className="mt-2 text-sm text-[#50676d]">BrightWash will review your photos and details before sending a quote.</p>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex justify-between border-b border-[#e4ebeb] pb-3 text-sm"><span className="text-[#50676d]">Reference</span><strong>BW-ENQ-0147</strong></div>
        <div className="flex justify-between border-b border-[#e4ebeb] pb-3 text-sm"><span className="text-[#50676d]">Customer</span><strong>{record.customer || "Sarah Mitchell"}</strong></div>
        <div className="flex justify-between border-b border-[#e4ebeb] pb-3 text-sm"><span className="text-[#50676d]">Job</span><strong>{record.jobType || "Driveway cleaning"}</strong></div>
        <div className="flex justify-between border-b border-[#e4ebeb] pb-3 text-sm"><span className="text-[#50676d]">Photos</span><strong>{record.photos?.length ?? 3} supplied</strong></div>
        <p className="rounded-xl bg-[#f4f7f6] p-4 text-sm leading-6 text-[#50676d]">You will receive a quote link once the work has been reviewed. A booking is not confirmed until any required deposit is paid.</p>
        <ButtonLink href="/dashboard/enquiries/demo-001" className="w-full">Switch to trader view</ButtonLink>
      </div>
    </div>
  );
}
