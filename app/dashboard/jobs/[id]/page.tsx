import { ButtonLink, StatusPill } from "@/components/ui";
import { demoQuote, timeline } from "@/lib/demo-data";
import { currency } from "@/lib/utils";

export default function JobPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#087f83]">Job record</p><h1 className="mt-2 text-3xl font-bold text-[#132e3c]">{demoQuote.customer}</h1><p className="mt-2 text-sm text-[#50676d]">{demoQuote.quoteNumber} · Block-paved driveway clean</p></div><StatusPill status="Deposit Paid" /></div>
      <div className="grid gap-5 lg:grid-cols-[1fr_21rem]">
        <article className="surface p-5 sm:p-6"><h2 className="text-lg font-bold text-[#132e3c]">Activity</h2><ol className="mt-5 space-y-0">{timeline.map((item, index) => <li key={item.event} className="relative flex gap-4 pb-6 last:pb-0"><div className="relative"><span className={`mt-1 block h-3 w-3 rounded-full ${index === timeline.length - 1 ? 'bg-emerald-500' : 'bg-[#087f83]'}`} />{index < timeline.length - 1 && <span className="absolute left-[5px] top-5 h-[calc(100%-12px)] w-px bg-[#d5dfdf]" />}</div><div className="-mt-1"><p className="font-bold text-[#132e3c]">{item.event}</p><p className="text-sm text-[#50676d]">{item.time} · {item.detail}</p></div></li>)}</ol></article>
        <aside className="surface h-fit p-5"><h2 className="font-bold text-[#132e3c]">Payment status</h2><div className="mt-5 rounded-xl bg-emerald-50 p-4"><p className="text-xs font-bold uppercase tracking-[.1em] text-emerald-700">Deposit received</p><p className="mt-2 text-3xl font-bold text-emerald-900">{currency(demoQuote.deposit)}</p></div><dl className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><dt className="text-[#50676d]">Quote total</dt><dd className="font-bold">{currency(demoQuote.total)}</dd></div><div className="flex justify-between"><dt className="text-[#50676d]">Balance due</dt><dd className="font-bold">{currency(demoQuote.balance)}</dd></div></dl><ButtonLink href="/dashboard" variant="secondary" className="mt-6 w-full">Back to dashboard</ButtonLink></aside>
      </div>
    </div>
  );
}
