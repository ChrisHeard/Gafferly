import type { AuditEvent, PrototypeState } from "./types";

export interface DashboardMetrics {
  newEnquiries: number;
  quotesSent: number;
  succeededDeposits: number;
  totalDepositValueReceived: number;
}

export interface TimelineEvent {
  id: string;
  occurredAt: string;
  label: string;
  detail: string;
}

const EVENT_LABELS: Record<string, string> = {
  enquiry_created: "Enquiry received",
  quote_draft_created: "Quote draft created",
  quote_sent: "Quote sent",
  quote_accepted: "Customer accepted quote",
  payment_created: "Payment initiated",
  deposit_received: "Deposit received",
};

const toTimelineEvent = (event: AuditEvent): TimelineEvent => ({
  id: event.id,
  occurredAt: event.occurredAt,
  label: EVENT_LABELS[event.event] ?? event.event,
  detail: event.detail,
});

export const selectDashboardMetrics = (state: PrototypeState): DashboardMetrics => ({
  newEnquiries: state.enquiries.filter((enquiry) => enquiry.status === "new").length,
  quotesSent: state.quotes.filter((quote) => quote.status === "sent" || quote.status === "viewed").length,
  succeededDeposits: state.payments.filter((payment) => payment.status === "succeeded").length,
  totalDepositValueReceived: state.payments
    .filter((payment) => payment.status === "succeeded")
    .reduce((sum, payment) => sum + payment.amount, 0),
});

export const selectJobTimeline = (state: PrototypeState, enquiryId: string): TimelineEvent[] =>
  state.auditEvents
    .filter((event) => event.enquiryId === enquiryId)
    .slice()
    .sort((a, b) => new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime())
    .map(toTimelineEvent);
