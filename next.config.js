/** @type {import('next').NextConfig} */
const nextConfig = {
  // EdgeOne Pages configuration
  // 使用默认构建模式以支持 API Routes
  
  // Image optimization
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS ? process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(',') : ['localhost'],
    unoptimized: true
  },

  // Disable x-powered-by header
  poweredByHeader: false,

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Experimental features
  experimental: {
    // Next.js 15+ app directory is enabled by default
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    return config
  },
}

module.exports = nextConfig