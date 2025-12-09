"use client"

export function InteractiveBackgroundSection() {
  return (
    <section
      className="relative w-full h-96 md:h-screen bg-fixed bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%231e3a8a;stop-opacity:1" /><stop offset="100%" style="stop-color:%230f172a;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23grad1)"/><circle cx="200" cy="150" r="100" fill="%23f97316" opacity="0.1"/><circle cx="1000" cy="600" r="150" fill="%233b82f6" opacity="0.1"/><path d="M 0 400 Q 300 300 600 400 T 1200 400" stroke="%23f97316" strokeWidth="2" fill="none" opacity="0.2"/></svg>')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

      {/* Content overlay */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">About Our Expertise</h2>
          <p className="text-lg text-slate-200 text-balance leading-relaxed">
            With over a decade of experience in consultation, design, and marketing, we help businesses achieve their
            goals through strategic solutions and innovative thinking.
          </p>
        </div>
      </div>
    </section>
  )
}
