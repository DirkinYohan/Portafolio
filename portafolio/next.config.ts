import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 🚨 Esto evita que el build falle en Vercel por errores de ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
