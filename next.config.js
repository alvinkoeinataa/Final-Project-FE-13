/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "photo-sharing-api-bootcamp.do.dibimbing.id",
      },
    ],
  },
};

module.exports = nextConfig;
