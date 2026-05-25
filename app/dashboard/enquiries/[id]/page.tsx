import Link from "next/link";
import { PhotoThumb } from "@/components/demo-illustration";
import { ButtonLink, StatusPill } from "@/components/ui";
import { getEnquiry } from "@/lib/demo-data";

type Props = { params: Promise<{ id: string }> };
export default async function EnquiryPage({ params }: Props) {
  const { id } = await params;
  const enquiry = getEnquiry(id);
  return (
    <div className="space-y-5">
      <Link href="/dashboard/enquiries" className="text-sm font-bold text-[#087f83]">← Enquiries</Link>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h1 className="text-3xl font-bold text-[#132e3c]">{enquiry.customer}</h1><p className="mt-1 text-sm text-[#50676d]">{enquiry.jobType} · {enquiry.postcode} · Received {enquiry.submitted}</p></div><StatusPill status={enquiry.status} /></div>
      <div className="grid gap-5 lg:grid-cols-[1fr_21rem]">
        <div className="space-y-5">
          <article className="surface p-5 sm:p-6"><h2 className="text-lg font-bold text-[#132e3c]">Customer request</h2><dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">{[['Work type', enquiry.jobType], ['Approximate size', enquiry.size], ['Condition', enquiry.condition], ['Access', enquiry.access], ['Requested extras', enquiry.addOns.join(', ') || 'None'], ['Notes', enquiry.notes]].map(([label, value]) => <div key={label}><dt className="mb-1 text-xs font-bold uppercase tracking-[.09em] text-[#50676d]">{label}</dt><dd className="leading-6">{value}</dd></div>)}</dl></article>
          <article className="surface p-5 sm:p-6"><h2 className="text-lg font-bold text-[#132e3c]">Photos supplied</h2><div className="mt-4 grid gap-3 sm:grid-cols-3">{Array.from({ length: enquiry.photoCount }).map((_, index) => <PhotoThumb key={index} index={index + 1} />)}</div></article>
        </div>
        <aside className="space-y-5">
          <article className="surface border-[#bfdcdb] bg-[#f0f8f7] p-5"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#087f83]">Brenda · front desk</p><h2 className="mt-3 font-bold text-[#132e3c]">Enquiry summary</h2><p className="mt-2 text-sm leading-6 text-[#36545c]">{enquiry.summary}</p><h3 className="mt-5 text-sm font-bold text-[#132e3c]">Missing detail to confirm</h3><p className="mt-2 text-sm leading-6 text-[#36545c]">{enquiry.missing}</p><p className="mt-4 border-t border-[#d5e6e5] pt-4 text-xs text-[#50676d]">Mock assistance panel. Trader must review and set all prices.</p></article>
          <ButtonLink href={`/dashboard/enquiries/${enquiry.id}/create-quote`} className="w-full">Create quote</ButtonLink>
          <ButtonLink href="#" variant="secondary" className="w-full">Request more information</ButtonLink>
        </aside>
      </div>
    </div>
  );
}
