"use client";

import Link from "next/link";

import { DashboardRecentEnquiries } from "@/components/dashboard-enquiries-client";
import { usePrototypeStore } from "@/hooks/use-prototype-store";
import { selectDashboardMetrics } from "@/lib/prototype/selectors";
import { currency } from "@/lib/utils";

export default function DashboardPage() {
  const { state } = usePrototypeStore();
  const metrics = selectDashboardMetrics(state);

  return (
    <div className="space-y-6">
      <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#087f83]">Dashboard</p><h1 className="mt-2 text-3xl font-bold text-[#132e3c]">Good morning, BrightWash</h1><p className="mt-2 text-sm text-[#50676d]">Prototype metrics now reflect real enquiry, quote and deposit actions.</p></div>
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          ["New enquiries", String(metrics.newEnquiries)],
          ["Quotes sent", String(metrics.quotesSent)],
          ["Succeeded deposits", String(metrics.succeededDeposits)],
          ["Deposit value received", currency(metrics.totalDepositValueReceived)],
        ].map(([label, value]) => <div className="surface p-5" key={label}><p className="text-sm text-[#50676d]">{label}</p><p className="mt-2 text-3xl font-bold text-[#132e3c]">{value}</p></div>)}
      </div>
      <div className="surface overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#e1e7e6] p-5"><h2 className="font-bold text-[#132e3c]">Recent enquiries</h2><Link className="text-sm font-bold text-[#087f83]" href="/dashboard/enquiries">View all</Link></div>
        <DashboardRecentEnquiries />
      </div>
    </div>
  );
}
