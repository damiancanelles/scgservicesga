"use client";

import { useState } from "react";
import Link from "next/link";

export default function SearchProjects({ projects }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter projects based on search input
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description[0].children[0].text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="border p-4 rounded-lg shadow-lg bg-gray-100">
              <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{project.category}</p>
              <p className="text-gray-700 mb-4">
                {project.description[0].children[0].text}
              </p>
              <Link
                href={`/project/${project.documentId}`}
                className="inline-block bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No projects match your search.</p>
        )}
      </div>
    </div>
  );
}
