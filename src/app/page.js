"use client"

import Banner from "@/components/banner/banner";
import ContactBar from "@/components/banner/contact_bar";
import ServicesSection from "@/components/categories";
import ConstructionBanner from "@/components/header";
import PartnersSection from "@/components/partners";
import ReviewsSection from "@/components/reviews";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const [dataRes] = await Promise.all([
          fetch(apiUrl+"/api/home?populate%5Bpartners%5D%5Bpopulate%5D=logo"),
        ]);

        const [dataFetch] = await Promise.all([
          dataRes.json(),
        ]);

        setData(dataFetch.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  console.log(apiUrl)
  return (
    <div>
      <h1>
        <Banner></Banner>
        <ContactBar></ContactBar>
        <ConstructionBanner introduction={data.introduction}/>
        <ServicesSection introduction={data.introduction}/>
        <ReviewsSection></ReviewsSection>
      </h1>
    </div>
  );
}
