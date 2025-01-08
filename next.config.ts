import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Run only on the server, never try to include in client bundle
  serverExternalPackages: ['@prisma/client', 'bcrypt'],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
