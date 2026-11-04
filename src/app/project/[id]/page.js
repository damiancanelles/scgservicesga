import ProjectDetailComponent from "@/components/pages/project";
import { buildMetadata, getProject, getProjects } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ id: p.documentId }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  return buildMetadata(getProject(id));
}

export default async function ProjectDetail({params}) {
  const { id } = await params;
  return <ProjectDetailComponent id={id} />;
}
