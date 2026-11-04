import ServiceDetailComponent from "@/components/pages/service";
import { buildMetadata, getService, getServices } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((s) => ({ id: s.documentId }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  return buildMetadata(getService(id));
}

export default async function ServiceDetail({params}) {
  const { id } = await params;
  return <ServiceDetailComponent id={id} />;
}
