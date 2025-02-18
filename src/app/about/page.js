import AboutPageComponent from "@/components/pages/about";

export async function generateMetadata() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/api/about?populate=*`);
    const json = await response.json();
    const data = json.data;

    if (!data) return {};

    return {
      title: `${data.seo.seoTitle} - SCG Services Atlanta`,
      description: data.seo.seoDescription,
      openGraph: {
        title: `${data.seo.seoTitle} - SCG Services Atlanta`,
        description: data.seo.seoDescription,
        images: data.images?.length > 0
          ? [
              {
                url: "https://res.cloudinary.com/damiancanelles/image/upload/v1739736725/GC_20_929643c6dd.png",
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

export default function AboutPage() {
  return (<AboutPageComponent></AboutPageComponent>);
}
