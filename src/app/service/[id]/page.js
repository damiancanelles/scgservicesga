import ServiceDetailComponent from "@/components/pages/service";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/api/services/${id}?populate=*`);
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

export default async function ServiceDetail({params}) {
  const { id } = await params;
  return <ServiceDetailComponent id={id} />;
}
