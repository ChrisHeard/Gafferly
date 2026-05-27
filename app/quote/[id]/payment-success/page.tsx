import { PaymentSuccessClient } from "@/components/payment-success-client";

type Props = { params: Promise<{ id: string }> };

export default async function PaymentSuccessPage({ params }: Props) {
  const { id } = await params;
  return <PaymentSuccessClient enquiryId={id} />;
}
