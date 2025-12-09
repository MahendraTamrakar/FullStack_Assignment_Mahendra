// util/adminApi.ts
import type {
  Project,
  Client,
  Subscriber,
  ContactSubmission,
} from "@/lib/types"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
const BACKEND_BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/$/, "")

if (!API_BASE) {
  console.warn("⚠️ NEXT_PUBLIC_API_BASE_URL is not set")
}

function buildImageUrl(raw?: string | null): string {
  if (!raw) return "/placeholder.svg"

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw
  }

  const path = raw.startsWith("/") ? raw : `/${raw}`
  return `${BACKEND_BASE}${path}`
}

// ---------- PROJECTS ----------
export async function fetchProjectsAdmin(): Promise<Project[]> {
  if (!API_BASE) return []

  try {
    const res = await fetch(`${API_BASE}/projects`, { cache: "no-store" })
    if (!res.ok) {
      console.error("Failed to fetch projects:", res.status, await res.text())
      return []
    }
    const json = await res.json()
    const data = json.data ?? []
    return data.map((p: any) => ({
      id: p._id,
      name: p.projectName,
      description: p.description,
      imageUrl: buildImageUrl(p.imageUrl),
    }))
  } catch (err) {
    console.error("Error in fetchProjectsAdmin:", err)
    return []
  }
}

export async function createProjectAdmin(formData: FormData): Promise<Project | null> {
  if (!API_BASE) throw new Error("API base not set")

  const res = await fetch(`${API_BASE}/admin/projects`, {
    method: "POST",
    body: formData,
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.message || "Failed to create project")
  }

  const p = json.data
  return {
    id: p._id,
    name: p.projectName,
    description: p.description,
    imageUrl: buildImageUrl(p.imageUrl),
  }
}

// ---------- CLIENTS ----------
export async function fetchClientsAdmin(): Promise<Client[]> {
  if (!API_BASE) return []

  try {
    const res = await fetch(`${API_BASE}/clients`, { cache: "no-store" })
    if (!res.ok) {
      console.error("Failed to fetch clients:", res.status, await res.text())
      return []
    }
    const json = await res.json()
    const data = json.data ?? []
    return data.map((c: any) => ({
      id: c._id,
      name: c.clientName,
      description: c.clientDescription,
      designation: c.clientDesignation,
      imageUrl: buildImageUrl(c.imageUrl),
    }))
  } catch (err) {
    console.error("Error in fetchClientsAdmin:", err)
    return []
  }
}

export async function createClientAdmin(formData: FormData): Promise<Client | null> {
  if (!API_BASE) throw new Error("API base not set")

  const res = await fetch(`${API_BASE}/admin/clients`, {
    method: "POST",
    body: formData,
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.message || "Failed to create client")
  }

  const c = json.data
  return {
    id: c._id,
    name: c.clientName,
    description: c.clientDescription,
    designation: c.clientDesignation,
    imageUrl: buildImageUrl(c.imageUrl),
  }
}

// ---------- SUBSCRIBERS ----------
export async function fetchSubscribersAdmin(): Promise<Subscriber[]> {
  if (!API_BASE) return []

  try {
    const res = await fetch(`${API_BASE}/admin/subscribers`, { cache: "no-store" })
    if (!res.ok) {
      console.error("Failed to fetch subscribers:", res.status, await res.text())
      return []
    }
    const json = await res.json()
    const data = json.data ?? []
    return data.map((s: any) => ({
      id: s._id,
      email: s.email,
    }))
  } catch (err) {
    console.error("Error in fetchSubscribersAdmin:", err)
    return []
  }
}

// ---------- CONTACTS / CONSULTATIONS ----------
export async function fetchContactsAdmin(): Promise<ContactSubmission[]> {
  if (!API_BASE) return []

  try {
    const res = await fetch(`${API_BASE}/admin/contacts`, {
      cache: "no-store",
    })
    if (!res.ok) {
      console.error("Failed to fetch contacts:", res.status, await res.text())
      return []
    }
    const json = await res.json()
    const data = json.data ?? []
    return data.map((c: any) => ({
      id: c._id,
      fullName: c.fullName,
      email: c.email,
      mobile: c.mobileNumber, // map backend field
      city: c.city,
    }))
  } catch (err) {
    console.error("Error in fetchContactsAdmin:", err)
    return []
  }
}

export async function updateContactStatusAdmin(
  id: string,
  status: "new" | "read" | "responded",
) {
  if (!API_BASE) throw new Error("API base not set")

  const res = await fetch(`${API_BASE}/admin/contacts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.message || "Failed to update status")
  }

  return json
}
