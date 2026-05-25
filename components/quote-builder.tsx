"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { currency } from "@/lib/utils";
import { demoQuote } from "@/lib/demo-data";

type Item = { description: string; price: number };

export function QuoteBuilder() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>(demoQuote.items);
  const [deposit, setDeposit] = useState(demoQuote.deposit / 100);
  const [notes, setNotes] = useState(demoQuote.notes);
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);
  const depositPence = Math.round(deposit * 100);

  function editItem(index: number, field: keyof Item, value: string) {
    setItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: field === "price" ? Math.round(Number(value || 0) * 100) : value } : item));
  }
  function removeItem(index: number) { setItems((current) => current.filter((_, itemIndex) => itemIndex !== index)); }
  function addItem() { setItems((current) => [...current, { description: "Additional service", price: 0 }]); }
  function preview() {
    sessionStorage.setItem("gafferly_quote", JSON.stringify({ ...demoQuote, items, total, deposit: depositPence, balance: total - depositPence, notes }));
    router.push("/quote/demo-001");
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
      <section className="surface p-5 sm:p-6">
        <h2 className="mb-5 text-xl font-bold text-[#132e3c]">Quote items</h2>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={`${item.description}-${index}`} className="grid gap-2 rounded-xl bg-[#f7fafa] p-3 sm:grid-cols-[1fr_7rem_2.5rem]">
              <input aria-label={`Item ${index + 1} description`} className="field" value={item.description} onChange={(event) => editItem(index, "description", event.target.value)} />
              <div className="relative"><span className="absolute left-3 top-3 text-[#50676d]">£</span><input aria-label={`Item ${index + 1} price`} className="field pl-7" type="number" value={(item.price / 100).toFixed(0)} onChange={(event) => editItem(index, "price", event.target.value)} /></div>
              <button aria-label="Remove line item" type="button" onClick={() => removeItem(index)} className="rounded-xl border border-[#d5dfdf] bg-white text-[#50676d]">×</button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addItem} className="mt-4 text-sm font-bold text-[#087f83]">+ Add line item</button>
        <div className="mt-7">
          <label className="label" htmlFor="notes">Customer-facing notes</label>
          <textarea id="notes" className="field min-h-28" value={notes} onChange={(event) => setNotes(event.target.value)} />
        </div>
      </section>
      <aside className="surface h-fit p-5 sm:p-6">
        <h2 className="text-xl font-bold text-[#132e3c]">Summary</h2>
        <dl className="mt-5 space-y-4 text-sm">
          <div className="flex justify-between"><dt className="text-[#50676d]">Quote total</dt><dd className="text-lg font-bold">{currency(total)}</dd></div>
          <div>
            <label className="label" htmlFor="deposit">Deposit required</label>
            <div className="relative"><span className="absolute left-3 top-3 text-[#50676d]">£</span><input id="deposit" className="field pl-7" type="number" value={deposit} onChange={(event) => setDeposit(Number(event.target.value || 0))} /></div>
          </div>
          <div className="flex justify-between border-t border-[#d5dfdf] pt-4"><dt className="text-[#50676d]">Balance on completion</dt><dd className="font-bold">{currency(total - depositPence)}</dd></div>
          <div className="flex justify-between"><dt className="text-[#50676d]">Valid until</dt><dd className="font-semibold">8 June 2026</dd></div>
        </dl>
        <button type="button" onClick={preview} className="mt-6 min-h-12 w-full rounded-xl bg-[#087f83] px-4 text-sm font-bold text-white">Preview and send quote</button>
        <p className="mt-3 text-xs leading-5 text-[#50676d]">Prototype action: no message is sent. The quote is stored in this browser session for the customer preview.</p>
      </aside>
    </div>
  );
}
