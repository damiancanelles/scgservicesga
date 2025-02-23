import Image from "next/image";

export default function PartnersSection({ partners }) {
  const optimizeCloudinaryImage = (url, width = 600) => {
    if (!url.includes("res.cloudinary.com")) return url; // Return original URL if not Cloudinary
  
    return url.replace("/upload/", `/upload/f_auto,q_auto,c_scale,w_${width}/`);
  };

  return (
    <div className="bg-black py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white uppercase tracking-wide">
          Our Trusted Partners
        </h2>
        <p className="mt-4 text-center text-lg text-gray-300">
          We are proud to partner with these renowned brands.
        </p>

        {/* Dynamic Layout: Use flex when there are 2 partners, grid otherwise */}
        <div
          className={`mt-8 ${
            partners?.length === 2
              ? "flex justify-center gap-8"
              : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center"
          }`}
        >
          {partners?.map((element, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition duration-300 clip-hexagon p-6 flex items-center justify-center w-32 h-32"
            >
              <a
                href={element.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={optimizeCloudinaryImage(element.logo.url,80)}
                    alt={element.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for Hexagonal Cut on Card */}
      <style jsx>{`
        .clip-hexagon {
          clip-path: polygon(
            25% 0%, 75% 0%, 100% 25%, 100% 75%, 
            75% 100%, 25% 100%, 0% 75%, 0% 25%
          );
        }
      `}</style>
    </div>
  );
}
