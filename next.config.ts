import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "buddi.script.s3.ap-southeast-1.amazonaws.com",
                pathname: "/image/**",
            },
            {
                protocol: "http",
                hostname: "buddi.script.s3.ap-southeast-1.amazonaws.com",
                pathname: "/image/**",
            },
        ],
    },
};

export default nextConfig;
