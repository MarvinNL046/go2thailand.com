/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com']
  },
  generateBuildId: async () => {
    return 'go2-thailand-' + new Date().toISOString().split('T')[0]
  }
}

module.exports = nextConfig
