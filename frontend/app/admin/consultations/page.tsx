"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { fetchContactsAdmin } from "@/util/adminApi"

interface Consultation {
  id: string
  fullName: string
  email: string
  mobile: string
  city: string
  createdAt?: string
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(false)

  const fetchConsultations = async () => {
    setLoading(true)
    try {
      const contacts = await fetchContactsAdmin()
      // If you later add createdAt mapping, you can use it here.
      setConsultations(
        contacts.map((c) => ({
          id: c.id,
          fullName: c.fullName,
          email: c.email,
          mobile: c.mobile,
          city: c.city,
          createdAt: "",
        })),
      )
    } catch (error) {
      console.error("Error fetching consultations:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteConsultation = (id: string) => {
    // Local-only delete – no delete endpoint in backend
    setConsultations((prev) => prev.filter((c) => c.id !== id))
  }

  useEffect(() => {
    fetchConsultations()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Consultation Requests</h1>
        <Button onClick={fetchConsultations} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </Button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-slate-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Mobile</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">City</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((consultation) => (
              <tr key={consultation.id} className="border-b hover:bg-slate-50">
                <td className="px-6 py-4">{consultation.fullName}</td>
                <td className="px-6 py-4">{consultation.email}</td>
                <td className="px-6 py-4">{consultation.mobile}</td>
                <td className="px-6 py-4">{consultation.city}</td>
                <td className="px-6 py-4">
                  <Button
                    onClick={() => deleteConsultation(consultation.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm"
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {consultations.length === 0 && !loading && (
          <div className="text-center py-8 text-slate-500">
            No consultations yet. Click Refresh to load.
          </div>
        )}
      </div>
    </div>
  )
}
