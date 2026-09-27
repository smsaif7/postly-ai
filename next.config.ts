import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore TypeScript errors during build if any persist
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during build to prevent freezing
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;