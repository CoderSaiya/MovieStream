import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["upload.wikimedia.org", "cellphones.com.vn", "i.ytimg.com"],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL, // Sử dụng biến môi trường
  },
};

export default nextConfig;
