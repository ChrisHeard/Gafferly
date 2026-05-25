import Link from "next/link";
import { RequestQuoteForm } from "@/components/request-quote-form";
import { DemoNotice } from "@/components/ui";

export default function RequestQuotePage() {
  return (
    <main>
      <DemoNotice />
      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8">
        <Link href="/brightwash" className="text-sm font-bold text-[#087f83]">← Back to BrightWash</Link>
        <div className="mb-7 mt-6"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#087f83]">Request a quote</p><h1 className="mt-2 text-3xl font-bold text-[#132e3c]">Tell us about the job</h1><p className="mt-2 text-sm leading-6 text-[#50676d]">Provide enough detail for the trader to review your request and prepare a reliable quote.</p></div>
        <RequestQuoteForm />
      </div>
    </main>
  );
}
