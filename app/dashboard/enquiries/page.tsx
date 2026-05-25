import Link from "next/link";
import { StatusPill } from "@/components/ui";
import { enquiries } from "@/lib/demo-data";

export default function EnquiriesPage() {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#087f83]">Enquiries</p>
      <h1 className="mt-2 text-3xl font-bold text-[#132e3c]">Customer requests</h1>
      <div className="surface mt-7 overflow-hidden">
        <div className="hidden grid-cols-[1.2fr_1.3fr_.7fr_.75fr] gap-4 border-b border-[#e1e7e6] bg-[#fafcfc] p-4 text-xs font-bold uppercase tracking-[0.1em] text-[#50676d] sm:grid"><span>Customer</span><span>Job</span><span>Status</span><span>Received</span></div>
        {enquiries.map((enquiry) => <Link key={enquiry.id} href={`/dashboard/enquiries/${enquiry.id}`} className="grid gap-2 border-b border-[#edf1f1] p-4 last:border-0 hover:bg-[#f7fafa] sm:grid-cols-[1.2fr_1.3fr_.7fr_.75fr] sm:items-center"><div><p className="font-bold">{enquiry.customer}</p><p className="text-sm text-[#50676d]">{enquiry.postcode}</p></div><p className="text-sm">{enquiry.jobType}<span className="block text-[#50676d]">{enquiry.photoCount} photos</span></p><StatusPill status={enquiry.status} /><p className="text-sm text-[#50676d]">{enquiry.submitted}</p></Link>)}
      </div>
    </div>
  );
}
