import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  images: {
    remotePatterns: [new URL("https://t.me/i/userpic/**")],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  reactStrictMode: true,
};

export default nextConfig;
