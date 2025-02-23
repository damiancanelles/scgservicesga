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
        <div className="relative container mx-auto px-4 py-16 flex flex-col md:flex-row items-center md:justify-between md:gap-20 gap-12">
          {/* Text Section */}
          <div className="text-center md:text-left md:w-1/3">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6">
              {data.data.header}
            </h1>
            <RichTextRenderer content={data.data.description}></RichTextRenderer>
          </div>

          {/* Image Section - Wider Display */}
          <div className="mt-8 md:mt-0 md:w-2/3 flex justify-center">
            {data.data.images?.length > 0 && (
              <div className="relative w-full max-w-4xl h-[400px] md:h-[500px]">
                <Image
                  src={optimizeCloudinaryImage(data.data.images[0].url, 1024)}
                  alt={data.data.header}
                  fill
                  sizes="(max-width: 768px) 400px, (max-width: 1024px) 600px, 800px"
                  className="rounded-lg shadow-lg object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
