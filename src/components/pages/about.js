import Image from "next/image";
import RichTextRenderer from "../strapiDescription";

export default async function AboutPageComponent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const dataResponse = await fetch(`${apiUrl}/api/about?populate=*`);
  const data = await dataResponse.json();  // Convert to JSON

  const membersResponse = await fetch(`${apiUrl}/api/about?populate[members][populate]=image`);
  const members = await membersResponse.json();  // Convert to JSON

  const optimizeCloudinaryImage = (url, width = 800) => {
    if (!url.includes("res.cloudinary.com")) return url; 
    return url.replace("/upload/", `/upload/f_auto,q_auto,c_scale,w_${width}/`);
  };

  if (!data || !members) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/* About Section */}
      <div className="bg-white text-black relative">
        <div className="relative container mx-auto px-4 py-16 flex flex-col md:flex-row items-center md:justify-between md:gap-12 gap-8">
          
          {/* Text Section (50% width on larger screens) */}
          <div className="text-center md:text-left w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6">
              {data.data.header}
            </h1>
            <RichTextRenderer content={data.data.description} />
          </div>

          {/* Image Section (50% width on larger screens) */}
          <div className="w-full md:w-1/2 flex justify-center">
            {data.data.images?.length > 0 && (
              <Image
                src={optimizeCloudinaryImage(data.data.images[0].url, 1024)}
                alt={data.data.header}
                width={600} // Reduce width slightly to fit well
                height={400}
                className="rounded-lg shadow-lg object-cover w-full max-w-[500px] md:max-w-full h-auto"
                priority
              />
            )}
          </div>

        </div>
      </div>

    </>
  );
}
