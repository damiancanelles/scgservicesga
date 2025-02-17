"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

export default function CategoryPageComponent() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [category2, setCategory2] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${apiUrl}/api/categories/${id}?populate[services][populate]=images`
        );
        const data = await response.json();
        setCategory(data.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }

      try {
        const response2 = await fetch(`${apiUrl}/api/categories/${id}?populate=*`);
        const data2 = await response2.json();
        setCategory2(data2.data);
      } catch (error) {
        console.error("Error fetching category2 data:", error);
      }
    }

    if (id) fetchData();
  }, [id]);

  const optimizeCloudinaryImage = (url, width = 600) => {
    if (!url.includes("res.cloudinary.com")) return url;
    return url.replace("/upload/", `/upload/f_auto,q_auto,c_scale,w_${width}/`);
  };

  if (!category || !category2) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/* Category Header Section */}
      <div className="bg-white text-black relative">
        <div className="relative container mx-auto px-4 py-16 flex flex-col md:flex-row items-center md:justify-between md:gap-20 gap-12">
          {/* Text Section */}
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6">
              {category.title}
            </h1>
            <BlocksRenderer content={category.description} />
          </div>

          {/* Image Section */}
          <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
            {category2.images?.length > 0 && (
              <div className="relative w-[300px] sm:w-[400px] md:w-[450px] h-[350px]">
                <Image
                  src={optimizeCloudinaryImage(category2.images[0].url, 450)}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 450px"
                  className="object-cover rounded-lg shadow-lg"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-200 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold uppercase text-center text-gray-900 mb-10">
            Our Services
          </h2>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.services?.map((service) => (
              <div
                key={service.id}
                className="relative bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group"
                onClick={() => window.location.href = `/service/${service.documentId}`}
              >
                {/* Image Section with Title Overlay */}
                {service.images?.length > 0 && (
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={optimizeCloudinaryImage(service.images[0].url, 500)}
                      alt={service.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-60 transition-all duration-500"></div>
                  </div>
                )}

                {/* Title Overlay */}
                <div className="absolute inset-0 flex justify-center items-center">
                  <h3 className="text-lg md:text-xl font-bold uppercase text-white bg-black bg-opacity-60 px-4 py-2 rounded">
                    {service.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
