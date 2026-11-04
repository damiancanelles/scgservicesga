import CategoryCard from "./categoryCard";
import { getCategories } from "@/lib/content";

export default function ServicesSection() {
  const categories = getCategories();

  return (
    <div className="bg-gray-200 text-black py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold uppercase text-center">Our Services</h2>

        {/* Underline Decoration */}
        <div className="w-20 h-1 bg-red-600 mx-auto mt-4 mb-10"></div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((element) => 
            (<CategoryCard key={element.id} element={element}></CategoryCard>)
          )
          }
        </div>
      </div>
    </div>
  );
}

