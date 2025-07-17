import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // matcher: ["/((?!api|_next|.*\\..*).*)"],
  images: {
    remotePatterns: [new URL("https://t.me/i/userpic/**")],
  },
  reactStrictMode: false,
};

export default nextConfig;
