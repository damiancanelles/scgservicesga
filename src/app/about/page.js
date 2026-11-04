import AboutPageComponent from "@/components/pages/about";
import { buildMetadata, getAbout } from "@/lib/content";

export function generateMetadata() {
  return buildMetadata(
    getAbout(),
    "https://res.cloudinary.com/damiancanelles/image/upload/v1739736725/GC_20_929643c6dd.png"
  );
}

export default function AboutPage() {
  return (<AboutPageComponent></AboutPageComponent>);
}
