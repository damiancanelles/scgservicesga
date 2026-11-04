// Site content. These JSON files are a snapshot of the former Strapi CMS;
// edit them directly to change what the site shows.
import home from "@/data/home.json";
import about from "@/data/about.json";
import categories from "@/data/categories.json";
import services from "@/data/services.json";
import projects from "@/data/projects.json";
import reviews from "@/data/reviews.json";

export const getHome = () => home;
export const getAbout = () => about;
export const getCategories = () => categories;
export const getCategory = (id) => categories.find((c) => c.documentId === id);
export const getServices = () => services;
export const getService = (id) => services.find((s) => s.documentId === id);
export const getProjects = () => projects;
export const getProject = (id) => projects.find((p) => p.documentId === id);
export const getReviews = () => reviews;

// Shared SEO metadata for the about/category/service/project pages.
export function buildMetadata(data, imageUrl = data?.images?.[0]?.url) {
  if (!data?.seo) return {};
  const title = `${data.seo.seoTitle} - SCG Services Atlanta`;
  const description = data.seo.seoDescription || "";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images:
        data.images?.length > 0
          ? [{ url: imageUrl, width: 1200, height: 630, alt: data.seo.seoTitle }]
          : [],
      type: "website",
    },
  };
}
