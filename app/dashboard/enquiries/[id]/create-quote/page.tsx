import { CreateQuoteClient } from "@/components/create-quote-client";

type Props = { params: Promise<{ id: string }> };

export default async function CreateQuotePage({ params }: Props) {
  const { id } = await params;

  return <CreateQuoteClient enquiryId={id} />;
}
