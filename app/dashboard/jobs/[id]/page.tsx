import { JobDetailClient } from "@/components/job-detail-client";

type Props = { params: Promise<{ id: string }> };

export default async function JobPage({ params }: Props) {
  const { id } = await params;
  return <JobDetailClient enquiryId={id} />;
}
