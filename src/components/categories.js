"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ServicesSection() {
  const [categories, setCategories] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const optimizeCloudinaryImage = (url, width = 400) => {
    if (!url.includes("res.cloudinary.com")) return url; // Return original URL if not Cloudinary
    return url.replace("/upload/", `/upload/f_auto,q_auto,c_scale,w_${width}/`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl + "/api/categories?populate=*");
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-gray-200 text-black py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold uppercase text-center">Our Services</h2>

        {/* Underline Decoration */}
        <div className="w-20 h-1 bg-red-600 mx-auto mt-4 mb-10"></div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((element, index) => (
            <div 
              key={index} 
              className="relative rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => router.push(`/category/${element.documentId}`)}
            >
              {/* Image Section with Title Overlay */}
              {element.images?.length > 0 && (
                <div className="relative w-full h-48 overflow-hidden group">
                  <Image
                    src={optimizeCloudinaryImage(element.images[0].url, 300)}
                    alt={element.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  
                  {/* Overlay & Title */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-500 flex items-center justify-center">
                    <h3 className="text-lg font-bold uppercase text-white text-center px-4">
                      {element.title}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

