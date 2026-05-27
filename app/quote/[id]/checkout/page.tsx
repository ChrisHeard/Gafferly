import { CheckoutClient } from "@/components/checkout-client";

type Props = { params: Promise<{ id: string }> };

export default async function CheckoutPage({ params }: Props) {
  const { id } = await params;
  return <CheckoutClient enquiryId={id} />;
}
