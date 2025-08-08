/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  experimental: {
    esmExternals: false,
  },
  swcMinify: false,
  compiler: {
    removeConsole: false,
  },
  output: 'standalone',
  trailingSlash: false,
};

module.exports = nextConfig;
