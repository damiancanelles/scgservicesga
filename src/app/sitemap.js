import { getCategories, getServices } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap() {
    const domain = process.env.NEXT_PUBLIC_BASE_URL || "https://scgservicesatlanta.com";

    const categoriesIds = getCategories().map(({ documentId }) => ({
        url: `${domain}/category/${documentId}`
    }));

    const servicesIds = getServices().map(({ documentId }) => ({
        url: `${domain}/service/${documentId}`
    }));

    return [
        { url: `${domain}/about` },
        { url: `${domain}/` },
        ...categoriesIds,
        ...servicesIds
    ];
}
