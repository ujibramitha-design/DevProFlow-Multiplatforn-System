/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  typescript: {
    // Skip type checking during build
    tsconfigPath: './tsconfig.json',
  },
};

module.exports = nextConfig;
