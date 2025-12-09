"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import type { Project } from "@/lib/types"
import { Trash2, Edit2 } from "lucide-react"
import { createProjectAdmin, fetchProjectsAdmin } from "@/util/adminApi"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const loadProjects = async () => {
    setLoading(true)
    const data = await fetchProjectsAdmin()
    setProjects(data)
    setLoading(false)
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("")

    if (editingId) {
      // Only local edit – backend has no update endpoint
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, name: projectName, description }
            : p,
        ),
      )
      setEditingId(null)
      setProjectName("")
      setDescription("")
      setFile(null)
      return
    }

    if (!file) {
      setStatus("Please select an image")
      return
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("projectName", projectName)
      formData.append("description", description)
      formData.append("image", file) // field must be "image"

      const newProject = await createProjectAdmin(formData)
      if (newProject) {
        setProjects((prev) => [newProject, ...prev])
      }

      setStatus("✅ Project created successfully")
      setProjectName("")
      setDescription("")
      setFile(null)
    } catch (err: any) {
      console.error(err)
      setStatus(err.message || "❌ Failed to create project")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project: Project) => {
    setProjectName(project.name)
    setDescription(project.description)
    setEditingId(project.id)
  }

  const handleDelete = (id: string) => {
    // Only frontend delete – no backend delete endpoint yet
    setProjects(projects.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <Card className="p-8 bg-white">
        <h1 className="text-3xl font-bold mb-2 text-slate-900">
          {editingId ? "Edit Project" : "Add Project"}
        </h1>
        <p className="text-sm text-slate-500 mb-4">
          Projects are also shown on the public landing page.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Project Name
            </label>
            <Input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              required
            />
          </div>

          {!editingId && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Project Image
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept="image/*"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                required
              />
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold"
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Project"
                : "Add Project"}
            </Button>
            {editingId && (
              <Button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setProjectName("")
                  setDescription("")
                  setFile(null)
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            )}
          </div>
          {status && <p className="text-sm mt-2">{status}</p>}
        </form>
      </Card>

      {/* Projects List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Projects ({projects.length})
          </h2>
          <Button variant="outline" size="sm" onClick={loadProjects}>
            Refresh
          </Button>
        </div>
        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="p-4 bg-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {project.description}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    onClick={() => handleEdit(project)}
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(project.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {projects.length === 0 && !loading && (
          <p className="text-sm text-slate-500 mt-2">
            No projects yet. Add one using the form above.
          </p>
        )}
      </div>
    </div>
  )
}
