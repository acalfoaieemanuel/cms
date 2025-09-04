import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  env: {
    NEXT_PUBLIC_API_URL:
    process.env.NODE_ENV === "development" ? "http://localhost:5183/api" : "https://cms-backend.azurewebsites.net/api/"
  }
};

export default nextConfig;
