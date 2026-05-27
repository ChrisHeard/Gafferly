import { FullEnquiriesList } from "@/components/dashboard-enquiries-client";

export default function EnquiriesPage() {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#087f83]">Enquiries</p>
      <h1 className="mt-2 text-3xl font-bold text-[#132e3c]">Customer requests</h1>
      <div className="surface mt-7 overflow-hidden">
        <div className="hidden grid-cols-[1.2fr_1.3fr_.7fr_.75fr] gap-4 border-b border-[#e1e7e6] bg-[#fafcfc] p-4 text-xs font-bold uppercase tracking-[0.1em] text-[#50676d] sm:grid"><span>Customer</span><span>Job</span><span>Status</span><span>Received</span></div>
        <FullEnquiriesList />
      </div>
    </div>
  );
}
