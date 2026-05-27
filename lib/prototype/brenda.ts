import type { Enquiry } from "@/lib/prototype/types";

const formatAddOns = (addOns: string[]): string => {
  if (addOns.length === 0) return "no add-ons";
  if (addOns.length === 1) return addOns[0].toLowerCase();
  return `${addOns.slice(0, -1).map((item) => item.toLowerCase()).join(", ")} and ${addOns[addOns.length - 1].toLowerCase()}`;
};

const normalise = (value: string): string => value.trim().toLowerCase();

export const buildBrendaSummary = (enquiry: Enquiry): string => {
  const accessText = enquiry.access.trim() ? enquiry.access : "No access details supplied yet";

  return `${enquiry.jobType} enquiry in ${enquiry.postcode}. Reported size: ${enquiry.size}. Condition noted as ${enquiry.condition.toLowerCase()}. Customer requested ${formatAddOns(enquiry.addOns)}. ${enquiry.photoCount} photo(s) received. Access notes: ${accessText}.`;
};

export const buildBrendaMissingInformation = (enquiry: Enquiry): string => {
  const prompts: string[] = [];

  if (normalise(enquiry.size) === "unsure") {
    prompts.push("Please share an approximate area in square metres or the vehicle capacity needed.");
  }

  if (enquiry.photoCount === 0) {
    prompts.push("Please upload both wide-view and close-up photos.");
  }

  if (!enquiry.access.trim()) {
    prompts.push("Please confirm whether water supply and site access are available.");
  }

  if (prompts.length === 0) {
    return "The enquiry appears ready for trader review.";
  }

  return prompts.join(" ");
};
