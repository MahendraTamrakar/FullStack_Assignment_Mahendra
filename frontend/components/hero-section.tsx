"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitContact } from "@/util/publicApi"
import type { ContactPayload } from "@/lib/types"

export function HeroSection() {
  const [formData, setFormData] = useState<ContactPayload>({
    fullName: "",
    email: "",
    mobileNumber: "",
    city: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      await submitContact(formData)
      setMessage("Thank you! We'll contact you soon.")
      setFormData({ fullName: "", email: "", mobileNumber: "", city: "" })
    } catch (error: any) {
      console.error("Form submission error:", error)
      setMessage(error?.message || "Error submitting form. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 md:py-24 px-4 overflow-hidden">
      {/* your SVG background unchanged */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* ... all your existing SVG defs + shapes ... */}
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
              Consultation & Marketing
            </h1>
            <p className="text-lg text-slate-300 text-balance">
              Transform your business with expert consultation and innovative design solutions tailored to your needs.
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 text-lg">
              Get Started
            </Button>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-slate-900 text-white rounded-lg p-8 shadow-lg border border-slate-700 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Get a Free Consultation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                required
              />
              <Input
                type="tel"
                name="mobileNumber"                // 🔑 matches backend schema
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                required
              />
              <Input
                type="text"
                name="city"
                placeholder="Area, City"
                value={formData.city}
                onChange={handleChange}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                required
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold"
              >
                {isLoading ? "Submitting..." : "Get Quick Quote"}
              </Button>
              {message && <p className="text-sm text-center text-orange-400">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
