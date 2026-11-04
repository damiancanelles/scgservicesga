import CategoryPageComponent from "@/components/pages/category";
import { buildMetadata, getCategories, getCategory } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((c) => ({ id: c.documentId }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  return buildMetadata(getCategory(id));
}

export default async function CategoryPage({params}) {
  const { id } = await params;
  return <CategoryPageComponent id={id}/>;
}
