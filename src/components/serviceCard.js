'use client'

import Image from "next/image";

export default function ServiceCard({service}) {

    const optimizeCloudinaryImage = (url, width = 600) => {
        if (!url.includes("res.cloudinary.com")) return url;
        return url.replace("/upload/", `/upload/f_auto,q_auto,c_scale,w_${width}/`);
      };

    return (
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
    )
}