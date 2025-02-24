'use client'

import Image from "next/image"

export default function CategoryCard({element}) {

    const optimizeCloudinaryImage = (url, width = 400) => {
        if (!url.includes("res.cloudinary.com")) return url; // Return original URL if not Cloudinary
        return url.replace("/upload/", `/upload/f_auto,q_auto,c_scale,w_${width}/`);
    };

    return (
        <div 
              key={element.id} 
              className="relative rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => window.location.href = `/category/${element.documentId}`}
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
    )
}