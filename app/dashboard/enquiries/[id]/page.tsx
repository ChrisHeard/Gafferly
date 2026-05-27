import { EnquiryDetailClient } from "@/components/dashboard-enquiries-client";

type Props = { params: Promise<{ id: string }> };

export default async function EnquiryPage({ params }: Props) {
  const { id } = await params;
  return <EnquiryDetailClient id={id} />;
}
