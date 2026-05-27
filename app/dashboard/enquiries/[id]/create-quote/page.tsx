import Link from "next/link";
import { QuoteBuilder } from "@/components/quote-builder";
import { getEnquiry } from "@/lib/demo-data";

type Props = { params: Promise<{ id: string }> };
export default async function CreateQuotePage({ params }: Props) {
  const { id } = await params;
  const enquiry = getEnquiry(id);
  return (
    <div className="space-y-6">
      <Link href={`/dashboard/enquiries/${enquiry.id}`} className="text-sm font-bold text-[#087f83]">← Back to enquiry</Link>
      <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#087f83]">Quote draft</p><h1 className="mt-2 text-3xl font-bold text-[#132e3c]">Prepare quote for {enquiry.customer}</h1><p className="mt-2 text-sm text-[#50676d]">Set the commercial terms before previewing the customer-facing quote.</p></div>
      <QuoteBuilder enquiryId={enquiry.id} />
    </div>
  );
}
