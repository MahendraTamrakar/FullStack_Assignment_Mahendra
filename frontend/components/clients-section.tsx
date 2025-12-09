"use client"

import { useState, useRef, useEffect } from "react"
import type { Client } from "@/lib/types"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"

interface ClientsSectionProps {
  clients: Client[]
}

export function ClientsSection({ clients }: ClientsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const container = scrollContainerRef.current
    container?.addEventListener("scroll", checkScroll)
    return () => container?.removeEventListener("scroll", checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-16 px-4 bg-slate-50 relative overflow-hidden">
      {/* background svg unchanged */}
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-slate-900">
          Happy Clients
        </h2>

        <div className="relative flex items-center gap-4">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="absolute -left-6 md:static md:relative flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white transition-colors z-20"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon width={24} height={24} />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth flex-1 px-2 md:px-0 scrollbar-hide"
          >
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4">
                  <img
                    src={client.imageUrl || "/placeholder.svg"}
                    alt={client.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                  {client.description}
                </p>
                <h3 className="font-bold text-slate-900">{client.name}</h3>
                <p className="text-sm text-slate-500">{client.designation}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="absolute -right-6 md:static md:relative flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white transition-colors z-20"
            aria-label="Scroll right"
          >
            <ChevronRightIcon width={24} height={24} />
          </button>
        </div>
      </div>
    </section>
  )
}
