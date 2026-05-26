export type EnquiryStatus =
  | "new"
  | "reviewing"
  | "quote_draft"
  | "quoted"
  | "accepted"
  | "deposit_paid"
  | "lost"
  | "cancelled";

export type QuoteStatus = "draft" | "sent" | "viewed" | "accepted" | "superseded" | "cancelled";

export type PaymentStatus = "created" | "pending" | "succeeded";

export interface Business {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  location: string;
  tagline: string;
  phone: string;
}

export interface Enquiry {
  id: string;
  businessId: string;
  customer: string;
  initials: string;
  postcode: string;
  submittedAt: string;
  jobType: string;
  size: string;
  condition: string;
  access: string;
  addOns: string[];
  photoCount: number;
  notes: string;
  status: EnquiryStatus;
  readiness: string;
  missing: string;
  summary: string;
}

export interface QuoteItem {
  id: string;
  quoteId: string;
  description: string;
  price: number;
}

export interface Quote {
  id: string;
  enquiryId: string;
  businessId: string;
  customer: string;
  quoteNumber: string;
  issuedAt: string;
  validUntil: string;
  status: QuoteStatus;
  items: QuoteItem[];
  total: number;
  deposit: number;
  balance: number;
  notes: string;
}

export interface QuoteAcceptance {
  id: string;
  quoteId: string;
  acceptedAt: string;
  acceptedBy: string;
  termsAcknowledged: boolean;
}

export interface PaymentRecord {
  id: string;
  quoteId: string;
  amount: number;
  currency: "GBP";
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  reference: string;
}

export interface AuditEvent {
  id: string;
  businessId: string;
  enquiryId?: string;
  quoteId?: string;
  occurredAt: string;
  event: string;
  detail: string;
}

export interface PrototypeState {
  business: Business;
  enquiries: Enquiry[];
  quotes: Quote[];
  quoteAcceptances: QuoteAcceptance[];
  payments: PaymentRecord[];
  auditEvents: AuditEvent[];
}
