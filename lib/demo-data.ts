export type EnquiryStatus = "New" | "Reviewing" | "Quote Draft" | "Quoted" | "Accepted" | "Deposit Paid";

export const demoTrader = {
  name: "BrightWash Exterior Cleaning",
  shortName: "BrightWash",
  location: "Bristol and surrounding areas",
  tagline: "Driveways and patios cleaned professionally, without waiting for a site visit.",
  phone: "0117 555 0172",
  slug: "brightwash",
};

export const services = [
  { name: "Driveway pressure washing", detail: "Block paving, concrete and resin drives" },
  { name: "Patio and path cleaning", detail: "Slabs, natural stone and garden paving" },
  { name: "Re-sanding", detail: "Fresh kiln-dried sand after block-paving cleaning" },
  { name: "Protective sealing", detail: "Optional finish after inspection" },
];

export const enquiries = [
  {
    id: "demo-001",
    customer: "Sarah Mitchell",
    initials: "SM",
    postcode: "BS7",
    submitted: "Today, 10:14",
    jobType: "Block-paved driveway clean",
    size: "Medium — approximately two cars",
    condition: "Moss and weeds between blocks",
    access: "Front driveway access; outside tap available",
    addOns: ["Re-sanding"],
    photoCount: 3,
    notes: "Would like this completed before visitors arrive next month.",
    status: "New" as EnquiryStatus,
    readiness: "One detail to confirm",
    missing: "Confirm approximate square metres or vehicle capacity before setting final scope.",
    summary: "Customer wants a block-paved driveway pressure washed, with moss removal and re-sanding. Three photos supplied. Access appears straightforward.",
  },
  {
    id: "demo-002",
    customer: "Mark Lewis",
    initials: "ML",
    postcode: "BS5",
    submitted: "Today, 09:07",
    jobType: "Rear slab patio clean",
    size: "Small",
    condition: "Heavy algae staining",
    access: "Narrow side gate",
    addOns: [],
    photoCount: 4,
    notes: "Dog in property; call before visiting.",
    status: "Reviewing" as EnquiryStatus,
    readiness: "Ready for review",
    missing: "None indicated.",
    summary: "Small rear patio with algae staining and restricted access. Four photos supplied.",
  },
  {
    id: "demo-003",
    customer: "Hannah Byrne",
    initials: "HB",
    postcode: "BS16",
    submitted: "Yesterday, 16:52",
    jobType: "Driveway clean and sealing",
    size: "Large / unsure",
    condition: "General weathering",
    access: "Driveway access",
    addOns: ["Protective sealing"],
    photoCount: 2,
    notes: "Interested in a long-lasting finish.",
    status: "Quote Draft" as EnquiryStatus,
    readiness: "Needs measurement",
    missing: "Measure surface area and confirm suitable sealing material.",
    summary: "Customer requests large driveway cleaning and sealing; area requires confirmation.",
  },
];

export const demoQuote = {
  id: "demo-001",
  customer: "Sarah Mitchell",
  quoteNumber: "BW-2026-0042",
  issued: "25 May 2026",
  validUntil: "8 June 2026",
  items: [
    { description: "Block-paving pressure wash", price: 18000 },
    { description: "Moss and weed removal treatment", price: 3500 },
    { description: "Re-sanding after cleaning", price: 7000 },
  ],
  total: 28500,
  deposit: 6000,
  balance: 22500,
  notes: "Includes surface clean, moss and weed treatment, and re-sanding after the surface has dried. Outside tap access required on the day.",
};

export const timeline = [
  { time: "10:14", event: "New enquiry received", detail: "Customer uploaded 3 photos" },
  { time: "10:19", event: "Enquiry reviewed", detail: "Quote preparation started" },
  { time: "10:27", event: "Quote sent", detail: "BW-2026-0042 · £285" },
  { time: "10:41", event: "Customer accepted quote", detail: "Terms acknowledgement captured" },
  { time: "10:43", event: "Deposit received", detail: "£60 paid securely" },
];

export function getEnquiry(id: string) {
  return enquiries.find((enquiry) => enquiry.id === id) ?? enquiries[0];
}
