import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_BASE_URL: process.env.API_BASE_URL, // Sử dụng biến môi trường
  },
};

export default nextConfig;
