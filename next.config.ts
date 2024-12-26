import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Run only on the server, never try to include in client bundle
  serverExternalPackages: ['@prisma/client', 'bcrypt']
};

export default nextConfig;
