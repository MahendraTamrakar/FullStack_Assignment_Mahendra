"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-lg">Consultancy</h3>
            <p className="text-sm">Your trusted partner for business growth and digital transformation.</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  Consultation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  Design
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition">
                  Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-white font-bold">Contact</h4>
            <p className="text-sm">Email: info@consultancy.com</p>
            <p className="text-sm">Phone: +1 (555) 123-4567</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-slate-400 hover:text-orange-500 transition">
                Facebook
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-500 transition">
                Twitter
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-500 transition">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <p className="text-center text-sm text-slate-500">
            © 2025 Consultancy. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
