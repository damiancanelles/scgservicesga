import Banner from "@/components/banner/banner";
import ContactBar from "@/components/banner/contact_bar";
import ServicesSection from "@/components/categories";
import ConstructionBanner from "@/components/header";
import ReviewsSection from "@/components/reviews";
import { getHome, getReviews } from "@/lib/content";

export default function Home() {
  const data = getHome();

  return (
    <div>
      <h1>
        <Banner></Banner>
        <ContactBar></ContactBar>
        <ConstructionBanner introduction={data.introduction}/>
        <ServicesSection />
        <ReviewsSection reviews={getReviews()}></ReviewsSection>
      </h1>
    </div>
  );
}
