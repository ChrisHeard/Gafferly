"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { z } from "zod";

const formSchema = z.object({
  customer: z.string().min(2, "Enter your name"),
  phone: z.string().min(7, "Enter a phone number"),
  email: z.string().email("Enter a valid email"),
  postcode: z.string().min(3, "Enter a postcode"),
  jobType: z.string().min(1, "Select a work type"),
  size: z.string().min(1, "Select an approximate size"),
  condition: z.string().min(1, "Select the condition"),
});

type FormErrors = Record<string, string[] | undefined>;

export function RequestQuoteForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [photos, setPhotos] = useState<string[]>([]);

  function onPhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const names = Array.from(event.target.files ?? []).slice(0, 5).map((file) => file.name);
    setPhotos(names);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      customer: String(data.get("customer") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      postcode: String(data.get("postcode") ?? ""),
      jobType: String(data.get("jobType") ?? ""),
      size: String(data.get("size") ?? ""),
      condition: String(data.get("condition") ?? ""),
      addOns: data.getAll("addOns").map(String),
      access: String(data.get("access") ?? ""),
      notes: String(data.get("notes") ?? ""),
      photos,
    };
    const result = formSchema.safeParse(values);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      setStep(1);
      return;
    }
    sessionStorage.setItem("gafferly_enquiry", JSON.stringify(values));
    router.push("/brightwash/request-quote/confirmation");
  }

  return (
    <form onSubmit={submit} className="surface overflow-hidden">
      <div className="border-b border-[#e1e7e6] px-5 py-5 sm:px-7">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#50676d]">
          {["Job", "Property", "Contact"].map((name, index) => {
            const number = index + 1;
            return (
              <div key={name} className="flex flex-1 items-center gap-2">
                <span className={`grid h-7 w-7 place-items-center rounded-full text-xs ${step >= number ? "bg-[#087f83] text-white" : "bg-[#edf2f2]"}`}>{number}</span>
                <span className="hidden sm:block">{name}</span>
                {number < 3 && <span className="ml-auto h-px w-5 bg-[#d5dfdf] sm:w-10" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <section className={step === 1 ? "space-y-5" : "hidden"} aria-label="Job details">
          <h2 className="text-xl font-bold text-[#132e3c]">What needs cleaning?</h2>
          <div>
            <label className="label" htmlFor="jobType">Work type</label>
            <select className="field" id="jobType" name="jobType" defaultValue="">
              <option value="" disabled>Select an option</option>
              <option>Block-paved driveway clean</option>
              <option>Concrete driveway clean</option>
              <option>Patio clean</option>
              <option>Paths and steps</option>
              <option>Other exterior surface</option>
            </select>
            {errors.jobType && <p className="mt-1 text-sm text-red-700">{errors.jobType[0]}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="size">Approximate size</label>
              <select className="field" id="size" name="size" defaultValue="">
                <option value="" disabled>Select size</option>
                <option>Small — single car / compact patio</option>
                <option>Medium — two cars</option>
                <option>Large — three or more cars</option>
                <option>Unsure</option>
              </select>
              {errors.size && <p className="mt-1 text-sm text-red-700">{errors.size[0]}</p>}
            </div>
            <div>
              <label className="label" htmlFor="condition">Condition</label>
              <select className="field" id="condition" name="condition" defaultValue="">
                <option value="" disabled>Select condition</option>
                <option>Lightly dirty</option>
                <option>Heavily dirty</option>
                <option>Moss or weeds present</option>
                <option>Oil or stubborn staining</option>
              </select>
              {errors.condition && <p className="mt-1 text-sm text-red-700">{errors.condition[0]}</p>}
            </div>
          </div>
          <fieldset>
            <legend className="label">Optional extras</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Re-sanding", "Protective sealing", "Weed treatment"].map((item) => (
                <label key={item} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#d5dfdf] bg-white p-3 text-sm font-medium">
                  <input name="addOns" type="checkbox" value={item} className="h-4 w-4 accent-[#087f83]" /> {item}
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        <section className={step === 2 ? "space-y-5" : "hidden"} aria-label="Property details">
          <h2 className="text-xl font-bold text-[#132e3c]">Show us the area</h2>
          <div>
            <label className="label" htmlFor="postcode">Postcode</label>
            <input className="field" id="postcode" name="postcode" placeholder="e.g. BS7 8AA" />
            {errors.postcode && <p className="mt-1 text-sm text-red-700">{errors.postcode[0]}</p>}
          </div>
          <div>
            <label className="label" htmlFor="access">Access and water supply</label>
            <textarea className="field min-h-24" id="access" name="access" placeholder="Is there easy access? Is an outside tap available?" />
          </div>
          <div>
            <label className="label" htmlFor="photos">Upload photos</label>
            <label htmlFor="photos" className="block cursor-pointer rounded-xl border-2 border-dashed border-[#c5d4d5] bg-[#f7fafa] p-7 text-center">
              <span className="block font-bold text-[#132e3c]">Add up to 5 photos</span>
              <span className="mt-1 block text-sm text-[#50676d]">Wide view and close-up photos are most useful.</span>
              <input id="photos" name="photos" type="file" multiple accept="image/*" className="sr-only" onChange={onPhotoChange} />
            </label>
            {photos.length > 0 && <p className="mt-2 text-sm text-[#087f83]">{photos.length} photo{photos.length === 1 ? "" : "s"} selected: {photos.join(", ")}</p>}
          </div>
        </section>

        <section className={step === 3 ? "space-y-5" : "hidden"} aria-label="Contact details">
          <h2 className="text-xl font-bold text-[#132e3c]">Where should we send your quote?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="customer">Name</label>
              <input className="field" id="customer" name="customer" placeholder="Your name" />
              {errors.customer && <p className="mt-1 text-sm text-red-700">{errors.customer[0]}</p>}
            </div>
            <div>
              <label className="label" htmlFor="phone">Mobile number</label>
              <input className="field" id="phone" name="phone" placeholder="07..." />
              {errors.phone && <p className="mt-1 text-sm text-red-700">{errors.phone[0]}</p>}
            </div>
          </div>
          <div>
            <label className="label" htmlFor="email">Email address</label>
            <input className="field" id="email" name="email" type="email" placeholder="you@example.com" />
            {errors.email && <p className="mt-1 text-sm text-red-700">{errors.email[0]}</p>}
          </div>
          <div>
            <label className="label" htmlFor="notes">Anything else?</label>
            <textarea className="field min-h-24" id="notes" name="notes" placeholder="Timing preferences or further detail" />
          </div>
          <label className="flex items-start gap-3 text-sm leading-6 text-[#50676d]">
            <input required className="mt-1 h-4 w-4 accent-[#087f83]" type="checkbox" />
            I agree that BrightWash may use these details to review my request and prepare a quote. Prototype wording only.
          </label>
        </section>
      </div>

      <div className="flex justify-between border-t border-[#e1e7e6] bg-[#fafcfc] p-5 sm:p-7">
        <button type="button" onClick={() => setStep((current) => Math.max(1, current - 1))} className={`min-h-12 rounded-xl border border-[#d5dfdf] px-5 text-sm font-bold ${step === 1 ? "invisible" : ""}`}>Back</button>
        {step < 3 ? (
          <button type="button" onClick={() => setStep((current) => Math.min(3, current + 1))} className="min-h-12 rounded-xl bg-[#087f83] px-6 text-sm font-bold text-white">Continue</button>
        ) : (
          <button type="submit" className="min-h-12 rounded-xl bg-[#087f83] px-6 text-sm font-bold text-white">Send request</button>
        )}
      </div>
    </form>
  );
}
