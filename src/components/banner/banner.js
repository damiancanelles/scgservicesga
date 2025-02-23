import Image from "next/image";
import BannerBackground from "../../../public/banner_background.png";

export default async function Banner() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  let phoneNumber = null;
  let error = null;

  try {
    const response = await fetch(`${apiUrl}/api/home?populate=*`, {
      cache: "no-store", // Prevents caching, always fetches fresh data
    });

    if (!response.ok) throw new Error("Failed to fetch contact information");

    const fetchedData = await response.json();
    phoneNumber = fetchedData?.data?.contact?.phone_number || null;

    if (!phoneNumber) {
      throw new Error("Phone number not found in API response");
    }
  } catch (err) {
    error = err.message;
  }

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-black text-white">
      {/* Background Image */}
      <Image
        src={BannerBackground}
        alt="Banner Background"
        fill
        className="absolute top-0 left-0 object-cover w-full h-full"
        priority
      />
      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12 pt-20 md:pt-32">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="text-white font-[Playfair Display] block">
            Helping You Achieve Your Goals
          </span>
          <span className="text-red-500 font-[Oswald] uppercase tracking-wide block">
            Across Atlanta
          </span>
        </h1>
        <p className="text-lg md:text-xl mt-6 text-gray-300 font-[Poppins] leading-snug">
          Whether it's home improvement, repairs, or business solutions, we help 
          you succeed with top-quality services.
        </p>

        {/* Call Button */}
        {error ? (
          <p className="mt-8 text-red-500">Error: {error}</p>
        ) : (
          <a
            href={`tel:${phoneNumber}`}
            className="mt-8 inline-block bg-red-600 text-white py-3 px-6 rounded-md font-bold text-lg hover:bg-red-700 transition"
          >
            Call Now: {phoneNumber}
          </a>
        )}
      </div>
    </section>
  );
}
