"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Eye } from "lucide-react"
import type { ContactSubmission } from "@/lib/types"
import { fetchContactsAdmin, updateContactStatusAdmin } from "@/util/adminApi"

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactSubmission[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null)
  const [loading, setLoading] = useState(false)

  const loadMessages = async () => {
    setLoading(true)
    const data = await fetchContactsAdmin()
    setMessages(data)
    setLoading(false)
  }

  useEffect(() => {
    loadMessages()
  }, [])

  const handleDelete = (id: string) => {
    // Local-only delete (no delete endpoint yet)
    setMessages(messages.filter((m) => m.id !== id))
  }

  const markAsResponded = async (id: string) => {
    try {
      await updateContactStatusAdmin(id, "responded")
      setMessages((prev) =>
        prev.filter((m) => m.id !== id),
      )
    } catch (err) {
      console.error(err)
    }
  }

  if (selectedMessage) {
    return (
      <div>
        <Button onClick={() => setSelectedMessage(null)} variant="outline" className="mb-6">
          Back to Messages
        </Button>
        <Card className="p-8 bg-white">
          <h1 className="text-2xl font-bold mb-6 text-slate-900">Message Details</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <p className="text-slate-900">{selectedMessage.fullName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <p className="text-slate-900">{selectedMessage.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Mobile Number</label>
              <p className="text-slate-900">{selectedMessage.mobile}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">City</label>
              <p className="text-slate-900">{selectedMessage.city}</p>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-slate-900">
          Contact Submissions ({messages.length})
        </h1>
        <Button variant="outline" size="sm" onClick={loadMessages} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </Button>
      </div>

      <Card className="overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Full Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Mobile</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">City</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {messages.map((message) => (
                <tr key={message.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-900">{message.fullName}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{message.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{message.mobile}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{message.city}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setSelectedMessage(message)}
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => markAsResponded(message.id)}
                        variant="outline"
                        size="sm"
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        Mark Responded
                      </Button>
                      <Button
                        onClick={() => handleDelete(message.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {messages.length === 0 && !loading && (
            <div className="px-6 py-4 text-sm text-slate-500">
              No contacts yet.
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
