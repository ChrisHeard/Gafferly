import Link from "next/link";
import { Brand } from "@/components/brand";
import { DemoNotice } from "@/components/ui";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f7f6]">
      <DemoNotice />
      <header className="border-b border-[#d5dfdf] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Brand />
          <div className="flex items-center gap-4 text-sm font-semibold text-[#50676d]"><Link className="hidden hover:text-[#087f83] sm:block" href="/brightwash">View storefront</Link><span className="rounded-full bg-[#e6f0f0] px-3 py-2 text-[#132e3c]">BrightWash ▾</span></div>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-7 px-5 py-6 sm:px-8 lg:grid-cols-[13rem_1fr]">
        <nav className="surface flex h-fit gap-2 overflow-x-auto p-2 lg:block">
          {[['Overview', '/dashboard'], ['Enquiries', '/dashboard/enquiries'], ['Quotes', '/dashboard/enquiries/demo-001/create-quote'], ['Jobs', '/dashboard/jobs/demo-001']].map(([label, href]) => <Link key={label} className="block whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold text-[#36545c] hover:bg-[#e6f0f0] hover:text-[#087f83]" href={href}>{label}</Link>)}
        </nav>
        <section>{children}</section>
      </div>
    </div>
  );
}
