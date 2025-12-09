// util/publicApi.ts
import type {
  Project,
  Client,
  ContactPayload,
  NewsletterPayload,
} from "@/lib/types"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
const BACKEND_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/$/, "")

function buildImageUrl(raw?: string | null): string {
  if (!raw) return "/placeholder.svg"

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw
  }

  const path = raw.startsWith("/") ? raw : `/${raw}`
  return `${BACKEND_BASE}${path}`
}

// ---- PROJECTS ----
export async function getProjects(): Promise<Project[]> {
  if (!API_BASE) return []

  try {
    const res = await fetch(`${API_BASE}/projects`, { cache: "no-store" })

    if (!res.ok) {
      console.error("Failed to fetch projects:", res.status, await res.text())
      return []
    }

    const json = await res.json()
    const apiProjects = json.data ?? []

    return apiProjects.map((p: any) => ({
      id: p._id,
      name: p.projectName,
      description: p.description,
      imageUrl: buildImageUrl(p.imageUrl),
    }))
  } catch (err) {
    console.error("Error in getProjects:", err)
    return []
  }
}

// ---- CLIENTS ----
export async function getClients(): Promise<Client[]> {
  if (!API_BASE) {
    console.error("NEXT_PUBLIC_API_BASE_URL not set")
    return []
  }

  try {
    const res = await fetch(`${API_BASE}/clients`, { cache: "no-store" })

    if (!res.ok) {
      console.error("Failed to fetch clients:", res.status, await res.text())
      return []
    }

    const json = await res.json()
    const apiClients = json.data ?? []

    return apiClients.map((c: any) => ({
      id: c._id,
      name: c.clientName,
      description: c.clientDescription,
      designation: c.clientDesignation,
      imageUrl: buildImageUrl(c.imageUrl),
    }))
  } catch (err) {
    console.error("Error in getClients:", err)
    return []
  }
}

// ---- CONTACT ----
export async function submitContact(payload: ContactPayload) {
  if (!API_BASE) throw new Error("API base URL not set")

  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Failed to submit contact")

  return data
}

// ---- NEWSLETTER ----
export async function subscribeNewsletter(payload: NewsletterPayload) {
  if (!API_BASE) throw new Error("API base URL not set")

  const res = await fetch(`${API_BASE}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Failed to subscribe")

  return data
}
