export const dynamic = "force-static";

export default function robots() {
    const domain = process.env.NEXT_PUBLIC_BASE_URL || "https://scgservicesatlanta.com";
    return {
        rules: [
            {
            userAgent: "*",
            allow: "/",
            disallow: []
            }
        ],
        sitemap: `${domain}/sitemap.xml`
    }
}
