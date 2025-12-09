"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Cross2Icon } from "@radix-ui/react-icons"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static w-64 bg-slate-900 text-white h-full transition-transform duration-300 z-40`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="space-y-2 px-4">
          <Link href="/admin/projects">
            <Button variant="ghost" className="w-full justify-start text-left hover:bg-slate-800">
              Projects
            </Button>
          </Link>
          <Link href="/admin/clients">
            <Button variant="ghost" className="w-full justify-start text-left hover:bg-slate-800">
              Clients
            </Button>
          </Link>
          <Link href="/admin/messages">
            <Button variant="ghost" className="w-full justify-start text-left hover:bg-slate-800">
              Messages
            </Button>
          </Link>
          <Link href="/admin/subscribers">
            <Button variant="ghost" className="w-full justify-start text-left hover:bg-slate-800">
              Subscribers
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Dashboard</h2>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-slate-600">
            {sidebarOpen ? <Cross2Icon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
