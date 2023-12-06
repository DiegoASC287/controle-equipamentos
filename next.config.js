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
        {
          protocol: 'https',
          hostname: 'fpzrysseklyzsppt.public.blob.vercel-storage.com',
        }
      ],
    },
  }

module.exports = nextConfig
