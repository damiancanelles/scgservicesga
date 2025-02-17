"use client";

import Image from "next/image";
import Banner from "../../public/banner.png";

export default function ConstructionBanner({ introduction }) {
  return (
    <div className="bg-gray-200 text-black relative min-h-screen flex items-center">
      <div className="relative container mx-auto px-4 py-16 flex flex-col md:flex-row items-center md:justify-between md:gap-12 gap-8">
        {/* Text Section */}
        <div className="text-center md:text-left md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
            SCG Services
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            {introduction}
          </p>
        </div>

        {/* Image Section (Smaller Size) */}
        <div className="mt-8 md:mt-0 md:w-1/3">
          <Image
            src={Banner}
            alt="Construction workers on a site"
            width={400} // Reduced width
            height={300} // Adjusted height proportionally
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
