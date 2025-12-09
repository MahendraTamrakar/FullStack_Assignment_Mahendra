"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import type { Client } from "@/lib/types"
import { Trash2, Edit2 } from "lucide-react"
import { createClientAdmin, fetchClientsAdmin } from "@/util/adminApi"

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [name, setName] = useState("")
  const [designation, setDesignation] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const loadClients = async () => {
    setLoading(true)
    const data = await fetchClientsAdmin()
    setClients(data)
    setLoading(false)
  }

  useEffect(() => {
    loadClients()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("")

    if (editingId) {
      // Local-only edit
      setClients((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, name, designation, description }
            : c,
        ),
      )
      setEditingId(null)
      setName("")
      setDesignation("")
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
      formData.append("clientName", name)
      formData.append("clientDescription", description)
      formData.append("clientDesignation", designation)
      formData.append("image", file)

      const newClient = await createClientAdmin(formData)
      if (newClient) {
        setClients((prev) => [newClient, ...prev])
      }

      setStatus("✅ Client added successfully")
      setName("")
      setDesignation("")
      setDescription("")
      setFile(null)
    } catch (err: any) {
      console.error(err)
      setStatus(err.message || "❌ Failed to add client")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (client: Client) => {
    setName(client.name)
    setDesignation(client.designation)
    setDescription(client.description)
    setEditingId(client.id)
  }

  const handleDelete = (id: string) => {
    // Local-only delete (no backend delete endpoint yet)
    setClients(clients.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <Card className="p-8 bg-white">
        <h1 className="text-3xl font-bold mb-2 text-slate-900">
          {editingId ? "Edit Client" : "Add Client"}
        </h1>
        <p className="text-sm text-slate-500 mb-4">
          Clients shown here also appear in the Happy Clients slider on the main site.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter client name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Designation
            </label>
            <Input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Enter designation"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description (Testimonial)
            </label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter testimonial"
              required
            />
          </div>

          {!editingId && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Client Image
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
                ? "Update Client"
                : "Add Client"}
            </Button>
            {editingId && (
              <Button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setName("")
                  setDesignation("")
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

      {/* Clients List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Clients ({clients.length})
          </h2>
          <Button variant="outline" size="sm" onClick={loadClients}>
            Refresh
          </Button>
        </div>
        <div className="grid gap-4">
          {clients.map((client) => (
            <Card key={client.id} className="p-4 bg-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {client.name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {client.designation}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    {client.description}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    onClick={() => handleEdit(client)}
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(client.id)}
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
        {clients.length === 0 && !loading && (
          <p className="text-sm text-slate-500 mt-2">
            No clients yet. Add one using the form above.
          </p>
        )}
      </div>
    </div>
  )
}
