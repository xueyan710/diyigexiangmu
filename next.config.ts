import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 完全跳过构建时的ESLint检查
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
