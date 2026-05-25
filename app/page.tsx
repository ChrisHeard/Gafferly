import { Brand } from "@/components/brand";
import { ButtonLink, DemoNotice, SectionTitle } from "@/components/ui";

export default function Home() {
  return (
    <main>
      <DemoNotice />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Brand />
        <span className="hidden rounded-full bg-white px-4 py-2 text-xs font-bold text-[#50676d] sm:inline-block">Initial workflow prototype</span>
      </header>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1fr_25rem] lg:pt-16">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-[#087f83]">Gafferly</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-[#132e3c] sm:text-6xl">You&apos;re the gaffer.<br />We&apos;ll handle the admin.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#50676d]">A mobile-first demonstration of the customer enquiry, trader-approved quote and deposit workflow for small trade businesses.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/brightwash">Start customer journey</ButtonLink>
            <ButtonLink href="/dashboard" variant="secondary">Open trader dashboard</ButtonLink>
          </div>
        </div>
        <div className="surface p-6">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#087f83]">Demo flow</p>
          <ol className="mt-5 space-y-5">
            {["Customer submits photos and job details", "Trader reviews organised enquiry", "Trader creates and approves quote", "Customer accepts and pays deposit"].map((item, index) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-[#36545c]"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e6f0f0] font-bold text-[#087f83]">{index + 1}</span><span>{item}</span></li>
            ))}
          </ol>
        </div>
      </section>
      <section className="border-y border-[#d5dfdf] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <SectionTitle title="One tight commercial loop" eyebrow="Prototype scope">
            No scheduling, autonomous pricing or live integrations are required to show the initial value proposition.
          </SectionTitle>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[['Structured intake', 'Job type, condition, access and photos captured in one request.'], ['Quote control', 'Prices are entered and approved by the trader.'], ['Deposit moment', 'Customer sees the amount due and a credible payment step.']].map(([title, detail]) => (
              <article key={title} className="surface p-5"><h3 className="font-bold text-[#132e3c]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#50676d]">{detail}</p></article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
