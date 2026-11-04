import SearchProjects from "@/components/seachProjects";
import { getProjects } from "@/lib/content";

export default function ProjectsPage() {
  const projects = getProjects();

  if (!projects.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No projects available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-16 px-6 md:px-12 lg:px-20">
      <div className="container mx-auto max-w-6xl">
        
        {/* Page Title */}
        <h1 className="text-5xl font-bold text-black mb-8 uppercase">
          Our Projects
        </h1>

        {/* Search Bar */}
        <SearchProjects projects={projects} />

      </div>
    </div>
  );
}
