import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Source images are already resized/compressed by scripts/process-images.mjs;
    // this canary's dev-mode on-demand optimizer intermittently hangs on concurrent
    // resize requests, so skip the runtime optimizer entirely.
    unoptimized: true,
  },
};

export default nextConfig;
