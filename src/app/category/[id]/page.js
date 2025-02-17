import CategoryPageComponent from "@/components/pages/category";

export async function generateStaticParams() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/api/categories`);
    const json = await response.json();
    const categories = json.data;

    if (!categories) return [];

    // Return an array of params { id: "category-id" }
    return categories.map((category) => ({
      id: category.documentId.toString(), // Ensure ID is a string
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/api/categories/${id}?populate=*`);
    const json = await response.json();
    const data = json.data;

    if (!data) return {};

    return {
      title: `${data.seo.seoTitle} - SCG Services Atlanta`,
      description: data.seo?.seoDescription || "",
      openGraph: {
        title: `${data.seo.seoTitle} - SCG Services Atlanta`,
        description: data.seo?.seoDescription || "",
        images: data.images?.length > 0
          ? [
              {
                url: data.images[0].url,
                width: 1200,
                height: 630,
                alt: data.seo.seoTitle,
              },
            ]
          : [],
        type: "website",
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {};
  }
}

export default function CategoryPage() {
  return <CategoryPageComponent />;
}
