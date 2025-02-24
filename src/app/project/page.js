import Link from "next/link";
import SearchProjects from "@/components/seachProjects";

export default async function ProjectsPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/api/projects?populate=*`, {
    cache: "no-store",
  });
  const projects = await response.json();

  if (!projects || !projects.data.length) {
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
        <SearchProjects projects={projects.data} />

      </div>
    </div>
  );
}
