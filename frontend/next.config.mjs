/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // 🔥 important
  },
  devIndicators: {
        buildActivity: false, // Hides the build activity indicator
  },
}

export default nextConfig
