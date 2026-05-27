import { Brand } from "@/components/brand";
import { CustomerQuote } from "@/components/customer-quote";
import { DemoNotice } from "@/components/ui";
import { demoTrader } from "@/lib/demo-data";

type Props = { params: Promise<{ id: string }> };

export default async function QuotePage({ params }: Props) {
  const { id } = await params;

  return (
    <main>
      <DemoNotice />
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5 sm:px-8"><Brand /><span className="text-sm font-semibold text-[#50676d]">{demoTrader.shortName}</span></header>
      <div className="mx-auto max-w-3xl px-5 pb-12 sm:px-8"><CustomerQuote enquiryId={id} /></div>
    </main>
  );
}
