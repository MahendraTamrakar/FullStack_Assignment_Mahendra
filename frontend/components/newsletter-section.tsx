"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeNewsletter } from "@/util/publicApi"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      await subscribeNewsletter({ email })
      setMessage("Subscribed successfully!")
      setEmail("")
    } catch (error: any) {
      console.error("Subscribe error:", error)
      setMessage(error?.message || "Failed to subscribe. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-blue-600 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-semibold">Subscribe Us</h3>
        </div>
        <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
          <Input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-blue-500 border-blue-400 text-white placeholder:text-blue-200"
            required
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
      {message && (
        <p className="max-w-6xl mx-auto mt-3 text-sm text-blue-100 px-4">
          {message}
        </p>
      )}
    </section>
  )
}
