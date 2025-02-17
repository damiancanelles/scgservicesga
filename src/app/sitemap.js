export default async function sitemap() {
    const domain = process.env.NEXT_PUBLIC_BASE_URL;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Fetch categories and services
    const [categoriesRes, servicesRes] = await Promise.all([
        fetch(`${apiUrl}/api/categories?populate=*`, { next: { revalidate: 86400 } }),
        fetch(`${apiUrl}/api/services?populate=*`, { next: { revalidate: 86400 } }),
    ]);

    const [categoriesData, servicesData] = await Promise.all([
        categoriesRes.json(),
        servicesRes.json(),
    ]);

    const categories = categoriesData?.data || [];
    const services = servicesData?.data || [];

    console.log(categories, services);

    // Corrected map function (implicit return)
    const categoriesIds = categories.map(({ documentId }) => ({
        url: `${domain}/category/${documentId}`
    }));

    const servicesIds = services.map(({ documentId }) => ({
        url: `${domain}/service/${documentId}`
    }));

    return [
        { url: `${domain}/about` },
        { url: `${domain}/` },
        ...categoriesIds,
        ...servicesIds
    ];
}
