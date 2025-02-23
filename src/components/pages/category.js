import RichTextRenderer from "../strapiDescription";
import Image from "next/image";
import ServiceCard from "../serviceCard";

export default async function CategoryPageComponent({id}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const categoryResponse = await fetch(`${apiUrl}/api/categories/${id}?populate[services][populate]=images`);
  const category = await categoryResponse.json();
  const category2Response = await fetch(`${apiUrl}/api/categories/${id}?populate=*`);
  const category2 = await category2Response.json();

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
              {category.data.title}
            </h1>
            <RichTextRenderer content={category.data.description} />
          </div>

          {/* Image Section */}
          <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
            {category2.data.images?.length > 0 && (
              <div className="relative w-[300px] sm:w-[400px] md:w-[450px] h-[350px]">
                <Image
                  src={optimizeCloudinaryImage(category2.data.images[0].url, 450)}
                  alt={category2.data.title}
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
            {category.data.services?.map((service) => (
              <ServiceCard key={service.id} service={service}></ServiceCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
