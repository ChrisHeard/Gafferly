import Link from "next/link";
import { DashboardRecentEnquiries } from "@/components/dashboard-enquiries-client";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#087f83]">Dashboard</p><h1 className="mt-2 text-3xl font-bold text-[#132e3c]">Good morning, BrightWash</h1><p className="mt-2 text-sm text-[#50676d]">Three enquiries require attention. One deposit has been received today.</p></div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[['New enquiries', '3'], ['Quotes sent', '7'], ['Deposits this month', '£480']].map(([label, value]) => <div className="surface p-5" key={label}><p className="text-sm text-[#50676d]">{label}</p><p className="mt-2 text-3xl font-bold text-[#132e3c]">{value}</p></div>)}
      </div>
      <div className="surface overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#e1e7e6] p-5"><h2 className="font-bold text-[#132e3c]">Recent enquiries</h2><Link className="text-sm font-bold text-[#087f83]" href="/dashboard/enquiries">View all</Link></div>
        <DashboardRecentEnquiries />
      </div>
    </div>
  );
}
