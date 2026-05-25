import { Brand } from "@/components/brand";
import { DemoSurfacePhoto } from "@/components/demo-illustration";
import { ButtonLink, DemoNotice } from "@/components/ui";
import { demoTrader, services } from "@/lib/demo-data";

export default function StorefrontPage() {
  return (
    <main className="bg-white">
      <DemoNotice />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Brand />
        <ButtonLink href="/dashboard" variant="ghost" className="hidden sm:inline-flex">Trader view</ButtonLink>
      </header>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_25rem] lg:py-14">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-[#087f83]">{demoTrader.location}</p>
          <h1 className="text-4xl font-bold tracking-tight text-[#132e3c] sm:text-5xl">{demoTrader.name}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#50676d]">Get a clear quote for your driveway or patio clean. Send a few photos and we&apos;ll review the job without waiting for a site visit.</p>
          <ButtonLink href="/brightwash/request-quote" className="mt-8">Request a quote</ButtonLink>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {services.map((service) => <div key={service.name} className="rounded-2xl border border-[#e0e8e8] p-4"><h3 className="font-bold text-[#132e3c]">{service.name}</h3><p className="mt-1 text-sm leading-6 text-[#50676d]">{service.detail}</p></div>)}
          </div>
        </div>
        <aside>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <DemoSurfacePhoto />
            <DemoSurfacePhoto after />
          </div>
          <div className="mt-4 rounded-2xl bg-[#e6f0f0] p-5 text-sm leading-6 text-[#36545c]"><strong className="block text-[#132e3c]">Photos make quoting faster</strong>Include a wide shot and close-ups of moss, weeds or staining.</div>
        </aside>
      </section>
      <section className="bg-[#132e3c] px-5 py-10 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><h2 className="text-xl font-bold">Ready for a professional clean?</h2><p className="mt-1 text-sm text-white/75">Submit your details in under three minutes.</p></div><ButtonLink href="/brightwash/request-quote" className="bg-white text-[#132e3c] hover:bg-[#e6f0f0]">Get a quote</ButtonLink></div>
      </section>
    </main>
  );
}
