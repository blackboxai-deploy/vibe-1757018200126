/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: []
  },
  images: {
    domains: [],
    remotePatterns: []
  }
};

module.exports = nextConfig;