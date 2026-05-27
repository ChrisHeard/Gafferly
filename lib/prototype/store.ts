import { initialPrototypeState } from "./seed";
import type { AuditEvent, Enquiry, PrototypeState, Quote } from "./types";

const STORAGE_KEY = "gafferly:prototype-state";

const cloneState = (state: PrototypeState): PrototypeState => {
  if (typeof structuredClone === "function") {
    return structuredClone(state);
  }

  return JSON.parse(JSON.stringify(state)) as PrototypeState;
};

const getSeededState = (): PrototypeState => cloneState(initialPrototypeState);

const parseStoredState = (raw: string | null): PrototypeState | null => {
  if (!raw) return null;

  try {
    return JSON.parse(raw) as PrototypeState;
  } catch {
    return null;
  }
};

const writeState = (state: PrototypeState) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const getPrototypeState = (): PrototypeState => {
  if (typeof window === "undefined") {
    return getSeededState();
  }

  const stored = parseStoredState(window.localStorage.getItem(STORAGE_KEY));

  if (stored) {
    return stored;
  }

  const seeded = getSeededState();
  writeState(seeded);
  return seeded;
};

export const setPrototypeState = (state: PrototypeState): PrototypeState => {
  const nextState = cloneState(state);
  writeState(nextState);
  return nextState;
};

export const resetPrototype = (): PrototypeState => {
  const seeded = getSeededState();
  writeState(seeded);
  return seeded;
};

export const appendEvent = (event: AuditEvent): PrototypeState => {
  const current = getPrototypeState();
  const nextState: PrototypeState = {
    ...current,
    auditEvents: [...current.auditEvents, event],
  };

  return setPrototypeState(nextState);
};

export interface CreateEnquiryInput {
  customer: string;
  mobile: string;
  email: string;
  postcode: string;
  jobType: string;
  size: string;
  condition: string;
  addOns: string[];
  access: string;
  notes: string;
  photoFilenames: string[];
}

const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const createEnquiry = (input: CreateEnquiryInput): Enquiry => {
  const current = getPrototypeState();
  const now = new Date().toISOString();
  const sequence = current.enquiries.length + 1;
  const id = `enquiry-${String(sequence).padStart(4, "0")}`;
  const reference = `BW-ENQ-${String(sequence + 144).padStart(4, "0")}`;

  const enquiry: Enquiry = {
    id,
    reference,
    businessId: current.business.id,
    customer: input.customer,
    mobile: input.mobile,
    email: input.email,
    initials: getInitials(input.customer),
    postcode: input.postcode,
    submittedAt: now,
    jobType: input.jobType,
    size: input.size,
    condition: input.condition,
    access: input.access,
    addOns: input.addOns,
    photoCount: input.photoFilenames.length,
    photoFilenames: input.photoFilenames,
    notes: input.notes,
    status: "new",
    readiness: "Ready for review",
    missing: "None indicated.",
    summary: `Customer requested ${input.jobType.toLowerCase()} in ${input.postcode}. ${input.photoFilenames.length} photo(s) supplied.`,
  };

  const nextState: PrototypeState = {
    ...current,
    enquiries: [enquiry, ...current.enquiries],
    auditEvents: [
      ...current.auditEvents,
      {
        id: `event-${current.auditEvents.length + 1}`,
        businessId: current.business.id,
        enquiryId: enquiry.id,
        occurredAt: now,
        event: "enquiry_created",
        detail: `${enquiry.reference} created with ${enquiry.photoCount} photo(s)`,
      },
    ],
  };

  setPrototypeState(nextState);
  return enquiry;
};

export const createQuoteDraft = (enquiryId: string): Quote => {
  const current = getPrototypeState();
  const enquiry = current.enquiries.find((item) => item.id === enquiryId);

  if (!enquiry) {
    throw new Error(`Enquiry ${enquiryId} not found`);
  }

  const existing = current.quotes.find((quote) => quote.enquiryId === enquiryId && quote.status === "draft");
  if (existing) {
    return existing;
  }

  const now = new Date();
  const nowIso = now.toISOString();
  const validUntil = new Date(now);
  validUntil.setDate(validUntil.getDate() + 14);
  const sequence = current.quotes.length + 1;

  const quote: Quote = {
    id: `quote-${String(sequence).padStart(4, "0")}`,
    enquiryId: enquiry.id,
    businessId: current.business.id,
    customer: enquiry.customer,
    quoteNumber: `BW-QUOTE-${String(sequence + 210).padStart(4, "0")}`,
    issuedAt: nowIso,
    validUntil: validUntil.toISOString(),
    status: "draft",
    items: [],
    total: 0,
    deposit: 0,
    balance: 0,
    notes: "",
  };

  const nextState: PrototypeState = {
    ...current,
    quotes: [quote, ...current.quotes],
    auditEvents: [
      ...current.auditEvents,
      {
        id: `event-${current.auditEvents.length + 1}`,
        businessId: current.business.id,
        enquiryId: enquiry.id,
        quoteId: quote.id,
        occurredAt: nowIso,
        event: "quote_draft_created",
        detail: `${quote.quoteNumber} created for ${enquiry.reference}`,
      },
    ],
  };

  setPrototypeState(nextState);
  return quote;
};

export interface UpdateQuoteDraftInput {
  items: Quote["items"];
  deposit: number;
  notes: string;
  validUntil: string;
}

export const updateQuoteDraft = (quoteId: string, values: UpdateQuoteDraftInput): Quote => {
  const current = getPrototypeState();
  const quote = current.quotes.find((item) => item.id === quoteId);

  if (!quote) {
    throw new Error(`Quote ${quoteId} not found`);
  }

  if (values.deposit < 0) {
    throw new Error("Deposit cannot be negative");
  }

  if (values.items.some((item) => item.price < 0)) {
    throw new Error("Line item prices cannot be negative");
  }

  const total = values.items.reduce((sum, item) => sum + item.price, 0);

  if (values.deposit > total) {
    throw new Error("Deposit cannot exceed total");
  }

  const updatedQuote: Quote = {
    ...quote,
    items: values.items,
    total,
    deposit: values.deposit,
    balance: total - values.deposit,
    notes: values.notes,
    validUntil: values.validUntil,
    status: "draft",
  };

  const nextState: PrototypeState = {
    ...current,
    quotes: current.quotes.map((item) => (item.id === quoteId ? updatedQuote : item)),
  };

  setPrototypeState(nextState);
  return updatedQuote;
};
