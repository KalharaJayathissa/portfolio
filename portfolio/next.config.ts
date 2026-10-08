import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/ticktock-insta-downloader",
        destination: "/tiktok-insta-downloader",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
