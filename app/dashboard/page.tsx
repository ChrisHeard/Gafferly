"use client";

import Link from "next/link";
import { useState } from "react";

import { DashboardRecentEnquiries } from "@/components/dashboard-enquiries-client";
import { usePrototypeStore } from "@/hooks/use-prototype-store";
import { selectDashboardMetrics } from "@/lib/prototype/selectors";
import { currency } from "@/lib/utils";

export default function DashboardPage() {
  const { state, resetPrototype } = usePrototypeStore();
  const metrics = selectDashboardMetrics(state);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleReset = () => {
    resetPrototype();
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#087f83]">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-[#132e3c]">Good morning, BrightWash</h1>
          <p className="mt-2 text-sm text-[#50676d]">Prototype metrics now reflect real enquiry, quote and deposit actions.</p>
        </div>
        <button
          className="rounded-full border border-[#d2dddc] px-3 py-1.5 text-xs font-bold text-[#50676d] transition hover:border-[#9db8b6] hover:text-[#36545c]"
          onClick={() => setIsResetConfirmOpen((open) => !open)}
          type="button"
        >
          Reset demo data
        </button>
      </div>

      {isResetConfirmOpen ? (
        <div className="surface border border-[#dce8e7] p-4">
          <p className="text-sm font-bold text-[#132e3c]">Reset demonstration data?</p>
          <p className="mt-2 text-sm text-[#50676d]">
            This restores the seeded BrightWash prototype state. Submitted mock enquiries and mock payment activity will be removed.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded-full bg-[#087f83] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#066a6d]"
              onClick={handleReset}
              type="button"
            >
              Confirm reset
            </button>
            <button
              className="rounded-full border border-[#d2dddc] px-4 py-2 text-xs font-bold text-[#50676d] transition hover:border-[#9db8b6] hover:text-[#36545c]"
              onClick={() => setIsResetConfirmOpen(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          ["New enquiries", String(metrics.newEnquiries)],
          ["Quotes sent", String(metrics.quotesSent)],
          ["Succeeded deposits", String(metrics.succeededDeposits)],
          ["Deposit value received", currency(metrics.totalDepositValueReceived)],
        ].map(([label, value]) => (
          <div className="surface p-5" key={label}>
            <p className="text-sm text-[#50676d]">{label}</p>
            <p className="mt-2 text-3xl font-bold text-[#132e3c]">{value}</p>
          </div>
        ))}
      </div>
      <div className="surface overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#e1e7e6] p-5">
          <h2 className="font-bold text-[#132e3c]">Recent enquiries</h2>
          <Link className="text-sm font-bold text-[#087f83]" href="/dashboard/enquiries">
            View all
          </Link>
        </div>
        <DashboardRecentEnquiries />
      </div>
    </div>
  );
}
