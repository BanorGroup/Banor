import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Banor",
  assetPrefix: "/Banor/",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
