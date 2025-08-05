import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  matcher: ["/((?!_next|favicon.ico|api).*)"],
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
