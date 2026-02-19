/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  i18n: {
    locales: ['en', 'nl', 'zh', 'de', 'fr', 'ru', 'ja', 'ko'],
    defaultLocale: 'en',
    localeDetection: false, // We want full control over language selection
  },
  images: {
    // Optimized for local images only
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**',
      },
    ],
  },
  generateBuildId: async () => {
    return 'go2-thailand-' + new Date().toISOString().split('T')[0]
  },
  // Enable ISR for dynamic content updates
  async rewrites() {
    return []
  },
  async redirects() {
    return [
      {
        source: '/cities/:slug*',
        destination: '/city/:slug*',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/transport/bangkok-to-bangkok',
        destination: '/transport/',
        permanent: true,
      },
      {
        source: '/transport/bangkok-to-koh-samui',
        destination: '/transport/bangkok-to-surat-thani/',
        permanent: true,
      },
    ]
  },
  // Optimize for Vercel deployment
  experimental: {
    optimizeCss: true,
  }
}

module.exports = nextConfig
