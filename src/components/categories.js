import CategoryCard from "./categoryCard";

export default async function ServicesSection() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const categoriesResponse = await fetch(apiUrl + "/api/categories?populate=*");
  const categories = await categoriesResponse.json()
  
  return (
    <div className="bg-gray-200 text-black py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold uppercase text-center">Our Services</h2>

        {/* Underline Decoration */}
        <div className="w-20 h-1 bg-red-600 mx-auto mt-4 mb-10"></div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.data.map((element) => 
            (<CategoryCard key={element.id} element={element}></CategoryCard>)
          )
          }
        </div>
      </div>
    </div>
  );
}

