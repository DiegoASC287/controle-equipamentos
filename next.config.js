/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'source.unsplash.com',
        },
      ],
    },
  }

module.exports = nextConfig
