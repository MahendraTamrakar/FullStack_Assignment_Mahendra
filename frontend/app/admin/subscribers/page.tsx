"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { Subscriber } from "@/lib/types"
import { fetchSubscribersAdmin } from "@/util/adminApi"

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(false)

  const loadSubscribers = async () => {
    setLoading(true)
    const data = await fetchSubscribersAdmin()
    setSubscribers(data)
    setLoading(false)
  }

  useEffect(() => {
    loadSubscribers()
  }, [])

  const handleDelete = (id: string) => {
    // Only frontend delete for now – no backend delete endpoint yet
    setSubscribers(subscribers.filter((s) => s.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-slate-900">
          Subscribers ({subscribers.length})
        </h1>
        <Button variant="outline" size="sm" onClick={loadSubscribers} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </Button>
      </div>
      <Card className="overflow-hidden bg-white">
        <div className="divide-y divide-slate-200">
          {subscribers.map((subscriber) => (
            <div
              key={subscriber.id}
              className="px-6 py-4 hover:bg-slate-50 transition-colors flex items-center justify-between"
            >
              <p className="text-sm text-slate-900">{subscriber.email}</p>
              <Button
                onClick={() => handleDelete(subscriber.id)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          {subscribers.length === 0 && !loading && (
            <div className="px-6 py-4 text-sm text-slate-500">
              No subscribers yet.
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
