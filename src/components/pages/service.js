"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

export default function ServiceDetailComponent() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${apiUrl}/api/services/${id}?populate=*`);
        const data = await response.json();
        setService(data.data);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    }

    if (id) fetchData();
  }, [id]);

  const optimizeCloudinaryImage = (url, width = 600) => {
    if (!url.includes("res.cloudinary.com")) return url;
    return url.replace("/upload/", `/upload/f_auto,q_auto,c_scale,w_${width}/`);
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-16 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-black mb-6 uppercase">
            {service.title}
          </h1>
          <div className="text-gray-800 leading-relaxed">
            <BlocksRenderer content={service.description} />
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center">
          {service.images?.length > 0 && (
            <div className="relative w-[300px] sm:w-[400px] md:w-[500px] h-[350px]">
              <Image
                src={optimizeCloudinaryImage(service.images[0].url, 500)}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
                className="rounded-lg shadow-lg object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
