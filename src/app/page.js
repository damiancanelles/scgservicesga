import Banner from "@/components/banner/banner";
import ContactBar from "@/components/banner/contact_bar";
import ServicesSection from "@/components/categories";
import ConstructionBanner from "@/components/header";
import ReviewsSection from "@/components/reviews";

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const responseData = await fetch(apiUrl+"/api/home?populate%5Bpartners%5D%5Bpopulate%5D=logo");
  const data = await responseData.json();

  return (
    <div>
      <h1>
        <Banner></Banner>
        <ContactBar></ContactBar>
        <ConstructionBanner introduction={data.data.introduction}/>
        <ServicesSection />
        <ReviewsSection></ReviewsSection>
      </h1>
    </div>
  );
}
