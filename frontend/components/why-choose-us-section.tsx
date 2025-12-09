"use client"

export function WhyChooseUsSection() {
  const features = [
    {
      icon: "🎯",
      title: "Proven Expertise",
      description: "With 10+ years of industry experience, we deliver results that exceed expectations.",
    },
    {
      icon: "💡",
      title: "Creative Solutions",
      description: "Our innovative approach turns your vision into reality with cutting-edge strategies.",
    },
    {
      icon: "📈",
      title: "Results Driven",
      description: "We measure success by your growth. Your ROI is our priority.",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-slate-50 relative overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="whyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
        <circle cx="800" cy="200" r="180" fill="url(#whyGradient)" opacity="0.3" />
        <polygon points="100,800 300,600 200,1000" fill="url(#whyGradient)" opacity="0.2" />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border-t-4 border-orange-500"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
