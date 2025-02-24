import RichTextRenderer from "../strapiDescription";
import ImageGrid from "../imagesGrid";

export default async function ProjectDetailComponent({ id }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const responseProject = await fetch(`${apiUrl}/api/projects/${id}?populate=*`);
  const project = await responseProject.json();

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-16 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto max-w-6xl">
        
        {/* Title */}
        <h1 className="text-5xl font-bold text-black mb-8 uppercase">
          {project.data.name}
        </h1>

        {/* Description */}
        <div className="text-gray-800 text-lg leading-relaxed mb-12">
          <RichTextRenderer content={project.data.description} />
        </div>

        {/* Image Grid (Handled in Client Component) */}
        {project.data.images?.length > 0 && (
          <ImageGrid images={project.data.images} />
        )}
      </div>
    </div>
  );
}
