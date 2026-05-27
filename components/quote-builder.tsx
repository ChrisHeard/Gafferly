"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { currency } from "@/lib/utils";
import { createQuoteDraft, updateQuoteDraft } from "@/lib/prototype/store";
import type { QuoteItem } from "@/lib/prototype/types";

type Item = { id: string; description: string; price: number };

export function QuoteBuilder({ enquiryId }: { enquiryId: string }) {
  const router = useRouter();
  const [draft] = useState(() => (typeof window === "undefined" ? null : createQuoteDraft(enquiryId)));
  const [items, setItems] = useState<Item[]>(draft?.items ?? []);
  const [deposit, setDeposit] = useState((draft?.deposit ?? 0) / 100);
  const [notes, setNotes] = useState(draft?.notes ?? "");
  const [validUntil, setValidUntil] = useState(draft?.validUntil.slice(0, 10) ?? "");
  const [error, setError] = useState<string | null>(null);
  const quoteId = draft?.id ?? null;
  const total = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);
  const depositPence = Math.round(deposit * 100);

  const persistDraft = (nextItems: Item[], nextDeposit: number, nextNotes: string, nextValidUntil: string) => {
    if (!quoteId) return;

    const payload: QuoteItem[] = nextItems.map((item) => ({
      id: item.id,
      quoteId,
      description: item.description,
      price: item.price,
    }));

    try {
      updateQuoteDraft(quoteId, {
        items: payload,
        deposit: Math.round(nextDeposit * 100),
        notes: nextNotes,
        validUntil: new Date(nextValidUntil).toISOString(),
      });
      setError(null);
    } catch (persistError) {
      setError(persistError instanceof Error ? persistError.message : "Unable to save quote draft");
    }
  };

  function editItem(index: number, field: keyof Item, value: string) {
    setItems((current) => {
      const nextItems = current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: field === "price" ? Math.round(Number(value || 0) * 100) : value } : item);
      persistDraft(nextItems, deposit, notes, validUntil);
      return nextItems;
    });
  }
  function removeItem(index: number) {
    setItems((current) => {
      const nextItems = current.filter((_, itemIndex) => itemIndex !== index);
      persistDraft(nextItems, deposit, notes, validUntil);
      return nextItems;
    });
  }
  function addItem() {
    setItems((current) => {
      const nextItems = [...current, { id: crypto.randomUUID(), description: "Additional service", price: 0 }];
      persistDraft(nextItems, deposit, notes, validUntil);
      return nextItems;
    });
  }
  function preview() {
    if (quoteId) {
      persistDraft(items, deposit, notes, validUntil);
    }
    router.push("/quote/demo-001");
  }

  if (!quoteId) {
    return <div className="surface p-6 text-sm text-[#50676d]">Loading draft…</div>;
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
          <textarea id="notes" className="field min-h-28" value={notes} onChange={(event) => {
            const nextNotes = event.target.value;
            setNotes(nextNotes);
            persistDraft(items, deposit, nextNotes, validUntil);
          }} />
        </div>
      </section>
      <aside className="surface h-fit p-5 sm:p-6">
        <h2 className="text-xl font-bold text-[#132e3c]">Summary</h2>
        <dl className="mt-5 space-y-4 text-sm">
          <div className="flex justify-between"><dt className="text-[#50676d]">Quote total</dt><dd className="text-lg font-bold">{currency(total)}</dd></div>
          <div>
            <label className="label" htmlFor="deposit">Deposit required</label>
            <div className="relative"><span className="absolute left-3 top-3 text-[#50676d]">£</span><input id="deposit" className="field pl-7" type="number" value={deposit} onChange={(event) => {
              const nextDeposit = Number(event.target.value || 0);
              setDeposit(nextDeposit);
              persistDraft(items, nextDeposit, notes, validUntil);
            }} /></div>
          </div>
          <div className="flex justify-between border-t border-[#d5dfdf] pt-4"><dt className="text-[#50676d]">Balance on completion</dt><dd className="font-bold">{currency(total - depositPence)}</dd></div>
          <div>
            <label className="label" htmlFor="validUntil">Valid until</label>
            <input id="validUntil" className="field" type="date" value={validUntil} onChange={(event) => {
              const nextValidUntil = event.target.value;
              setValidUntil(nextValidUntil);
              persistDraft(items, deposit, notes, nextValidUntil);
            }} />
          </div>
        </dl>
        {error ? <p className="mt-3 text-xs text-[#a81f2d]">{error}</p> : null}
        <button type="button" onClick={preview} className="mt-6 min-h-12 w-full rounded-xl bg-[#087f83] px-4 text-sm font-bold text-white">Preview and send quote</button>
        <p className="mt-3 text-xs leading-5 text-[#50676d]">Prototype action: no message is sent. The quote is stored in this browser session for the customer preview.</p>
      </aside>
    </div>
  );
}
