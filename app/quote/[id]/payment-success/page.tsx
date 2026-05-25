import { Brand } from "@/components/brand";
import { ButtonLink, DemoNotice } from "@/components/ui";
import { demoQuote } from "@/lib/demo-data";
import { currency } from "@/lib/utils";

export default function PaymentSuccessPage() {
  return (
    <main>
      <DemoNotice />
      <header className="mx-auto max-w-xl px-5 py-5 sm:px-8"><Brand /></header>
      <div className="mx-auto max-w-xl px-5 pb-12 sm:px-8">
        <div className="surface p-7 text-center sm:p-10">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-700">✓</div>
          <h1 className="mt-5 text-3xl font-bold text-[#132e3c]">Deposit received</h1>
          <p className="mt-3 text-sm leading-6 text-[#50676d]">Your {currency(demoQuote.deposit)} deposit has been recorded. BrightWash will contact you to confirm the booking date.</p>
          <div className="my-7 rounded-xl bg-[#f4f7f6] p-4 text-left text-sm"><div className="flex justify-between"><span className="text-[#50676d]">Reference</span><strong>{demoQuote.quoteNumber}</strong></div><div className="mt-3 flex justify-between"><span className="text-[#50676d]">Balance due after work</span><strong>{currency(demoQuote.balance)}</strong></div></div>
          <ButtonLink href="/dashboard/jobs/demo-001" className="w-full">Return to trader dashboard</ButtonLink>
        </div>
      </div>
    </main>
  );
}
