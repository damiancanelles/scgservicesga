"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGrid({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const optimizeCloudinaryImage = (url, width = 600) => {
    if (!url.includes("res.cloudinary.com")) return url;
    return url.replace("/upload/", `/upload/f_auto,q_auto,c_scale,w_${width}/`);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {images.map((img, index) => (
          <div key={index} className="relative w-full h-64 cursor-pointer" onClick={() => setSelectedImage(img.url)}>
            <Image
              src={optimizeCloudinaryImage(img.url, 600)}
              alt={`Service Image ${index + 1}`}
              fill
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        ))}
      </div>

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-6 z-50"
          onClick={() => setSelectedImage(null)} // Close when clicking outside
        >
          <div className="relative max-w-3xl" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking on image */}
            <Image
              src={selectedImage}
              alt="Zoomed Image"
              width={800}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
