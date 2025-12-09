"use client"

import type { Project } from "@/lib/types"
import { Button } from "@/components/ui/button"

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  console.log("PROJECTS IN UI:", projects) // TEMP: check imageUrl values

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-slate-900">
          Our Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-48 bg-slate-200">
                <img
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-slate-900">
                  {project.name}
                </h3>
                <p className="text-slate-600 mb-4">
                  {project.description}
                </p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
