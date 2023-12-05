/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
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
