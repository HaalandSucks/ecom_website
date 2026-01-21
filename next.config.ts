import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  eslint: {
    // Next's build step runs ESLint; our flat config works in-editor but
    // eslint-config-next@15 can emit spurious plugin resolution warnings in build.
    // Keep linting available via `npm run lint`.
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Disable worker threads to prevent build crashes
    workerThreads: false,
  },
};

export default nextConfig;
