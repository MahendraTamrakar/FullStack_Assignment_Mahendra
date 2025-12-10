"use client"
import Image from "next/image";

export function ResultsSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white relative overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="resultsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
        <circle cx="150" cy="150" r="200" fill="url(#resultsGradient)" opacity="0.3" />
        <rect x="700" y="700" width="300" height="300" fill="url(#resultsGradient)" opacity="0.2" />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="relative h-80 md:h-96 bg-slate-100 rounded-lg overflow-hidden shadow-md order-2 md:order-1">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
              <img src="/images/section.jpg" alt="section image"/>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6 order-1 md:order-2">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              Our Expertise
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Best Your Average Results</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We help businesses like yours achieve exceptional results through strategic consultation, modern design,
              and comprehensive marketing solutions. Our proven methodology has helped 500+ companies transform their
              brand presence and increase their revenue.
            </p>
            <ul className="space-y-3">
              {[
                "Data-driven strategies tailored to your business",
                "Creative designs that engage and convert",
                "Measurable results and transparent reporting",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700">
                  <span className="text-orange-500 font-bold mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
