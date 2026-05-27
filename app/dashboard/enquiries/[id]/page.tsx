import { EnquiryDetailClient } from "@/components/dashboard-enquiries-client";

type Props = { params: { id: string } };

export default function EnquiryPage({ params }: Props) {
  const { id } = params;
  return <EnquiryDetailClient id={id} />;
}
