/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https", // Allow HTTPS images
        hostname: "**", // Allow all hostnames
      },
      {
        protocol: "http", // Allow HTTP images (optional, if needed)
        hostname: "**", // Allow all hostnames
      },
    ],
  },
};

module.exports = nextConfig;
